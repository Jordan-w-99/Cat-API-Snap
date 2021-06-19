class PairsGame {
    constructor(canvasWidth, canvasHeight, rows, cols) {
        this.cols = rows;
        this.rows = cols;
        this.tileAmount = (this.rows * this.cols) / 2

        this.gameMargin = 20;
        this.gridWidth = canvasWidth - this.gameMargin * 2;
        this.cardAreaWidth = this.gridWidth / this.cols;
        this.cardMargin = 20;
        this.cardSize = this.cardAreaWidth - this.cardMargin;

        this.play = false;
        this.gridLoaded = false;
        this.complete = false;
        this.grid;

        this.doDataSetup();
    }

    async doDataSetup() {
        let imgs = await DataHandler.getCats(this.tileAmount, DataHandler.setupCatImgs);
        this.grid = new Grid(imgs, this.rows, this.cols, this.cardSize, this.cardMargin);

        this.gridLoaded = true;
    }

    tick() {
        let tSize = (sin((Date.now() / 1000))) + 1; // Generates a sine wave all above 0 on the Y axis, and stretched along the X axis
        tSize = map(tSize, 0, 2, 50, 60);

        if (this.gridLoaded && this.play) {
            this.grid.update();
            this.grid.draw();

            if (this.grid.complete) {
                textAlign(CENTER, CENTER);
                textSize(tSize);
                text("You Win!", canvasWidth / 2, canvasHeight / 2 - 20);

                textSize(35);
                text("Press the reset button below to play again.\n(and get new cats!)", canvasWidth / 2, canvasHeight / 2 + 60);
            }
        }
        else {
            textAlign(CENTER, CENTER);
            textSize(tSize);
            text("Welcome to Cat API Pairs!", canvasWidth / 2, canvasHeight / 2 - 20);

            textSize(35);
            text("Press the play button below to start.", canvasWidth / 2, canvasHeight / 2 + 40);

            textAlign(LEFT);
            textSize(22);
            text("Created by Jordan Wright.", 10, canvasHeight - 38);

            textAlign(RIGHT);
            text("Last updated: 28/10/2020.", canvasWidth - 10, canvasHeight - 38);
        }
    }

    clicked() {
        if(this.play){
            this.grid.clicked();
        }
    }
}