import { Ship } from './classes/Ship'
import { Gameboard } from './classes/Gameboard'
import { Player } from './classes/Player'

const gameStarted = false
const playerOne = new Player('Carlos', 'playerOne')
const playerTwo = new Player('Anthony', 'playerTwo')
const axis = 'X'
const shipLengths = [5, 4, 3, 3, 2]
let currentPlayerTurn = playerOne.playerLabel
let currShipLengthIndex = 0
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
  const shipLen = shipLengths[currShipLengthIndex]

  if (axis === 'X') {
    placeShipX(shipLen, pos)
  } else if (axis === 'Y') {
    placeShipY(shipLen, pos)
  }
}

const placeShipX = (shipLen, pos) => {
  const [x, y] = [Number(pos.getAttribute('x')), Number(pos.getAttribute('y'))]
  const finalShipPositionX = (x + shipLen) - 1

  if (finalShipPositionX <= 9) {
    console.log(x, y)

    for(let i = x; i <= finalShipPositionX; i++) {
      const elem = document.querySelectorAll(`[x="${i}"][y="${y}"]`)[0]
      hoveredElems.push(elem)
      elem.style.backgroundColor = 'white'
    }
  }
}

const placeShipY = (shipLen, pos) => {
  const [x, y] = [Number(pos.getAttribute('x')), Number(pos.getAttribute('y'))]
  const shipPositions = []
  const finalShipPositionY = (y + shipLen) - 1

  console.log(hoveredElems)

  if (finalShipPositionY <= 9) {
    console.log(x, y)

    for(let i = y; i <= finalShipPositionY; i++) {
      const elem = document.querySelectorAll(`[x="${x}"][y="${i}"]`)[0]
      hoveredElems.push(elem)
      elem.style.backgroundColor = 'white'
    }
  }
}

const finalizeShipPlacement = () => {
  if (validShipPlacement) {
    const shipLen = hoveredElems.length
    const ship = new Ship(shipLen)
    const shipPositions = []

    hoveredElems.forEach((elem) => {
      const x = Number(elem.getAttribute('x'))
      const y = Number(elem.getAttribute('y'))
      shipPositions.push([{x, y, hit: false}])
    })

    ship.setPositions(shipPositions)
    playerOne.getGameboard().placeShip(ship)

    console.log(ship)
    console.log(ship.getPositionsHit())
    hoveredElems = []
    currShipLengthIndex += 1
  }

  console.log(gameboardOne)
}

const displayGameboard = (player) => {
  const gameboards = document.querySelector('.gameboards')
  const gameboard = document.createElement('div')
  gameboard.classList.add('gameboard', player)
  
  for (let y = 0; y < 10; y++) {
    
    for(let x = 0; x < 10; x++) {
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

displayGameboard(playerOne.playerLabel)
displayGameboard(playerTwo.playerLabel)

const elem = document.querySelectorAll(`[x="1"]`)
console.log(elem)