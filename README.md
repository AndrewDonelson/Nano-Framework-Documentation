com.I2TMLabs.h5c3
=================

GitHub Website: http://nlaakald.github.io/H5C3-Framework

Official Website: http://www.i2tmlabs.com/

HTML5 &amp; CSS3 compliant Framework that provides Web Apps that work on Mobile devices, Desktops and Even Game consoles. No installation required, everything resides int he cloud. Entire framework and website was designed with the developer in mind.

Browsers Supported:
===================
Only Chrome Browser is supported.

Platforms & Devices Supported
=============================
I2TM Labs is designed around the Google Chromium Framework. No other browser is currently supported at this time.
The reason for this is simple...Google Chrome just works, flawlessy with all W3C standards. Microsoft Internet Explorer,
Apple Safari have bugs and issues which even though a work around could be done...it would diminish your overall experience
with our services and applications.

<pre>
iOS 4.3 & Later
Android 4.0 & Latar
Windows XP Service Pack 2+
Windows Vista
Windows 7
Windows 8
Mac OS X 10.6 or later
Ubuntu 10.04+
Debian 6+
OpenSuSE 11.3+
Fedora Linux 14

Advanced Users Can also Play use our services on these platforms
Xbox 360
Playstation 3
Wii U
Wii (Possible...Some signs of issues on the forums)
</pre>

Features
========
<pre>
- 100% HTM5 & CSS3 Compliant
- Easy to use, Rapid Application Development
- Integrated Developer Window w/ Console Logging, Statisical Graphs and Profiler
- Total size of Framework is 94kb!
- Users never have to download & install, Updates are instant & users can use on all platforms.
- Simple efficient way of Creating & Extending Scenes, Layers 
- Factories for Graphics and Sounds
- Embeded XML for Resource loading - No Programming
- Automatic Intro (I2TM Splash, H5C3 Splash)
- State manager
- Full Physics Engine powered by Box2D
- Entity manager for all graphic objects
- Automatic device detection (Touchpad integration)
- Seamless Banner (advertising) Just right the WebApp and get paid.
- Wide range of platforms supported
</pre>

Component List
==============
<pre>
- Activator				Causes an entity to be inactive (no rendering or physics etc) until another entity moves within range of it. Great for autosleeping all your monsters until the player gets close.
- Alpha					Changes the alpha drawing of an associated drawable object (sprite, shape, text etc).
- Circle				Draw a circle. The size is based on the width and height of the associated spatial.
- Clip					Clips all rendering for an entity to be within the specified rect (in layer relative coordinates). You can also specify an entity, which will clip based on the spatial rectangle of the other entity. You can also do both entity clipping as well as stacking a rectangle clip on top.
- Component				The base class for components you want to create.
- Expiry				Automatically expires an entity after a given time. Great for things like bullets that have a known lifetime; just add the expiry component and it will happily kill itself (release) after the given time.
- Fade					Adds a fade effects to the entity.
- Input					Convenience component that lets you bind input states and actions to an entity.
- Joint					Creates a joint that holds to physics entities together.
- Layout				Automatically positions an entity on screen using a variety of layout options.
- Originshifter			Shifts the origin of the entity relative to the origin of the layer it's on, with an additional origin ratio adjuster. You can use this to make an entity shift around as the layer origin moves (parallax within parallax).
- Overlay				Used to lay another sprite over an entity, with options to automagically expire after a certain time limit. Good for things like smoke, explosive damage or muzzle flashs, and where you don't need to create a complete entity.
- Particleemitter		A particle generator.
- Physics				Adds 2D physics to an entity.
- Poly					Draw a polygon
- Rect					Adds a rectangle to an entity.
- Scale					Change the draw scale of an entity.
- Spatial				Represents where an entity exists in 2D space (x, y, width and height). This component is mostly for use by other systems to update and use.
- Spin					Makes an entity spin.
- Sprite				Adds a sprite to an entity.
- Text					Adds display text to an entity.
</pre>

Systems List
============
<pre>
- Activation			Handles activating entities when they get within a certain range of another entity.
- Effects				A effects system that drives effects like fade.
- Entity System			A system that processes entities.
- Expiry				Expiry system.
- Input					Input system.
- Layout				Manages the layout of entities
- Particles				A particle system.
- Physics				A 2D physics system for entities.
- Render				Handles rendering of components: sprite, overlay, rect, text, ect.
- System				The base class for all systems & creating new ones.
</pre>

Example of primary HTML file
============================
<pre>
&lt;!DOCTYPE HTML&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt; 
    &lt;title&gt;I2TM: Example Template&lt;/title&gt; 
	&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, minimum-scale=1.0,  maximum-scale=1.0&quot;&gt; 
    &lt;meta name=&quot;apple-mobile-web-app-capable&quot; content=&quot;yes&quot;/&gt; 
	&lt;link href=&quot;css/default.css&quot; rel=&quot;stylesheet&quot; type=&quot;text/css&quot; /&gt; 
	&lt;script id=&quot;resources&quot; type=&quot;text/xmldata&quot;&gt;
	&lt;resources&gt;
	&lt;game name=&quot;Template&quot; version=&quot;0.1&quot; publisher=&quot;I2TM Software&quot; copyright=&quot;2012-2013&quot; /&gt;
	&lt;credit name=&quot;Author&quot; entity=&quot;Andrew Donelson&quot; url=&quot;http://www.i2tmsoftware.com&quot; desc=&quot;Author&quot; /&gt;
	&lt;credit name=&quot;playcraft&quot; entity=&quot;Playcraft Labs&quot; url=&quot;http://www.playcraftlabs.com&quot; desc=&quot;I2TM Engine forked from PlaycraftJS v0.5.6&quot; /&gt;
	&lt;credit name=&quot;sm2&quot; entity=&quot;SoundManager2&quot; url=&quot;http://www.schillmania.com/projects/soundmanager2/&quot; desc=&quot;Used in I2TM Engine as primary Sound API&quot; /&gt;
	&lt;credit name=&quot;padolsey&quot; entity=&quot;James Padolsey&quot; url=&quot;https://github.com/padolsey/string/blob/master/string.js&quot; desc=&quot;Used in I2TM Engine extended String API&quot; /&gt;
	&lt;credit name=&quot;marasteanu&quot; entity=&quot;Alexandru Marasteanu&quot; url=&quot;http://www.diveintojavascript.com/projects/javascript-sprintf&quot; desc=&quot;Used in I2TM Engine to add sprintf capability&quot; /&gt;
	&lt;language name=&quot;english&quot; from=&quot;english&quot; to=&quot;english&quot; /&gt;
	&lt;language name=&quot;spanish&quot; from=&quot;english&quot; to=&quot;spanish&quot; /&gt;
	&lt;language name=&quot;german&quot; from=&quot;english&quot; to=&quot;german&quot; /&gt;
	&lt;!-- &lt;sound name=&quot;i2tm&quot; ogg=&quot;true&quot; mp3=&quot;true&quot; channels=&quot;1&quot; file=&quot;sounds/i2tm&quot; /&gt; --&gt;
	&lt;image name=&quot;title&quot; file=&quot;images/title.png&quot; /&gt;	
	&lt;image name=&quot;puppy&quot; file=&quot;images/puppy.png&quot; /&gt;	
	&lt;image name=&quot;touchpad&quot; file=&quot;images/touchpad_buttons.png&quot; /&gt;	            
	&lt;image name=&quot;splash&quot; file=&quot;images/splash.png&quot; /&gt;
	&lt;/resources&gt;
	&lt;/script&gt;
&lt;/head&gt; 
&lt;body&gt;
	&lt;script type=&quot;text/javascript&quot; src=&quot;../h5c3/lib/h5c3.js&quot;&gt;&lt;/script&gt;
	&lt;!-- Engine creates game elements and restores upon friendly exit. --&gt;
	&lt;div id=&quot;pcGameDiv&quot;&gt;
		&lt;div&gt;
		&lt;div id=&quot;cantplay&quot;&gt;We're Sorry, But you are not using Google Chrome which is required.&lt;/div&gt;
		&lt;div id=&quot;playnow&quot;&gt;&lt;a id=&quot;playnow&quot; class=&quot;caption&quot; href=&quot;javascript:pc.start('js/', ['game.main.js','touch.main.js','factory.entity.js','factory.sound.js','scene.mainmenu.js','scene.touchpad.js','scene.game.js','system.touchpad.js'],'../h5c3/lib/');&quot;&gt;Play Now&lt;/a&gt;&lt;/div&gt;
		&lt;script type=&quot;text/javascript&quot;&gt;BrowserIsChrome();&lt;/script&gt;
		&lt;/div&gt;
		&lt;div&gt;&lt;strong&gt;Game Title&lt;/strong&gt;&lt;p&gt;replaces this text with the description of your game here&lt;/p&gt;&lt;/div&gt;
		&lt;div&gt;&lt;strong&gt;Help&lt;/strong&gt;&lt;p&gt;Replace this with how to play or other helpful information&lt;/p&gt;&lt;/div&gt;
	&lt;/div&gt;
	&lt;div id=&quot;pcConsole&quot;&gt;&lt;textarea id=&quot;pcConsoleLog&quot;&gt;&lt;/textarea&gt;&lt;/div&gt;
	&lt;canvas id=&quot;pcDebug&quot;&gt;&lt;/canvas&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>

Example of Main Game File
=========================
<pre>
/*******************************************************************************************
 * Main program - A skeleton project for you to start from
 *
 * @package	com.i2tm.web.template
 * @author Andrew Donelson (nlaakald@gmail.com)
 * @version 0.1.0-alpha [dev|alpha|beta|chi|prod]
 *******************************************************************************************/
var 
	GAMENAME = 'I2TM Template',
	GAMEVERSION = '0.1.0-alpha',
	GAMETAG = GAMENAME + ' v' + GAMEVERSION;

MySceneID = 
{
    MYSCENE01:	0x0010,
    MYSCENE02:	0x0011,
    MYSCENE03:	0x0012
};

Game = h5c3.Game.extend('Game',
    { },
    {
		mainmenuScene:	null,
		gameScene:		null,
		
		init:function(ctx,size)
		{
		    this._super(ctx,size);
      	},

		inactivateAllScenes:function()
		{
			this.setLayerInactive(mainmenuScene);
			this.setLayerInactive(gameScene);
		},
				
		setScene:function(scene, scene_id) 
		{
			this._super(scene,scene_id);
			
		},
		
        onReady:function ()
        {
            this._super();
        },
		
		onExit:function()
		{
			this._super();
		}
    });
</pre>

Designing your graphics
======================
<pre>
All graphics are designed for Full HD (1920x1080). When the WebApp runs it will detect what kind of 
devices is is running on and adapt accorinly. For example if the the device is on a desktop it will 
use the entire window giving a landscape view, if it is on a mobile device which requires touch it 
will run in portrait mode and get the width (most narrow) and make a perfect square for the Game 
Panel. In this case it will use the dead center of the image for the detected size.
</pre>
