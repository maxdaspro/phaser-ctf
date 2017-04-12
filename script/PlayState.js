var PlayState = {};
PlayState.create = MenuState.create;


PlayState.update = function () {

    chrono.update();

    game.physics.arcade.collide(car.sprite, layers.collisions);
    game.physics.arcade.overlap(car.sprite, flag.sprite, (car_sprite, flag_sprite)=>{
       car.drag(flag_sprite);
       car.haveFlag = true;
    });
    game.physics.arcade.overlap(car.sprite, Groups.zoneStart, ()=>{
        if(car.haveFlag) {
            chrono.pause();
            car.sprite.kill();
            game.end();
        }
    });

    game.physics.arcade.collide(car.sprite, layers.mort, ()=>{
        car.die();
        chrono.pause();
        game.end();
    });
    game.physics.arcade.overlap(car.sprite, layers.fond, ()=>{
        car.cruise();
    });
    game.physics.arcade.overlap(car.sprite, Groups.decelerate, ()=>{
        car.slowDown();
    });

    //Car move forwards and stop
    if (cursors.up.isDown) {
        car.accelerate();

        if(!chrono.isStarted){
            chrono.start();
        }
    } else if (cursors.down.isDown) {
        car.decelerate();
    }
    else {
        car.stop();
    }
    //Car turn left OR right
    if (cursors.left.isDown) {
        car.turnLeft();
    } else if (cursors.right.isDown) {
        car.turnRight();
    } else {
        car.turnNot();
    }
}

PlayState.render = function () {
    // game.debug.body(car.sprite);
    // game.debug.cameraInfo(game.camera, 32, 32);
    //game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);
}

