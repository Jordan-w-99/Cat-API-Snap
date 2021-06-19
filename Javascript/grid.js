class Grid {
    constructor(imgs, rows, cols, cardSize, cardMargin) {
        this.cardSize = cardSize;
        this.cardMargin = cardMargin;
        this.cards = this.setupCards(imgs, rows, cols);
        this.rows = rows;
        this.cols = cols;
        this.numFlipped = 0;
        this.paused = false;
        this.pauseStart = 0;
        this.flipOne = null;
        this.flipTwo = null;
        this.complete = false;
        this.attempts = 0;
    }

    setupCards(imgs, rows, cols) {
        let unusedImgs = imgs.concat(imgs);
        let cards = [];

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const imgIndex = floor(random(unusedImgs.length));

                console.log(this.cardSize);
                cards.push(new Card(unusedImgs[imgIndex], j * (this.cardSize + this.cardMargin) + this.cardMargin, i * (this.cardSize + this.cardMargin) + this.cardMargin, this.cardSize));
                unusedImgs.splice(imgIndex, 1);
            }
        }

        return cards;
    }

    checkComplete(){
        for(let i = 0; i < this.cards.length; i++){
            if(this.cards[i].correct == false) return false;
        }

        return true;
    }

    update() {
        if (this.numFlipped >= 2 && !this.paused) {
            this.attempts++;
            if (this.cards[this.flipOne].img == this.cards[this.flipTwo].img) {
                console.log("Match!");
                this.cards[this.flipOne].correct = true;
                this.cards[this.flipTwo].correct = true;

                this.unflipAll();
            }
            else {
                this.paused = true;
                this.pauseStart = Date.now();
            }
        }
        else if (this.paused) {
            if ((Date.now() - this.pauseStart) >= 800) {
                this.unflipAll();
                this.paused = false;
            }
        }

        if(this.checkComplete()) this.complete = true;
    }

    unflipAll() {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].flipped && !this.cards[i].correct) this.cards[i].flip();
        }

        this.numFlipped = 0;
        this.flipOne = null;
        this.flipTwo = null;
    }

    draw() {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].update();
            this.cards[i].draw(this.paused);
        }

        textAlign(CENTER, CENTER)
        text("Attempts: " + this.attempts, width/2, height - 20);
    }

    clicked() {
        if (!this.paused) {

            for (let i = 0; i < this.cards.length; i++) {

                if (this.cards[i].clicked() == true && !this.cards[i].correct && !this.cards[i].flipped) {
                    this.cards[i].flip();

                    if (this.numFlipped == 0) this.flipOne = i;
                    else if (this.numFlipped == 1) this.flipTwo = i;

                    this.numFlipped++;
                }
            }
        }
    }
}