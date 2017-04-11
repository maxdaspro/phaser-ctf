//initialisation du jeu
var game = new Phaser.Game(800, 608, Phaser.AUTO, 'game');

console.log(PlayState);

game.state.add('play', PlayState);

<<<<<<< HEAD
function preload() {
    game.load.tilemap("map", "assets/images/ctf.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image("car", "assets/images/car.png");
    game.load.image("point", "assets/images/point.png");
    game.load.image("tiles", "assets/images/tiles.png");
}


function create() {

    map = game.add.tilemap('map');
    map.addTilesetImage('tiles');

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

    car = game.add.sprite(400, 300, 'car');

    game.physics.arcade.enable(car);

    car.scale.setTo(0.3);
    car.anchor.set(0.5);

    car.body.drag.set(70);
    car.body.collideWorldBounds = true;
    car.body.maxVelocity.set(150);

    game.camera.follow(car);

    cursors = this.input.keyboard.createCursorKeys();
}
function hit(){
    console.log('ok');
}
//UPDATE
function update() {

    game.physics.arcade.collide(layers.collisions, car);

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
}

//RENDER
function render() {

}
=======
game.state.start('play');
>>>>>>> max
