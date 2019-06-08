const DockingStation = require('./DockingStation')

class Van {
  constructor () {
    this.brokenBikes = [];
    this.workingBikes = [];
  }

  getBrokenBikes (bikes) {
    if (!bikes.length) {
      return this._storeSingleBroken(bikes)
    } else {
      return this._storeMultipleBroken(bikes)
    }
  }

  releaseBrokenBikes () {
    const bikesForRepair = this.brokenBikes.map(bike => bike);
    this.brokenBikes = []
    return bikesForRepair;
  }

  getWorkingBikes (bikes) {
    if (!bikes.length) {
      return this._storeSingleWorking(bikes)
    } else {
      return this._storeMultipleWorking(bikes)
    }
  }

  releaseWorkingBikes () {
    const workingBikes = this.workingBikes
    this.workingBikes = []
    return workingBikes;
  }

  _storeSingleWorking (bike) {
    return this.workingBikes.push(bike)
  }

  _storeMultipleWorking (bikes) {
    bikes.forEach(bike => this.workingBikes.push(bike));
    return this.workingBikes;
  }

  _storeSingleBroken (bike) {
    return this.brokenBikes.push(bike)
  }

  _storeMultipleBroken (bikes) {
    bikes.forEach(bike => this.brokenBikes.push(bike));
    return this.brokenBikes;
  }
}

module.exports = Van;