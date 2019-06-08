class Garage {
  constructor () {
    this.brokenBikes = []
    this.workingBikes = []
  }

  getBrokenBikes (bikes) {
    return this.brokenBikes = bikes.filter(bike => !bike.working)
  }

  releaseWorkingBikes () {
    const workingBikes = this.workingBikes
    this.workingBikes = []
    return workingBikes;
  }

  fixBikes () {
    this.brokenBikes.forEach(bike => bike.working = true)
    this.brokenBikes.forEach(bike => this.workingBikes.push(bike))
    this.brokenBikes = [];
    return this.workingBikes;
  }
}

module.exports = Garage;