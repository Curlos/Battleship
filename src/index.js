import { Ship } from './classes/Ship'
import { Player } from './classes/Player'
import validShipPlacement from './gameHelpers/validShipPlacement'
import validShipHover from './gameHelpers/validShipHover'
import { autoPlaceAllShips } from './gameHelpers/autoPlaceAllShips'
import { editBoardListeners } from './gameHelpers/editBoardListeners'

const playerOne = new Player('Carlos', 'playerOne')
const playerTwo = new Player('Anthony', 'playerTwo')
const axisOptions = ['X', 'Y']
const axis = 'Y'
const shipLengths = [5, 4, 3, 3, 2]
const autoPlaceButton = document.querySelector('.autoPlaceButton')
const startGameButton = document.querySelector('.startGameButton')
const totalShips = 5

let gameStarted = false
let currentPlayerTurn = playerOne
let currShipLengthIndex = 0
let hoveredElems = []
let hoveredPos = []


const clearHoverElemColors = () => {
  hoveredElems.forEach((elem) => {
    elem.classList.remove('placedPosition')
    elem.classList.add('notHit')
  })
  hoveredElems = []
  hoveredPos = []
}

const clearAllElemColors = (player) => {
  const allPos = document.querySelectorAll(`.${player.getPlayerLabel()} .position`)
  allPos.forEach((elem) => {
    elem.classList.add('notHit')
    elem.classList.remove('invalidShipPlacement', 'placedPosition')
  })
  hoveredElems = []
  hoveredPos = []
  currShipLengthIndex = 0
}



const clearGameboard = (player) => {
  player.getGameboard().clearGameboard()
  gameStarted = false
  clearAllElemColors(player)
}

const startGame = () => {

  if (playerOne.getGameboard().getPlacedShips().length < 5) {
    return
  }

  handleComputerPlacement()
  editBoardListeners(playerOne, playerTwo)

  const gameboards = document.querySelector('.gameboards')
  const gameboard = document.querySelector('.gameboard')
  const playerTwoGameboard = document.querySelector('.playerTwo')

  gameboards.classList.remove('centerGameboards')
  gameboard.classList.remove('placingShips')
  playerTwoGameboard.classList.remove('playerTwoGameNotStarted')

  console.log('All of playerOnes ships have been placed.')
  gameStarted = true

}

export const handleHoverPosition = (event) => {
  clearHoverElemColors()
  if(gameStarted === false) {
    const elem = event.target
    placeShip(elem, axis)
  }
}

export const placeShip = (elem, axis) => {

  if (gameStarted) {
    return
  }

  const shipLen = shipLengths[currShipLengthIndex]

  if (axis === 'X') {
    if (validShipHover(shipLen, elem, axis, currentPlayerTurn)) {
      elem.classList.remove('invalidShipPlacement')
      placeShipX(shipLen, elem, currentPlayerTurn, currShipLengthIndex)
    } else {
      elem.classList.add('invalidShipPlacement')
    }
  } else if (axis === 'Y') {
    if (validShipHover(shipLen, elem, axis, currentPlayerTurn)) {
      elem.classList.remove('invalidShipPlacement')
      placeShipY(shipLen, elem, currentPlayerTurn, currShipLengthIndex)
    } else {
      elem.classList.add('invalidShipPlacement')
    }
  }
}

const placeShipX = (shipLen, elem, currentPlayerTurn, currShipLengthIndex) => {
  const [x, y] = [Number(elem.getAttribute('x')), Number(elem.getAttribute('y'))]
  const finalShipPositionX = (x + shipLen) - 1

  if (finalShipPositionX <= 9) {

    for(let i = x; i <= finalShipPositionX; i++) {
      let playerNum = 0

      if (currentPlayerTurn.getPlayerLabel() === 'playerTwo') {
        playerNum = 1
      }

      const elem = document.querySelectorAll(`[x="${i}"][y="${y}"]`)[playerNum]
      hoveredElems.push(elem)
      elem.classList.add('placedPosition')
      elem.classList.add(currentPlayerTurn.getPlayerLabel())
      elem.setAttribute('ship-index', currShipLengthIndex)
      elem.setAttribute('position-index', i)
    }

  }
}

const placeShipY = (shipLen, pos, currentPlayerTurn, currShipLengthIndex) => {
  const [x, y] = [Number(pos.getAttribute('x')), Number(pos.getAttribute('y'))]
  const finalShipPositionY = (y + shipLen) - 1

  if (finalShipPositionY <= 9) {
    let playerNum = 0

    if (currentPlayerTurn.getPlayerLabel() === 'playerTwo') {
      playerNum = 1
    }

    for(let i = y; i <= finalShipPositionY; i++) {
      const elem = document.querySelectorAll(`[x="${x}"][y="${i}"]`)[playerNum]
      hoveredElems.push(elem)
      elem.classList.add('placedPosition')
      elem.classList.add(currentPlayerTurn.getPlayerLabel())
      elem.setAttribute('ship-index', currShipLengthIndex)
      elem.setAttribute('position-index', i)
    }
  }
}

export const finalizeShipPlacement = () => {
  // loop
  console.log('placing ship')
  console.log(gameStarted)

  if (gameStarted) {
    return
  }
  const shipLen = hoveredElems.length
  const ship = new Ship(shipLen, axis)
  const shipPositions = []

  hoveredElems.forEach((elem) => {
    const x = Number(elem.getAttribute('x'))
    const y = Number(elem.getAttribute('y'))
    shipPositions.push([{x, y, hit: false}])
  })

  ship.setPositions(shipPositions)

  if (validShipPlacement(currentPlayerTurn, ship)) {
    
    currentPlayerTurn.getGameboard().placeShip(ship)

    hoveredElems = []
    currShipLengthIndex += 1
  }
}

const handleComputerPlacement = () => {
  currentPlayerTurn = playerTwo
  handleAutoPlace()
  currentPlayerTurn = playerOne
}

const handleAutoPlace = () => {
  clearGameboard(currentPlayerTurn)
  clearAllElemColors(currentPlayerTurn)
  autoPlaceAllShips(currentPlayerTurn, gameStarted, totalShips, axisOptions)
}


const displayGameboard = (player) => {
  const gameboards = document.querySelector('.gameboards')
  const gameboard = document.createElement('div')
  gameboard.classList.add('gameboard', player)

  if (player === 'playerOne') {
    gameboards.classList.add('centerGameboards')
    gameboard.classList.add('placingShips')
  } else if (player === 'playerTwo') {
    gameboard.classList.add('playerTwoGameNotStarted')
  }
  
  for (let y = 0; y < 10; y++) {
    
    for(let x = 0; x < 10; x++) {
      let positionElem = document.createElement('div')
      positionElem.setAttribute('x', x)
      positionElem.setAttribute('y', y)
      positionElem.classList.add('position')

      positionElem.addEventListener('click', finalizeShipPlacement)
      positionElem.addEventListener('mouseover', handleHoverPosition)
      
      gameboard.append(positionElem)
    }
  }

  gameboards.append(gameboard)
}

displayGameboard(playerOne.playerLabel)
displayGameboard(playerTwo.playerLabel)

autoPlaceButton.addEventListener('click', handleAutoPlace)
startGameButton.addEventListener('click', startGame)