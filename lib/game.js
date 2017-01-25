const Store = require('./store.js');
const Cat = require('./cat.js');
const Display = require('./display.js');

const FOOD = "FOOD";
const BRUSH = "BRUSH";
const TOY = "TOY";

class Game {
  constructor() {
    this.store = new Store();
    this.cat= new Cat();
    this.display = new Display(this.cat);

    this.addMoneyListener();
    this.addStoreListener();
  }


  addMoneyListener() {
    document.getElementsByClassName("button-money")[0].addEventListener("click", (e) => {
      this.store.addMoney();
      this.randomButtonPos();
    });
  }

  randomButtonPos() {
    let button = document.getElementsByClassName("button-money")[0];
    let modifier = 1;
    if (Math.random() > 0.5) {
      modifier = -1;
    }
    button.style.left = (Math.random() * 30 * modifier) + "%";
    button.style.top = (Math.random() * 55) + "%";
  }

  addStoreListener() {
    document.getElementsByClassName("buyFood")[0].addEventListener("click", () => {
      if (this.store.buyFood()) {
        this.display.dropObject(this.display.food, this.display.canvasContext, FOOD);
      }
    });
    document.getElementsByClassName("buyBrush")[0].addEventListener("click", () => {
      if (this.store.buyBrush()) {
        this.display.dropObject(this.display.brush, this.display.canvasContext, BRUSH);
      }
    });
    document.getElementsByClassName("buyToy")[0].addEventListener("click", () => {
      if (this.store.buyToy()) {
        this.display.dropObject(this.display.toy, this.display.canvasContext, TOY);
      }
    });
  }
}

module.exports = Game;
