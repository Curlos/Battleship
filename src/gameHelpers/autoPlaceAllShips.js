export const autoPlaceAllShips = (player) => {
  if (gameStarted) {
    return
  }

  const gameboard = document.querySelector(`.${player}`)
  clearGameboard(player)

  if (player === playerOne.getPlayerLabel()) {
    console.log('hello player one')

    let numOfPlacedShips = playerOne.getGameboard().getPlacedShips().length

    while (numOfPlacedShips < totalShips) {
      const x = getRandomInt(0, 9)
      const y = getRandomInt(0, 9)

      const elem = document.querySelectorAll(`[x="${x}"][y="${y}"]`)[0]
      placeShip(elem, axis)
      elem.click()

      numOfPlacedShips = Object.values(playerOne.getGameboard().getPlacedShips()).length
    }


  } else if (player === playerTwo.getPlayerLabel()) {

  }

  console.log(gameboard)
}