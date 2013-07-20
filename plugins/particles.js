/*global h5c3: true, gamecore: true, document: true, navigator: true, window: true */
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 * @module H5C3 Framework
 * @submodule Plugin
 * @class h5c3.plugin.ParticleEmitter
 * @augments h5c3.Plugin
 * @description
 * ParticleEmitter class for extended from h5c3.Plugin to provide functionality to the h5c3.
 *
 * <pre><code>
 * var color = new h5c3.Color([255, 0, 0]); // super red
 * </code></pre>
 */
h5c3.plugin.ParticleEmitter = h5c3.Plugin.extend('h5c3.plugin.ParticleEmitter',
{
	srcDir: '../plugins/'
},
{
	/**
	 * @property {string} VERSION Holds the current version of the plugin
	 */
	VERSION:	'0.0.1',
	
	/**
	* <description>
	*
	* @param {TYPE} <Name> <description>
	* @returns {TYPE} <description>
	*/	
	init:function(args) 
	{
		this._super();
		if (typeof args === "object") {
			this.property = args;
		}
		this.debug('init()');
	},
	
	main:function(args)
	{
		this.debug('main()');
	},
	
	done:function(args)
	{
		this.debug('done()');
	}	
});

/**
 * @class h5c3.systems.Particles
 * @description
 * [Extends <a href='h5c3.systems.System'>h5c3.systems.System</a>]
 * <p>
 * A particle system. See the particle component for more information.
 */
h5c3.systems.Particles = h5c3.systems.EntitySystem.extend('h5c3.systems.Particles',
/** @lends h5c3.systems.Particles */
{ },
/** @lends h5c3.systems.Particles.prototype */
{
	/**
	 * Constructs a new particle system
	 */
	init:function ()
	{
		this._super([ 'emitter' ]);
	},

	_drawStartTime: 0,

	process:function (entity)
	{
		if (!entity.active) return;

		var em = entity.getComponent('emitter');
		var sp = entity.getComponent('spatial');
		if (!sp)
			sp = entity.addComponent(new h5c3.components.Spatial({}));

		if (em)
		{
			if (!em.active) return;

			// New emissions
			if (em.emitting && Date.now() - em._lastEmitTime > em.delay && (em.shots == 0 || em._shotCount < em.shots))
			{
				for (var b = 0; b < em.burst; b++)
				{
					// if this sprite sheet has no animations, then we just use the spritesheet frames
					var frame = 0;
					if (em.spriteSheet.animations.size() == 0)
						// pick a random frame to use
						frame = h5c3.Math.rand(0, (em.spriteSheet.framesHigh * em.spriteSheet.framesWide)-1);

					em._particles.add(
						h5c3._Particle.create(
							sp.pos.x + em.offsetX + h5c3.Math.rand(-(em.rangeX/2), em.rangeX/2),
							sp.pos.y + em.offsetY + h5c3.Math.rand(-(em.rangeY/2), em.rangeY/2),
							h5c3.Math.rotate(em.relativeAngle ? sp.dir : 0, h5c3.Math.rand(em.angleMin, em.angleMax)),
							h5c3.Math.randFloat(em.thrustMin, em.thrustMax),
							h5c3.Math.randFloat(em.lifeMin, em.lifeMax),
							h5c3.Math.randFloat(em.spinMin, em.spinMax),
							h5c3.Math.randFloat(em.growXMin, em.growXMax),
							h5c3.Math.randFloat(em.growYMin, em.growYMax),
							h5c3.Math.randFloat(em.scaleXMin, em.scaleXMax),
							h5c3.Math.randFloat(em.scaleYMin, em.scaleYMax),
							em.fadeInTime, em.fadeOutTime,
							em.alphaMin, em.alphaMax,
							em.spriteSheet,
							em.compositeOperation,
							frame));
				}

				em._lastEmitTime = Date.now();
				em._shotCount++;
			}

			// update all the particles
			var next = em._particles.first;
			while (next)
			{
				var p = next.obj;

				// move the particles in the right direction
				if (h5c3.device.now - p.start > em.thrustTime)
					p.thrust = 0;

				var accelX = p.thrust * Math.cos( h5c3.Math.degToRad(p.dir) );
				var accelY = p.thrust * Math.sin( h5c3.Math.degToRad(p.dir) );

				// add the acceleration to velocity
				p.velX += (accelX * (h5c3.device.elapsed/1000)) + em.gravityX;
				p.velY += (accelY * (h5c3.device.elapsed/1000)) + em.gravityY;
				p.velX = h5c3.Math.limit(p.velX, -em.maxVelX, em.maxVelX);
				p.velY = h5c3.Math.limit(p.velY, -em.maxVelY, em.maxVelY);
				p.x += p.velX;
				p.y += p.velY;

				// render aspects (spin, grow, fade etc)
				if (p.spin)
					p.rotation = h5c3.Math.rotate(p.rotation, p.spin * (h5c3.device.elapsed/1000));
				if (p.growXRate != 0 || p.growYRate != 0)
				{
					p.scaleX += p.growXRate * (h5c3.device.elapsed/1000);
					p.scaleY += p.growYRate * (h5c3.device.elapsed/1000);
				}

				if (p.fadeState == 0) // fading in
				{
					p.sprite.addAlpha((h5c3.device.elapsed * (100 / p.fadeInTime)) / 100);
					if (h5c3.device.now - p.fadeStateStart > p.fadeInTime)
					{
						p.fadeState++;
						p.fadeStateStart = h5c3.device.now;
					}
				}

				if (p.fadeState == 1)
				{
					if (h5c3.device.now - p.fadeStateStart > p.holdTime)
					{
						p.fadeState++;
						p.fadeStateStart = h5c3.device.now;
					}
				}

				if (p.fadeState == 2) // fading out
				{
					if (p.fadeOutTime > 0)// && p.sprite.alpha > 0)
					{
						var fa = (h5c3.device.elapsed * (100 / p.fadeOutTime)) / 100;
						p.sprite.subAlpha(fa);
						// doesn't need to time ending because lifetime will take over
						// down below and kill this particle
					}
				}

				// pick a random alpha
				if (p.alphaMin != 1 || p.alphaMax != 1)
				{
					if (h5c3.device.now - p.lastAlpha > em.alphaDelay)
					{
						p.sprite.setAlpha(h5c3.Math.rand(p.alphaMin, p.alphaMax));
						p.lastAlpha = h5c3.device.now;
					}
				}

				// draw it
				this.drawStartTime = Date.now();
				if (p.scaleX != 1 || p.scaleY != 1)
					em.spriteSheet.setScale(p.scaleX, p.scaleY);

				if (!p.sprite.currentAnim)
				{
					p.sprite.drawFrame(h5c3.device.ctxGame, p.frame % em.spriteSheet.framesWide,
						Math.floor(p.frame / em.spriteSheet.framesWide),
						p.x - entity.layer.origin.x - entity.layer.scene.viewPort.x,
						p.y - entity.layer.origin.y - entity.layer.scene.viewPort.y,
						em.rotateSprite ? p.rotation : p.dir);
					h5c3.device.lastDrawMS += (Date.now() - this.drawStartTime);
				}
				else
				{
					p.sprite.draw(h5c3.device.ctxGame,
						p.x - entity.layer.origin.x - entity.layer.scene.viewPort.x,
						p.y - entity.layer.origin.y - entity.layer.scene.viewPort.y,
						p.dir);
					h5c3.device.lastDrawMS += (Date.now() - this.drawStartTime);
					p.sprite.update(h5c3.device.elapsed);
				}

				if (p.scaleX != 1 || p.scaleY != 1)
					em.spriteSheet.setScale(1, 1);

				// assign next before we (maybe) remove this one
				next = next.next();

				// time to die?
				if (h5c3.device.now - p.start > p.lifetime)
				{
					p.release();
					em._particles.remove(p);
				}
			}

			// if all the particles are done, and the shot count is finished, time to kill the emitter
			if (em.shots != 0)
			{
				if (em._particles.first == null && em._shotCount >= em.shots)
				   em.active = false;
			}

		}
	}


});


h5c3._Particle = h5c3.Pooled.extend('h5c3._Particle',
{
	create:function (x, y, dir, thrust, lifetime, spin, growXRate, growYRate, scaleX, scaleY,
					 fadeInTime, fadeOutTime, alphaMin, alphaMax, spriteSheet, compositeOperation, frame)
	{
		var n = this._super();
		n.x = x;
		n.y = y;
		n.dir = dir;
		n.thrust = thrust;
		n.frame = frame;
		n.lifetime = lifetime;
		n.spin = spin;
		n.growXRate = growXRate;
		n.growYRate = growYRate;
		n.scaleX = scaleX;
		n.scaleY = scaleY;
		if (n.sprite == null)
			n.sprite = h5c3.Sprite.create(spriteSheet);
		else
			n.sprite.setSpriteSheet(spriteSheet);
		n.start = h5c3.device.now;
		n.fadeStart = 0;
		n.velX = 0;
		n.velY = 0;
		n.rotation = 0;
		n.alphaMin = alphaMin;
		n.alphaMax = alphaMax;
		n.lastAlpha = h5c3.device.now;
		n.fadeInTime = fadeInTime;
		n.fadeOutTime = fadeOutTime;
		n.holdTime = n.lifetime - (n.fadeInTime + n.fadeOutTime);
		if (compositeOperation)
			n.sprite.setCompositeOperation(compositeOperation);
		else
			n.sprite.setCompositeOperation('source-over');

		n.fadeState = 1;    // 0=fading in, 1 = displaying, 2 = fading out
		n.fadeStateStart = h5c3.device.now;
		if (n.fadeInTime > 0)
		{
			n.fadeState = 0;
			n.sprite.setAlpha(0);
		} else
			n.sprite.setAlpha(1);

		return n;
	}
},
{
	x: 0,
	y: 0,
	dir: 0,
	rotation: 0,
	thrust: 0,
	sprite: null,
	start: 0,
	frame: 0,
	fadeStart: 0,
	velX: 0,
	velY: 0,
	spin: 0,
	growXRate: 0,
	growYRate: 0,
	scaleX: 1,
	scaleY: 1,
	fadeInTime: 0,
	fadeOutTime: 0,
	fadeStateStart: 0,
	holdTime: 0,
	fadeState: 1,
	alphaMin: 1,
	alphaMax: 1,
	lastAlpha: 0 // time of last alpha change

});

/**
 * @class h5c3.components.ParticleEmitter
 * @description
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Particles'>h5c3.systems.Particles</a>]
 * <p>
 * A particle generator.
 */
h5c3.components.ParticleEmitter = h5c3.components.Component.extend('h5c3.components.ParticleEmitter',
/** @lends h5c3.components.ParticleEmitter */
{
	/**
	 * Constructs (or acquires from the pool) a particle emitter component
	 * @param {Object} options See member list for available options
	 * @return {h5c3.components.ParticleEmitter} A newly configured emitter component
	 */
	create:function (options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** @lends h5c3.components.ParticleEmitter.prototype */
{
	/** set to false to pause the emitter (and all emissions) */
	active: true,
	/** set to false to stop new emissions, but still update existing ones */
	emitting: true,
	/** minimum amount to grow particles at (negative values shrink) x-axis */
	growXMin:0,
	/** maximum amount to grow particles at x-axis (defaults to growXMin) */
	growXMax:0,
	/** minimum amount to grow particles at (negative values shrink) y-axis */
	growYMin:0,
	/** maximum amount to grow particles at y-axis (defaults to growYMin) */
	growYMax:0,
	/** scaling of the image on x-axis (minimum) */
	scaleXMin: 0,
	/** scaling maximum. if different to min a random scale is chosen */
	scaleXMax: 0,
	/** scaling of the image on y-axis (minimum) */
	scaleYMin: 0,
	/** scaling maximum. if different to min a random scale is chosen */
	scaleYMax: 0,
	/** time to spend fading in the particle */
	fadeInTime: 0,
	/** time spent fading out the particle */
	fadeOutTime: 0,
	/** minimum angle (direction) to fire a particle in */
	angleMin: 0,
	/** maximum angle (direction) to fire a particle in */
	angleMax: 0,
	/** minimum speed */
	thrustMin: 0,
	/** (optional) maximum speed (default is speed minimum */
	thrustMax: 0,
	/** how long to thrust for */
	thrustTime: 0,
	/** min amount of spin on the particle (in degrees per second) */
	spinMin: 0,
	/** max spin (random spin chosen between min and max) */
	spinMax: 0,
	/** distribution of particles over x range */
	rangeX: 1,
	/** distribution of particles over y */
	rangeY: 1,
	/** number to fire out on each emission */
	burst: 1,
	/** delay time between emissions in ms */
	delay: 25,
	/** spritesheet to use (a particle = a frame) */
	spriteSheet: null,
	/** minimum life span of particles */
	lifeMin: 0,
	/** max life span (random life span = max-min) */
	lifeMax: 0,
	/** whether sprite should rotate with angle changes */
	rotateSprite: false,
	/** x position offset (from the position of the entity) */
	offsetX: null,
	/** y position offset (from the position of the entity) */
	offsetY: null,
	/** composite operation on the image */
	compositeOperation: null,
	/** whether particle angles should be relative to the entity I'm attached to */
	relativeAngle: true,
	/** number of shots the emitter shold fire (self destructs after this). 0=repeat continuously */
	shots: 0,
	/** minimum range of alpha to randomly change opacity/alpha */
	alphaMin: 1,
	/** minimum range of alpha to randomly change opacity/alpha */
	alphaMax: 1,
	/** delay before changing alpha */
	alphaDelay: 0,

	_particles: null,
	_lastEmitTime: 0,
	_shotCount: 0,

	/**
	 * Constructs a new component. See create method for options
	 * @param {Object} options Options
	 */
	init:function (options)
	{
		this._super('emitter');
		if ($VLD(options))
			this.config(options);
	},

	/**
	 * Reset the emitter to start again
	 */
	reset: function()
	{
		this._shotCount = 0;
		this._lastEmitTime = 0;
	},

	/**
	 * Configures the component. See create method for options
	 * @param {Object} options Options
	 */
	config:function (options)
	{
		this._lastEmitTime = 0;
		this._shotCount = 0;

		this.active = $CHK(options.active, true);
		this.emitting = $CHK(options.emitting, true);
		this.growXMin = $CHK(options.growXMin, 0);
		this.growXMax = $CHK(options.growXMax, this.growXMin);
		this.growYMin = $CHK(options.growYMin, 0);
		this.growYMax = $CHK(options.growYMax, this.growYMin);
		this.scaleXMin = $CHK(options.scaleXMin, 1);
		this.scaleYMin = $CHK(options.scaleYMin, 1);
		this.scaleXMax = $CHK(options.scaleXMax, 1);
		this.scaleYMax = $CHK(options.scaleYMax, 1);
		this.compositeOperation = $CHK(options.compositeOperation, null);
		this.alphaMin = $CHK(options.alphaMin, 1);
		this.alphaMax = $CHK(options.alphaMax, this.alphaMin);
		this.alphaDelay = $CHK(options.alphaDelay, 50);
		this.shots = $CHK(options.shots, 0);
		this.relativeAngle = $CHK(options.relativeAngle, true);

		this.rangeX = $CHK(options.rangeX, 1);
		this.rangeY = $CHK(options.rangeY, 1);
		this.fadeInTime = $CHK(options.fadeInTime, 0);
		this.fadeOutTime = $CHK(options.fadeOutTime, 0);
		this.angleMin = $CHK(options.angleMin, 0);
		this.angleMax = $CHK(options.angleMax, 359);
		this.thrustMin = $CHK(options.thrustMin, 1);
		this.thrustMax = $CHK(options.thrustMax, this.thrustMin);
		this.thrustTime = $CHK(options.thrustTime, 100);
		this.burst = $CHK(options.burst, 1);
		this.delay = $CHK(options.delay, 25);
		this.lifeMin = $CHK(options.lifeMin, 100);
		this.lifeMax = $CHK(options.lifeMin, this.lifeMin);
		this.rotateSprite = $CHK(options.rotateSprite, false);
		this.spinMin = $CHK(options.spinMin, 0);
		this.spinMax = $CHK(options.spinMax, this.spinMin);
		this.offsetX = $CHK(options.offsetX, 0);
		this.offsetY = $CHK(options.offsetY, 0);
		this.gravityX = $CHK(options.gravityX, 0);
		this.gravityY = $CHK(options.gravityY, 0);
		this.maxVelX = $CHK(options.maxVelX, 50);
		this.maxVelY = $CHK(options.maxVelY, 50);

		if (!$VLD(options.spriteSheet))
			throw "particleemitter.js::config() - A spritesheet is required for the emitter";
		else
			this.spriteSheet = options.spriteSheet;

		if (!Array.isArray(this._particles))
			this._particles = new h5c3.LinkedList();
		else
			this._particles.clear();
	},

	onBeforeRemoved: function()
	{
		// being removed from entity, so need to release any particles that
		// are left back into the pool
		var p = this._particles.first;
		while (p)
		{
			p.obj.release();
			p = p.next();
		}
	}

});
