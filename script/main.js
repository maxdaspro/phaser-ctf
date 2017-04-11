//initialisation du jeu
var game = new Phaser.Game(800, 608, Phaser.AUTO, 'game', {
    preload: preload, create: create, update: update, render: render
});

//fonction random
var rand = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//variables
var cursors;
var car;
var enemies;
var land;

//PRELOAD
function preload() {
    game.load.tilemap("map", "assets/images/ctf.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image("bg", "assets/images/map.png");
    game.load.image("car", "assets/images/car.png");
}

var collisionLayer;
//CREATE
function create() {

    let map = game.add.tilemap('map');



    /***********/

    land = game.add.tileSprite(0, 0, 2048, 608, "bg");

    game.world.setBounds(0, 0, 2048, 608);

    car = this.add.sprite(400, 300, 'car');

    game.physics.arcade.enable(car);
    car.scale.setTo(0.3);
    car.anchor.set(0.5);

    car.body.maxVelocity.setTo(150, 150);
    car.bringToTop();

    car.body.collideWorldBounds = true;

    //créer les curseurs du clavier
    cursors = this.input.keyboard.createCursorKeys();

    game.camera.follow(car);
    // collisionLayer = land.createLayer
}

//UPDATE
function update() {

   // game.physics.arcade.overlap(enemyBullets, tank, bulletHitPlayer, null, this);

    if (cursors.up.isDown) {
        game.physics.arcade.accelerationFromRotation(
            car.rotation, 300, car.body.acceleration);
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
        car.body.angularVelocity = -500;
        //faire tourner le vaisseau
    } else if (cursors.right.isDown) {
        car.body.angularVelocity = 500;
    } else {
        car.body.angularVelocity = 0;
    }

    // game.physics.arcade.collide(car,);
}

//RENDER
function render() {

}