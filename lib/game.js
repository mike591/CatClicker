const Store = require('./store.js');
const Cat = require('./cat.js');

class Game {
  constructor() {
    this.store = new Store();
    this.cat= new Cat();
    
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
      this.store.buyFood();
    });
    document.getElementsByClassName("buyBrush")[0].addEventListener("click", () => {
      this.store.buyBrush();
    });
    document.getElementsByClassName("buyToy")[0].addEventListener("click", () => {
      this.store.buyToy();
    });
  }


}

module.exports = Game;
