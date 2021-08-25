import validShipHover from '../gameHelpers/validShipHover'

let hoveredElems = []

export class ShipPlacement {

  gameStarted;
  hoveredElems = [];

  placeShip(elem, axis, shipLengths, currShipLengthIndex, currentPlayerTurn, gameStarted) {

    this.gameStarted = gameStarted

    const shipLen = shipLengths[currShipLengthIndex]
  
    if (axis === 'X') {
      if (validShipHover(shipLen, elem, axis, currentPlayerTurn)) {
        elem.classList.remove('invalidShipPlacement')
        this.placeShipX(shipLen, elem)
      } else {
        console.log('CHANGNG CURSOR')
        console.log(elem)
        elem.classList.add('invalidShipPlacement')
      }
    } else if (axis === 'Y') {
      if (validShipHover(shipLen, elem, axis, currentPlayerTurn)) {
        this.placeShipY(shipLen, elem)
      }
    }
  }
  
  placeShipX(shipLen, elem) {
    const [x, y] = [Number(elem.getAttribute('x')), Number(elem.getAttribute('y'))]
    const finalShipPositionX = (x + shipLen) - 1
  
    if (finalShipPositionX <= 9) {
  
      for(let i = x; i <= finalShipPositionX; i++) {
        const elem = document.querySelectorAll(`[x="${i}"][y="${y}"]`)[0]
        this.hoveredElems.push(elem)
        elem.style.backgroundColor = 'white'
      }
  
    }
  }
  
  placeShipY(shipLen, pos) {
    const [x, y] = [Number(pos.getAttribute('x')), Number(pos.getAttribute('y'))]
    const finalShipPositionY = (y + shipLen) - 1
  
    if (finalShipPositionY <= 9) {
      console.log(x, y)
  
      for(let i = y; i <= finalShipPositionY; i++) {
        const elem = document.querySelectorAll(`[x="${x}"][y="${i}"]`)[0]
        this.hoveredElems.push(elem)
        elem.style.backgroundColor = 'white'
      }
    }
  }
  
  finalizeShipPlacement() {
  
    console.log('placing ship')
    console.log(gameStarted)
  
    if (gameStarted) {
      return
    }
    const shipLen = hoveredElems.length
    const ship = new Ship(shipLen, axis)
    const shipPositions = []
  
    this.hoveredElems.forEach((elem) => {
      const x = Number(elem.getAttribute('x'))
      const y = Number(elem.getAttribute('y'))
      shipPositions.push([{x, y, hit: false}])
    })
  
    ship.setPositions(shipPositions)
  
    if (validShipPlacement(currentPlayerTurn, ship)) {
      
      playerOne.getGameboard().placeShip(ship)
  
      this.hoveredElems = []
      currShipLengthIndex += 1
    }
  
    console.log(playerOne.getGameboard().getPlacedShips())
  }
  
  setHoveredElems(newHoveredElems) {
    this.hoveredElems = newHoveredElems
  }
  
  getHoveredElems() {
    return this.hoveredElems
  }

}