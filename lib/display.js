let mouseX = 0;
let mouseY = 0;
let speed = 2;

class Display {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.canvasContext = canvas.getContext('2d');

    this.drawAll();
  }

  drawAll() {
    this.clearScreen();
    this.drawGround();
    this.drawCat();
  }

  drawCat() {
    let catImage = new Image();
    catImage.src = ('images/cat.png');

    catImage.onload = () => {
      this.canvasContext.drawImage(catImage, 100,100, 100,50);
    };
  }

  drawGround() {
    this.colorRect(0, this.canvas.height-20, this.canvas.width,100, 'green');
  }

  clearScreen() {
  	this.colorRect(0,0, this.canvas.width,this.canvas.height, 'gray');
  }

  colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
    this.canvasContext.fillStyle = fillColor;
  	this.canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
  }


}

module.exports = Display;
