class Chrono {
    constructor(x, y) {

        this.startTime = Date.now();
        this.runTime;
        this.isPaused = false
        this.startPauseTime = 0;
        this.pauseTime = 0;
        this.isStarted = false;

        let text = {
            body: null,
            content: '00',
            style: {font: "30px Arial", fill: "#ffffff", align: "center"},
            x: x,
            y: y
        };

        text.body = game.add.text(
            text.x,
            text.y,
            text.content,
            text.style
        );
        text.body.fixedToCamera = true;

        this.text = text;
    }

    update() {
        if (!this.isPaused && this.isStarted) {
            let currentTime = Date.now();
            this.runTime = currentTime - this.startTime;
            this.text.body.setText((this.runTime / 1000).toFixed(1))
        }
    }
    pause() {
        this.isPaused = true;
        this.startPauseTime = Date.now();
    }
    resume() {
        this.isPaused = false;
        let currentTime = Date.now();
        this.pauseTime = (currentTime - this.startPauseTime);
        this.startTime += this.pauseTime;
    }
    start(){
        this.isStarted = true;
        this.startTime = Date.now();
        console.log('start');
    }
}