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
    this.load.image('ship', 'assets/ship.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('invader', 'assets/invader.png');
}

function create() {
    Phaser.ECS.game = game;
    Phaser.ECS.scene = this;

    // setup our Components
    var shipController = new ShipController();

    Phaser.ECS.registerComponent(ShipController);
    Phaser.ECS.registerComponent(Position);
    Phaser.ECS.registerComponent(Velocity);
    Phaser.ECS.registerComponent(Radius);
    Phaser.ECS.registerComponent(Display);

    Phaser.ECS.registerSystem(new ShipControlSystem());
    Phaser.ECS.registerSystem(new MovementSystem());
    Phaser.ECS.registerSystem(new BulletSystem());
    Phaser.ECS.registerSystem(new RenderingSystem());


    // this.input.keyboard.addCapture([
    //     Phaser.Input.Keyboard.KeyCodes.SPACEBAR, 
    //     Phaser.Input.Keyboard.KeyCodes.LEFT, 
    //     Phaser.Input.Keyboard.KeyCodes.RIGHT
    // ]);
    this.input.keyboard.addCapture([
        'SPACE', 
        'LEFT', 
        'RIGHT'
    ]);
    var spacebar = this.input.keyboard.addKey('SPACE');
    spacebar.on('down', function () {
        shipController.shoot = true
    });
    spacebar.on('up',function () {
        shipController.shoot = false
    });

    var left = this.input.keyboard.addKey('LEFT');
    left.on('down', function () {
        // console.log('on LEFT down');
        shipController.moveLeft = true
    });
    left.on('up',function () {
        shipController.moveLeft = false
    });

    var right = this.input.keyboard.addKey('RIGHT');
    right.on('down', function () {
        // console.log('on RIGHT down');
        shipController.moveRight = true
    });
    right.on('up',function () {
        shipController.moveRight = false
    });

    EntityCreator.createPlayer(400, 500, shipController);

    for (var y = 0; y < 4; y++) {
        for (var x = 0; x < 10; x++) {
            EntityCreator.createInvader(170 + x * 48, 100 + y * 50);
        }
    }
}
