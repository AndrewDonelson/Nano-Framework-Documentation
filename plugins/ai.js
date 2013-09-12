/*global h5c3: true, gamecore: true, document: true, navigator: true, window: true */
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
 
/**
 *  H5C3 Framework
 *  Plugin
 * Class:  h5c3.plugin.AI
 *  h5c3.Plugin
 * 
 * AI class for extended from h5c3.Plugin to provide functionality to the h5c3.
 *
 * 
 * var color = new h5c3.Color([255, 0, 0]); // super red
 * (end)
 */
h5c3.plugin.AI = h5c3.Plugin.extend('h5c3.plugin.AI',
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
 *  H5C3 Framework
 *  Components
 * Class:  h5c3.components.AI
 * 
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Render'>h5c3.systems.Render</a>]
 * 
 * Ai used to track an entity
 */
h5c3.components.AI = h5c3.components.Component.extend('h5c3.components.AI',
    /** Interface: h5c3.components.AITrack */
    {
        /**
         * Constructs (or acquires from the pool) a AITrack component.
         * Parameters:  {Entity} A target entity
         * Parameters:  Number Bitwise list of techniques to implement AI_TECHNIQUES
         * Returns: {h5c3.components.AI} A AI Component
         */
        create:function (options)
        {
            var n = this._super();
            n.config(options);
            return n;
        }
    },
    /** Interface: h5c3.components.AI.prototype */
    {
        /** target entity */
        target:null,
		techniques:null,

        /**
         * Constructs a new component. See create method for options
         * Parameters:  Object options Options
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
         * Parameters:  Object options Options
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

