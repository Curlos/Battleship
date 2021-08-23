const validShipPlacement = (currentPlayerTurn, ship) => {
  if (currentPlayerTurn.playerLabel === 'playerOne') {
    const placedShips = currentPlayerTurn.getGameboard().getPlacedShips()
    if (ship.getPositions().length === 0) {
      return false
    }

    if (ship.getAxis() === 'X') {
      
      for (let placedShip of placedShips) {
        if (validateShipWithX(ship, placedShip) === false) {
          return false
        }
      }
    } else if (ship.getAxis() === 'Y') {
      for (let placedShip of placedShips) {
        if (validateShipWithY(ship, placedShip) === false) {
          return false
        }
      }
    }
  } else if (currentPlayerTurn === 'playerTwo') {

  }

  return true
}

const validateShipWithX = (ship, placedShip) => {
  if (placedShip.getAxis() === ship.getAxis()) {
    const { x: shipStartPosX, y: shipStartPosY } = ship.getFirstPosition()
    const { x: shipEndPosX, y: shipEndPosY } = ship.getLastPosition()
    const { x: placedStartPosX, y: placedStartPosY } = placedShip.getFirstPosition()
    const { x: placedEndPosX, y: placedEndPosY } = placedShip.getLastPosition()
    
    if (shipStartPosY === placedStartPosY) {
      if (shipStartPosX >= placedStartPosX && shipStartPosX <= placedEndPosX) {
        console.log('FALSE')
        return false
      }

      if (shipEndPosX >= placedStartPosX && shipEndPosX <= placedEndPosX) {
        console.log('FALSE')
        return false
      }
    }
  }

  return true
}

const validateShipWithY = (ship, placedShip) => {
  const { x: shipStartPosX, y: shipStartPosY } = ship.getFirstPosition()
  const { x: shipEndPosX, y: shipEndPosY } = ship.getLastPosition()
  const { x: placedStartPosX, y: placedStartPosY } = placedShip.getFirstPosition()
  const { x: placedEndPosX, y: placedEndPosY } = placedShip.getLastPosition()
  
  if (shipStartPosX === placedStartPosX) {
    console.log('checkign....')
    console.log(`shipStartPosY: ${shipStartPosY}\nshipEndPosY: ${shipEndPosY}\nplacedStartPosY: ${placedStartPosY}`)
    
    if (shipStartPosY >= placedStartPosY && shipStartPosY <= placedEndPosY) {
      console.log('1')
      return false
    }
    if (shipStartPosY >= placedStartPosY && shipStartPosY <= placedEndPosY) {
      console.log('FALSE')
      console.log('2')
      return false
    }
    if (shipEndPosY >= placedStartPosY && shipEndPosY <= placedEndPosY) {
      console.log('FALSE')
      console.log('3')
      return false
    }
  }

  return true
}

export default validShipPlacement