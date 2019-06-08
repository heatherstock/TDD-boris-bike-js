class Bike {
  constructor (working = true) {
    this.working = working;
  }
  isWorking () {
    this.working = true;
    return this;
  }

  isBroken () {
    this.working = false;
    return this;
  }
}

module.exports = Bike;