/** 
 * @preserve H5C3 Framework v0.9.7-RC1-Developer
 */
/*global H5C3:true, h5c3:true, gamecore:true, $DOC:true, $CHK:true, $GEI:true, $VLD:true, $CNT:true, $CTX:true, $GEN:true, $GEC:true, $ESA:true, $EGA:true, $AEA:true, $AET:true, $PUW:true, $AST:true */
/*jslint indent: 4, maxerr: 20, passfail: false, white: true, browser: true, sub: true, nomen: true, plusplus: true, unparam: true */
"use strict";

/**
 * File: h5c3 (core)
 * This the the primary include file. It contains some shortcut functions for working with the DOM. These actually help save overall file size.
 * It also handles loading and and Initialing the Engine and Framework, including plugin support. The H5C3 Framework will automatically run in one of two modes.
 *
 * - Rich Responsive Web Design (R2WD)
 * - Full Support including both (R2WD and CloudApp)
 *
 */

/**
 * Function: $DOC()
 * 
 *  DOM Helpers
 *
 * Alias for document - only shortens by 3 characters, but to be standard,
 * plus it adds up when you have 500 calls to document!
 * 
 * Parameter: 
 * None
 *
 * Returns: 
 * Document Returns the document
 * 
 * >	$DOC().addEventListener('webkitfullscreenchange', h5c3.bootstrap._onFullscreenChange);
 * 
 */
window.$DOC = function() { return window.document; };

/**
 * Function:  $GEI($id)
 * 
 *  DOM Helpers
 *
 * Alias for document.getElementByID()
 * 
 * Parameters:  
 * String id The ID of the element you want returned
 * 
 * Returns:  
 * Element Returns the element uniquely identified by its id identifier.
 * 
 * >	var element = $GEI("myDIV");
 * 
 */
window.$GEI = function ($id) { return $DOC().getElementById($id); };

/**
 * Function:  $CNT($element)
 *
 *  DOM Helpers
 * 
 * Checks node parameter. Returns an element no mater if the element is passed in or the sname of an element.
 * 
 * Parameter: 
 * String|Element $element The name of an element or the actual element to append to
 * 
 * Returns:  
 * Element returns the element
 * 
 * >	var $el = $CNT($element);
 * 
 */
window.$CNT = function ($element) { var $result; if (typeof $element === "string") { $result = $GEI($element); } else { $result = $element; } return $result; };

/**
 * Function:  $CTX($element)
 *
 *  DOM Helpers
 * 
 * Alias for document.getElementByID(canvas).getContext("2d");
 * 
 * Parameters:  
 * String|Canvas $element The name of an canvas or the actual canvas
 * 
 * Returns:  
 * {context} Returns the 2D drawing context.
 * 
 * >	var myCTX = $CTX("myCanvas");
 * 
 */
window.$CTX = function ($element) { return $CNT($element).getContext("2d"); };

/**
 * Function:  $GEN($name)
 *
 *  DOM Helpers
 * 
 * Alias for document.getElementsByName()
 * 
 * Parameters:  
 * String $name The name of the elements you want returned
 * 
 * Returns:  
 * {collection} Returns the collection of elements with the given name
 * 
 * >	var elements = $GEN("DIV");
 * 
 */
window.$GEN = function ($name) { return $DOC().getElementsByName($name); };

/**
 * Function:  $GEC($class)
 *
 *  DOM Helpers
 * 
 * Alias for document.getElementsByClass()
 * 
 * Parameters:  
 * String $class The class name of the elements you want returned
 * 
 * Returns:  
 * Collection Returns the collection of elements with the given classname
 * 
 * >	var elements = $GEN("red");
 * 
 */
window.$GEC = function ($class) { return $DOC().getElementsByClass($class); };

/**
 * Function:  $ESA($element, $name, $value)
 *
 *  DOM Helpers
 * 
 * Alias for element.setAttribute()
 * 
 * Parameters:  
 * 	String|Element	$element 	The name of an element or the actual element
 * 	String 			$name 		The name of the attribute you want to set
 * 	String|Number 	$value		The value to assign
 * 
 * Returns:  
 * None
 * 
 * >	$ESA("button","color","red");
 * 
 */
window.$ESA = function ($element, $name, $value) { $CNT($element).setAttribute($name, $value); };

/**
 * Function:  $EGA($element, $name)
 *
 *  DOM Helpers
 * 
 * Alias for element.getAttribute()
 * 
 * Parameters:  
 * String|Element	$element 	The name of an element or the actual element
 * String 			$name		The name of the attrinbute you want to get
 * 
 * Returns:  
 * None
 * 
 * >	var btnColor = $EGA("button","color");
 * 
 */
window.$EGA = function ($element, $name) { $CNT($element).getAttribute($name); };

/**
 * Function:  $AEA($element, $tag, $id, $htm)
 *
 *  DOM Helpers
 * 
 * Inserts a new element before a given element
 * 
 * Parameters:  
 * 		String|Element 	$element 	The name of an element or the actual element
 *   	String 			$tag 		element to insert
 *   	String	 		$id 		ID of the new element
 *   	String 			$htm 		HTML to insert into new element
 * 
 * Returns: 
 * String $id
 *
 * >	$AEA('someElementID','DIV','newDivID','This is inner HTML');
 * 
 */
window.$AEA = function ($element, $tag, $id, $htm) {
	var $el = $CNT($element),
		$ne = $DOC().createElement($tag);
	if ($id) {
		$ne.id = $id;
	}
	if ($htm) {
		$ne.innerHTML = $htm;
	}
	$el.parentNode.insertBefore($ne, $element);
	return $id;
};

/**
 * Function:  $AET($element, $tag, $id, $htm)
 *
 *  DOM Helpers
 * 
 * Inserts a new element into a given element
 * 
 * Parameters:  
 * 		String|Element 	$element 	The name of an element or the actual element
 *   	String 			$tag 		element to insert
 *   	String	 		$id 		ID of the new element
 *   	String 			$htm 		HTML to insert into new element
 * 
 * Returns:  
 * Element returns the element jsut created & appended.
 * 
 * >	$AET('someElementID','DIV','newDivID','This is inner HTML');
 * 
 */
window.$AET = function ($element, $tag, $id, $htm) {
	var $el = $CNT($element),
		$ne = $DOC().createElement($tag);
	if ($id) {
		$ne.id = $id;
	}
	if ($htm) {
		$ne.innerHTML = $htm;
	}
	$el.appendChild($ne);
	return $ne;
};

/**
 * Function:  $PUW($url, $title, $fullscreen, $width, $height)
 *
 *  DOM Helpers
 *
 * Smart Popup Window, Either Fullscreen or Centered.
 *
 * Parameter:  
 * 	String 		$url 		The URL of the document to load in the new window
 *
 * 	String 		$title 		The title to use for the new window
 *
 * 	Boolean 	$fullscreen True to open in fullscreen mode, false to use $width & $height and center
 *
 * 	number 		$width 		The desired width of the new window
 *
 * 	number 		$height 	The desired height of the new window
 *
 * Returns:  
 * 	Window returns the new window
 * 
 * >	var $myWindow = $PUW('index.html','My Window',false,640,480);
 */
window.$PUW = function ($url, $title, $fullscreen, $width, $height) {
	var $popup,
		$left = (window.screen.availWidth / 2) - ($width / 2),
		$top = (window.screen.availHeight / 2) - ($height / 2);
	if ($fullscreen === true) {
		$popup = window.open($url, $title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no');
		$popup.moveTo(0, 0);
		$popup.resizeTo(window.screen.availWidth, window.screen.availHeight);
	} else {
		$popup = window.open($url, $title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + $width + ', height=' + $height + ', top=' + $top + ', left=' + $left);
	}
	if (!$popup || $popup.closed || $popup.closed === 'undefined' || $popup.screenX === 0) {
		window.alert('Please change your popup settings for this domain.');
	}
	return $popup;
};

/**
 * Function:  $VLD(p)
 *
 *  DOM Helpers
 * 
 * Check if a value is valid (not null or undefined)
 * 
 * Parameters:  
 * Mixed	p 	A value
 * 
 * Returns:  
 * Boolean true if the value is not undefined and not null
 * 
 * (start code)
 * if !($VLD(foo)) { someFunction(); }
 * (end)
 * 
 */
window.$VLD = function (p) { return !(p === null || p === 'undefined' || p === undefined); };

/**
 * Function:  $CHK(p, def)
 *
 *  DOM Helpers
 *
 * Checks if a param is valid (null or undefined) in which case the default value will be returned
 * 
 * Parameters:  
 * Mixed 	p 	Parameter to check
 * Mixed 	def Default value to return if p is either null or undefined
 * Returns:  
 * Mixed 	p 	if valid, otherwise def (default)
 * 
 * >	if ($CHK(foo,"bar")) { someFunction(); }
 * 
 */
window.$CHK = function (p, def) { var $result; if (!$VLD(p)) { $result = def; } else { $result = p; } return $result; };

/**
 * Function:  $AST(test, error)
 *
 *  DOM Helpers
 * 
 * Tests a boolean evaluation and throws an exception with the error string. (Assert)
 * 
 * Parameters:  
 * Boolean 	test 	A boolean result test
 * String 	error 	A string to throw with the exception
 * 
 * Returns:  
 * None
 * 
 * >	$AST(foo,'BOOYA!');
 * 
 */
window.$AST = function ($test, $error) { if (!$test) { throw $error; } };
 

window.$RUN = function ($applet) {
	if ($VLD(h5c3.bootstrap)) h5c3.applets.use({file:$applet});
}
 
window.$_DBG_ = function($m) {
	if (typeof(h5c3.debug)||typeof(console)) { h5c3.debug($m) }
}
 
/**
 * Class:  H5C3
 * 
 * Primary object in which the entire engine and framework reside. 
 */
window.H5C3 = gamecore.Base('H5C3', {
	/**
	 * Property: String NAME
	 *
	 * Holds the name of this framework
	 */
	NAME: 'H5C3 Framework',
	/**
	 * Property: String VERSION 
	 *
	 * Holds the current version of the framework
	 */
	VERSION: '0.9.7-RC1',
	/**
	 * Property: String DISTRO 
	 *
	 * Holds the distrobution tag of the framework
	 */
	DISTRO: 'Developer',
	/**
	 * Property: String LOCATION 
	 *
	 * URL to where the H5C3 Framework root folder
	 */
	LOCATION: 'http://h5c3.i2tmlabs.com/shared/',
	/**
	 * Property: Object ORIENTATION
	 *
	 * Contants used for defining device orientation.
	 */
	ORIENTATION: {
		AUTO: 		0x0000,
		LANDSCAPE: 	0x0001,
		PORTRAIT: 	0x0002
	}
}, {
	debugPath: '/Android_Dev/GitHUB/com.I2TMLabs.h5c3.development/h5c3/', /* debug */
	/**
	 * Property: Array 	plugin	
	 * Container for all plugins components.
	 */
	plugin: null,
	/**
	 * Property: Array systems		
	 * Container for all loaded Systems.
	 */
	systems: null,
	/**
	 * Property: Array components		
	 * Container for all loaded components.
	 */
	components: null,
	/**
	 * Property: EntityFactory entityFactory		
	 * Manager for all Entity objects.
	 */
	entityFactory: null,
	/**
	 * Property: SoundFactory	soundFactory		
	 * Manager for all Sound objects.
	 */
	soundFactory: null,
	/**
	 * Property: SceneFactory	sceneFactory		
	 * Manager for all Scene objects.
	 */
	sceneFactory: null,
	
	/**
	 * Property: applets	AppletFactory		
	 * Manager for all applets objects.
	 */
	applets: null,
	/**
	 * Property: Boolean 	devMode 		
	 * True if we are debugging, False otherwise
	 */
	devMode: false,

	/**
	 * Property: Boolean		ready			
	 * [true|false]
	 * 
	 * True 	- Everything was fine, we can load the Engine and optionally the framework
	 * False 	- “Danger, Will Robinson!” The universe could be destroyed without proper configuration.
	 */
	ready: false,

	/**
	 * Constructor: init()
	 * 
	 * Initialization
	 */
	init: function() {
		this._super();
		/* Don't trust config - double check developer mode */
		var v = (H5C3CFG.devMode) ? "debug" : "release";
		if("undefined"===typeof H5C3CFG) { 
			alert('You are trying to load the H5C3 Framework without a Configuration.'); 
		} else {
			//if (H5C3.DISTRO==="Developer"||H5C3.DISTRO==="Developer") { this.devMode = true; } else { this.devMode = false; }
			this.devMode = (H5C3.DISTRO==="Developer"||H5C3.DISTRO==="Developer") ? true : false;
			this.ready = true;
		}
	},
	applet:function($data) {
		var applet = 'is loaded';
	},
	/**
	 * Method: tag()
	 * 
	 * Returns the Frameworks current Name
	 * 
	 * Returns:  
	 * String	Full name and version of the framework.
	 */
	tag: function() { return H5C3.NAME+' v'+H5C3.VERSION+'-'+H5C3.DISTRO; },
	
	/**
	 * Method: run()
	 * 
	 * Called via the onload event to start execution
	 *
	 */
	run: function() { 
		if (this.ready && !$VLD(this.bootstrap)) this.bootstrap = new h5c3.Bootstrap(); 
	}		
});

/**
 * Variable: h5c3 
 * Primary object used by framework. All class definitions and child object reside within this object.
 * 
 */
window.h5c3 = new H5C3();

/**
 * Class:  h5c3.Base
 *
 *  gameCore
 *  
 * A base class providing logging, object counting and unique object id's
 * Examples:
 *
 * Unique ID and total objects:
 * 
 * var Fighter = h5c3.Base.extend('Fighter', {}, {});
 * var fighter1 = new Fighter();
 * var fighter2 = new Fighter();
 * fighter1.uniqueId;    // -> 'Fighter:0'
 * fighter2.uniqueId;    // -> 'Fighter:1'
 * Fighter.totalObjects; // -> 2
 * (end)
 *
 * Logging: (log, info, warn, error, debug)
 * 
 * fighter1.warn('oops'); // == console.log('Fighter:0 [WARN] oops');
 */
window.h5c3.Base = gamecore.Base('h5c3.Base', /** Interface: h5c3.Base */
{},	
{
	/**
	 * Used for sending debugging messages to either console, debugger or both.
	 *
	 * Method: debug($message)
	 * 
	 * Parameters:  String	$message
	 */
	debug: function ($message) {
		var $log = $GEI("waConsoleLog");

		if ($VLD($log)) {
			$log.value += this.uniqueId + '->' + $message + '\n';
			$log.scrollTop = $log.scrollHeight;
		}
		window.console.log(this.uniqueId + '->' + $message);
	}
});

/**
 * Class:  h5c3.Hashtable
 *
 *  gameCore
 *  
 * gameCore.jhashtable...JavaScript implementation of a hash table. It creates a single constructor function called Hashtable in the global scope.
 *
 * (start code)
 *     var map = new h5c3.Hashtable();
 *     map.put('test1', obj);
 *     var obj = map.get('test1');
 * (end)
 */
h5c3.Hashtable = gamecore.Hashtable;
	
/**
 * Class:  h5c3.Pool
 *
 *  gameCore
 *  
 * *Easy (high-performance) object pooling*
 *
 * A pool of objects for use in situations where you want to minimize object life cycling (and
 * subsequently garbage collection). It also serves as a very high speed, minimal overhead
 * collection for small numbers of objects.
 * 
 * This class maintains mutual an array of objects which are free. If you wish to maintain a list of both
 * free and used then see the gamecore.DualPool.
 * 
 * Pools are managed by class type, and will auto-expand as required. You can create a custom initial pool
 * size by deriving from the Pool class and statically overriding INITIAL_POOL_SIZE.
 * 
 * Keep in mind that objects that are pooled are not constructed; they are "reset" when handed out.
 * You need to "acquire" one and then reset its state, usually via a static create factory method.
 * 
 * (start code)
 * Point = h5c3.Pooled('Point',
 * {
 *   // Static constructor
 *   create:function (x, y)
 *   {
 *      var n = this._super();
 *      n.x = x;
 *      n.y = y;
 *      return n;
 *   }
 * },
 * {
 *    x:0, y:0,   // instance
 *
 *    init: function(x, y)
 *    {
 *       this.x = x;
 *       this.y = y;
 *    }
 * }
 * (end)
 * To then access the object from the pool, use create, instead of new. Then release it.
 * (start code)
 * var p = Point.create(100, 100);
 * // ... do something
 * p.release();
 * (end)
 *
 */
h5c3.Pool = gamecore.Pool.extend('h5c3.Pool',{},{});

/**
 * Class:  h5c3.Pooled
 *
 *  gameCore
 * 
 *  Used as a base class for objects which are life cycle managed in an object pool.
 */
h5c3.Pooled = gamecore.Pooled.extend('h5c3.Pooled',{},{});

/**
 * Class:  h5c3.LinkedList 
 *
 *  gameCore
 *
 */
h5c3.LinkedList = gamecore.LinkedList.extend('h5c3.LinkedList',{},{});

/**
 * Class:  h5c3.LinkedListNode
 *
 *  gameCore
 */
h5c3.LinkedListNode = gamecore.LinkedListNode.extend('h5c3.LinkedListNode',{},{});

/**
 * Class:  h5c3.HashList
 *
 *  gameCore
 */
h5c3.HashList = gamecore.HashList.extend('h5c3.HashList',{},{});

/**
 * Variable:  h5c3.plugin
 *
 * Contains all loaded plugins.
 */
h5c3.plugin = new h5c3.Hashtable();

/**
 * Variable:  h5c3.systems
 *
 * Contains all loaded engine systems.
 */
h5c3.systems = new h5c3.Hashtable();

/**
 * Variable:  h5c3.components
 *
 * Contains all loaded components.
 */
h5c3.components = new h5c3.Hashtable();


/**
 * Class:  h5c3.GameResources
 *
 * Loading of resources is handled internally. DO NOT CALL THESE FUNCTIONS DIRECTLY.
 */
window.h5c3.GameResources = h5c3.Base.extend('h5c3.GameResources', {}, {
    /**
     * Property: Object 	resources	
	 * Holds all resources for the application
     */
    resources: null,

    /**
	 * Constructor: init()
	 * Initialization method. 
     * 
	 * Adds Publisher & Framework resources to loading Que. Then processes the Config.js to get all resources for loading.
     */
    init: function () {
        this._super();
        this.loadResources();		
    },

    /**
	 * Method: loadResources()
     *
     * This method parses the embeded XML resource data into an array
     */
    loadResources: function () {
        $_DBG_('Queing internal resources...');
        /** Required Engine images - Loaded automatically **/
        //h5c3.device.loader.add(new h5c3.Image('publisher', 'http://h5c3.i2tmlabs.com/img/logo-i2tmlabs-hd.png'));
        //h5c3.device.loader.add(new h5c3.Image('h5c3', 'http://h5c3.i2tmlabs.com/img/logo-h5c3-hd.png'));
        //h5c3.device.loader.add(new h5c3.Image('btnDebug', 'http://h5c3.i2tmlabs.com/img/buttons_debug.png'));
        //h5c3.device.loader.add(new h5c3.Image('touchpad', 'http://h5c3.i2tmlabs.com/img/touchpad_buttons.png'));
        /** Required Engine sound - Loaded automatically **/
        //h5c3.device.loader.add(new h5c3.Sound('i2tm', 'http://h5c3.i2tmlabs.com/snd/i2tm', ['ogg'], 1));
        //this.loadApplets();		
        this.loadGraphics();
        this.loadAudio();
    },

    /**
	 * Method: loadApplets() 
     *
     * Parse array and que all applets for loading
     */
    loadApplets: function () {
		if ($VLD(window.H5C3CFG.resources)) {
			$_DBG_('Queing application applet resources...');
			var i, data = window.H5C3CFG.resources.applets;

			for (i = 0; i < data.length; ++i) {
				h5c3.loader.add(new h5c3.Applet(data[i].name, data[i].file));
			}
		} 
		else $_DBG_('No graphic resources to que. (Did you forget to add them to the config?)');
    },

    /**
	 * Method: loadGraphics() 
     *
     * Parse array and que all graphics for loading
     */
    loadGraphics: function () {
		if ($VLD(window.H5C3CFG.resources)) {
			$_DBG_('Queing application images resources...');
			var i, data = window.H5C3CFG.resources.images;

			for (i = 0; i < data.length; ++i) {
				h5c3.loader.add(new h5c3.Image(data[i].name, data[i].file));
			}
		} 
		else $_DBG_('No graphic resources to que. (Did you forget to add them to the config?)');
    },

    /**
	 * Method: loadAudio()
     *
     * Parse array and que all audio for loading
     */
    loadAudio: function () {
		if ($VLD(window.H5C3CFG.resources)) {
			$_DBG_('Queing application audio resources...');
			var 
				i, f1, f2, data = window.H5C3CFG.resources.sounds;

			for (i = 0; i < data.length; i++) {
				if (data[i].ogg === "true") {
					f1 = "ogg";
				} else {
					f1 = "";
				}
				if (data[i].mp3 === "true") {
					f2 = "mp3";
				} else {
					f2 = "";
				}
				h5c3.loader.add(new h5c3.Sound(data[i].name, data[i].file, [f1, f2], data[i].channels));
			}
		} 
		else $_DBG_('No audio resources to que. (Did you forget to add them to the config?)');	
    }
});


/**
 * Class:  h5c3.bootstrap
 *
 * Handles preparing the document, loading resources, and starting webapp.
 * All methods of this class are private. An instance is created upon load.
 *
 */
window.h5c3.Bootstrap = h5c3.Base.extend('h5c3.Bootstrap', 
{}, 
{
	/**
	 * Property: String $baseUrl
	 * Holds the base URL for resources & scripts
	 */
    $baseUrl: '',
	
	/**
	 * Property: Number $current
	 * Internal. Used to count what resource we are on. i.e. Progress Bar on loading.
	 */
    $current: 0,
	
	/**
	 * Property: Boolean $finished	
	 * Framework has finished loading.
	 */
    $finished: false,
	
	/**
	 * Property: String
	 * Turns off fie Caching
	 */
    $noCacheString: '',
	
	/**
	 * Property: Array
	 * An array of all scripts
	 */
    $scripts: [],
	
    /**
	 * Constructor: init()
	 *
     * Main initilaiztion for the Bootstrap object. Makes sure the browser is chrome,
     * and then creates the canvas and inserts into the document. Also sets the fullscreen listener.
     * 
     */
    init: function () {
        $_DBG_(h5c3.tag() + ' loaded.');
		this.$loc = this.getFileName();
		this._BrowserIsChrome();	
		
        this.setBaseUrl('http://h5c3.i2tmlabs.com/shared/js/ext/');					
		if (!$VLD(window.Modernizr)) { this.add('modernizr.all.release.js'); }
		if (!$VLD(window.jQuery)) { this.add('jquery/jquery-1.10.2.min.js'); }		
		if (!$VLD(window.gamecore)) { this.add('../gamecore.min.js'); }		
		
		/* do we have a valid config loaded? */
		//if (!$VLD(window.H5C3CFG)) {
			/* Nope, Lets just enable the engine for API mode. */
		//	$_DBG_('No configuration loaded - Running in API mode.');

			/* if we are in local file system - then we need to immediately load scripts then continue */
			if (h5c3.devMode) {
				this.handleFiles();
			}
		//}
        this._start();
    },
	
	prepareRWD:function() {
		h5c3.loader = new h5c3.Loader();
		h5c3.stylesheet = new h5c3.StyleSheet();
		h5c3.resources = new h5c3.GameResources();
		h5c3.vars = new h5c3.HTMLVariables();	
		h5c3.lzw = new h5c3.LZW();
		h5c3.loader.start();
		
		//<base href="http://www.w3schools.com/images/" target="_blank">
		$(window).ready(function() {
			//var scriptContent = $GEI(H5C3CFG.applets[0].name).innerHTML;
			//h5c3.loader.start();
		});
		$(window).resize(function() {
			h5c3.stylesheet.react();
		});
		$_DBG_('Rich Responsive Web Development Mode (R2WD) Ready.');
	},
	
    /**
	 * Method: createCanvas()
     * 
	 * Starts execution.
     * 
	 * Parameters: None
     * 
	 * Returns: Boolean
     * 
     */
    createCanvas: function () {
		var $waDIVSize = $GEI('waDIV'), 
            scrn = { 
                w:$waDIVSize.clientWidth,
                h:$waDIVSize.clientHeight,
                tw:window.H5C3CFG.screen.target.width,
				th:window.H5C3CFG.screen.target.height
            };
        		
		// Insert our canvas into waDIV
		var $c = $AET('waDIV', 'canvas', 'waCANVAS');

		$c.style.width = scrn.w + 'px';
		$c.style.height = scrn.h + 'px';
		
		$c.style.minWidth = scrn.w + 'px';
		$c.style.minHeight = scrn.h + 'px';

		$c.style.maxWidth = scrn.w + 'px';
		$c.style.maxHeight = scrn.h + 'px';
		
		$c.width = scrn.tw;
		$c.height = scrn.th;
		$c.style.background = 'Black';

        /* Determine fullscreen mode */
        if (window.H5C3CFG.options.fullscreen) {
			$_DBG_('OPTION: Fullscreen mode enabled.');
            $DOC().addEventListener('webkitfullscreenchange', h5c3.bootstrap._onFullscreenChange);
            $c.webkitRequestFullScreen();
        } 
		else $_DBG_('OPTION: Fullscreen mode disabled.');
		return true;
    },

    /**
	 * Method: handleFiles()
     * 
	 * This feature is only available in-house.
     * 
	 * Parameters: None
     * 
	 * Returns: Boolean
     * 
     */
	handleFiles:function() {
		
        if (this.$loc === 'local.html') {
            /*  Local In-House only mode */
            $_DBG_('Running in Local in-house mode.');
            this.localLib(h5c3.debugPath+'lib/');									/** $_DBG_ **/
			if ($VLD(window.H5C3CFG)) {
				if (window.H5C3CFG.plugins.length > 0) {
					this.loadPlugins(window.H5C3CFG.plugins, h5c3.debugPath+'plugins/');
				}
				if (window.H5C3CFG.applets.length > 0) {
					this.loadApplets(window.H5C3CFG.applets, '');
				}
				if (!window.H5C3CFG.rwdOnly && window.H5C3CFG.files.length > 0) {
					this.que(window.H5C3CFG.files, 'js/');
				}
			}
        } else if (this.$loc === 'debug.html') {
            /*  Developer(s) debug mode */
            $_DBG_('Running in Developer debug mode.');
			if ($VLD(window.H5C3CFG)) {
				if (window.H5C3CFG.plugins.length > 0) {
					this.loadPlugins(window.H5C3CFG.plugins, H5C3.LOCATION + 'plugins/');
				}
				if (!window.H5C3CFG.rwdOnly && window.H5C3CFG.files.length > 0) {
					this.que(window.H5C3CFG.files, 'js/');
				}
			}
        } else if (this.$loc === 'index.html') {
            /*  Site Production mode */
            $_DBG_('Running in Production mode.');
            h5c3.devMode = false;
			if ($VLD(window.H5C3CFG)) {
				if (window.H5C3CFG.plugins.length > 0) {
					this.loadPlugins(window.H5C3CFG.plugins, H5C3.LOCATION + 'plugins/');
				}
			}
			
			if (!window.H5C3CFG.rwdOnly)
				this.que(['game.min.js'],'js/');
			
        }
	},
	
    /**
     * Looks at the current page and gets the name of the html file.
	 *
	 * Method: getFileName()
	 *
	 * Returns:  String HTML filename
     */
    getFileName: function () {
        var $url = document.location.href;
        $url = $url.substring(0, ($url.indexOf("#") === -1) ? $url.length : $url.indexOf("#"));
        $url = $url.substring(0, ($url.indexOf("?") === -1) ? $url.length : $url.indexOf("?"));
        $url = $url.substring($url.lastIndexOf("/") + 1, $url.length);
        return $url;
    },

    /**
	 * Method: _onFullscreenChange()
     * 
	 * Called when switching in/out of fullscreen mode.
	 *
	 * Parameters: None
	 *
	 * Returns: None
     */
    _onFullscreenChange: function () {
       var $c = $GEI('waCANVAS');
        if (document.mozFullScreen || document.webkitIsFullScreen) {
            $c.style.width = window.screen.width + 'px';
            $c.style.height = window.screen.height + 'px';
        } else {
            $c.style.width = window.H5C3CFG.screen.width + 'px';
            $c.style.height = window.H5C3CFG.screen.height + 'px';
        }
    },

   /**
	 * Method: _BrowserIsChrome()
     * 
     * Check to see if the browser is chrome and hide or show the play button depending on the outcome.
	 *
	 * Parameters: None
	 *
	 * Returns: None
     */
	_BrowserIsChrome: function () {
        var $ok = /chrome/.test(window.navigator.userAgent.toLowerCase()),
            $pn = $GEI('playnow'),
            $cp = $GEI('cantplay');

        if ($pn!=null && $cp!=null) {
            if ($ok) {
                $pn.style.display = 'block';
                $cp.style.display = 'none';
            } else {
                $pn.style.display = 'none';
                $cp.style.display = 'block';
            }
        }
    },

    /**
	 * Method: setDisableCache()
     * 
     * Tells the resource loader to disable caching in the browser by modifying the resource src by appending the current time
	 *
	 * Parameters: None
	 *
	 * Returns: None
     */
    setDisableCache: function () {
        this.$noCacheString = '?nocache=' + Date.now();
    },

	/** 
	 * Method: setBaseUrl()
     * 
	 * Sets the directory/path to load from. Do not call directly.
	 *
	 * Parameters:  
	 * String $url desired path.
	 *
     */	 
    setBaseUrl: function ($url) {
        this.$baseUrl = $url;
    },

	/** 
	 * Method: _makeUrl()
     * 
	 * Given a script name creates and returns a valid URL
	 *
	 * Parameters: 
	 * String $src - File to load
     * 
	 * Returns:  
	 * String URL
     */	 
    _makeUrl: function ($src) {
        return this.$baseUrl + $src + this.$noCacheString;
    },

	/** 
	 * Method: add()
     * 
	 * Add a script to the que. Do not call directly.
	 *
	 * Parameters: 
	 * String $src - File to load
     * 
	 * Returns:  
	 * None
     */	 
    add: function ($src) {
        this.$scripts.push(this._makeUrl($src));
    },

	/** 
	 * Start loading all files in que. Do not call directly.
	 *
	 * Method: _start()
     * 
	 * Parameters: None
     * 
	 * Returns:  None
     */	 
    _start: function () {
        $_DBG_('Loading source files...');
        this.$current = 0;
        this._loadNextScript();
    },

	/** 
	 * Method: _loadNextScript()
     * 
	 * Load the next script in que. Do not call directly.
	 *
	 * Parameters: 
	 * None
     * 
	 * Returns:  
	 * None
	 */	 
    _loadNextScript: function () {
        var 
			$src = this.$scripts[this.$current],
			$script = window.document.createElement("script");

        $script.type = "application/javascript";
        $script.src = $src;
        $script.async = false;
		if ($VLD($src)) {	
			$script.onload = function () {				
				h5c3.bootstrap._checkAllDone();
			};

			$script.onerror = function () {
				throw ('h5c3.bootstrap::_loadNextScript() - Could not load javascript file: ' + $script.src);
			};

			window.document.getElementsByTagName("head")[0].appendChild($script);
		}
    },

	/** 
	 * Method: finalize()
     * 
	 * This method is called after all files are loaded. It then finalize the engine start up by creating al required objects
	 * before starting the framework and cloud application startup.
	 *
	 * Parameters: 
	 * None
     * 
	 * Returns:  
	 * None
     */	 
	finalize: function () {
		if (this.createCanvas()) {
			h5c3.device = new h5c3.Device();
			$_DBG_('CloudApp Mode Ready.');
			h5c3.device.boot();
		} 
		else $_DBG_('ERROR: Something went wrong with preparing the canvas. Do you have a DIV with the ID of waCANVAS in your document?');
	},
	
	/** 
	 * Method: _checkAllDone()
     * 
	 * See if all scripts are loaded. Do not call directly.
	 *
	 * Parameters: 
	 * None
     * 
	 * Returns:  
	 * None
     */	 
    _checkAllDone: function () {
        if (!this.$finished) {
            if (this.$scripts.length - 1 === this.$current) {
				//Engine is loaded
				if ($VLD(window.Modernizr)) { $_DBG_('Modernizr v'+window.Modernizr._version+' detected.') }
				if ($VLD(window.jQuery)) { $_DBG_('jQuery v'+$().jquery+' detected.') }
				this.prepareRWD();		
                this.$finished = true;
				
				//Do we need the 2D/3D/Physics and such or just RWD?
				if ($VLD(window.H5C3CFG.rwdOnly) && window.H5C3CFG.rwdOnly==false) this.finalize();
				$_DBG_('H5C3 Framework successfully loaded.');
            } else {
                this.$current++;
                this._loadNextScript();
            }
        }
    },

	/** 
	 * Method: que()
	 *
	 * Add multiple scripts to the que. Do not call directly.
     * 
	 * Parameters: 
	 * Array	$scripts		- Array of scripts to load.
	 * String	$enginebaseURL	- Location of files.
     * 
	 * Returns:  
	 * None
     */	 
    que: function ($scripts, $engineBaseURL) {
        $_DBG_('que(' + $engineBaseURL + ')');
        var $i = 0;
        this.setBaseUrl($engineBaseURL);
        for ($i = 0; $i < $scripts.length; $i++) {
            this.add($scripts[$i]);
        }
    },

	/** 
	 * Method: localLib()
	 *
	 * In-House use only; Used to include all source files for deugging.
	 *
	 * Parameters: 
	 * String	$enginebaseURL	- Location of files.
     * 
	 * Returns:  
	 *None
	 *
     */	 
    localLib: function ($engineBaseURL) {								/** $_DBG_ **/
        $_DBG_('Loading local framework source files...');			/** $_DBG_ **/
        this.setBaseUrl($engineBaseURL);								/** $_DBG_ **/
        //this.add('engine/config.js');									/** $_DBG_ **/

        /** H5C3 Framework **/				
        this.add('ext/base64.js');										/** $_DBG_ **/
        this.add('ext/string.js');										/** $_DBG_ **/

        /** ENGINE **/
        this.add('engine/media.js');									/** $_DBG_ **/
        this.add('engine/input.js');									/** $_DBG_ **/
        this.add('engine/tools.js');									/** $_DBG_ **/
        this.add('engine/loader.js');									/** $_DBG_ **/
        this.add('engine/dataresource.js');								/** $_DBG_ **/
        this.add('engine/math.js');										/** $_DBG_ **/
        this.add('engine/accutimer.js');								/** $_DBG_ **/
        this.add('engine/hashmap.js');									/** $_DBG_ **/
        this.add('engine/systems.js');									/** $_DBG_ **/
        this.add('engine/plugin.js');									/** $_DBG_ **/
        this.add('engine/device.js');									/** $_DBG_ **/

        /** Rich Responsive Wed Design **/
        this.add('r2wd/HTMLVariable.js');								/** $_DBG_ **/
        this.add('r2wd/google.js');										/** $_DBG_ **/
        this.add('r2wd/h5c3.rwd.style.js');								/** $_DBG_ **/
        this.add('r2wd/segment.js');									/** $_DBG_ **/
        this.add('r2wd/applet.js');										/** $_DBG_ **/
        this.add('r2wd/lzw.js');										/** $_DBG_ **/
        this.add('r2wd/mapdom.js');										/** $_DBG_ **/

        /** FRAMEWORK **/
        this.add('framework/color.js');									/** $_DBG_ **/
        this.add('framework/factory.js');								/** $_DBG_ **/
        this.add('framework/banners.js');								/** $_DBG_ **/
        this.add('framework/main.js');									/** $_DBG_ **/
        this.add('framework/game.js');									/** $_DBG_ **/
        this.add('framework/page.js');									/** $_DBG_ **/
        this.add('framework/image.js');									/** $_DBG_ **/
        this.add('framework/scene.js');									/** $_DBG_ **/
        this.add('framework/sprite.js');								/** $_DBG_ **/
        this.add('framework/spritesheet.js');							/** $_DBG_ **/
        this.add('framework/entity.js');								/** $_DBG_ **/
        this.add('framework/layer.js');									/** $_DBG_ **/
        this.add('framework/sound.js');									/** $_DBG_ **/
        this.add('framework/entitylayer.js');							/** $_DBG_ **/
        this.add('framework/intro.js');									/** $_DBG_ **/
		
        /** this.add('webapp/touchpad.js'); **/	
    },																	/** $_DBG_ **/
	 
	/** 
	 * Method: loadPlugins()
     * 
	 * Used to load all plugins required by the application. Do not call directly, engine handles automatically.
	 *
	 * Parameters: 
	 * Array	$scripts		- Array of scripts to load.
	 * String	$enginebaseURL	- Location of files.
     * 
	 * Returns:  
	 * None
	 *
     */	 
	 //<script id="scr1" src="http://www.example.com/some/action?callback=cb" type="text/javascript></script>
    loadApplets: function ($scripts, $engineBaseURL) {
        $_DBG_('loadApplets(' + window.H5C3CFG.options.path + ')');
        var $i = 0;

        this.setBaseUrl(window.H5C3CFG.options.path);
        for ($i = 0; $i < $scripts.length; $i++) {
			var $script = window.document.createElement("script");
		
			$script.type = "application/javascript";
			$script.id=$scripts[$i].name
			$script.src = $scripts[$i].file;
			$script.title = "APPLET";
			$script.async = false;
			window.document.getElementsByTagName("head")[0].appendChild($script);
        }
    },
	
	/** 
	 * Method: loadPlugins()
     * 
	 * Used to load all plugins required by the application. Do not call directly, engine handles automatically.
	 *
	 * Parameters: 
	 * Array	$scripts		- Array of scripts to load.
	 * String	$enginebaseURL	- Location of files.
     * 
	 * Returns:  
	 * None
	 *
     */	 
    loadPlugins: function ($scripts, $engineBaseURL) {
        $_DBG_('loadPlugins(' + $engineBaseURL + ')');
        var $i = 0;
        this.setBaseUrl($engineBaseURL);
        for ($i = 0; $i < $scripts.length; $i++) {
            this.add($scripts[$i] + '.js');
        }
    }
});h5c3.run();/**
 *  Object: Base64
 *
 *  Base64 encode / decode
 *  Updated _utf8_encode & _utf8_decode - Andrew Donelson 31JAN2013
 *  
 *  See <http://www.webtoolkit.info/>
 */
var Base64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
    /**
	 * Method: encode(input)
	 *
	 * public method for encoding
     * 
	 * Parameters:
	 * Mixed	input	Unencoded String
	 *
	 * Returns: 
	 * String	Output	Base64 Encoded String
     */	
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// 
    /**
	 * Method: decode(input)
	 *
	 * public method for decoding
     * 
	 * Parameters:
	 * String	Intput	Base64 Encoded String
	 *
	 * Returns: 
	 * String	Output	Unencoded String
     */	
	decode : function (input) {
		var output = [];
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output.push(String.fromCharCode(chr1));
 
			if (enc3 != 64) {
				output.push(String.fromCharCode(chr2));
			}
			if (enc4 != 64) {
				output.push(String.fromCharCode(chr3));
			}
 
		}
 
//		output = Base64._utf8_decode(output);

        output.join('');
		return output;
 
	},
 
	/** 
	* Method: _utf8_encode:function(argString)
	*
	*   <http://kevin.vanzonneveld.net>
	*
	*   original by: Webtoolkit.info <http://www.webtoolkit.info/>
	*
	*   improved by: Kevin van Zonneveld <http://kevin.vanzonneveld.net>
	*
	*   improved by: sowberry
	*
	*   tweaked by: Jack
	*
	*   bugfixed by: Onno Marsman
	*
	*   improved by: Yves Sucaet
	*
	*   bugfixed by: Onno Marsman
	*
	*   bugfixed by: Ulrich
	*
	*   bugfixed by: Rafal Kukawski
	*
	*   improved by: kirilloid
	*
	*   example 1: utf8_encode('Kevin van Zonneveld');
	*
	*   returns 1: 'Kevin van Zonneveld'
	*/
	_utf8_encode:function(argString) {
	  if (argString === null || typeof argString === "undefined") {
		return "";
	  }

	  var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
	  var utftext = '',
		start, end, stringl = 0;

	  start = end = 0;
	  stringl = string.length;
	  for (var n = 0; n < stringl; n++) {
		var c1 = string.charCodeAt(n);
		var enc = null;

		if (c1 < 128) {
		  end++;
		} else if (c1 > 127 && c1 < 2048) {
		  enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
		} else {
		  enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
		}
		if (enc !== null) {
		  if (end > start) {
			utftext += string.slice(start, end);
		  }
		  utftext += enc;
		  start = end = n + 1;
		}
	  }

	  if (end > start) {
		utftext += string.slice(start, stringl);
	  }

	  return utftext;
	},
 
	/**
	 * http://kevin.vanzonneveld.net
	 * original by: Webtoolkit.info (http://www.webtoolkit.info/)
	 * 	input by: Aman Gupta
	 *	improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	 *	improved by: Norman "zEh" Fuchs
	 *	bugfixed by: hitwork
	 *	bugfixed by: Onno Marsman
	 *	input by: Brett Zamir (http://brett-zamir.me)
	 *	bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	 *	example 1: utf8_decode('Kevin van Zonneveld');
	 *	returns 1: 'Kevin van Zonneveld'
	 */
	_utf8_decode:function(str_data) {
	  var tmp_arr = [],
		i = 0,
		ac = 0,
		c1 = 0,
		c2 = 0,
		c3 = 0;

	  str_data += '';

	  while (i < str_data.length) {
		c1 = str_data.charCodeAt(i);
		if (c1 < 128) {
		  tmp_arr[ac++] = String.fromCharCode(c1);
		  i++;
		} else if (c1 > 191 && c1 < 224) {
		  c2 = str_data.charCodeAt(i + 1);
		  tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
		  i += 2;
		} else {
		  c2 = str_data.charCodeAt(i + 1);
		  c3 = str_data.charCodeAt(i + 2);
		  tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
		  i += 3;
		}
	  }

	  return tmp_arr.join('');
	} 
};

/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
 
/**
 * Class:  gamecore.Media
 * 
 * gamecore.Media is used to to accuratly detect the device, browser & version, operating system & version.
 * 
 */
gamecore.Media = gamecore.Base.extend('gamecore.Media',
{
    /**
	 * Property: struct	browser
	 *
	 * Holds detected browser information
     */	
    browser:
   	{
   		name: 'Unknown',
   		version: 'Unknown'
   	},

    /**
	 * Property: struct	OS
	 *
	 * Holds detected Operating System information
     */	
    OS:
   	{
   		name: 'Unknown',
   		version: 'Unknown'
   	},
	
    /**
	 * Constructor: init()
	 *
	 * Parameters:
	 * None
	 *
	 * Returns: 
	 * None
     */	
    init: function () {
    	this.browser.name = this.searchString(this.dataBrowser) || "Unknown";
    	this.browser.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    	this.OS.name = this.searchString(this.dataOS) || "Unknown";
    	this.OS.version = this.searchString(this.dataOS) || "Unknown";
		//window.alert('['+navigator.userAgent+'] = '+this.browser+' v'+this.version+' on '+this.OS);
    },
	
    /**
	 * Method: searchString($data)
	 *
	 * parse the given UA string fo indentifying information
     * 
	 * Parameters:
	 * String	$data
	 *
	 * Returns: 
	 * String	Identity
     */	
    searchString: function ($data) {
    	for (var i=0;i<$data.length;i++)	{
    		var dataString = $data[i].string;
    		var dataProp = $data[i].prop;
    		this.versionSearchString = $data[i].versionSearch || $data[i].identity;
    		if (dataString) {
    			if (dataString.indexOf($data[i].subString) != -1)
    				return $data[i].identity;
    		}
    		else if (dataProp)
    			return $data[i].identity;
    	}
    },
    /**
	 * Method: searchVersion()
	 *
	 * Parameters:
	 * String	dataString
	 *
	 * Returns: 
	 * Number
     */	
    searchVersion: function ($dataString) {
    	var index = $dataString.indexOf(this.versionSearchString);
    	if (index == -1) return;
    	return parseFloat($dataString.substring(index+this.versionSearchString.length+1));
    },
    /**
	 * Constant:
	 *	Array	dataBrowser		Array of browsers
     */	
    dataBrowser: [
    	{ string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
    	{ string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb"	},
    	{ string: navigator.vendor, subString: "Apple", identity: "Safari",	versionSearch: "Version" },
    	{ string: navigator.vendor, subString: "iCab", identity: "iCab" },
    	{ string: navigator.vendor,	subString: "KDE", identity: "Konqueror"	},
    	{ string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
    	{ string: navigator.vendor, subString: "Camino", identity: "Camino"	},
    	{ string: navigator.userAgent, subString: "Netscape", identity: "Netscape" }, // for newer Netscapes (6+)
    	{
    		string: navigator.userAgent,
    		subString: "MSIE",
    		identity: "Explorer",
    		versionSearch: "MSIE"
    	},
    	{
    		string: navigator.userAgent,
    		subString: "Gecko",
    		identity: "Mozilla",
    		versionSearch: "rv"
    	},
    	{ 		// for older Netscapes (4-)
    		string: navigator.userAgent,
    		subString: "Mozilla",
    		identity: "Netscape",
    		versionSearch: "Mozilla"
    	},
    	{ 
			prop: window.opera,
			identity: "Opera"
    	}
    ],
    /**
	 * Constant:
	 *	Array	dataOS		Array of operating systems
     */	
    dataOS : [
    	{ string: navigator.platform,	subString: "Win64", identity: "Windows 64Bit" },
    	{ string: navigator.platform,	subString: "WOW64", identity: "Windows 64Bit" },
    	{ string: navigator.platform,	subString: "Win32", identity: "Windows 32Bit" },

    	{ string: navigator.platform,	subString: "x86_64", identity: "Windows 64Bit" },
    	{ string: navigator.platform,	subString: "x86-64", identity: "Windows 64Bit" },
    	{ string: navigator.platform,	subString: "x64;", identity: "Windows 64Bit" },
    	{ string: navigator.platform,	subString: "x64_64", identity: "Windows 64Bit" },
    	{ string: navigator.platform,	subString: "Win64", identity: "Windows 64Bit" },
		
		
    	{ string: navigator.platform,	subString: "Mac", identity: "Macintosh" },
    	{ string: navigator.userAgent, subString: "iPhone", identity: "iPhone/iPod" },
    	{ string: navigator.platform, subString: "Linux",	identity: "Linux" },
    	{ string: navigator.platform,	subString: "Android", identity: "Android" }
    ]
},
{
// Singleton static class, so nothing required here
});
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * Class:  h5c3.Input
 * 
 * 
 * 
 * This class provides a way of binding and reacting to input in a convenient and device independent way. The
 * engine will automatically construct a single, global input class which is accessible via the global h5c3.device.input.
 * 
 * There are two kinds of inputs that can be handled, actions and states. An action is a single event that occurs
 * as a reaction to an input such as clicking the mouse or pressing a key. Typical actions are having a player jump, or
 * open a door. States are when an input is in an on/off state, such as turning a ship or firing a weapon.
 * 
 * <h5>Actions</h5>
 * Reacting to action involves 'binding' an action, such as 'open door' or 'jump' to an object in the game which will
 * trigger a call to the object's onAction method.
 * 
 * MyGame = h5c3.Game('MyGame',
 * {},
 * {
 *    onLoaded:function (loaded, errored)
 *    {
 *       // bind the jump action to the space key
 *       this.input.bindAction(this, 'jump', 'SPACE');
 *       // as well as a mouse click
 *       this.input.bindAction(this, 'jump', 'MOUSE_LEFT_CLICK');
 *    },
 *
 *    // this onAction method will be called when an action relating to
 *    // this object is triggered
 *    onAction:function(actionName)
 *    {
 *       if (actionName ==== 'jump')
 *       {
 *          // player.jump!
 *       }
 *    }
 *
 * });
 * (end)
 * 
 * <h5>States</h5>
 * States are used to indicate when a key or input control is currently active or not. Typically a state is used
 * when you want to react for the entire time an input is engaged, such as holding down a key to accelerate a car.
 * 
 * To use an input state, bind it to an object the same way you do an action. You will then need to separately check
 * if the state is on at the appropriate time for your game. Most commonly this is done in a process function. See
 * the <a href='h5c3.Game'>game</a>, <a href='h5c3.Layer'>layer</a> or <a href='h5c3.Scene'>scene</a> classes for more
 * information on overriding a process function.
 * 
 * // bind the state to an input and an object
 * this.input.bindState(this, 'moving left', 'LEFT');
 *
 * // check for the state being active in the game, layer or scene process
 * process:function ()
 * {
 *    if (h5c3.device.input.isInputState(this, 'moving left'))
 *       // move the player left
 * }
 * (end)
 * You can see an example of both input actions and states in the Asteroids sample game.
 * 
 * Rather than using this class directly, you can also use the <a href='h5c3.components.Input'>input component</a>
 * and <a href='h5c3.systems.Input'>system</a> which lets you bind input to an entity as a component.
 */
h5c3.Input = h5c3.Base('h5c3.Input',
    /** Interface: h5c3.Input */
    {
        _eventPos: null, // cached for speed

        /**
         * Extracts the position from an event (in a cross-browser way),and then sets the passed in pos
         * Parameters:  Object e Event to extract the position from
         * Parameters:  {h5c3.Point} [pos] Position object to set. Leave out to have a new (pooled) point returned
         */
        getEventPosition:function(e, pos)
        {
            if (this._eventPos === null) {
                this._eventPos = h5c3.Point.create(0,0);
			}

            var r = pos;
            if (!$VLD(pos)) {
                r = this._eventPos;
			}

            if (e.pageX || e.pageY)
            {
                r.x = e.pageX;
                r.y = e.pageY;
            } else
            {
                r.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                r.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }

            return r;
        }

    },
    /** Interface: h5c3.Input.prototype */
    {
        /** Current state bindings */
        stateBindings:null,
        /** Currently active states */
        states:null,
        /** Action bindings */
        actionBindings:null,
        /** Current position of the mouse on-screen, updated continuously */
        mousePos: null,
        /** indicates if the left mouse button is currently down */
        mouseLeftButtonDown: false,
        /** indicates if the right mouse button is currently down */
        mouseRightButtonDown: false,
        /** indicates if the middle mouse button is currently down */
        mouseMiddleButtonDown: false,

        init:function ()
        {
            this._super();
            this.stateBindings = new h5c3.Hashtable();
            this.states = new h5c3.Hashtable();
            this.actionBindings = new h5c3.Hashtable();
            this.mousePos = h5c3.Point.create(0,0);
        },

        /**
         * Binds an input state to an object, such as 'turning left' or 'firing' to an input code.
         * You can bind an input to any object, however typically it's to a layer, scene or game. The input will not
         * trigger if the object is not presently active.
         * If you specify a UIElement (optional), the state is only triggered if the event occurs inside
         * the bounds of the element (typically a positional event like a touch start or mouse move)
         * Parameters:  Object obj An object to bind the state to
         * Parameters:  String stateName The name of the state, e.g. "turning left"
         * Parameters:  String input The name of the input, i.e. 'LEFT' (see h5c3.InputType)
         * Parameters:  Object [uiTarget] Optional UI object to bind the input to
         */
        bindState:function (obj, stateName, input, uiTarget)
        {
            if (obj.uniqueId === null) {
                throw "Oops, you can't bind a state to an object if it doesn't have a uniqueId function";
			}

            input = input.toUpperCase();
            // There can be many bindings associated with a particular input, so we see
            // if there is already one, and then append this to the array, otherwise
            // we create the array
            var binding = { stateName:stateName, object:obj, input:input, state:{on:false, event:null}, uiTarget:uiTarget },
				bindingSet = this.stateBindings.get(input);
            if (bindingSet === null) {
                this.stateBindings.put(input, [ binding ]);
			} else {
                // otherwise append a new binding
                bindingSet.push(binding);
			}
            // now setup a state for this object/input combination
            this.states.put(obj.uniqueId + '\\\\' + stateName, {on: false, event: null});

            // if this is a positional type binding, add it to the positional tracking array
            if (h5c3.InputType.isPositional(h5c3.InputType.getCode(input))) {
                this._positionals.push(binding);
			}
        },


        /**
         * Clears any on states related to an object.
         * Parameters:  Object obj The object to clear states for
         */
        clearStates:function (obj)
        {
            var b,i,binding,state,bindingSet,bindings = this.stateBindings.entries();

            for (b=0; b < bindings.length; b++)
            {
                bindingSet = bindings[b];
                for (i = 0; i < bindingSet.length; i++)
                {
                    binding = bindingSet[i];
                    if (binding.object === obj)
                    {
                        state = this.states.get(next.object.uniqueId + '\\\\' + next.stateName);
                        state.on = false;
                        state.event = null;
                        if (h5c3.InputType.isPositional(binding.input)) {
                            h5c3.tools.arrayRemove(this._positionals, binding);
						}
                    }
                }
            }
        },

        /**
         * Returns true if the named state is currently active. If you need anything more than the state boolean
         * use getInputState, which includes the actual event.
         * Parameters:  Object obj Object to check the binding against
         * Parameters:  String stateName A string representing a previously setup state, i.e. 'turning left'
         * Returns:  Boolean true if the state is currently on (such as a key being down)
         */
        isInputState:function (obj, stateName)
        {
            // lookup is very slow; have to find the state for a certain stateName and object
            // TODO: oops this is creating strings for every check (usually every frame)-- get rid of it
            // add a state property to the bound object and update it when the state changes
            var state = this.states.get(obj.uniqueId + '\\\\' + stateName);
            if (state === null) { throw 'Ooops, unknown state ' + stateName; }
            return state.on;
        },

        /**
         * Gets the present input state object (which includes the event data).
         * Parameters:  Object obj Object to check against (such as a layer, scene or game)
         * Parameters:  String stateName Name of the state to check for
         * Returns: Object state object containing the state.state and state.event data
         */
        getInputState:function (obj, stateName)
        {
            return this.states.get(obj.uniqueId + '\\\\' + stateName);
        },

        /**
         * Binds an input event to an action and object; e.g. bindAction(playerShip, 'fire', 'CTRL')
         * will trigger an action callback on the playerShip entity when the CTRL key is pressed down.
         * You can bind an input to a layer, scene or entity. The input will not trigger if the object
         * is not presently active.
         * 
         * For positional events (such as a mouse or touch input) the action will only fire if the position
         * of the event is within the bounds of the object (based on a call to getScreenRect). You can optionally
         * provide a uiTarget object to provide a different bounding rectangle. If the object provides no getScreenRect
         * method, then no bounding check will be carried out.
         * 
         * For (start code)
         * var menuLayer = new Layer();                     // a menu layer
         * var menuOption = new TextElement('New Game');    // a menu item
         *
         * // trigger the 'new game' action for the menuLayer, when a mouse click occurs within the menuOption element
         * h5c3.device.input.bindAction(menuLayer, 'new game', 'MOUSE_LEFT_BUTTON', menuOption);
         * (end)
         * Note: If the uiTarget element is not provided, the bounding rectangle of the obj is used (as long as
         * the object provides a getScreenRect() method, otherwise there is no checking
         *
         * Parameters:  {h5c3.Base} obj The entity, layer or scene to bind this action to (must implement onAction)
         * Parameters:  String actionName The name of the action, e.g. 'FIRE' or 'JUMP'
         * Parameters:  String input The input code as a string
         * Parameters:  {h5c3.Base} [uiTarget] An optional element to limit the input to only within the bounds of the element (must
         * implement getScreenRect)
         */
        bindAction:function (obj, actionName, input, uiTarget)
        {
            // There can be many bindings associated with a particular input event, so we see
            // if there is already one, and then append this to the array, otherwise
            // we create the array
            input = input.toUpperCase();

            var bindingSet = this.actionBindings.get(input);
            if (bindingSet === null) {
                this.actionBindings.put(input, [
                    { actionName:actionName, object:obj, input:input, uiTarget:uiTarget }
                ]);
			} else {
                // otherwise append a new binding
                bindingSet.push({ actionName:actionName, input:input, object:obj, uiTarget:uiTarget });
			}
        },

        /**
         * Triggers an action to be fired. Typically this will be fired in response to an input, but it can
         * also be used to simulate an event.
         * Parameters:  Number eventCode event code
         * Parameters:  {Event} event An event object
         */
        fireAction:function (eventCode, event)
        {
            var i,binding,obj,pos,er,bindingSet = this.actionBindings.get(h5c3.InputType.getName(eventCode));
            if (bindingSet === null) { return false; }

            // cycle through all the bindings against this input type and fire the object callbacks
            for (i = 0; i < bindingSet.length; i++)
            {
                binding = bindingSet[i];
                obj = bindingSet[i].object;
                if (!obj.isActive || obj.isActive())
                {
                    // if it's a positional event type (like a mouse down or move, then we only
                    // fire events to objects where the event is within its spatial bounds
                    if (h5c3.InputType.isPositional(eventCode))
                    {
                        pos = this.Class.getEventPosition(event);
                        er = null;
                        if ($VLD(binding.uiTarget)) {
                            er = binding.uiTarget.getScreenRect();
						} else {
                            er = obj.getScreenRect ? obj.getScreenRect() : null;
						}

                        if (er && er.containsPoint(pos)) {
                            obj.onAction(binding.actionName, event, pos, binding.uiTarget);
						}
                    } else {
                        obj.onAction(binding.actionName);
					}
                }
            }
            return true;
        },

        /*** INTERNALS **/
        
        _onReady:function ()
        {
			$_DBG_('onReady Event.');
			/**
			if (h5c3.device.useTouch) {
				h5c3.device.game.canvas.addEventListener('touchstart', this._touchStart.bind(this), true);
				h5c3.device.game.canvas.addEventListener('touchend', this._touchEnd.bind(this), true);
				h5c3.device.game.canvas.addEventListener('touchmove', this._touchMove.bind(this), true);

				h5c3.device.touchpad.canvas.addEventListener('touchstart', this._touchStart.bind(this), true);
				h5c3.device.touchpad.canvas.addEventListener('touchend', this._touchEnd.bind(this), true);
				h5c3.device.touchpad.canvas.addEventListener('touchmove', this._touchMove.bind(this), true);
			} else {		
				// mouse input	
				//fixes a problem where double clicking causes text to get selected on the canvas
				h5c3.device.game.canvas.addEventListener('selectstart', function(event) { event.preventDefault(); return false; }, false);		
				h5c3.device.game.canvas.addEventListener('mouseup', this._mouseUp.bind(this), true);
				h5c3.device.game.canvas.addEventListener('mousedown', this._mouseDown.bind(this), true);
				h5c3.device.game.canvas.addEventListener('mousemove', this._mouseMove.bind(this), true);
				h5c3.device.game.canvas.addEventListener('mousewheel', this._mouseWheel.bind(this), true);
				h5c3.device.game.canvas.addEventListener('contextmenu', this._contextMenu.bind(this), true);
			}
			**/
			h5c3.device.game.obj.attachTouchEvents(this);
            // key input
            window.addEventListener('keydown', this._keyDown.bind(this), true);
            window.addEventListener('keyup', this._keyUp.bind(this), true);
        },

        _positionals: [], // array of bindings that need to be checked against positional events like mouse move and touch

        // Checks the positional event to see if it's a new event INSIDE an on-screen rectangle that has been
        // bound to a state. This is so when a positional event, like a mouse move, 'slides' over an element
        // we can turn the state on, as well as detecting when it slides out of the area of the uiTarget

        _checkPositional: function(moveEvent)
        {
			var i,binding,er,state,state2;
            // check existing tracked states -- did we move out of an element
            for (i=0; i < this._positionals.length; i++)
            {
                binding = this._positionals[i];

                if (moveEvent.type === 'mousemove' && h5c3.InputType.isTouch(h5c3.InputType.getCode(binding.input))) {
                    continue;
				}

                if (moveEvent.type === 'touchmove' && !h5c3.InputType.isTouch(h5c3.InputType.getCode(binding.input))) {
                    continue;
				}

                if (h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_LEFT_UP ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_LEFT_DOWN ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_RIGHT_UP ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_RIGHT_DOWN ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_MIDDLE_UP ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_BUTTON_MIDDLE_DOWN ||
                    h5c3.InputType.getCode(binding.input) === h5c3.InputType.MOUSE_CLICK
                    ) {
                    continue;
				}

                er = null;
                if ($VLD(binding.uiTarget)) {
                    er = binding.uiTarget.getScreenRect();
                } else {
                    er = binding.object.getScreenRect ? binding.object.getScreenRect() : null;
				}

                if (er)
                {
                    if (!er.containsPoint( this.Class.getEventPosition(moveEvent) ))
                    {
                        // no longer in the right position, turn state off
                        state = this.states.get(binding.object.uniqueId + '\\\\' + binding.stateName);
                        state.on = false;
                        state.event = moveEvent;
                    } else {
                        // moved into position, turn back on
                        state2 = this.states.get(binding.object.uniqueId + '\\\\' + binding.stateName);
                        state2.on = true;
                        state2.event = moveEvent;
                    }
                }
            }
        },

        _changeState:function (eventCode, stateOn, event)
        {
            // grab all the bindings to this event code
            var i,bindingSet,binding,pos,er,state,keyName = h5c3.InputType.getName(eventCode);
            if (keyName === null)
            {
                this.warn("Unknown keycode = " + eventCode);
                return false;
            }

            bindingSet = this.stateBindings.get(keyName);
            //$_DBG_('change state = ' + this.inputType.getName(event.keyCode,+ ' bindings=' + bindingSet));
            if (bindingSet === null) { return false; }

            // cycle through all the bindings against this input type and change the state
            for (i = 0; i < bindingSet.length; i++)
            {
                binding = bindingSet[i];
                if (!binding.object.isActive || binding.object.isActive())
                {
                    if (h5c3.InputType.isPositional(eventCode))
                    {
                        // if binding has a uiElement, then make sure the event hit is within the on-screen
                        // rectangle
                        pos = this.Class.getEventPosition(event);
                        er = null;

                        if ($VLD(binding.uiTarget)) {
                            er = binding.uiTarget.getScreenRect();
                        } else {
                            er = binding.object.getScreenRect ? binding.object.getScreenRect() : null;
						}

                        if (er)
                        {
                            if (er.containsPoint(pos))
                            {
                                state = this.states.get(binding.object.uniqueId + '\\\\' + binding.stateName);
                                state.on = stateOn;
                                state.event = event;
                            }
                        } else
                        {
                            // positional, but no uiTarget
                            state = this.states.get(binding.object.uniqueId + '\\\\' + binding.stateName);
                            state.on = stateOn;
                            state.event = event;
                        }
                    }
                    else
                    {
                        state = this.states.get(binding.object.uniqueId + '\\\\' + binding.stateName);
                        state.on = stateOn;
                        state.event = event;
                    }
                }
            }
            return true;
        },

        _lastMouseMove: null,

        /**
         * Called by the h5c3.device main loop to process any move events received. We only handle events
         * here so they are processed once per cycle, not every time we get them (i.e. stop handling
         * a flood of mouse move or touch events
         */
        process: function()
        {
            if (this._lastMouseMove)
            {
                this._checkPositional(this._lastMouseMove);
                this.fireAction(h5c3.InputType.MOUSE_MOVE, this._lastMouseMove);
                this.Class.getEventPosition(this._lastMouseMove, this.mousePos);
                this._lastMouseMove = null;
            }
        },

        ///////////////////////////////////////////////////////////////////////////////////
        //
        //  EVENT HANDLERS
        //
        ///////////////////////////////////////////////////////////////////////////////////

        _keyDown:function (event)
        {
            if (this._changeState(event.keyCode, true, event)) {
                event.preventDefault();
			}

            if (this.fireAction(event.keyCode, event)) {
                event.preventDefault();
			}
        },

        _keyUp:function (event)
        {
            if (this._changeState(event.keyCode, false, event)) {
                event.preventDefault();
			}
        },

        _touchStart:function (event)
        {
			var i;
            for(i=0, len=event.touches.length; i < len; i++)
            {
                this._changeState(h5c3.InputType.TOUCH, true, event.touches[i]);
                this.fireAction(h5c3.InputType.TOUCH, event.touches[i]);
            }
            event.preventDefault();
        },

        _touchEnd:function (event)
        {
			var i;
            for(i=0, len=event.changedTouches.length; i < len; i++) {
                this._changeState(h5c3.InputType.TOUCH, false, event.changedTouches[i]);
			}
            event.preventDefault();
        },

        _touchMove:function (event)
        {
			var i;
            for(i=0, len=event.touches.length; i < len; i++) {
                this._checkPositional(event.touches[i]);
			}
            event.preventDefault();
        },

		_mouseButton:function (event, down) 
		{
           switch (event.button) 
		   {
                case 0: //Left Button
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_LEFT_DOWN, down, event);
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_LEFT_UP, !down, event);
                    this.fireAction(h5c3.InputType.MOUSE_BUTTON_LEFT_DOWN, event);
                    this.mouseLeftButtonDown = true;
                break;
                case 1: //Middle Button
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_MIDDLE_DOWN, down, event);
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_MIDDLE_UP, !down, event);
                    this.fireAction(h5c3.InputType.MOUSE_BUTTON_MIDDLE_DOWN, event);
                    this.mouseMiddleButtonDown = true;
                break;
                case 2: //Right Button
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_RIGHT_DOWN, down, event);
                    this._changeState(h5c3.InputType.MOUSE_BUTTON_RIGHT_UP, !down, event);
                    this.fireAction(h5c3.InputType.MOUSE_BUTTON_RIGHT_DOWN, event);
                    this.mouseRightButtonDown = true;
                break;         
            }

            this.fireAction(h5c3.InputType.MOUSE_CLICK, event);
            // turn off specific states
            event.preventDefault();
		},
		
        _mouseUp:function (event)
        {
			this._mouseButton(event,false);
        },

        _mouseDown:function (event)
        {
			this._mouseButton(event,true);
        },

        _mouseMove:function (event)
        {
            this._lastMouseMove = event;
            event.preventDefault();
        },
				
        _contextMenu: function(event)
        {
            this._changeState(h5c3.InputType.MOUSE_BUTTON_RIGHT_UP, true, event);
            this.fireAction(h5c3.InputType.MOUSE_BUTTON_RIGHT_DOWN, event);
        },

        _mouseWheel:function (event)
        {
            if (event.wheelDelta > 0) {
                this.fireAction(h5c3.InputType.MOUSE_WHEEL_UP, event);
            } else {
                this.fireAction(h5c3.InputType.MOUSE_WHEEL_DOWN, event);
			}	
            event.preventDefault();
        }
    });

h5c3.InputType = h5c3.Base.extend('h5c3.InputType',
    {
        // STATICS
        nameToCode:null,
        codeToName:null,

        POSITIONAL_EVENT_START:     1000,
        MOUSE_MOVE:                 1100, // Basic mouse movement
		MOUSE_CLICK:				1110,
        MOUSE_BUTTON_LEFT_UP:       1200,
        MOUSE_BUTTON_LEFT_DOWN:     1201,
        MOUSE_BUTTON_RIGHT_UP:      1220,
        MOUSE_BUTTON_RIGHT_DOWN:    1221,
        MOUSE_BUTTON_MIDDLE_UP:     1230,
        MOUSE_BUTTON_MIDDLE_DOWN:   1231,
        MOUSE_WHEEL_UP:             1300,
        MOUSE_WHEEL_DOWN:           1301,
		
        TOUCH:                      1000,
        TOUCH_MOVE:                 1001,
        TOUCH_START:                1002,
        TOUCH_END:                  1003,
        TOUCH_CANCEL:               1004,
        TOUCH_LEAVE:                1005,

        init:function ()
        {
			var c,ch;
            this.nameToCode = new h5c3.Hashtable();
            this.codeToName = new h5c3.Hashtable();

            this.addInput(8, 'BACKSPACE');
            this.addInput(9, 'TAB');
            this.addInput(13, 'ENTER');
            this.addInput(16, 'SHIFT');
            this.addInput(17, 'CTRL');
            this.addInput(18, 'ALT');
            this.addInput(19, 'PAUSE');
            this.addInput(20, 'CAPS');
            this.addInput(27, 'ESC');
            this.addInput(32, 'SPACE');
            this.addInput(33, 'PAGE_UP');
            this.addInput(34, 'PAGE_DOWN');
            this.addInput(35, 'END');
            this.addInput(36, 'HOME');
            this.addInput(37, 'LEFT');
            this.addInput(38, 'UP');
            this.addInput(39, 'RIGHT');
            this.addInput(40, 'DOWN');
            this.addInput(45, 'INSERT');
            this.addInput(46, 'DELETE');

            // add alphanumierics
            for (c=48; c < 91; c++)
            {
                ch = String.fromCharCode(c);
                this.addInput(c, ch);
            }

            this.addInput(91, 'WINDOW_LEFT');
            this.addInput(92, 'WINDOW_RIGHT');
            this.addInput(93, 'SELECT');
            this.addInput(96, 'NUM_0');
            this.addInput(97, 'NUM_1');
            this.addInput(98, 'NUM_2');
            this.addInput(99, 'NUM_3');
            this.addInput(100, 'NUM_4');
            this.addInput(101, 'NUM_5');
            this.addInput(102, 'NUM_6');
            this.addInput(103, 'NUM_7');
            this.addInput(104, 'NUM_8');
            this.addInput(105, 'NUM_9');
            this.addInput(106, '*');
            this.addInput(107, '+');
            this.addInput(109, '-');
            this.addInput(110, '.');
            this.addInput(111, '/');
            this.addInput(112, 'F1');
            this.addInput(113, 'F2');
            this.addInput(114, 'F3');
            this.addInput(115, 'F4');
            this.addInput(116, 'F5');
            this.addInput(117, 'F6');
            this.addInput(118, 'F7');
            this.addInput(119, 'F8');
            this.addInput(120, 'F9');
            this.addInput(121, 'F10');
            this.addInput(122, 'F11');
            this.addInput(123, 'F12');
            this.addInput(144, 'NUM_LOCK');
            this.addInput(145, 'SCROLL_LOCK');
            this.addInput(186, ';');
            this.addInput(187, '=');
            this.addInput(188, ',');
            this.addInput(189, '-');
            this.addInput(190, '.');
            this.addInput(191, '/');
            this.addInput(192, '`');
            this.addInput(219, '[');
            this.addInput(220, '\\');
            this.addInput(221, ']');
            this.addInput(222, '\'');

            this.addInput(this.TOUCH, 'TOUCH');
//            this.addInput(this.TOUCH_MOVE, 'touchmove');
//            this.addInput(this.TOUCH_START, 'touchstart'); 
//            this.addInput(this.TOUCH_END, 'touchend');
//            this.addInput(this.TOUCH_CANCEL, 'touchcancel'); 
//            this.addInput(this.TOUCH_LEAVE, 'touchleave'); 

            this.addInput(this.MOUSE_BUTTON_LEFT_DOWN, 'MOUSE_BUTTON_LEFT_DOWN');
            this.addInput(this.MOUSE_BUTTON_LEFT_UP, 'MOUSE_BUTTON_LEFT_UP');
            this.addInput(this.MOUSE_BUTTON_RIGHT_DOWN, 'MOUSE_BUTTON_RIGHT_DOWN');
            this.addInput(this.MOUSE_BUTTON_RIGHT_UP, 'MOUSE_BUTTON_RIGHT_UP');
            this.addInput(this.MOUSE_BUTTON_MIDDLE_DOWN, 'MOUSE_BUTTON_MIDDLE_DOWN');
            this.addInput(this.MOUSE_BUTTON_MIDDLE_UP, 'MOUSE_BUTTON_MIDDLE_UP');
            this.addInput(this.MOUSE_WHEEL_UP, 'MOUSE_WHEEL_UP');
            this.addInput(this.MOUSE_WHEEL_DOWN, 'MOUSE_WHEEL_DOWN');
            this.addInput(this.MOUSE_MOVE, 'MOUSE_MOVE');
            this.addInput(this.MOUSE_CLICK, 'MOUSE_CLICK');
        },

        isTouch:function(inputCode)
        {
            return inputCode === this.TOUCH;
        },

        isPositional:function (inputCode)
        {
            return inputCode >= this.POSITIONAL_EVENT_START;
        },

        /**
         * Private utility method used by the constructor to add the input codes and lookup
         * names to both indexes/hash tables
         * Parameters:  inputCode event input code (i.e. event.keyCode)
         * Parameters:  inputName the human name of the input
         */
        addInput:function (inputCode, inputName)
        {
            this.codeToName.put(inputCode, inputName);
            this.nameToCode.put(inputName, inputCode);
        },

        /**
         * Returns the name of an input based on the event code
         * Parameters:  inputCode
         */
        getName:function (inputCode)
        {
            return this.codeToName.get(inputCode);
        },

        /**
         * Returns the code of an input based on the input name
         * Parameters:  inputName
         */
        getCode:function (inputName)
        {
            return this.nameToCode.get(inputName);
        }

    },
    {}
);

/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 *
 * xmlToJSON function:
 * This work is licensed under Creative Commons GNU LGPL License.
 * License: http://creativecommons.org/licenses/LGPL/2.1/
 * Version: 0.9
 * Author:  Stefan Goessner/2006
 * Web:     http://goessner.net/
 */

/**
 * Class:  h5c3.Tools
 * 
 * 
 * 
 * A collection of useful tools. This is a static class, so you can just call methods directly, i.e.
 * 
 * var cleanValue = h5c3.Tools.checked(value, 'default');
 * (end)
 * There are shortcuts for the following common tools functions to make like a little easier:
 * 
 * $VLD = h5c3.Tools.isValid;
 * $CHK = h5c3.Tools.checked;
 * $AST = h5c3.Tools.assert;
 * (end)
 */
h5c3.Tools = h5c3.Base.extend('h5c3.Tools',
    /** Interface: h5c3.Tools */
    {	
        /**
         * Removes an element from an array
         * Parameters:  Array array The array to remove the element from
         * Parameters:  Mixed e The element to remove
         */
        arrayRemove:function (array, e)
        {

            //for (var i = 0; i < array.length; i++)
            for (var i = array.length - 1; i >= 0; i--)
            {
                if (array[i] == e)
                    array.splice(i, 1);
            }
        },

        /**
         * Adds an element to an array, but only if it isn't already there
         * Parameters:  array the array to add to
         * Parameters:  e the element to add
         */
        arrayExclusiveAdd:function (array, e)
        {
            if (array.indexOf(e) == -1)
                array.push(e);
        },

        /**
         * Converts XML to a json string
         * Parameters:  String xml XML source data as a string
         * Parameters:  String tab String to use for tabulation
         * Returns: String JSON string form of the XML
         */
        xmlToJson:function (xml, tab)
        {
            var X = {
                toObj:function (xml)
                {
                    var o = {};
                    if (xml.nodeType == 1)
                    {   // element node ..
                        if (xml.attributes.length)   // element with attributes  ..
                            for (var i = 0; i < xml.attributes.length; i++)
                                o[xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
                        if (xml.firstChild)
                        { // element has child nodes ..
                            var textChild = 0, cdataChild = 0, hasElementChild = false;
                            for (var n = xml.firstChild; n; n = n.nextSibling)
                            {
                                if (n.nodeType == 1) hasElementChild = true;
                                else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                                else if (n.nodeType == 4) cdataChild++; // cdata section node
                            }
                            if (hasElementChild)
                            {
                                if (textChild < 2 && cdataChild < 2)
                                { // structured element with evtl. a single text or/and cdata node ..
                                    X.removeWhite(xml);
                                    for (var n = xml.firstChild; n; n = n.nextSibling)
                                    {
                                        if (n.nodeType == 3)  // text node
                                            o["#text"] = X.escape(n.nodeValue);
                                        else if (n.nodeType == 4)  // cdata node
                                            o["#cdata"] = X.escape(n.nodeValue);
                                        else if (o[n.nodeName])
                                        {  // multiple occurence of element ..
                                            if (o[n.nodeName] instanceof Array)
                                                o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                            else
                                                o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                                        }
                                        else  // first occurence of element..
                                            o[n.nodeName] = X.toObj(n);
                                    }
                                }
                                else
                                { // mixed content
                                    if (!xml.attributes.length)
                                        o = X.escape(X.innerXml(xml));
                                    else
                                        o["#text"] = X.escape(X.innerXml(xml));
                                }
                            }
                            else if (textChild)
                            { // pure text
                                if (!xml.attributes.length)
                                    o = X.escape(X.innerXml(xml));
                                else
                                    o["#text"] = X.escape(X.innerXml(xml));
                            }
                            else if (cdataChild)
                            { // cdata
                                if (cdataChild > 1)
                                    o = X.escape(X.innerXml(xml));
                                else
                                    for (var n = xml.firstChild; n; n = n.nextSibling)
                                        o["#cdata"] = X.escape(n.nodeValue);
                            }
                        }
                        if (!xml.attributes.length && !xml.firstChild) o = null;
                    }
                    else if (xml.nodeType == 9)
                    { // document.node
                        o = X.toObj(xml.documentElement);
                    }
                    else
                        alert("unhandled node type: " + xml.nodeType);
                    return o;
                },
                toJson:function (o, name, ind)
                {
                    var json = name ? ("\"" + name + "\"") : "";
                    if (o instanceof Array)
                    {
                        for (var i = 0, n = o.length; i < n; i++)
                            o[i] = X.toJson(o[i], "", ind + "\t");
                        json += (name ? ":[" : "[") + (o.length > 1 ? ("\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind) : o.join("")) + "]";
                    }
                    else if (o == null)
                        json += (name && ":") + "null";
                    else if (typeof(o) == "object")
                    {
                        var arr = [];
                        for (var m in o)
                            arr[arr.length] = X.toJson(o[m], m, ind + "\t");
                        json += (name ? ":{" : "{") + (arr.length > 1 ? ("\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind) : arr.join("")) + "}";
                    }
                    else if (typeof(o) == "string")
                        json += (name && ":") + "\"" + o.toString() + "\"";
                    else
                        json += (name && ":") + o.toString();
                    return json;
                },
                innerXml:function (node)
                {
                    var s = ""
                    if ("innerHTML" in node)
                        s = node.innerHTML;
                    else
                    {
                        var asXml = function (n)
                        {
                            var s = "";
                            if (n.nodeType == 1)
                            {
                                s += "<" + n.nodeName;
                                for (var i = 0; i < n.attributes.length; i++)
                                    s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
                                if (n.firstChild)
                                {
                                    s += ">";
                                    for (var c = n.firstChild; c; c = c.nextSibling)
                                        s += asXml(c);
                                    s += "</" + n.nodeName + ">";
                                }
                                else
                                    s += "/>";
                            }
                            else if (n.nodeType == 3)
                                s += n.nodeValue;
                            else if (n.nodeType == 4)
                                s += "<![CDATA[" + n.nodeValue + "]]>";
                            return s;
                        };
                        for (var c = node.firstChild; c; c = c.nextSibling)
                            s += asXml(c);
                    }
                    return s;
                },
                escape:function (txt)
                {
                    return txt.replace(/[\\]/g, "\\\\")
                        .replace(/[\"]/g, '\\"')
                        .replace(/[\n]/g, '\\n')
                        .replace(/[\r]/g, '\\r');
                },
                removeWhite:function (e)
                {
                    e.normalize();
                    for (var n = e.firstChild; n;)
                    {
                        if (n.nodeType == 3)
                        {  // text node
                            if (!n.nodeValue.match(/[^ \f\n\r\t\v]/))
                            { // pure whitespace text node
                                var nxt = n.nextSibling;
                                e.removeChild(n);
                                n = nxt;
                            }
                            else
                                n = n.nextSibling;
                        }
                        else if (n.nodeType == 1)
                        {  // element node
                            X.removeWhite(n);
                            n = n.nextSibling;
                        }
                        else                      // any other node
                            n = n.nextSibling;
                    }
                    return e;
                }
            };
            if (xml.nodeType == 9) // document node
                xml = xml.documentElement;
            var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
            return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
        }
    },
    {
        // Static class, so nothing required here
    }
);

h5c3.tools = new h5c3.Tools();
/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * Class:  h5c3.Loader
 * 
 * 
 * 
 * The Loader takes care of loading resources (downloading) and then notifying you when everything
 * is ready. The loader is a static class that will always be constructed by the engine and accessible through th
 * h5c3.loader member.
 * 
 * Using the loader you can load <a href='h5c3.Image'>h5c3.Image</a>'s, <a href='h5c3.DataResource'>h5c3.DataResources</a>'s,
 * and <a href='h5c3.Sound'>h5c3.Sound</a>'s.
 * 
 * Typically you use the loader from within your game class onReady method (called automatically by the engine).
 * 
 * TheGame = h5c3.Game.extend('TheGame',
 * {},
 * {
 *     onReady:function ()
 *     {
 *         this._super(); // call the base class' onReady
 *
 *         // disable caching when developing
 *         if (h5c3.devMode===true)
 *             h5c3.loader.setDisableCache();
 *
 *         // load up resources
 *         h5c3.loader.add(new h5c3.Image('spaceship', 'images/spaceship.png'));
 *
 *         // fire up the loader (with a callback once done)
 *         h5c3.loader.start(this.onLoading.bind(this), this.onLoaded.bind(this));
 *     },
 *
 *     onLoading:function (percentageComplete)
 *     {
 *         // display progress, such as a loading bar
 *     },
 *
 *     onLoaded:function ()
 *     {
 *         // we're ready; make the magic happen
 *     }
 * });
 * (end)
 * You can disable caching using setDisableCache. This is the default when in devMode (when the engine has not been
 * packed/minified.
 */

h5c3.Loader = h5c3.Base.extend('h5c3.Loader',
    {},
    /** Interface: h5c3.Loader.prototype */
    {
        State:{ QUEUED:0, LOADING:1, READY:2, FAILED:3 },

		timer:null,
		
        /** A hashtable of all the resources, keyed by the resource name */
        resources:new h5c3.Hashtable(),
        /** Function called after each new resource has been loaded */
        loadingListener:null,
        /** Function called after all resources have been loaded or errored */
        loadedListener:null,
        /** Progress of the loader (number of items loaded so far) */
        progress:0,
        /** Total number of resources to be loaded */
        totalBeingLoaded:0,
        /** Number of resources that had a problem */
        errored:0,
        /** Optional baseURI prepended to resource URI's */
        baseUrl:'',
		times: {
			start:0,	//when loader started
			end:0,		//when loader ended
			lapsed:0	//total time loading?
		},
        /**
         * True if loader.start() has been called. Typically resources use this to check
         * if they should just load immediately (after game start) or hold on loading until the loader calls (triggered
         * by loader.start()
         */
        started:false,
        /** True if the resource loader has finished loading everything */
        finished:true,

        _noCacheString:'',

        /**
         * Constructor -- typically called by the engine to automatically construct h5c3.loader.
         */
        init:function ()
        {
            this._super();
			$_DBG_('Loader timer started.');
			this.timer = new h5c3.AccuTimer(-1, .5, 
				function(steps,count,fps)
				{
				  h5c3.loader.start();
				},
				function() 
				{
					$_DBG_('Loader timer stopped.');
				}
			);
			
        },

        /**
         * Tells the resource loader to disable caching in the browser by modifying the resource src
         * by appending the current date/time
         */
        setDisableCache:function ()
        {
            this._noCacheString = '?nocache=' + Date.now();
        },

        /**
         * Sets a base URI to save you type. Applies to all resources added until the next setBaseURL is called.
         * Parameters:  String url URI to preprend
         */
        setBaseUrl:function (url)
        {
            this.baseUrl = url;
        },

        /**
         * Sets an optional listener
         * Parameters:  {Function} loadingListener Function to call when each resource is loaded
         * Parameters:  {Function} loadedListener Function to call when all resources have been loaded
         */
        setListener:function (loadingListener, loadedListener)
        {
            this.loadingListener = loadingListener;
            this.loadedListener = loadedListener;
        },

        /**
         * Used to dynamically load any file into the head of the document. Mainly used for including 
		 * Javascript or CSS files after the document has already loaded.
		 *
         * Parameters:  {Function} loadingListener Function to call when each resource is loaded
         * Parameters:  {Function} loadedListener Function to call when all resources have been loaded
         */
		loadFile:function (filename) {
		
			var fileref = null,
				ext = filename.substr(filename.lastIndexOf('.') + 1);
			
			if (ext === "js") { 
				//if filename is a external JavaScript file
				fileref=document.createElement('script');
				fileref.setAttribute("type","text/javascript");
				fileref.setAttribute("src", filename);
			} else if (ext === "css") { 
				//if filename is an external CSS file
				fileref=document.createElement("link");
				fileref.setAttribute("rel", "stylesheet");
				fileref.setAttribute("type", "text/css");
				fileref.setAttribute("href", filename);
			} else if (ext === "html") { 
				//if filename is an external HTML file
				fileref=document.createElement("applet");
				fileref.setAttribute("type", "text/html");
				fileref.setAttribute("href", filename);
			}
			if (fileref !== "undefined") {
				document.getElementsByTagName("head")[0].appendChild(fileref);
			}
		},
		
        /**
         * Add a resource to the loader queue
         * Parameters:  {h5c3.Image|h5c3.Sound|h5c3.DataResource} resource Resource to load
         */
        add:function (resource)
        {
            // resource.src already has the baseUrl set by the resource class (i.e. h5c3.Image)
            // so no need to add it here
            resource.name = resource.name.toLowerCase();
            this.resources.put(resource.name.toLowerCase(), { resource:resource, state:this.State.QUEUED });
			if (h5c3.devMode === true) { $_DBG_('Adding resource ' + resource.src + ' to the queue.');}
        },

        /**
         * Retrieve a resource from the loader
         * Parameters:  String name Name of the resource
         * Returns: {h5c3.Image|h5c3.Sound|h5c3.DataResource} Resource
         */
        get:function (name)
        {
			var res = this.resources.get(name.toLowerCase());
			
			if (!$VLD(res)) {
				this.error(this.uniqueId + 'Unable to get resource '+name+'. Did you forget to add it to the config?');
				res=null;
			}
			return res;
        },

        /**
         * Get all the sound resources
         * Returns: Array An array of all the sounds
         */
        getAllSounds:function ()
        {
            var sounds = [],
				keys = this.resources.keys(),
				i,res;

            for (i = 0; i < keys.length; i++)
            {
                res = this.resources.get(keys[i]).resource;
                if (res.Class.isA('h5c3.Sound')) {
                    sounds.push(res);
				}
            }
            return sounds;
        },

        /**
         * Get all the image resources
         * Returns: Array An array of all the images
         */
        getAllImages:function ()
        {
            var images = [],
				keys = this.resources.keys(),
				i,res;

            for (i = 0; i < keys.length; i++)
            {
                res = this.resources.get(keys[i]);
                if (res.isA('h5c3.Image')) {
                    images.push(res);
				}
            }

            return images;
        },

        /**
         * Starts the resource loader
         * Parameters:  {Function} loadingListener Function to call after each resource is loaded
         * Parameters:  {Function} loadedListener Function to call after all resources have been loaded or errored.
         */
        start:function (loadingListener, loadedListener)
        {
			if (this.started) return;
			this.started = true;
			this.times.start = new Date().getTime();
			var i,keys,res;
            this.setListener(loadingListener, loadedListener);

            this.progress = 0;
            this.errored = 0;

            // ask all of the resources to get busy loading
            keys = this.resources.keys();

            for (i = 0; i < keys.length; i++)
            {
                res = this.resources.get(keys[i]);
                if (res.state === this.State.QUEUED)
                {
                    res.resource.load(this._onLoad.bind(this), this._onError.bind(this));
                    res.state = this.State.LOADING;
                    this.totalBeingLoaded++;
                }
            }
			if (h5c3.devMode ) { $_DBG_('Loading ' + this.totalBeingLoaded + ' resource(s).');}
        },

        /**
         * Generates a URL using a src string (by prepending the baseURL and appending the optional no-cache string
         * Parameters:  String src Source URI
         * Returns: String A full resource URI
         */
        makeUrl:function (src)
        {
            return this.baseUrl + src + this._noCacheString;
        },

        /**
        * Andrew: 
        *    fixed minor bug where if you used uppercase characters in key name res would return null
        *    because it did not fins the key in the hashtable. Just displayed and error notice to console.
        */
        _onLoad:function (resource)
        {
            var res = this.resources.get(resource.name);
            if (!$VLD(res)) {
                this.error('Unable to get resource ['+resource.name+'] - Please make sure you are using all lowercase.');
            } else { 
                res.state = this.State.READY;
                this.progress++;

                if ($VLD(this.loadingListener)) {
                    this.loadingListener(Math.round((this.progress / this.totalBeingLoaded) * 100));
				}

				if (h5c3.devMode === true) { $_DBG_(resource.Class.shortName+' - '+ resource.name + ' loaded (' + Math.round((this.progress / this.totalBeingLoaded) * 100) + '% done)');}
            }
            this._checkAllDone();
        },

        _onError:function (resource)
        {
            var res = this.resources.get(resource.name);
            res.state = this.State.FAILED;
            this.progress++;
            this.errored++;

            if ($VLD(this.loadingListener)) {
                this.loadingListener(this.progress / this.totalBeingLoaded);
			}
            this.warn(resource.name + ' (' + resource.src + ') failed.');

            this._checkAllDone();
        },

        _checkAllDone:function ()
        {
            if (this.progress >= this.totalBeingLoaded)
            {
				this.times.end = new Date().getTime();
				this.times.lapsed = (this.times.start-this.times.end);
                this.finished = true;
				this.started = false;
				if ($VLD(this.loadedListener)) this.loadedListener(this.progress, this.errored);
				$_DBG_('Resource Loader idle.');
                this.progress = 0;
                this.errored = 0;
                this.totalBeingLoaded = 0;
            }

        }
    });

/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */
/**
 * Class:  h5c3.DataResource
 * 
 * A generic resource you can load data, such as JSON, XML or config files from a URL, just like an image or sound file.
 * 
 * To load a resource, use the h5c3.Loader to add a resource:
 * 
 * >	h5c3.loader.add(new h5c3.DataResource('level1', 'data/level1.tmx'));
 * 
 * Once you have the resource loaded you can access the contents of the resource using the data member:
 * 
 * >	var xmlData = h5c3.loader.get('level1').resource.data;
 * 
 * You can optionally provide a function to be called when the resource has finished loading or has an error.
 * 
 * (start code)
 * function onLevelDataLoaded(dataResource)
 * {
 *    // dataResource.data
 * }
 * h5c3.loader.add(new h5c3.DataResource('level1', 'data/level1.tmx', onLevelDataLoaded));
 * (end)
 */
h5c3.DataResource = h5c3.Base.extend('h5c3.DataResource',
{},
{
	/** Data resource that has been loaded */
	data:null,
	/** HTTP request object used to load the data */
	request:null,
	/** src URL */
	src:null,
	/** Short name for this resource */
	name: null,
	/** boolean indicating whether the resource has been loaded yet */
	loaded:false,
	/** current callback when the resource has been loaded */
	onLoadCallback:null,
	/** current callback if an error occurs whilst loading the resource */
	onErrorCallback:null,

	/**
	 * Constructor: init(name, src, onLoadCallback, onErrorCallback)
	 *
	 * Loads data from a remote (URI) resource.
	 *
	 * Parameters:  
	 *	String name Name to give the resource
	 * 	String src URI for the data
	 * 	Function 	onLoadCallback		Function to be called once the resource has been loaded
	 * 	Function 	onErrorCallback		Function to be called if the resource fails to load
	 *
	 * Returns:
	 * None
	 */
	init:function (name, src, onLoadCallback, onErrorCallback)
	{
		this._super();
		this.src = h5c3.loader.makeUrl(src);
		this.name = name;
		this.onLoadCallback = onLoadCallback;
		this.onErrorCallback = onErrorCallback;
		this.request = new XMLHttpRequest();
		this.request.onreadystatechange = this.onReadyStateChange.bind(this);
		this.request.onload = this.onReadyStateChange.bind(this);
		this.request.onloadend = this.onReadyStateChange.bind(this);
		this.load();
	},

	/**
	 * Method: load(onLoadCallback, onErrorCallback)
	 *
	 * Triggers an immediate load of the resource. Use only if you're manually loading a resource, otherwise
	 * the h5c3.Loader will automatically call load when it starts.
	 *
	 * Parameters:  
	 *	Function	onLoadCallback		Optional function called when the resource has finished loading
	 * 	Function	onErrorCallback		Optional function called if the resource fails to load
	 *
	 * Returns:
	 * None
	 */
	load:function (onLoadCallback, onErrorCallback)
	{
		this.onLoadCallback = onLoadCallback;
		this.onErrorCallback = onErrorCallback;

		try {
			this.request.open('get', this.src);
			this.request.send(null);
		} catch (err) {
		} finally {
		}
	},

    /**
	 * Method: reload()
	 *
	 * Force the reloading of a resource (by marking it not loaded and calling load
     * 
	 * Parameters:
	 * None
	 *
	 * Returns: 
	 * None
     */	
	reload:function ()
	{
		this.loaded = false;
		this.load();
	},

    /**
	 * Method: onReadyStateChange()
	 *
	 * Called when the resource is loaded/ready. Generally this is used internally, and you should use the
	 * onLoadCallback function optionally pass to the load method or constructor
     * 
	 * Parameters:
	 * None
	 *
	 * Returns: 
	 * None
     */	
	onReadyStateChange:function()
	{
		if (this.loaded) {
			return;
		}

		if (this.request.readyState === 4)
		{
			if (this.request.status === 200)
			{
				this.loaded = true;

				this.data = this.request.responseText;

				if (this.onLoadCallback) {
					this.onLoadCallback(this);
				}
			} else
			if (this.request.status === 404)
			{
				this.warn('resource ' + this.src + ' error ' + this.request.status);
				if (this.onErrorCallback) {
					this.onErrorCallback(this);
				}
			}
		}
	}
});

/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * Class:  h5c3.Math
 * 
 * 
 * 
 * A collection of math tools you can use. This is a static class, so you do not need to construct it, and all
 * methods/members are accessed using h5c3.Math.
 */
h5c3.Math = h5c3.Base('h5c3.Math',
    /** Interface: h5c3.Math */
    {
        /** Quick lookup to convert radians to degrees */
        RADIAN_TO_DEGREE:(180 / Math.PI),
        /** Quick lookup to convert degrees to radians */
        DEGREE_TO_RADIAN:(Math.PI / 180),
        /** Quick lookup for Math.PI */
        PI:Math.PI,

        /** Quick lookup for Math.round */
        round:Math.round,
        /** Quick lookup for Math.random */
        random:Math.random,
        /** Quick lookup for Math.floor */
        floor:Math.floor,

        /**
         * Find the square of a number
         * Parameters:  Number number The square of the number
         */
        sqr:function (number)
        {
            return number * number;
        },

        /**
         * Returns a random integer within the specified range. e.g. rand(10, 20) returns a value between 10 and 20.
         * If you need a float random use randFloat.
         * Parameters:  Number min the start of the range
         * Number max the end of the range
         * Returns:  Number A random number between (and including) the range
         */
        rand:function (min, max)
        {
            return h5c3.Math.round((h5c3.Math.random() * (max - min)) + min);
        },

        /**
         * Returns a random float within the specified range. e.g. rand(10, 20) returns a value between 10 and 20.
         * Parameters:  Number min the start of the range
         * Number max the end of the range
         * Returns:  Number A random number between (and including) the range
         */
        randFloat:function (min, max)
        {
            return (h5c3.Math.random() * (max - min)) + min;
        },

        /**
         * Rotates a given angle by an amount in degrees
         * Parameters:  
		 * Number angle Original angle
		 * Number by Amount to add in degrees (can be negative)
         * Returns: 
		 * Number A new angle, rotated by the amount given
         */
        rotate:function (angle, by)
        {
            var newDir = angle + by;
            while (newDir > 359) {
                newDir -= 360;
			}
            while (newDir < 0) {
                newDir = 360 + newDir;
			}
            return newDir;
        },

        /**
         * Calcuates the angle difference based on two angles and a direction (clockwise or counterclockwise)
         * Parameters:  
		 * Number angleA Starting angle in degrees
         * Number angleB Ending angle in degrees
         * Boolean clockwise True if the difference should be calculated in a clockwise direction
         * Returns: 
		 * Number Angle difference in degrees
         */
        angleDiff: function(angleA, angleB, clockwise)
        {
            if (!clockwise)
            {
                var diff = angleA - angleB;
                if (diff < 0) { diff += 360; }
                return diff;
            } else
            {
                if (angleB < angleA) // wrapping around 0/360
                    angleB += 360;
                return angleB - angleA;
            }
        },

        /**
         * Is the first angle closest by going clockwise of the second angle
         * Parameters:  
		 * Number angleA Angle to target
         * Number angleB Angle clockwise is relative to
         * Returns: 
		 * Boolean True if angle A is clockwise to angle B
         */
        isClockwise:function (angleA, angleB)
        {
            if (angleA > angleB)
                return (Math.abs(angleA - angleB)) < (angleB + (360 - angleA));
            else
                return (angleA + (360 - angleB)) < (Math.abs(angleB - angleA));
        },

        /**
         * Returns whether an angle is facing to the right from a side-scrolling 2d perspective
         * Parameters:
		 * Number angle Angle to test
         * Returns: 
		 * Boolean true is facing to the right, otherwise false (meaning it's facing left)
         */
        isFacingRight: function(angle)
        {
            if (angle > 270 || angle < 90) return true;
            return false;
        },

        /**
         * Converts radians to degrees
         * Parameters:  
		 * Number radians Radians
         * Returns: 
		 * Number Radians from degrees
         */
        radToDeg:function (radians)
        {
            return (radians * h5c3.Math.RADIAN_TO_DEGREE);
        },

        /**
         * Converts degrees to radains
         * Parameters:  
		 * Number degrees Degrees to convert
         * Returns: 
		 * Number Number of radians
         */
        degToRad:function (degrees)
        {
            return degrees * h5c3.Math.DEGREE_TO_RADIAN;
        },

        /**
         * Gives you the angle of a given vector x, y
         * Parameters:  
		 * Number x x component of the 2d vector
         * Number y y component of the 2d vector
         * Returns: 
		 * Angle in degrees
         */
        angleFromVector:function (x, y)
        {
            // angle to vector
            var a = h5c3.Math.radToDeg(Math.atan2(y, x));
            if (a < 0) a += 360;
            return a;
        },

        /**
         * Gives you the x, y vector of a given angle in degrees. This method creates a h5c3.Point which you should
         * release after use
         * Parameters:  
		 * Number angle Angle in degrees
         * Returns: 
		 * {h5c3.Point} A newly acquired h5c3.Point with the vector.
         */
        vectorFromAngle: function(angle)
        {
            var vx = Math.cos(h5c3.Math.degToRad(angle));
            var vy = Math.sin(h5c3.Math.degToRad(angle));
            return h5c3.Point.create(vx, vy);
        },

        /**
         * A fast check if a point is within a rectangle
         * Parameters:  
		 * Number x x-position of the point to test
         * Number y y-position of the point to test
         * Number rx x-position of the rectangle
         * Number ry y-position of the rectangle
         * Number rw width of the rectangle
         * Number rh height of the rectangle
         * Returns: 
		 * Boolean true is the point is within the rectangle
         */
        isPointInRect:function (x, y, rx, ry, rw, rh)
        {
            return x >= rx && x <= (rx + rw) &&
                y >= ry && y <= (ry + rh);
        },

        /**
         * Checks if one rectangle is completely contained in another
         * Parameters:  
		 * Number x x-position of the point to test
         * Number y y-position of the point to test
         * Number w height of the rectangle to test
         * Number h width of the rectangle to test
         * Number rx x-position of the rectangle
         * Number ry y-position of the rectangle
         * Number rw width of the rectangle
         * Number rh height of the rectangle
         * Returns: 
		 * Boolean true is the rectangle is fully within the other
         */
        isRectInRect:function (x, y, w, h, rx, ry, rw, rh)
        {
            if (!h5c3.Math.isPointInRect(x, y, rx, ry, rw, rh)) return false;
            if (!h5c3.Math.isPointInRect(x + w, y, rx, ry, rw, rh)) return false;
            if (!h5c3.Math.isPointInRect(x, y + h, rx, ry, rw, rh)) return false;
            return h5c3.Math.isPointInRect(x + w, y + h, rx, ry, rw, rh);
        },

        /**
         * Fast test if one rectangle is overlapping another at any point
         * Parameters:  
		 * Number x x-position of the point to test
         * Number y y-position of the point to test
         * Number w height of the rectangle to test
         * Number h width of the rectangle to test
         * Number rx x-position of the rectangle
         * Number ry y-position of the rectangle
         * Number rw width of the rectangle
         * Number rh height of the rectangle
         * Returns: Boolean true if the rectangle overlaps anywhere
         */
        isRectColliding:function (x, y, w, h, rx, ry, rw, rh)
        {
            return !(y + h < ry || y > ry + rh ||
                x + w < rx || x > rx + rw);
        },

        /**
         * Forces a given value to be within a range (lowest to highest)
         * Parameters:  Number v The value to check
         * Number lowest Lowest value it can be
         * Number highest Highest value it can be
         * Returns: Number Original value or the edge of the fence if needed
         */
        limit:function (v, lowest, highest)
        {
            if (v < lowest) return lowest;
            if (v > highest) return highest;
            return v;
        },

        /**
         * Same as limit, but allows an increment value as well (which can be negative)
         * Parameters:  Number v Original value
         * Number inc Amount to add (can be negative)
         * Number lowest Lowest value to fence
         * Number highest Highest value to fence
         * Returns: Number Value with inc added fenced by the lowest and highest limits
         */
        limitAdd:function (v, inc, lowest, highest)
        {
            if (v+inc < lowest) return lowest;
            if (v+inc > highest) return highest;
            return v+inc;
        }
    },
    {
        // No instance, since this is an all static class
    });


/**
 * Class:  h5c3.Rect
 * 
 * [Extends <a href='h5c3.Pooled'>h5c3.Pooled</a>]
 * 
 * Represents a rectangle.
 */
h5c3.Rect = h5c3.Pooled('h5c3.Rect',
    /** Interface: h5c3.Rect */
    {
        /**
         * Constructs a new rectangle
         * Parameters:  Number x x-position of the top left of the rectangle
         * Number y y-position of the top left of the rectangle
         * Number w width of the rectangle
         * Number h height of the rectangle
         * Returns: {h5c3.Rect} A new rectangle (acquired from the free object pool}
         */
        create:function (x, y, w, h)
        {
            var newDim = this._super();
            newDim.x = x;
            newDim.y = y;
            newDim.w = w;
            newDim.h = h;
            return newDim;
        }
    },
    /** Interface: h5c3.Rect.prototype */
    {
        /** x position of the top left of the rectangle */
        x:0,
        /** y position of the top left of the rectangle */
        y:0,
        /** width of the rectangle */
        w:0,
        /** height of the rectangle */
        h:0,

        /**
         * Checks if one rectangle is completely contained in another
         * Parameters:  Number x x-position of the point to test
         * Number y y-position of the point to test
         * Number w height of the rectangle to test
         * Number h width of the rectangle to test
         * Number rx x-position of the rectangle
         * Number ry y-position of the rectangle
         * Number rw width of the rectangle
         * Number rh height of the rectangle
         * Returns: 
		 * Boolean true is the rectangle is fully within the other
         */
        containsRect:function (x, y, w, h, rx, ry, rw, rh)
        {
            if (!h5c3.Math.isPointInRect(x, y, rx, ry, rw, rh)) return false;
            if (!h5c3.Math.isPointInRect(x + w, y, rx, ry, rw, rh)) return false;
            if (!h5c3.Math.isPointInRect(x, y + h, rx, ry, rw, rh)) return false;
            return h5c3.Math.isPointInRect(x + w, y + h, rx, ry, rw, rh);
        },

        /**
         * Checks if a point is within the rectangle
         * Parameters:  {h5c3.Point} p A h5c3.point (or any object with a .x and .y property
         * Returns: 
		 * Boolean true if the point is within the rectangle
         */
        containsPoint:function (p)
        {
            return p.x >= this.x && p.x <= (this.x + this.w) &&
                p.y >= this.y && p.y <= (this.y + this.h);
        },

        /**
         * Checks if this rectangle overlaps another (including rotation support)
         * Parameters:  Number rx x-position of the rectangle
         * Number ry y-position of the rectangle
         * Number rw width of the rectangle
         * Number rh height of the rectangle
         * Number dir Direction to rotate the angle to
         * Returns: Boolean true if the rectangle overlaps another
         */
        overlaps:function (rx, ry, rw, rh, dir)
        {
            var w = rw;
            var h = rh;

            if ($VLD(dir) && dir != 0)
            {
                // calculate using a rotated rectangle
                var s = Math.sin(h5c3.Math.degToRad(dir));
                var c = Math.cos(h5c3.Math.degToRad(dir));
                if (s < 0) s= -s;
                if (c < 0) c= -c;
                w = rh*s + rw*c; // width of AABB
                h = rh*c + rw*s; // height of AABB
            }
            return !(this.y + this.h < ry || this.y > ry + h ||
                this.x + this.w < rx || this.x > rx + w);
        },

        /**
         * Returns: String A nice string representation of the rectangle
         */
        toString:function ()
        {
            return this.x + ' x ' + this.y + ' by ' + this.w + ' x ' + this.h;
        }
    });

/**
 * Class:  h5c3.Point
 * 
 * [Extends <a href='h5c3.Pooled'>h5c3.Pooled</a>]
 * 
 * Represents a 2D point.
 */
h5c3.Point = h5c3.Pooled('h5c3.Point',
    /** Interface: h5c3.Point */
    {
        /**
         * Constructs a new point (from the pool)
         * Parameters:  Number x x position
         * Number y y position
         * Returns: 
		 * {h5c3.Point} A shiny new point
         */
        create:function (x, y)
        {
            var n = this._super();
            n.x = x;
            n.y = y;
            return n;
        }
    },
    /** Interface: h5c3.Point.prototype */
    {
        /** x position of the point */
        x:0,
        /** y position of the point */
        y:0,

        /**
         * Makes this point match another
         * Parameters:  
		 * {h5c3.Point} p The other point to match
         */
        match:function (p)
        {
            this.x = p.x;
            this.y = p.y;
        },

        /**
         * Makes this point match another
         * Parameters:  
		 * {h5c3.Point} p The other point to match
         */
        set: function(p)
        {
            this.match(p);
        },

        /**
         * Sets the x and y of the point
         * Parameters:  Number x x position to set
         * Number y y position to set
         * Returns: 
		 * {h5c3.Point} This point
         */
        setXY: function(x, y)
        {
            this.x = x;
            this.y = y;
            return this;
        },

        /**
         * Adds to the point
         * Parameters:  Number x Amount to add to x
         * Number y Amount to add to y
         * Returns: {h5c3.Point} This point
         */
        add: function(x, y)
        {
            this.x += x;
            this.y += y;
            return this;
        },

        /**
         * Subtracts from the point
         * Parameters:  Number x Amount to subtract from x
         * Number y Amount to subtract from y
         * Returns: {h5c3.Point} This point
         */
        subtract:function (x, y)
        {
            this.x -= x;
            this.y -= y;
            return this;
        },

        /**
         * Gives you the angle from this point to another
         * Parameters:  {h5c3.Point} p Another point
         * Returns: Number Facing direction (in degrees) from this point to another
         */
        dirTo:function (p)
        {
            var a = Math.abs(p.x - this.x);
            var b = Math.abs(p.y - this.y);
            if (a == 0) a = 1;
            if (b == 0) b = 1;

            var bovera = b / a;
            var angleInRadians = Math.atan(bovera);
            var angle = h5c3.Math.radToDeg(angleInRadians);

            if (p.x < this.x)
            {
                // left side
                if (p.y < this.y)
                    return angle + 180;
                return (90 - angle) + 90;
            } else
            {
                // right side
                if (p.y < this.y)
                    return (90 - angle) + 270;
                return angle;
            }
        },

        /**
         * Modifies the point by moving along at a projected angle (dir) by the distance
         * Parameters:  Number dir Direction to move, in degrees
         * Number distance Distance to move
         */
        moveInDir:function (dir, distance)
        {
            this.x += distance * Math.cos(h5c3.Math.degToRad(dir));
            this.y += distance * Math.sin(h5c3.Math.degToRad(dir));
            return this;
        },

        /**
         * Changes the from position by an amount of pixels in the direction of the to position
         * ultimately reaching that point
         * Parameters:  {h5c3.Point} to Ending position
         * Number distance Amount to move
         */
        moveTowards:function (to, distance)
        {
            this.moveInDir(this.dirTo(to), distance);
        },

        /**
         * Get the distance between this point and another
         * Parameters:  {h5c3.Point} p Another point
         * Returns: Number Distance between this point and another
         */
        distance:function (p)
        {
            return Math.sqrt((p.x - this.x) * (p.x - this.x) + (p.y - this.y) * (p.y - this.y));
        },

        /**
         * A nice string representing this point
         * Returns: String
         */
        toString:function ()
        {
            return this.x + 'x' + this.y;
        }
    });

h5c3.Poly = h5c3.Pooled('h5c3.Poly',
    /** Interface: h5c3.Poly */
    {
        create:function (x, y, points)
        {
            var n = this._super();
            n.x = x;
            n.y = y;
            n.points = points;
            return n;
        }
    },
    /** Interface: h5c3.Poly.prototype */
    {
        /** x position of the polygon */
        x:0,
        /** y position of the polygon */
        y:0,
        /** array of points representing the polygon (relative to x, y) */
        points:null,

        _boundingRect: null,

        init:function(x, y, points)
        {
            this.x = x;
            this.y = y;
            this.points = points;
            this._boundingRect = h5c3.Rect.create(0,0,0,0);
        },

        getBoundingRect:function()
        {

        }
    });


/**
 * Class:  h5c3.Dim
 * 
 * [Extends <a href='h5c3.Point'>h5c3.Point</a>]
 * 
 * Synonym for a point
 */
h5c3.Dim = h5c3.Point;

/**
 * Class:  h5c3.Vector
 * 
 * [Extends <a href='h5c3.Point'>h5c3.Point</a>]
 * 
 * Synonym for a point
 */
h5c3.Vector = h5c3.Point;



/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */

/**
 *  Engine
 *  H5C3 Framework
 *  Accurate self adjusting global timer
 * @usage 
 * //Run for 5 secs @ 10 FPS will fire trigger every 100ms
 * h5c3.AccuTimer(5000, 10, function($steps,$count,$fps)
 * {
 *   //Add code here for every interval
 * },
 * function()
 * {
 *    //Timer done, add cleanup code here 
 * });
 *
 * Parameters:  number $length time in milliseconds to run for
 * Parameters:  number $fps desired FPS, ie 60 $fps = 16.66ms interval
 * Parameters:  event on_instance called each interval
 * Parameters:  event oncomplete called when desired interval reached
 */
h5c3.AccuTimer = function($length, $fps, $oninterval, $ondone)
{
	//86,400,000 ms in a day
	if ($length <=0 ) {
		$length = 86400000;		//No $length? set default to 24hrs
	}
	if ($fps <=0 ) {
		$fps = 1;				//No resolution? set default 1 $fps
	}
	
    var $steps = (($length / 100) * ($fps / 10)),		//how many $steps/triggers?
        $speed = ($length / $steps),					//milliseconds between triggers
        $count = 0,									//reset $count
        $start = new Date().getTime();				//get current system time
    
	/**
	 * Create's and $starts a new timer
	 */	
	function _instance()
    {
        if ($count++ >= $steps)
        {
            $ondone($steps, $count);
        }
        else
        {
            $oninterval($steps, $count, $fps);
            var diff = ((new Date().getTime() - $start) - ($count * $speed));
            window.setTimeout(_instance, ($speed - diff));
        }
		
    }
    window.setTimeout(_instance, $speed);
};
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * Class:  h5c3.Hashmap
 * 
 * An implementation of a simple hashmap you can use to store key value pairs.
 * 
 * (start code)
 * // create a hashmap
 * var map = new h5c3.Hashmap();
 * map.put('key', 'value');
 * map.get('key') === 'value';
 * map.hasKey('key'); // true
 * map.remove('key');
 * (end)
 */
h5c3.Hashmap = h5c3.Base.extend('h5c3.Hashmap',
    {},
    {
        /* Property: 
		 * Number	number of items in the map 
		 */
        length: 0,
        /* Property: 
		 * Object	contains all the items as properties
		 */
        items: {},

        /* 
		 * Method: put(key,value)
		 *
         * Put a key, value pair into the map
		 *
		 * Parameters:
		 * 	String	key	
		 *	Mixed	Value
		 */
        put: function(key, value)
        {
            if (!$VLD(key)) { throw "invaid key"; }
            this.items[key] = value;
            this.length++;
        },

        /**
         * Get a value using a key
         * Parameters:  String key The key
         * Returns: Object Value mapped to the key
         */
        get: function(key)
        {
           return this.items[key];
        },

        /**
         * Indicates whether a key exists in the map
         * Parameters:  String key The key
         * Returns: Boolean True if the key exists in the map
         */
        hasKey: function(key)
        {
            return this.items.hasOwnProperty(key);
        },

        /**
         * Remove an element from the map using the supplied key
         * Parameters:  String key Key of the item to remove
         */
        remove: function(key)
        {
            if (this.hasKey(key))
            {
                this.length--;
                delete this.items[key];
            }
        },

        /**
         * Returns: Array Returns an array of all the keys in the map
         */
        keys: function()
        {
            var k, keys = [];
            for (k in this.items) {
                keys.push(k);
			}
            return keys;
        },

        /**
         * Returns: Array Returns an array of all the values in the map
         */
        values: function()
        {
            var k,values = [];
            for (k in this.items) {
                values.push(this.items[k]);
			}
            return values;
        },

        /**
         * Removes all items in the map
         */
        clear: function()
        {
            this.items = {};
            this.length = 0;
        }
    });

/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */

h5c3.systems = {};

/**
 * Class:  h5c3.systems.System
 * 
 * 
 * 
 * The base class for all systems. See the entity systems guide for more information on creating your own systems.
 */

h5c3.systems.System = h5c3.Base.extend('h5c3.System',
/** Interface: h5c3.systems.System */
{ },
/** Interface: h5c3.systems.System.prototype */
{
	/** layer this system is on */
	layer: null,
	/** array of string component types this system handles */
	componentTypes: null,
	/** reference to the systems system manager (read-only) */
	systemManager: null,
	/** optional delay for running this system, default is 0 (which means run every cycle) */
	delay: 0,

	_lastRun: 0,

	/**
	 * Constructs a new system
	 * Parameters:  Array componentTypes Array of strings representing the component types this system will handle
	 * Parameters:  Number delay Amount of time delay in ms between runs. i.e. systems that don't need to run every.
	 */
	init: function(componentTypes, delay)
	{
		this._super();
		this.delay = $CHK(delay, 0);
		if (!componentTypes instanceof Array)
			throw "Invalid component types array. Use a blank array ([]) if there are no components handled by the system.";
		this.componentTypes = componentTypes;
	},

	/**
	 * Called by the system manager to allow this system to take care of business. This default does nothing.
	 */
	processAll: function()
	{
	},

	/**
	 * Called by the system when the layer has changed size
	 */
	onResize: function()
	{
	},

	/**
	 * Called by the system when the origin changes
	 */
	onOriginChange: function(x, y)
	{
	},

	/**
	 * Called when this system instance is added to a layer
	 */
	onAddedToLayer: function(layer)
	{
	},

	/**
	 * Called when this system instance is removed from a layer
	 */
	onRemovedFromLayer:function (layer)
	{
	}
});

/**
 * Class:  h5c3.systems.EntitySystem
 * 
 * [Extends <a href='h5c3.Base'>h5c3.System</a>]
 * 
 * A system that processes entities.
 */
h5c3.systems.EntitySystem = h5c3.systems.System.extend('h5c3.systems.EntitySystem',
/** Interface: h5c3.systems.EntitySystem */
{},
/** Interface: h5c3.systems.EntitySystem.prototype */
{
	/** list of entities that are to be process by this system */
	entities: null,
	/** holding place for entities that are to be removed at the end of each cycle */
	suicides: null,

	/**
	 * Constructor for a system
	 * Parameters:  Array componentTypes An array of component types this system is interested in. Any entity with
	 * a component matching this type will be sent to this system for processing.
	 * Parameters:  Number delay Amount of time between cycles for this system (default = 0)
	 */
	init: function(componentTypes, delay)
	{
		this._super(componentTypes, delay);
		this.entities = new h5c3.LinkedList();
		this.suicides = new h5c3.LinkedList();
	},

	/**
	 * Adds an entity to this system, but only if the entity has a component type matching one of the types
	 * used by this system (this.componentTypes)
	 * Parameters:  {h5c3.Entity} entity Entity to add (if the entity's component type matches the systems
	 */
	addIfMatched: function(entity)
	{
		// checks the entity to see if it should be added to this system
		for (var i=0; i < this.componentTypes.length; i++)
			if (entity.hasComponentOfType(this.componentTypes[i]))
			{
				this.entities.add(entity);
				this.onEntityAdded(entity);
				return; // we only need to add an entity once
			}
	},

	/**
	 * Adds an entity to the system
	 * Parameters:  {h5c3.Entity} entity Entity to add
	 */
	add: function(entity)
	{
		if (this.entities.has(entity)) return; // already in the list
		this.entities.add(entity);
		this.onEntityAdded(entity);
	},

	/**
	 * Removes an entity from this system -- ignored if the entity isn't there
	 * Parameters:  {h5c3.Entity} entity Entity to remove
	 */
	remove: function(entity)
	{
		if (this.entities.remove(entity)) // return true if one was removed
			this.onEntityRemoved(entity);
	},

	/**
	 * Removes an entity from this system, but checks to see if it still matches first (has a component of
	 * the correct type). This is called by the entity manager when a component is removed
	 * Parameters:  {h5c3.Entity} entity Entity to remove
	 */
	removeIfNotMatched: function(entity)
	{
		// checks the entity to see if it should be added to this system
		for (var i=0; i < this.componentTypes.length; i++)
		{
			if (entity.hasComponentOfType(this.componentTypes[i]))
				return; // still matches, abort removing
		}

		// we got to here, so nothing matched, ok to remove the entity
		this.remove(entity);
	},

	/**
	 * Processes all entities. If you override this method, make sure you call this._super() to give the entity
	 * system a chance to process and clean up all entities.
	 */
	processAll: function()
	{
		var next = this.entities.first;
		while (next)
		{
			this.process(next.obj);
			next = next.next();
		}

		next = this.suicides.first;
		while (next)
		{
			this.remove(next.obj);
			next = next.next();
		}
		this.suicides.clear();

	},

	/**
	 * Override this in your system to handle updating of matching entities
	 * Parameters:  {h5c3.Entity} entity Entity to update
	 */
	process: function(entity) {},

	/**
	 * Adds the entity to the suicide list; it will be removed at the end of the cycle.
	 * Parameters:  entity
	 */
	suicide: function(entity)
	{
		this.suicides.add(entity);
	},

	/**
	 * Called when an entity has been added to this system
	 * Parameters:  {h5c3.Entity} entity Entity that was added
	 */
	onEntityAdded: function(entity) {},

	/**
	 * Called when an entity has been removed from this system
	 * Parameters:  {h5c3.Entity} entity Entity that was removed
	 */
	onEntityRemoved: function(entity) {},

	/**
	 * Called when a component is added to an entity
	 * Parameters:  {h5c3.Entity} entity Entity the component was added to
	 * Parameters:  {h5c3.components.Component} component Component that was added
	 */
	onComponentAdded: function(entity, component) {},

	/**
	 * Called when a component is removed from an entity
	 * Parameters:  {h5c3.Entity} entity Entity the component was removed from
	 * Parameters:  {h5c3.components.Component} component Component that was removed
	 */
	onComponentRemoved: function(entity, component) {}

});

h5c3.components = {};

/**
 * Class:  h5c3.components.Component
 * 
 * [Extends <a href='h5c3.Pooled'>h5c3.Pooled</a>]
 * 
 * The base class for components you want to create.
 */
h5c3.components.Component = h5c3.Pooled.extend('h5c3.components.Component',
/** Interface: h5c3.components.Component */
{
	/**
	 * Constructor that acquires the component from an object pool.
	 * Returns: {h5c3.components.Component} A component object
	 */
	create:function ()
	{
		var c = this._super();
		c.active = true;
		return  c;		
	}
},
/** Interface: h5c3.components.Component.prototype */
{
	/** entity I am on, or null if I'm not on an entity */
	_entity: null,

	_type:null,

	/**
	 * Constructs a new component using the given type string
	 * Parameters:  String type The type to assign the component
	 */
	init:function (type)
	{
		this._super();
		this._type = type;
	},

	/**
	 * Get the component type
	 * Returns: String The type
	 */
	getType:function ()
	{
		return this._type.toLowerCase();
	},

	/**
	 * Get the entity this component is currently in; null if not in an entity
	 * Returns: {h5c3.Entity} Entity
	 */
	getEntity: function()
	{
		return this._entity;
	},

	/**
	 * Called when the system is about to remove this component, which gives you a chance
	 * to override and do something about it
	 */
	onBeforeRemoved:function ()
	{
	}


});

/**
 * Class:  h5c3.SystemManager
 * 
 * 
 * 
 * Manages systems that are within a layer.
 *
 * Unless you are building your own systems in a complex way, you should be using the h5c3.EntityLayer to handle
 * general system management.
 */
h5c3.SystemManager = h5c3.Base.extend('h5c3.SystemManager',
/** Interface: h5c3.SystemManager */
{},
/** Interface: h5c3.SystemManager.prototype */
{
	/** h5c3.LinkedList of systems */
	systems:null,
	/** Index of the systems by component type */
	systemsByComponentType:null,
	/** layer the system is on */
	layer:null,

	/**
	 * Constructs a system manager.
	 */
	init:function (layer)
	{
		this.systems = new h5c3.LinkedList();
		this.systemsByComponentType = new h5c3.Hashtable();
		this.layer = layer;
	},

	/**
	 * Adds a system to the system manager
	 * Parameters:  {h5c3.systems.System} system System to add
	 */
	add:function (system)
	{
		system.layer = this.layer;
		system.systemManager = this;

		this.systems.add(system);

		if (!$VLD(system.componentTypes))
			throw 'systemmanager.js::add() - Invalid component types: it can be empty, but not undefined. Did you forget to ' +
				'add an init method to your system and/or not call this._super(componentTypes)';

		for (var i = 0; i < system.componentTypes.length; i++)
		{
			var ctype = system.componentTypes[i].toLowerCase();

			var list = this.systemsByComponentType.get(ctype);
			if (list == null)
			{
				// create a new linked list for systems matching this component type
				list = new h5c3.LinkedList();
				this.systemsByComponentType.put(ctype, list);
			}

			// add this system to the component type map, but only if it hasn't been added already
			if (!list.has(system))
				list.add(system);
		}

		// add all the entities to this system
		var entity = this.layer.entityManager.entities.first;
		while (entity)
		{
			this._handleEntityAdded(entity.object());
			entity = entity.next();
		}

		system.onAddedToLayer(this.layer);
	},

	/**
	 * Removes a system from the system manager
	 * Parameters:  {h5c3.systems.System} system System to remove
	 */
	remove:function (system)
	{
		system.onRemovedFromLayer(system.layer);
		this.systems.remove(system);

		for (var i = 0; i < system.componentTypes; i++)
		{
			var list = this.systemsByComponentType.get(system.componentTypes[i].toLowerCase());
			assert(list != null, "Oops, trying to remove a system and it's not in the by type list");

			system.systemManager = null;
			list.remove(system);
		}
	},

	/**
	 * Gets systems based on a component type
	 * Parameters:  String componentType Component type
	 * Returns: {h5c3.LinkedList} A linked list of the systems that have the given component type
	 */
	getByComponentType:function (componentType)
	{
		return this.systemsByComponentType.get(componentType);
	},

	/**
	 * Called when the origin of the layer changes
	 * Parameters:  Number x x-position of the origin
	 * Parameters:  Number y y-position of the origin
	 */
	onOriginChange:function (x, y)
	{
		var system = this.systems.first;
		while (system)
		{
			system.object().onOriginChange(x, y);
			system = system.next();
		}
	},

	_handleEntityAdded:function (entity)
	{
		// grab a list of all the component types from the entity
		var componentTypes = entity.getComponentTypes();
		for (var i = 0; i < componentTypes.length; i++)
		{
			// for every type, grab all the systems that use this type and add this entity
			var systems = this.systemsByComponentType.get(componentTypes[i].toLowerCase());
			if (systems)
			{
				var next = systems.first;
				while (next)
				{
					// add will check to make sure this entity isn't in there already
					next.obj.add(entity);
					next = next.next();
				}
			}
		}
	},

	_handleEntityRemoved:function (entity)
	{
		// grab a list of all the component types from the entity
		var componentMap = entity.getAllComponents();
		if (componentMap == null) return;
		var componentTypes = componentMap.keys();

		for (var i = 0; i < componentTypes.length; i++)
		{
			// for every type, grab all the systems that use this type and add this entity
			var systems = this.systemsByComponentType.get(componentTypes[i].toLowerCase());
			if (systems)
			{
				var next = systems.first;
				while (next)
				{
					// just a plain removal, since this entity is going entirely
					next.obj.remove(entity);
					next = next.next();
				}
			}
		}
	},

	_handleComponentAdded:function (entity, component)
	{
		// get a list of all the systems that are processing components of this type
		// then ask that system to add this entity, if it's not already there
		var list = this.systemsByComponentType.get(component.getType());
		if (list == null)
		{
			// this.warn('Entity (' + entity.toString() + ' added component ' + component + ' but no system is ' +
			//    ' handling components of type: ' + component.getType() +'. Did you forget to add a system' +
			//    ' to the system manager (and was it added to the same layer as this entity)?');
			return;
		}

		// todo: the systemsByComponentType map doesn't work well if systems support
		// multiple components; need to take a fresh look at that if multiple component types
		// support is added to systems (probably change the systemsByComponentType map support combinations
		// of components as a compound key (which map to a set of matching systems with no duplicates
		var next = list.first;
		while (next)
		{
			next.obj.add(entity);
			next.obj.onComponentAdded(entity, component);
			next = next.next();
		}
	},

	_handleComponentRemoved:function (entity, component)
	{
		// get a list of all the systems that are processing components of a given type
		var list = this.systemsByComponentType.get(component.getType());
		if (list == null) return;

		var next = list.first;
		while (next)
		{
			// then ask that system to remove this entity, but be careful that it no longer matches
			// another type might still apply to a given system
			next.obj.removeIfNotMatched(entity);
			next.obj.onComponentRemoved(entity, component);
			next = next.next();
		}

	},

	/**
	 * Process all the systems
	 */
	processAll:function ()
	{
		var next = this.systems.first;
		while (next)
		{
			if (next.obj.delay == 0 || (h5c3.device.now - next.obj._lastRun > next.obj.delay))
			{
				next.obj.processAll();
				if (next.obj.delay != 0)
					next.obj._lastRun = h5c3.device.now;
			}
			next = next.next();
		}
	},

	/**
	 * Called when the layer resizes
	 * Parameters:  Number width Width of the layer
	 * Parameters:  Number height Height of the layer
	 */
	onResize:function (width, height)
	{
		var next = this.systems.first;
		while (next)
		{
			next.obj.onResize(width, height);
			next = next.next();
		}
	}



});

/**
 * Class:  h5c3.EntityManager
 * 
 * 
 * 
 * Manages entities in a layer. This is the primary entity manager for the entity system. It contains, indexes and
 * handles the lifecycle of all entities.
 *
 * Unless you are building your own systems in a complex way, you should be using the h5c3.EntityLayer to handle
 * general entity management.
 */
h5c3.EntityManager = h5c3.Base.extend('h5c3.EntityManager',
/** Interface: h5c3.EntityManager */
{},
/** Interface: h5c3.EntityManager.prototype */
{
	/** Index of all entities by tag */
	entitiesByTag: null,
	/** All the components indexed by entityID (as a linked list) */
	componentsByEntity: null,
	/** All the components, indexed by entityId and componentType (catted) */
	componentsByEntityPlusType: null,

	/** Linked list of all entities */
	entities: null,
	/** entities to be removed at the end of processing */
	entitySuicides: null,
	/** the layer this entitymanager is within (set by the layer class) */
	layer: null,

	/**
	 * Constructs a new entity manager
	 * Parameters:  {h5c3.EntityLayer} layer The entity layer this entity manager is doing work for
	 */
	init: function(layer)
	{
		this.layer = layer;
		this.entitiesByTag = new h5c3.HashList();
		this.entities = new h5c3.LinkedList();
		this.componentsByEntity = new h5c3.Hashmap();
		this.componentsByEntityPlusType = new h5c3.Hashmap();
		this.entitySuicides = new h5c3.LinkedList();
	},

	/**
	 * Called by the core game loop to give the manager a chance to cleanup
	 */
	cleanup: function()
	{
		var entity = this.entitySuicides.first;
		while (entity)
		{
			this._doRemoveEntity(entity.object());
			entity = entity.next();
		}

		this.entitySuicides.clear();
	},

	/**
	 * Adds an entity to the manager
	 * Parameters:  {h5c3.Entity} entity Entity to add
	 * Parameters:  String [tag] A convenient way to add an entity and tag at the same time
	 */
	add: function(entity, tag)
	{
		// add the entity to our big global map
		this.entities.add(entity);
		if (tag != undefined)
			this.entitiesByTag.add(tag, entity);

		// add this entity to the component type indexes
		var componentMap = entity.getAllComponents();
		if (componentMap != null)
		{
			var components = componentMap.values();
			for (var i=0; i < components.length; i++)
				this._addToComponentMap(entity, components[i]);
		}

		// let the system manager take care of business
		this.layer.systemManager._handleEntityAdded(entity);
	},

	/**
	 * Removes an entity from the manager
	 * Parameters:  {h5c3.Entity} entity Entity to remove
	 */
	remove: function(entity)
	{
		if (!this.entitySuicides.has(entity))
		{
			this.entitySuicides.add(entity);
			entity.active = false;
		}
	},

	/**
	 * Removes a component from an entity, and releases it back to the pool
	 * Parameters:  {h5c3.Entity} entity Entity to remove the component from
	 * Parameters:  {h5c3.components.Component} component Component to remove
	 */
	removeComponent: function(entity, component)
	{
		this._removeFromComponentMap(entity, component);
		this.layer.systemManager._handleComponentRemoved(entity, component);
		entity._handleComponentRemoved(component);
		component._entity = null;
	},

	/**
	 * Adds a tag to an entity
	 * Parameters:  {h5c3.Entity} entity Entity to add the tag to
	 * Parameters:  String tag Tag to assign to the entity
	 */
	addTag: function(entity, tag)
	{
		if (entity.tags.indexOf(tag.toLowerCase()) != -1) return;

		this.entitiesByTag.add(tag.toLowerCase(), entity);
		entity.tags.push(tag.toLowerCase());
	},

	/**
	 * Removes a tag from an entity
	 * Parameters:  {h5c3.Entity} entity Entity to remove the tag from
	 * Parameters:  String tag Tag to remove
	 */
	removeTag: function(entity, tag)
	{
		this.entitiesByTag.remove(tag.toLowerCase(), entity);
		entity.tags.remove(tag.toLowerCase());
	},

	/**
	 * Gets all the entities that have a given tag
	 * Parameters:  String tag Tag to match
	 * Returns: {h5c3.LinkedList} List of entities
	 */
	getTagged: function(tag)
	{
		return this.entitiesByTag.get(tag.toLowerCase());
	},

	/**
	 * Makes an entity active (processed by systems).
	 * Parameters:  entity {h5c3.Entity} Entity to make active
	 */
	activate: function(entity)
	{
		if (entity.active) return;

		this.layer.systemManager._handleEntityAdded(entity);
		entity.active = true;
	},

	/**
	 * Makes an entity inactive (no longer processed)
	 * Parameters:  {h5c3.Entity} entity Entity to deactivate
	 */
	deactivate: function(entity)
	{
		if (!entity.active) return;

		// remove from the systems - we still keep it in the entitymanager lists, but remove it
		// from the systems so it wont be processed anymore
		this.layer.systemManager._handleEntityRemoved(entity);

		// mark as inactive
		entity.active = false;
	},

	_doRemoveEntity: function(entity)
	{
		this.entities.remove(entity);
		var componentMap = entity.getAllComponents();
		if (componentMap != null)
		{
			var components = componentMap.values();
			for (var i=0; i < components.length; i++)
				this._removeFromComponentMap(entity, components[i]);
		}

		// remove entities from any tag map it exists in
		for (var t=0; t < entity.tags.length; t++)
			this.entitiesByTag.remove(entity.tags[t], entity);

		this.layer.systemManager._handleEntityRemoved(entity);

		entity.release();
	},

	/**
	 * Add a component to an entity
	 * Parameters:  {h5c3.Entity} entity Entity to add the component to
	 * Parameters:  {h5c3.components.Component} component Component to add
	 * Returns: {h5c3.components.Component} Component that was added (for convience)
	 */
	addComponent: function(entity, component)
	{
		// make sure this entity is in the correct component maps
		this._addToComponentMap(entity, component);
		entity._handleComponentAdded(component);
		this.layer.systemManager._handleComponentAdded(entity, component);
		component._entity = entity;
		return component;
	},

	/**
	 * Get a component of a given class from an entity
	 * Parameters:  {h5c3.Entity} entity Entity that has the component you're looking for
	 * Parameters:  String componentType Class of component to get (e.g. h5c3.component.Position)
	 */
	getComponent: function(entity, componentType)
	{
		return this.componentsByEntityPlusType.get(entity.objectId + ':' + componentType);
	},

	/**
	 * Gets the components in an entity
	 * Parameters:  {h5c3.Entity} entity Entity you want the components of
	 * Returns: {h5c3.Hashtable} Hashtable of components keyed by component type
	 */
	getComponents: function(entity)
	{
		return this.componentsByEntity.get(entity.objectId);
	},

	/**
	 * Checks if a given entity contains a component of a given type
	 * Parameters:  {h5c3.Entity} entity Entity to check
	 * Parameters:  String componentType Type to check for
	 */
	hasComponentOfType: function(entity, componentType)
	{
		return this.componentsByEntityPlusType.containsKey(entity.objectId + ':' + componentType);
	},

	//
	// INTERNALS
	//
	_addToComponentMap: function(entity, component)
	{
		// Seeing a getType error here? Likely, you didn't call .create on your component? just maybe? hint hint
		if (this.componentsByEntityPlusType.get(entity.objectId + ':' + component.getType()))
		{
			// multiple components of the same type are not supported due to performance reasons
			throw ('entitymanager.js::_addToComponentMap() - adding component ' + component.getType() +
				' to entity ' + entity + ' when it already has one of that type');
		}
		this.componentsByEntityPlusType.put(entity.objectId + ':' + component.getType(), component);
		// seeing a getType error above? -- you forgot to use .create when constructing the component
		this.componentsByEntity.put(entity.objectId, component);
	},

	_removeFromComponentMap: function(entity, component)
	{
		// need to handle removing an entity that has attachments, remove the attached entities as well
		component.onBeforeRemoved();

		this.componentsByEntityPlusType.remove(entity.objectId + ':' + component.getType());
		this.componentsByEntity.remove(entity.objectId);
		component.release();
	}
});

/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 *  H5C3 Framework
 *  Plugin
 * Class:  h5c3.Plugin
 *  h5c3.Plugin
 * 
 * Base class for all plugins 
 */
h5c3.Plugin = h5c3.Base.extend('h5c3.Plugin',
{},
{
	/**
	 * Property: String NAME Friendly name for plugidn, may have spaces
	 */
	NAME:	'Plugin',
	/**
	 * Property: String VERSION Holds the current version of the plugin
	 */
	VERSION:	'0.1.0',
	/**
	 * Property: String DESCRIPTION Short description of what this plugin does.
	 */
	DESCRIPTION:	'Base class for all plugins.', 
	/** Folder where files are located */
	srcDir: 'js/',
	/** Plugins required by this plugin */
	requires:[],
	/** List of files that makeup this plugin */
	uses: [],
	
	/**
	* Initializtion method for plugin
	 * 
	 * myPlugin = new SomePlugin({arg1:false,arg2:'String',arg3:1243});
	 * (end)
	*
	* Parameters:  Object args arguments for this plugin
	*/	
	init:function(args) 
	{
		this._super();
		if (typeof args === "object") {
			this.property = args;
		}
		$_DBG_('init()');
		this._load();
	},
	
	_load:function() 
	{
		$_DBG_('h5c3._load',0,'Loading Plugin '+this.NAME+' v'+this.VERSION);
		if ($VLD(this.uses) && this.uses.length>0) {
			var $i=0;
			for ($i=0; $i < $this.uses.length; $i++) {
				this.add($scripts[$i]);
			}
		} else {
			$_DBG_('h5c3._load',0,'No external files used by plugin.');
		}
		$_DBG_('h5c3._load',0,'Completed.');
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
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/*******************************************************************************************
 * Enumeration: h5c3.SCREEN_CELLS
 *
 * Class used to provide better access and easy scaling/placement of entitys using Layout
 * (start code)
 *  GRIDX1:		0x0000, 	0000000 - The screen is the cell
 *  GRIDX2:		0x0001, 	0000001 - The screen is broke up into 2x2 cells
 *  GRIDX3:		0x0002, 	0000010 - The screen is broke up into 3x3 cells
 *  GRIDX4:		0x0004, 	0000100 - The screen is broke up into 4x4 cells
 *  GRIDX5:		0x0008  	0001000 - The screen is broke up into 5x5 cells
 * (end)
 *
 *******************************************************************************************/	
h5c3.SCREEN_CELLS =
{
    GRIDX1:		0x0000, // 0000000 - The screen is the cell
    GRIDX2:		0x0001, // 0000001 - The screen is broke up into 2x2 cells
    GRIDX3:		0x0002, // 0000010 - The screen is broke up into 3x3 cells
    GRIDX4:		0x0004, // 0000100 - The screen is broke up into 4x4 cells
    GRIDX5:		0x0008  // 0001000 - The screen is broke up into 5x5 cells
};

/**
 * Class:  h5c3.Device
 * 
 * h5c3.Device is the primary interface between your game and the underlying hardware. It's a singleton instance
 * that will be constructed automatically and is globally accessible at all times as h5c3.device
 * 
 * h5c3.device will automatically be setup once h5c3.JSLoader has completed loading all required javascipt through a call
 * to h5c3.device.boot passing in the Id of the canvas element for your game as well as the name of the game class
 * which h5c3.device will then dynamically construct. Typically you do not need to construct your own h5c3.Device, h5c3.start
 * will take care of it for you.
 */
h5c3.Device = h5c3.Base.extend('h5c3.Device',
    { },
    {	
		/** Property: device		Game core device object */
		device:gamecore.Device,					
		
		/** Property: media			object- browser information */
		media:gamecore.Media,					
        
		/** Property: page			h5c3.Page page object */
		page:null,								
        
		/** Property: loader		primary resource loader */
		loader:null,							
        
		/** h5c3.Input handler global instance */
		input:null,								
		
		/** Holds a AccuTimer object used for input timing. Default is 6 FPS */
		inputTimer:null,						
		
		/** Holds a AccuTimer object used for process timing. Default is 30 FPS */
		processTimer:null,						
        
		/** used to provide a DOM XML parser */
		xmlParser:null,							
		
		/** hold the state of the application resources **/
		resourcesLoaded:false,					
        
		/** TRUE if the engine is initialized. Different than running */
		started:false,							
        
		/** whether the device is running */
		running:true,							
        
		/** current requested or desired frame rate. */
		fps:30,
        
		/** last render frame rate */
		currentFPS:0,
		
		/** Contains the current average FPS */
		averageFPS:0,							
		
		/** used by render() to calulate the average FPS */		
		totalFPS:0,								
		
		/** used by render() to calulate the average FPS */
		frameCount:0,							
        
		/** used to hold the total number of milliseconds between animation frames */
		tick:0,									
        
		/** Used to define if we are using  pooling or not */
		enablePooling:true,						
        
		/** whether sound is enabled */
		soundEnabled:true,						
        
		/** number of elements drawn in the last render */
		elementsDrawn:0,						
        
		/** how long in ms the last process render took */
		lastProcessMS:0,						
        
		/** how long in ms the last draw render took */
		lastDrawMS:0,							
        
		/** amount of time the last render took in ms */
		elapsed:0,								
        
		/** time the last frame render was started */
		lastFrame:0,							
        
		/** the time now */
		now:Date.now(),							
        
		/** Used by render method for timing */
        startTime:0,							
        
		/** h5c3.Rect of the current screen dimensions */
		screen:null,							
		
		/** pixel ratio of the screen -- typically 1 unless on a retina display where it's 2 */
		pixelRatio:gamecore.Device.pixelRatio,	
        
		/** is this device an iPhone */
		isiPhone:gamecore.Device.isiPhone,		
		
		/** is this device an iPhone 4 */
		isiPhone4:gamecore.Device.isiPhone4,	
        
		/** is this device an iPad*/
		isiPad:gamecore.Device.isiPad,			
        
		/** is this device an Android*/
		isAndroid:gamecore.Device.isAndroid,	
        
		/** is this a touch device */
		isTouch:gamecore.Device.isTouch,		
		
		/** Is touchpad enbale or not? */
		useTouch:gamecore.Device.useTouch,		
        
		/** is this an ios device */
		isiOS: gamecore.Device.isiOS,			
        
		/** is this an iPod device */
		isiPod: gamecore.Device.isiPod,			
        
		/** whether the debug panel should be updated/drawn */
		showDebug:h5c3.devMode,					
        
		/** whether the game is running in development mode; false = production */
		devMode: h5c3.devMode,					
		
		/** Used by layout for determining how many region cells to break canvas into */
		gameScreenCells:1,						

		/**
		 * Constructor: init()
		 *
		 * Parameters:
		 * None
		 *
		 * Returns: 
		 * None
		 */	
		init:function() {
			this._super();
			$_DBG_('Initialization started.');
            //this.loader = new h5c3.Loader();
			this.loader = h5c3.loader;
            this.input = new h5c3.Input();
		},
		
		/**
		 * Method: boot()
		 *
         * Setup the system interface for the game. Typically this will just be automatically called
         * by the game object and you don't need to worry about it.
		 * 
		 * Parameters:
		 * None
		 *
		 * Returns: 
		 * None
		 */	
        boot:function ()
        {
			$_DBG_('boot initiated.');
			this.page = new h5c3.Page(this,'H5C3 Unanamed App');
			this.game = this.page.game; //Simple helper / shorten
            this.tick = 1000 / this.fps;
			this.requestAnimFrame = gamecore.Device.requestAnimFrame;
            this.onReady();
			$_DBG_('boot complete.');
        }, //end boot()
						
		/**
		 * Method: initLayout()
		 *
		 * Initialize the default layout to a 1x1 grid
		 * 
		 * Parameters:
		 * None
		 *
		 * Returns: 
		 * None
		 */	
		initLayout:function() 
		{
			this.layout = {
				cells: h5c3.SCREEN_CELLS.GRIDX1
			};
		}, //end initLayout()
				
        /**
         */
		/**
		 * Method: _()
		 *
         * Indicates whether a sound format is playable on the current device
		 *
         * Parameters:  
		 *	String 	format 	Sound format to test: 'mp3', 'ogg' or 'wav'
		 *
         * Returns: 
		 *	Boolean		True is the format can be played
		 */	        canPlay: function(format)
        {
            return gamecore.Device.canPlay(format);
        }, //end canPlay()
				
		/**
		 * Event: onReady()
		 *
         * Automatically called once the device is ready
		 */	
        onReady:function ()
        {
			$_DBG_('onReady Called.');
            if (this.started) { return; }// check we haven't already started
            //this.onResize();
            this.page.onReady();
            this.input._onReady();
			/** Everything is loaded and ready at this point **/
            this.lastFrame = Date.now();
            // start the central game timer
			window.requestAnimationFrame(this.render.bind(this));
			this.handleTimers(true);
            this.started = true;
        }, //end onReady()
			
		/**
		 * Event: onExit()
		 *
         * Automatically called once the device is exiting
		 */	
		onExit:function () 
		{
			this.handleTimers(false);				//Turn off Timers
			window.cancelAnimationFrame(true);		//Cancel Animation frame binding
			$_DBG_('Animation frame binding canceled.');
		},
		
		/**
		 * Method: handleTimers()
		 *
		 * The engine uses timers to monitor and adjust timing on Rendering and Input. This method sets up and starts the timers.
		 * 
		 * Parameters:
		 * Boolean	State	Start/Stop timers
		 *
		 * Returns: 
		 * None
		 */	
		handleTimers:function(state) 
		{
			if (state===true) {
				$_DBG_('Loader timer started.');
				this.inputTimer = new h5c3.AccuTimer(0, 6, 
					function(steps,count,fps)
					{
					  h5c3.device.input.process();
					},
					function() 
					{
						h5c3.device.log('Loader Timer terminated.');
					}
				);

				//The processes run @ 30FPS - Seperate from the Rendering
				this.processTimer = new h5c3.AccuTimer(0, 30, 
					function(steps,count,fps)
					{
						h5c3.device.running = !h5c3.device.page.game.obj.process();
					},
					function() 
					{
						h5c3.device.log('Process Timer terminated.');
					}
				);
			} else {
				$_DBG_('Stop all timers.');
				this.inputTimer = null;
				this.processTimer = null;
			}
		},
		
		/**
		 * Method: render()
		 *
         * Called once per game cycle
		 * 
		 * Parameters:
		 * Number	time	system time in ms
		 *
		 * Returns: 
		 * None
		 */	
        render:function (time)
        {
            if (this.running !== false)
            {
				try {
					this.now = this.startTime = Date.now();
					this.elapsed = this.now - this.lastFrame;
					this.lastDrawMS = 0;
					this.elementsDrawn = 0;
					this.currentFPS = 1000.0 / this.elapsed;
					this.totalFPS = this.totalFPS +this.currentFPS;
					this.frameCount++;
					this.lastProcessMS = (Date.now() - this.startTime) - this.lastDrawMS;
					this.lastFrame = this.now;
					this.page.render();
					window.requestAnimationFrame(this.render.bind(this));
				} catch (err) {
					$_DBG_('device::render() - '+err);
				}
            } else {
				//We are exiting the game
				
			}
        }, //end render()

        /**
		 * Method:: isOnScreen(x, y, w, h)
		 *
         * Test whether a given rectangle overlaps any part of the device screen
		 *
         * Parameters:  
		 *	Number 	x 	x position of the top left of the rectangle to test
         * 	Number 	y 	y position of the top left of the rectangle to test
         * 	Number 	w 	width of the rectangle
         * 	Number 	h 	height of the rectangle
         * Returns: 
		 *	Boolean 	true is it's on screen
         */
        isOnScreen:function (x, y, w, h)
        {
            return h5c3.Math.isRectColliding(x, y, w, h, 0, 0, this.game.dim.w, this.game.dim.h);
        } //end isOnScreen()						
    });
	/*global h5c3: true, document: true, navigator: true, window: true */
/**
 *  H5C3 Framework
 *  Engine
 * Class:  h5c3.components.Activator
 * 
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Activation'>h5c3.systems.Activation</a>]
 * 
 * Causes an entity to be inactive (no rendering or physics etc) until another entity moves within range of it.
 * Great for autosleeping all your monsters until the player gets close.
 */
h5c3.Banners = h5c3.Base.extend('h5c3.Banners',
{},
{	
	div:null,
	
	init:function(div)
	{
		this._super();
		this.div = div;
	},
	
	onReady:function()
	{
		$_DBG_('onReady Event.');
		//if (h5c3.devMode===true) {
		//	/** We are in debug mode, so dont display banners, show Debugger Toolbar instead **/
		//	this.div.innerHTML = h5c3.device.page.devWindow.bannerToolbar();
		//} else {
		//	/** We are in production mode, display banners **/			
		//}
	}
});
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */

/**
 *  Engine
 *  H5C3 Framework
 *  Engine
 * Class:  h5c3.Main
 *  h5c3.Base
 * 
 * 
 * 
 * h5c3.Main is the primary base class for creating a game and drives resources, core processing (cycling) your
 * game, and serves as a placeholder for scenes.
 * <h5>Basic Usage</h5>
 * 
 * Typically a h5c3.Main is constructed by the h5c3.start method call made from within your games index.html:
 * 
 * &ltscript&gt
 *    // h5c3.start will construct an instance of TheGame once the device (browser) is ready
 *    h5c3.start('waCANVAS', 'TheGame', '/mygame/js/', ['mygame.js']);
 * &lt/script&gt
 * (end)
 * When the h5c3.start system has finished preparing everything, it will dynamically construct an instance of
 * the class parameter (in the above example 'TheGame'). You can always gain access to the game from the global
 * h5c3.device:
 * 
 * var myGame = this;
 * (end)
 * 
 * To create a h5c3.Main, extend it and override what you need:
 * 
 * TheGame = h5c3.Main.extend('TheGame',
 * {},
 * {
 *     // onReady is called when the browser DOM is ready
 *     onReady:function ()
 *     {
 *         this._super();
 *
 *         // load resources
 *         // declare a base URL; saves you typing
 *         h5c3.loader.setBaseUrl('images/');
 *
 *         // add an image to the resource loader's queue
 *         h5c3.loader.add(new h5c3.Image('player-ship', 'ship1.png'));
 *
 *         // start the resource loader
 *         h5c3.loader.start(this.onLoading.bind(this), this.onLoaded.bind(this));
 *     },
 *
 *     onLoading:function (percentageComplete)
 *     {
 *         // draw title screen -- with loading bar
 *     }
 *
 * });
 * (end)
 * See the h5c3.Loader for more information on using the resource loader and the onLoading/onLoaded callbacks.
 * 

 * <h5>Pause/Resume</h5>
 * 
 * You can pause/resume individual scenes, or you can pause/resume all scenes by calling pause on the game:
 * 
 * myGame.pause();
 * myGame.resume();
 * myGame.togglePauseResume();
 * (end)
 *
 * <h5>Debugging</h5>
 * h5c3.Main sets up the following default input keys for debugging:
 * <ul>
 *     <li>F8 to enable/disable showing development window.</li>
 *     <li>F9 to enable/disable physics debugging across all layers.</li>
 *     <li>F10 to dump stats on the object pools.</li>
 *     <li>F11 toggle sound.</li>
 * </ul>
 */
h5c3.Main = h5c3.Base.extend('h5c3.Main', 
	{},
    /** Interface: h5c3.Main.prototype */
    {
        scenes:			null,	/** (h5c3.LinkedList) List of all scenes in the game */       	
        activeScenes:	null, 	/** (h5c3.LinkedList) List of scenes current active */
        paused:			false,	/** (Boolean) Whether the game is currently paused. You can theGame.paused=true; to suspend all scenes **/
		ctx:			null,	/** current 2D draw context */
		dim:			null,		
		bQuit:			false,
		
        /**
         * Constructs a new WebApp using the supplied 2D Context, Size & optional FPS
         * Parameters:  {Context} 2D Device Context for drawing
         * Parameters:  {h5c3.Point} width and height for inital size
         * Parameters:  Number fps Base frame rate in frames per second (fastest cycle time)
         */
        //init:function (ctx,size)
        init:function (obj)
        {
            this._super();
			$_DBG_('Initializing '+this.Class.shortName+' object.');
			this.ctx = obj.ctx;
			this.dim = obj.dim;
			this.canvas = obj.canvas;
            this.scenes = new h5c3.LinkedList();
            this.activeScenes = new h5c3.LinkedList();

            if (h5c3.devMode===true)
            {
                // bind some special keys for general debugging use
                h5c3.device.input.bindAction(this, 'developer window', 'F6');
                h5c3.device.input.bindAction(this, 'physics debug', 'F7');
                h5c3.device.input.bindAction(this, 'pool dump', 'F8');
                h5c3.device.input.bindAction(this, 'toggle sound', 'F9');
                h5c3.device.input.bindAction(this, 'reset', 'F10');
                h5c3.device.input.bindAction(this, 'exit', 'F12');
            }
            $_DBG_('Initialization completed.');
        },

        /**
         * Processes all active scenes (called automatically by h5c3.Device.cycle)
         * Returns: Boolean false indicates the device should stop running the game loop
         */
        process:function ()
        {
            if (this.paused || this.bQuit) return this.bQuit;

            var scene = this.getFirstActiveScene();
            while (scene)
            {
                scene.object().process();
                scene = scene.next();
            }

            return this.bQuit; // returns true to quit the update loop
        },

        stopAllSounds: function()
        {
            // stop any current sounds from playing
            var sounds = h5c3.loader.getAllSounds();
            for (var i = 0; i < sounds.length; i++)
            {
                if (h5c3.device.soundEnabled)
                    sounds[i].stop();
            }
        },

        /**
         * Base handler for input actions. This gives the game a chance to intercept and act on actions like
         * F9 and F10 for debugging. See h5c3.Input for more information on input handlers
         * Parameters:  String actionName Name of the action to be handled
         */
        onAction:function (actionName)
        {
			switch (actionName) {
				case 'reset': h5c3.device.boot();
					break;
					
				case 'exit': this.quit();
					break;

				case 'developer window':
					if ($VLD(h5c3.device.page.devWindow)) {
						$_DBG_('Developer Window activated.');
						h5c3.device.page.devWindow.toggleShow();
					} else {
						$_DBG_('Developer Window not available. Did you include the Plugin in your config? Are you running the debug.html version of your app?');					
					}
					break;

				case 'toggle sound':
					this.stopAllSounds();
					h5c3.device.soundEnabled = !h5c3.device.soundEnabled;
					if (h5c3.device.soundEnabled) {
						h5c3.device.page.devWindow.send2Console('Sound Enabled.');
					} else {
						h5c3.device.page.devWindow.send2Console('Sound Disabled.');
					}
					break;
					
				case 'pool dump':
					h5c3.device.page.devWindow.send2Console('Object Pool Dump:\n===================');
					h5c3.device.page.devWindow.send2Console(h5c3.Pool.getStats());
					break;
					
				case 'physics debug':
					// find all physics systems, and toggle debug
					var sceneNode = this.getFirstScene();
					while (sceneNode)
					{
						var layerNode = sceneNode.object().getFirstActiveLayer();
						while (layerNode)
						{
							var layer = layerNode.object();
							if (layer.Class.isA('h5c3.EntityLayer'))
							{
								var systemNode = layer.systemManager.systems.first;
								while (systemNode)
								{
									var system = systemNode.object();
									if (system.Class.isA('h5c3.systems.Physics'))
										system.setDebug(!system.debug);
									systemNode = systemNode.next();
								}
							}
							layerNode = layerNode.next();
						}
						sceneNode = sceneNode.next();
					}
					break;
			} //End Switch
        },

        //
        // SCENES
        //
        /**
         * Add a scene to the game. Automatically makes the scene active. Once added, the game's onSceneAdded method
         * will be called.
         * Parameters:  {h5c3.Scene} scene Scene to add
         */
        addScene:function (scene)
        {
			try {
				scene.ctx = this.ctx;
				this.scenes.add(scene);
				this.activeScenes.add(scene);
				this.onSceneAdded(scene);
			} catch (err) {
				$_DBG_('Error Adding scene ['+scene+']: '+err);
			}
        },

        /**
         * Called whenever a scene is added to the game. Useful for handling setup or detecting when new scenes are
         * being added.
         * Parameters:  {h5c3.Scene} scene Scene that was added
         */
        onSceneAdded:function (scene)
        {
        },

        /**
         * Removes a scene from the game. Will trigger a notifier call to onSceneRemoved
         * Parameters:  {h5c3.Scene} scene Scene to remove
         */
        removeScene:function (scene)
        {
            this.scenes.remove(scene);
            this.activeScenes.remove(scene);
            this.onSceneRemoved(scene);
        },

        /**
         * Notifier callback when a scene is removed from this game
         * Parameters:  {h5c3.Scene} scene Scene being removed
         */
        onSceneRemoved:function (scene)
        {
        },

        /**
         * Activates a scene (it will be rendered and processed)
         * Parameters:  {h5c3.Scene} scene Scene you want to make active
         */
        activateScene:function (scene)
        {
			if (typeof(scene) !== "undefined") { 
				if (scene.active) return;

				this.activeScenes.add(scene);
				scene.active = true;
				this.onSceneActivated(scene);
				scene.onActivated();
			}
        },

        /**
         * Called when a scene has been activated.
         * Parameters:  {h5c3.Scene} scene Scene that has been activated.
         */
        onSceneActivated:function (scene)
        {
        },

        /**
         * Deactivate a given scene
         * Parameters:  {h5c3.Scene} scene Scene to deactivate
         */
        deactivateScene:function (scene)
        {
            if (!scene.active) return;

            this.activeScenes.remove(scene);
            scene.active = false;
            this.onSceneDeactivated(scene);
            scene.onDeactivated();
        },
		
        /**
         * Called when a scene has been deactviated
         * Parameters:  {h5c3.Scene} scene Scene that was deactivated
         */
        onSceneDeactivated:function (scene)
        {
        },

        /**
         * Get the first active scene from the active scenes linked list
         * Returns: {h5c3.LinkedNode} Linked list node pointing to the first active scene (use getFirstActiveScene().object())
         * to get the scene.
         */
        getFirstActiveScene:function ()
        {
            return this.activeScenes.first;
        },

        /**
         * Get the first scene from the scene linkedlist
         * Returns: {h5c3.LinkedNode} Linked node pointing to the first scene
         */
        getFirstScene:function ()
        {
            return this.scenes.first;
        },

        //
        // lifecycle
        //

        /**
         * Pauses all scenes, which means no drawing or updates will occur. If you wish to pause game play and leave a menu
         * still running, then just pause the scene associated with game play, and not the menu scenes.
         */
        pause:function ()
        {
			if (!this.paused) {
				h5c3.device.handleTimers(false);
				this.paused = true;

				var nextScene = this.getFirstScene();
				while (nextScene)
				{
					nextScene.object().pause();
					nextScene = nextScene.next();
				}
			}
        },

        /**
         * Returns: Boolean True is the game is active (not paused)
         */
        isActive:function ()
        {
            return !this.paused;
        },

        /**
         * Resumes all scenes (after being paused)
         */
        resume:function ()
        {
			if (this.paused) {
				h5c3.device.handleTimers(true);
				this.paused = false;

				var nextScene = this.getFirstScene();
				while (nextScene)
				{
					nextScene.object().resume();
					nextScene = nextScene.next();
				}
			}
        },

        /**
         * Toggles pause/resume of the game
         */
        togglePauseResume:function ()
        {
            if (this.paused)
                this.resume();
            else
                this.pause();
        },

		quit:function(msg) {
			$CHK(msg,'Quit Signal Received.');
			$_DBG_(msg);
			//h5c3.device.page.waDIV(false); //Save waDIV innerHTML, False restores
            this.onExit();			
			this.bQuit = true;
		},
		
		onExit:function()
		{
			$_DBG_('WebApp Exiting...');
		},
		
        /**
         * Resets all scenes back to their starting state (by calling reset() on all scenes), then calling
         * clear() on all scenes, before finally calling the game class onReady
         */
        reset:function ()
        {
            // clear all scenes, layers, entities
            var nextScene = this.getFirstScene();
            while (nextScene)
            {
                nextScene.obj.reset();
                nextScene = nextScene.next();
            }

            this.scenes.clear();
            this.activeScenes.clear();

            // then restart the game
            this.onReady();
        },

		attachTouchEvents:function(obj)
		{
			if (h5c3.device.useTouch) {
				$_DBG_('Attached Touch Events');
				this.canvas.addEventListener('touchstart', obj._touchStart.bind(obj), true);
				this.canvas.addEventListener('touchend', obj._touchEnd.bind(obj), true);
				this.canvas.addEventListener('touchmove', obj._touchMove.bind(obj), true);

				h5c3.device.touchpad.canvas.addEventListener('touchstart', obj._touchStart.bind(obj), true);
				h5c3.device.touchpad.canvas.addEventListener('touchend', obj._touchEnd.bind(obj), true);
				h5c3.device.touchpad.canvas.addEventListener('touchmove', obj._touchMove.bind(obj), true);
			} else {		
				// mouse input	
				//fixes a problem where double clicking causes text to get selected on the canvas
				$_DBG_('Attached Mouse & Keyboard Events');
				this.canvas.addEventListener('selectstart', function(event) { event.preventDefault(); return false; }, false);		
				this.canvas.addEventListener('mouseup', obj._mouseUp.bind(obj), true);
				this.canvas.addEventListener('mousedown', obj._mouseDown.bind(obj), true);
				this.canvas.addEventListener('mousemove', obj._mouseMove.bind(obj), true);
				this.canvas.addEventListener('mousewheel', obj._mouseWheel.bind(obj), true);
				this.canvas.addEventListener('contextmenu', obj._contextMenu.bind(obj), true);
			}
		},
		
        /**
         * Called by the h5c3.Device when the game is ready to be started (also called when a reset() is done)
         */
        onReady:function ()
        {
			$_DBG_('onReady Called.');
            // disable caching when developing
            if (h5c3.devMode===true) h5c3.loader.setDisableCache();
			if (h5c3.device.resourcesLoaded===false)
			{
				try {
					h5c3.resources.loadResources();
					h5c3.loader.start(this.onLoading.bind(this), this.onLoaded.bind(this));
					h5c3.device.resourcesLoaded = true;
				} catch (err) {
					console.log('ERROR: '+err);
				}
			}
        },
		
        /**
         * Called when the device canvas changes size (such as when a browser is resized)
         * Parameters:  width Width of the canvas
         * Parameters:  height Height of the canvas
         */
        onResize:function (width, height)
        {
            var nextScene = this.getFirstActiveScene();
            while (nextScene)
            {
                nextScene.obj.onResize(width, height);
                nextScene = nextScene.next();
            }
        },

		/**
		 * Triggers when the page loses focus
		*/
		onBlur:function(event)
		{
			if (!this.paused) {
				this.pause();
				$_DBG_('Lost focus - Paused.');
			}
		},
		
		/**
		 * Triggers when the page gets focus
		 */
		onFocus:function(event)
		{
			if (this.paused) {
				this.resume();
				$_DBG_('Gained focus - Resuming.');
			}
		},
		
        onLoading:function (percentageComplete)
        {},

        onLoaded:function (loaded, errored)
        {},

        /**
         * Convenience function to grab the size of the associated device screen
         * Returns: {h5c3.Rect} Rectangle of the current canvas
         */
        getScreenRect:function ()
        {
            return h5c3.Rect.create(0, 0, h5c3.device.dimGame.w, h5c3.device.dimGame.h);
        }
    });



/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */
 
/**
 * 
 * Property: Object SceneID Container for default game states
 * Property: Number SceneID.LOADING The game is currently in a loading state
 * Property: Number SceneID.PUBLISHER The game is currently in a intro state
 * Property: Number SceneID.TITLE The game is currently in a title screen state
 * Property: Number SceneID.MAINMENU The game is currently in a mainmenu state
 * Property: Number SceneID.GAME The game is currently in a game state
 * Property: Number SceneID.GAMEOVER The game is currently in a game over state
 * Property: Number SceneID.CREDITS The game is currently in a credits state
 * Default:
 */
window.SceneID = 
{
    LOADING:	0x0000,
    PUBLISHER:	0x0001,
    TITLE:		0x0002,
    MAINMENU:   0x0003,
    GAME:		0x0004,
    GAMEOVER:	0x0005,
    CREDITS:	0x0006
};

/**
 * Property: {SceneID} GAMESTATE Hold the current state of the game
 * Default: LOADING
 */
var GAMESTATE = SceneID.LOADING; 

/**
 * 
 *  H5C3 Framework
 *  Engine
 * Class:  h5c3.Game
 *  h5c3.Main
 * 
 * [Extends <a href='h5c3.Base'>h5c3.Main</a>]
 * 
 * h5c3.Game is the primary base class for creating a game and drives resources, core processing (cycling) your
 * game, and serves as a placeholder for scenes.
 * <h5>Basic Usage</h5>
 * 
 * Typically a h5c3.Game is constructed by the h5c3.start method call made from within your games index.html:
 * 
 * &ltscript&gt
 *    // h5c3.start will construct an instance of TheGame once the device (browser) is ready
 *    h5c3.start('waCANVAS', 'TheGame', '/mygame/js/', ['mygame.js']);
 * &lt/script&gt
 * (end)
 * When the h5c3.start system has finished preparing everything, it will dynamically construct an instance of
 * the class parameter (in the above example 'TheGame'). You can always gain access to the game from the global
 * h5c3.device:
 * 
 * var myGame = this;
 * (end)
 * 
 * To create a h5c3.Game, extend it and override what you need:
 * 
 * TheGame = h5c3.Game.extend('TheGame',
 * {},
 * {
 *     // onReady is called when the browser DOM is ready
 *     onReady:function ()
 *     {
 *         this._super();
 *
 *         // load resources
 *         // declare a base URL; saves you typing
 *         h5c3.loader.setBaseUrl('images/');
 *
 *         // add an image to the resource loader's queue
 *         h5c3.loader.add(new h5c3.Image('player-ship', 'ship1.png'));
 *
 *         // start the resource loader
 *         h5c3.loader.start(this.onLoading.bind(this), this.onLoaded.bind(this));
 *     },
 *
 *     onLoading:function (percentageComplete)
 *     {
 *         // draw title screen -- with loading bar
 *     }
 *
 * });
 * (end)
 * See the h5c3.Loader for more information on using the resource loader and the onLoading/onLoaded callbacks.
 * 

 * <h5>Pause/Resume</h5>
 * 
 * You can pause/resume individual scenes, or you can pause/resume all scenes by calling pause on the game:
 * 
 * myGame.pause();
 * myGame.resume();
 * myGame.togglePauseResume();
 * (end)
 */
h5c3.Game = h5c3.Main.extend('h5c3.Game', 
{},
    /** Interface: h5c3.Game.prototype */
    {
		/**
		 * Property: {h5c3.Scene} loadingScene 
		 * Default: null
		 */
        loadingScene:	null,
		/**
		 * Property: {h5c3.IntroScene} publisherScene 
		 * Default: null
		 */
		publisherScene:	null,
		
        /**
         * Constructs a new WebApp using the supplied 2D Context, Size & optional FPS
         * Parameters:  {Context} 2D Device Context for drawing
         * Parameters:  {h5c3.Point} width and height for inital size
         * Parameters:  Number fps Base frame rate in frames per second (fastest cycle time)
         */
        //init:function (ctx,size)
        init:function (obj)
        {
            this._super(obj);
        },

        /**
         * Base handler for input actions. This gives the game a chance to intercept and act on actions
         * Parameters:  String actionName Name of the action to be handled
         */
        onAction:function (actionName)
        {
			this._super(actionName);
        },

		setZoom:function(level) {
			
		},
		
        /**
         * Constructs a new WebApp using the supplied 2D Context, Size & optional FPS
         * Parameters:  {h5c3.Scene} scene - A valid Scene
         * Parameters:  Number scene_id - A valid SceneID
         * Returns:  None
         */
		setScene:function(scene, scene_id) {
			var scene_changed = false, scene_name = '';
			switch (scene_id) {
				case SceneID.LOADING:
					if (!$VLD(this.loadingScene)) {
						this.loadingScene = new h5c3.Scene('Loading Scene');
						this.loadingLayer = new h5c3.Layer({scene:this.loadingScene,name:'LoadingLayer'});
						this.loadingScene.addLayer(this.loadingLayer);
					} else {
						this.activateScene(this.loadingLayer);
					}
					scene_changed = true;
					scene_name = this.loadingScene.name;
					break;

				case SceneID.PUBLISHER:
					if (!$VLD(this.publisherScene)) {
						this.publisherScene = new h5c3.IntroScene();
						this.addScene(this.publisherScene);
					} else {
						this.activateScene(this.publisherScene);
					}
					scene_changed = true;
					scene_name = this.publisherScene.name;
					break;

				case SceneID.MAINMENU:
					if (!$VLD(this.mainmenuScene)) {
						this.mainmenuScene = new MainMenuScene();
						this.addScene(this.mainmenuScene);
					} else {
						this.activateScene(this.mainmenuScene);
					}
					scene_changed = true;
					scene_name = this.mainmenuScene.name;
					break;

				case SceneID.GAME:
					if (!$VLD(this.gameScene)) {
						this.gameScene = new GameScene();
						this.addScene(this.gameScene);
					} else {
						this.activateScene(this.GameScene);
					}
					scene_changed = true;
					scene_name = this.gameScene.name;
					break;
			} //End Switch
			
			if (scene_changed && scene !== null) {
				this.deactivateScene(scene);
				$_DBG_('Deactivated '+scene.name+', Activated '+scene_name);
			}
		},
		
        /**
         * Called by the h5c3.Device when the game is ready to be started (also called when a reset() is done)
         */
        onReady:function ()
        {
			this._super();
			$_DBG_('onReady Event.');
			this.setScene(null,SceneID.LOADING);
        },

		/**
		* Displays the loading screen
		*
		* Parameters:  Number percentageComplete The total percentage of loading being complete 0-100%
		* Returns:  None
		*/	
        onLoading:function (percentageComplete)
        {
			var centerX = (this.dim.w) / 2,	centerY = (this.dim.h) / 2;
			var width = 320*(percentageComplete/100);
			this.ctx.textAlign = 'center';
            this.ctx.clearRect(0, 0, this.dim.w, this.dim.h);
            this.ctx.fillStyle = "#00FF00";
            this.ctx.font = "normal 18px Verdana";
            this.ctx.fillText('Loading: ' + percentageComplete + '%', centerX, centerY+9);
			this.ctx.fillRect(centerX-160, centerY+80,width,16);
			this.ctx.fillStyle = '#00FF00';
			this.ctx.fill();
		},

		/**
		* Called when loading is completed. Changes the Game State publisher (intro scene)
		*
		* Parameters:  Number loaded The total number of resources loaded.
		* Parameters:  Number errored The total number of resources not loaded due to an error
		* Returns:  None
		*/	
        onLoaded:function (loaded, errored)
        {
			/** Everything is Loaded - Setup internal Factories **/
			h5c3.entityFactory = new h5c3.EntityFactory();
			h5c3.soundFactory = new h5c3.SoundFactory();
			this.setScene(this.loadingScene,SceneID.PUBLISHER);
        }
	});

/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */

 /**
 * Page - this class is used to create & manipulate the document in which the 
 * DIV and Canvas elements reside. It determines the device OS, Screen Dimensions
 * and orientation and reacts accordinaly. There is no need to interact with the
 * object. Everything is internal and automatic to the engine.
 */
h5c3.Page = h5c3.Base.extend('h5c3.Page',
    { },
    {
		device: null,
		wrapper:
		{
			div:null,			/** Container DIV for all other elements */
			dim:{w:0,h:0}		/** Actual wrapper div dimensions */
		},
		banner: 
		{
			name: null,			/** the name of the banner class that was constructed */
			obj: null,			/** the banner object constructed at startup */
			id:null,			/** element Id of the banner canvas */
			div:null,			/** div element upon which all banner drawing will occur */
			dim:{w:0,h:0}		/** Actual banner canvas dimensions */
		},	
		game:
		{
			name: null,			/** the name of the game class that was constructed */
			obj: null,			/** the game object constructed at startup */
			id:null,			/** element Id of the game/app canvas */
			canvas:null,		/** canvas element upon which all game/app drawing will occur */
			ctx:null,			/** current Game/App 2D draw context */		
			dim:{w:0,h:0}		/** Actual game/app canvas dimensions */
		},
		touchpad:
		{
			name: null,			/** the name of the touchpad class that was constructed */		        
			obj: null,			/** the tocupad object constructed at startup */
			id:null,			/** element Id of the touch canvas */        
			canvas:null,		/** canvas element upon which all touchpad drawing will occur */
			ctx:null,			/** current Touchpad 2D draw context */
			dim:{w:0,h:0}		/** Actual touchpad canvas dimensions */
		},
		
		options: {
			desktopsuspend:true,		/** Suspend/resume on losing or gaining focus */
			suspend:true,		/** Suspend/resume on losing or gaining focus */
			network:true		/** trigger events for going online or offline */
		},
        
		orientation: {
			event: false,		/** Whether or not we are reacting to the deviceorientation event */
			state: null			/** Orientation of the display/device. Determined by Engine */
		},						/** Landscape is for Desktop/Notebook non touch devices only. **/
								/** ALL touch devices are rendered in Portrait. **/
		devWindow:null,			/** Integrated Developer Window */
		
		init:function(owner,title)
		{
			this._super();
			this.device = owner;
			$CHK(title,'Undefined Page');
			$DOC().title = title;
			this.wrapper.div = $GEI('waDIV');
			//this.waDIV(true); //Save waDIV innerHTML, False restores
			
			$_DBG_('Initialization started.');
			$_DBG_('UA='+window.navigator.userAgent);
			$_DBG_('Detected Device Screen Dimensions are ['+window.screen.availWidth+'x'+window.screen.availHeight+']');
			$_DBG_('Detected Device Usable Dimensions are ['+window.innerWidth+'x'+window.innerHeight+']');
			/** if touch device create canvas for touchpad **/
			if (this.device.useTouch) { 
				$_DBG_('Mobile Media Detected '+this.device.media.browser.name+' v'+this.device.media.browser.version+' on '+this.device.media.OS.name);
				this.initBanner();			
				this.initGame();
				this.initTouchPad();
			} else { 
				$_DBG_('Static Media Detected '+this.device.media.browser.name+' v'+this.device.media.browser.version+' on '+this.device.media.OS.name);
				//if (h5c3.devMode===true) { this.initBanner(); }
				this.initGame();
			}
						
			if (this.options.suspend===true) {
				$_DBG_('OPTION: Suspened on focus enabled.');
				window.addEventListener('blur', this._onBlur.bind(this), true);
				window.addEventListener('focus', this._onFocus.bind(this), true);
			} else {
				$_DBG_('OPTION: Suspened on focus disabled.');
			}
			
			if (this.options.network===true) {
				$_DBG_('OPTION: Network monitoring enabled.');
				window.document.addEventListener('offline', this._onOffline.bind(this), true);
				window.document.addEventListener('online', this._onOnline.bind(this), true);
			} else {
				$_DBG_('OPTION: Network monitoring disabled.');
			}
            window.onresize = this._onResize.bind(this);
		},
		
		initBanner:function()
		{
			var e = $GEI('waDIV');
			this.banner.div = document.createElement("div"); 
			this.banner.div.id = this.banner.id = "waBannerDIV";
			this.banner.div.width = window.innerWidth;
			this.banner.div.height= 32;
			e.appendChild(this.banner.div);
			
			if (!this.banner.div) {	$_DBG_('Could not get a banner element using the id [' + this.banner.id + ']. '); }

			this.banner.obj = new h5c3.Banners(this.banner.div);
			if (!this.banner.obj) {	$_DBG_('Invalid Banner class. Must be named [Banners]'); }

			this.banner.dim = {w:this.banner.div.width, h:this.banner.div.height};
			$_DBG_('Created Banner panel ['+this.banner.dim.w+'x'+this.banner.dim.h+']');
		},
			
		initGame:function()
		{
			this.setOrientation();
			if (!$VLD(this.game.canvas = $GEI('waCANVAS'))) { 
				$_DBG_('ERROR: Could not attach to a canvas element using the id [' + this.game.id + ']. ');
			} else {
				this.game.ctx = this.game.canvas.getContext('2d');
				this.game.dim = {w:this.game.canvas.width, h:this.game.canvas.height};
				if (typeof Game === 'function') {
					this.game.obj = new Game(this.game);
				   if (!$VLD(this.game.obj)) {
						$_DBG_('ERROR: Invalid Game class, Must be named [Game]');
					} else {
						$_DBG_('Created Game panel ['+this.game.dim.w+'x'+this.game.dim.h+']');
					}
				}
			}
		},
		
		initTouchPad:function()
		{
			var e = $GEI('waDIV');
			this.touchpad.canvas = document.createElement("canvas"); 
			this.touchpad.canvas.id = this.touchpad.id = "pcTouchCanvas";
			this.touchpad.canvas.width = 1080;
			this.touchpad.canvas.height= 540;
			e.appendChild(this.touchpad.canvas);
			
            if (!this.touchpad.canvas) {
                throw 'device.js::initTouchpad() - Abort! Could not attach to a canvas element using the id [' + this.touchpad.id + ']. ';
			}

            this.touchpad.ctx = this.touchpad.canvas.getContext('2d');
			this.touchpad.dim = {w:this.touchpad.canvas.width, h:this.touchpad.canvas.height};
			this.touchpad.obj = new h5c3.TouchPad(this.touchpad.ctx,this.touchpad.dim);
            if (!this.touchpad.obj) {
                throw "device.js::initTouchpad() - Invalid touchpad class. Must be named [TouchPad]";
			}

			$_DBG_('Created Touchpad panel ['+this.touchpad.dim.w+'x'+this.touchpad.dim.h+']');
		},
		
		setOrientation:function() 
		{
			if (!this.device.started) {
				return;
			}
			if (window.DeviceOrientationEvent) {
				this.orientation.event = true;
				$_DBG_("Device Orientation is supported - Event Hooked Added.");
				window.addEventListener('deviceorientation', this.onDeviceMotion, false);
			} else {
				this.orientation.event = false;
				$_DBG_("Device Orientation not supported");
			}	
			
			if (h5c3.device.useTouch || window.innerHeight > window.innerWidth) {
				this.orientation.state = H5c3.ORIENTATION.PORTRAIT;
			} else {
				this.orientation.state = H5C3.ORIENTATION.LANDSCAPE;
			}
		},
		
		onDeviceMotion:function(event) {
			if (event.alpha===null || event.beta===null || event.gamma===null) {
				if (h5c3.device.page.orientation.event === true) {
					window.removeEventListener('deviceorientation', this.onDeviceMotion, false);
					h5c3.device.page.orientation.event = false;
					h5c3.device.page.debug("This device does not REALLY have orientation capabilities - Event Hooked Removed.");
				}
			}
		},
		
        _calcScreenSize:function ()
        {			
			if (this.orientation.state===H5C3.ORIENTATION.LANDSCAPE)
			{
				$_DBG_('Orientation set to Landscape.');
				if (!document.fullScreen) {
					$GEI('waCANVAS').webkitRequestFullScreen();
				}
				this.wrapper.dim.w = window.innerWidth; this.wrapper.div.width = this.wrapper.dim.w+"px"; this.wrapper.div.style.width = this.wrapper.dim.w+"px";
				this.wrapper.dim.h = window.innerHeight; this.wrapper.div.height = this.wrapper.dim.h+"px"; this.wrapper.div.style.height = this.wrapper.dim.h+"px";
			}
			else
			{
				$_DBG_('Orientation set to Portrait.');
				this.wrapper.dim.w = window.innerWidth; this.wrapper.div.width = this.wrapper.dim.w+"px"; this.wrapper.div.style.width = this.wrapper.dim.w+"px";
				this.wrapper.dim.h = window.innerHeight; this.wrapper.div.height = this.wrapper.dim.h+"px"; this.wrapper.div.style.height = this.wrapper.dim.h+"px";
			}

			$_DBG_('Calculated screen space is ['+this.wrapper.dim.w+'x'+this.wrapper.dim.h+']');
			var remainingHeight = this.wrapper.dim.h;

			//Now assign all other dimension based off wrapper
			/** If in Portrait view, render single ad bar at top otherwise	**/
			/** use the extra space on either side of the game canvas		**/
			//if (h5c3.devMode===true) {
			//	this.banner.dim.w = this.wrapper.dim.w; 
			////	this.banner.div.width = this.banner.dim.w; 
			//	this.banner.div.style.width = this.banner.dim.w+"px";
			//	this.banner.dim.h = this.banner.div.height = 32; 
			//	this.banner.div.style.height = "32px";
			//	remainingHeight -= this.banner.dim.h;
			//}
			
			if (h5c3.device.useTouch) {
				this.game.dim.w = this.wrapper.dim.w; 
				this.game.canvas.style.width = this.game.dim.w+"px";
				this.game.dim.h = this.wrapper.dim.w; 
				this.game.canvas.style.height = this.game.dim.h+"px";
				remainingHeight -=this.game.dim.h;

				this.touchpad.dim.w = this.wrapper.dim.w; 
				this.touchpad.canvas.style.width = this.touchpad.dim.w+"px";
				this.touchpad.dim.h = remainingHeight; 
				this.touchpad.canvas.style.height = this.touchpad.dim.h+"px";
				remainingHeight -= this.touchpad.dim.h;
			} else {
				this.game.dim.w = this.wrapper.dim.w; 
				this.game.canvas.style.width = this.game.dim.w+"px";
				this.game.dim.h = this.wrapper.dim.h; 
				this.game.canvas.style.height = remainingHeight+"px";
				remainingHeight -=remainingHeight;
			}


			//if (h5c3.devMode) {
			//	$_DBG_('Used ['+this.banner.dim.w+'x'+this.banner.dim.h+'] for Banner Panel.');
			//}
			$_DBG_('Used ['+this.game.dim.w+'x'+this.game.dim.h+'] for Game Panel.');
			$_DBG_('Used ['+this.touchpad.dim.w+'x'+this.touchpad.dim.h+'] for Touchpad Panel.');
			
			if (remainingHeight !== 0) { $_DBG_("Layout was not done correctly. "+remainingHeight+'px difference.'); }
		},
		
		render:function()
		{
			//if (h5c3.devMode===true) { this.devWindow.objStats.update(h5c3.device.elapsed);	this.devWindow.objStats.draw();	}
		},
		
		waDIV:function(clear)
		{
			$CHK(clear,true);
			this.wrapper.div.display = 'none';
			if (clear===true) {
				this.wrapper.div.innerHTML = '';
			} else {
				document.location.reload();
			}
			this.wrapper.div.display = 'block';
		},
				
		/**
		 * Triggers when the page loses focus
		*/
		_onBlur:function(event)
		{
			this.game.obj.onBlur();
		},
		
		/**
		 * Triggers when the page gets focus
		 */
		_onFocus:function(event)
		{
			this.game.obj.onFocus();
		},
		
		/**
		 * Triggers when the page goes offline
		*/
		_onOffline:function(event)
		{
			$_DBG_('Lost network connection.');
		},

		/**
		 * Triggers when the page come online
		*/
		_onOnline:function(event)
		{
			$_DBG_('Gained network connection.');
		},
		
		/**
		 * Triggers when the page is resized
		 */
        _onResize:function (e)
        {
			$_DBG_('Dimension changed detected.');
            this._calcScreenSize();
            this.game.dim.w = this.game.canvas.width;
            this.game.dim.h = this.game.canvas.height;
            this.game.obj.onResize(this.game.dim.w, this.game.dim.h);
			//if (h5c3.device.showDebug) this.devWindow.onResize();
        }, //end onResize()
		
        /**
         * Automatically called by device::onReady()
         */
        onReady:function ()
        {
			$_DBG_('onReady Called.');
			//if (h5c3.devMode) { this.banner.obj.onReady(); this.devWindow.onReady(); }
            this.game.obj.onReady();
            if (h5c3.device.useTouch) {
				this.touchpad.obj.onReady();
			}
			
        } //end onReady()
    });

/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 *  H5C3 Framework
 *  Engine
 * Class:  h5c3.Color
 *  h5c3.Pooled
 * 
 * A general purpose representation of a color. You can create a color either an array [R,G,B] or using a hex color
 * string in the form of #RRGGBB. (For alpha see the h5c3.component.Alpha and h5c3.components.Fade).
 * 
 *     Create a color using either new:
 * 
 * var color = new h5c3.Color([255, 0, 0]); // super red
 * var color2 = new h5c3.Color('#00FF00'); // super green
 * (end)
 * 
 *     Or, as a pooled object:
 * 
 * var color = h5c3.Color.create([255, 0, 0]); // super red
 * (end)
 */
h5c3.Color = h5c3.Pooled.extend('h5c3.Color',
    /** Interface: h5c3.Color */
    {
        /**
         * Constructs a color object using the passed in color
         * Parameters:  {Array|String} color Can either be a string in the form of #RRGGBB or an array of 3 numbers representing red,
         * green, blue levels, i.e. full red is [255, 0, 0]
         */
        create:function (color)
        {
            var n = this._super();
            n.config(color);
            return n;
        }
    },
    /** Interface: h5c3.Color.prototype */
    {
        /** Array of current colors */
        rgb:[],
        /** Representation of the current color as an rgb string. Automatically updates as you change color */
        color:null,

        /**
         * Constructs a new color using the passed in color string. Used if you call new h5c3.Color, but typically
         * you should be using h5c3.Color.create as this is a pooled class
         * Parameters:  {Array|String} color Can either be a string in the form of #RRGGBB or an array of 3 numbers representing red,
         * green, blue levels, i.e. full red is [255, 0, 0]
         */
        init:function (color)
        {
            if (color !== undefined) {
                this.config(color);
			}
        },

        /**
         * Configure this color object with a given color
         * Parameters:  {Array|String} color Can either be a string in the form of #RRGGBB or an array of 3 numbers representing red,
         * green, blue levels, i.e. full red is [255, 0, 0]
         */
        config:function (color)
        {
            if (Array.isArray(color)) {
                this.rgb = color;
            } else {
                if (color.charAt(0) === '#')
                {
                    this.rgb[0] = parseInt(color.substring(1, 3), 16);
                    this.rgb[1] = parseInt(color.substring(3, 5), 16);
                    this.rgb[2] = parseInt(color.substring(5, 7), 16);
                } else {
                    throw "color.js::config() - Invalid color: use either array [r,g,b] or '#RRGGBB'";
				}
            }
            this._updateColorCache();
        },

        /**
         * Sets this color object to a given color (synonym for config(color)
         * Parameters:  {Array|String} color Can either be a string in the form of #RRGGBB or an array of 3 numbers representing red,
         * green, blue levels, i.e. full red is [255, 0, 0]
         */
        set:function (color)
        {
            this.config(color);
        },

        /**
         * Sets the red component of the color
         * Parameters:  Number r Red component of the color to set
         */
        setRed:function (r)
        {
            this.rgb[0] = h5c3.Math.limit(r, 0, 255);
            this._updateColorCache();
        },

        /**
         * Adds to the red component of the color
         * Parameters:  Number r Red component
         */
        addRed:function (r)
        {
            this.rgb[0] = h5c3.Math.limitAdd(this.rgb[0], r, 0, 255);
            this._updateColorCache();
        },

        /**
         * Subtracts from the red component of the color
         * Parameters:  Number r Red component
         */
        subRed:function (r)
        {
            this.rgb[0] = h5c3.Math.limitAdd(this.rgb[0], -r, 0, 255);
            this._updateColorCache();
        },

        /**
         * Sets the green component of the color
         * Parameters:  Number g Green component of the color to set
         */
        setGreen:function (g)
        {
            this.rgb[1] = h5c3.Math.limit(g, 0, 255);
            this._updateColorCache();
        },

        /**
         * Adds to the green component of the color
         * Parameters:  Number g Green component
         */
        addGreen:function (g)
        {
            this.rgb[1] = h5c3.Math.limitAdd(this.rgb[1], g, 0, 255);
            this._updateColorCache();
        },

        /**
         * Subtracts from the green component of the color
         * Parameters:  Number g Green component
         */
        subGreen:function (g)
        {
            this.rgb[1] = h5c3.Math.limitAdd(this.rgb[1], -g, 0, 255);
            this._updateColorCache();
        },

        /**
         * Sets the blue component of the color
         * Parameters:  Number b Blue component of the color to set
         */
        setBlue:function (b)
        {
            this.rgb[2] = h5c3.Math.limit(b, 0, 255);
            this._updateColorCache();
        },

        /**
         * Adds to the blue component of the color
         * Parameters:  Number b Blue component of the color to set
         */
        addBlue:function (b)
        {
            this.rgb[2] = h5c3.Math.limitAdd(this.rgb[2], b, 0, 255);
            this._updateColorCache();
        },

        /**
         * Subtracts from the blue component of the color
         * Parameters:  Number b Blue component
         */
        subBlue:function (b)
        {
            this.rgb[2] = h5c3.Math.limitAdd(this.rgb[2], -b, 0, 255);
            this._updateColorCache();
        },

        /**
         * Darkens the color by the given value (1..255)
         * Parameters:  Number amt Amount to darken the color by
         */
        darken:function (amt)
        {
            this.subRed(amt);
            this.subGreen(amt);
            this.subBlue(amt);
        },

        /**
         * Lightens the color by the given amount (1..255)
         * Parameters:  Number amt Amount to lighten the color by
         */
        lighten:function (amt)
        {
            this.addRed(amt);
            this.addGreen(amt);
            this.addBlue(amt);
        },

        _updateColorCache:function ()
        {
            // todo: this is constructing a string on every adjustment: can we save on that?
            this.color = 'rgb(' + this.rgb[0] + ',' + this.rgb[1] + ',' + this.rgb[2] + ')';
        }
    });

/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 *  H5C3 Framework
 *  Engine
 * Class:  h5c3.Factory
 *  h5c3.Base
 * 
 * For creating like objects. Just an interface class that allows you extend from to create a factory
 * that allows easy creation, use and removal of like objects, like Entities or Sounds, Layers, ect.
 */
h5c3.Factory = h5c3.Base.extend('h5c3.Factory',
    { },
    {
		/** Object Store **/
		objects: {},
        
		init:function(name)
		{
			this._super();
			$CHK(name,'Undefined Factory');
			this.factoryType = name;
			$_DBG_(name+' Factory Initialized.');
		},
		
        /**
         * Used to create a new object and add it to the store. You MUST override this method
		 * in your own Object Factory. Look at Template entity.factory.js and sound.factory.js
		 * for a great example of usage.
         */
        create:function ()
        {},

		/**
		 * Adds a new object to the store
		 *
		 * String name  Name for the object (NO SPACES)
		 * Object obj The actual object to store in this.objects[name]
		 * return Object
		 */
		add:function(name,obj)
		{
			if (!$VLD(obj)) {
				$_DBG_('You cannot add ['+name+'] which is null or undefined to the ['+this.factoryType+'] store');
			} else {
				this.objects[name] = obj;
				this.objects.length++;
				return this.objects[name];
			}
		},

		/**
		 * Removes an object from the store
		 *
		 * String name  Name for the object (NO SPACES)
		 * Object obj The actual object to store in this.objects[name]
		 * return Object
		 */
		remove:function(name)
		{
			try {
				var i = this.objects.indexOf(name);
				this.objects.pop(i);
				this.objects.length--;
			} catch (err) {
				$_DBG_('No object ['+name+' exists in ['+this.factoryType+'] store to remove.');
			}
		},
		
		/**
		 * Checks to see if an object exists in the store
		 *
		 * String name  Name for the object (NO SPACES)
		 * return Boolean
		 */
		exists:function(name)
		{
			var result;
			
			if (this.objects.hasOwnProperty(name)) {
				result = true;
			} else {
				result = false;
			}
			return result;
		},
		
		/**
         * Returns the requested object
		 *
         * Parameters:  String name String type of the object to use
		 * Parameters:  Object options Simple object containing options for the desired entity/sound
		 * Returns:  {Sound|Entity}
         */
		use:function(name,options)
		{
			var result;
			
			if (this.exists(name)) {
				result = this.objects[name];
			} else {
				result = this.create(name,options);
			}
			return result;
		}
    });

/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

window.STATES =
{
    SELECTABLE:	0x0001,
    DRAGGABLE:	0x0002,
    HOVERABLE:	0x0003
};
 
/**
 * Class:  h5c3.Entity
 * 
 * Entities are the primary 'things' that are in a game. They serve as the primary container for components.
 * 
 * To add an entity to a game you must place it within an <a href='h5c3.EntityLayer'>entity layer</a>.
 * 
 * 
 * var entityLayer = new h5c3.EntityLayer('my entity layer', 10000, 10000);
 * (end)
 * 
 * You can then construct an entity by allocating it from the entity pool, and assigning it to the layer:
 *
 * 
 * var newEntity = h5c3.Entity.create(entityLayer);
 * (end)
 *
 * <h5>Components</h5>
 * To add functionality to the entity, you need to add components. Components are discreet bits of functionality
 * you can use across many entities. A spaceship for example, might have a sprite component for the artwork, a spatial
 * component (where it is in the world), an input handling component and a physics component. All of these components
 * combine together let you create an awesome flying menace.
 * 
 * For example, to create a simple entity that consists of a red box, we add two components, one for the spatial (its
 * position and dimensions), and one to indicate we want to draw a rectangle.
 * 
 * // add a spatial component
 * box.addComponent( h5c3.components.Spatial.create({ x:100, y: 100, w:50, h:50 }) );
 *
 * // add a red rectangle
 * box.addComponent( h5c3.components.Rect.create({ color:'#ff2222' }) );
 * (end)
 * <h5>Tagging</h5>
 * Entities can be tagged and searched for. You can add multiple tags to a single entity to categorize it in different
 * ways. Tags are the primary way you should 'type' an entity - as opposed to using a class hierarchy.
 * 
 * To add a tag an entity use:
 * 
 * entity.addTag('enemy');
 * entity.addTag('monster');
 * (end)
 * You can then grab all entities in a layer that have a tag:
 * 
 * entityLayer.entityManager.getTagged('enemy'); // return a h5c3.LinkedList
 * (end)
 * You can remove a tag:
 * 
 * entity.removeTag('monster');
 * (end)
 * And quickly test if an entity has a tag:
 * 
 * entity.hasTag('enemy') == true;
 * (end)
 * And finally, you can inspect all the tags an entity has by looking at the tags member:
 * 
 * entity.tags[0] === 'enemy';
 * (end)
 */
h5c3.Entity = h5c3.Pooled.extend('h5c3.Entity',
    {
        /**
         * Constructs an entity by acquiring it from the object pool
         * Parameters:  
		 * {h5c3.Layer} layer Layer the entity should be added to
         * Returns: {h5c3.Entity} A h5c3.Entity
         */
        create: function(layer)
        {
            var n = this._super();
            $AST(layer, 'Entity requires a valid layer to be placed on');
            n.config(layer);
            return n;
        }
    },
    {
        /** layer this entity is on */
        layer: null,
        /** array of strings representing the tags this entity has (read-only) */
        tags: [],
        /** whether this entity is presently active (read-only) */
        active: true,

        _componentCache: null,  // cache of components for entity -- not to be used for anything but speed reading

        /**
         * Constructs a new entity by acquiring it from the object pool
         * Parameters:  
		 * {h5c3.Layer} layer Layer the entity should be added to
         */
        init: function(layer)
        {
            this._super();
            this._componentCache = new h5c3.Hashmap();
            if ($VLD(layer)) {
                this.config(layer);
			}
        },

        /**
         * Configures an entity with the given layer (typically this is called by create or init and does not
         * need to be called directly.
         * Parameters:  
		 * {h5c3.EntityLayer} layer Layer to add the entity too
         */
        config: function(layer)
        {
            this.layer = layer;
            this.active = true;
            layer.entityManager.add(this);
        },

        /**
         * Releases the entity back into the object pool. Should not be used directly unless you know what you're
         * doing. Use entity.remove for most sitations.
         */
        release: function()
        {
            this.tags.length = 0;
            this.active = false;
            this._componentCache.clear();
            this._super();
        },

        /**
         * Add a tag to the entity - actually just a pass through function to entity.layer.entityManager.addTag
         * Parameters:  
		 * String tag Tag to add to the entity.
         */
        addTag: function(tag)
        {
            this.layer.entityManager.addTag(this, tag);
        },

        /**
         * Tests if this entity has a given tag
         * Parameters:  
		 * String tag The tag to look for
         * Returns: 
		 * Boolean true if the tag exists on this entity
         */
        hasTag: function(tag)
        {
			var i = 0;
            for (i=0; i < this.tags.length; i++) {
                if (this.tags[i].toLowerCase() === tag.toLowerCase()) {
					return true;
				}
			}
            return false;
        },

        /**
         * Removes a tag from an entity
         * Parameters:  
		 * String tag Tag to remove
         */
        removeTag: function(tag)
        {
            this.layer.entityManager.removeTag(this, tag);
        },

        /**
         * Add a component to this entity
         * Parameters:  
		 * {h5c3.components.Component} component Component to add
         * Returns: 
		 * {h5c3.components.Component} Component that was added
         */
        addComponent: function(component)
        {
            return this.layer.entityManager.addComponent(this, component);
        },

        /**
         * Remove a component from the entity
         * Parameters:  
		 * {h5c3.components.Component} component Component to remove
         */
        removeComponent: function(component)
        {
            this.layer.entityManager.removeComponent(this, component);
        },

        /**
         * Remove the component of a given type
         * Parameters:  
		 * String componentType Component type to remove (e.g. 'physics')
         */
        removeComponentByType: function(componentType)
        {
			this.removeComponent(this._componentCache.get(componentType.toLowerCase()));
        },

        /**
         * Retrieves a reference to a component on the entity using a given type
         * Parameters:  
		 * String componentType Type string of the component to get
         * Returns: 
		 * {h5c3.components.Component} The component matching the type
         */
        getComponent: function(componentType)
        {
			return this._componentCache.get(componentType.toLowerCase());
        },

        /**
         * Get the components in this entity
         * Returns: 
		 * {h5c3.Hashtable} A hashtable of component objects keyed by component type
         */
        getAllComponents: function()
        {
            // use internal cache for speed
            return this._componentCache;
        },

        /**
         * Get an array containing strings of all the types of components on this entity
         * Returns: 
		 * Array Array of strings with all the component types
         */
        getComponentTypes: function()
        {
            // todo: could optimize this if required by caching the types as well (instead of generating
            // an array on every check. Don't think it's used very often though.
            return this._componentCache.keys();
        },

        /**
         * Check whether the entity has a component of a given type
         * Parameters:  
		 * String componentType Component type to check for
         * Returns: 
		 * Boolean true if a component with the given type is on the entity
         */
        hasComponentOfType: function(componentType)
        {
			return this._componentCache.hasKey(componentType.toLowerCase());
        },

        /**
         * Remove this entity from the layer
         */
        remove: function()
        {
            this.layer.entityManager.remove(this);
			this.onRemoved();
        },

		onRemoved: function() 
		{
			$_DBG_('Entity '+this.uniqueId+' has been removed.');
		},
		
        // INTERNALS
        _handleComponentRemoved: function(component)
        {
            this._componentCache.remove(component.getType());
        },

        _handleComponentAdded: function(component)
        {
            this._componentCache.put(component.getType(), component);
        }
    });

/**
 * Class:  h5c3.EntityFactory
 *
 * For creating entities (mostly just an interface class you extend from to create an entity factory).
 * No need to create an instance yourself...it is created automatically by Game::onReady()
 *
 * 
 *	h5c3.entityFactory = new EntityFactory();
 * (end)
 */
h5c3.EntityFactory = h5c3.Factory.extend('h5c3.EntityFactory',
    {},
    {
        
		/**
		 * Initialization Method
		 */	
		init:function() 
		{
			this._super('Entity');
		},
				
		/**
         * Called by the entity loader
		 *
         * Parameters:  
		 * String name String type of the entity to create
		 * {h5c3.Layer} layer Layer the entity should be placed on
		 * Returns:
		 * h5c3.Entity
         */
        create:function (name, options)
		{
			$CHK(name,false);
			$CHK(options.layer,false);
			if (!name || !options.layer) {
				throw('entity.js::create() - You must provide a name & layer for first use.');
			}
			var obj = h5c3.Entity.create(options.layer);
			obj.addTag(name);
			return this.add(name,obj);
		}		
    });
/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * Class:  h5c3.Layer
 * 
 * 
 * 
 * A layer is a container for drawing and processing game elements. Layer's are contained with a
 * <a href='h5c3.Scene'>h5c3.Scene</a> which automatically handles calling the process and draw methods.
 * 
 * You can use the h5c3.Layer class to create your own custom layers, though typically <a href='h5c3.TileLayer'>
 * h5c3.TileLayer</a> and <a href='h5c3.EntityLayer'>h5c3.EntityLayer</a> should be used for typical game levels.
 * 
 * To create your own custom level, derive from h5c3.Level and override the draw and process methods:
 * 
 * // construct a scene and add it to the game
 * myGameScene = new GameScene();
 *
 * // create your own layer class
 * MyLayer = h5c3.Layer.extend('MyLayer',
 * {},
 * {
 *    // override draw to do custom layer drawing
 *    draw:function()
 *    {
 *       // draw a rectangle
 *       h5c3.device.ctxGame.fillStyle = '#fff';
 *       h5c3.device.ctxGame.fillRect(0, 0, 10, 10);
 *    }
 *
 *    // override process to update or change things
 *    process:function()
 *    { }
 * });
 *
 * // construct the custom layer and add it to the scene
 * var myLayer = new MyLayer('Test layer', 1);
 * myGameScene.addLayer(myLayer);
 * (end)
 * <h5>Pause/Resume</h5>
 * Layers can be paused/resumed, which will stop drawing and processing of a layer.
 * 
 * myLayer.pause();
 * myLayer.resume();
 * (end)
 * <h5>Z-Order Drawing</h5>
 * Layers support z-order draw sorting within their scenes. To change the z-order, either construct the layer
 * using a zIndex parameter, or call setZIndex to change the draw order layer
 * 
 * <h5>Origins and Parallax</h5>
 * A layer has an optional origin that can be used to use the layer as a viewport into a large world.
 * By changing the origin you can pan and move a layer. You should then use screenX() and screenY() to
 * modify where an element is drawn relative to layer's current origin offset.
 * 
 * 
 * draw:function()
 * {
 *    // draw a rectangle (at world coordinate 100, 100)
 *    h5c3.device.ctxGame.fillStyle = '#fff';
 *    h5c3.device.ctxGame.fillRect(this.screenX(100), this.screenY(100), 10, 10);
 * }
 *
 * // override process to update or change things
 * process:function()
 * {
 *    // pan the origin to the right by 1 pixel every cycle
 *    this.setOrigin( this.origin.x + 1, 0);
 * }
 * (end)
 * 
 * To center a layer around a player object set its origin to position the player at half the viewport width
 * and height. This should be done on every game update:
 * 
 * process:function()
 * {
 *    myLayer.setOrigin(
 *       playerPos.x - (this.viewPort.w / 2),
 *       playerPos.y - (this.viewPort.h / 2));
 * }
 * </pre>(end)
 * 
 * You can achieve parallax effects by panning one layer at a different rate to others. For example, changing
 * the origin of a background layer at a ratio to the main layer (this is most commonly done in a scene.process method):
 * 
 * process:function()
 * {
 *    myLayer.setOrigin(
 *       playerPos.x - (this.viewPort.w / 2),
 *       playerPos.y - (this.viewPort.h / 2));
 *
 *    // pan the background at 10% of the speed of the
 *    myBackgroundLayer.setOrigin(
 *       playerPos.x - (this.viewPort.w / 2) / 10,
 *       playerPos.y - (this.viewPort.h / 2) / 10);
 * }
 * </pre>(end)
 * 
 * When you have many layers tracking a single origin it can be a pain to keep them all up to date, so to make life easier
 * you can have a layer automatically track another layer's origin, including a ratio for parallax effects:
 * 
 * // Automatically keep the background layer's origin relative to myLayer's
 * // at a ratio of 10:1 (slow panning)
 * myBackgroundLayer.setOriginTrack( myLayer, 10 );
 * (end)
 */
h5c3.Layer = h5c3.Base.extend('h5c3.Layer', {},
    /** Interface: h5c3.Layer.prototype */
    {
        /** Name of the layer */
        name:null,
        /** whether the layer is presently paused */
        paused:false,
        /** whether the layer is active (isActive should be used over this as it also checks whether
         * the scene is active */
        active:false,
        /** the scene this layer is within */
        scene:null,
        /** draw order of this layer, lower draws first (use setZIndex method to change in order to update the scene) */
        zIndex:0,
        /** current origin track -- layer's origin will automatically match the origin of another layer */
        originTrack:null,
        /** ratio of origin tracking on X */
        originTrackXRatio:1,
        /** ratio of origin tracking on Y */
        originTrackYRatio:1,

        /**
         * World coordinate origin for this layer
         */
        origin:null,

        /**
         * @constructs h5c3.Layer
         * Parameters:  String scene Name of the scene that this layer belongs to
         * Parameters:  String name Name you want to give the layer
         * Parameters:  Number zIndex Draw order for this layer within it's scene (lower draws earlier)
         */
        init:function (config)
        {
            this._super();

            this.scene = config.scene;
            this.name = config.name;
            this.origin = h5c3.Point.create(0, 0);
            this._worldPos = h5c3.Point.create(0, 0);
            this._screenPos = h5c3.Point.create(0, 0);
            this.zIndex = $CHK(config.zIndex, 0);
            this.originTrack = null;
            this.originTrackXRatio = 0;
            this.originTrackYRatio = 0;
        },

        /**
         * Returns: String A nice string representation of the layer
         */
        toString:function ()
        {
            return '' + this.name + ' (origin: ' + this.origin + ', zIndex: ' + this.zIndex + ')';
        },

        release:function ()
        {
            this.origin.release();
        },

        /**
         * Returns: Boolean Is this layer active, and is it within a scene that is active
         */
        isActive:function ()
        {
            if (this.scene != null)
                if (!this.scene.active) return false;
            return this.active;
        },

        /**
         * Make this layer active
         */
        setActive:function ()
        {
            this.scene.setLayerActive(this);
        },

        /**
         * Make this layer inactive
         */
        setInactive:function ()
        {
            this.scene.setLayerInactive(this);
        },

        /**
         * Change the z order drawing for this layer (lower draws earlier)
         * Parameters:  Number z index as a value > 0
         */
        setZIndex:function (z)
        {
            this.zIndex = z;
            if (this.scene)
                this.scene.sortLayers();
        },

        _worldPos:null, // cached temp

        /**
         * Gets the world position of a screen position.
         * Parameters:  pos {h5c3.Point} World position of this layer (cached, so you don't need to release it)
         */
        worldPos:function (pos)
        {
            this._worldPos.x = pos.x + this.origin.x;
            this._worldPos.y = pos.y + this.origin.y;
            return this._worldPos;
        },

        /**
         * Parameters:  Number x X position in world co-ordinates
         * Returns: Number X position relative to the screen (based on the layer's current origin and the viewport
         * of the scene)
         */
        screenX:function (x)
        {
            return x + this.scene.viewPort.x - this.origin.x;
        },

        /**
         * Parameters:  Number y Y position in world co-ordinates
         * Returns: Number Y position relative to the screen (based on the layer's current origin and the viewport
         * of the scene)
         */
        screenY:function (y)
        {
            return y + this.scene.viewPort.y - this.origin.y;
        },

        /**
         * A layer uses whatever screen rectangle is defined by the scene it sits within,
         * so this is just a helper method (and makes it compliant for things like input checking)
         */
        getScreenRect:function ()
        {
			try {
				return this.scene.getScreenRect();
			} catch (err) {
				this.error("Scene property is NULL.");
				return null;
			}
        },

        /**
         * Draw the layer's scene. Use the scene's viewport and origin members to correctly position things.
         * Typical used for simple/custom layers with no entities or tiles.
         */
        draw:function ()
        {
        },

        /**
         * Sets tracking for this origin to always follow the origin of another layer. The ratio can be used
         * to parallax the layer.
         * Parameters:  {h5c3.Layer} trackLayer Layer to track
         * Parameters:  Number [xRatio] Ratio to track horizontally (i.e. trackLayer.origin.x * xRatio)
         * Parameters:  Number [yRatio] Ratio to track vertically (i.e. trackLayer.origin.y * yRatio)
         */
        setOriginTrack:function (trackLayer, xRatio, yRatio)
        {
            this.originTrack = trackLayer;
            this.originTrackXRatio = $CHK(xRatio, 1);
            this.originTrackYRatio = $CHK(yRatio, 1);
        },

        /**
         * Sets the origin world point of the top left of this layer.
         * Parameters:  Number x Set offset origin for the layer to x
         * Parameters:  Number y Set offset origin for the layer to y
         */
        setOrigin:function (x, y)
        {
            if (this.origin.x == Math.round(x) && this.origin.y == Math.round(y))
                return false;
            this.origin.x = Math.round(x);
            this.origin.y = Math.round(y);
            return true;
        },

        /**
         * Process the layer (if you overide this method make sure you call this._super();
         */
        process:function ()
        {
            if (this.originTrack)
            {
                this.setOrigin(this.originTrack.origin.x * this.originTrackXRatio,
                    this.originTrack.origin.y * this.originTrackYRatio);
            }
        },

        /**
         * Pauses this layer
         */
        pause:function ()
        {
            this.paused = true;
        },

        /**
         * Resumes all active layers
         */
        resume:function ()
        {
            this.paused = false;
        },

        /**
         * Called when the layer changes size (triggered by a browser or device resize event)
         * Parameters:  Number width New width of the underlying canvas
         * Parameters:  Number height New height of the underlying canvas
         */
        onResize:function (width, height)
        {
        },

        /**
         * Notification call when this layer has been added to a scene
         */
        onAddedToScene:function ()
        {
        },

        /**
         * Notification call when this layer has been removed from a scene
         */
        onRemovedFromScene:function ()
        {
        },

        /**
         * Fired when a bound event/action is triggered in the input system. Use bindAction
         * to set one up. Override this in your layer to do something about it.
         * Parameters:  String actionName The name of the action that happened
         * Parameters:  Object event Raw event object
         * Parameters:  {h5c3.Point} pos Position, such as a touch input or mouse position
         * Parameters:  {h5c3.Base} uiTarget the uiTarget where the action occurred
         */
        onAction:function (actionName, event, pos, uiTarget)
        {
        }
    });
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * Class:  h5c3.EntityLayer
 * 
 * [Extends <a href='h5c3.Layer'>h5c3.Layer</a>]
 * 
 * An entity layer is a container for <a href='h5c3.Entity'>entities</a> and systems.
 * See the <a href='../guides/entitysystems'>entity systems</a> guide for more information on how components,
 * entities and systems work together.
 * 
 * An entity layer is constructed similarly to a regular layer, except it also has a distinct 'world' size
 * which can be referenced by systems.
 * 
 * var entityLayer = new h5c3.EntityLayer('my entity layer', 10000, 10000);
 * (end)
 * The entity layer will automatically construct both an <a href='h5c3.EntityManager'>h5c3.EntityManager</a> and a
 * <a href='h5c3.SystemManager'>h5c3.SystemManager</a>.
 * 
 * Once you have an entity layer created you will need to add it to the scene:
 * 
 * myScene.addLayer(entityLayer);
 * (end)
 * You can then add entities to the layer:
 * 
 * // create a new entity (it will automatically be added to the
 * // entity layer specified in the constructor
 * var box = h5c3.Entity.create(entityLayer);
 * box.addComponent( h5c3.components.Rect.create({ color:#ffffff }) );
 * (end)
 * Entity layers are driven by systems, which must be added to the layer in order for anything to happen.
 * When you add components to an entity, you must also remember to add the corresponding system to the layer where
 * the entity exists. You can see which systems are required for components in the "used by" list in the component
 * API documentation.
 * 
 * To add a system, just construct it and call addSystem:
 * 
 * // fire up the systems we need for the game layer
 * entityLayer.addSystem(new h5c3.systems.Physics());
 * entityLayer.addSystem(new h5c3.systems.Particles());
 * entityLayer.addSystem(new h5c3.systems.Effects());
 * entityLayer.addSystem(new h5c3.systems.Render());
 * (end)
 *
 */
h5c3.EntityLayer = h5c3.Layer.extend('h5c3.EntityLayer',
    /** Interface: h5c3.EntityLayer */
    {
        /**
         * Creates an entity layer from a TMX layer XML data resource
         * Parameters:  String scene
         * Parameters:  String groupXML
         * Parameters:  {h5c3.EntityFactory} entityFactory
         */
        loadFromTMX:function (scene, groupXML, entityFactory)
        {
            var layerName = groupXML.getAttribute('name');
				n = new h5c3.EntityLayer(layerName);			// create the new layer and add it to the scene - when you have the name
				objs = groupXML.getElementsByTagName('object');
            
            scene.addLayer(n);

            // Parse object xml instances and turn them into entities
            // XML = <object type="EnemyShip" x="2080" y="256" width="32" height="32"/>
            for (var i = 0; i < objs.length; i++)
            {
                var objData = objs[i];
                var entityType = null;
                var x = parseInt(objData.getAttribute('x'));
                var y = parseInt(objData.getAttribute('y'));
                var w = parseInt(objData.getAttribute('width'));
                var h = parseInt(objData.getAttribute('height'));
                var shape = null;

                // either it's a polygon shape, or it's a rectangle (has w and h)
                var polygon = objData.getElementsByTagName("polygon");
                if (polygon.length > 0)
                {
                    var pointsString = polygon[0].getAttribute('points');
                    var points = [];
                    var pairs = pointsString.split(' ');
                    for (var j = 0; j < pairs.length; j++)
                    {
                        var nums = pairs[j].split(',');
                        points.push([parseInt(nums[0]), (parseInt(nums[1]))]);
                    }
                    shape = h5c3.Poly.create(x, y, points);
                }
                else
                {
                    // plain rectangle (just need the width and height)
                    shape = h5c3.Dim.create(w, h);
                }

                // parse parameters into options
                var options = {};
                var ps = objData.getElementsByTagName("properties");

                if (ps.length)
                {
                    var props = ps[0].getElementsByTagName("property");
                    for (var p = 0; p < props.length; p++)
                    {
                        var name = props[p].getAttribute("name");
                        var value = props[p].getAttribute("value");
                        options[name] = value;
                        if (name === 'entity')
                            entityType = value;
                    }
                }

                // create a new entity
                // ask the entity factory to create entity of this type and on this layer
                //
                if (entityType)
                    entityFactory.createEntity(n, entityType, x, y, 0, shape, options);
                else
                    this.warn('Entity loaded from map with no "entity" type property set. x=' + x + ' y=' + y)
            }
        }
    },
    /** Interface: h5c3.EntityLayer.prototype */
    {
        /** Size of the world */
        worldSize:null,

        /** Entity manager for this layer */
        entityManager:null,

        /** System manager for this layer */
        systemManager:null,

        /**
         * Parameters:  String scene Name of the scene that this layer belongs to
         * Parameters:  String name Name of the layer
         * Parameters:  Number worldSizeX X size of the world in pixels
         * Parameters:  Number worldSizeY Y size of the world in pixels
         * Parameters:  {h5c3.EntityFactory} entityFactory Optional factory class to use to construct entities (primarily
         * used by level loaders to create entities specified in map files.
         */
        init:function (config)
        {
            this._super(config);
			this.entityFactory = h5c3.entityFactory;
            this.systemManager = new h5c3.SystemManager(this);
            this.entityManager = new h5c3.EntityManager(this);

            this.worldSize = h5c3.Dim.create($CHK(config.worldSizeX, 10000), $CHK(config.worldSizeY, 10000));
        },

        /**
         * Sets the origin for the layer
         * Parameters:  Number x x origin to set
         * Parameters:  Number y y origin to set
         * Returns: Boolean Whether the origin actually changed (was it already set to the passed in origin)
         */
        setOrigin:function (x, y)
        {
            var didChange = this._super(x, y);
            if (didChange)
                this.systemManager.onOriginChange(x, y);
            return didChange;
        },

        /**
         * Get the entity manager for this layer
         * Returns: {h5c3.EntityManager}
         */
        getEntityManager:function ()
        {
            return this.entityManager;
        },

        /**
         * Get the system manager for this layer
         * Returns: {h5c3.SystemManager}
         */
        getSystemManager:function ()
        {
            return this.systemManager;
        },

        /**
         * Add a system to the layer
         * Parameters:  {h5c3.systems.System} system The system to add to the layer
         */
        addSystem:function (system)
        {
            this.systemManager.add(system, this.entityManager);
        },

        /**
         * Gets all the systems that can handle a given component type, such as 'physics'
         * Parameters:  String componentType Type of component to match
         * Returns: {h5c3.LinkedList} Linked list of systems that match
         */
        getSystemsByComponentType:function (componentType)
        {
            return this.systemManager.getByComponentType(componentType);
        },

        /**
         * Removes a system from this layer's system manager
         * Parameters:  {h5c3.systems.System} system The system to remove
         */
        removeSystem:function (system)
        {
            this.systemManager.remove(system);
        },

        /**
         * Master process for the layer
         */
        process:function ()
        {
            this._super();
            this.systemManager.processAll();
            this.entityManager.cleanup();
        },

        /**
         * Called automatically when the viewport is changing size.
         * Parameters:  Number width Width to resize to
         * Parameters:  Number height Height to resize to
         */
        onResize:function (width, height)
        {
            this.systemManager.onResize(width, height);
        }
    });
/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * Class:  h5c3.Sound
 * 
 * 
 * 
 * A sound resource can be loaded from a URI and played, including support for managing multichannel sound
 * (playing multiple sounds at once) and different formats used by different browsers.
 * 
 * In order to support all modern browsers, sounds need to be provided in both 'ogg' and 'mp3' formats. This is
 * becuase IE supports mp3 (but not ogg), chrome supports ogg and mp3, but safari and firefox only supports ogg. You
 * will need to create sound files into both ogg and mp3 to support all browsers.
 * 
 * To play a sound, you first need to load it from a URI:
 * 
 * // check if sound is enabled
 * if (h5c3.device.soundEnabled)
 * {
 *    // add the sound to the resource loader
 *    h5c3.loader.add(
 *       // construct a new sound named shotgun, loading formats for
 *       // ogg and mp3 (shotgun.mp3 and shotgun.ogg)
 *       // and setup to play up to 5 of these sounds simultaneously
 *       new h5c3.Sound('shotgun', 'sounds/shotgun', ['ogg', 'mp3'], 5));
 * }
 * (end)
 * 
 * Once you have the sound loaded you can play it:
 * 
 * // grab the sound resource from the resource loader
 * var shotgunSound = h5c3.loader.get('shotgun').resource;
 * // play the sound (without looping)
 * shotgunSound.play(false);
 * (end)
 * 
 * If the sound is looping, or it's a long sound you can stop it:
 * 
 * shotgunSound.stop();
 * (end)
 * You can adjust the volume of a sound:
 * 
 * // set the volume to 50%
 * shotgunSound.setVolume(0.5);
 * (end)
 * 
 * You can also change the starting position of sound or music using setPlayPosition:
 * 
 * // start half way through
 * shotgunSound.setPlayPosition( shotgunSound.getDuration() / 2 );
 * (end)
 */
h5c3.Sound = h5c3.Base.extend('h5c3.Sound', {},
    /** Interface: h5c3.Sound.prototype */
    {
        /** Array of the sound elements -- multichannel sound requires multiple element copies to play */
        sounds: [],
        /** Source URI for the sound resource */
        src:null,
        /** String name for the sound */
        name: null,
        /** Number of sounds loaded */
        numLoaded: 0,
        /** Whether the sound is loaded */
        loaded:false,
        /** Whether an error occured loading the sound */
        errored:false,
        /** Number of channels for the sound. No more than this number can be played at once */
        channels:1,
        /** Optional call back once the sound is loaded */
        onLoadCallback:null,
        /** Optional call back if the sound errors whilst loading */
        onErrorCallback:null,

        /**
         * Construct a new sound, if the resource loader has already start the sound will be immediately loaded.
         * Parameters:  String name Resource name (tag) you want to use
         * Parameters:  String src URI for the sound
         * Parameters:  Number channels Number of channels this sound can play at once
         * Parameters:  {Function} [onLoadCallback] Function to be called once the sound has been loaded (including all channels)
         * Parameters:  {Function} [onErrorCallback] Function to be called if the sound fails to load (on first error)
         */
        init:function (name, src, formats, channels, onLoadCallback, onErrorCallback)
        {
            this._super();
            this.name = name;
            this.channels = channels;

            // append an extension to the src attribute that matches the format with what the device can play
            var canplay = false;
            for (var i=0; i < formats.length; i++)
            {
                if (h5c3.device.canPlay(formats[i]))
                {
                    this.src = h5c3.loader.makeUrl(src + '.' + formats[i]);
                    canplay = true;
                    break; // we set the src based on the first type we find (in the order they are provided)
                }
            }

            if (canplay)
            {
                if (h5c3.loader.started) // load now if the loader has already been started
                    this.load(onLoadCallback, onErrorCallback);
            } else
                this.errored = true;
        },

        /**
         * Pauses the sound (on all channels)
         */
        pause: function()
        {
            if (!this.canPlay()) return;
            for (var i=0, len=this.sounds.length; i < len; i++)
                this.sounds[i].pause();
        },

        /**
         * Stop playing a sound (on all channels) -- actually just a synonym for pause
         */
        stop: function()
        {
            if (!this.canPlay()) return;
            this.pause();
        },

        /**
         * Volume to play the sound at for ALL channels
         * Parameters:  Number volume Volume as a range from 0 to 1 (0.5 is half volume)
         */
        setVolume: function(volume)
        {
            if (!this.canPlay()) return;
            for (var i=0, len=this.sounds.length; i < len; i++)
                this.sounds[i].volume = volume;
        },

        /**
         * Volume to play the sound at for ALL channels
         * Parameters:  Boolean loop Repeat until stopped?
         */
        setLoop: function(loop)
        {
            if (!this.canPlay()) return;
            for (var i=0, len=this.sounds.length; i < len; i++)
                this.sounds[i].loop = loop;
        },
		
        /**
         * Gets the duration of the sound in seconds
         * Returns: Number The duration in seconds
         */
        getDuration: function()
        {
            if (!this.canPlay()) return -1;
            return this.sounds[0].duration;
        },

        /**
         * Sets the playback rate of the sound where 0 is not playing and 2 is double speed. Negative values cause
         * the sound to play backwards.
         * WARNING: Only currently supported by Safari and Chrome.
         * Parameters:  Number r The speed to play the sound at
         */
        setPlaybackRate:function (r)
        {
            if (!this.canPlay()) return;
            for (var i = 0, len = this.sounds.length; i < len; i++)
                this.sounds[i].playbackRate = r;
        },

        /**
         * Start playing the sound at the specified time (instead of 0)
         * Parameters:  Number time time (in seconds to start at)
         */
        setPlayPosition: function(time)
        {
            if (!this.canPlay()) return;
            for (var i=0, len=this.sounds.length; i < len; i++)
                this.sounds[i].currentTime = time;
        },

        /**
         * Load a sound. If the game hasn't started then the sound resource
         * will be added to the resource manager's queue.
         * Parameters:  {Function} onLoadCallback function to call once the sound is loaded
         * Parameters:  {Function} onLoadCallback function to call if the sound errors
         */
        load:function (onLoadCallback, onErrorCallback)
        {
            // user customized callbacks
            this.onLoadCallback = onLoadCallback;
            this.onErrorCallback = onErrorCallback;

            if (this.loaded && onLoadCallback)
            {
                this.onLoadCallback(this);
                return;
            }
            // load up multiple copies of the sound, one for each channel
            for (var i=0; i < this.channels; i++)
            {
                var n = new Audio();
                n.preload = 'auto';

                // setup event handlers for this class -- we'll call the callbacks from there
                n.addEventListener("canplaythrough", this.onLoad.bind(this), false);
                n.addEventListener("error", this.onError.bind(this), false);
                n.onerror = this.onError.bind(this);
                n.onload = this.onLoad.bind(this);
                n.src = this.src;
                n.load();
                this.sounds.push(n);

                if (h5c3.device.isAppMobi)
                    // force an onload for appmodi -- since it wont create one and the load is almost instant
                    this.onLoad(null);
            }
        },

        /**
         * Force this sound to be reloaded
         */
        reload:function ()
        {
            this.loaded = false;
            this.errored = false;
            this.load();
        },

        onLoad:function (ev)
        {
            this.numLoaded++;

            // remove the event listener so we don't get this happening multiple times
            if (!h5c3.device.isAppMobi)
                ev.target.removeEventListener("canplaythrough", this.onLoad.bind(this), false);

            if (this.numLoaded == this.channels)
            {
                this.loaded = true;
                this.errored = false;
                if (this.onLoadCallback)
                    this.onLoadCallback(this);
            }
        },

        onError:function ()
        {
            this.errored = true;
            this.loaded = false;
            if (this.onErrorCallback)
                this.onErrorCallback(this);
        },

        /**
         * Plays a sound
         * Parameters:  Boolean loop True if you want the sound to just keep looking.
         * Returns: Object Sound element that was played
         */
        play:function(loop)
        {
            if (!this.canPlay()) return null;

            // find a free channel and play the sound (if there is one free)
            for (var i=0, len=this.sounds.length; i < len; i++)
            {
                if (this.sounds[i].paused || this.sounds[i].ended)
                {
                    if (loop)
                        this.sounds[i].loop = true;
                    this.sounds[i].play();
                    return this.sounds[i];
                }
            }

            // no sounds were free, so we just do nothing
            this.warn(this.name + ' - all channels are in use');
            return null;
        },

        /**
         * Returns: Boolean true if the sound can be played
         */
        canPlay: function()
        {
            return (this.loaded && h5c3.device.soundEnabled && !this.errored);
        }
    });

/**
 * SoundFactory -- for creating sounds (mostly just an interface class you extend from to create an sound factory).
 */
h5c3.SoundFactory = h5c3.Factory.extend('h5c3.SoundFactory',
    { },
    {
		init:function() 
		{
			this._super('Sound');
		},
		
        /**
         * Called by the sound loader
         * Parameters:  String name String Name of the sound to create
         * Parameters:  Object options Properties assigned to the object
         */
		create:function(name,options)
		{
			$CHK(options,{volume:0.5,loop:false});
			var obj = h5c3.loader.get(name).resource;
			obj.setVolume(options.volume);
			obj.setLoop(options.loop);
			return this.add(name,obj);
		},
		
		play:function(name,options)
		{
			this.use(name,options).play(options.loop);
		}		
    });
/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * Class:  h5c3.Sprite
 * 
 * [Extends <a href='h5c3.Sprite'>h5c3.Pooled</a>]
 * 
 * Sprites are instances of a sprite sheet used for rendering.
 * 
 * To create a sprite, pass a sprite sheet into the constructor:
 * 
 * var zombieSprite = new h5c3.Sprite( zombieSpriteSheet );
 * (end)
 * You can then use setAnimation to select an animation from the sheet:
 * 
 * zombieSprite.setAnimation('attacking right');
 * (end)
 * To draw the sprite, use the draw method:
 * 
 * zombieSprite.draw(h5c3.device.ctxGame, 100, 100);
 * (end)
 * To cycle animations, call update:
 * 
 * zombieSprite.update(h5c3.device.elapsed);
 * (end)
 * 
 * Check the <a href='http://playcraftlabs.com/develop/guide/spritesandanimation'>sprites and animation guide</a> for
 * more information and features.
 */
h5c3.Sprite = h5c3.Pooled.extend('h5c3.Sprite',
    /** Interface: h5c3.Sprite */
    {
        /**
         * Construct a new sprite object by acquiring it from the free pool and configuring it
         * Parameters:  {h5c3.SpriteSheet} spriteSheet Sprite sheet to use
         * Returns: {h5c3.Sprite} A sprite object
         */
        create:function (spriteSheet)
        {
            var n = this._super();
            n.config(spriteSheet);
            return n;
        }
    },
    /** Interface: h5c3.Sprite.prototype */
    {
        /** Current animation frame */
        currentFrame:0,
        /** Current animation object reference */
        currentAnim:null,
        /** h5c3.SpriteSheet used by this sprite */
        spriteSheet:null,
        /** speed different this instance uses, versus the animation speed */
        animSpeedOffset:0,
        /** Name of the current animation */
        currentAnimName:null,
        /** Alpha level */
        alpha:1,
        /** X-scale for drawing */
        scaleX: 1,
        /** Y-scale for drawing */
        scaleY: 1,
        /** Whether the sprite is active; false = not drawn or updated */
        active:true,
        /** Whether the sprite is held. Won't progress on animation, but will still draw */
        hold: false,
        /** Number of times the animation has played */
        loopCount:0,
        /** Current composite drawing operation to use */
        compositeOperation: null,

        _acDelta: 0,

        /**
         * Constructs a new sprite using the sprite sheet
         * Parameters:  {h5c3.SpriteSheet} spriteSheet Spritesheet to use
         */
        init:function(spriteSheet)
        {
            this._super();
            this.config(spriteSheet);
        },

        /**
         * Configure the sprite object with a given sprite sheet - typically called by init or create
         * Parameters:  {h5c3.SpriteSheet} spriteSheet Spritesheet to configure with
         */
        config: function(spriteSheet)
        {
            this.spriteSheet = $CHK(spriteSheet, null);
            if (this.spriteSheet)
                this.reset();
        },

        /**
         * Clear the sprite back to a starting state (using first animation)
         */
        reset:function ()
        {
            this.currentFrame = 0;
            this.alpha = 1;
            this.loopCount = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.active = true;
            this.hold = false;
            if (this.spriteSheet.animations.size() > 0)
            {
                this.currentAnim = this.spriteSheet.animations.get(this.spriteSheet.animations.keys()[0]);
                this.currentFrame = 0;

            } else
                this.currentAnim = null;
        },

        /**
         * Change the sprite sheet
         * Parameters:  {h5c3.SpriteSheet} spriteSheet Sprite sheet to change to
         */
        setSpriteSheet: function(spriteSheet)
        {
            this.spriteSheet = spriteSheet;
            this.reset();
        },

        /**
         * Change the drawing scale of this sprite instance
         * Parameters:  Number scaleX x-scale to use
         * Parameters:  Number scaleY y-scale to use
         */
        setScale: function(scaleX, scaleY)
        {
            this.scaleX = scaleX;
            this.scaleY = scaleY;
        },

        /**
         * Sets the composite drawing operation for this sprite. Set to null to clear it back to the default.
         * Parameters:  String o Composite drawing operation to use
         */
        setCompositeOperation: function(o)
        {
            this.compositeOperation = o;
        },

        /**
         * Draw the sprite using the given context at a given location, and a certain direction
         * Parameters:  {Context} ctx Context to draw the sprite image on
         * Parameters:  Number x x-position
         * Parameters:  Number y y-position
         * Parameters:  Number dir Direction to draw it at
         */
        draw:function (ctx, x, y, dir)
        {
            if (this.alpha != 1)
                this.spriteSheet.alpha = this.alpha;
            if (this.compositeOperation != null)
                this.spriteSheet.setCompositeOperation(this.compositeOperation);
            if (this.scaleX != 1 || this.scaleY != 1)
                this.spriteSheet.setScale(this.scaleX, this.scaleY);
            this.spriteSheet.draw(ctx, this, x, y, dir);
            if (this.scaleX != 1 || this.scaleY != 1)
                this.spriteSheet.setScale(1, 1);
            if (this.alpha != 1)
                this.spriteSheet.alpha = 1;
            if (this.compositeOperation != null)
                this.spriteSheet.setCompositeOperation('source-over');
        },

        /**
         * Draws a single frame of the current sprite sheet
         * Parameters:  {Context} ctx Context to draw the sprite image on
         * Parameters:  Number frameX The frame to draw (x)
         * Parameters:  Number frameY The frame to draw (y)
         * Parameters:  Number x x-position
         * Parameters:  Number y y-position
         * Parameters:  Number angle Direction to draw it at
         */
        drawFrame: function(ctx, frameX, frameY, x, y, angle)
        {
            if (this.alpha != 1)
                this.spriteSheet.alpha = this.alpha;
            if (this.scaleX != 1 || this.scaleY != 1)
                this.spriteSheet.setScale(this.scaleX, this.scaleY);
            if (this.compositeOperation != null)
                this.spriteSheet.setCompositeOperation(this.compositeOperation);
            this.spriteSheet.drawFrame(ctx, frameX, frameY, x, y, angle);
            if (this.scaleX != 1 || this.scaleY != 1)
                this.spriteSheet.setScale(1, 1);
            if (this.alpha != 1)
                this.spriteSheet.alpha = 1;
            if (this.compositeOperation != null)
                this.spriteSheet.setCompositeOperation('source-over');
        },

        /**
         * Updates the sprite animation based on the time elapsed
         * Parameters:  Number elapsed Amount of time to move the animation forward by
         */
        update:function (elapsed)
        {
            if (this.currentAnim == null || !this.active || this.hold) return;

            // call the spritesheet class to actually do a sprite update, keep in mind though that the spritesheet
            // doesn't retain any present state, it just sets the state object, which in this case is passed in as the
            // this param -- this is so spritesheets (and the underlying image) may be used by more than one sprite
            // at the same time
            this.spriteSheet.update(this, elapsed);
        },

        /**
         * Change this sprites animation. Animation frames always start from 0 again.
         * Parameters:  String name Key name of the animation to switch to.
         * Parameters:  Number speedOffset allows you to modify the animation speed for this instance of a sprite
         * Parameters:  Number force Restart the animation, even if this is the currently playing animation (default is true)
         */
        setAnimation:function (name, speedOffset, force)
        {
            var f = $CHK(force, true);
            if (!f)
                if (this.currentAnim.name === name) return;

            this.currentAnim = this.spriteSheet.animations.get(name);
            this.currentFrame = 0;
            this.loopCount = 0;
            this.active = true;
            this.held = false;
            this.animSpeedOffset = $CHK(speedOffset, 0);
            this.currentAnimName = name;
        },

        /**
         * Changes the speed of animation by the given offset. Good for randomizing when you have lots of the same
         * sprite on-screen
         * Parameters:  Number speedOffset Time in ms to offset by (can be negative to slow an animation down)
         */
        setAnimationSpeedOffset: function(speedOffset)
        {
            this.animSpeedOffset = speedOffset;
        },

        /**
         * Changes the current frame
         * Parameters:  Number frame Frame to change to
         */
        setCurrentFrame: function(frame)
        {
            this.currentFrame = frame;
        },

        /**
         * Returns the name of the current animation
         * Returns: String Current animation name
         */
        getAnimation:function ()
        {
            return this.currentAnimName;
        },

        /**
         * Changes the draw alpha for the sprite
         * Parameters:  Number a Alpha level to change to (0.5 = 50% transparent)
         */
        setAlpha:function (a)
        {
            this.alpha = a;
        },

        /**
         * Adds to the current alpha level
         * Parameters:  Number a Amount to add
         */
        addAlpha:function (a)
        {
            this.alpha += a;
            if (this.alpha > 1) this.alpha = 1;
        },

        /**
         * Subtracts from the current alpha level
         * Parameters:  Number a Amount to subtract
         */
        subAlpha:function (a)
        {
            this.alpha -= a;
            if (this.alpha < 0) this.alpha = 0;
        }
    });

/**
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * Class:  h5c3.SpriteSheet
 * 
 * 
 * 
 * Spritesheets are a tool used to configure an image into being a sprite. A spritesheet defines the frame size,
 * source placement and the animations that make up a sprite.
 * 
 * To create an on-screen sprite you need to setup a sprite sheet template, then construct a h5c3.Sprite object
 * using the sheet.
 * 
 * To create a sprite sheet you must first load an image resource using the resource loader. You can then use that
 * to construct a sprite sheet:
 * 
 * 
 * // grab the zombie image resource from the loader
 * var zombieImage = h5c3.loader.get('zombie').resource;
 *
 * // create the spritesheet
 * var zombieSpriteSheet = new h5c3.SpriteSheet(
 *      { image:zombieImage, frameWidth:80, frameHeight:72 });
 * (end)
 * The sprite sheet class is pretty flexible in how you define the frames. You can actually just specify the number of
 * frames wide and high the sheet is and it will figure our the frame size for you.
 * 
 * <h5>Adding Animations</h5>
 * To define the walk animation for the zombie, you just use addAnimation:
 * 
 * zombieSpriteSheet.addAnimation({ name:'walking right', frameCount:16, time:1400 });
 * (end)
 * Here we've defined an animation with the tag 'walking right', a frame count of 16 and a total animation time of 1400.
 * 
 * Notice we didn't say where in the image the frames start, that's because the default starting frame is 0 for both
 * x and y.
 * 
 * To specify a starting frame use the frameX and frameY options.
 * 
 * zombieSpriteSheet.addAnimation({ name:'attacking right', frameX: 0, frameY: 2, frameCount:16, time:500 });
 * (end)
 * In this case, the attack animation starts at frame 0 on the x-axis, and the 3rd frame down. It is then 16 frames
 * long.
 * <h5>Making Sprites</h5>
 * To make an actual sprite you can draw on the screen, use the <a href='h5c3.Sprite'>h5c3.Sprite</a> class.
 */
h5c3.SpriteSheet = h5c3.Base.extend('h5c3.SpriteSheet',
    /** Interface: h5c3.SpriteSheet */
    {},
    /** Interface: h5c3.SpriteSheet.prototype */
    {
        /** The source h5c3.Image resource */
        image:null,
        /** width of each frame (read-only) */
        frameWidth:0,
        /** height of each frame (read-only) */
        frameHeight:0,
        /** number of frames wide the sheet is (read-only) */
        framesWide:1,
        /** number of frames high the sheet is (read-only) */
        framesHigh:1,
        /** X scale to draw the image at */
        scaleX:1,
        /** Y scale to draw the image at */
        scaleY:1,
        /** source x position where frames start in the image */
        sourceX:0,
        /** source y position where frames start in the image */
        sourceY:0,
        /** alpha level to draw the image at */
        alpha:1,
        /** whether rotation should be used, or ignored when rendering frames */
        useRotation:false,
        /** composite drawing operation */
        compositeOperation:null,
        /** total number of frames (read-only) */
        totalFrames:0,
        /** Hashtable of animations keyed by animation name */
        animations:null,

        _frameXPos:null,
        _frameYPos:null,

        /**
         * Constructs a new sprite sheet with options. You can use either framesWide or frameWidth, and the logical
         * default will be assumed. Frame width is assumed to be image.width / framesWide or frames wide will default to
         * image.width/frameWidth.
         * Parameters:  Number options.framesWide Number of frames wide the sprite sheet is
         * Parameters:  Number options.framesHigh Number of frames high the sprite sheet is
         * Parameters:  Number options.frameHeight Height of each frame in pixels
         * Parameters:  Number options.frameWidth Width of each frame in pixels
         * Parameters:  Number options.scaleX X Scale to draw the image at
         * Parameters:  Number options.scaleY Y Scale to draw the image at
         * Parameters:  Number options.sourceX Source x position in the image
         * Parameters:  Number options.sourceY Source y position in the image
         * Parameters:  Number options.alpha Alpha level to draw the image at (0.5 is 50% visible)
         * Parameters:  Boolean options.useRotation True means the canvas rotation will be used to draw images as an angle
         */
        init:function (options)
        {
            this._super();

            if ($CHK(options.image))
                this.image = options.image;
            else
                throw "No image supplied";

            if (!$VLD(options.frameWidth))
            {
                if ($VLD(options.framesWide) && options.framesWide > 0)
                    this.frameWidth = this.image.width / options.framesWide;
                else
                    this.frameWidth = this.image.width;
            } else
                this.frameWidth = options.frameWidth;

            if (!$VLD(options.frameHeight))
            {
                if ($VLD(options.framesHigh) && options.framesHigh > 0)
                    this.frameHeight = this.image.height / options.framesHigh;
                else
                    this.frameHeight = this.image.height;
            } else
                this.frameHeight = options.frameHeight;

            this.framesWide = $CHK(options.framesWide, this.image.width / this.frameWidth);
            this.framesHigh = $CHK(options.framesHigh, this.image.height / this.frameHeight);
            this.scaleX = $CHK(options.scaleX, 1);
            this.scaleY = $CHK(options.scaleY, 1);
            this.sourceX = $CHK(options.sourceX, 0);
            this.sourceY = $CHK(options.sourceY, 0);
            this.alpha = $CHK(options.alpha, 1);
            this.useRotation = $CHK(options.useRotation, true);

            this.totalFrames = this.framesWide * this.framesHigh;
            this.animations = new h5c3.Hashtable();

            // pre-calcs for speed
            this._frameXPos = [];
            for (var fx = 0; fx < this.framesWide; fx++)
                this._frameXPos.push(fx * this.frameWidth);
            this._frameYPos = [];
            for (var fy = 0; fy < this.framesHigh; fy++)
                this._frameYPos.push(fy * this.frameHeight);
        },

        /**
         * Defines an animation
         * Parameters:  String options.name A descriptive name for the animation (required)
         * Parameters:  Number options.frameX The starting frame X position (in frames, not pixels) defaults to 0
         * Parameters:  Number options.frameY The starting frame Y position (in frames, not pixels) defaults to 0
         * Parameters:  Number options.frames A 2d-array of frame numbers ([ [0, 0], [0, 1] ]) , note these are OFFSET by frameX and frameY. Use null
         * to automatically sequence through all frames across the image, or specify frame count
         * Parameters:  Number options.frameCount number of frames to use, starting from frameX, frameY and stepping forward across the spritesheet
         * Parameters:  Number options.time Seconds to loop through entire sequence defaults to 1000
         * Parameters:  Number options.loops Number of times to cycle through this animation, use 0 to loop infinitely (defaults to 0)
         * Parameters:  Boolean options.holdOnEnd Whether to hold the last frame when the animation has played through
         * Parameters:  Number options.scaleX X scaling to apply (negative values reverse the image)
         * Parameters:  Number options.scaleY Y scaling to apply (negative values reverse the image)
         * Parameters:  Number options.framesWide Number of frames to go across before stepping down
         * Parameters:  Number options.framesHigh Number of frames down
         */
        addAnimation:function (options)
        {
            if (!$VLD(options.name)) throw "Animation requires a name for reference";

            options.frameX = $CHK(options.frameX, 0);
            options.frameY = $CHK(options.frameY, 0);
            options.directions = $CHK(options.directions, 1);
            options.time = $CHK(options.time, 1000);
            options.loops = $CHK(options.loops, 0);
            options.holdOnEnd = $CHK(options.holdOnEnd, false);
            options.dirAcross = $CHK(options.dirAcross, false);
            options.scaleX = $CHK(options.scaleX, 1);
            options.scaleY = $CHK(options.scaleY, 1);
            options.offsetX = $CHK(options.offsetX, 0);
            options.offsetY = $CHK(options.offsetY, 0);
            options.framesWide = $CHK(options.framesWide, this.framesWide);
            options.framesHigh = $CHK(options.framesHigh, this.framesHigh);
            options.frameCount = $CHK(options.frameCount, this.framesWide * this.framesHigh);

            if (options.frameCount == 0)
            {
                options.frameCount = $CHK(options.frameCount, this.framesWide * this.framesHigh);
            }

            // no frames specified, create the frames array automagically
            if (!$VLD(options.frames))
            {
                var frameStart = options.frameX + (options.frameY * options.framesWide);
                options.frames = [];
                // use the frameCount and frameX, frameY
                for (var frame = frameStart; frame < frameStart + options.frameCount; frame++)
                {
                    options.frames.push([frame % options.framesWide, Math.floor(frame / options.framesWide) ]);
                }
            }

            options.frameRate = (options.time / options.frames.length);
            options.degreesPerDir = (360 / options.directions);

            this.animations.put(options.name, options);
        },

        /**
         * Change this sprites animation. Animation frames always start from 0 again.
         * Parameters:  name Key name of the animation to switch to.
         */
        setAnimation:function (state, name, speedOffset)
        {
            state.currentAnim = this.animations.get(name);
            if (state.currentAnim == null)
                this.warn('attempt to set unknown animation [' + name + ']');
            state.currentFrame = 0;
            state.held = false;
            state.animSpeedOffset = $CHK(speedOffset, 0);
        },

        /**
         * Checks if this sheet has an animation of a given name
         * Parameters:  String name Animation name
         * Returns: Boolean true if the animation exists on this sheet
         */
        hasAnimation:function (name)
        {
            return (this.animations.get(name) != null);
        },

        /**
         * Sets the scale to draw the image at
         * Parameters:  Number scaleX Value to multiply the image width by (e.g. width * scaleX)
         * Parameters:  Number scaleY Value to multiply the image height by (e.g. height * scaleX)
         */
        setScale:function (scaleX, scaleY)
        {
            this.scaleX = scaleX;
            this.scaleY = scaleY;
        },

        /**
         * Sets the componsite drawing operation for this sprite sheet. Set to null to clear it back to the default.
         * Parameters:  String o Composite drawing operation
         */
        setCompositeOperation:function (o)
        {
            this.compositeOperation = o;
        },

        dirTmp:0,

        /**
         * Draw a sprite using a frame from the sprite sheet
         * Parameters:  {h5c3.Sprite} state Sprite to draw
         * Parameters:  Number x On-screen x position
         * Parameters:  Number y On-screen y position
         * Parameters:  Number dir The facing direction (in degrees)
         */
        draw:function (ctx, state, x, y, dir)
        {
            if (!this.image.loaded || state == null || !state.active) return;

            if (this.scaleX != 1 || this.scaleY != 1)
                this.image.setScale(this.scaleX, this.scaleY);

            if (state.alpha != 1)
                this.image.alpha = state.alpha;

            if (this.compositeOperation != null)
                this.image.setCompositeOperation(this.compositeOperation);

            if (state.currentAnim == null)
            {
                if (this.scaleX != 1 || this.scaleY != 1)
                    this.image.setScale(this.scaleX, this.scaleY);
                this.image.draw(ctx, this.sourceX, this.sourceY,
                    Math.round(x), Math.round(y), this.frameWidth, this.frameHeight,
                    this.useRotation ? dir : 0);
            } else
            {
                var fx = 0;
                var fy = 0;

                if (state.currentAnim.scaleX != 1 || state.currentAnim.scaleY != 1 || this.scaleX != 1 || this.scaleY != 1)
                    this.image.setScale(state.currentAnim.scaleX * this.scaleX, state.currentAnim.scaleY * this.scaleY);

                if (this.useRotation)
                {
                    // rotation/direction drawing is done using canvas rotation (slower)
                    fx = state.currentAnim.frames[state.currentFrame][0];
                    fy = state.currentAnim.frames[state.currentFrame][1];

                    this.image.draw(ctx,
                        this.sourceX + this._frameXPos[fx],
                        this.sourceY + this._frameYPos[fy],
                        state.currentAnim.offsetX + h5c3.Math.round(x),
                        state.currentAnim.offsetY + h5c3.Math.round(y), this.frameWidth, this.frameHeight, dir);
                }
                else
                {
                    // rely on the sprite images to draw rotation

                    this.dirTmp = Math.round(dir / state.currentAnim.degreesPerDir);

                    if (this.dirTmp > state.currentAnim.directions - 1) this.dirTmp = 0; // accommodate the edge case causing by rounding back

//                if (!state.currentAnim.dirAcross)
//                {
//                    fx = this.dirTmp + state.currentAnim.frameX;
//                    fy = state.currentAnim.frames[state.currentFrame][0] + state.currentAnim.frameY;
//                } else
                    {
                        fx = state.currentAnim.frames[state.currentFrame][1] + this.dirTmp;
                        fy = state.currentAnim.frames[state.currentFrame][0];
                    }

                    if (state.currentAnim.directions == 1)
                    {
                        fy = state.currentAnim.frames[state.currentFrame][1];
                        fx = state.currentAnim.frames[state.currentFrame][0];
                    }

                    this.image.draw(ctx,
                        this.sourceX + this._frameXPos[fx], this.sourceY + this._frameYPos[fy],
                        state.currentAnim.offsetX + h5c3.Math.round(x),
                        state.currentAnim.offsetY + h5c3.Math.round(y),
                        this.frameWidth, this.frameHeight);

                    if (state.currentAnim.scaleX != 1 || state.currentAnim.scaleY != 1 || this.scaleX != 1 || this.scaleY != 1)
                        this.image.setScale(state.currentAnim.scaleX * this.scaleX, state.currentAnim.scaleY * this.scaleY);
                }

            }

            // restore scaling (as images can be used amongst spritesheets, we need to be nice)
            if (this.image.scaleX != 1 || this.image.scaleY != 1)
                this.image.setScale(1, 1);

            // set the alpha back to normal
            if (state.alpha != 1)
                this.image.alpha = 1;

            if (this.compositeOperation != null)
                this.image.setCompositeOperation('source-over');

        },

        /**
         * Draw a single frame from the sprite sheet
         * Parameters:  {Context} ctx Device context to draw on
         * Parameters:  Number frameX The x-pos of the frame to draw
         * Parameters:  Number frameY The y-pos of the frame to draw
         * Parameters:  Number x x-pos to draw on the target context
         * Parameters:  Number y y-pos to draw on the target context
         * Parameters:  Number angle Angle to draw the frame at
         */
        drawFrame:function (ctx, frameX, frameY, x, y, angle)
        {
            if (!this.image.loaded) return;
            if (this.alpha < 1) ctx.globalAlpha = this.alpha;

            if (this.scaleX != 1 || this.scaleY != 1)
                this.image.setScale(this.scaleX, this.scaleY);

            if (this.compositeOperation != null)
                this.image.setCompositeOperation(this.compositeOperation);

            this.image.draw(ctx,
                this.sourceX + this._frameXPos[frameX],
                this.sourceY + this._frameYPos[frameY], h5c3.Math.round(x), h5c3.Math.round(y),
                this.frameWidth, this.frameHeight, angle);

            if (this.image.scaleX != 1 || this.image.scaleY != 1)
                this.image.setScale(1, 1);
            if (this.alpha < 1) ctx.globalAlpha = 1;
            if (this.compositeOperation != null)
                this.image.setCompositeOperation('source-over');
        },

        /**
         * Draw all the frames of a sprite sheet according to the image and parameters you set it
         * up with. Primarily this is intended for debugging or sprite testing.
         * Parameters:  {Context} ctx Context to draw on
         * Parameters:  Number x Starting x position to draw on the given context
         * Parameters:  Number y Starting y position to draw on the given context
         */
        drawAllFrames:function (ctx, x, y)
        {
            for (var fy = 0; fy < this.framesHigh; fy++)
                for (var fx = 0; fx < this.framesWide; fx++)
                    this.drawFrame(ctx, fx, fy, x + (fx * this.frameWidth), y + (fy * this.frameHeight));
        },

        /**
         * Update the sprite based on the current animation, frame and timing. Typically called automatically
         * from the sprite class
         * Parameters:  {h5c3.Sprite} state Sprite to update
         * Parameters:  Number delta Amount of time to move forward by
         */
        update:function (state, delta)
        {
            if (state.currentAnim == null || !state.active || state.held) return;

            // see if enough time has past to increment the frame count
            if (state.currentAnim.frames.length <= 1) return;

            if (state._acDelta > (state.currentAnim.frameRate + state.animSpeedOffset))
            {
                state.currentFrame++;
                if (state.currentFrame >= state.currentAnim.frames.length)
                {
                    state.loopCount++;
                    // checked if we have looped the animation enough times
                    if (state.currentAnim.loops) // 0 means loop forever
                        if (state.loopCount >= state.currentAnim.loops)
                        {
                            if (state.currentAnim.holdOnEnd)
                            {
                                state.held = true;
                                if (state.currentFrame) state.currentFrame--;
                            }
                            else
                                state.active = false;
                        }

                    if (!state.held) state.currentFrame = 0; // take it from the top
                }
                state._acDelta -= state.currentAnim.frameRate;
            } else
            {
                state._acDelta += delta;
            }
        },

        /**
         * Clear the sprite by nulling the image and animations
         */
        reset:function ()
        {
            this.image = null;
            this.animations = null;
        }

    });

/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * Playcraft Engine - (C)2012 Playcraft Labs, Inc.
 * See licence.txt for details
 */

/**
 * Class:  h5c3.Image
 * 
 * 
 * 
 * A basic image resource. You can use this class to acquire images (loaded from a URI) and then draw them on-screen
 * with effects such as scaling, rotation, compositing and alpha.
 */
h5c3.Image = h5c3.Base.extend('h5c3.Image',
    /** Interface: h5c3.Image */
    {},
    /** Interface: h5c3.Image.prototype */
    {
        /** Width of the image; set upon loading, can be overridden after load */
        width:0,
        /** Height of the image; set upon loading, can be overridden after load */
        height:0,
        /** Source image element */
        image:null,
        /** Source URI used to load the image */
        src:null,
        /** Resource name */
        name:null,
        /** Whether the image has been loaded yet */
        loaded:false,
        /** Optional function called after this image loads */
        onLoadCallback:null,
        /** Optional function called if this image fails to load */
        onErrorCallback:null,
        /** x-scale to draw the image at */
        scaleX:1,
        /** y-scale to draw the image at */
        scaleY:1,
        /** alpha level to draw the image at (0.5=50% transparent) */
        alpha:1,
        /** Composite operation to draw the image with, e.g. 'lighter' */
        compositeOperation:null,

        /**
         * Constructs a new h5c3.Image. If the h5c3.loader has already started then the image will be
         * immediately loaded, otherwise it will wait for the resource loader to handle the loading.
         * Parameters:  String name Name to give the image resource
         * Parameters:  String src URI for the image
         * Parameters:  {Function} onLoadCallback Function to be called once the image has been loaded
         * Parameters:  {Function} onErrorCallback Function to be called if the image fails to load
         */
        init:function (name, src, onLoadCallback, onErrorCallback)
        {
            this._super();

            this.name = name;
            this.src = h5c3.loader.makeUrl(src);
            this.image = new Image();

            this.onLoadCallback = onLoadCallback;
            this.onErrorCallback = onErrorCallback;

            // setup our own handlers
            this.image.onload = this._onLoad.bind(this);
            this.image.onerror = this._onError.bind(this);
            this.scaleX = 1;
            this.scaleY = 1;
            this.alpha = 1;

            if (h5c3.loader.started) // load now if the loader has already been started
                this.load();
        },

        /**
         * Change the alpha level to draw the image at (0.5 = 50% transparent)
         * Parameters:  Number a Alpha level
         */
        setAlpha:function (a)
        {
            this.alpha = a;
        },

        /**
         * Change the x and/or y scale to draw the image at.
         * Parameters:  Number scaleX x-scale to draw at (2 = 200% wide, -1 = reversed normal on x)
         * Parameters:  Number scaleY y-scale to draw at (2 = 200% high, -1 = reversed normal on y)
         */
        setScale:function (scaleX, scaleY)
        {
            this.scaleX = scaleX;
            this.scaleY = scaleY;
        },

        /**
         * Sets the componsite drawing operation for this image.
         * Parameters:  String o Operation to use (e.g. 'lighter')
         */
        setCompositeOperation:function (o)
        {
            this.compositeOperation = o;
        },

        /**
         * Load an image directly
         * Parameters:  {Function} onLoadCallback Function to be called once the image has been loaded
         * Parameters:  {Function} onErrorCallback Function to be called if the image fails to load
         */
        load:function (onLoadCallback, onErrorCallback)
        {
            this.onLoadCallback = onLoadCallback;
            this.onErrorCallback = onErrorCallback;

            if (this.loaded && onLoadCallback) this.onLoadCallback(this);

            this.image.onload = this._onLoad.bind(this);
            this.image.onerror = this._onError.bind(this);
            this.image.src = this.src;
        },

        /**
         * Force this image to be reloaded
         */
        reload:function ()
        {
            this.loaded = false;
            this.load();
        },

        /**
         * Draw the image onto a context
         * Parameters:  {Context} ctx Context to draw the sprite image on
         * Parameters:  Number sx Source position in the image (or detination x if only 3 params)
         * Parameters:  Number sy Source position in the image (or destination y if only 3 params)
         * Parameters:  Number x x-position destination x position to draw the image at
         * Parameters:  Number y y-position destination y position to draw the image at
         * Parameters:  Number width Width to draw (will clip the image edge)
         * Parameters:  Number height Height to draw (will clip the image edge)
         * Parameters:  Number rotationAngle Angle to draw the image at
         */
        draw:function (ctx, sx, sy, x, y, width, height, rotationAngle)
        {
            // scale testing
            if (this.compositeOperation != null)
                ctx.globalCompositeOperation = this.compositeOperation;

            if (arguments.length == 3)
            {
                ctx.save();
                if (this.alpha != 1)
                    ctx.globalAlpha = this.alpha;
                ctx.translate(sx + (this.width / 2), sy + (this.height / 2));
                ctx.scale(this.scaleX, this.scaleY);
                ctx.drawImage(this.image, 0, 0, this.width, this.height, (-this.width / 2),
                    (-this.height / 2), this.width, this.height);
                ctx.restore();
            }
            else
            {
                if ($VLD(rotationAngle))
                {
                    ctx.save();

                    if (this.alpha != 1)
                        ctx.globalAlpha = this.alpha;
                    if (this.scaleX < 0 || this.scaleY < 0)
                    {
                        var yf = this.scaleY == 1 ? 0 : this.scaleY;
                        var xf = this.scaleX == 1 ? 0 : this.scaleX;

                        ctx.translate((x + (width / 2) * xf), (y + (height / 2) * yf));
                    } else
                        ctx.translate(x + (width / 2), y + (height / 2));

                    ctx.rotate(rotationAngle * (Math.PI / 180));
                    ctx.scale(this.scaleX, this.scaleY);
                    ctx.drawImage(this.image, sx, sy, width, height, (-width / 2), (-height / 2), width, height);
                    ctx.restore();
                }
                else
                {
                    ctx.save();

                    if (this.alpha != 1)
                        ctx.globalAlpha = this.alpha;
                    if (this.scaleX < 0 || this.scaleY < 0)
                    {
                        var yf2 = this.scaleY == 1 ? 0 : this.scaleY;
                        var xf2 = this.scaleX == 1 ? 0 : this.scaleX;

                        ctx.translate(x + (-(width / 2) * xf2), y + (-(height / 2) * yf2));
                    } else
                        ctx.translate(x, y);

                    ctx.scale(this.scaleX, this.scaleY);
                    ctx.drawImage(this.image, sx, sy, width, height, 0, 0, width, height);
                    ctx.restore();
                }
            }

            if (this.compositeOperation != null)
                ctx.globalCompositeOperation = 'source-over';
            h5c3.device.elementsDrawn++;

        },

        _onLoad:function ()
        {
            this.loaded = true;

            this.width = this.image.width;
            this.height = this.image.height;

            if (this.onLoadCallback)
                this.onLoadCallback(this);
        },

        _onError:function ()
        {
            if (this.onErrorCallback)
                this.onErrorCallback(this);
        },

        /**
         * Expands the image by adding blank pixels to the bottom and side
         * Parameters:  Number extraWidth Amount of width to add
         * Parameters:  Number extraHeight Amount of height to add
         */
        expand:function (extraWidth, extraHeight)
        {
            this.image.width = this.width + extraWidth;
            this.image.height = this.height + extraHeight;
            this.width = this.image.width;
            this.height = this.image.height;
        },

        resize:function (scaleX, scaleY)
        {
            var sw = this.width * scaleX;
            var sh = this.height * scaleY;

            var startingImage = document.createElement('canvas');
            startingImage.width = this.width;
            startingImage.height = this.height;

            var result = document.createElement('canvas');
            result.width = sw;
            result.height = sh;

            var ctx = result.getContext('2d');
            var resultPixels = ctx.getImageData(0, 0, sw, sh);

            var startingCtx = startingImage.getContext('2d');
            startingCtx.drawImage(this.image, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
            var startingPixels = startingCtx.getImageData(0, 0, this.width, this.height);

            for (var y = 0; y < sh; y++)
            {
                for (var x = 0; x < sw; x++)
                {
                    var i = (Math.floor(y / scaleY) * this.width + Math.floor(x / scaleX)) * 4;
                    var is = (y * sw + x) * 4;
                    for (var j = 0; j < 4; j++)
                        resultPixels.data[is + j] = startingPixels.data[i + j];
                }
            }

            ctx.putImageData(resultPixels, 0, 0);
            this.image = result;
            return this;
        }
    });

// todo: this should be derived from image (or at least a common base -- merge things like scaling factor api)
h5c3.CanvasImage = h5c3.Base.extend('h5c3.CanvasImage', {},
    {
        width:0,
        height:0,
        canvas:null,
        loaded:true,
        scaleX:1,
        scaleY:1,

        init:function (canvas)
        {
            this.canvas = canvas;
            this.width = canvas.width;
            this.height = canvas.height;
        },

        draw:function (ctx, sx, sy, x, y, width, height)
        {
            if (width == undefined || height == undefined || width == 0 || height == 0)
                ctx.drawImage(this.canvas, sx, sy);
            else
                ctx.drawImage(this.canvas, sx, sy, width, height, x * this.scaleX, y * this.scaleY,
                    width * this.scaleX, height * this.scaleY);
        },

        setScale:function (scaleX, scaleY)
        {
            this.scaleX = scaleX;
            this.scaleY = scaleY;
        }

    });


h5c3.ImageTools = h5c3.Base.extend('h5c3.ImageTools',
    {
        /**
         * Rotates an image by the given number of directions
         * Parameters:  image Source image
         * Parameters:  w Width of the image
         * Parameters:  h Height of the image
         * Parameters:  directions Number of directions you want back
         * Returns: {h5c3.CanvasImage} A new h5c3.CanvasImage with the rotations
         */
        rotate:function (image, w, h, directions)
        {
            // create an destination canvas big enough
            var resultCanvas = document.createElement('canvas');
            resultCanvas.width = w * directions;
            resultCanvas.height = h;

            var ctx = resultCanvas.getContext('2d');

            // find center of the source image
            //var cx = w / 2;
            //var cy = h / 2;

            for (var d = 0; d < directions; d++)
            {
                ctx.save();
                ctx.translate(d * w + (w / 2), h / 2);
                ctx.rotate(((360 / directions) * d) * (Math.PI / 180));
                ctx.drawImage(image, -(w / 2), -(h / 2));
                ctx.restore();
            }

            return new h5c3.CanvasImage(resultCanvas);
        }
    },
    {});/**
 * Playcraft Engine - (c) 2011 Playcraft Labs, inc.
 */

/**
 * Class:  h5c3.Scene
 * 
 * 
 * 
 * A game is primarily a container for various "scenes", with each scene containing one or more layers. You can
 * construct a scene, and use addScene to add it to the game. This is typically done once all the queued resources
 * have been loaded:
 * 
 * onLoaded:function ()
 * {
 *    // construct the game scene
 *    this.gameScene = new GameScene();
 *
 *    // add it to the game
 *    this.addScene(this.gameScene);
 * }
 * (end)
 * Active scenes will be updated and drawn by the system, inactive ones will not. Adding a scene makes it active by
 * default.
 * 
 * To activate a scene (such as displaying a menu scene):
 * 
 * myGame.activateScene(myMenuScene);
 * (end)
 * You can likewise deactivate a scene (it will no longer be rendered or processed):
 * 
 * myGame.deactivateScene(myMenuScene);
 * (end)
 * Upon activating a scene, the game's onSceneActivated is called passing in the scene that became active. Likewise
 * onSceneDeactivated will be called when a scene is deactivated.
 * 
 * You can access scenes by calling getFirstScene or getFirstActiveScene which will return a h5c3.LinkedListNode you can
 * use to loop through the list of scenes:
 * 
 * var sceneNode = myGame.getFirstScene();
 * while (sceneNode)
 * {
 *    var scene = sceneNode.object();
 *    // scene.doSomething();
 *
 *    // move to the next one (will be null if done)
 *    sceneNode = sceneNode.next();
 * }
 * (end)
 */
h5c3.Scene = h5c3.Base.extend('h5c3.Scene',
    /** Interface: h5c3.Scene */
    {},
    /** Interface: h5c3.Scene.prototype */
    {
        name:null,				/** Name of the scene */
        layersByName:null,		/** An index of layers by name */
        layers:null,			/** Linked list of all layers in the scene */
        activeLayers:null,		/** Linked list of all active layers */
        paused:false,			/** Whether the scene is currently paused (read-only) */
        active:true,			/** Whether the scene is active (read-only) */
        viewPort: null,			/** h5c3.Rect of the current viewport */
		ctx:null,				/** current 2D draw context */
        viewPortCenter: null, 	/** readonly, changes when you call setViewPort */

        /**
         * Constructs a new scene with the given name
		 *
         * Parameters:  String name Name of the scene, i.e. 'menu'
         * Parameters:  String ctx current 2D draw context
         */
        init:function (name,ctx)
        {
            this._super();
			if (this.name = $CHK(name, null)) 
				this.name = name;
			if (!ctx) 
				this.ctx = h5c3.device.game.ctx; 
			else 
				this.ctx=ctx;
			
            this.layersByName = new h5c3.Hashtable();
            this.layers = new h5c3.LinkedList();
            this.activeLayers = new h5c3.LinkedList();

            this.viewPort = h5c3.Rect.create(0, 0, 0, 0); // set by setViewPort below
            this.viewPortCenter = h5c3.Point.create(0, 0);

            // set the view port to be the default size of the system canvas
            this.setViewPort(0, 0, h5c3.device.game.dim.w, h5c3.device.game.dim.h);

            // if the system has already started, then automatically call the onReady
            if (h5c3.device.started)
                this.onReady();
        },

        /**
         * Called when the device is ready
         */
        onReady:function ()
        {
            // signal all the layers that we're ready
            var next = this.layers.first;
            while (next)
            {
                next.obj.onReady();
                next = next.next();
            }
        },

        /**
         * Called when this scene is being activated
         */
        onActivated:function ()
        {
        },

        /**
         * Called when this scene has been deactivated
         */
        onDeactivated:function ()
        {
        },

        /**
         * Event notifier when the underlying game canvas is being resized
         * Parameters:  Number width New width of the game canvas
         * Parameters:  Number height New height of the game canvas
         */
        onResize:function (width, height)
        {
            this.setViewPort(this.viewPort.x, this.viewPort.y, width, height);

            var next = this.layers.first;
            while (next)
            {
                next.obj.onResize(width, height);
                next = next.next();
            }
        },

        /**
         * Sets the view port to the given top left postion (x, y) and dimensions (width and height)
         * The view port represents the on-screen pixels dimensions of the game relative to the
         * associated canvas. Use the view port dimensions to render different scenes at different
         * positions on screen. e.g. a game layer would typically be 0, 0, canvas.width, canvas.height
         * whereas a mini map may just be in the top left corner of the screen (0, 0, 100, 100).
         * Parameters:  Number x X position to render the scene within the canvas (in screen pixels)
         * Parameters:  Number y Y position to render the scene within the canvas (in screen pixels)
         * Parameters:  Number width The maximum width to render (in screen pixels)
         * Parameters:  Number height The maximum height to render (in screen pixels)
         */
        setViewPort:function (x, y, width, height)
        {
            this.viewPort.x = x;
            this.viewPort.y = y;
            this.viewPort.w = width;
            this.viewPort.h = height;
            this.viewPortCenter.x = this.viewPort.w / 2;
            this.viewPortCenter.y = this.viewPort.h / 2;
        },

        /**
         * Gets the current viewport (essentially an alias for viewPort used by abstract interfaces (such as
         * the input system). You can use it to if you want to write generic code that again layers, scenes and
         * entities, since this method is the same across all. Otherwise you can just read the viewport member
         * directly.
         */
        getScreenRect:function ()
        {
            return this.viewPort;
        },

        /**
         * Resorts layer processing/drawing order based on each layers zIndex value
         */
        sortLayers: function()
        {
            this.activeLayers.sort(
                function(a, b)
                {
                    return a.zIndex - b.zIndex;
                });
        },

        /**
         * Fired when a bound event/action is triggered in the input system. Use bindAction
         * to set one up. Override this in your subclass to do something about it.
         * Parameters:  String actionName The name of the action that happened
         * Parameters:  {Event} event Raw event object
         * Parameters:  {h5c3.Point} pos Position, such as a touch input or mouse position
         */
        onAction:function (actionName, event, pos)
        {
        },

        /**
         * Gets whether the scene is active or not
         * Returns: Boolean True if active
         */
        isActive:function ()
        {
            return this.active;
        },

        /**
         * Gets a layer using a name
         * Parameters:  String name Name of the layer you want
         * Returns: {h5c3.Layer} The layer
         */
        get:function (name)
        {
            return this.layersByName.get(name);
        },

        /**
         * Adds a layer to the scene. The added layer will automatically be made active.
         * Parameters:  {h5c3.Layer} layer Layer you want to add
         * Returns: {h5c3.Layer} The layer you added, for convenience.
         */
        addLayer:function (layer)
        {
            if (!$VLD(layer)) {
                $_DBG_("Error: invalid layer");
			}
            if (!$VLD(layer.name)) {
                $_DBG_("Error: trying to add a layer that has no name (forget to call this._super in your layer init?)");
			}

            this.layersByName.put(layer.name, layer);
            this.layers.add(layer);
            this.activeLayers.add(layer);
            layer.active = true;
            layer.scene = this;
            layer.onAddedToScene();
            this.sortLayers();

            return layer;
        },

        /**
         * Remove a layer
         * Parameters:  {h5c3.Layer} layer The layer you want to remove
         */
        removeLayer:function (layer)
        {
            this.layersByName.remove(layer.name);
            this.layers.remove(layer);
            this.activeLayers.remove(layer);
            layer.active = false;
            layer.scene = null;
            layer.onRemovedFromScene();
        },

        /**
         * Sets the layer to active
         * Parameters:  {h5c3.Layer} layer Layer you want to make active
         */
        setLayerActive:function (layer)
        {
            this.activeLayers.add(layer);
            this.sortLayers();
            layer.active = true;
        },

        /**
         * Sets the layer to inactive
         * Parameters:  {h5c3.Layer} layer Layer you want to make inactive
         */
        setLayerInactive:function (layer)
        {
            this.activeLayers.remove(layer);
            layer.active = false;
        },

        /**
         * Toggles a layer to active or inactive
         * Parameters:  {h5c3.Layer} layer Layer you want to toggle
         */
        toggleLayerActive: function(layer)
        {
            if (layer.active)
                this.setLayerInactive(layer);
            else
                this.setLayerActive(layer);
        },

        /**
         * Gets the linked list node of the first active layer
         * Returns: {h5c3.LinkedListNode} Node pointing to the first layer
         */
        getFirstActiveLayer:function ()
        {
            return this.activeLayers.first;
        },

        /**
         * Gets the linked list node of the first layer
         * Returns: {h5c3.LinkedListNode} Node pointing to the first layer
         */
        getFirstLayer:function ()
        {
            return this.layers.first;
        },

        //
        // LIFECYCLE
        //
        startTime: 0,

        process:function ()
        {
			this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            // draw all the layers
            var next = this.activeLayers.first;
            while (next)
            {
                if (!next.obj.paused)
                {
                    next.obj.process();

                    this.startTime = Date.now();
                    next.obj.draw();
                    h5c3.device.lastDrawMS += (Date.now() - this.startTime);
                }
                next = next.next();
            }
        },

        /**
         * Pauses all active layers
         */
        pause:function ()
        {
            this.paused = true;
            var next = this.activeLayers.first;
            while (next)
            {
                next.obj.pause();
                next = next.next();
            }
        },

        /**
         * Resumes all active layers
         */
        resume:function ()
        {
            this.paused = false;
            var next = this.activeLayers.first;
            while (next)
            {
                next.obj.resume();
                next = next.next();
            }
        },

        /**
         * Resets all layers
         */
        reset:function ()
        {
            var next = this.layers.first;
            while (next)
            {
                next.obj.reset();
                next = next.next();
            }

            this.layers.clear();
            this.activeLayers.clear();
        },

        /**
         * Ask all the layers etc for any entities under the x, y position
         * Parameters:  Number x the screen x position
         * Parameters:  Number y the screen y position
         */
        entitiesUnderXY:function (x, y)
        {
            var found = [];
            var next = this.layers.first;
            while (next)
            {
                found.push(next.obj.entitiesUnderXY(x, y));
                next = next.next();
            }
        },


        /**
         * Loads all of the layers from a Tiled (TMX) map file. Tile layers will become instances of
         * TileLayer, objectgroups will become EntityLayers. Tile sets must have a name that matches an
         * available spritesheet image resource. Note that only a single tilesheet is currently supported.
         * Parameters:  String levelData XML formatted TMX data
         */
        loadFromTMX:function (levelData, SceneFactory)
        {
            var xmlDoc = h5c3.device.parseXML(levelData.data);
            var mapXML = xmlDoc.getElementsByTagName('map')[0];

            var tileWidth = parseInt(mapXML.getAttribute('tilewidth'));
            var tileHeight = parseInt(mapXML.getAttribute('tileheight'));

            // load up the tilesets (note: only 1 is supported right now)
            // todo: add support for multiple tile sets

            //
            // TILESET
            //
            var tileSetXML = xmlDoc.getElementsByTagName('tileset')[0];
            var tsName = tileSetXML.getAttribute('name');
            //var tsImageWidth = tileSetXML.getAttribute('width');
            //var tsImageHeight = tileSetXML.getAttribute('height');
            var tileSheet = h5c3.loader.get(tsName);
            $AST(tileSheet, 'Unable to locate tile image resource: ' + tsName + '. It must match the tileset name in tiled.');

            var tsImageResource = h5c3.loader.get(tsName).resource;
            var tsSpriteSheet = new h5c3.SpriteSheet({ image:tsImageResource, frameWidth:tileWidth, frameHeight:tileHeight });

            // create a tileset object which marries (one or more spritesheet's) and contains tileproperty data
            // pulled from tiled

            var tileSet = new h5c3.TileSet(tsSpriteSheet);

            // load all the tile properties
            var tiles = xmlDoc.getElementsByTagName('tile');
            for (var p = 0; p < tiles.length; p++)
            {
                var tile = tiles[p];
                var tileId = parseInt(tile.getAttribute('id'));

                var pr = tile.getElementsByTagName('properties')[0];
                var props = pr.getElementsByTagName('property');

                for (var b = 0; b < props.length; b++)
                {
                    var prop = props[b];
                    var name = prop.getAttribute('name');
                    var value = prop.getAttribute('value');
                    tileSet.addProperty(tileId, name, value);
                }
            }

            //
            // LAYERS
            //
            var layers = xmlDoc.getElementsByTagName('layer');
            for (var m = 0; m < layers.length; m++)
            {
                switch(mapXML.getAttribute('orientation')) {
                    case 'isometric':
                        h5c3.IsoTileLayer.loadFromTMX(this, layers[m], tileWidth, tileHeight, tileSet);
                    break;

                    default:
                        h5c3.TileLayer.loadFromTMX(this, layers[m], tileWidth, tileHeight, tileSet);
                    break;
                }				
            }

            // load entity layers
            var objectGroups = xmlDoc.getElementsByTagName('objectgroup');
            for (var i = 0; i < objectGroups.length; i++)
            {
                // partial construction

                // fill in the rest using the data from the TMX file
                h5c3.EntityLayer.loadFromTMX(this, objectGroups[i], SceneFactory);
            }
        }
    });

/**
 * SceneFactory -- for creating & managing scenes (mostly just an interface class you extend from to create an scene factory).
 */
h5c3.SceneFactory = h5c3.Factory.extend('h5c3.SceneFactory',
    { },
    {
        
		init:function() 
		{
			this._super('Scene');
		},
				
		/**
         * Called by the Scene loader
		 *
		 * options = {name:'mySceneNoSpaces',sceneID:0x0010,ctx:aDifferentCtxThanGame.ctx}
		 *
         * Parameters:  String name String type of the scene to create
         * Parameters:  {h5c3.Layer} layer Layer the entity should be placed on
         */
        create:function (options)
		{
			$CHK(options.name,false);
			$CHK(options.sceneID,false);
			if (!opions.name || !options.sceneID) throw('You must provide a name & sceneID.');
			$CHK(options.ctx,h5c3.game.ctx);

			if (this.exists(options.name)) {
				this.activateScene(options.name);
			} else {
				var obj = new h5c3.Scene({name:'loading',sceneID:SceneID.LOADING});

			}
			return this.add(options.name,obj);
		}		
    });

/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 *  H5C3 Framework
 *  Engine
 * Class:  h5c3.IntroLayer
 *  h5c3.Entitylayer
 *  Handles the Publisher Splash screen, the Framework splash screen and will 
 * optionally handle the WebApp splash screen. See below how to enable automatic 
 * display of the WebApp splash.
 * @example
 * In your HTML file embded XML include this:
 * 
 * <image name="splash" file="images/splash.png" /> 
 * (end)
 */
h5c3.IntroLayer = h5c3.EntityLayer.extend('h5c3.IntroLayer',
    { },
    {
		/**
		 * Property: {h5c3.Entity} i2tmlabs Property used to hold the I2TM Publisher object
		 * Default: null
		 */
		i2tmlabs:	null,

		/**
		 * Property: {h5c3.Entity} h5c3 Property used to hold the H5C3 Framework object
		 * Default: null
		 */
		h5c3:		null,

		/**
		 * Property: {h5c3.Entity} splash Property used to hold the Application Splash object (optional)
		 * Default: null
		 */
		splash:		null,
	
		/**
		* Initialization method. Adds Publisher & Framework resources to loading Que.
		* Then parses the embded XML and ques all resources for loading.
		* Parameters:  Object config {scene, name, worldSizeX, worldSizeY, zIndex}
		* @requires config.scene & congi.name
		* @
		*/	
        init:function (config)
        {
            this._super(config);		
            this.addSystem(new h5c3.systems.Render());
			this.addSystem(new h5c3.systems.Layout());
            this.addSystem(new h5c3.systems.Expiration());
            this.addSystem(new h5c3.systems.Effects());
			this.show('i2tm');
        },

		/**
		 * Used to select which Entity to display. 
		 *
		 * Parameters:  String name Which Entity [i2tm|h5c3|splash]
		 */	
		show:function(name)
		{
			try {
				if (name==='i2tm') {
					this.sheetPublisher = new h5c3.SpriteSheet({ image:h5c3.loader.get('publisher').resource, frameWidth:1920, frameHeight:1080 });
					this.i2tmlabs = this.createEntity('i2tmlabs');
					h5c3.soundFactory.play('i2tm',{volume:0.5,loop:false});
				} else if (name==='h5c3') {
					this.sheetH5C3 = new h5c3.SpriteSheet({ image:h5c3.loader.get('h5c3').resource, frameWidth:1920, frameHeight:1080 });
					this.h5c3 = this.createEntity('h5c3');
				}
			} catch (err) {
				$_DBG_(err);
			}
		},
		
		onEntityRemoved:function(entity)
		{
			$_DBG_(entity+' has been removed.');
		},
		
		/**
		 * Used to crate an entity
		 *
		 * Parameters:  String name Which Entity [i2tm|h5c3|splash]
		 */	
		createEntity:function(name)
		{
            var e = h5c3.Entity.create(this);
            e.addTag(name);
            switch (name)
            {
				case 'i2tmlabs':
					e.addComponent(h5c3.components.Sprite.create({ spriteSheet:this.sheetPublisher}));
					e.addComponent(h5c3.components.Spatial.create({w:this.sheetPublisher.frameWidth, h:this.sheetPublisher.frameHeight}));
					e.onRemoved = function() {
						h5c3.device.game.obj.publisherScene.layer.show('h5c3');
					};
					break;

				case 'h5c3':
					e.addComponent(h5c3.components.Sprite.create({ spriteSheet:this.sheetH5C3}));
					e.addComponent(h5c3.components.Spatial.create({w:this.sheetH5C3.frameWidth, h:this.sheetH5C3.frameHeight}));
					e.onRemoved = function() {h5c3.device.game.obj.setScene(h5c3.device.game.obj.publisherScene,SceneID.MAINMENU);};
					break;					
            } //End Switch
			e.addComponent(h5c3.components.Layout.create({ vertical:'center', horizontal:'center' }));					
			e.addComponent(h5c3.components.Expiry.create({lifetime:1000}));
			return e;
		}
	});
	
/**
 *  H5C3 Framework
 *  Engine
 * Class:  h5c3.IntroScene
 *  h5c3.Scene
 *  Handles the Publisher Splash screen, the Framework splash screen and will 
 * optionally handle the WebApp splash screen. See below how to enable automatic 
 * display of the WebApp splash.
 * @example
 * In your HTML file embded XML include this:
 * 
 * <image name="splash" file="images/splash.png" /> 
 * (end)
 */
h5c3.IntroScene = h5c3.Scene.extend('h5c3.IntroScene',
    { },
    {
		/**
		 * Property: {h5c3.EntityLayer} layer Property used to hold the layer object
		 * Default: null
		 */
        layer:null,

		/**
		* Initialization method.
		*/	
        init:function ()
        {
            this._super('Intro Scene');			
            this.layer = new h5c3.IntroLayer({scene:this, name:'introLayer', worldSizeX:this.ctx.canvas.width, worldSizeY:this.ctx.canvas.height});
			this.addLayer(this.layer);
            h5c3.device.input.bindAction(this, 'skip', 'SPACE');
            h5c3.device.input.bindAction(this, 'skip', 'MOUSE_CLICK');
            h5c3.device.input.bindAction(this, 'skip', 'TOUCH');
        },

        onAction:function (actionName, event, pos)
        {
			if (actionName === 'skip') {
				h5c3.device.game.obj.setScene(this,SceneID.MAINMENU);
			}			
        }
    });
