/*global h5c3: true, gamecore: true, document: true, navigator: true, window: true */
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 *  H5C3 Framework
 *  Plugin
 * Class:  h5c3.plugin.Expiry
 *  h5c3.Plugin
 * 
 * Expirey class for extended from h5c3.Plugin to provide functionality to the h5c3.
 *
 * 
 * var color = new h5c3.Color([255, 0, 0]); // super red
 * (end)
 */
h5c3.plugin.Expiry = h5c3.Plugin.extend('h5c3.plugin.Expiry',
{
	/**
	 * Property: String NAME Friendly name for plugin, may have spaces
	 */
	NAME:	'Expiry',
	/**
	 * Property: String VERSION Holds the current version of the plugin
	 */
	VERSION:	'0.0.1',
	/**
	 * Property: String DESCRIPTION Short description of what this plugin does.
	 */
	DESCRIPTION:	'Automatically expires an entity after a given time. Great for things like bullets that have a known lifetime.',
	/** Folder where files are located */
	srcDir: 'js/',
	/** Plugins required by this plugin */
	requires:[],
	/** List of files that makeup this plugin */
	uses: ['systems.expiration.js','components.expiry.js']
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
 * Class:  h5c3.components.Expiry
 * 
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Expiry'>h5c3.systems.Expiry</a>]
 * 
 * Automatically expires an entity after a given time. Great for things like bullets that have a known lifetime;
 * just add the expiry component and it will happily kill itself (release) after the given time
 */
h5c3.components.Expiry = h5c3.components.Component.extend('h5c3.components.Expiry',
/** Interface: h5c3.components.Expiry */
{
	/**
	 * Constructs (or acquires from the pool) an expiry component.
	 * Parameters:  Number options.lifetime Life time before expiry (in ms)
	 * Returns: {h5c3.components.Expiry} The shiny new component
	 */
	create: function(options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** Interface: h5c3.components.Expiry.prototype */
{
	/** lifetime of the expiry */
	lifetime: 0,

	/**
	 * Constructs a new component. See create method for options
	 */
	init: function()
	{
		this._super('expiry');
	},

	/**
	 * Configures the component. See create method for options
	 * Parameters:  Object options Options
	 */
	config: function(options)
	{
		this.lifetime = $CHK(options.lifetime, 1000);
	},

	/**
	 * Reduce the lifetime
	 * Parameters:  Number time Amount to reduce the lifetime by
	 */
	decrease: function(time)    { this.lifetime -= time;  },

	/**
	 * Gets whether the lifetime has expired (typically only the expiry system will use this)
	 * Returns: Boolean True if it has expired
	 */
	hasExpired: function()      { return this.lifetime <= 0; }
});


/**
 * Class:  h5c3.systems.Expiration
 * 
 * [Extends <a href='h5c3.systems.System'>h5c3.systems.System</a>]
 * 
 * Expiry system. See the <a href='h5c3.components.Expiry'>expiry component</a> for more information.
 */
h5c3.systems.Expiration = h5c3.systems.EntitySystem.extend('h5c3.systems.Expiration',
/** Interface: h5c3.systems.Expiration */
{},
/** Interface: h5c3.systems.Expiration.prototype */
{
	init: function()
	{
		this._super(['expiry']);
	},

	process: function(entity)
	{
		var c = entity.getComponent('expiry');
		c.decrease(h5c3.device.elapsed);
		if (c.hasExpired())
			entity.remove();
	}

});
