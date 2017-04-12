let PlayState = {};

//variables
let map;
let cursors;
let car;
let enemies;
let flag;
let startTime;
let currentTime;
let runtTime;
let chrono = {};
let layers = {};
let Groups = {};

PlayState.preload = function () {
    game.load.tilemap("map", "assets/images/mapfinal.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image("car", "assets/images/car.png");
    game.load.image("tiles", "assets/images/tiles.png");
    game.load.image("point", "assets/images/point.png");
    game.load.image("flag", "assets/images/flag2.png");
}

PlayState.create = function () {

    cursors = this.input.keyboard.createCursorKeys();

    map = game.add.tilemap('map');
    map.addTilesetImage('tiles');

    layers = {
        fond: map.createLayer('fond'),
        boue: map.createLayer('boue'),
        eau: map.createLayer('eau'),
        bases: map.createLayer('bases'),
        mort: map.createLayer('mort'),
        obstacle: map.createLayer('obstacle'),
        collisions: map.createLayer('collisions')
    };

    layers.fond.resizeWorld();
    layers.collisions.resizeWorld();

    map.setCollisionBetween(1, 2000, true, layers.collisions);
    map.setCollisionBetween(1, 2000, true, layers.mort);

    layers.collisions.alpha = 0;
    layers.mort.alpha = 0;

    Groups.zoneStart = this.game.add.group();
    Groups.zoneStart.enableBody = true;
    Groups.zoneStart.alpha = 0;
    Helper.Phaser.drawObjectInGroup('zoneStart', map, 'objectsLayer', Groups.zoneStart);

    Groups.zoneFlag = this.game.add.group();
    Groups.zoneFlag.enableBody = true;
    Groups.zoneFlag.alpha = 0;
    Helper.Phaser.drawObjectInGroup('zoneFlag', map, 'objectsLayer', Groups.zoneFlag);

    Groups.decelerate = this.game.add.group();
    Groups.decelerate.enableBody = true;
    Groups.decelerate.alpha = 0;
    Helper.Phaser.drawObjectInGroup('decelerate', map, 'objectsLayer', Groups.decelerate);

    game.physics.arcade.enable(layers.mort);

    chrono = new Chrono(game.camera.width - 50, 25);

    car = new Car(this);
    game.camera.follow(car.sprite);

    flag = new Flag();
    game.physics.arcade.enable(flag.sprite);
}

PlayState.update = function () {

    chrono.update();

    game.physics.arcade.collide(car.sprite, layers.collisions);
    game.physics.arcade.overlap(car.sprite, flag.sprite, (car_sprite, flag_sprite)=>{
       car.drag(flag_sprite);
    });
    // game.physics.arcade.collide(car.sprite, layers.mort, ()=>{
    //     car.die();
    //     chrono.pause();
    // });
    game.physics.arcade.overlap(car.sprite, layers.fond, ()=>{
        car.cruise();
    });
    game.physics.arcade.overlap(car.sprite, Groups.decelerate, ()=>{
        car.slowDown();
    });


    //Car move forwards and stop
    if (cursors.up.isDown) {
        car.accelerate();
    } else if (cursors.down.isDown) {
        car.decelerate();
    }
    else {
        car.stop();
    }
    //Car turn left OR right
    if (cursors.left.isDown) {
        car.turnLeft();
    } else if (cursors.right.isDown) {
        car.turnRight();
    } else {
        car.turnNot();
    }
}

PlayState.render = function () {
    game.debug.body(car.sprite);
    // game.debug.cameraInfo(game.camera, 32, 32);
    //game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);
}

