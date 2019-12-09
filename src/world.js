var makr = require('makr'),
    utils = require('./utils');

function World() {
    makr.World.call(this);
    this.game = false;
    this.componentRegister = utils.ComponentRegister;
}

//  Extends the Phaser.Plugin template, setting up values we need
World.prototype = Object.create(makr.World.prototype);
World.prototype.constructor = makr.World;

World.prototype.getComponent = function(component) {
    return this.componentRegister.get(component);
};

World.prototype.registerComponent = function(component) {
    return this.componentRegister.register(component);
};

module.exports = World;
