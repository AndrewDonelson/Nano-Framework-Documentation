/*global h5c3: true, gamecore: true, document: true, navigator: true, window: true */
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 * @module H5C3 Framework
 * @submodule Plugin
 * @class h5c3.plugin.Effects
 * @augments h5c3.Plugin
 * @description
 * Effects class for extended from h5c3.Plugin to provide functionality to the h5c3.
 *
 * <pre><code>
 * var color = new h5c3.Color([255, 0, 0]); // super red
 * </code></pre>
 */
h5c3.plugin.Effects = h5c3.Plugin.extend('h5c3.plugin.Effects',
{
	/**
	 * @property {string} NAME Friendly name for plugidn, may have spaces
	 */
	NAME:	'Effects',
	/**
	 * @property {string} VERSION Holds the current version of the plugin
	 */
	VERSION:	'0.0.1',
	/**
	 * @property {string} DESCRIPTION Short description of what this plugin does.
	 */
	DESCRIPTION:	'A effects system that drives effects like spinning, scaling and fading.',
	/** Folder where files are located */
	srcDir: 'js/',
	/** Plugins required by this plugin */
	requires:[],
	/** List of files that makeup this plugin */
	uses: ['systems.effects.js','components.scale.js','components.spin.js','components.fade.js']
},
{
	/**
	* <description>
	*
	* @param {TYPE} <Name> <description>
	* @returns {TYPE} <description>
	*/	
	init:function(args) 
	{
		this._super();
		/** Insert any initialization code you need here. */
	},
	
	main:function(args)
	{
		this._super();
		/** Insert code to run after loaded & initialized. */
	},
	
	done:function(args)
	{
		/** Insert code to run before unloading. */
		this._super();
	}	
});


/**
 * @class h5c3.components.Fade
 * @description
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Effects'>h5c3.systems.Effects</a>]
 * <p>
 * Adds a fade effects to the entity. e.g.
 * <pre><code>
 * entity.addComponent(
 *      h5c3.components.Fade.create( { holdTime: 1300, fadeOutTime:200 } ) );
 * </code></pre>
 */
h5c3.components.Fade = h5c3.components.Component.extend('h5c3.components.Fade',
/** @lends h5c3.components.Fade */
{
	/**
	 * Constructs (or acquires from the pool) a fade component
	 * @param {Number} options.startDelay ms to wait before doing anything
	 * @param {Number} options.fadeInTime time to fade in (in ms)
	 * @param {Number} options.fadeOutTime time to fade out (in ms)
	 * @param {Number} options.holdTime time to hold between fading in and fading out (in ms)
	 * @param {Number} options.loops number of loops (0=infinite)
	 * @return {h5c3.components.Fade} A configured fade component
	 */
	create:function (options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** @lends h5c3.components.Fade.prototype */
{
	/** ms to wait before doing anything */
	startDelay:0,
	/** time to fade in (in ms) */
	fadeInTime:0,
	/** time to fade out (in ms) */
	fadeOutTime:0,
	/** time to hold between fading in and fading out (in ms) */
	holdTime:0,
	/** when the current state started */
	startTime:0,
	/** how long before we need to change states */
	timeLimit:0,
	/** current state */
	state:0,
	/** number of loops (0=infinite) */
	loops:1,

	/** read-only for how many loops have been completed */
	loopsSoFar:0,

	/**
	 * Constructs a new component. See create method for options
	 */
	init:function ()
	{
		this._super('fade');
	},

	/**
	 * Configures the component. See create method for options
	 * @param {Object} options Options
	 */
	config:function (options)
	{
		this.startDelay = $CHK(options.startDelay, 0);
		this.fadeInTime = $CHK(options.fadeInTime, 0);
		this.fadeOutTime = $CHK(options.fadeOutTime, 0);
		this.holdTime = $CHK(options.holdTime, 0);
		this.loops = $CHK(options.loops, 1);
		this.timeLimit = 0;
		this.state = 0;
		this.loopsSoFar = 0;
	}
});


/**
 * @class h5c3.components.Scale
 * @description
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Effects'>h5c3.systems.Effects</a>]
 * <p>
 * Change the draw scale of an entity
 * <pre><code>
 * entity.addComponent(
 *      h5c3.components.Scale.create( { x: 0.1, y: 0.1, growX: 4, growY: 4, maxX: 8, maxY: 8 } ) );
 * </code></pre>
 */
h5c3.components.Scale = h5c3.components.Component.extend('h5c3.components.Scale',
/** @lends h5c3.components.Scale */
{
	/**
	 * Constructs (or acquires from the pool) a scale component
	 * @param {Number} options.x initial x-axis scale
	 * @param {Number} options.y initial y-axis scale
	 * @param {Number} options.growX amount to grow x-axis per second (can be negative)
	 * @param {Number} options.growY amount to grow y-axis per second (can be negative)
	 * @param {Number} options.maxX maximum x-axis scale change
	 * @param {Number} options.maxY maximum y-axis scale change
	 * @return {h5c3.components.Scale} A configured component
	 */
	create:function (options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** @lends h5c3.components.Scale.prototype */
{
	/** original scale applied to the spatial (only done once when binding the component) */
	x:1,
	/** original scale applied to the spatial (only done once when binding the component) */
	y:1,
	/** rate to grow the x-axis scale (can be negative) */
	growX:0,
	/** rate to grow the y-axis scale (can be negative) */
	growY:0,
	/** maximum x-axis scale change (positive or negative) */
	maxX:0,
	/** maximum y-axis scale change (positive or negative) */
	maxY:0,
	/** amount we have scaled so far (read-only) */
	scaledXSoFar:0,
	/** amount we have scaled so far (read-only) */
	scaledYSoFar:0,
	/** still scaling or not */
	scaling: true,

	_bound:false,

	/**
	 * Constructs a new component. See create method for options
	 * @param {Object} options Options
	 */
	init:function (options)
	{
		this._super('scale');
		if ($VLD(options))
			this.config(options);
	},

	/**
	 * Configures the component. See create method for options
	 * @param {Object} options Options
	 */
	config:function (options)
	{
		this.x = $CHK(options.x, 1);
		this.y = $CHK(options.y, 1);
		this.growX = $CHK(options.growX, 0);
		this.growY = $CHK(options.growY, 0);
		this.maxX = $CHK(options.maxX, 0);
		this.maxY = $CHK(options.maxY, 0);
		this.scaledXSoFar = 0;
		this.scaledYSoFar = 0;
	}
});


/**
 * @class h5c3.components.Spin
 * @description
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Effects'>h5c3.systems.Effects</a>]
 * <p>
 * Makes an entity spin
 * <pre><code>
 * entity.addComponent(
 *      h5c3.components.Spin.create( { rate: 15 } ) );
 * </code></pre>
 */
h5c3.components.Spin = h5c3.components.Component.extend('h5c3.components.Spin',
/** @lends h5c3.components.Spin */
{
	/**
	 * Constructs (or acquires from the pool) a fade component
	 * @param {Number} options.rate rate of spin in degrees per second (default is 15)
	 * @param {Number} options.max Amount to spin (optional, default is 0 - unlimited)
	 * @param {Boolean} options.clockwise Whether to spin in a clockwise direction (default is true)
	 * @return {h5c3.components.Spin} A configured component
	 */
	create:function (options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** @lends h5c3.components.Spin.prototype */
{
	/** rate of spin in degrees per second */
	rate:0,
	/** number of degrees to spin */
	max:0,
	/** spin clockwise or counter clockwise */
	clockwise: true,
	/** degrees spun so far */
	spinSoFar: 0,
	/** still spinning */
	spinning: true,

	/**
	 * Constructs a new component. See create method for options
	 * @param {Object} options Options
	 */
	init:function (options)
	{
		this._super('spin');
		if ($VLD(options))
			this.config(options);
	},

	/**
	 * Configures the component. See create method for options
	 * @param {Object} options Options
	 */
	config:function (options)
	{
		this.rate = $CHK(options.rate, 15);
		this.max = $CHK(options.max, 0);
		this.clockwise = $CHK(options.clockwise, true);
		this.spinSoFar = 0;
		this.spinning = true;
	}
});


/**
 * @class h5c3.systems.Effects
 * @description
 * [Extends <a href='h5c3.systems.System'>h5c3.systems.System</a>]
 * <p>
 * A effects system that drives effects like spinning, scaling and fading.
 */
h5c3.systems.Effects = h5c3.systems.EntitySystem.extend('h5c3.systems.Effects',
/** @lends h5c3.systems.Effects */
{
	FadeState:
	{
		NOT_STARTED: 0,
		DELAYING:1,
		FADING_IN:2,
		HOLDING:3,
		FADING_OUT:4,
		DONE: 5
	}
},
/** @lends h5c3.systems.Effects.prototype */
{
	/**
	 * Constructs a new systems with options.
	 */
	init: function()
	{
		this._super( [ 'fade', 'spin', 'scale' ] );
	},

	/**
	 * Processes all the entities with effect components
	 */
	processAll: function()
	{
		var next = this.entities.first;
		while (next)
		{
			var entity = next.obj;
			if (entity.active)
			{
				var fade = entity.getComponent('fade');
				if (fade)
				{
					var alpha = entity.getComponent('alpha');
					if (!alpha)
						alpha = entity.addComponent(h5c3.components.Alpha.create({}));

					if (fade.state != this.Class.FadeState.DONE)
					{
						if (!this._fade(alpha, fade))
							entity.removeComponent(fade);
					}
				}
				var spin = entity.getComponent('spin');
				if (spin && spin.spinning)
				{
					var spatial = entity.getComponent('spatial');
					var a = spin.rate / h5c3.device.elapsed;

					if (spin.max > 0 && spin.spinSoFar+a >= spin.max)
					{
						spin.spinning = false;
						a = (spin.max-spin.spinSoFar);
					}
					spin.spinSoFar += a;
					spatial.setDir( h5c3.Math.rotate(spatial.getDir(), spin.clockwise ? a : -a));
				}

				var scale = entity.getComponent('scale');
				if (scale && scale.scaling)
				{
					spatial = entity.getComponent('spatial');

					if (!scale._bound && (scale.x != 1 || scale.y != 1))
					{
						spatial.addScale(scale.x, scale.y);
						scale._bound = true;
						if (scale.growX == 0 && scale.growY == 0)
							scale.scaling = false;
					}

					var sx = scale.growX / h5c3.device.elapsed;
					var sy = scale.growY / h5c3.device.elapsed;

					if (scale.maxX != 0 && (scale.scaledXSoFar > 0 && scale.scaledXSoFar + sx >= scale.maxX))
						sx = (scale.maxX - scale.scaledXSoFar);
					if (scale.maxY != 0 && (scale.scaledYSoFar > 0 && scale.scaledYSoFar + sy >= scale.maxY))
						sy = (scale.maxY - scale.scaledYSoFar);

					scale.scaledXSoFar += sx;
					scale.scaledYSoFar += sy;
					spatial.addScale(sx, sy);

					if ((scale.maxX != 0 && scale.scaledXSoFar >= scale.maxX) &&
						(scale.maxY != 0 && scale.scaledYSoFar >= scale.maxY))
						scale.scaling = false;
				}
			}

//                var floatAway = entity.getComponent('float');
//                if (float)
//                {
//                      this component could just modify physics over time?
//                }

			next = next.next();
		}
	},

	_fade: function(alpha, fader)
	{
		var timeSinceStart = h5c3.device.now - fader.startTime;

		// do something about the current state, and change states if it's time.
		switch (fader.state)
		{
			case this.Class.FadeState.NOT_STARTED:
				fader.startTime = h5c3.device.now;

				if (fader.startDelay > 0)
				{
					fader.state = this.Class.FadeState.DELAYING;
					fader.timeLimit = fader.startDelay;
					alpha.setAlpha(0);

				} else if (fader.fadeInTime > 0)
				{
					fader.state = this.Class.FadeState.FADING_IN;
					fader.timeLimit = fader.fadeInTime;
					// if we have a fade in element, then start alpha at 0
					alpha.setAlpha(0);
				}
				else if (fader.holdTime > 0)
				{
					fader.state = this.Class.FadeState.HOLDING;
					fader.timeLimit = fader.holdTime;
				}
				else if (fader.fadeOutTime > 0)
				{
					fader.state = this.Class.FadeState.FADING_OUT;
					fader.timeLimit = fader.fadeOutTime;
				}
				break;

			case this.Class.FadeState.DELAYING:
				// do nothing whilst holding
				if (timeSinceStart > fader.timeLimit)
				{
					fader.timeLimit = fader.fadeInTime;
					fader.startTime = h5c3.device.now;
					fader.state = this.Class.FadeState.FADING_IN;
				}
				break;
			case this.Class.FadeState.FADING_IN:
				alpha.addAlpha((h5c3.device.elapsed * (100 / fader.timeLimit)) / 100);
				if (timeSinceStart > fader.timeLimit)
				{
					fader.timeLimit = fader.holdTime;
					fader.startTime = h5c3.device.now;
					fader.state = this.Class.FadeState.HOLDING;
				}
				break;
			case this.Class.FadeState.HOLDING:
				if (timeSinceStart > fader.timeLimit)
				{
					fader.timeLimit = fader.fadeOutTime;
					fader.startTime = h5c3.device.now;
					fader.state = this.Class.FadeState.FADING_OUT;
				}
				// do nothing whilst holding
				break;
			case this.Class.FadeState.FADING_OUT:
				if (timeSinceStart > fader.timeLimit)
				{
					fader.loopsSoFar++;

					if (fader.loops > 1 || fader.loops == 0) // restart?
					{
						fader.startTime = h5c3.device.now;
						fader.timeLimit = fader.fadeInTime;
						fader.state = this.Class.FadeState.FADING_IN;
						if (fader.timeLimit > 0) alpha.setAlpha(0);
					}

					if (fader.loopsSoFar >= fader.loops)
					{
					   // all done, kill thyself
					   fader.state = this.Class.FadeState.DONE;
					   if (fader.timeLimit > 0) alpha.setAlpha(0);
					   return false;
					}
				} else
				{
					alpha.subAlpha((h5c3.device.elapsed * (100 / fader.timeLimit)) / 100);
				}

				break;
		}
		return true;
	}
});