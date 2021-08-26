let playerOne;
let playerTwo;

export const setPlayers = (playerOneVar, playerTwoVar) => {
  playerOne = playerOneVar
  playerTwo = playerTwoVar
}

export const handleAttackClick = (event) => {
  const elem = event.target
  const attackedPlayer = elem.classList.contains('playerTwo') ? playerTwo : playerOne
  attackPosition(elem, attackedPlayer)
}

export const attackPosition = (elem, attackedPlayer) => {
  const [x, y] = [Number(elem.getAttribute('x')), Number(elem.getAttribute('y'))]

  if (elem.classList.contains('hit') === false) {
    elem.classList.remove('notHit')
    elem.classList.add('hit')

    if (elem.classList.contains('placedPosition')) {
      console.log('ATTACKED A SHIP!!!!!')
      
      const attackedPlayerShips = Array.from(Object.values(attackedPlayer.getGameboard().getPlacedShips()))
      const shipIndex = Number(elem.getAttribute('ship-index'))
      const x = Number(elem.getAttribute('x'))
      const y = Number(elem.getAttribute('y'))
      console.log(shipIndex)
      const ship = attackedPlayerShips[shipIndex]

      ship.hit([x, y])


      console.log(ship)
      
      if (ship.isSunk()) {
        sunkShip()
      }
    }

    elem.classList.remove()
  }

  console.log(x, y)
}

const sunkShip = () => {
  // reveal the ship position and picture of the silhouette
  // also add fade out the ship on the board

  console.log('SHIP HAS BEEN SUNK! MAYDAY! MAYDAY!')
}

const allShipsSunk = () => {

}