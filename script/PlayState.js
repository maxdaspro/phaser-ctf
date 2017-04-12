let PlayState = {};

//variables
let map;
let cursors;
let car;
let enemies;
let flag;
let layers = {};

PlayState.preload = function(){
    game.load.tilemap("map", "assets/images/ctf.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image("car", "assets/images/car.png");
    game.load.image("tiles", "assets/images/tiles.png");
    game.load.image("flag", "assets/images/flag2.png");
}

PlayState.create = function(){

    map = game.add.tilemap('map');
    map.addTilesetImage('tiles');

    let objs = game.add.group();
    objs.enableBody = true;

    layers = {
        fond: map.createLayer('fond'),
        bases: map.createLayer('bases'),
        obstacle: map.createLayer('obstacle'),
        collisions: map.createLayer('collisions')
    };

    layers.fond.resizeWorld();
    layers.collisions.resizeWorld();

    map.setCollisionBetween(1, 2000, true, layers.collisions);

    layers.collisions.alpha = 0;

    car = game.add.sprite(50, 290, 'car');


    game.physics.arcade.enable(car);
    car.scale.setTo(0.3);
    car.anchor.set(0.5);
    car.radius = car.height;
    car.body.setCircle(car.radius,
        (-car.radius + (0.5 * car.width) / car.scale.x),
        (-car.radius + (0.5 * car.height) / car.scale.y)
    );
    car.tint = 0x8e7373;
    car.body.drag.set(100);
    car.body.mass = 350;
    car.body.collideWorldBounds = true;
    car.body.maxVelocity.set(150);
    car.body.bounce.set(0.8);

    game.camera.follow(car);

    flag = game.add.sprite(1930, (game.height/2) - 13, 'flag');
    flag.anchor.set(0 , 1);
    game.physics.arcade.enable(flag);
    cursors = this.input.keyboard.createCursorKeys();

    // game.camera.x = 2000;
}

PlayState.carFlag = function(car, flag){
    flag.x = car.x;
    flag.y = car.y;
}

PlayState.update = function() {

    game.physics.arcade.collide(car, layers.collisions);

    game.physics.arcade.overlap(car, flag, this.carFlag);


    if (cursors.up.isDown) {
        game.physics.arcade.accelerationFromRotation(
            car.rotation, 650, car.body.acceleration);
    } else if (cursors.down.isDown) {
        game.physics.arcade.accelerationFromRotation(
            car.rotation, -650, car.body.acceleration);
    }
    else {
        car.body.acceleration.set(0);
    }

    if (cursors.left.isDown) {
        car.body.angularVelocity = -145;
    } else if (cursors.right.isDown) {
        car.body.angularVelocity = 145;
    } else {
        car.body.angularVelocity = 0;
    }
}

PlayState.render = function() {
    // game.debug.body(car);
    // game.debug.cameraInfo(game.camera, 32, 32);
}