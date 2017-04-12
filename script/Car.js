class Car {

    constructor() {

        this.initialVelocity = 220;

        let sprite = game.add.sprite(1500, 290, 'car');
        game.physics.arcade.enable(sprite);
        sprite.scale.setTo(0.3);
        sprite.anchor.set(0.5);

        let radius = sprite.height;
        sprite.body.setCircle(radius,
            (-radius + (0.5 * sprite.width) / sprite.scale.x),
            (-radius + (0.5 * sprite.height) / sprite.scale.y)
        );

        sprite.tint = 0x8e7373;
        sprite.body.drag.set(100);
        sprite.body.mass = 350;
        sprite.body.collideWorldBounds = true;
        sprite.body.maxVelocity.set(this.initialVelocity);
        sprite.body.bounce.set(0.8);

        this.sprite = sprite;
        this.radius = radius;
        this.alive = true;
    }

    drag(something){
        something.x = this.sprite.x;
        something.y = this.sprite.y;
        console.log(something);
    }
    die(){
        this.sprite.kill();
        this.alive = false;
    }
    slowDown(){
        this.sprite.body.maxVelocity.set(50);
    }
    cruise(){
        this.sprite.body.maxVelocity.set(this.initialVelocity);
    }

    accelerate() {
        game.physics.arcade.accelerationFromRotation(
            car.sprite.rotation, 650, car.sprite.body.acceleration
        );
    }

    decelerate() {
        game.physics.arcade.accelerationFromRotation(
            car.sprite.rotation, -650, car.sprite.body.acceleration
        );
    }

    stop() {
        car.sprite.body.acceleration.set(0);
    }

    turnLeft() {
        car.sprite.body.angularVelocity = -145;
    }

    turnRight() {
        car.sprite.body.angularVelocity = 145;
    }

    turnNot() {
        car.sprite.body.angularVelocity = 0;
    }
}