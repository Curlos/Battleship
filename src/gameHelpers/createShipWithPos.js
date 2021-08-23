import { Ship } from '../classes/Ship'

const createShipWithPos = (positions, axis) => {
  const shipLen = positions.length
  const ship = new Ship(shipLen, axis)
  const shipPositions = []

  positions.forEach((position) => {
    const {x, y} = position
    shipPositions.push([{x, y, hit: false}])
  })

  ship.setPositions(shipPositions)

  return ship
}

export default createShipWithPos