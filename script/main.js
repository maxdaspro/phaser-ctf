//initialisation du jeu
var game = new Phaser.Game(800,608,Phaser.AUTO,'game',{preload: preload, create:
 create,update:update, render: render});

//fonction random
var rand = function(min, max){
	return Math.round(Math.random()*(max-min)+min);
}

//variables
var cursors;
var car;
var enemies;
var land;

//PRELOAD
function preload(){
	game.load.tilemap("map", "assets/images/ctf.json", null, Phaser.Tilemap.TILED_JSON);
	game.load.image("bg", "assets/images/map.png");
	game.load.image("car", "assets/images/car.png");
	
}
//CREATE
function create(){
	//resize game world
	game.world.setBounds(0, 0, 2048, 608);
	//ajout background Sprite
	land = game.add.tileSprite(0, 0, 1000, 608, 'bg');	
	land.fixedToCamera = true;

	//ajout voiture
	car = this.add.sprite(400, 300, 'car');

	

	//taille de la voiture
	car.scale.setTo(0.3);
	//ajout point d'anchrage pour que ce soi s au mileu de l'objet
	car.anchor.set(0.5);

	game.camera.follow(car);

	
	//ajout moteur physique
	game.physics.arcade.enable( car );
	//ajout friction sur élément
	car.body.drag.set(70);
	
	car.mass = 1;
	//vitesse maximal du car
	car.body.maxVelocity.set(150);

	
	//créer les curseurs du clavier
	cursors = this.input.keyboard.createCursorKeys();
	
}

//UPDATE
function update(){
	if( cursors.up.isDown ){
		game.physics.arcade.accelerationFromRotation(
		 car.rotation, 300, car.body.acceleration );
		//demande au moteur physique de phaser une acceleration en fonction d'une rotation
	} else if ( cursors.down.isDown ){
		game.physics.arcade.accelerationFromRotation(
		 car.rotation, -300, car.body.acceleration );
		//acceleration arrière
	}
	else{
		car.body.acceleration.set( 0 );
		//acceleration du vaisseau à 0
	}

	if( cursors.left.isDown ){
		car.body.angularVelocity =-500;
		//faire tourner le vaisseau
	} else if( cursors.right.isDown ){
		car.body.angularVelocity = 500;
	} else{
		car.body.angularVelocity = 0;
	}
}

//RENDER
function render(){

}