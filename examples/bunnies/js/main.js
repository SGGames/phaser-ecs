var game = new Phaser.Game({
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    scene: {
        preload: preload,
        create: create
    },
    plugins: {
        global: [
            { key: 'ECSPlugin', plugin: Phaser.ECS.Plugin, start: true, mapping: 'ecs' }
        ]
    },
});

function preload() {
    this.load.image('bunny', 'assets/bunny.png');
}

function create() {
    Phaser.ECS.game = game;
    Phaser.ECS.scene = this;

    // setup our Components
    Phaser.ECS.registerComponent(Position);
    Phaser.ECS.registerComponent(Velocity);
    Phaser.ECS.registerComponent(Clock);
    Phaser.ECS.registerComponent(Radius);
    Phaser.ECS.registerComponent(Display);

    Phaser.ECS.registerSystem(new GravitySystem());
    Phaser.ECS.registerSystem(new CollisionSystem());
    Phaser.ECS.registerSystem(new MovementSystem());
    Phaser.ECS.registerSystem(new RenderingSystem());
    Phaser.ECS.registerSystem(new LifetimeSystem());

    // this.input.keyboard.on('keydown', function (event) {
    //     console.log(event.key);
    // });

    // this.input.keyboard.on('keydown_SPACE', function (event) {
    //     console.log('Hello from the Space Bar!');
    //     createBunnies(10);
    // });
    this.input.keyboard.addCapture('SPACE');
    var spacebar = this.input.keyboard.addKey('SPACE');
    spacebar.on('down', function() { createBunnies(10); });
}

function rand(min, max) {
    return min + Math.random() * (max - min + 1) | 0;
}

function createBunnies(number) {
    console.log('createBunnies');
    while (number--) {
        var bunny = Phaser.ECS.create();

        bunny.add(new Position(rand(0, 800), rand(0, 600)), Phaser.ECS.getComponent(Position));
        // bunny.add(new Velocity(rand(10, 100), rand(10, 100)), Phaser.ECS.getComponent(Velocity));
        bunny.add(new Radius(rand(10, 50)), Phaser.ECS.getComponent(Radius));
        bunny.add(new Clock(rand(5, 10)), Phaser.ECS.getComponent(Clock));
        bunny.add(new Display('bunny'), Phaser.ECS.getComponent(Display));
    }
}
