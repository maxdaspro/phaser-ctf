//initialisation du jeu
var game = new Phaser.Game(800, 608, Phaser.AUTO, 'game');

game.state.add('play', PlayState);
game.state.start('play');

