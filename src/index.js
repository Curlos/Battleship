import Ship from './classes/Ship'
import Gameboard from './classes/Gameboard'
import Player from './classes/Player'

const displayGameboard = (player) => {
  const gameboards = document.querySelector('.gameboards')
  const gameboard = document.createElement('div')
  gameboard.classList.add('gameboard', player)
  
  for (let x = 0; x < 10; x++) {
    
    for(let y = 0; y < 10; y++) {
      let positionElem = document.createElement('div')
      positionElem.setAttribute('posX', x)
      positionElem.setAttribute('posY', y)
      gameboard.append(positionElem)
    }
  }

  gameboards.append(gameboard)
}

displayGameboard('playerOne')

displayGameboard('playerTwo')