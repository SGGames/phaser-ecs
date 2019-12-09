var World = require('./world');
var System = require('./system');

var currentECSWorld = new World();

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2018 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser3-plugin-template/blob/master/LICENSE|MIT License}
*/

var ECSPlugin = function (pluginManager)
{
    this.pluginManager = pluginManager;
    this.game = pluginManager.game;
    currentECSWorld.game = this.game;
};

// //  Static function called by the PluginFile Loader.
// ECSPlugin.register = function (PluginManager)
// {
//     //  Register this plugin with the PluginManager, so it can be added to Scenes.

//     //  The first argument is the name this plugin will be known as in the PluginManager. It should not conflict with already registered plugins.
//     //  The second argument is a reference to the plugin object, which will be instantiated by the PluginManager when the Scene boots.
//     //  The third argument is the local mapping. This will make the plugin available under `this.sys.base` and also `this.base` from a Scene if
//     //  it has an entry in the InjectionMap.
//     PluginManager.register('ECS', ECSPlugin, 'ecs');
// };

ECSPlugin.prototype = {
    init: function ()
    {

    },

    //  Called when a Scene is started by the SceneManager. The Scene is now active, visible and running.
    start: function ()
    {        
        var eventEmitter = this.game.events;;

        //  Listening to the following events is entirely optional, although we would recommend cleanly shutting down and destroying at least.
        //  If you don't need any of these events then remove the listeners and the relevant methods too.

        // eventEmitter.on('start', this.start, this);
        eventEmitter.once('destroy', this.gameDestroy, this);
        eventEmitter.on('pause', this.gamePause, this);
        eventEmitter.on('resume', this.gameResume, this);
        eventEmitter.on('resize', this.gameResize, this);
        eventEmitter.on('prestep', this.gamePreStep, this);
        eventEmitter.on('step', this.gameStep, this);
        eventEmitter.on('poststep', this.gamePostStep, this);
        // eventEmitter.on('prerender', this.gamePreRender, this);
        // eventEmitter.on('postrender', this.gamePostRender, this);
    },
    gamePreStep: function (time, delta)
    {
    },
    gameStep: function (time, delta)
    {
        currentECSWorld.update(delta / 1000);
    },
    gamePostStep: function (time, delta)
    {
    },
    gamePause: function ()
    {
    },
    gameResume: function ()
    {
    },
    gameResize: function ()
    {
    },
    gameDestroy: function ()
    {
        // this.shutdown();
        this.pluginManager = null;
        this.game = null;
        this.scene = null;
        this.systems = null;
    }

};

ECSPlugin.prototype.constructor = ECSPlugin;

//  Make sure you export the plugin for webpack to expose

Phaser.ECS = {
    world: currentECSWorld,
    World: World,
    System: System,
    Plugin: ECSPlugin,
    registerComponent: function (aClass){ return this.world.registerComponent(aClass); },
    registerSystem: function (aSystem){ return this.world.registerSystem(aSystem); },
    getComponent: function (aComponent){ return this.world.getComponent(aComponent); },
    create: function (params){ return this.world.create(params); },
    getEntitiesByGroup: function (aGroup){ return this.world.getEntitiesByGroup(aGroup); },
    addToGroup: function (aGameObject, aGroup){ return this.world.addToGroup(aGameObject, aGroup); }
};
module.exports = ECSPlugin;