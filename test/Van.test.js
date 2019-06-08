const assert = require('assert');
const Van = require('../src/Van')

describe('Van', () => {
  it('should take all broken bikes from the docking station', () => {
    const van = new Van();
    const fakeBrokenBike = {
      working: false
    }
    class FakeDockingStation {
      constructor () {
        this.station = [fakeBrokenBike, fakeBrokenBike];
        this.bikesForRepair = []
      }
      releaseBrokenBikes () {
        for (var i = this.station.length - 1; i >= 0; i--) {
          if (this.station[i].working === false) {
            this.bikesForRepair.push(this.station[i])
            this.station.splice(i, 1)
          }
        }
        return this.bikesForRepair;
      }
    }
    const fakeDockingStation = new FakeDockingStation();
    assert.deepEqual(van.getBrokenBikes(fakeDockingStation.releaseBrokenBikes()), [fakeBrokenBike, fakeBrokenBike]);
    assert.equal(van.brokenBikes.length, 2)
  });

  it('should give all broken bikes to the garage', () => {
    const van = new Van();
    const fakeBrokenBike = {
      working: false
    }
    van.brokenBikes.push(fakeBrokenBike)
    van.brokenBikes.push(fakeBrokenBike)
    assert.deepEqual(van.releaseBrokenBikes(), [fakeBrokenBike, fakeBrokenBike])
    assert.equal(van.brokenBikes, 0)
  })

  it('should get all fixed bikes from the garage', () => {
    const van = new Van();
    const fakeWorkingBike = {
      working: true
    }
    class FakeGarage {
      constructor () {
        this.workingBikes = [fakeWorkingBike]
      }
      releaseWorkingBikes () {
        return this.workingBikes;
      }
    }
    const fakeGarage = new FakeGarage()
    assert.deepEqual(van.getWorkingBikes(fakeGarage.releaseWorkingBikes()), [fakeWorkingBike])
    assert.equal(van.workingBikes.length, 1)
  })

  it('should add working bikes to collection, not replace them', () =>{
    const van = new Van();
    const fakeWorkingBike = {
      working: true
    }
    van.workingBikes = [fakeWorkingBike]
    class FakeGarage {
      constructor () {
        this.workingBikes = [fakeWorkingBike]
      }
      releaseWorkingBikes () {
        return this.workingBikes;
      }
    }
    const fakeGarage = new FakeGarage()
    assert.deepEqual(van.getWorkingBikes(fakeGarage.releaseWorkingBikes()), [fakeWorkingBike, fakeWorkingBike])
    assert.equal(van.workingBikes.length, 2)
  })

  it('should add broken bikes to collection, not replace them', () =>{
    const van = new Van();
    const fakeBrokenBike = {
      working: false
    }
    van.brokenBikes = [fakeBrokenBike]
    class FakeDockingStation {
      constructor () {
        this.bikesForRepair = [fakeBrokenBike]
      }
      releaseBrokenBikes () {
        return this.bikesForRepair;
      }
    }
    const fakeDockingStation = new FakeDockingStation()
    assert.deepEqual(van.getBrokenBikes(fakeDockingStation.releaseBrokenBikes()), [fakeBrokenBike, fakeBrokenBike])
    assert.equal(van.brokenBikes.length, 2)
  })

  it('should release all working bikes to the dockingStation', () => {
    const van = new Van();
    const fakeWorkingBike = {
      working: true
    }
    van.workingBikes = [fakeWorkingBike];
    assert.deepEqual(van.releaseWorkingBikes(), [fakeWorkingBike])
    assert.equal(van.workingBikes.length, 0)
  })

  it('should only release working bikes to the dockingStation', () => {
    const van = new Van();
    const fakeWorkingBike = {
      working: true
    }
    const fakeBrokenBike = {
      working: false
    }
    van.workingBikes = [fakeWorkingBike];
    van.brokenBikes = [fakeBrokenBike];
    assert.deepEqual(van.releaseWorkingBikes(), [fakeWorkingBike])
    assert.equal(van.workingBikes.length, 0)
    assert.equal(van.brokenBikes.length, 1)
  })

  it('should take back any bikes that do not fit in the docking station', () => {
    const van = new Van();
    const fakeWorkingBike = {
      working: true
    }
    class FakeDockingStation {
      rejectRemainingWorkingBikes () {
        return fakeWorkingBike;
      }
    }
    const fakeDockingStation = new FakeDockingStation()
    van.getWorkingBikes(fakeDockingStation.rejectRemainingWorkingBikes())
    assert.equal(van.workingBikes.length, 1)
  })
});
