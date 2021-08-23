const validShipPlacement = (currentPlayerTurn, ship) => {
  if (currentPlayerTurn.playerLabel === 'playerOne') {
    const placedShips = currentPlayerTurn.getGameboard().getPlacedShips()
    if (ship.getPositions().length === 0) {
      return false
    }

    if (ship.getAxis() === 'X') {
      
      for (let placedShip of placedShips) {
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
      }
    } 

    return true
  } else if (currentPlayerTurn === 'playerTwo') {
    return true
  }
}

const validateShipWithX = () => {

}

const validateShipWithY = () => {

}

export default validShipPlacement