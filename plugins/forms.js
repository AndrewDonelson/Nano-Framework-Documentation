/*global h5c3: true, gamecore: true, document: true, navigator: true, window: true */
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 *  H5C3 Framework
 *  Plugin
 * Class:  h5c3.plugin.Forms
 *  h5c3.Plugin
 * 
 * Forms class for extended from h5c3.Plugin to provide functionality to the h5c3.
 *
 * 
 * var color = new h5c3.Color([255, 0, 0]); // super red
 * (end)
 */
h5c3.plugin.Forms = h5c3.Plugin.extend('h5c3.plugin.Forms',
{
	srcDir: '../plugins/'
},
{
	/**
	 * Property: String VERSION Holds the current version of the plugin
	 */
	VERSION:	'0.0.1',
	
	/**
	* <description>
	*
	* Parameters:  {TYPE} <Name> <description>
	* Returns:  {TYPE} <description>
	*/	
	init:function(args) 
	{
		this._super();
		if (typeof args === "object") {
			this.property = args;
		}
		$_DBG_('init()');
	},
	
	main:function(args)
	{
		$_DBG_('main()');
	},
	
	done:function(args)
	{
		$_DBG_('done()');
	}	
});
