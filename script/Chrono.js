class Chrono {
    constructor(x, y) {

        this.startTime = Date.now();
        this.runTime;
        this.isPaused = false
        this.startPauseTime = 0;
        this.pauseTime = 0;

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
        if (!this.isPaused) {
            let currentTime = Date.now();
            this.startTime += this.pauseTime;
            this.runTime = currentTime - this.startTime;
            this.text.body.setText((this.runTime / 1000).toFixed(1))
        }
    }
    pause() {
        this.isPaused = true;
        this.startPauseTime = Date.now();
    }
    resume() {
        let currentTime = Date.now();
        this.pauseTime = (currentTime - this.startPauseTime);
    }
}