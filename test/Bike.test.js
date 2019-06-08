const assert = require('assert');
const Bike = require('../src/Bike')

describe('Bike', () => {
  it('should check whether it is working', () => {
    const bike = new Bike();
    bike.isWorking();
  });

  it('should default to working upon creation', () => {
    const bike = new Bike();
    assert.equal(bike.working, true);
  })

  it('should know whether it is broken', () => {
    const bike = new Bike();
    bike.isBroken()
    assert.equal(bike.working, false);
  })
});
