const FallingObject = require('./fallingObject.js');

let mouseX = 0;
let mouseY = 0;
let speed = 0.5;

const SIXTY_FRAMES_PER_SECOND = 60/1000;
const FLOOR = 100;
const RIGHT_WALL = 220;
const FOOD = "FOOD";
const BRUSH = "BRUSH";
const TOY = "TOY";

class Display {
  constructor(cat) {
    this.canvas = document.getElementById('canvas');
    this.canvasContext = canvas.getContext('2d');
    this.cat = cat;
    this.items = [];

    this.background = new Image();
    this.background.src = ('assets/images/background.png');

    this.catImageRight = new Image();
    this.catImageRight.src = ('assets/images/cat_right.png');

    this.catImageLeft = new Image();
    this.catImageLeft.src = ('assets/images/cat_left.png');

    this.catDead = new Image();
    this.catDead.src = ('assets/images/cat_dead.png');

    this.food = new Image();
    this.food.src = ('assets/images/food.png');

    this.brush = new Image();
    this.brush.src = ('assets/images/brush.png');

    this.toy = new Image();
    this.toy.src = ('assets/images/toy.png');

    this.setTimers();
  }


  clearAllIntervals() {
    for (var i = 1; i < 99999; i++) {
      window.clearInterval(i);
    }
  }

  dropObject(img, canvasContext, itemType) {
    let object = new FallingObject(img, canvasContext, itemType);
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
    let markForDelete = [];
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].updatePos();
      if (this.cat.posX === this.items[i].posX && this.items[i].posY > FLOOR-20) {
        markForDelete.push(i);
      }
    }
    for (let i = 0; i < markForDelete.length; i++) {
      let idx = markForDelete[i];
      switch (this.items[idx].itemType) {
        case FOOD:
          this.cat.useFood();
          this.items.splice(idx, 1);
          break;
        case BRUSH:
          this.cat.useBrush();
          this.items.splice(idx, 1);
          break;
        case TOY:
          this.cat.useToy();
          this.items.splice(idx, 1);
          break;
        default:
          return;
      }
    }
  }

  drawCat() {
    if (this.cat.health <= 0) {
      this.clearAllIntervals();
      this.canvasContext.drawImage(this.catDead, this.cat.posX,FLOOR, 100,50);
      return;
    }

    this.cat.posX += speed;
    if (speed >= 0) {
      this.canvasContext.drawImage(this.catImageRight, this.cat.posX,FLOOR, 100,50);
    } else {
      this.canvasContext.drawImage(this.catImageLeft, this.cat.posX,FLOOR, 100,50);
    }

    if (this.cat.posX > RIGHT_WALL || this.cat.posX < 0) {
      speed = -speed;
    }
  }

  drawGround() {
    this.colorRect(0, this.canvas.height-20, this.canvas.width,100, 'green');
  }

  clearScreen() {
    this.canvasContext.drawImage(this.background, 0,0);
  	// this.colorRect(0,0, this.canvas.width,this.canvas.height, 'gray');
  }

  colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
    this.canvasContext.fillStyle = fillColor;
  	this.canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
  }


}

module.exports = Display;
