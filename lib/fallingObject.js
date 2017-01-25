const RIGHT_WALL = 220;
const FALL_SPEED = 0.5;

class FallingObject {
  constructor(img, canvasContext, itemType) {
    this.img = img;
    this.canvasContext = canvasContext;
    this.itemType = itemType;

    this.posX = Math.floor(Math.random() * RIGHT_WALL);
    this.posY = 0;
  }

  updatePos() {
    this.canvasContext.drawImage(this.img, this.posX,this.posY, 25,25);
    if (this.posY <= 120) {
      this.posY += FALL_SPEED;
    }
  }

}

module.exports = FallingObject;
