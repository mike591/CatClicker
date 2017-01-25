class Store {
  constructor() {
    this.money = 100;
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

  buyFood() {
    if (this.money >= 25) {
      this.subtactMoney(25);
      this.userInventory.food++;
      return true;
    } else {
      window.alert("You cannot afford this");
      return false;
    }
  }

  buyBrush() {
    if (this.money >= 50) {
      this.subtactMoney(50);
      this.userInventory.brush++;
      return true;
    } else {
      window.alert("You cannot afford this");
      return false;
    }
  }

  buyToy() {
    if (this.money >= 75) {
      this.subtactMoney(75);
      this.userInventory.toy++;
      return true;
    } else {
      window.alert("You cannot afford this");
      return false;
    }
  }

  subtactMoney(amt) {
    this.money = this.money - amt;
    this.updateDisplay();
  }
}

module.exports = Store;
