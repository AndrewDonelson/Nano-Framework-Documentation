/*global h5c3: true, gamecore: true, document: true, navigator: true, window: true */
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 *  H5C3 Framework
 *  Plugin
 * Class:  h5c3.Plugin.Render
 *  h5c3.Plugin
 * 
 * Render class for extended from h5c3.Plugin to provide functionality to the h5c3.
 *
 * 
 * var color = new h5c3.Color([255, 0, 0]); // super red
 * (end)
 */
h5c3.Plugin.Render = h5c3.Plugin.extend('h5c3.Plugin.Render',
{
	/**
	 * Property: String NAME Friendly name for plugin, may have spaces
	 */
	NAME:	'Renderer',
	/**
	 * Property: String VERSION Holds the current version of the plugin
	 */
	VERSION:	'0.0.1',
	/**
	 * Property: String DESCRIPTION Short description of what this plugin does.
	 */
	DESCRIPTION:	'Handles activating entities when they get within a certain range of another entity.',
	/** Folder where files are located */
	srcDir: 'js/',
	/** Plugins required by this plugin */
	requires:[],
	/** List of files that makeup this plugin */
	uses: ['systems.activation.js','components.activator.js']
},
{
	/**
	* <description>
	*
	* Parameters:  {TYPE} <Name> <description>
	* Returns:  {TYPE} <description>
	*/	
	init:function(args) 
	{
		this._super(args);
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
 *  H5C3 Framework
 *  Components
 * Class:  h5c3.components.Alpha
 * 
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Render'>h5c3.systems.Render</a>]
 * 
 * Changes the alpha drawing of an associated drawable object (sprite, shape, text etc).
 */
h5c3.components.Alpha = h5c3.components.Component.extend('h5c3.components.Alpha',
/** Interface: h5c3.components.Alpha */
{
	/**
	 * Constructs (or acquires) an alpha component.
	 * Parameters:  Number options.level Amount of initial alpha to set
	 * Returns: {h5c3.components.Alpha} The new alpha object
	 */
	create:function (options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** Interface: h5c3.components.Alpha.prototype */
{
	/** Current alpha level 0=fully transparent */
	level:1,

	/**
	 * Constructs a new component. See create method for options
	 */
	init:function()
	{
		this._super('alpha');
	},

	/**
	 * Configures the component. See create method for options
	 * Parameters:  Object options Options
	 */
	config:function (options)
	{
		this.level = $CHK(options.level, 1);
	},

	/**
	 * Set the alpha level
	 * Parameters:  Number a Level to set alpha to
	 */
	setAlpha: function(a)   { this.level = a;  this._fix(this.level); },

	/**
	 * Add to the alpha level
	 * Parameters:  Number a Amount to increase alpha by
	 */
	addAlpha: function(a)   { this.level += a; this._fix(this.level); },

	/**
	 * Subtract from the alpha level
	 * Parameters:  Number a Amount o subtract
	 */
	subAlpha: function(a)   { this.level -= a; this._fix(this.level); },

	_fix: function(c)
	{
		if (c > 1) return;
		if (c < 0) return;
		this.level = c;
	}
});


/**
 *  H5C3 Framework
 *  Components
 * Class:  h5c3.components.Circle
 * 
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Render'>h5c3.systems.Render</a>]
 * 
 * Draw a circle. The size is based on the width and height of the associated spatial.
 */
h5c3.components.Circle = h5c3.components.Component.extend('h5c3.components.Circle',
/** Interface: h5c3.components.Circle */
{
	/**
	 * Constructs (or acquires from the pool) a rectangle component.
	 * Parameters:  String options.color Fill color in the form of #RRGGBB.
	 * Parameters:  String options.lineColor Line color in the form of #RRGGBB
	 * Parameters:  Number options.lineWidth Stroke width
	 * Returns: {h5c3.components.Circle} The new component
	 */
	create:function (options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** Interface: h5c3.components.Circle.prototype */
{
	/** h5c3.Color representing fill color */
	color:null,
	/** h5c3.Color representing stroke color */
	lineColor:null,
	/** Stroke width */
	lineWidth:0,

	/**
	 * Constructs a new component. See create method for options
	 */
	init:function ()
	{
		this._super('circle');
	},

	/**
	 * Configures the component. See create method for options
	 * Parameters:  Object options Options
	 */
	config:function (options)
	{
		if (options.color)
		{
			if (this.color == null)
				this.color = h5c3.Color.create(options.color);
			else
				this.color.set(options.color);
		} else
			this.color = null;

		if (options.lineColor)
		{
			if (this.lineColor == null)
				this.lineColor = h5c3.Color.create(options.lineColor);
			else
				this.lineColor.set(options.lineColor);
		} else
			this.lineColor = null;

		this.lineWidth = $CHK(options.lineWidth, 0);
	}

});



/**
 *  H5C3 Framework
 *  Components
 * Class:  h5c3.components.Clip
 * 
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Render'>h5c3.systems.Render</a>]
 * 
 * Clips all rendering for an entity to be within the specified rect (in layer relative coordinates)
 * You can also specify an entity, which will clip based on the spatial rectangle of the other entity
 * You can also do both entity clipping as well as stacking a rectangle clip on top
 */
h5c3.components.Clip = h5c3.components.Component.extend('h5c3.components.Clip',
/** Interface: h5c3.components.Clip */
{
	/**
	 * Constructs (or acquires) a clipping component
	 * Parameters:  options
	 */
	create:function (options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** Interface: h5c3.components.Clip.prototype */
{
	/** Clip this entity to the bounding rectangle of another entity */
	clipEntity:null,
	/** x-position of the top left of the clipping rectangle */
	x:0,
	/** y-position of the top left of the clipping rectangle */
	y:0,
	/** Width the clipping rectangle */
	w:0,
	/** Height the clipping rectangle */
	h:0,

	/**
	 * Constructs (or acquires) a clipping component
	 */
	init:function ()
	{
		this._super('clip');
	},

	/**
	 * Configures the component. See create method for options
	 * Parameters:  Object options Options
	 */
	config:function (options)
	{
		this.clipEntity = $CHK(options.clipEntity, null);
		this.x = $CHK(options.x, 0);
		this.y = $CHK(options.y, 0);
		this.w = $CHK(options.w, 0);
		this.h = $CHK(options.h, 0);
	}

});


/**
 * Class:  h5c3.components.OriginShifter
 * 
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Render'>h5c3.systems.Render</a>]
 * 
 * Shifts the origin of the entity relative to the origin of the layer it's on, with an additional origin ratio
 * adjuster. You can use this to make an entity shift around as the layer origin moves (parallax within parallax)
 */
h5c3.components.OriginShifter = h5c3.components.Component.extend('h5c3.components.OriginShifter',
/** Interface: h5c3.components.OriginShifter */
{
	/**
	 * Constructs (or acquires from the pool) a component, configuring it with the given options.
	 * Parameters:  Number options.ratio The ratio to shift the position by
	 * Returns: Mixed
	 */
	create:function (options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** Interface: h5c3.components.OriginShifter.prototype */
{
	/** current shift ratio */
	ratio:1,

	_offsetX: 0,
	_offsetY: 0,

	/**
	 * Constructs a new component. See create method for options
	 * Parameters:  Object options Options
	 */
	init:function (options)
	{
		this._super('originshifter');
		if ($VLD(options))
			this.config(options);
	},

	/**
	 * Configures the component. See create method for options
	 * Parameters:  Object options Options
	 */
	config:function (options)
	{
		this.ratio = $CHK(options.ratio, 1);
	}

});



/**
 * Class:  h5c3.components.Overlay
 * 
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Render'>h5c3.systems.Render</a>]
 * 
 * Used to lay another sprite over an entity, with options to automagically expire after a certain time limit.
 * Good for things like smoke, explosive damage or muzzle flashs, and where you don't need to create a complete
 * entity.
 */
h5c3.components.Overlay = h5c3.components.Component.extend('h5c3.components.Overlay',
/** Interface: h5c3.components.Overlay */
{
	/**
	 * Constructs (or acquires an object from the pool) with the given options.
	 * Parameters:  Number options.lifetime Lifetime of the overlay (will automatically remove itself)
	 * Parameters:  {h5c3.SpriteSheet} options.spriteSheet Sprite sheet to use for the animation
	 * Parameters:  String options.animationStart Which animation to play in the sprite
	 * Parameters:  Number options.animationStartDelay Amount of time in ms to increase or decrease the animation speed
	 * Returns: {h5c3.components.Overlay} An overlay component
	 */
	create: function(options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** Interface: h5c3.components.Overlay.prototype */
{
	/** lifetime the overlay will display for */
	lifetime: 0,
	/** sprite object this overlay displays */
	sprite: null,

	/**
	 * Constructs a new component. See create method for options
	 * Parameters:  Object options Options
	 */
	init: function(options)
	{
		this._super('overlay');
		this.sprite = h5c3.Sprite.create();
		if ($VLD(options))
			this.config(options);
	},

	/**
	 * Configures the component. See create method for options
	 * Parameters:  Object options Options
	 */
	config: function(options)
	{
		this.lifetime = $CHK(options.lifetime, 1000);

		var spriteSheet = $CHK(options.spriteSheet, null);
		if (spriteSheet == null)
			throw "overlay.js::config() - "+this.getUniqueId() + ': no spritesheet specified';

		this.sprite.setSpriteSheet(spriteSheet);

		var animationStart = $CHK(options.animationStart, null);
		var animationStartDelay = $CHK(options.animationStartDelay, 0);
		if (animationStart != null)
			this.sprite.setAnimation(animationStart, animationStartDelay);
	},

	/**
	 * Descreases the amount of time the sprite should stay alive for
	 * Parameters:  Number time Time to reduce by in ms
	 */
	decrease: function(time)    { this.lifetime -= time;  },

	/**
	 * Tests if the sprite has expired already
	 * Returns: Boolean True if it has expired
	 */
	hasExpired: function()      { return this.lifetime <= 0; }

});


/**
 * Class:  h5c3.components.Poly
 * 
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Render'>h5c3.systems.Render</a>]
 * 
 * Draw a polygon
 */
h5c3.components.Poly = h5c3.components.Component.extend('h5c3.components.Poly',
/** Interface: h5c3.components.Poly */
{
	/**
	 * Constructs (or acquires from the pool) a rectangle component.
	 * Parameters:  String options.color Fill color in the form of #RRGGBB.
	 * Parameters:  String options.lineColor Line color in the form of #RRGGBB
	 * Parameters:  Number options.lineWidth Stroke width
	 * Parameters:  Number options.points Array of points to draw
	 * Returns: {h5c3.components.Poly} The new component
	 */
	create:function (options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** Interface: h5c3.components.Poly.prototype */
{
	/** h5c3.Color representing fill color */
	color:null,
	/** h5c3.Color representing stroke color */
	lineColor:null,
	/** Stroke width */
	lineWidth:0,
	/** array of points to draw */
	points:[],

	/**
	 * Constructs a new component. See create method for options
	 * Parameters:  Object options Options
	 */
	init:function (options)
	{
		this._super('poly');
		this.color = h5c3.Color.create('#ffffff');
		this.lineColor = null;
		if ($VLD(options))
			this.config(options);
	},

	/**
	 * Configures the component. See create method for options
	 * Parameters:  Object options Options
	 */
	config:function (options)
	{
		if (!options.color)
			this.color.set('#ffffff');
		else
			this.color.set($CHK(options.color, '#ffffff'));

		if ($VLD(options.lineColor))
		{
			if (this.lineColor == null)
				this.lineColor = h5c3.Color.create(options.lineColor);
			else
				this.lineColor.set($CHK(options.lineColor, '#888888'));
		}
		this.lineWidth = $CHK(options.lineWidth, 0);
		if (options.points.length < 3)
			throw 'poly.js::config() - Invalid polygon, requires at least 3 points';
		this.points = options.points;
	}
});



/**
 * Class:  h5c3.components.Rect
 * 
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Render'>h5c3.systems.Render</a>]
 * 
 * Adds a rectangle to an entity.
 */
h5c3.components.Rect = h5c3.components.Component.extend('h5c3.components.Rect',
/** Interface: h5c3.components.Rect */
{
	/**
	 * Constructs (or acquires from the pool) a rectangle component.
	 * Parameters:  String options.color Fill color in the form of #RRGGBB.
	 * Parameters:  String options.lineColor Line color in the form of #RRGGBB
	 * Parameters:  Number options.lineWidth Stroke width
	 * Parameters:  Number options.cornerRadius Radius of the corners (defaults to 0)
	 * Returns: {h5c3.components.Rect} A rectangle component
	 */
	create:function (options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** Interface: h5c3.components.Rect.prototype */
{
	/** h5c3.Color representing fill color */
	color:null,
	/** h5c3.Color representing stroke color */
	lineColor:null,
	/** Stroke width */
	lineWidth:0,
	/** radius of the corners (0=straight edges) */
	cornerRadius:0,

	/**
	 * Constructs a new component. See create method for options
	 * Parameters:  Object options Options
	 */
	init:function (options)
	{
		this._super('rect');
		this.color = h5c3.Color.create('#ffffff');
		this.lineColor = h5c3.Color.create('#888888');
		if ($VLD(options))
			this.config(options);
	},

	/**
	 * Configures the component. See create method for options
	 * Parameters:  Object options Options
	 */
	config:function (options)
	{
		if (!options.color)
			this.color.set('#ffffff');
		else
			this.color.set($CHK(options.color, '#ffffff'));

		if (!options.lineColor)
			this.lineColor.set('#ffffff');
		else
			this.lineColor.set($CHK(options.lineColor, '#888888'));

		this.lineWidth = $CHK(options.lineWidth, 0);
		this.cornerRadius = $CHK(options.cornerRadius, 0);
	}

});



/**
 * Class:  h5c3.components.Spatial
 * 
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Render'>h5c3.systems.Render</a>, <a href='h5c3.systems.Physics'>h5c3.systems.Physics</a>,
 * <a href='h5c3.systems.Layout'>h5c3.systems.Layout</a>]
 * 
 * Represents where an entity exists in 2D space (x, y, width and height). This component is mostly for use by other
 * systems to update and use.
 */
h5c3.components.Spatial = h5c3.components.Component.extend('h5c3.components.Spatial',
/** Interface: h5c3.components.Spatial */
{
	/**
	 * Constructs (or acquires from the pool) a spatial component configuring it with the given options
	 * Parameters:  {h5c3.Point} options.pos Position (containing x, y) to place the entity
	 * Parameters:  {h5c3.Dim} options.dim Size (containing x, y) of the entity (x=width, y=height)
	 * Returns: {h5c3.components.Spatial} A shiney new component
	 */
	create: function(options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** Interface: h5c3.components.Spatial.prototype */
{
	/** Last movement in 2D space */
	lastMove: null,

	/** position of the entity as a h5c3.Point object (use pos.x and pos.y). */
	pos: null,
	/** dimension of the entity as a h5c3.Dim object (use dim.x for width and dim.y for height) */
	dim: null,
	/** amount the spatial is scaled on x-axis */
	scaleX: 0,
	/** amount the spatial is scaled on y-axis */
	scaleY: 0,
	dir: 0,

	_centerPos: null, // cache of the current center
	_screenRect: null, // cache of the getScreenRect return

	/**
	 * Constructs a new component. See create method for options
	 * Parameters:  Object options Options
	 */
	init: function(options)
	{
		this._super('spatial');

		this.pos = h5c3.Point.create(0, 0);
		this.dim = h5c3.Dim.create(0, 0);
		this._screenRect = h5c3.Rect.create(0, 0, 0, 0);
		this._centerPos = h5c3.Point.create(0, 0);
		this._unscaledPos = h5c3.Point.create(0,0);
		this._unscaledDim = h5c3.Point.create(0,0);
		this.lastMove = h5c3.Dim.create(0, 0);
		this.scaleX = 1;
		this.scaleY = 1;

		if ($VLD(options))
			this.config(options);
	},

	/**
	 * Configures the component. See create method for options
	 * Parameters:  Object options Options
	 */
	config: function(options)
	{
		this.pos.x = $CHK(options.x, 0);
		this.pos.y = $CHK(options.y, 0);
		this.dim.x = $CHK(options.w, 0);
		this.dim.y = $CHK(options.h, 0);
		this.dir = $CHK(options.dir, 0);
		this.scaleX = $CHK(options.scaleX, 1);
		this.scaleY = $CHK(options.scaleY, 1);

		this._centerPos.x = 0;
		this._centerPos.y = 0;
		this._screenRect.x = 0;
		this._screenRect.y = 0;
		this._screenRect.w = 0;
		this._screenRect.h = 0;
		this.lastMove.x = 0;
		this.lastMove.y = 0;
	},

	/**
	 * Get the current position
	 * Returns: {h5c3.Point} the current position
	 */
	getPos: function()
	{
		return this.pos;
	},

	/**
	 * Get the current dimensions (x, y)
	 * Returns: {h5c3.Dim} Reference to the current h5c3.Dim for this spatial
	 */
	getDim: function()
	{
		return this.dim;
	},

	/**
	 * Increase the dimensions of the spatial by the given x and y scales. Scaling occurs relative to the
	 * center of the spatial, so the position is moved accordingly
	 * Parameters:  Number x x-axis scale to apply (can be negative to shrink)
	 * Parameters:  Number y y-axis scale to apply (can be negative to shrink)
	 */
	addScale:function(x, y)
	{
		this.pos.x -= (this.dim.x * x);
		this.pos.y -= (this.dim.y * y);
		this.dim.x *= (1+x);
		this.dim.y *= (1+y);
		this.scaleX += x;
		this.scaleY += y;
	},

	_unscaledPos: null,

	/**
	 * Gets the spatial position, without any scaling effects
	 * Returns: {h5c3.Point} The unscaled position
	 */
	getUnscaledPos:function()
	{
		this._unscaledPos.x = this.pos.x / this.scaleX;
		this._unscaledPos.y = this.pos.y / this.scaleY;
		return this._unscaledPos;
	},

	_unscaledDim: null,

	/**
	 * Gets the spatial dimensions, without any scaling effects
	 * Returns: {h5c3.Dim} The unscaled dimensions
	 */
	getUnscaledDim:function()
	{
		this._unscaledDim.x = this.dim.x / this.scaleX;
		this._unscaledDim.y = this.dim.y / this.scaleY;
		return this._unscaledDim;
	},

	/**
	 * Reduces the scale of the spatial. See addScale for details
	 * Parameters:  Number x x-axis scale to reduce by
	 * Parameters:  Number y y-axis scale to reduce by
	 */
	subtractScale:function (x, y)
	{
		this.addScale(-x, -y);
	},

	/**
	 * Set the spatial direction
	 * Parameters:  Number d Direction to set
	 */
	setDir:function(d)
	{
		this.dir = d;
	},

	/**
	 * Get the current direction
	 * Returns: Number Direction
	 */
	getDir:function ()
	{
		return this.dir;
	},

	/**
	 * Get the center pos of the spatial (calculated when you call this)
	 * Returns: {h5c3.Point} A h5c3.Point representing the center of the spatial (cached so you do not need to release it)
	 */
	getCenterPos: function()
	{
		this._centerPos.x = this.pos.x + (this.dim.x/2);
		this._centerPos.y = this.pos.y + (this.dim.y/2);
		return this._centerPos;
	},

	/**
	 * Gets a h5c3.Rect of the screen relative location of this spatial (i.e. not world space)
	 * Returns: {h5c3.Rect} on-screen rectangle (cached, so you should not release it). Null if not on a layer.
	 */
	getScreenRect: function()
	{
		if (this._entity && this._entity.layer)
		{
			this._screenRect.x = this._entity.layer.screenX(this.pos.x);
			this._screenRect.y = this._entity.layer.screenY(this.pos.y);
			this._screenRect.w = this.dim.x;
			this._screenRect.h = this.dim.y;
			return this._screenRect;
		}
		return null;
	},

	/**
	 * A nice string representation of the spatial
	 * Returns: String A string representation
	 */
	toString: function()
	{
		return 'x: ' + this.x + ' y: ' + this.y + ' z: ' + this.z + ' dir: '+ this.dir;
	}


});



/**
 * Class:  h5c3.components.Sprite
 * 
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Render'>h5c3.systems.Render</a>]
 * 
 * Adds a sprite to an entity. See the core <a href='h5c3.Sprite'>sprite</a> class for information on sprites.
 */
h5c3.components.Sprite = h5c3.components.Component.extend('h5c3.components.Sprite',
/** Interface: h5c3.components.Sprite */
{
	/**
	 * Constructs (or acquires from the pool) a sprite component.
	 * Parameters:  {h5c3.Sprite} options.sprite Sprite object to use
	 * Parameters:  {h5c3.Point} options.offset Object containing x, y properties. Offset position of the sprite.
	 * Returns: {h5c3.components.Sprite} A newly configured sprite component
	 */
	create: function(options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** Interface: h5c3.components.Sprite.prototype */
{
	/** sprite object */
	sprite:null,
	/** Offset position of the text relative to the entity spatial */
	offset:null,

	/**
	 * Constructs a new component. See create method for options
	 * Parameters:  Object options Options
	 */
	init: function(options)
	{
		this._super('sprite');
		this.sprite = h5c3.Sprite.create();
		this.offset = h5c3.Point.create(0,0);
		if ($VLD(options))
			this.config(options);
	},

	/**
	 * Configures the component. See create method for options
	 * Parameters:  Object options Options
	 */
	config: function(options)
	{
		var spriteSheet = $CHK(options.spriteSheet, null);
		if (spriteSheet == null)
			throw "sprite.js::config() - "+this.getUniqueId() + ': no spritesheet specified';

		this.sprite.setSpriteSheet(spriteSheet);

		if ($VLD(options.offset))
		{
			this.offset.x = $CHK(options.offset.x, 0);
			this.offset.y = $CHK(options.offset.y, 0);
		} else
		{
			this.offset.x = 0;
			this.offset.y = 0;
		}

		var animationStart = $CHK(options.animationStart, null);
		var animationStartDelay = $CHK(options.animationStartDelay, 0);
		if (animationStart != null)
			this.sprite.setAnimation(animationStart, animationStartDelay);

		this.sprite.currentFrame = $CHK(options.currentFrame, 0);

		var currentAnim = $CHK(options.currentAnim, null);
		if (currentAnim != null)
			this.sprite.setAnimation(options.currentAnim);
	}
});



/**
 * Class:  h5c3.components.Text
 * 
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Render'>h5c3.systems.Render</a>]
 * 
 * Adds display text to an entity.
 */
h5c3.components.Text = h5c3.components.Component.extend('h5c3.components.Text',
/** Interface: h5c3.components.Text */
{
	/**
	 * Constructs (or acquires from the pool) a text component.
	 * Parameters:  String options.color Fill color in the form of #RRGGBB.
	 * Parameters:  String options.strokeColor Line color in the form of #RRGGBB
	 * Parameters:  Number options.lineWidth Stroke width
	 * Parameters:  String options.font Name of the font
	 * Parameters:  Number options.height Size/height of the font (i.e. 20 for 20pt)
	 * Parameters:  String options.text String to display
	 * Parameters:  {h5c3.Point} options.offset Object containing x, y properties. Offset position of the text.
	 * Returns: {h5c3.components.Text} A text component
	 */
	create: function(options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** Interface: h5c3.components.Text.prototype */
{
	/** h5c3.Color representing fill color */
	color: null,
	/** h5c3.Color representing stroke color */
	strokeColor: null,
	/** Font name (read-only - use setFont) */
	font: null,
	/** Font size: 20 = 20pt (read-only - use setHeight) */
	fontHeight: 0,
	/** Display text */
	text: null,
	/** Stroke width */
	lineWidth: 0,
	/** Offset position of the text relative to the entity spatial */
	offset: null,

	_fontCache: null,

	/**
	 * Constructs a new component. See create method for options
	 * Parameters:  Object options Options
	 */
	init: function(options)
	{
		this._super('text');
		this.color = h5c3.Color.create('#ffffff');
		this.strokeColor = h5c3.Color.create('#888888');
		this.text = [];
		this.font = 'Calibri';
		this.fontHeight = 20;
		this.offset = h5c3.Dim.create(0,0);
		this._fontCache = '';
		if ($VLD(options))
			this.config(options);
	},

	/**
	 * Configures the component. See create method for options
	 * Parameters:  Object options Options
	 */
	config: function(options)
	{
		this.color.set($CHK(options.color, '#ffffff'));
		this.strokeColor.set($CHK(options.strokeColor, '#888888'));
		this.lineWidth = $CHK(options.lineWidth, 0);
		this.text = $CHK(options.text, ['']);
		this.font = $CHK(options.font, 'Arial');
		this.fontHeight = $CHK(options.fontHeight, 20);
		if ($VLD(options.offset))
		{
			this.offset.x = $CHK(options.offset.x);
			this.offset.y = $CHK(options.offset.y);
		}
		this._updateFont();
	},

	/**
	 * Sets the font height
	 * Parameters:  Number height Height in points (20=20pt)
	 */
	setHeight: function(height)
	{
		this.fontHeight = height;
		this._updateFont();
	},

	/**
	 * Sets the font
	 * Parameters:  String font Name of the font (i.e. 'Arial')
	 */
	setFont: function(font)
	{
		this.font = font;
		this._updateFont();
	},

	_updateFont: function()
	{
		this._fontCache = '' + this.fontHeight + 'px ' + this.font;
	}
});



/**
 * Class:  h5c3.systems.Render
 * 
 * [Extends <a href='h5c3.systems.System'>h5c3.systems.System</a>]
 * 
 * Handles rendering of components: Alpha, Sprite, Overlay, Clip, Rect, Circle, Text
 */
h5c3.systems.Render = h5c3.systems.EntitySystem.extend('h5c3.systems.Render',
/** Interface: h5c3.systems.Render */
{},
/** Interface: h5c3.systems.Render.prototype */
{
	/**
	 * Constructs a new render system.
	 */
	init: function()
	{
		this._super( [ 'Alpha', 'sprite', 'overlay', 'rect', 'clip', 'text', 'poly', 'circle', 'Spatial', 'OriginShifter' ] );
	},

	processAll: function()
	{
		var startTime = Date.now();

		var next = this.entities.first;
		while (next)
		{
			var entity = next.obj;
			if (entity.active)
			{
				var spatial = entity.getComponent('spatial');
				var alpha = entity.getComponent('alpha');
				var clip = entity.getComponent('clip');

				// accommodate scene viewport and layering offset positions
				var drawX = entity.layer.screenX(spatial.pos.x);
				var drawY = entity.layer.screenY(spatial.pos.y);
				var unscaledPos = spatial.getUnscaledPos();

				// is it onscreen?
				if (entity.layer.scene.viewPort.overlaps(drawX, drawY, spatial.dim.x, spatial.dim.y,0, spatial.dir))
				{
					//var ctx = h5c3.device.ctxGame;
					var ctx = entity.layer.scene.ctx;
					ctx.save();

					if (clip)
					{
						ctx.beginPath();
						if (clip.clipEntity)
						{
							// entity plus clipping rectangle
							var sp = clip.clipEntity.getComponent('spatial');
							ctx.rect(
								entity.layer.screenX(sp.pos.x) + clip.x, entity.layer.screenY(sp.pos.y) + clip.y,
								sp.dim.x+clip.w, sp.dim.y+clip.h);
						} else
						{
							// just plain rectangle clipping
							ctx.rect(
								entity.layer.screenX(spatial.pos.x) + clip.x,
								entity.layer.screenY(spatial.pos.y) + clip.y, clip.w, clip.h);
						}
						ctx.closePath();
						ctx.clip();
					}

					if (spatial.scaleX != 1 || spatial.scaleY != 1)
					{
						ctx.scale(spatial.scaleX, spatial.scaleY);
						drawX = entity.layer.screenX(unscaledPos.x);
						drawY = entity.layer.screenY(unscaledPos.y);
					}

					var shifter = entity.getComponent('originshifter');
					if (shifter)
					{
						// if it has a shifter on it, adjust the position of the entity based on a ratio to
						// the layer's origin

						// reverse any changes we've made so far
						var origX = spatial.pos.x - shifter._offsetX;
						var origY = spatial.pos.y - shifter._offsetY;

						shifter._offsetX = (this.layer.origin.x * shifter.ratio);
						shifter._offsetY = (this.layer.origin.y * shifter.ratio);

						spatial.pos.x = origX + shifter._offsetX;
						spatial.pos.y = origY + shifter._offsetY;
					}

					var spriteComponent = entity.getComponent('sprite');
					if (spriteComponent)
					{
						spriteComponent.sprite.update(h5c3.device.elapsed);
						if (alpha && alpha.level != 1 && alpha.level != 0)
							spriteComponent.sprite.alpha = alpha.level;
						spriteComponent.sprite.draw(ctx, drawX+ spriteComponent.offset.x, drawY+ spriteComponent.offset.y, spatial.dir);
					}

					var overlay = entity.getComponent('overlay');
					if (overlay)
					{
						// update and draw the overlay sprite
						overlay.sprite.update(h5c3.device.elapsed);
						if (alpha)
							overlay.sprite.alpha = alpha.level;
						overlay.sprite.draw(ctx, drawX, drawY, spatial.dir);

						overlay.decrease(h5c3.device.elapsed);
						if (overlay.hasExpired())
							entity.removeComponent(overlay);
					}

					var rect = next.obj.getComponent('rect');
					if (rect)
					{
						ctx.save();
						if (alpha) ctx.globalAlpha = alpha.level;

						ctx.translate((drawX+(spatial.dim.x/2)), (drawY+(spatial.dim.y/2)));
						ctx.rotate( spatial.dir * (Math.PI/180));

						// rounded rectangle
						if (rect.cornerRadius > 0)
						{
							ctx.beginPath();
							ctx.moveTo(drawX + spatial.radius, drawY);
							ctx.lineTo(drawX + spatial.dim.x - spatial.radius, drawY);
							ctx.quadraticCurveTo(drawX + spatial.dim.x, drawY, drawX + spatial.dim.x, drawY + spatial.radius);
							ctx.lineTo(drawX + spatial.dim.x, drawY + spatial.dim.y - spatial.radius);
							ctx.quadraticCurveTo(drawX + spatial.dim.x, drawY + spatial.dim.y,
								drawX + spatial.dim.x - spatial.radius, drawY + spatial.dim.y);
							ctx.lineTo(drawX + spatial.radius, drawY + spatial.dim.y);
							ctx.quadraticCurveTo(drawX, drawY + spatial.dim.y, drawX, drawY + spatial.dim.y - spatial.radius);
							ctx.lineTo(drawX, drawY + spatial.radius);
							ctx.quadraticCurveTo(drawX, drawY, drawX + spatial.radius, drawY);
							ctx.closePath();

							if (rect.color)
							{
								ctx.fillStyle = rect.color.color;
								ctx.fill();
							}
							if (rect.lineColor && rect.lineWidth)
							{
								ctx.lineWidth = rect.lineWidth;
								ctx.strokeStyle = rect.lineColor.color;
								ctx.stroke();
							}
						} else
						{
							if (rect.color)
							{
								ctx.fillStyle = rect.color.color;
								ctx.fillRect(-spatial.dim.x/2, -spatial.dim.y/2, spatial.dim.x, spatial.dim.y);
							}
							if (rect.lineColor && rect.lineWidth)
							{
								ctx.lineWidth = rect.lineWidth;
								ctx.strokeStyle = rect.lineColor.color;
								ctx.strokeRect(-spatial.dim.x/2, -spatial.dim.y/2, spatial.dim.x, spatial.dim.y);
							}
						}

						if (alpha) ctx.globalAlpha = 1; // restore the alpha
						ctx.restore();
						h5c3.device.elementsDrawn++;
					}


					var circle = next.obj.getComponent('circle');
					if (circle)
					{
						ctx.save();
						ctx.lineWidth = circle.lineWidth;
						if (alpha) ctx.globalAlpha = alpha.level;

						ctx.translate((drawX + (spatial.dim.x / 2)), (drawY + (spatial.dim.y / 2)));
						ctx.rotate(spatial.dir * (Math.PI / 180));

						ctx.beginPath();
						ctx.arc(0, 0, spatial.dim.x / 2, 0, h5c3.Math.PI * 2, true);
						ctx.closePath();

						if (circle.color)
						{
							ctx.fillStyle = circle.color.color;
							ctx.fill();
						}

						if (circle.lineColor)
						{
							ctx.lineWidth = circle.lineWidth;
							ctx.strokeStyle = circle.lineColor.color;
							ctx.stroke();
						}
						if (alpha) ctx.globalAlpha = 1; // restore the alpha
						ctx.restore();
						h5c3.device.elementsDrawn++;
					}

					var poly = next.obj.getComponent('poly');
					if (poly)
					{
						ctx.save();
						if (alpha) ctx.globalAlpha = alpha.level;

						var hw = spatial.dim.x/2;
						var hh = spatial.dim.y/2;

						// we center so rotation / dir works correctly
						ctx.translate((drawX + hw), (drawY + hh));
						ctx.rotate(spatial.dir * (Math.PI / 180));

						ctx.beginPath();
						ctx.moveTo(poly.points[0][0]-hw, poly.points[0][1]-hh);
						for (var p=1; p < poly.points.length; p++)
							ctx.lineTo(poly.points[p][0]-hw, poly.points[p][1]-hh);

						ctx.closePath();
						if (poly.color)
						{
							ctx.fillStyle = poly.color.color;
							ctx.fill();
						}

						if (poly.lineColor)
						{
							ctx.lineWidth = poly.lineWidth;
							ctx.strokeStyle = poly.lineColor.color;
							ctx.stroke();
						}

						if (alpha) ctx.globalAlpha = 1; // restore the alpha
						ctx.restore();
						h5c3.device.elementsDrawn++;
					}

					var text = entity.getComponent('text');
					if (text)
					{
						ctx.save();
						var yAdd=0;
						if (alpha) ctx.globalAlpha = alpha.level;
						hw = spatial.dim.x / 2;
						hh = spatial.dim.y / 2;
						ctx.font = text._fontCache;
						ctx.lineWidth = text.lineWidth;

						ctx.translate((drawX + hw), (drawY + hh));
						ctx.rotate(spatial.dir * (Math.PI / 180));

						for (var i=0; i < text.text.length; i++)
						{
							// canvas text is drawn with an origin at the bottom left, so we draw at y+h, not y
							if (text.color)
							{
								ctx.fillStyle = text.color.color;
								ctx.fillText(text.text[i], text.offset.x-hw, yAdd + spatial.dim.y + text.offset.y-hh);
							}
							if (text.strokeColor && text.lineWidth)
							{
								ctx.strokeStyle = text.strokeColor.color;
								ctx.strokeText(text.text[i], text.offset.x-hw, yAdd + spatial.dim.y + text.offset.y-hh);
							}
							yAdd += (text.fontHeight * 1.1);
						}
						if (alpha) ctx.globalAlpha = 1; // restore the alpha
						h5c3.device.elementsDrawn++;
						ctx.restore();
					}

					ctx.restore();
				}
			}
			next = next.next();
		}

		h5c3.device.lastDrawMS += (Date.now() - startTime);
	}
});