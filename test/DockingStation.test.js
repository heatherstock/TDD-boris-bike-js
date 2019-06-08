const assert = require('assert');
const DockingStation = require('../src/DockingStation')

const fakeBike = {
  working: true
};

describe('Docking Station', () => {
  it('should dock a bike', () => {
    const dockingStation = new DockingStation();
    dockingStation.dock(fakeBike);
    assert.equal(dockingStation.station.length, 1)
  });

  it('should release a bike if one is available', () => {
    const dockingStation = new DockingStation();
    dockingStation.dock(fakeBike);
    assert.equal(dockingStation.releaseBike(), fakeBike);
    assert.equal(dockingStation.station.length, 0)
  });

  it('should not release a bike if none are available', () => {
    const dockingStation = new DockingStation();
    assert.equal(dockingStation.releaseBike(), 'Error: No working bikes available');
    assert.equal(dockingStation.station.length, 0)
  });

  it('should not dock a bike if the station is full', () => {
    const dockingStation = new DockingStation();
    for (var i = 0; i < 19; i++) {
      dockingStation.dock(fakeBike);
    }
    dockingStation.dock(fakeBike)
    assert.equal(dockingStation.station.length, 20)
    assert.equal(dockingStation.dock(fakeBike), 'Error: Docking station full');
    assert.equal(dockingStation.station.length, 20)
  })

  it('should have a default capacity of 20 bikes', () => {
    const dockingStation = new DockingStation();
    assert.equal(dockingStation.capacity, 20)
  })

  it('should have a capacity as set on creation', () => {
    const dockingStation = new DockingStation(30);
    assert.equal(dockingStation.capacity, 30)
  })

  it('should find out if the bike is working', () => {
    assert.equal(fakeBike.working, true);
  });

  it('should report if a bike as broken upon return and accept it', () => {
    const dockingStation = new DockingStation();
    const soonToBeBrokenFakeBike = {
      working: true
    }
    dockingStation.dock(soonToBeBrokenFakeBike.working = false)
    assert.equal(soonToBeBrokenFakeBike.working, false);
    assert.equal(dockingStation.station.length, 1)
  });

  it('should only report the broken bike and not any others', () => {
    const dockingStation = new DockingStation();
    dockingStation.dock(fakeBike)
    const soonToBeBrokenFakeBike = {
      working: true
    }
    dockingStation.dock(soonToBeBrokenFakeBike.working = false)
    assert.equal(fakeBike.working, true)
    assert.equal(soonToBeBrokenFakeBike.working, false)
    assert.equal(dockingStation.station.length, 2)
  });

  it('should not release broken bikes', () => {
    const dockingStation = new DockingStation();
    const soonToBeBrokenFakeBike = {
      working: true
    }
    dockingStation.dock(soonToBeBrokenFakeBike.working = false)
    assert.equal(dockingStation.releaseBike(), 'Error: No working bikes available');
    assert.equal(dockingStation.station.length, 1)
  });

  it('should release working bikes when there is a mix of working and non-working bikes', () => {
    const dockingStation = new DockingStation();
    const brokenFakeBike = {
      working: false
    }
    dockingStation.dock(brokenFakeBike)
    dockingStation.dock(fakeBike);
    assert.equal(dockingStation.releaseBike(), fakeBike);
    assert.equal(dockingStation.station.length, 1)
  });

  it('should release all non-working bikes to the van', () => {
    const dockingStation = new DockingStation();
    const brokenFakeBike = {
      working: false
    }
    dockingStation.dock(brokenFakeBike)
    dockingStation.dock(brokenFakeBike)
    assert.deepEqual(dockingStation.releaseBrokenBikes(), [brokenFakeBike, brokenFakeBike]);
    assert.equal(dockingStation.station.length, 0)
  })

  it('should accept all working bikes from the van if there is space', () => {
    const dockingStation = new DockingStation();
    assert.deepEqual(dockingStation.dock([fakeBike, fakeBike]), [fakeBike, fakeBike]);
    assert.equal(dockingStation.station.length, 2)
  })

  it('should except a partial dock of bikes from the van if there is some space', () => {
    const dockingStation = new DockingStation(2);
    class FakeVan {
      constructor () {
        this.workingBikes = [
        fakeBike,
        fakeBike,
        fakeBike
        ]
      }
      releaseWorkingBikes () {
        return this.workingBikes;
      }
    }
    const fakeVan = new FakeVan()
    assert.deepEqual(dockingStation.dock(fakeVan.releaseWorkingBikes()), [fakeBike]);
    assert.equal(dockingStation.station.length, 2)
  })
});
