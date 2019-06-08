const assert = require('assert');
const Garage = require('../src/Garage')

describe('Garage', () => {
  it('collect broken bikes from the van', () => {
    const garage = new Garage();
    const fakeBike = {
      working: false
    }
    class FakeVan {
      constructor () {
        this.brokenBikes = [fakeBike, fakeBike];
      }
      releaseBrokenBikes () {
        return this.brokenBikes;
      }
    }
    const fakeVan = new FakeVan()
    assert.deepEqual(garage.getBrokenBikes(fakeVan.releaseBrokenBikes()), [fakeBike, fakeBike])
    assert.equal(garage.brokenBikes.length, 2)
  });

  it('should only collect broken bikes not working bikes', () => {
    const garage = new Garage();
    const fakeBike = {
      working: false
    }
    const workingFakeBike = {
      working: true
    }
    class FakeVan {
      constructor () {
        this.brokenBikes = [fakeBike, fakeBike, workingFakeBike];
      }
      releaseBrokenBikes () {
        return this.brokenBikes;
      }
    }
    const fakeVan = new FakeVan()
    assert.deepEqual(garage.getBrokenBikes(fakeVan.releaseBrokenBikes()), [fakeBike, fakeBike])
    assert.equal(garage.brokenBikes.length, 2)
    assert.equal(garage.workingBikes.length, 0)
  })

  it('should release working bikes to the van', () => {
    const garage = new Garage();
    const fakeBike = {
      working: true
    }
    garage.workingBikes = [fakeBike, fakeBike]
    assert.deepEqual(garage.releaseWorkingBikes(), [fakeBike, fakeBike])
    assert.equal(garage.workingBikes.length, 0)
  })

  it('should only release working bikes not broken bikes to the van', () => {
    const garage = new Garage();
    const fakeWorkingBike = {
      working: true
    }
    const fakeBrokenBike = {
      working: false
    }
    garage.workingBikes = [fakeWorkingBike]
    garage.brokenBikes = [fakeBrokenBike]
    assert.deepEqual(garage.releaseWorkingBikes(), [fakeWorkingBike])
    assert.equal(garage.workingBikes.length, 0)
    assert.equal(garage.brokenBikes.length, 1)

  })

  it('should fix bikes', () => {
    const garage = new Garage();
    const fakeBike = {
      working: false
    }
    garage.brokenBikes = [fakeBike, fakeBike]
    garage.fixBikes()
    assert.equal(fakeBike.working, true)
    assert.equal(garage.brokenBikes.length, 0)
    assert.equal(garage.workingBikes.length, 2)
  })
});
