/*global h5c3: true, gamecore: true, document: true, navigator: true, window: true */
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
 
/**
 * @module H5C3 Framework
 * @submodule Plugin
 * @class h5c3.plugin.AI
 * @augments h5c3.Plugin
 * @description
 * AI class for extended from h5c3.Plugin to provide functionality to the h5c3.
 *
 * <pre><code>
 * var color = new h5c3.Color([255, 0, 0]); // super red
 * </code></pre>
 */
h5c3.plugin.AI = h5c3.Plugin.extend('h5c3.plugin.AI',
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

/*******************************************************************************************
* Structure definition used by the AI component
*******************************************************************************************/	
AI_TECHNIQUE =
{
    NONE:		0x0000, // BIT MASK
    CHASE:		0x0001, // 0000010	//Chase
    FLEE:		0x0002, // 0000001	//Flee
    INTERCEPT:	0x0004, // 0000010	//Intercept
    WAYPOINTS:	0x0008, // 0000100	//Waypoints
    PATTERN:	0x0016	// 0000100	//Pattern
};

/**
 * @module H5C3 Framework
 * @submodule Components
 * @class h5c3.components.AI
 * @description
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Render'>h5c3.systems.Render</a>]
 * <p>
 * Ai used to track an entity
 */
h5c3.components.AI = h5c3.components.Component.extend('h5c3.components.AI',
    /** @lends h5c3.components.AITrack */
    {
        /**
         * Constructs (or acquires from the pool) a AITrack component.
         * @param {Entity} A target entity
         * @param {Number} Bitwise list of techniques to implement AI_TECHNIQUES
         * @return {h5c3.components.AI} A AI Component
         */
        create:function (options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** @lends h5c3.components.AI.prototype */
    {
        /** target entity */
        target:null,
		techniques:null,

        /**
         * Constructs a new component. See create method for options
         * @param {Object} options Options
         */
        init:function (options)
        {
            this._super(this.Class.shortName);
            this.target = null;
            this.techniques = AI_TECHNIQUE.NONE;
            if ($VLD(options)) {
                this.config(options);
			}
        },

        /**
         * Configures the component. See create method for options
         * @param {Object} options Options
         */
        config:function (options)
        {
            if (!options.target) {
                this.target.set(null);
			} else {
                this.target.set($CHK(options.target, null));
			}

            if (!options.techniques) {
                this.techniques.set(AI_TECHNIQUE.NONE);
			} else {
                this.techniques.set($CHK(options.techniques, AI_TECHNIQUE.NONE));
			}
        }
    });

