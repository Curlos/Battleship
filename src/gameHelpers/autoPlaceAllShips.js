import { placeShip } from '../index'

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const autoPlaceAllShips = (player, gameStarted, totalShips, axis) => {
  if (gameStarted) {
    return
  }

  const gameboard = document.querySelector(`.${player.getPlayerLabel()}`)

  console.log('hello player one')

  let numOfPlacedShips = player.getGameboard().getPlacedShips().length

  while (numOfPlacedShips < totalShips) {
    const x = getRandomInt(0, 9)
    const y = getRandomInt(0, 9)

    const elem = document.querySelectorAll(`[x="${x}"][y="${y}"]`)[0]
    placeShip(elem, axis)
    elem.click()

    numOfPlacedShips = Object.values(player.getGameboard().getPlacedShips()).length
  }

  console.log(gameboard)
}