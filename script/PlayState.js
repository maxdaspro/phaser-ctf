let PlayState = {};

//variables
let map;
let cursors;
let car;
let enemies;
let flag;
let layers = {};
let seaGroup;
let oldDate;
let currentDate;
let time;
let alive = true;
let text;
let style;
let x;
let y;

PlayState.preload = function(){
    game.load.tilemap("map", "assets/images/mapfinal.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image("car", "assets/images/car.png");
    game.load.image("tiles", "assets/images/tiles.png");
    game.load.image("point", "assets/images/point.png");
    game.load.image("flag", "assets/images/flag2.png");
}

PlayState.create = function(){
   


    //chrono
    oldDate = new Date();
    

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
    // map.setCollisionBetween(1, 2000, true, layers.eau);

    layers.collisions.alpha = 0;
    layers.mort.alpha = 1;



    /*************/
    seaGroup = this.game.add.group();
    seaGroup.enableBody = true;
    seaGroup.alpha = 0.2;
    var item;
    let result = this.findObjectsByType('item', map, 'objectsLayer');
    result.forEach(function(element){
        this.createFromTiledObject(element, seaGroup);
    }, this);
    
    console.log(seaGroup);
    /**************/


    game.physics.arcade.enable(layers.mort);

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

    //text
    style = { font: "30px Arial", fill: "#ffffff", align: "center" };
    style.alpha = 0.1;
    x = game.camera.width-50;
    y = 25;
    text = game.add.text(x, y, "00", style);
    text.fixedToCamera = true;
    text.anchor.set(0.5);
    text.alpha = 0.5;
    console.log(game.camera)
}
PlayState.carFlag = function(car, flag){
    flag.x = car.x;
    flag.y = car.y;
}
PlayState.carKill = function(){
    car.kill();
    alive = false;
    console.log("mort le "+time)
}
PlayState.carWater = function(){
    console.log('ralenti');
    car.body.maxVelocity.set(50);
}
PlayState.update = function() {

    //chrono
    currentDate = new Date();
    if(alive){
        time = (currentDate - oldDate)/1000;
        text.setText(time.toFixed(1))
    }

    game.physics.arcade.collide(car, layers.collisions);
    game.physics.arcade.overlap(car, flag, this.carFlag);
    game.physics.arcade.collide(car, layers.mort, this.carKill);
    game.physics.arcade.overlap(car, seaGroup, this.carWater);


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
     //game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);
}

//find objects in a Tiled layer that containt a property called "type" equal to a certain value
PlayState.findObjectsByType = function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
        if(element.type === type) {
            //Phaser uses top left, Tiled bottom left so we have to adjust
            //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
            //so they might not be placed in the exact position as in Tiled
            element.y -= map.tileHeight;
            result.push(element);
        }
    });
    return result;
};

//create a sprite from an object
PlayState.createFromTiledObject = function(element, group) {
    var sprite = group.create(element.x, element.y, 'point');

    //copy all properties to the sprite
    Object.keys(element).forEach(function(key){
        sprite[key] = element[key];
    });

};

