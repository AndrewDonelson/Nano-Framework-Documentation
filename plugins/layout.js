/*global h5c3: true, gamecore: true, document: true, navigator: true, window: true */
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 * @module H5C3 Framework
 * @submodule Plugin
 * @class h5c3.plugin.Layout
 * @augments h5c3.Plugin
 * @description
 * Layout class for extended from h5c3.Plugin to provide functionality to the h5c3.
 *
 * <pre><code>
 * var color = new h5c3.Color([255, 0, 0]); // super red
 * </code></pre>
 */
h5c3.plugin.Layout = h5c3.Plugin.extend('h5c3.plugin.Layout',
{
	/**
	 * @property {string} NAME Friendly name for plugin, may have spaces
	 */
	NAME:	'Layout',
	/**
	 * @property {string} VERSION Holds the current version of the plugin
	 */
	VERSION:	'0.0.1',
	/**
	 * @property {string} DESCRIPTION Short description of what this plugin does.
	 */
	DESCRIPTION:	'Automatically positions an entity on screen using a variety of layout options.',
	/** Folder where files are located */
	srcDir: 'js/',
	/** Plugins required by this plugin */
	requires:[],
	/** List of files that makeup this plugin */
	uses: ['systems.layout.js','components.layout.js']
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
 * @class h5c3.components.Layout
 * @description
 * [Extends <a href='h5c3.components.Component'>h5c3.components.Component</a>]<BR>
 * [Used in <a href='h5c3.systems.Layout'>h5c3.systems.Layout</a>]
 * <p>
 * Automatically positions an entity on screen using a variety of layout options.
 * <p>
 * To use automated layout, add the layout system to the layer containing the entity:
 * <pre><code>
 * gameLayer.addSystem(new h5c3.systems.Layout());
 * </code></pre>
 * You can then add a layout component to an entity. The layout system will then automatically position the entity
 * bassed on the chosen alignment, and accomodating a given margin.
 * <pre><code>
 * entity.addComponent(h5c3.components.Layout.create(
 *     { vertical:'center', horizontal:'right', margin:{ right:80 } }));
 * </code></pre>
 * Multiple items will be stacked vertically.
 */
h5c3.components.Layout = h5c3.components.Component.extend('h5c3.components.Layout',
/** @lends h5c3.components.Layout */
{
	/**
	 * Constructs (or acquires from the pool) a layout component
	 * @param {String} options.vertical Vertical positioning: 'top', 'center', 'bottom'
	 * @param {String} options.horizontal Horizontal positioning: 'left', 'center', 'right'
	 * @param {Object} options.margin Margin for the entity (ie. margin.left, right, top, bottom)
	 * @return {h5c3.components.Layout} A newly configured layout component
	 */
	create:function (options)
	{
		var n = this._super();
		n.config(options);
		return n;
	}
},
/** @lends h5c3.components.Layout.prototype */
{
	/** Vertical positioning: 'top', 'center', 'bottom' */
	vertical:null,
	/** Horizontal positioning: 'left', 'center', 'right' */
	horizontal:null,
	/** margin offset to the position */
	margin:null,

	/**
	 * Constructs a new component. See create method for options
	 */
	init:function ()
	{
		this._super('layout');
		this.margin = {};
	},

	/**
	 * Configures the component. See create method for options
	 * @param {Object} options Options
	 */
	config:function (options)
	{
		if ($CHK(options.margin))
		{
			this.margin.left = $CHK(options.margin.left, 0);
			this.margin.right = $CHK(options.margin.right, 0);
			this.margin.top = $CHK(options.margin.top, 0);
			this.margin.bottom = $CHK(options.margin.bottom, 0);
		} else
		{
			this.margin.left = 0;
			this.margin.right = 0;
			this.margin.top = 0;
			this.margin.bottom = 0;
		}

		this.horizontal = $CHK(options.horizontal, 'center');
		this.vertical = $CHK(options.vertical, 'center');
	}
});


/**
 * @class h5c3.systems.Layout
 * @description
 * [Extends <a href='h5c3.systems.System'>h5c3.systems.System</a>]
 * <p>
 * Manages the layout of entities
 */
h5c3.systems.Layout = h5c3.systems.EntitySystem.extend('h5c3.systems.Layout',
/** @lends h5c3.systems.Layout */
{},
/** @lends h5c3.systems.Layout.prototype */
{
	/** current margin (left, right, top, bottom) */
	margin: null,

	/**
	 * Constructs a new layout system.
	 * @param {Number} options.margin.left Default left margin for all entities
	 * @param {Number} options.margin.right Default right margin for all entities
	 * @param {Number} options.margin.top Default top margin for all entities
	 * @param {Number} options.margin.bottom Default bottom margin for all entities
	 */
	init: function(options)
	{
		this._super( [ 'layout' ] );
		this.margin = {};
		if ($CHK(options) && $CHK(options.margin))
		{
			this.margin.left = $CHK(options.margin.left, 0);
			this.margin.right = $CHK(options.margin.right, 0);
			this.margin.top = $CHK(options.margin.top, 0);
			this.margin.bottom = $CHK(options.margin.bottom, 0);
		} else
		{
			this.margin.left = 0;
			this.margin.right = 0;
			this.margin.top = 0;
			this.margin.bottom = 0;
		}
	},

	_getAnchorLocation: function(horizontal, vertically)
	{
		if (horizontal === 'left')
		{
			if (vertically === 'top') return 'top-left';
			if (vertically === 'center') return 'center-left';
			if (vertically === 'bottom') return 'bottom-left';
		}

		if (horizontal === 'center')
		{
			if (vertically === 'top') return 'top-center';
			if (vertically === 'center') return 'center-center';
			if (vertically === 'bottom') return 'bottom-center';
		}

		if (horizontal === 'right')
		{
			if (vertically === 'top') return 'top-right';
			if (vertically === 'center') return 'center-right';
			if (vertically === 'bottom') return 'bottom-right';
		}

		return null;
	},

	/**
	 * Processes all the entities and lays them out according to the anchoring options.
	 * Typically this is called whenever a new entity with a layout component is added to the
	 * system, but you can call it manually if you really want to (such as when an entity changed size or moves)
	 */
	doLayout: function()
	{
		var layouts = new h5c3.HashList(); // a list for each of the anchors

		var next = this.entities.first;
		while (next)
		{
			var entity = next.obj;
			var spatial = entity.getComponent('spatial');
			if (!spatial)
				entity.addComponent( h5c3.components.Spatial({}) );

			var layout = entity.getComponent('layout');

			// add entities to the layout sides; this just sorts them
			var al = this._getAnchorLocation(layout.horizontal, layout.vertical);
			layouts.add(al, next.obj);
			//console.log(' adding: ' + next.obj.toString() + ' to anchor group: ' + al);
			next = next.next();
		}

		// now go through all the anchor groups and lay things out
		var layoutKeys = layouts.hashtable.keys();
		for (var i=0; i < layoutKeys.length; i++)
		{
			var anchor = layoutKeys[i];
			var list = layouts.get(layoutKeys[i]);

			// if it's centered we need to know the height of all the entities being laid out
			// before we place the first item.

			var dim = this._getEntityDimensions(list);
			var cx = this.margin.left;
			var cy = this.margin.top;

			// set the starting position
			switch(anchor)
			{
				case 'top-left':
					break;
				case 'center-left':
					cy += ( this.layer.getScreenRect().h / 2) - (dim.y/2);
					break;
				case 'bottom-left':
					cy = this.layer.getScreenRect().h - dim.y - this.margin.bottom;
					break;
				case 'top-center':
					cx += this.layer.getScreenRect().w / 2 - (dim.x/2);
					break;
				case 'center-center':
					cx += this.layer.getScreenRect().w / 2 - (dim.x/2);
					cy +=( this.layer.getScreenRect().h / 2) - (dim.y/2);
					break;
				case 'bottom-center':
					cx = this.layer.getScreenRect().w / 2 - (dim.x/2) - this.margin.bottom;
					cy += this.layer.getScreenRect().h - dim.y;
					break;
				case 'top-right':
					cx += this.layer.getScreenRect().w - dim.x;
					break;
				case 'center-right':
					cx += this.layer.getScreenRect().w - dim.x;
					cy +=( this.layer.getScreenRect().h / 2) - (dim.y/2);
					break;
				case 'bottom-right':
					cx += this.layer.getScreenRect().w - dim.x;
					cy = this.layer.getScreenRect().h - dim.y - this.margin.bottom;
					break;
			}

			// whilst this while loop below looks like it's handling all anchor types, keep in mind
			// each loop is only handling one type (since they are sorted/grouped above)
			var listNext = list.first;
			while (listNext)
			{
				entity = listNext.obj;
				spatial = entity.getComponent('spatial');
				layout = entity.getComponent('layout');

				cy += layout.margin.top;

				switch(anchor)
				{
					case 'top-left':
					case 'center-left':
					case 'bottom-left':
						cx = layout.margin.left + this.margin.left;
						break;
					case 'top-center':
					case 'center-center':
					case 'bottom-center':
						cx = layout.margin.left + (this.layer.getScreenRect().w/2) - (spatial.dim.x/2);
						break;
					case 'top-right':
					case 'center-right':
					case 'bottom-right':
						cx = this.layer.getScreenRect().w - spatial.dim.x - layout.margin.right - this.margin.right;
						break;
				}

				spatial.pos.x = cx;
				spatial.pos.y = cy;

				cy += spatial.dim.y + layout.margin.bottom;

				listNext = listNext.next();
			}

		}
	},

	_entityDim: null,

	_getEntityDimensions: function(list)
	{
		if (!this._entityDim)
			this._entityDim = new h5c3.Dim();

		this._entityDim.x = 0;
		this._entityDim.y = 0;

		var listNext = list.first;
		while (listNext)
		{
			var sp = listNext.obj.getComponent('spatial');
			var layout = listNext.obj.getComponent('layout');

			if (sp)
			{
				this._entityDim.x += layout.margin.left + sp.dim.x + layout.margin.right;
				this._entityDim.y += layout.margin.top + sp.dim.y + layout.margin.bottom;
			}

			listNext = listNext.nextLinked;
		}

		return this._entityDim;
	},

	onResize: function(width, height)
	{
		this.doLayout();
	},

	onEntityAdded: function(entity)
	{
		this._super();
		this.doLayout();
	},

	onEntityRemoved: function(entity)
	{
		this._super();
		this.doLayout();
	},

	onComponentAdded: function(entity, component)
	{
		this._super();
		this.doLayout();
	}
});