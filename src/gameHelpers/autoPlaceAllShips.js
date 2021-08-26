import { placeShip } from '../index'



const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const autoPlaceAllShips = (player, gameStarted, totalShips, axisOptions) => {
  if (gameStarted) {
    return
  }

  const gameboard = document.querySelector(`.${player.getPlayerLabel()}`)

  console.log('hello player')

  let numOfPlacedShips = Object.values(player.getGameboard().getPlacedShips()).length

  let i = 0;

  while (i < 10) {
    const x = getRandomInt(0, 9)
    const y = getRandomInt(0, 9)
    const axisIndex = getRandomInt(0,1)
    const axis = axisOptions[axisIndex]

    const elem = document.querySelectorAll(`[x="${x}"][y="${y}"]`)[0]
    placeShip(elem, axis)
    elem.click()

    i += 1

    numOfPlacedShips = Object.values(player.getGameboard().getPlacedShips()).length
  }

  console.log(gameboard)
}