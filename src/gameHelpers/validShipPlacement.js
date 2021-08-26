const validShipPlacement = (currentPlayerTurn, ship) => {
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
        return false
      }

      if (shipEndPosX >= placedStartPosX && shipEndPosX <= placedEndPosX) {
        return false
      }

      if (Math.abs(placedEndPosX - shipStartPosX) === 1) {
        return false
      }
    }

    if (Math.abs(shipStartPosY - placedStartPosY) === 1 || Math.abs(shipEndPosY - placedStartPosY) === 1) {
      return false
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
    
    if (shipStartPosY >= placedStartPosY && shipStartPosY <= placedEndPosY) {
      return false
    }
    if (shipStartPosY >= placedStartPosY && shipStartPosY <= placedEndPosY) {
      return false
    }
    if (shipEndPosY >= placedStartPosY && shipEndPosY <= placedEndPosY) {
      return false
    }

    if (Math.abs(placedEndPosY - shipStartPosY) === 1) {
      return false
    }

    if (Math.abs(placedStartPosY - shipEndPosY) === 1) {
      return false
    }
  }

  if (Math.abs(shipStartPosX - placedStartPosX) === 1 || Math.abs(shipEndPosX - placedStartPosX) === 1) {
    return false
  }

  return true
}

export default validShipPlacement