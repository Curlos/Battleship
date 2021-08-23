const { Ship } = require('../classes/Ship')

describe('Ship lengths', () => {
  test('create ship of length one', () => {
    const ship = new Ship(1)
    expect(ship.length).toBe(1)
  })

  test('create ship of length 5', () => {
    const ship = new Ship(5)
    expect(ship.length).toBe(5)
  })
})

describe('Get ship positions', () => {
  test('Get all of the ships positions', () => {
    const ship = new Ship(4)
    const positions = [[0,1], [0,2], [0,3], [0,4]]
    ship.setPositions(positions)
    
    expect(ship.getPositions()).toStrictEqual(positions)
  })

  test('Place ship into a position where there is not enough space', () => {
    const ship = new Ship(4)
    const positions = [[0,1], [0,2]]
    ship.setPositions(positions)
    
    expect(ship.setPositions(positions)).toBe('Ship cannot fit!')
    expect(ship.getPositions()).toBe(undefined)
  })

})

describe('Ship hit', () => {
  test('Hit ship several times but enough to sink it', () => {
    const ship = new Ship(5)
    const positionNums = [[0,1], [0,2], [0,3], [0,4]]
    
    positionNums.forEach((positionNum) => ship.hit(positionNum))
    expect(ship.getPositionsHit()).toStrictEqual([
      {x: 0, y: 1, hit: false},
      {x: 0, y: 2, hit: false},
      {x: 0, y: 3, hit: false},
      {x: 0, y: 4, hit: false},
    ])
    expect(ship.getPositionsHit().length).toBe(4)
    expect(ship.isSunk()).toBe(false)
  })

  test('Hit ship enough times to sink it', () => {
    const ship = new Ship(5)
    positionNums = [[0,1], [0,2], [0,3], [0,4], [0,5]]
    
    positionNums.forEach((positionNum) => ship.hit(positionNum))
    expect(ship.getPositionsHit()).toStrictEqual([[0,1], [0,2], [0,3], [0,4], [0,5]])
    expect(ship.getPositionsHit().length).toBe(5)
    expect(ship.isSunk()).toBe(true)
  })
})