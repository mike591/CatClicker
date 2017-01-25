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
    let elem = document.getElementById('health');
    elem.innerHTML = `Health: ${this.health}%`;
  }
}

module.exports = Cat;
