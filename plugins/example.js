/*global h5c3: true, gamecore: true, document: true, navigator: true, window: true */
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 * @module H5C3 Framework
 * @submodule Plugin
 * @class h5c3.PLUGIN_NAME
 * @augments h5c3.Plugin
 * @description
 * PLUGIN_NAME class for extended from h5c3.Plugin to provide functionality to the h5c3.
 *
 * <pre><code>
 * var color = new h5c3.Color([255, 0, 0]); // super red
 * </code></pre>
 */
h5c3.plugin.PLUGIN_NAME = h5c3.Plugin.extend('h5c3.plugin.PLUGIN_NAME',
{
	srcDir: '../plugins/',
	classes:[],
	functions:[]
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
