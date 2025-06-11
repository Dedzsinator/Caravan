import { CONFIG } from './config.js';

export class CaravanManager {
  constructor() {
    this.stats = {
      day: 0,
      distance: 0,
      csapattag: 30,
      étel: 80,
      folyadék: 100,
      ökör: 2,
      gold: 300,
      tűzerő: 2,
      weight: 0,
      capacity: 0
    };
  }

  init(initialStats = {}) {
    Object.assign(this.stats, initialStats);
    this.updateWeight();
  }

  updateWeight() {
    let droppedFood = 0;
    let droppedGuns = 0;

    // Calculate capacity
    this.stats.capacity = this.stats.ökör * CONFIG.WEIGHT_PER_OX + 
                         this.stats.csapattag * CONFIG.WEIGHT_PER_PERSON;

    // Calculate current weight
    this.stats.weight = this.stats.étel * CONFIG.FOOD_WEIGHT + 
                       this.stats.tűzerő * CONFIG.FIREPOWER_WEIGHT;

    // Drop items if overweight (guns first, then food)
    while (this.stats.tűzerő > 0 && this.stats.capacity <= this.stats.weight) {
      this.stats.tűzerő--;
      this.stats.weight -= CONFIG.FIREPOWER_WEIGHT;
      droppedGuns++;
    }

    if (droppedGuns > 0 && this.ui) {
      this.ui.notify(`${droppedGuns} fegyvered veszett oda!`, 'negative');
    }

    while (this.stats.étel > 0 && this.stats.capacity <= this.stats.weight) {
      this.stats.étel--;
      this.stats.weight -= CONFIG.FOOD_WEIGHT;
      droppedFood++;
    }

    if (droppedFood > 0 && this.ui) {
      this.ui.notify(`${droppedFood} ételed veszett oda!`, 'negative');
    }
  }

  updateDistance() {
    const diff = this.stats.capacity - this.stats.weight + this.stats.ökör;
    const speed = CONFIG.SLOW_SPEED + (diff / this.stats.capacity) * CONFIG.FULL_SPEED;
    this.stats.distance += speed;
  }

  consumeWater() {
    this.stats.folyadék -= this.stats.csapattag * CONFIG.WATER_PER_PERSON;
    if (this.stats.folyadék < 0) {
      this.stats.folyadék = 0;
    }
  }

  consumeFood() {
    this.stats.étel -= this.stats.csapattag * CONFIG.FOOD_PER_PERSON;
    if (this.stats.étel < 0) {
      this.stats.étel = 0;
    }
  }

  // Getters for individual stats
  get day() { return this.stats.day; }
  get distance() { return this.stats.distance; }
  get csapattag() { return this.stats.csapattag; }
  get étel() { return this.stats.étel; }
  get folyadék() { return this.stats.folyadék; }
  get ökör() { return this.stats.ökör; }
  get gold() { return this.stats.gold; }
  get tűzerő() { return this.stats.tűzerő; }
  get weight() { return this.stats.weight; }
  get capacity() { return this.stats.capacity; }

  // Setters for stats that need validation
  set gold(value) { this.stats.gold = Math.max(0, value); }
  set étel(value) { this.stats.étel = Math.max(0, value); }
  set folyadék(value) { this.stats.folyadék = Math.max(0, value); }
  set csapattag(value) { this.stats.csapattag = Math.max(0, value); }
  set ökör(value) { this.stats.ökör = Math.max(0, value); }
  set tűzerő(value) { this.stats.tűzerő = Math.max(0, value); }
}
