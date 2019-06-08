class DockingStation {
  constructor (capacity = 20) {
    this.capacity = capacity;
    this.station = [];
    this.bikesForRepair = [];
    this.rejectedBikes = [];
  }

  releaseBike () {
    return this._stationEmpty()
      ? new Error('No working bikes available')
      : this.station.pop();
  }
  
  dock (bikes) {
    if (!bikes.length) return this._dockSingle(bikes)
    else return this._dockMultiple(bikes)
  }

  releaseBrokenBikes () {
    this._getBrokenBikes()
    return this.bikesForRepair;
  }

  rejectRemainingWorkingBikes () {
    const rejectedBikes = this.rejectedBikes
    this.rejectedBikes = []
    return rejectedBikes;
  }

  _stationFull () {
    return this.station.length === this.capacity;
  }

  _stationEmpty () {
    return this._getWorkingBikes().length === 0;
  }

  _remainingStationCapacity () {
    return this.capacity - this.station.length;
  }

  _getWorkingBikes () {
    return this.station.filter(bike => bike.working);
  }

  _getBrokenBikes () {
    for (var i = this.station.length - 1; i >= 0; i--) {
      if (this.station[i].working === false) {
        this.bikesForRepair.push(this.station[i])
        this.station.splice(i, 1)
      }
    }
  }

  _dockSingle (bike) {
    if (this._stationFull()) {
      return new Error('Docking station full');
    } else {
      return this.station.push(bike);
    }
  }

  _dockMultiple (bikes) {
    if (bikes.length > this._remainingStationCapacity()) {
      this._separate(bikes)
      this._storeWorking(bikes)
      return this.rejectRemainingWorkingBikes();
    } else {
      bikes.forEach(bike => this.station.push(bike))
      return this.station;
    }
  }

  _separate (bikes) {
    this.rejectedBikes = bikes.map(bike => bike);
    const notDocked = bikes.length - this._remainingStationCapacity()
    bikes.splice(0, notDocked)
    this.rejectedBikes.splice(notDocked, this.rejectedBikes.length - 1)
  }

  _storeWorking (bikes) {
    bikes.forEach(bike => this.station.push(bike))
  }
}

module.exports = DockingStation;