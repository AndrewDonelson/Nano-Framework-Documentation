/*global h5c3: true, gamecore: true, document: true, navigator: true, window: true */
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 *  H5C3 Framework
 *  Plugin
 * Class:  h5c3.plugin.Compatability
 *  h5c3.Plugin
 * 
 * Provides backwards compatability for older browsers.
 */
h5c3.plugin.Compatability = h5c3.Plugin.extend('h5c3.plugin.Compatability',
{
	/**
	 * Property: String NAME Friendly name for plugidn, may have spaces
	 */
	NAME:	'Compatability',
	/**
	 * Property: String VERSION Holds the current version of the plugin
	 */
	VERSION:	'0.0.1',
	/**
	 * Property: String DESCRIPTION Short description of what this plugin does.
	 */
	DESCRIPTION:	'Provides backwards compatability for older browsers.',
	/** Folder where files are located */
	srcDir: 'js/',
	/** Plugins required by this plugin */
	requires:[],
	/** List of files that makeup this plugin */
	uses: []
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
 * Compatibility - ECMA-262 standard, 5th edition; Addition of indexOf. allowing use of much of the functionality of bind() in implementations that do not natively support it.
 * @see { @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Compatibility Function.prototype.bind}
 */
if (!Function.prototype.bind) {
	Function.prototype.bind = function (oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError("boot.js::Function.prototype.bind - what is trying to be fBound is not callable");
		}

		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function () {},
			fBound = function () {
				return fToBind.apply(this instanceof fNOP ? this : oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();
		return fBound;
	};
}


/**
 * Compatibility - ECMA-262 standard, 5th edition; Addition of indexOf. This algorithm matches the one specified in ECMA-262, 5th edition, 
 * assuming Object, TypeError, Number, Math.floor, Math.abs, and Math.max have their original values.
 * @see { @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Compatibility Array.prototype.indexOf}
 */
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
		"use strict";
		if (this === null) {
			throw new TypeError();
		}
		var t = Object(this),
			n = 0,
			len = t.length >>> 0;
		if (len === 0) {
			return -1;
		}
		if (arguments.length > 0) {
			//n = Number(arguments[1]);
			n = Number(fromIndex);
			if (n !== n) { // shortcut for verifying if it's NaN
				n = 0;
			} else if (n !== 0 && n !== Infinity && n !== -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		if (n >= len) {
			return -1;
		}
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++)

			for (; k < len; k++) {
				if (k in t && t[k] === searchElement) {
					return k;
				}
			}
		return -1;
	}
};
