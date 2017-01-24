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
    if (this.money >= 100) {
      this.subtactMoney(100);
      this.userInventory.food++;
      console.log(this.userInventory);
    } else {
      window.alert("You cannot afford this");
    }
  }

  buyBrush() {
    if (this.money >= 150) {
      this.subtactMoney(150);
      this.userInventory.brush++;
      console.log(this.userInventory);
    } else {
      window.alert("You cannot afford this");
    }
  }

  buyToy() {
    if (this.money >= 200) {
      this.subtactMoney(200);
      this.userInventory.toy++;
      console.log(this.userInventory);
    } else {
      window.alert("You cannot afford this");
    }
  }

  subtactMoney(amt) {
    this.money = this.money - amt;
    this.updateDisplay();
  }
}

module.exports = Store;
