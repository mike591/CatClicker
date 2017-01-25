const RIGHT_WALL = 220;
const FALL_SPEED = 0.5;

class FallingObject {
  constructor(img, canvasContext) {
    this.img = img;
    this.canvasContext = canvasContext;
    this.startingPosX = Math.floor(Math.random() * RIGHT_WALL);
    this.startingPosY = 0;
  }

  updatePos() {
    this.canvasContext.drawImage(this.img, this.startingPosX,this.startingPosY, 25,25);
    if (this.startingPosY <= 120) {
      this.startingPosY += FALL_SPEED;
    }
  }

}

module.exports = FallingObject;
