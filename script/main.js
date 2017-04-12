//initialisation du jeu
var game = new Phaser.Game(800, 608, Phaser.AUTO, 'game');

game.state.add('menu', MenuState);
game.state.add('play', PlayState);
game.state.add('break', BreakState);
game.state.start('menu');

var menu = document.getElementById("menu");
var menuEnd = document.getElementById("menu-end");

document.querySelector('#new-game').addEventListener('click', ()=>{
    console.log('click');
    game.state.start('play');
    menu.classList.toggle("hide");

})

document.querySelector('#restart-game').addEventListener('click', ()=>{
    console.log('click');
    game.state.start('play');
    menuEnd.classList.toggle("hide");
})

game.end = function(){
    menuEnd.classList.remove('hide')
    let score = document.getElementById("score");
    score.innerText = (chrono.runTime / 1000).toFixed(1);
}

