import createShipWithPos from './createShipWithPos'
import validShipPlacement from './validShipPlacement'

const validShipHover = (shipLen, elem, axis, currentPlayerTurn) => {
  const [x, y] = [Number(elem.getAttribute('x')), Number(elem.getAttribute('y'))]
  const finalShipPositionX = (x + shipLen) - 1
  const hoveredPos = []

  if (finalShipPositionX <= 9) {
    for(let i = x; i <= finalShipPositionX; i++) {
      hoveredPos.push({x: i, y})
    }
  }

  const ship = createShipWithPos(hoveredPos, axis)

  console.log(`SHIP PLACEMENT VALID? ${validShipPlacement(currentPlayerTurn, ship)}`)
  console.log(hoveredPos)
  console.log(ship)

  return validShipPlacement(currentPlayerTurn, ship)
}

export default validShipHover