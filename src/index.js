import { Ship } from './classes/Ship'
import { Gameboard } from './classes/Gameboard'
import { Player } from './classes/Player'

const gameStarted = false
const axis = 'X'
const shipLengths = [5, 4, 3, 3, 2]
const currShipLengthIndex = 0
let hoveredElems = []

const attackPosition = (event) => {
  const pos = event.target
  const [x, y] = [Number(pos.getAttribute('x')), Number(pos.getAttribute('y'))]


  pos.classList.add('hit')

  console.log(x, y)
}

const validShipPlacement = () => {

}

const clearElemColors = () => {
  hoveredElems.forEach((elem) => elem.style.backgroundColor = '#5775B0')
  hoveredElems = []
}

const handleHoverPosition = (event) => {
  clearElemColors()
  if(gameStarted === false) {
    const elem = event.target
    placeShip(elem, axis)
  }
}

const placeShip = (pos, axis) => {
  const ship = new Ship(shipLengths[currShipLengthIndex])

  if (axis === 'X') {
    placeShipX(ship, pos)
  } else if (axis === 'Y') {
    placeShipY(ship, pos)
  }
}

const placeShipX = (ship, pos) => {
  const [x, y] = [Number(pos.getAttribute('x')), Number(pos.getAttribute('y'))]
  const shipLen = ship.getLength()
  const finalShipPositionY = (y + shipLen) - 1

  if (finalShipPositionY <= 9) {
    console.log(x, y)

    for(let i = y; i <= finalShipPositionY; i++) {
      const elem = document.querySelectorAll(`[x="${x}"][y="${i}"]`)[0]
      hoveredElems.push(elem)
      elem.style.backgroundColor = 'white'
    }
  }
}

const placeShipY = (pos) => {
  const [x, y] = [Number(pos.getAttribute('x')), Number(pos.getAttribute('y'))]
  console.log(x, y)
}

const finalizeShipPlacement = () => {
  if (validShipPlacement) {
    currShipLengthIndex -= 1
  }
}

const displayGameboard = (player) => {
  const gameboards = document.querySelector('.gameboards')
  const gameboard = document.createElement('div')
  gameboard.classList.add('gameboard', player)
  
  for (let x = 0; x < 10; x++) {
    
    for(let y = 0; y < 10; y++) {
      let positionElem = document.createElement('div')
      positionElem.setAttribute('x', x)
      positionElem.setAttribute('y', y)
      positionElem.classList.add('position')
      
      if (player === 'playerOne') {
        positionElem.addEventListener('click', finalizeShipPlacement)
        positionElem.addEventListener('mouseover', handleHoverPosition)
      } else if (player === 'playerTwo') {
        positionElem.addEventListener('click', attackPosition)
      }
      gameboard.append(positionElem)
    }
  }

  gameboards.append(gameboard)
}

displayGameboard('playerOne')
displayGameboard('playerTwo')

const elem = document.querySelectorAll(`[x="1"]`)
console.log(elem)