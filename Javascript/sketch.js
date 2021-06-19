let gameCanvas;
let pairsGame;
const canvasWidth = 750;
const canvasHeight = 750;

let resetButton, playButton, gridSizePicker;

function setup() {
  gridSizePicker = createSelect();
  gridSizePicker.option("4x4");
  gridSizePicker.option("6x6");
  gridSizePicker.option("8x8");
  gridSizePicker.attribute("onchange", "reset()");
  gridSizePicker.parent("game-btn-container");
  gridSizePicker.class("game-btn");
  gridSizePicker.id("game-grid-size-picker");

  gameCanvas = createCanvas(canvasWidth, canvasHeight);
  gameCanvas.id("game-canvas");
  gameCanvas.parent("game-container");
  reset();

  resetButton = createButton("Reset");
  resetButton.mousePressed(reset);
  resetButton.class("game-btn");
  resetButton.parent("game-btn-container");

  playButton = createButton("Play");
  playButton.mousePressed(play);
  playButton.class("game-btn");
  playButton.parent("game-btn-container");
}

function draw() {
  background(126, 247, 215);
  pairsGame.tick();
}

function mousePressed() {
  if(mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight){
    pairsGame.clicked();
  }
}

function play(){
  pairsGame.play = true;
}

function reset(){
  pairsGame = new PairsGame(canvasWidth, canvasHeight, gridSizePicker.selected().substr(0,1), gridSizePicker.selected().substr(0,1));
}