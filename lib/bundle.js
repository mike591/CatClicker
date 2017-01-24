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
	const Display = __webpack_require__(4);
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Store {
	  constructor() {
	    this.money = 1000;
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
	      return true;
	    } else {
	      window.alert("You cannot afford this");
	      return false;
	    }
	  }
	
	  buyBrush() {
	    if (this.money >= 150) {
	      this.subtactMoney(150);
	      this.userInventory.brush++;
	      return true;
	    } else {
	      window.alert("You cannot afford this");
	      return false;
	    }
	  }
	
	  buyToy() {
	    if (this.money >= 200) {
	      this.subtactMoney(200);
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	const NEEDS_DECREASE_RATE = 5000; // 5 seconds
	const REFRESH_RATE = 60/1000; // 60 frames per second
	
	class Cat {
	  constructor() {
	    this.health = 100;
	    this.hunger = 1;
	    this.happiness = 50;
	    this.cleanliness = 50;
	    this.startTime = new Date().getTime() / 1000;
	
	    this.setTimers();
	  }
	
	  useFood() {
	    this.hunger += 25;
	  }
	
	  useBrush() {
	    this.cleanliness += 25;
	  }
	
	  useToy() {
	    this.happiness += 25;
	  }
	
	  setTimers() {
	    let hungerInterval = setInterval( ()=>{
	      if ( this.hunger === 0 ) {
	        this.updateHealth();
	      } else {
	        this.hunger--;
	      }
	    }, NEEDS_DECREASE_RATE);
	
	    let happinessInterval = setInterval( ()=>{
	      if ( this.happiness === 0 ) {
	        this.updateHealth();
	      } else {
	        this.happiness--;
	      }
	    }, NEEDS_DECREASE_RATE);
	
	    let cleanlinessInterval = setInterval( ()=>{
	      if ( this.cleanliness === 0 ) {
	        this.updateHealth();
	      } else {
	        this.cleanliness--;
	      }
	    }, NEEDS_DECREASE_RATE);
	
	    let refresh = setInterval( ()=> {
	      this.updateNeeds('hungerBar', 'hungerPercentage', this.hunger);
	      this.updateNeeds('happinessBar', 'cleanlinessPercentage', this.happiness);
	      this.updateNeeds('cleanlinessBar', 'happinessPercentage', this.cleanliness);
	      this.updateCatAge();
	    }, REFRESH_RATE);
	  }
	
	  updateNeeds(barId, percentageId, need) {
	    let barElem = document.getElementById(barId);
	    let percentageElem = document.getElementById(percentageId);
	
	    if (need > 100) {
	      // clearInterval(interval);
	    } else {
	      barElem.style.width = need + '%';
	      percentageElem.innerHTML = `${need}%`;
	    }
	  }
	
	  updateCatAge() {
	    let currentTime = new Date().getTime() / 1000;
	    let age = currentTime - this.startTime;
	    let hours = Math.floor(age / 3600);
	    age %= 3600;
	
	    let minutes = Math.floor(age / 60);
	    age %= 60;
	
	    let seconds = Math.floor(age);
	
	    let elem = document.getElementById('catAge');
	    elem.innerHTML = `Your cat survived for: ${hours}h : ${minutes}m : ${seconds}s`;
	  }
	
	  updateHealth() {
	    this.health--;
	    let elem = document.getElementById('health');
	    elem.innerHTML = `Health: ${this.health}%`;
	  }
	}
	
	module.exports = Cat;


/***/ },
/* 4 */
/***/ function(module, exports) {

	let mouseX = 0;
	let mouseY = 0;
	let speed = 2;
	
	class Display {
	  constructor() {
	    this.canvas = document.getElementById('canvas');
	    this.canvasContext = canvas.getContext('2d');
	
	    this.drawAll();
	  }
	
	  drawAll() {
	    this.clearScreen();
	    this.drawGround();
	    this.drawCat();
	  }
	
	  drawCat() {
	    this.canvasContext.drawImage();
	  }
	
	  drawGround() {
	    this.colorRect(0, this.canvas.height-20, this.canvas.width,100, 'green');
	  }
	
	  clearScreen() {
	  	this.colorRect(0,0, this.canvas.width,this.canvas.height, 'gray');
	  }
	
	  colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	    this.canvasContext.fillStyle = fillColor;
	  	this.canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
	  }
	
	
	}
	
	module.exports = Display;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map