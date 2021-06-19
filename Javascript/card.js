class Card {
    constructor(img, x, y, targetSize) {
        this.img = img;
        this.cardBack = createImg("Assets/cardBack.png", "Cat silhouette Card back");
        this.cardBack.hide();
        this.x = x;
        this.y = y;
        this.size = targetSize;
        this.curWid = this.size;
        this.flipped = false;
        this.correct = false;
        this.borderWid = 3;
        this.animationState = "down"; // down, downShrinking, upGrowing, up, upShrinking, downGrowing; 
        this.flipSpeed = 10;
    }

    update() {
        switch (this.animationState) {
            case "downShrinking":
                this.curWid -= this.flipSpeed;
                this.x += this.flipSpeed / 2;

                if (this.curWid <= 0) {
                    this.flipped = true;
                    this.animationState = "upGrowing";
                }
                break;

            case "upGrowing":
                this.curWid += this.flipSpeed;
                this.x -= this.flipSpeed / 2;

                if (this.curWid >= this.size) {
                    this.animationState = "up";
                }
                break;

            case "upShrinking":
                this.curWid -= this.flipSpeed;
                this.x += this.flipSpeed / 2;

                if (this.curWid <= 0) {
                    this.animationState = "downGrowing";
                    this.flipped = false;
                }
                break;

            case "downGrowing":
                this.curWid += this.flipSpeed;
                this.x -= this.flipSpeed / 2;

                if (this.curWid >= this.size) {
                    this.animationState = "down";
                }
                break;
        }
    }

    draw(paused) {
        push();

        strokeWeight(3);
        if (this.animationState == "up" && this.correct) stroke(0, 200, 0);
        else if (this.animationState == "up" && paused) stroke(200, 0, 0);
        else stroke(0);
        fill(194, 255, 239);
        rect(this.x, this.y, this.curWid, this.size);

        if (this.animationState == "up" && this.correct) fill(0, 200, 0, 70);
        else if (this.animationState == "up" && paused) fill(200, 0, 0, 70);
        else fill(255, 0);

        if (this.flipped) {
            image(this.img, this.x + this.borderWid / 2, this.y + this.borderWid / 2, this.curWid - this.borderWid, this.size - this.borderWid);
            rect(this.x + this.borderWid / 2, this.y + this.borderWid / 2, this.curWid - this.borderWid, this.size - this.borderWid);
        }
        else
            if (this.curWid > 0) // This stops the card back from flashing up in the background.
                image(this.cardBack, this.x, this.y, this.curWid, this.size);

        pop();
    }

    flip() {
        if (this.animationState == "down") {
            this.animationState = "downShrinking";
        }
        else if (this.animationState == "up") {
            this.animationState = "upShrinking";
        }
    }

    clicked() {
        if (mouseX >= this.x && mouseX <= this.x + this.size && mouseY >= this.y && mouseY <= this.y + this.size) return true;
        else return false;
    }
}
