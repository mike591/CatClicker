class Store {
  constructor() {
    this.money = 25;
    this.userInventory = {
      food: 0,
      brush: 0,
      toy: 0
    };
    this.updateDisplay();
  }

  updateDisplay() {
    document.getElementsByClassName("moneyLabel")[0].textContent=`Money: ${this.money}`;
  }

  addMoney() {
    this.money++;
    this.updateDisplay();
  }

  addBlinking() {
    let money = document.getElementsByClassName("moneyLabel")[0];
    if (typeof money != 'undefined') {
      money.className = 'moneyLabel-blink';
    }
  }

  resetBlinking() {
    let money = document.getElementsByClassName("moneyLabel-blink")[0];
    if (typeof money != 'undefined') {
      money.className = 'moneyLabel';
    }
  }

  buyFood() {
    if (this.money >= 10) {
      this.resetBlinking();
      this.subtactMoney(10);
      this.userInventory.food++;
      return true;
    } else {
      this.addBlinking();
      return false;
    }
  }

  buyBrush() {
    if (this.money >= 15) {
      this.resetBlinking();
      this.subtactMoney(15);
      this.userInventory.brush++;
      return true;
    } else {
      this.addBlinking();

      return false;
    }
  }

  buyToy() {
    if (this.money >= 20) {
      this.resetBlinking();
      this.subtactMoney(20);
      this.userInventory.toy++;
      return true;
    } else {
      this.addBlinking();
      return false;
    }
  }

  subtactMoney(amt) {
    this.money = this.money - amt;
    this.updateDisplay();
  }
}

module.exports = Store;
