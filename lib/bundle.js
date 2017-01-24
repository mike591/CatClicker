/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", () => {
	  const game = new Game();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Store = __webpack_require__(2);
	const Cat = __webpack_require__(3);
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	class Cat {
	  constructor() {
	    this.heath = 100;
	    this.hunger = 100;
	    this.happiness = 100;
	    this.cleanliness = 100;
	
	    this.updateDisplay();
	  }
	
	  updateDisplay() {
	    
	  }
	}
	
	module.exports = Cat;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map