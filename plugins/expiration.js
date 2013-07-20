/*global h5c3: true, gamecore: true, document: true, navigator: true, window: true */
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 * @module H5C3 Framework
 * @submodule Plugin
 * @class h5c3.plugin.Expiry
 * @augments h5c3.Plugin
 * @description
 * Expirey class for extended from h5c3.Plugin to provide functionality to the h5c3.
 *
 * <pre><code>
 * var color = new h5c3.Color([255, 0, 0]); // super red
 * </code></pre>
 */
h5c3.plugin.Expiry = h5c3.Plugin.extend('h5c3.plugin.Expiry',
{
	/**
	 * @property {string} NAME Friendly name for plugin, may have spaces
	 */
	NAME:	'Expiry',
	/**
	 * @property {string} VERSION Holds the current version of the plugin
	 */
	VERSION:	'0.0.1',
	/**
	 * @property {string} DESCRIPTION Short description of what this plugin does.
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
 * @class h5c3.components.Expiry
 * @description
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Expiry'>h5c3.systems.Expiry</a>]
 * <p>
 * Automatically expires an entity after a given time. Great for things like bullets that have a known lifetime;
 * just add the expiry component and it will happily kill itself (release) after the given time
 */
h5c3.components.Expiry = h5c3.components.Component.extend('h5c3.components.Expiry',
/** @lends h5c3.components.Expiry */
{
	/**
	 * Constructs (or acquires from the pool) an expiry component.
	 * @param {Number} options.lifetime Life time before expiry (in ms)
	 * @return {h5c3.components.Expiry} The shiny new component
	 */
	create: function(options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** @lends h5c3.components.Expiry.prototype */
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
	 * @param {Object} options Options
	 */
	config: function(options)
	{
		this.lifetime = $CHK(options.lifetime, 1000);
	},

	/**
	 * Reduce the lifetime
	 * @param {Number} time Amount to reduce the lifetime by
	 */
	decrease: function(time)    { this.lifetime -= time;  },

	/**
	 * Gets whether the lifetime has expired (typically only the expiry system will use this)
	 * @return {Boolean} True if it has expired
	 */
	hasExpired: function()      { return this.lifetime <= 0; }
});


/**
 * @class h5c3.systems.Expiration
 * @description
 * [Extends <a href='h5c3.systems.System'>h5c3.systems.System</a>]
 * <p>
 * Expiry system. See the <a href='h5c3.components.Expiry'>expiry component</a> for more information.
 */
h5c3.systems.Expiration = h5c3.systems.EntitySystem.extend('h5c3.systems.Expiration',
/** @lends h5c3.systems.Expiration */
{},
/** @lends h5c3.systems.Expiration.prototype */
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
