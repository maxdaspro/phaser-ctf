let PlayState = {};

//variables
let map;
let cursors;
let car;
let enemies;
let flag;
let layers = {};

PlayState.preload = function(){
    game.load.tilemap("map", "assets/images/mapfinal.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image("car", "assets/images/car.png");
    game.load.image("tiles", "assets/images/tiles.png");
    game.load.image("flag", "assets/images/flag2.png");
}

PlayState.create = function(){

    map = game.add.tilemap('map');
    map.addTilesetImage('tiles');

    let objs = game.add.group();
    objs.enableBody = true;

    // map.createFromObjects('Object Layer 1', 'cols', 'coin', 0, true, false, objs);

    layers = {
        fond: map.createLayer('fond'),
        bases: map.createLayer('bases'),
        obstacle: map.createLayer('obstacle'),
        collisions: map.createLayer('collisions'),
        mort: map.createLayer('mort'),
        eau: map.createLayer('eau'),
        boue: map.createLayer('boue')
    };

    layers.fond.resizeWorld();
    layers.collisions.resizeWorld();

    map.setCollisionBetween(1, 2000, true, layers.collisions);
    map.setCollisionBetween(1, 2000, true, layers.mort);
    // map.setCollisionBetween(1, 2000, true, layers.eau);

    layers.collisions.alpha = 0;
    layers.mort.alpha = 1;

    game.physics.arcade.enable(layers.mort);

    car = game.add.sprite(50, 290, 'car');

    game.physics.arcade.enable(car);

    car.scale.setTo(0.3);
    car.anchor.set(0.5);
    car.tint = 0x8e7373;
    car.body.drag.set(100);
    car.body.mass = 50;
    car.body.collideWorldBounds = true;
    car.body.maxVelocity.set(150);
    car.body.bounce.set(1);

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
PlayState.carKill = function(){
    car.kill();
    console.log("mort")
}
PlayState.carWater = function(){
    car.body.maxVelocity.set(50);
}
PlayState.update = function() {

    game.physics.arcade.collide(car, layers.collisions);
    game.physics.arcade.overlap(car, flag, this.carFlag);
    game.physics.arcade.collide(car, layers.mort, this.carKill);
    game.physics.arcade.overlap(car, layers.eau, this.carWater);


    if (cursors.up.isDown) {
        game.physics.arcade.accelerationFromRotation(
            car.rotation, 500, car.body.acceleration);
        //demande au moteur physique de phaser une acceleration en fonction d'une rotation
    } else if (cursors.down.isDown) {
        game.physics.arcade.accelerationFromRotation(
            car.rotation, -300, car.body.acceleration);
        //acceleration arrière
    }
    else {
        car.body.acceleration.set(0);
        //acceleration du vaisseau à 0
    }

    if (cursors.left.isDown) {
        car.body.angularVelocity = -130;
        //faire tourner le vaisseau
    } else if (cursors.right.isDown) {
        car.body.angularVelocity = 130;
    } else {
        car.body.angularVelocity = 0;
    }
}

PlayState.render = function() {
    game.debug.cameraInfo(game.camera, 32, 32);
}