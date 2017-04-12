class Flag {

    constructor(x, y) {

        this.sprite = game.add.sprite(x , y, 'flag');
        this.sprite.anchor.set(0, 1);
        game.physics.arcade.enable(this.sprite);
    }
}