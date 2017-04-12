let MenuState = {};

//variables
let cursors;
let map;
let car;
let enemies;
let flag;
let spaceBar;
let chrono = {};
let layers = {};
let Groups = {};

MenuState.preload = function () {
    game.load.tilemap("map", "assets/images/mapfinal.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image("car", "assets/images/car.png");
    game.load.image("tiles", "assets/images/tiles.png");
    game.load.image("point", "assets/images/point.png");
    game.load.image("flag", "assets/images/flag2.png");
}

MenuState.create = function () {

    cursors = this.input.keyboard.createCursorKeys();

    spaceBar = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    spaceBar.onDown.add(()=>{
        game.paused = !game.paused;

        if(game.paused){
            chrono.pause();
        }else{
            chrono.resume();
        }
    }, this);

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

    chrono = new Chrono(game.camera.width - 70, 25);

    car = new Car(50,300);
    game.camera.follow(car.sprite);

    flag = new Flag(1930, (game.height / 2));
}
