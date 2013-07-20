/*global h5c3: true, gamecore: true, document: true, navigator: true, window: true */
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 * @module H5C3 Framework
 * @submodule Plugin
 * @class h5c3.plugin.Input
 * @augments h5c3.Plugin
 * @description
 * Input class for extended from h5c3.Plugin to provide functionality to the h5c3.
 * Convenience system/component that lets your bind input states and actions to an entity.
 * </code></pre>
 */
h5c3.plugin.Input = h5c3.Plugin.extend('h5c3.plugin.Input',
{
	/**
	 * @property {string} NAME Friendly name for plugin, may have spaces
	 */
	NAME:	'Input',
	/**
	 * @property {string} VERSION Holds the current version of the plugin
	 */
	VERSION:	'0.0.1',
	/**
	 * @property {string} DESCRIPTION Short description of what this plugin does.
	 */
	DESCRIPTION:	'Convenience system/component that lets your bind input states and actions to an entity.',
	/** Folder where files are located */
	srcDir: 'js/',
	/** Plugins required by this plugin */
	requires:[],
	/** List of files that makeup this plugin */
	uses: ['systems.input.js,components.input.js']
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
 * @class h5c3.components.Input
 * @description
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Input'>h5c3.systems.Input</a>]
 * <p>
 * Convenience component that lets your bind input states and actions to an entity.
 * In options provide an array of states and actions, with the associated input, e.g.
 * <pre><code>
 * states:
 * [
 *      ['moving right', ['D', 'TOUCH', 'RIGHT']],
 *      ['moving left', ['A', 'LEFT']],
 *      ['jumping', ['W', 'UP']],
 *      ['jumping', ['MOUSE_LEFT_BUTTON', 'SPACE'], false],
 * ],
 * actions:
 * [
 *      ['fire', ['SPACE']]
 * ]
 * </code></pre>
 * Note the use of a positional input (the mouse left button click for attack). This takes an optional extra
 * boolean to set whether the positional event should be contained with the on-screen spatial rectangle of the entity.
 * In this case, true means only engage the attack state if the click is on the player; false means you can click
 * anywhere on-screen.
 */
h5c3.components.Input = h5c3.components.Component.extend('h5c3.components.Input',
/** @lends h5c3.components.Input */
{
	/**
	 * Constructs (or acquires from the pool) an input component.
	 * @param {Array} options.states Array of states, e.g. states:['fire',['SPACE','D']];
	 * @param {Array} options.actions Array of actions, e.g. actions:['fire',['SPACE','D']];
	 * @param {h5c3.Entity} [options.target] Optional target entity. If set, actions and states will be set on this,
	 * not the entity that contains the component. It will only be used for spatial positional.
	 * @return {h5c3.components.Spatial} A shiny new input component
	 */
	create:function (options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** @lends h5c3.components.Input.prototype */
{
	/** target entity where states and actions will be sent */
	target: null,

	/** array of input states */
	states:null,
	/** array of input actions */
	actions: null,

	_bound: false,

	/**
	 * Internal constructor: use .create
	 */
	init:function (options)
	{
		this._super('input');
	},

	/**
	 * Configures the component. See create method for options
	 * @param {Object} options Options
	 */
	config:function (options)
	{
		if (!options.states && !options.actions)
			throw 'input.js::config() - Input requires at least an action or state set';

		this.states = options.states;
		this.actions = options.actions;
		this.target = options.target;
	}
});


/**
 * @class h5c3.systems.Input
 * @description
 * [Extends <a href='h5c3.systems.System'>h5c3.systems.System</a>]
 * <p>
 * Input system. See the <a href='h5c3.components.Input'>input component</a> for more information.
 */
h5c3.systems.Input = h5c3.systems.EntitySystem.extend('h5c3.systems.Input',
/** @lends h5c3.systems.Input */
{},
/** @lends h5c3.systems.Input.prototype */
{
	/**
	 * Constructs a new input system.
	 */
	init:function ()
	{
		this._super(['input']);
	},

	process:function (entity)
	{
		var input = entity.getComponent('input');

		if (!input._bound)
		{
			var uiSpatial = entity.getComponent('spatial');
			var eventTarget = entity;

			// if there is a target specified for the events, then we flip things around a little
			// we bind the input to the entity target, and make this entity (the one with the entity component
			// on it the uiTarget (bounding rectangle)
			if (input.target)
				eventTarget = input.target;

			// bind all the inputs we want
			if (input.states)
			{
				for (var i=0; i < input.states.length; i++)
				{
					var keys = input.states[i][1];
					for (var k = 0; k < keys.length; k++)
					{
						var ts = uiSpatial;
						if ($VLD(input.states[i][2]) && input.states[i][2] == false)
							ts = null;
						h5c3.device.input.bindState(eventTarget, input.states[i][0], keys[k], ts);
					}
				}
			}

			if (input.actions)
			{
				eventTarget = this;
				for (i = 0; i < input.actions.length; i++)
				{
					keys = input.actions[i][1];
					for (k = 0; k < keys.length; k++)
					{
						ts = uiSpatial;
						if ($VLD(input.actions[i][2]) && input.actions[i][2] == false)
							ts = null;
						h5c3.device.input.bindAction(eventTarget, input.actions[i][0], keys[k], ts);
					}
				}
			}

			input._bound = true;
		}
	},

	/**
	 * Override to react to the actions
	 * @param {String} actionName Name of the action
	 * @param {Event} event Event object that caused the input
	 * @param {h5c3.Point} pos Position the input occurred
	 * @param {Object} uiTarget The target that received the input (spatial of an entity if bound)
	 */
	onAction:function(actionName, event, pos, uiTarget)
	{
	},

	/**
	 * Gets whether an input state is active
	 * @param {h5c3.Entity} entity Entity testing the active state for
	 * @param {String} state The state to test
	 * @return {Boolean} true if the state is presently on
	 */
	isInputState: function(entity, state)
	{
		if (entity.getComponent('input')._bound)
			return h5c3.device.input.isInputState(entity, state);
		return false;
	}


});