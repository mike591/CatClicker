const FallingObject = require('./fallingObject.js');

let mouseX = 0;
let mouseY = 0;
const SIXTY_FRAMES_PER_SECOND = 60/1000;
const FIVE_SECONDS = 5000;
const FLOOR = 100;
const RIGHT_WALL = 220;
let speed = 0.5;

class Display {
  constructor(cat) {
    this.canvas = document.getElementById('canvas');
    this.canvasContext = canvas.getContext('2d');
    this.catPos = 0;
    this.cat = cat;
    this.items = [];

    this.catImageRight = new Image();
    this.catImageRight.src = ('images/cat_right.png');

    this.catImageLeft = new Image();
    this.catImageLeft.src = ('images/cat_left.png');

    this.catDead = new Image();
    this.catDead.src = ('images/cat_dead.png');

    this.food = new Image();
    this.food.src = ('images/food.png');

    this.setTimers();
  }


  clearAllIntervals() {
    for (var i = 1; i < 99999; i++) {
      window.clearInterval(i);
    }
  }

  dropObject(img, canvasContext) {
    let object = new FallingObject(img, canvasContext);
    this.items.push(object);
  }


  setTimers() {
    setInterval(()=> {
      this.drawAll();
    }, SIXTY_FRAMES_PER_SECOND);
  }

  drawAll() {
    this.clearScreen();
    this.drawGround();
    this.drawCat();
    this.items.forEach((item) => {
      item.updatePos();
    });
  }

  drawCat() {
    if (this.cat.health <= 0) {
      this.clearAllIntervals();
      this.canvasContext.drawImage(this.catDead, this.catPos,FLOOR, 100,50);
      return;
    }

    this.catPos += speed;
    if (speed >= 0) {
      this.canvasContext.drawImage(this.catImageRight, this.catPos,FLOOR, 100,50);
    } else {
      this.canvasContext.drawImage(this.catImageLeft, this.catPos,FLOOR, 100,50);
    }

    if (this.catPos > RIGHT_WALL || this.catPos < 0) {
      speed = -speed;
    }
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
