const Store = require('./store.js');
const Cat = require('./cat.js');
const Display = require('./display.js');

class Game {
  constructor() {
    this.store = new Store();
    this.cat= new Cat();
    this.display = new Display();

    this.addMoneyListener();
    this.addStoreListener();
  }


  addMoneyListener() {
    document.getElementsByClassName("button-money")[0].addEventListener("click", () => {
      this.store.addMoney();
    });
  }

  addStoreListener() {
    document.getElementsByClassName("buyFood")[0].addEventListener("click", () => {
      if (this.store.buyFood()) {
        this.cat.useFood();
      }
    });
    document.getElementsByClassName("buyBrush")[0].addEventListener("click", () => {
      if (this.store.buyBrush()) {
        this.cat.useBrush();
      }
    });
    document.getElementsByClassName("buyToy")[0].addEventListener("click", () => {
      if (this.store.buyToy()) {
              this.cat.useToy();
      }
    });
  }
}

module.exports = Game;
