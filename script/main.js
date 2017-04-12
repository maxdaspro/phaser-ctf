//initialisation du jeu
var game = new Phaser.Game(800, 608, Phaser.AUTO, 'game');

game.state.add('menu', MenuState);
game.state.add('play', PlayState);
game.state.start('menu');

var menu = document.getElementById("menu");
document.querySelector('#new-game').addEventListener('click', ()=>{
    game.state.start('play');
    menu.classList.toggle("hide");

})

