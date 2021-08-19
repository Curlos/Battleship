const { Ship } = require('../classes/Ship')

describe('Ship', () => {
  test('create ship of length one', () => {
    const shipOne = new Ship(1)
    expect(shipOne.length)
  })
})