/*global h5c3: true, gamecore: true, document: true, navigator: true, window: true */
/**
 * H5C3 Framework - Forked from Playcraft v0.5.6
 * See licence.txt for details
 */
/**
 *  H5C3 Framework
 *  Plugin
 * Class:  h5c3.plugin.TileMap
 *  h5c3.Plugin
 * 
 * TileMap class for extended from h5c3.Plugin to provide functionality to the h5c3.
 *
 * 
 * var color = new h5c3.Color([255, 0, 0]); // super red
 * (end)
 */
h5c3.plugin.TileMap = h5c3.Plugin.extend('h5c3.plugin.TileMap',
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

/**
* Class:  h5c3.TileSet
* 
* 
* 
* A set of tiles consisting of a spritesheet, types and properties map. You can use a tile set to define the types
* of tiles you want to appear in a <a href='h5c3.TileMap'>tile map</a> (and thus a <a href='h5c3.TileLayer'>tile layer</a>).
* 
* To construct a tile set, use a spritesheet containing the tile images you want to use:
* 
* var tileSet = new h5c3.TileSet(tileSheet);
* (end)
* Tiles are references by number, sequentially from the top and then across the spritesheet. Each tile number
* corresponds to one frame of the spritsheet. There is presently no support for animated tiles.
* 
* You can also set properties on tiles which can later be used to indicate special areas of a map:
* 
* tileSet.addProperty(0, 'climbable', 'true');
* (end)
* To later check if a tile has a particular property use the hasProperty method:
* 
* var tileNumber = this.getTile(1, 1);
* if (tileNumber >= 0)
*    if (tileSet.hasProperty(tileNumber, 'climable');
*       // climb
* (end)
* For convenience, you should probably just use the tileHasProperty method in the <a href='h5c3.TileMap'>h5c3.TileMap</a>
* class.
* 
* tileLayer.tileMap.tileHasProperty(1, 1, 'climbable')
* (end)
*/
h5c3.TileSet = h5c3.Base.extend('h5c3.TileSet',
{},
/** Interface: h5c3.TileSet.prototype */
{
	/** spritesheet used for tiles */
	tileSpriteSheet:null,
	/** h5c3.Hashmap of properties */
	props:null,

	/**
	 * Constructs a new tile set using the supplied tile sheet
	 * Parameters:  {h5c3.SpriteSheet} spriteSheet Sprite sheet to use for tile images
	 */
	init:function (spriteSheet)
	{
		this.tileSpriteSheet = spriteSheet;
		this.props = new Array(spriteSheet.totalFrames);
		for (var i = 0; i < this.props.length; i++)
		{
			this.props[i] = new h5c3.Hashmap();
		}
	},

	/**
	 * Draw a tile; typically for debugging or other strange purposes. Usually drawing is handled by the tile layer
	 * Parameters:  Object ctx Context to draw the tile upon
	 * Parameters:  Number tileNumber
	 * Parameters:  Number x Frame x position within the spritesheet
	 * Parameters:  Number y Frame y position within the spritesheet
	 */
	drawTile:function (ctx, tileNumber, x, y)
	{
		this.tileSpriteSheet.drawFrame(
			ctx,
			tileNumber % this.tileSpriteSheet.framesWide,
			h5c3.Math.floor(tileNumber / this.tileSpriteSheet.framesWide),
			x, y);
	},

	/**
	 * Adds a key/value property to a tile type
	 * Parameters:  Number tileNumber Tile number to add the tile to
	 * Parameters:  String key Key string
	 * Parameters:  String value Value to add
	 */
	addProperty:function (tileNumber, key, value)
	{
		this.props[tileNumber].put(key, value);
	},

	/**
	 * Checks if a particular tile number (tile type) has a given property set
	 * Parameters:  Number tileNumber Tile number to check
	 * Parameters:  String key The key to test for
	 * Returns: Boolean true if the property is set
	 */
	hasProperty:function (tileNumber, key)
	{
		return this.props[tileNumber].hasKey(key);
	},

	/**
	 * Gets all the properties associated with a given tile number
	 * Parameters:  Number tileNumber Tile number to get properties for
	 * Returns: {h5c3.Hashmap} Hashmap of the properties
	 */
	getProperties:function (tileNumber)
	{
		return this.props[tileNumber];
	}
});

/**
* Class:  h5c3.TileMap
* 
* 
* 
* A map of tiles using by h5c3.TileLayer to what to draw. See <a href='h5c3.TileLayer'>h5c3.TileLayer</a> for details
* on using a tile map with a tile layer.
* 
* A tile map contains both a 2d array of tile data, size of each tile and the size of the map. It also links to
* a spritesheet which contains the tile images to render.
* 
* An example tile map setup:
* 
* var tileMap = new h5c3.TileMap(new h5c3.TileSet(tileSheet), 100, 100, 32, 32);
*
* // set all the tiles to empty
* tileMap.generate(0);
*
* // set the tile at tile position x=3, y=2 to tile number 1
* tileMap.setTile(3, 2, 1);
* (end)
* 
* You can directly access tile data using the tiles member:
* 
* tileMap.tiles[tileY][tileX] = tileType;
* (end)
* 
* If you do modify the tile map though, and you're using prerendering you will need to call prerender on the tile
* layer so the prerendered images are updated.
*/
h5c3.TileMap = h5c3.Base.extend('h5c3.TileMap',
/** Interface: h5c3.TileMap */
{
	EMPTY_TILE:-1
},
/** Interface: h5c3.TileMap.prototype */
{
	/** 2d array of tile data */
	tiles:null,
	/** Number of tiles the map is wide */
	tilesWide:0,
	/** Number of tiles the map is high */
	tilesHigh:0,
	/** Width of each tile */
	tileWidth:0,
	/** Height of each tile */
	tileHeight:0,
	/** Current tile set */
	tileSet:null,

	/**
	 * Constructs a new tile map using the supplied dimensions and tile set
	 * Parameters:  {h5c3.TileSet} tileSet Tile set to use
	 * Parameters:  Number tilesWide Number of tiles the map is wide
	 * Parameters:  Number tilesHigh Number of tiles the map is high
	 * Parameters:  Number tileWidth Width of each tile (e.g. 32)
	 * Parameters:  Number tileHeight Height of each tile (e.g. 32)
	 * Parameters:  Array tiles An array of tile data ordered by y then x
	 */
	init:function (tileSet, tilesWide, tilesHigh, tileWidth, tileHeight, tiles)
	{
		this.tiles = tiles;
		this.tileWidth = h5c3.Math.round(tileWidth);
		this.tileHeight = h5c3.Math.round(tileHeight);
		this.tilesWide = h5c3.Math.round(tilesWide);
		this.tilesHigh = h5c3.Math.round(tilesHigh);
		this.tileSet = tileSet;
	},

	/**
	 * Checks against this tilemap's tileset to see if the tile at a given location has a property set
	 * Parameters:  Number tileX X tile location to check
	 * Parameters:  Number tileY Y tile location to check
	 * Parameters:  String property Property string to check for
	 */
	tileHasProperty:function (tileX, tileY, property)
	{
		// get the number of the tile at tileX, tileY
		var tileNumber = this.getTile(tileX, tileY);
		if (tileNumber >= 0)
			return this.tileSet.hasProperty(tileNumber, property);
		return false;
	},


	/**
	 * Generate a new tile map, optionally populating with a given tile type
	 * Parameters:  Number tileType Type of tile to set the map to. Leave off to leave the tile map empty
	 */
	generate:function (tileType)
	{
		this.tiles = new Array(this.tilesHigh);
		var t = $CHK(tileType, this.Class.EMPTY_TILE);

		for (var aty = 0; aty < this.tilesHigh; aty++)
		{
			this.tiles[aty] = new Array(this.tilesWide);
			for (var atx = 0; atx < this.tilesWide; atx++)
				this.tiles[aty][atx] = t;
		}
	},

	/**
	 * Populate an area of the tile map with a given tile type
	 * Parameters:  Number x tile X position to start the paint
	 * Parameters:  Number y tile Y position to start the paint
	 * Parameters:  Number w How wide to paint
	 * Parameters:  Number h How high to paint
	 * Parameters:  Number tileType Type of tile to paint
	 */
	paint:function (x, y, w, h, tileType)
	{
		for (var aty = y; aty < y + h; aty++)
			for (var atx = x; atx < x + w; atx++)
				this.tiles[aty][atx] = tileType;
	},

	/**
	 * Checks if a given tile location is within the tile map dimensions
	 * Parameters:  Number x Tile x
	 * Parameters:  Number y Tile y
	 * Returns: Boolean true if the location is on the map
	 */
	isOnMap:function (x, y)
	{
		return (x >= 0 && x < this.tilesWide && y >= 0 && y < this.tilesHigh);
	},

	/**
	 * Clear a region of the tile map (setting the tiles to 0)
	 * Parameters:  Number tx Starting tile x
	 * Parameters:  Number ty Starting tile y
	 * Parameters:  Number tw Number of tiles wide to clear
	 * Parameters:  Number th Number of tiles high to clear
	 */
	clear:function (tx, ty, tw, th)
	{
		this.paint(tx, ty, tw, th, this.Class.EMPTY_TILE);
	},

	/**
	 * Sets a tile at a given location
	 * Parameters:  Number tx Tile x
	 * Parameters:  Number ty Tile y
	 * Parameters:  Number tileType Type to set
	 */
	setTile:function (tx, ty, tileType)
	{
		this.tiles[ty][tx] = tileType;
	},

	/**
	 * Get the tile type at a given tile location
	 * Parameters:  Number tx Tile x
	 * Parameters:  Number ty Tile y
	 * Returns: Number type of tile at that location or -1 if not on the map
	 */
	getTile:function (tx, ty)
	{
		if (!this.isOnMap(tx, ty)) return -1;
		return this.tiles[ty][tx];
	},

	/**
	 * Loads a tile map from a TMX formatted data stream
	 * Parameters:  String layerXML XML string loaded from a Tiled TMX file
	 */
	loadFromTMX:function (layerXML, tileWidth, tileHeight)
	{
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;

		this.tilesWide = parseInt(layerXML.getAttribute('width'));
		this.tilesHigh = parseInt(layerXML.getAttribute('height'));

		var data = layerXML.getElementsByTagName('data')[0];
		if (data.getAttribute('compression'))
		{
			this.error('map: ' + name + ': TMX map compression not supported, use base64 encoding');
			return;
		}

		if (data.getAttribute('encoding') == 'base64')
		{
			// convert the base64 data to tiles
			var tileData = '';
			for (var n = 0; n < data.childNodes.length; n++)
				tileData += data.childNodes[n].nodeValue;

			// trim
			tileData = tileData.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			var decoded = atob(tileData);

			// decode as an array
			var a = [];
			for (var i = 0; i < decoded.length / 4; i++)
			{
				a[i] = 0;
				for (var j = 3; j >= 0; --j)
					a[i] += decoded.charCodeAt((i * 4) + j) << (j << 3);
			}
		}

		// todo: merge this with the above decode to speed up map setup
		this.tiles = new Array(this.tilesHigh);

		for (var aty = 0; aty < this.tilesHigh; aty++)
		{
			this.tiles[aty] = new Array(this.tilesWide);
			for (var atx = 0; atx < this.tilesWide; atx++)
				this.tiles[aty][atx] = a[aty * this.tilesWide + atx] - 1;
		}
	}
});

/**
* Class:  h5c3.TileLayer
* 
* [Extends <a href='h5c3.Layer'>h5c3.Layer</a>]
* 
* A tile layer is a specialized layer capable of managing and rendering large graphics layers using tiles of a
* set dimension. Tile layers are more efficient to edit, update and render due to the set size of each tile.
* 
* To create a tile layer, first create a <a href='h5c3.TileMap'>tile map</a> containing the tile images and map data:
* 
* // grab a tile sheet previously added to the resource loader
* var tileSheet = new h5c3.SpriteSheet(
*    { image:h5c3.device.loader.get('myTiles').resource,
*      frameWidth:32, frameHeight:32 });
*
* // create a tile map to hold our tile data, using the supplied tile sheet
* // 100 tiles wide by 100 tiles high with a tile height and width of 32
* var tileMap = new h5c3.TileMap(new h5c3.TileSet(tileSheet), 100, 100, 32, 32);
*
* // set all the tiles to empty
* tileMap.generate(0);
*
* // set the tile at tile position x=3, y=2 to tile number 1
* tileMap.setTile(3, 2, 1);
*
* // create the tile layer using the supplied tile map
* var myTileLayer = new h5c3.TileLayer('my tile layer', true, tileMap);
* (end)
* 
* Refer to <a href='h5c3.TileMap'>h5c3.TileMap</a> and <a href='h5c3.TileSet'>h5c3.TileSet</a> for more information on tile
* graphics and maps.
* 
* <h5>Tiled Editor Integration</h5>
* You can dynamically construct a tile layer using XML data from the Tiled map editor using the static loadFromTMX
* constructor. Typically this is not used directly; you should use the h5c3.Scene loadFromTMX method for more information
* on loading levels using Tiled.
* 
* <h5>Prerendering</h5>
* By default, tile layers will use prerendering in order to "prebake" large blocks of tiles into cached images.
* These images are then drawn instead of the individual tiles. This results in a large performance boost (5x to 10x) in
* rendering speed. Prerendering is enabled by default.
* 
* There are some cases where prerendering may not be the best option, these include:
* <ul>
*     <li>When tile maps are regularly changing during a game - you will need to constantly re-render the tile blocks
*     which is a slow process (relative to just drawing the tiles on each update)</li>
*     <li>If the size of tiles is greater than 256x256 you may find only a minor speed difference (at the expense
*     of graphics memory). Prerendering is disabled by default if you specify a tile map with a tile size greater
*     than 256x256.</li>
* </ul>
* 
* You can disable prerendering using the constructor option:
* 
* // false indicates prerendering should not be used
* var myTileLayer = new h5c3.TileLayer('my tile layer', false);
* (end)
* 
* If you change the tile map, you can use the prerender method to update the cache images.
*/
h5c3.TileLayer = h5c3.Layer.extend('h5c3.TileLayer',
/** Interface: h5c3.TileLayer */
{
	/**
	 * Constructs a tile layer using data from a TMX formatted (XML base 64) data stream
	 * Parameters:  {h5c3.Scene} scene Scene to add the new layer to
	 * Parameters:  String layerXML XML data for layer
	 * Parameters:  Number tileWidth Width of each tile
	 * Parameters:  tileHeight Height of each tile
	 */
	loadFromTMX:function (scene, layerXML, tileWidth, tileHeight, tileSet)
	{
		var name = layerXML.getAttribute('name');
		var newLayer = new h5c3.TileLayer(name, true, null, tileSet);

		// fill in the rest using the data from the TMX file

		newLayer.tileMap.loadFromTMX(layerXML, tileWidth, tileHeight);
		scene.addLayer(newLayer);
	}
},
/** Interface: h5c3.TileLayer.prototype */
{
	/** h5c3.TileMap data used for this tile layer */
	tileMap:null,
	/** show a debugging grid around all the tiles */
	_dbgShowGrid:false,
	/** array of prerendered images */
	prerenders:null,
	/** indicates if prerendering is currently in use */
	usePrerendering:true,
	/** the size of the prerender chunks - default is 512 */
	prerenderSize:512,

	/**
	 * Constructor for the tile layer
	 * Parameters:  String name Name of the layer
	 * Parameters:  Boolean [usePrerendering] Whether prerendering should be used (defaults to true)
	 * Parameters:  {h5c3.TileMap} [tileMap] Tile map data used for the tile layer
	 * Parameters:  {h5c3.TileSet} [tileSet] If no tile map is supplied, you can optional provide a tile set and a
	 * tile map will be constructed using this tile set
	 */
	init:function (name, usePrerendering, tileMap, tileSet)
	{
		this._super(name);
		this.tileMap = $CHK(tileMap, new h5c3.TileMap(tileSet));

		this.usePrerendering = $CHK(usePrerendering, true);
		if (this.tileMap && this.tileMap.tileWidth > 256)
			this.usePrerendering = false;
	},

	/**
	 * Set the tile map
	 * Parameters:  {h5c3.TileMap} tileMap The tile map to set
	 */
	setTileMap:function (tileMap)
	{
		this.tileMap = tileMap;
		if (this.usePrerendering)
			this.prerender();
	},

	/**
	 * Prerender using the current tilemap and tileset. Called automatically when a tile map is changed or when
	 * the tile layer is constructed. Only needs to be called again if you change the tile map or tile set.
	 */
	prerender:function ()
	{
		var totalWidth = this.tileMap.tilesWide * this.tileMap.tileWidth;
		var totalHeight = this.tileMap.tilesHigh * this.tileMap.tileHeight;

		var prerendersWide = Math.ceil(totalWidth / this.prerenderSize);
		var rows = Math.ceil(totalHeight / this.prerenderSize);

		this.prerenders = [];
		for (var cy = 0; cy < rows; cy++)
		{
			this.prerenders[cy] = [];

			for (var cx = 0; cx < prerendersWide; cx++)
			{
				var prw = (x == prerendersWide - 1) ? totalWidth - x * this.prerenderSize : this.prerenderSize;
				var prh = (y == rows - 1) ? totalHeight - y * this.prerenderSize : this.prerenderSize;

				// draw the tiles in this prerender area
				var tw = prw / this.tileMap.tileWidth + 1;
				var th = prh / this.tileMap.tileHeight + 1;

				var nx = (cx * this.prerenderSize) % this.tileMap.tileWidth,
					ny = (cy * this.prerenderSize) % this.tileMap.tileHeight;

				var tx = Math.floor(cx * this.prerenderSize / this.tileMap.tileWidth),
					ty = Math.floor(cy * this.prerenderSize / this.tileMap.tileHeight);

				var canvas = document.createElement('canvas');
				canvas.width = prw;
				canvas.height = prh;
				var ctx = canvas.getContext('2d');

				for (var x = 0; x < tw; x++)
				{
					for (var y = 0; y < th; y++)
					{
						if (x + tx < this.tileMap.tilesWide && y + ty < this.tileMap.tilesHigh)
						{
							var tileType = this.tileMap.getTile(x + tx, y + ty);
							if (tileType >= 0)  // -1 means no tile
							{
								this.tileMap.tileSet.drawTile(
									ctx,
									tileType,
									(x * this.tileMap.tileWidth) - nx,
									(y * this.tileMap.tileHeight) - ny);
							}
						}
					}
				}

				this.prerenders[cy][cx] = canvas;
			}
		}
	},

	/**
	 * Draws the tile layer to the current context (typically called automatically by the scene)
	 */
	draw:function ()
	{
		this._super();
		if (!this.tileMap || !this.tileMap.tilesWide) return;

		if (this.usePrerendering)
			this.drawPrerendered();
		else
			this.drawTiled();
	},

	/**
	 * Draws the tiled version of the layer (called automatically by a call to draw if prerendering is not used)
	 */
	drawTiled:function ()
	{
		// figure out which tiles are on screen
		var tx = Math.floor(this.origin.x / this.tileMap.tileWidth);
		if (tx < 0) tx = 0;
		var ty = Math.floor(this.origin.y / this.tileMap.tileHeight);
		if (ty < 0) ty = 0;

		var tw = (Math.ceil((this.origin.x + this.scene.viewPort.w) / this.tileMap.tileWidth) - tx) + 2;
		if (tx + tw >= this.tileMap.tilesWide - 1) tw = this.tileMap.tilesWide - 1 - tx;
		var th = (Math.ceil((this.origin.y + this.scene.viewPort.h) / this.tileMap.tileHeight) - ty) + 2;
		if (ty + th >= this.tileMap.tilesHigh - 1) th = this.tileMap.tilesHigh - 1 - ty;

		for (var y = ty, c = ty + th; y < c + 1; y++)
		{
			var ypos = this.screenY(y * this.tileMap.tileHeight);

			for (var x = tx, d = tx + tw; x < d; x++)
			{
				var tileType = this.tileMap.tiles[y][x];
				if (tileType >= 0)  // -1 means no tile
				{
					this.tileMap.tileSet.drawTile(
						h5c3.device.ctxGame, tileType,
						this.screenX(x * this.tileMap.tileWidth), ypos);
				}

				if (this._dbgShowGrid)
				{
					h5c3.device.ctxGame.save();
					h5c3.device.ctxGame.strokeStyle = '#222222';
					h5c3.device.ctxGame.strokeRect(this.screenX(x * this.tileMap.tileWidth), this.screenY(y * this.tileMap.tileHeight),
						this.tileMap.tileWidth, this.tileMap.tileHeight);
					h5c3.device.ctxGame.restore();
				}
			}
		}
	},

	/**
	 * Draws the prerendered version of the layer (called automatically by a call to draw if prerendering is used)
	 */
	drawPrerendered:function ()
	{
		if (!this.prerenders)
			this.prerender();

		var drawX = -(this.origin.x) + this.scene.viewPort.x;
		var drawY = -(this.origin.y) + this.scene.viewPort.y;
		var startPX = Math.max(Math.floor(this.origin.x / this.prerenderSize), 0);
		var startPY = Math.max(Math.floor(this.origin.y / this.prerenderSize), 0);
		var maxPX = startPX + Math.ceil((this.origin.x + this.scene.viewPort.w) / this.prerenderSize);
		var maxPY = startPY + Math.ceil((this.origin.y + this.scene.viewPort.h) / this.prerenderSize);

		maxPX = Math.min(maxPX, this.prerenders[0].length);
		maxPY = Math.min(maxPY, this.prerenders.length);

		for (var cy = startPY; cy < maxPY; cy++)
			for (var cx = startPX; cx < maxPX; cx++)
				h5c3.device.ctxGame.drawImage(this.prerenders[cy % this.prerenders.length][cx % this.prerenders[0].length],
					drawX + (cx * this.prerenderSize), drawY + (cy * this.prerenderSize));
	}



});

/**
* Class:  h5c3.IsoTileLayer
* 
* [Extends <a href='h5c3.TileLayer'>h5c3.TileLayer</a>]
* 
* An Iso tile layer is a specialized layer capable of managing and rendering large graphics isometric layers using tiles of a
* set dimension. Tile layers are more efficient to edit, update and render due to the set size of each tile.
* 
* To create a tile layer, first create a <a href='h5c3.TileMap'>tile map</a> containing the tile images and map data:
* 
* // grab a tile sheet previously added to the resource loader
* var tileSheet = new h5c3.SpriteSheet(
*    { image:h5c3.device.loader.get('myTiles').resource,
*      frameWidth:32, frameHeight:32 });
*
* // create a tile map to hold our tile data, using the supplied tile sheet
* // 100 tiles wide by 100 tiles high with a tile height and width of 32
* var tileMap = new h5c3.TileMap(new h5c3.TileSet(tileSheet), 100, 100, 32, 32);
*
* // set all the tiles to empty
* tileMap.generate(0);
*
* // set the tile at tile position x=3, y=2 to tile number 1
* tileMap.setTile(3, 2, 1);
*
* // create the tile layer using the supplied tile map
* var myTileLayer = new h5c3.IsoTileLayer('my tile layer', true, tileMap);
* (end)
* 
* Refer to <a href='h5c3.TileMap'>h5c3.TileMap</a> and <a href='h5c3.TileSet'>h5c3.TileSet</a> for more information on tile
* graphics and maps.
* 
* <h5>Tiled Editor Integration</h5>
* You can dynamically construct a tile layer using XML data from the Tiled map editor using the static loadFromTMX
* constructor. Typically this is not used directly; you should use the h5c3.Scene loadFromTMX method for more information
* on loading levels using Tiled.
* 
* <h5>Prerendering</h5>
* By default, iso tile layers have prerendering disabled by the time being.
* 
* If you change the tile map, you can use the prerender method to update the cache images.
*/
h5c3.IsoTileLayer = h5c3.TileLayer.extend("IsoTileLayer",
{
/**
 * Constructs a iso tile layer using data from a TMX formatted (XML base 64) data stream
 * Parameters:  {h5c3.Scene} scene Scene to add the new layer to
 * Parameters:  String layerXML XML data for layer
 * Parameters:  Number tileWidth Width of each tile
 * Parameters:  tileHeight Height of each tile
 */
loadFromTMX: function (scene, layerXML, tileWidth, tileHeight, tileSet) {
  var name = layerXML.getAttribute('name');
  var newLayer = new h5c3.IsoTileLayer(name, true, null, tileSet);

  // fill in the rest using the data from the TMX file

  newLayer.tileMap.loadFromTMX(layerXML, tileWidth, tileHeight);
  scene.addLayer(newLayer);
}
},
{
/**
 * Constructor for the tile layer
 * Parameters:  String name Name of the layer
 * Parameters:  Boolean [usePrerendering] Whether prerendering should be used (defaults to true)
 * Parameters:  {h5c3.TileMap} [tileMap] Tile map data used for the tile layer
 * Parameters:  {h5c3.TileSet} [tileSet] If no tile map is supplied, you can optional provide a tile set and a
 * tile map will be constructed using this tile set
 */
init: function (name, usePrerendering, tileMap, tileSet) {
  this._super(name);
  this.tileMap = $CHK(tileMap, new h5c3.TileMap(tileSet));
  this.usePrerendering = false;
},

/**
 * Draws the tiled version of the layer (called automatically by a call to draw if prerendering is not used)
 */
drawTiled: function () {
  // Figure out which tiles are on screen
  var tile_x = this.tileMap.tiles[0].length;
  if (tile_x < 0) {
	tile_x = 0;
  }

  var tile_y = this.tileMap.tiles.length;
  if (tile_y < 0) {
	tile_y = 0;
  }

  var screen_width = this.scene.viewPort.w;
  var screen_height = this.scene.viewPort.h;

  var tile_width = this.tileMap.tileWidth;
  var tile_height = this.tileMap.tileHeight;

  var screen_center = this.scene.viewPort.w / 2 - tile_width / 2;

  var x, y, factor = 0.5;
  for (y = tile_y - 1; y >= 0; y--) {

	for (x = tile_x - 1; x >= 0; x--) {
	  var tileType = this.tileMap.tiles[y][x];

	  if (x < y) {
		this.tileMap.tileSet.drawTile(h5c3.device.ctxGame, tileType, screen_center + tile_width * (x - y) * factor, tile_height * (y + x) * factor);

	  } else if (x > y) {
		this.tileMap.tileSet.drawTile(h5c3.device.ctxGame, tileType, screen_center - tile_width * (y - x) * factor, tile_height * (x + y) * factor);

	  } else {
		this.tileMap.tileSet.drawTile(h5c3.device.ctxGame, tileType, screen_center, tile_height * y); //centre row
	  }
	}
  }
}
});