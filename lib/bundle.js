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
	      this.store.resetBlinking();
	      this.store.addMoney();
	    });
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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	const NEEDS_DECREASE_RATE = 5000; // 5 seconds
	const REFRESH_RATE = 60/1000; // 60 frames per second
	
	class Cat {
	  constructor() {
	    this.health = 100;
	    this.hunger = 50;
	    this.happiness = 50;
	    this.cleanliness = 50;
	    this.posX = 0;
	    this.startTime = new Date().getTime() / 1000;
	
	    this.setTimers();
	  }
	
	  useFood() {
	    this.hunger += 25;
	    if (this.hunger > 100) {
	      this.hunger = 100;
	    }
	  }
	
	  useBrush() {
	    this.cleanliness += 25;
	    if (this.cleanliness > 100) {
	      this.cleanliness = 100;
	    }
	  }
	
	  useToy() {
	    this.happiness += 25;
	    if (this.happiness > 100) {
	      this.happiness = 100;
	    }
	  }
	
	  setTimers() {
	    this.updateHealth();
	    let hungerInterval = setInterval( ()=>{
	      if ( this.hunger === 0 ) {
	        this.health--;
	        this.updateHealth();
	      } else {
	        this.hunger--;
	      }
	    }, NEEDS_DECREASE_RATE);
	
	    let happinessInterval = setInterval( ()=>{
	      if ( this.happiness === 0 ) {
	        this.health--;
	        this.updateHealth();
	      } else {
	        this.happiness--;
	      }
	    }, NEEDS_DECREASE_RATE);
	
	    let cleanlinessInterval = setInterval( ()=>{
	      if ( this.cleanliness === 0 ) {
	        this.health--;
	        this.updateHealth();
	      } else {
	        this.cleanliness--;
	      }
	    }, NEEDS_DECREASE_RATE);
	
	    let refresh = setInterval( ()=> {
	      this.updateNeeds('hungerBar', 'hungerPercentage', this.hunger);
	      this.updateNeeds('cleanlinessBar', 'cleanlinessPercentage', this.cleanliness);
	      this.updateNeeds('happinessBar', 'happinessPercentage', this.happiness);
	      this.updateCatAge();
	    }, REFRESH_RATE);
	  }
	
	  updateNeeds(barId, percentageId, need) {
	    let barElem = document.getElementById(barId);
	    let percentageElem = document.getElementById(percentageId);
	
	    if (need <= 100) {
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
	    elem.innerHTML = `${hours}h : ${minutes}m : ${seconds}s`;
	  }
	
	  updateHealth() {
	    let elem = document.getElementById('health');
	    elem.innerHTML = `Health: ${this.health}%`;
	  }
	}
	
	module.exports = Cat;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const FallingObject = __webpack_require__(5);
	
	let mouseX = 0;
	let mouseY = 0;
	let speed = 0.5;
	
	const SIXTY_FRAMES_PER_SECOND = 60/1000;
	const FLOOR = 100;
	const RIGHT_WALL = 220;
	const FOOD = "FOOD";
	const BRUSH = "BRUSH";
	const TOY = "TOY";
	
	class Display {
	  constructor(cat) {
	    this.canvas = document.getElementById('canvas');
	    this.canvasContext = canvas.getContext('2d');
	    this.cat = cat;
	    this.items = [];
	
	    this.background = new Image();
	    this.background.src = ('assets/images/background.png');
	
	    this.catImageRight = new Image();
	    this.catImageRight.src = ('assets/images/cat_right.png');
	
	    this.catImageLeft = new Image();
	    this.catImageLeft.src = ('assets/images/cat_left.png');
	
	    this.catDead = new Image();
	    this.catDead.src = ('assets/images/cat_dead.png');
	
	    this.food = new Image();
	    this.food.src = ('assets/images/food.png');
	
	    this.brush = new Image();
	    this.brush.src = ('assets/images/brush.png');
	
	    this.toy = new Image();
	    this.toy.src = ('assets/images/toy.png');
	
	    this.setTimers();
	  }
	
	
	  clearAllIntervals() {
	    for (var i = 1; i < 99999; i++) {
	      window.clearInterval(i);
	    }
	  }
	
	  dropObject(img, canvasContext, itemType) {
	    let object = new FallingObject(img, canvasContext, itemType);
	    this.items.push(object);
	  }
	
	
	  setTimers() {
	    setInterval(()=> {
	      this.drawAll();
	    }, SIXTY_FRAMES_PER_SECOND);
	  }
	
	  drawAll() {
	    this.clearScreen();
	    this.drawCat();
	    let markForDelete = [];
	    for (let i = 0; i < this.items.length; i++) {
	      this.items[i].updatePos();
	      if (this.cat.posX === this.items[i].posX && this.items[i].posY > FLOOR-20) {
	        markForDelete.push(i);
	      }
	    }
	    for (let i = 0; i < markForDelete.length; i++) {
	      let idx = markForDelete[i];
	      switch (this.items[idx].itemType) {
	        case FOOD:
	          this.cat.useFood();
	          this.items.splice(idx, 1);
	          break;
	        case BRUSH:
	          this.cat.useBrush();
	          this.items.splice(idx, 1);
	          break;
	        case TOY:
	          this.cat.useToy();
	          this.items.splice(idx, 1);
	          break;
	        default:
	          return;
	      }
	    }
	  }
	
	  drawCat() {
	    if (this.cat.health <= 0) {
	      this.clearAllIntervals();
	      this.canvasContext.drawImage(this.catDead, this.cat.posX,FLOOR, 100,50);
	      return;
	    }
	
	    this.cat.posX += speed;
	    if (speed >= 0) {
	      this.canvasContext.drawImage(this.catImageRight, this.cat.posX,FLOOR, 100,50);
	    } else {
	      this.canvasContext.drawImage(this.catImageLeft, this.cat.posX,FLOOR, 100,50);
	    }
	
	    if (this.cat.posX > RIGHT_WALL || this.cat.posX < 0) {
	      speed = -speed;
	    }
	  }
	
	  clearScreen() {
	    this.canvasContext.drawImage(this.background, 0,0, 300,175);
	  	// this.colorRect(0,0, this.canvas.width,this.canvas.height, 'gray');
	  }
	
	  colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	    this.canvasContext.fillStyle = fillColor;
	  	this.canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
	  }
	
	
	}
	
	module.exports = Display;


/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map