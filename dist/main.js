/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/Gameboard.js":
/*!**********************************!*\
  !*** ./src/classes/Gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
class Gameboard {
  positions = [];
  placedShips = [];
  sunkenShips = [];

  clearGameboard() {
    this.positions = []
    this.placedShips = []
  }

  getPlacedShips() {
    return this.placedShips
  }

  placeShip(ship) {
    this.placedShips.push(ship)
  }

  receiveAttack(ship) {
    if (ship.isSunk()) {
      this.sunkenShips.push(ship)
    }
  }

  allShipsSunken() {
    console.log(this.sunkenShips)
    return this.placedShips.length === this.sunkenShips.length
  }
}

/***/ }),

/***/ "./src/classes/Player.js":
/*!*******************************!*\
  !*** ./src/classes/Player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/classes/Gameboard.js");

class Player {
  name;
  playerLabel;
  gameboard;
  won = false;

  constructor(name, playerLabel) {
    this.name = name;
    this.playerLabel = playerLabel
    this.gameboard = new _Gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard()
  }

  getName() {
    return this.name
  }

  getPlayerLabel() {
    return this.playerLabel
  }

  getGameboard() {
    return this.gameboard
  }

  setWin() {
    this.won = true
  }

  hasWon() {
    return this.won
  }
}

/***/ }),

/***/ "./src/classes/Ship.js":
/*!*****************************!*\
  !*** ./src/classes/Ship.js ***!
  \*****************************/
/***/ ((module) => {

class Ship {
  length;
  axis;
  positions = [];

  constructor(length, axis) {
    this.length = length
    this.axis = axis
  }

  getLength() {
    return this.length
  }

  getAxis() {
    return this.axis
  }

  getPositions() {
    return this.positions
  }

  getPositionsHit() {
    return this.positions.filter((position) => position.hit != true)
  }

  getFirstPosition() {
    return this.positions[0][0]
  }

  getLastPosition() {
    return this.positions[this.positions.length - 1][0]
  }

  setPositions(positions) {
    if(positions.length === this.length) {
      this.positions = positions
    } else {
      return 'Ship cannot fit!'
    }
  }

  hit(positionNum) {
    console.log(positionNum)
    console.log(this.positions)
    const position = this.positions.find(position => Number(position[0].x) === Number(positionNum[0]) && Number(position[0].y) === Number(positionNum[1]))

    console.log(position[0])
    position[0].hit = true
  }

  isSunk() {
    const positionsLeft = this.positions.filter((position) => position[0].hit === false)
    console.log(`Positions Left: ${positionsLeft}`)
    return positionsLeft.length === 0
  }
}

module.exports = {
  Ship,
}

/***/ }),

/***/ "./src/gameHelpers/attackPosition.js":
/*!*******************************************!*\
  !*** ./src/gameHelpers/attackPosition.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setPlayers": () => (/* binding */ setPlayers),
/* harmony export */   "handleAttackClick": () => (/* binding */ handleAttackClick),
/* harmony export */   "attackPosition": () => (/* binding */ attackPosition),
/* harmony export */   "sunkShip": () => (/* binding */ sunkShip)
/* harmony export */ });
let playerOne;
let playerTwo;

const setPlayers = (playerOneVar, playerTwoVar) => {
  playerOne = playerOneVar
  playerTwo = playerTwoVar
}

const handleAttackClick = (event) => {
  const elem = event.target
  const attackedPlayer = elem.classList.contains('playerTwo') ? playerTwo : playerOne
  attackPosition(elem, attackedPlayer)
}

const attackPosition = (elem, attackedPlayer) => {
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
      console.log(attackedPlayer.getGameboard())
      attackedPlayer.getGameboard().receiveAttack(ship)


      console.log(ship)
      
      if (ship.isSunk()) {
        sunkShip(attackedPlayer)
      }

      if (attackedPlayer.getGameboard().allShipsSunken()) {
        console.log('GAME OVER BOYS')
      }
    } else {
      elem.classList.remove('notHit')
      elem.classList.add('miss')
    }
  }

  elem.classList.add('invalidShipPlacement')

  console.log(x, y)
}

const sunkShip = (attackedPlayer) => {
  // reveal the ship position and picture of the silhouette
  // also add fade out the ship on the board

  console.log('SHIP HAS BEEN SUNK! MAYDAY! MAYDAY!')
  attackedPlayer.getGameboard().allShipsSunken()
}

/***/ }),

/***/ "./src/gameHelpers/autoPlaceAllShips.js":
/*!**********************************************!*\
  !*** ./src/gameHelpers/autoPlaceAllShips.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autoPlaceAllShips": () => (/* binding */ autoPlaceAllShips)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/index.js");




const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const autoPlaceAllShips = (player, gameStarted, totalShips, axisOptions) => {
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
    ;(0,_index__WEBPACK_IMPORTED_MODULE_0__.placeShip)(elem, axis)
    elem.click()

    i += 1

    numOfPlacedShips = Object.values(player.getGameboard().getPlacedShips()).length
  }

  console.log(gameboard)
}

/***/ }),

/***/ "./src/gameHelpers/createShipWithPos.js":
/*!**********************************************!*\
  !*** ./src/gameHelpers/createShipWithPos.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _classes_Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/Ship */ "./src/classes/Ship.js");
/* harmony import */ var _classes_Ship__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_classes_Ship__WEBPACK_IMPORTED_MODULE_0__);


const createShipWithPos = (positions, axis) => {
  const shipLen = positions.length
  const ship = new _classes_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(shipLen, axis)
  const shipPositions = []

  positions.forEach((position) => {
    const {x, y} = position
    shipPositions.push([{x, y, hit: false}])
  })

  ship.setPositions(shipPositions)

  return ship
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createShipWithPos);

/***/ }),

/***/ "./src/gameHelpers/editBoardListeners.js":
/*!***********************************************!*\
  !*** ./src/gameHelpers/editBoardListeners.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "editBoardListeners": () => (/* binding */ editBoardListeners)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/index.js");
/* harmony import */ var _attackPosition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attackPosition */ "./src/gameHelpers/attackPosition.js");



const editBoardListeners = (playerOne, playerTwo) => {
  (0,_attackPosition__WEBPACK_IMPORTED_MODULE_1__.setPlayers)(playerOne, playerTwo)
  editPlayerOneBoardListeners()
  editPlayerTwoBoardListeners()
  
}

const editPlayerOneBoardListeners = () => {
  const playerNum = 0
  
  for (let y = 0; y < 10; y++) {
    for(let x = 0; x < 10; x++) {
      const elem = document.querySelectorAll(`[x="${x}"][y="${y}"]`)[playerNum]

      elem.removeEventListener('click', _index__WEBPACK_IMPORTED_MODULE_0__.finalizeShipPlacement)
      elem.removeEventListener('mouseover', _index__WEBPACK_IMPORTED_MODULE_0__.handleHoverPosition)
      console.log(elem)
    }
  }
}

const editPlayerTwoBoardListeners = () => {
  const playerNum = 1
  
  for (let y = 0; y < 10; y++) {
    for(let x = 0; x < 10; x++) {
      const elem = document.querySelectorAll(`[x="${x}"][y="${y}"]`)[playerNum]

      elem.removeEventListener('click', _index__WEBPACK_IMPORTED_MODULE_0__.finalizeShipPlacement)
      elem.removeEventListener('mouseover', _index__WEBPACK_IMPORTED_MODULE_0__.handleHoverPosition)
      elem.addEventListener('click', _attackPosition__WEBPACK_IMPORTED_MODULE_1__.handleAttackClick)
      elem.classList.add('enemyPosition')
      console.log(elem)
    }
  }
}

/***/ }),

/***/ "./src/gameHelpers/validShipHover.js":
/*!*******************************************!*\
  !*** ./src/gameHelpers/validShipHover.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createShipWithPos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createShipWithPos */ "./src/gameHelpers/createShipWithPos.js");
/* harmony import */ var _validShipPlacement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validShipPlacement */ "./src/gameHelpers/validShipPlacement.js");



const validShipHover = (shipLen, elem, axis, currentPlayerTurn) => {
  const hoveredPos = axis === 'X' ? getHoveredPosX(elem, shipLen) : getHoveredPosY(elem, shipLen)
  const ship = (0,_createShipWithPos__WEBPACK_IMPORTED_MODULE_0__.default)(hoveredPos, axis)

  return (0,_validShipPlacement__WEBPACK_IMPORTED_MODULE_1__.default)(currentPlayerTurn, ship)
}

const getHoveredPosX = (elem, shipLen) => {
  const [x, y] = [Number(elem.getAttribute('x')), Number(elem.getAttribute('y'))]
  const finalShipPositionX = (x + shipLen) - 1
  const hoveredPos = []

  if (finalShipPositionX <= 9) {
    for(let i = x; i <= finalShipPositionX; i++) {
      hoveredPos.push({x: i, y})
    }
  }

  return hoveredPos
}

const getHoveredPosY = (elem, shipLen) => {
  const [x, y] = [Number(elem.getAttribute('x')), Number(elem.getAttribute('y'))]
  const finalShipPositionY = (y + shipLen) - 1
  const hoveredPos = []

  if (finalShipPositionY <= 9) {
    for(let i = y; i <= finalShipPositionY; i++) {
      hoveredPos.push({x, y: i})
    }
  }

  return hoveredPos
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validShipHover);

/***/ }),

/***/ "./src/gameHelpers/validShipPlacement.js":
/*!***********************************************!*\
  !*** ./src/gameHelpers/validShipPlacement.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const validShipPlacement = (currentPlayerTurn, ship) => {
  const placedShips = currentPlayerTurn.getGameboard().getPlacedShips()
  if (ship.getPositions().length === 0) {
    return false
  }

  if (ship.getAxis() === 'X') {
    
    for (let placedShip of placedShips) {
      if (validateShipWithX(ship, placedShip) === false) {
        return false
      }
    }
  } else if (ship.getAxis() === 'Y') {
    for (let placedShip of placedShips) {
      if (validateShipWithY(ship, placedShip) === false) {
        return false
      }
    }
  }

  return true
}

const validateShipWithX = (ship, placedShip) => {
  if (placedShip.getAxis() === ship.getAxis()) {
    const { x: shipStartPosX, y: shipStartPosY } = ship.getFirstPosition()
    const { x: shipEndPosX, y: shipEndPosY } = ship.getLastPosition()
    const { x: placedStartPosX, y: placedStartPosY } = placedShip.getFirstPosition()
    const { x: placedEndPosX, y: placedEndPosY } = placedShip.getLastPosition()
    
    if (shipStartPosY === placedStartPosY) {
      if (shipStartPosX >= placedStartPosX && shipStartPosX <= placedEndPosX) {
        return false
      }

      if (shipEndPosX >= placedStartPosX && shipEndPosX <= placedEndPosX) {
        return false
      }

      if (Math.abs(placedEndPosX - shipStartPosX) === 1) {
        return false
      }
    }

    if (Math.abs(shipStartPosY - placedStartPosY) === 1 || Math.abs(shipEndPosY - placedStartPosY) === 1) {
      return false
    }

  }

  return true
}

const validateShipWithY = (ship, placedShip) => {
  const { x: shipStartPosX, y: shipStartPosY } = ship.getFirstPosition()
  const { x: shipEndPosX, y: shipEndPosY } = ship.getLastPosition()
  const { x: placedStartPosX, y: placedStartPosY } = placedShip.getFirstPosition()
  const { x: placedEndPosX, y: placedEndPosY } = placedShip.getLastPosition()
  
  if (shipStartPosX === placedStartPosX) {
    
    if (shipStartPosY >= placedStartPosY && shipStartPosY <= placedEndPosY) {
      return false
    }
    if (shipStartPosY >= placedStartPosY && shipStartPosY <= placedEndPosY) {
      return false
    }
    if (shipEndPosY >= placedStartPosY && shipEndPosY <= placedEndPosY) {
      return false
    }

    if (Math.abs(placedEndPosY - shipStartPosY) === 1) {
      return false
    }

    if (Math.abs(placedStartPosY - shipEndPosY) === 1) {
      return false
    }
  }

  if (Math.abs(shipStartPosX - placedStartPosX) === 1 || Math.abs(shipEndPosX - placedStartPosX) === 1) {
    return false
  }

  return true
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validShipPlacement);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleHoverPosition": () => (/* binding */ handleHoverPosition),
/* harmony export */   "placeShip": () => (/* binding */ placeShip),
/* harmony export */   "finalizeShipPlacement": () => (/* binding */ finalizeShipPlacement)
/* harmony export */ });
/* harmony import */ var _classes_Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Ship */ "./src/classes/Ship.js");
/* harmony import */ var _classes_Ship__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_classes_Ship__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _classes_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Player */ "./src/classes/Player.js");
/* harmony import */ var _gameHelpers_validShipPlacement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameHelpers/validShipPlacement */ "./src/gameHelpers/validShipPlacement.js");
/* harmony import */ var _gameHelpers_validShipHover__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameHelpers/validShipHover */ "./src/gameHelpers/validShipHover.js");
/* harmony import */ var _gameHelpers_autoPlaceAllShips__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gameHelpers/autoPlaceAllShips */ "./src/gameHelpers/autoPlaceAllShips.js");
/* harmony import */ var _gameHelpers_editBoardListeners__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gameHelpers/editBoardListeners */ "./src/gameHelpers/editBoardListeners.js");







const playerOne = new _classes_Player__WEBPACK_IMPORTED_MODULE_1__.Player('Carlos', 'playerOne')
const playerTwo = new _classes_Player__WEBPACK_IMPORTED_MODULE_1__.Player('Anthony', 'playerTwo')
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
  ;(0,_gameHelpers_editBoardListeners__WEBPACK_IMPORTED_MODULE_5__.editBoardListeners)(playerOne, playerTwo)

  const gameboards = document.querySelector('.gameboards')
  const gameboard = document.querySelector('.gameboard')
  const playerTwoGameboard = document.querySelector('.playerTwo')

  gameboards.classList.remove('centerGameboards')
  gameboard.classList.remove('placingShips')
  playerTwoGameboard.classList.remove('playerTwoGameNotStarted')

  console.log('All of playerOnes ships have been placed.')
  gameStarted = true

}

const handleHoverPosition = (event) => {
  clearHoverElemColors()
  if(gameStarted === false) {
    const elem = event.target
    placeShip(elem, axis)
  }
}

const placeShip = (elem, axis) => {

  if (gameStarted) {
    return
  }

  const shipLen = shipLengths[currShipLengthIndex]

  if (axis === 'X') {
    if ((0,_gameHelpers_validShipHover__WEBPACK_IMPORTED_MODULE_3__.default)(shipLen, elem, axis, currentPlayerTurn)) {
      elem.classList.remove('invalidShipPlacement')
      placeShipX(shipLen, elem, currentPlayerTurn, currShipLengthIndex)
    } else {
      elem.classList.add('invalidShipPlacement')
    }
  } else if (axis === 'Y') {
    if ((0,_gameHelpers_validShipHover__WEBPACK_IMPORTED_MODULE_3__.default)(shipLen, elem, axis, currentPlayerTurn)) {
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

const finalizeShipPlacement = () => {
  // loop
  console.log('placing ship')
  console.log(gameStarted)

  if (gameStarted) {
    return
  }
  const shipLen = hoveredElems.length
  const ship = new _classes_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship(shipLen, axis)
  const shipPositions = []

  hoveredElems.forEach((elem) => {
    const x = Number(elem.getAttribute('x'))
    const y = Number(elem.getAttribute('y'))
    shipPositions.push([{x, y, hit: false}])
  })

  ship.setPositions(shipPositions)

  if ((0,_gameHelpers_validShipPlacement__WEBPACK_IMPORTED_MODULE_2__.default)(currentPlayerTurn, ship)) {
    
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
  ;(0,_gameHelpers_autoPlaceAllShips__WEBPACK_IMPORTED_MODULE_4__.autoPlaceAllShips)(currentPlayerTurn, gameStarted, totalShips, axisOptions)
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMxQjtBQUNBLG1CQUFtQixRQUFRO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7O1VDcE9BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jbGFzc2VzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NsYXNzZXMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY2xhc3Nlcy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUhlbHBlcnMvYXR0YWNrUG9zaXRpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lSGVscGVycy9hdXRvUGxhY2VBbGxTaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVIZWxwZXJzL2NyZWF0ZVNoaXBXaXRoUG9zLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUhlbHBlcnMvZWRpdEJvYXJkTGlzdGVuZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUhlbHBlcnMvdmFsaWRTaGlwSG92ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lSGVscGVycy92YWxpZFNoaXBQbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEdhbWVib2FyZCB7XG4gIHBvc2l0aW9ucyA9IFtdO1xuICBwbGFjZWRTaGlwcyA9IFtdO1xuICBzdW5rZW5TaGlwcyA9IFtdO1xuXG4gIGNsZWFyR2FtZWJvYXJkKCkge1xuICAgIHRoaXMucG9zaXRpb25zID0gW11cbiAgICB0aGlzLnBsYWNlZFNoaXBzID0gW11cbiAgfVxuXG4gIGdldFBsYWNlZFNoaXBzKCkge1xuICAgIHJldHVybiB0aGlzLnBsYWNlZFNoaXBzXG4gIH1cblxuICBwbGFjZVNoaXAoc2hpcCkge1xuICAgIHRoaXMucGxhY2VkU2hpcHMucHVzaChzaGlwKVxuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhzaGlwKSB7XG4gICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgIHRoaXMuc3Vua2VuU2hpcHMucHVzaChzaGlwKVxuICAgIH1cbiAgfVxuXG4gIGFsbFNoaXBzU3Vua2VuKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc3Vua2VuU2hpcHMpXG4gICAgcmV0dXJuIHRoaXMucGxhY2VkU2hpcHMubGVuZ3RoID09PSB0aGlzLnN1bmtlblNoaXBzLmxlbmd0aFxuICB9XG59IiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9HYW1lYm9hcmQnXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgbmFtZTtcbiAgcGxheWVyTGFiZWw7XG4gIGdhbWVib2FyZDtcbiAgd29uID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IobmFtZSwgcGxheWVyTGFiZWwpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucGxheWVyTGFiZWwgPSBwbGF5ZXJMYWJlbFxuICAgIHRoaXMuZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpXG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWVcbiAgfVxuXG4gIGdldFBsYXllckxhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLnBsYXllckxhYmVsXG4gIH1cblxuICBnZXRHYW1lYm9hcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZWJvYXJkXG4gIH1cblxuICBzZXRXaW4oKSB7XG4gICAgdGhpcy53b24gPSB0cnVlXG4gIH1cblxuICBoYXNXb24oKSB7XG4gICAgcmV0dXJuIHRoaXMud29uXG4gIH1cbn0iLCJjbGFzcyBTaGlwIHtcbiAgbGVuZ3RoO1xuICBheGlzO1xuICBwb3NpdGlvbnMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihsZW5ndGgsIGF4aXMpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aFxuICAgIHRoaXMuYXhpcyA9IGF4aXNcbiAgfVxuXG4gIGdldExlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGdldEF4aXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXhpc1xuICB9XG5cbiAgZ2V0UG9zaXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uc1xuICB9XG5cbiAgZ2V0UG9zaXRpb25zSGl0KCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9ucy5maWx0ZXIoKHBvc2l0aW9uKSA9PiBwb3NpdGlvbi5oaXQgIT0gdHJ1ZSlcbiAgfVxuXG4gIGdldEZpcnN0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25zWzBdWzBdXG4gIH1cblxuICBnZXRMYXN0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25zW3RoaXMucG9zaXRpb25zLmxlbmd0aCAtIDFdWzBdXG4gIH1cblxuICBzZXRQb3NpdGlvbnMocG9zaXRpb25zKSB7XG4gICAgaWYocG9zaXRpb25zLmxlbmd0aCA9PT0gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucG9zaXRpb25zID0gcG9zaXRpb25zXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnU2hpcCBjYW5ub3QgZml0ISdcbiAgICB9XG4gIH1cblxuICBoaXQocG9zaXRpb25OdW0pIHtcbiAgICBjb25zb2xlLmxvZyhwb3NpdGlvbk51bSlcbiAgICBjb25zb2xlLmxvZyh0aGlzLnBvc2l0aW9ucylcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb25zLmZpbmQocG9zaXRpb24gPT4gTnVtYmVyKHBvc2l0aW9uWzBdLngpID09PSBOdW1iZXIocG9zaXRpb25OdW1bMF0pICYmIE51bWJlcihwb3NpdGlvblswXS55KSA9PT0gTnVtYmVyKHBvc2l0aW9uTnVtWzFdKSlcblxuICAgIGNvbnNvbGUubG9nKHBvc2l0aW9uWzBdKVxuICAgIHBvc2l0aW9uWzBdLmhpdCA9IHRydWVcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBjb25zdCBwb3NpdGlvbnNMZWZ0ID0gdGhpcy5wb3NpdGlvbnMuZmlsdGVyKChwb3NpdGlvbikgPT4gcG9zaXRpb25bMF0uaGl0ID09PSBmYWxzZSlcbiAgICBjb25zb2xlLmxvZyhgUG9zaXRpb25zIExlZnQ6ICR7cG9zaXRpb25zTGVmdH1gKVxuICAgIHJldHVybiBwb3NpdGlvbnNMZWZ0Lmxlbmd0aCA9PT0gMFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTaGlwLFxufSIsImxldCBwbGF5ZXJPbmU7XG5sZXQgcGxheWVyVHdvO1xuXG5leHBvcnQgY29uc3Qgc2V0UGxheWVycyA9IChwbGF5ZXJPbmVWYXIsIHBsYXllclR3b1ZhcikgPT4ge1xuICBwbGF5ZXJPbmUgPSBwbGF5ZXJPbmVWYXJcbiAgcGxheWVyVHdvID0gcGxheWVyVHdvVmFyXG59XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVBdHRhY2tDbGljayA9IChldmVudCkgPT4ge1xuICBjb25zdCBlbGVtID0gZXZlbnQudGFyZ2V0XG4gIGNvbnN0IGF0dGFja2VkUGxheWVyID0gZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3BsYXllclR3bycpID8gcGxheWVyVHdvIDogcGxheWVyT25lXG4gIGF0dGFja1Bvc2l0aW9uKGVsZW0sIGF0dGFja2VkUGxheWVyKVxufVxuXG5leHBvcnQgY29uc3QgYXR0YWNrUG9zaXRpb24gPSAoZWxlbSwgYXR0YWNrZWRQbGF5ZXIpID0+IHtcbiAgY29uc3QgW3gsIHldID0gW051bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneCcpKSwgTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd5JykpXVxuXG4gIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucygnaGl0JykgPT09IGZhbHNlKSB7XG4gICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdub3RIaXQnKVxuICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnaGl0JylcblxuICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucygncGxhY2VkUG9zaXRpb24nKSkge1xuICAgICAgY29uc29sZS5sb2coJ0FUVEFDS0VEIEEgU0hJUCEhISEhJylcbiAgICAgIFxuICAgICAgY29uc3QgYXR0YWNrZWRQbGF5ZXJTaGlwcyA9IEFycmF5LmZyb20oT2JqZWN0LnZhbHVlcyhhdHRhY2tlZFBsYXllci5nZXRHYW1lYm9hcmQoKS5nZXRQbGFjZWRTaGlwcygpKSlcbiAgICAgIGNvbnN0IHNoaXBJbmRleCA9IE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgnc2hpcC1pbmRleCcpKVxuICAgICAgY29uc3QgeCA9IE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneCcpKVxuICAgICAgY29uc3QgeSA9IE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneScpKVxuICAgICAgY29uc29sZS5sb2coc2hpcEluZGV4KVxuICAgICAgY29uc3Qgc2hpcCA9IGF0dGFja2VkUGxheWVyU2hpcHNbc2hpcEluZGV4XVxuXG4gICAgICBzaGlwLmhpdChbeCwgeV0pXG4gICAgICBjb25zb2xlLmxvZyhhdHRhY2tlZFBsYXllci5nZXRHYW1lYm9hcmQoKSlcbiAgICAgIGF0dGFja2VkUGxheWVyLmdldEdhbWVib2FyZCgpLnJlY2VpdmVBdHRhY2soc2hpcClcblxuXG4gICAgICBjb25zb2xlLmxvZyhzaGlwKVxuICAgICAgXG4gICAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICBzdW5rU2hpcChhdHRhY2tlZFBsYXllcilcbiAgICAgIH1cblxuICAgICAgaWYgKGF0dGFja2VkUGxheWVyLmdldEdhbWVib2FyZCgpLmFsbFNoaXBzU3Vua2VuKCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0dBTUUgT1ZFUiBCT1lTJylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdub3RIaXQnKVxuICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdtaXNzJylcbiAgICB9XG4gIH1cblxuICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2ludmFsaWRTaGlwUGxhY2VtZW50JylcblxuICBjb25zb2xlLmxvZyh4LCB5KVxufVxuXG5leHBvcnQgY29uc3Qgc3Vua1NoaXAgPSAoYXR0YWNrZWRQbGF5ZXIpID0+IHtcbiAgLy8gcmV2ZWFsIHRoZSBzaGlwIHBvc2l0aW9uIGFuZCBwaWN0dXJlIG9mIHRoZSBzaWxob3VldHRlXG4gIC8vIGFsc28gYWRkIGZhZGUgb3V0IHRoZSBzaGlwIG9uIHRoZSBib2FyZFxuXG4gIGNvbnNvbGUubG9nKCdTSElQIEhBUyBCRUVOIFNVTkshIE1BWURBWSEgTUFZREFZIScpXG4gIGF0dGFja2VkUGxheWVyLmdldEdhbWVib2FyZCgpLmFsbFNoaXBzU3Vua2VuKClcbn0iLCJpbXBvcnQgeyBwbGFjZVNoaXAgfSBmcm9tICcuLi9pbmRleCdcblxuXG5cbmNvbnN0IGdldFJhbmRvbUludCA9IChtaW4sIG1heCkgPT4ge1xuICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbn1cblxuZXhwb3J0IGNvbnN0IGF1dG9QbGFjZUFsbFNoaXBzID0gKHBsYXllciwgZ2FtZVN0YXJ0ZWQsIHRvdGFsU2hpcHMsIGF4aXNPcHRpb25zKSA9PiB7XG4gIGlmIChnYW1lU3RhcnRlZCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7cGxheWVyLmdldFBsYXllckxhYmVsKCl9YClcblxuICBjb25zb2xlLmxvZygnaGVsbG8gcGxheWVyJylcblxuICBsZXQgbnVtT2ZQbGFjZWRTaGlwcyA9IE9iamVjdC52YWx1ZXMocGxheWVyLmdldEdhbWVib2FyZCgpLmdldFBsYWNlZFNoaXBzKCkpLmxlbmd0aFxuXG4gIGxldCBpID0gMDtcblxuICB3aGlsZSAoaSA8IDEwKSB7XG4gICAgY29uc3QgeCA9IGdldFJhbmRvbUludCgwLCA5KVxuICAgIGNvbnN0IHkgPSBnZXRSYW5kb21JbnQoMCwgOSlcbiAgICBjb25zdCBheGlzSW5kZXggPSBnZXRSYW5kb21JbnQoMCwxKVxuICAgIGNvbnN0IGF4aXMgPSBheGlzT3B0aW9uc1theGlzSW5kZXhdXG5cbiAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3g9XCIke3h9XCJdW3k9XCIke3l9XCJdYClbMF1cbiAgICBwbGFjZVNoaXAoZWxlbSwgYXhpcylcbiAgICBlbGVtLmNsaWNrKClcblxuICAgIGkgKz0gMVxuXG4gICAgbnVtT2ZQbGFjZWRTaGlwcyA9IE9iamVjdC52YWx1ZXMocGxheWVyLmdldEdhbWVib2FyZCgpLmdldFBsYWNlZFNoaXBzKCkpLmxlbmd0aFxuICB9XG5cbiAgY29uc29sZS5sb2coZ2FtZWJvYXJkKVxufSIsImltcG9ydCB7IFNoaXAgfSBmcm9tICcuLi9jbGFzc2VzL1NoaXAnXG5cbmNvbnN0IGNyZWF0ZVNoaXBXaXRoUG9zID0gKHBvc2l0aW9ucywgYXhpcykgPT4ge1xuICBjb25zdCBzaGlwTGVuID0gcG9zaXRpb25zLmxlbmd0aFxuICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbiwgYXhpcylcbiAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdXG5cbiAgcG9zaXRpb25zLmZvckVhY2goKHBvc2l0aW9uKSA9PiB7XG4gICAgY29uc3Qge3gsIHl9ID0gcG9zaXRpb25cbiAgICBzaGlwUG9zaXRpb25zLnB1c2goW3t4LCB5LCBoaXQ6IGZhbHNlfV0pXG4gIH0pXG5cbiAgc2hpcC5zZXRQb3NpdGlvbnMoc2hpcFBvc2l0aW9ucylcblxuICByZXR1cm4gc2hpcFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTaGlwV2l0aFBvcyIsImltcG9ydCB7IGZpbmFsaXplU2hpcFBsYWNlbWVudCwgaGFuZGxlSG92ZXJQb3NpdGlvbiB9IGZyb20gJy4uL2luZGV4J1xuaW1wb3J0IHsgc2V0UGxheWVycywgaGFuZGxlQXR0YWNrQ2xpY2ssIGF0dGFja1Bvc2l0aW9uIH0gZnJvbSAnLi9hdHRhY2tQb3NpdGlvbidcblxuZXhwb3J0IGNvbnN0IGVkaXRCb2FyZExpc3RlbmVycyA9IChwbGF5ZXJPbmUsIHBsYXllclR3bykgPT4ge1xuICBzZXRQbGF5ZXJzKHBsYXllck9uZSwgcGxheWVyVHdvKVxuICBlZGl0UGxheWVyT25lQm9hcmRMaXN0ZW5lcnMoKVxuICBlZGl0UGxheWVyVHdvQm9hcmRMaXN0ZW5lcnMoKVxuICBcbn1cblxuY29uc3QgZWRpdFBsYXllck9uZUJvYXJkTGlzdGVuZXJzID0gKCkgPT4ge1xuICBjb25zdCBwbGF5ZXJOdW0gPSAwXG4gIFxuICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcbiAgICBmb3IobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xuICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFt4PVwiJHt4fVwiXVt5PVwiJHt5fVwiXWApW3BsYXllck51bV1cblxuICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGZpbmFsaXplU2hpcFBsYWNlbWVudClcbiAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaGFuZGxlSG92ZXJQb3NpdGlvbilcbiAgICAgIGNvbnNvbGUubG9nKGVsZW0pXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGVkaXRQbGF5ZXJUd29Cb2FyZExpc3RlbmVycyA9ICgpID0+IHtcbiAgY29uc3QgcGxheWVyTnVtID0gMVxuICBcbiAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XG4gICAgZm9yKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcbiAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbeD1cIiR7eH1cIl1beT1cIiR7eX1cIl1gKVtwbGF5ZXJOdW1dXG5cbiAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmaW5hbGl6ZVNoaXBQbGFjZW1lbnQpXG4gICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGhhbmRsZUhvdmVyUG9zaXRpb24pXG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQXR0YWNrQ2xpY2spXG4gICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2VuZW15UG9zaXRpb24nKVxuICAgICAgY29uc29sZS5sb2coZWxlbSlcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgY3JlYXRlU2hpcFdpdGhQb3MgZnJvbSAnLi9jcmVhdGVTaGlwV2l0aFBvcydcbmltcG9ydCB2YWxpZFNoaXBQbGFjZW1lbnQgZnJvbSAnLi92YWxpZFNoaXBQbGFjZW1lbnQnXG5cbmNvbnN0IHZhbGlkU2hpcEhvdmVyID0gKHNoaXBMZW4sIGVsZW0sIGF4aXMsIGN1cnJlbnRQbGF5ZXJUdXJuKSA9PiB7XG4gIGNvbnN0IGhvdmVyZWRQb3MgPSBheGlzID09PSAnWCcgPyBnZXRIb3ZlcmVkUG9zWChlbGVtLCBzaGlwTGVuKSA6IGdldEhvdmVyZWRQb3NZKGVsZW0sIHNoaXBMZW4pXG4gIGNvbnN0IHNoaXAgPSBjcmVhdGVTaGlwV2l0aFBvcyhob3ZlcmVkUG9zLCBheGlzKVxuXG4gIHJldHVybiB2YWxpZFNoaXBQbGFjZW1lbnQoY3VycmVudFBsYXllclR1cm4sIHNoaXApXG59XG5cbmNvbnN0IGdldEhvdmVyZWRQb3NYID0gKGVsZW0sIHNoaXBMZW4pID0+IHtcbiAgY29uc3QgW3gsIHldID0gW051bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneCcpKSwgTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd5JykpXVxuICBjb25zdCBmaW5hbFNoaXBQb3NpdGlvblggPSAoeCArIHNoaXBMZW4pIC0gMVxuICBjb25zdCBob3ZlcmVkUG9zID0gW11cblxuICBpZiAoZmluYWxTaGlwUG9zaXRpb25YIDw9IDkpIHtcbiAgICBmb3IobGV0IGkgPSB4OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWDsgaSsrKSB7XG4gICAgICBob3ZlcmVkUG9zLnB1c2goe3g6IGksIHl9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBob3ZlcmVkUG9zXG59XG5cbmNvbnN0IGdldEhvdmVyZWRQb3NZID0gKGVsZW0sIHNoaXBMZW4pID0+IHtcbiAgY29uc3QgW3gsIHldID0gW051bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneCcpKSwgTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd5JykpXVxuICBjb25zdCBmaW5hbFNoaXBQb3NpdGlvblkgPSAoeSArIHNoaXBMZW4pIC0gMVxuICBjb25zdCBob3ZlcmVkUG9zID0gW11cblxuICBpZiAoZmluYWxTaGlwUG9zaXRpb25ZIDw9IDkpIHtcbiAgICBmb3IobGV0IGkgPSB5OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWTsgaSsrKSB7XG4gICAgICBob3ZlcmVkUG9zLnB1c2goe3gsIHk6IGl9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBob3ZlcmVkUG9zXG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkU2hpcEhvdmVyIiwiY29uc3QgdmFsaWRTaGlwUGxhY2VtZW50ID0gKGN1cnJlbnRQbGF5ZXJUdXJuLCBzaGlwKSA9PiB7XG4gIGNvbnN0IHBsYWNlZFNoaXBzID0gY3VycmVudFBsYXllclR1cm4uZ2V0R2FtZWJvYXJkKCkuZ2V0UGxhY2VkU2hpcHMoKVxuICBpZiAoc2hpcC5nZXRQb3NpdGlvbnMoKS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGlmIChzaGlwLmdldEF4aXMoKSA9PT0gJ1gnKSB7XG4gICAgXG4gICAgZm9yIChsZXQgcGxhY2VkU2hpcCBvZiBwbGFjZWRTaGlwcykge1xuICAgICAgaWYgKHZhbGlkYXRlU2hpcFdpdGhYKHNoaXAsIHBsYWNlZFNoaXApID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoc2hpcC5nZXRBeGlzKCkgPT09ICdZJykge1xuICAgIGZvciAobGV0IHBsYWNlZFNoaXAgb2YgcGxhY2VkU2hpcHMpIHtcbiAgICAgIGlmICh2YWxpZGF0ZVNoaXBXaXRoWShzaGlwLCBwbGFjZWRTaGlwKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3QgdmFsaWRhdGVTaGlwV2l0aFggPSAoc2hpcCwgcGxhY2VkU2hpcCkgPT4ge1xuICBpZiAocGxhY2VkU2hpcC5nZXRBeGlzKCkgPT09IHNoaXAuZ2V0QXhpcygpKSB7XG4gICAgY29uc3QgeyB4OiBzaGlwU3RhcnRQb3NYLCB5OiBzaGlwU3RhcnRQb3NZIH0gPSBzaGlwLmdldEZpcnN0UG9zaXRpb24oKVxuICAgIGNvbnN0IHsgeDogc2hpcEVuZFBvc1gsIHk6IHNoaXBFbmRQb3NZIH0gPSBzaGlwLmdldExhc3RQb3NpdGlvbigpXG4gICAgY29uc3QgeyB4OiBwbGFjZWRTdGFydFBvc1gsIHk6IHBsYWNlZFN0YXJ0UG9zWSB9ID0gcGxhY2VkU2hpcC5nZXRGaXJzdFBvc2l0aW9uKClcbiAgICBjb25zdCB7IHg6IHBsYWNlZEVuZFBvc1gsIHk6IHBsYWNlZEVuZFBvc1kgfSA9IHBsYWNlZFNoaXAuZ2V0TGFzdFBvc2l0aW9uKClcbiAgICBcbiAgICBpZiAoc2hpcFN0YXJ0UG9zWSA9PT0gcGxhY2VkU3RhcnRQb3NZKSB7XG4gICAgICBpZiAoc2hpcFN0YXJ0UG9zWCA+PSBwbGFjZWRTdGFydFBvc1ggJiYgc2hpcFN0YXJ0UG9zWCA8PSBwbGFjZWRFbmRQb3NYKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICBpZiAoc2hpcEVuZFBvc1ggPj0gcGxhY2VkU3RhcnRQb3NYICYmIHNoaXBFbmRQb3NYIDw9IHBsYWNlZEVuZFBvc1gpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGlmIChNYXRoLmFicyhwbGFjZWRFbmRQb3NYIC0gc2hpcFN0YXJ0UG9zWCkgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKE1hdGguYWJzKHNoaXBTdGFydFBvc1kgLSBwbGFjZWRTdGFydFBvc1kpID09PSAxIHx8IE1hdGguYWJzKHNoaXBFbmRQb3NZIC0gcGxhY2VkU3RhcnRQb3NZKSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCB2YWxpZGF0ZVNoaXBXaXRoWSA9IChzaGlwLCBwbGFjZWRTaGlwKSA9PiB7XG4gIGNvbnN0IHsgeDogc2hpcFN0YXJ0UG9zWCwgeTogc2hpcFN0YXJ0UG9zWSB9ID0gc2hpcC5nZXRGaXJzdFBvc2l0aW9uKClcbiAgY29uc3QgeyB4OiBzaGlwRW5kUG9zWCwgeTogc2hpcEVuZFBvc1kgfSA9IHNoaXAuZ2V0TGFzdFBvc2l0aW9uKClcbiAgY29uc3QgeyB4OiBwbGFjZWRTdGFydFBvc1gsIHk6IHBsYWNlZFN0YXJ0UG9zWSB9ID0gcGxhY2VkU2hpcC5nZXRGaXJzdFBvc2l0aW9uKClcbiAgY29uc3QgeyB4OiBwbGFjZWRFbmRQb3NYLCB5OiBwbGFjZWRFbmRQb3NZIH0gPSBwbGFjZWRTaGlwLmdldExhc3RQb3NpdGlvbigpXG4gIFxuICBpZiAoc2hpcFN0YXJ0UG9zWCA9PT0gcGxhY2VkU3RhcnRQb3NYKSB7XG4gICAgXG4gICAgaWYgKHNoaXBTdGFydFBvc1kgPj0gcGxhY2VkU3RhcnRQb3NZICYmIHNoaXBTdGFydFBvc1kgPD0gcGxhY2VkRW5kUG9zWSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmIChzaGlwU3RhcnRQb3NZID49IHBsYWNlZFN0YXJ0UG9zWSAmJiBzaGlwU3RhcnRQb3NZIDw9IHBsYWNlZEVuZFBvc1kpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAoc2hpcEVuZFBvc1kgPj0gcGxhY2VkU3RhcnRQb3NZICYmIHNoaXBFbmRQb3NZIDw9IHBsYWNlZEVuZFBvc1kpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmIChNYXRoLmFicyhwbGFjZWRFbmRQb3NZIC0gc2hpcFN0YXJ0UG9zWSkgPT09IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmIChNYXRoLmFicyhwbGFjZWRTdGFydFBvc1kgLSBzaGlwRW5kUG9zWSkgPT09IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGlmIChNYXRoLmFicyhzaGlwU3RhcnRQb3NYIC0gcGxhY2VkU3RhcnRQb3NYKSA9PT0gMSB8fCBNYXRoLmFicyhzaGlwRW5kUG9zWCAtIHBsYWNlZFN0YXJ0UG9zWCkgPT09IDEpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkU2hpcFBsYWNlbWVudCIsImltcG9ydCB7IFNoaXAgfSBmcm9tICcuL2NsYXNzZXMvU2hpcCdcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vY2xhc3Nlcy9QbGF5ZXInXG5pbXBvcnQgdmFsaWRTaGlwUGxhY2VtZW50IGZyb20gJy4vZ2FtZUhlbHBlcnMvdmFsaWRTaGlwUGxhY2VtZW50J1xuaW1wb3J0IHZhbGlkU2hpcEhvdmVyIGZyb20gJy4vZ2FtZUhlbHBlcnMvdmFsaWRTaGlwSG92ZXInXG5pbXBvcnQgeyBhdXRvUGxhY2VBbGxTaGlwcyB9IGZyb20gJy4vZ2FtZUhlbHBlcnMvYXV0b1BsYWNlQWxsU2hpcHMnXG5pbXBvcnQgeyBlZGl0Qm9hcmRMaXN0ZW5lcnMgfSBmcm9tICcuL2dhbWVIZWxwZXJzL2VkaXRCb2FyZExpc3RlbmVycydcblxuY29uc3QgcGxheWVyT25lID0gbmV3IFBsYXllcignQ2FybG9zJywgJ3BsYXllck9uZScpXG5jb25zdCBwbGF5ZXJUd28gPSBuZXcgUGxheWVyKCdBbnRob255JywgJ3BsYXllclR3bycpXG5jb25zdCBheGlzT3B0aW9ucyA9IFsnWCcsICdZJ11cbmNvbnN0IGF4aXMgPSAnWSdcbmNvbnN0IHNoaXBMZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdXG5jb25zdCBhdXRvUGxhY2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0b1BsYWNlQnV0dG9uJylcbmNvbnN0IHN0YXJ0R2FtZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydEdhbWVCdXR0b24nKVxuY29uc3QgdG90YWxTaGlwcyA9IDVcblxubGV0IGdhbWVTdGFydGVkID0gZmFsc2VcbmxldCBjdXJyZW50UGxheWVyVHVybiA9IHBsYXllck9uZVxubGV0IGN1cnJTaGlwTGVuZ3RoSW5kZXggPSAwXG5sZXQgaG92ZXJlZEVsZW1zID0gW11cbmxldCBob3ZlcmVkUG9zID0gW11cblxuXG5jb25zdCBjbGVhckhvdmVyRWxlbUNvbG9ycyA9ICgpID0+IHtcbiAgaG92ZXJlZEVsZW1zLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYWNlZFBvc2l0aW9uJylcbiAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ25vdEhpdCcpXG4gIH0pXG4gIGhvdmVyZWRFbGVtcyA9IFtdXG4gIGhvdmVyZWRQb3MgPSBbXVxufVxuXG5jb25zdCBjbGVhckFsbEVsZW1Db2xvcnMgPSAocGxheWVyKSA9PiB7XG4gIGNvbnN0IGFsbFBvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3BsYXllci5nZXRQbGF5ZXJMYWJlbCgpfSAucG9zaXRpb25gKVxuICBhbGxQb3MuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnbm90SGl0JylcbiAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWRTaGlwUGxhY2VtZW50JywgJ3BsYWNlZFBvc2l0aW9uJylcbiAgfSlcbiAgaG92ZXJlZEVsZW1zID0gW11cbiAgaG92ZXJlZFBvcyA9IFtdXG4gIGN1cnJTaGlwTGVuZ3RoSW5kZXggPSAwXG59XG5cblxuXG5jb25zdCBjbGVhckdhbWVib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgcGxheWVyLmdldEdhbWVib2FyZCgpLmNsZWFyR2FtZWJvYXJkKClcbiAgZ2FtZVN0YXJ0ZWQgPSBmYWxzZVxuICBjbGVhckFsbEVsZW1Db2xvcnMocGxheWVyKVxufVxuXG5jb25zdCBzdGFydEdhbWUgPSAoKSA9PiB7XG5cbiAgaWYgKHBsYXllck9uZS5nZXRHYW1lYm9hcmQoKS5nZXRQbGFjZWRTaGlwcygpLmxlbmd0aCA8IDUpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGhhbmRsZUNvbXB1dGVyUGxhY2VtZW50KClcbiAgZWRpdEJvYXJkTGlzdGVuZXJzKHBsYXllck9uZSwgcGxheWVyVHdvKVxuXG4gIGNvbnN0IGdhbWVib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkcycpXG4gIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQnKVxuICBjb25zdCBwbGF5ZXJUd29HYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyVHdvJylcblxuICBnYW1lYm9hcmRzLmNsYXNzTGlzdC5yZW1vdmUoJ2NlbnRlckdhbWVib2FyZHMnKVxuICBnYW1lYm9hcmQuY2xhc3NMaXN0LnJlbW92ZSgncGxhY2luZ1NoaXBzJylcbiAgcGxheWVyVHdvR2FtZWJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXllclR3b0dhbWVOb3RTdGFydGVkJylcblxuICBjb25zb2xlLmxvZygnQWxsIG9mIHBsYXllck9uZXMgc2hpcHMgaGF2ZSBiZWVuIHBsYWNlZC4nKVxuICBnYW1lU3RhcnRlZCA9IHRydWVcblxufVxuXG5leHBvcnQgY29uc3QgaGFuZGxlSG92ZXJQb3NpdGlvbiA9IChldmVudCkgPT4ge1xuICBjbGVhckhvdmVyRWxlbUNvbG9ycygpXG4gIGlmKGdhbWVTdGFydGVkID09PSBmYWxzZSkge1xuICAgIGNvbnN0IGVsZW0gPSBldmVudC50YXJnZXRcbiAgICBwbGFjZVNoaXAoZWxlbSwgYXhpcylcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcGxhY2VTaGlwID0gKGVsZW0sIGF4aXMpID0+IHtcblxuICBpZiAoZ2FtZVN0YXJ0ZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IHNoaXBMZW4gPSBzaGlwTGVuZ3Roc1tjdXJyU2hpcExlbmd0aEluZGV4XVxuXG4gIGlmIChheGlzID09PSAnWCcpIHtcbiAgICBpZiAodmFsaWRTaGlwSG92ZXIoc2hpcExlbiwgZWxlbSwgYXhpcywgY3VycmVudFBsYXllclR1cm4pKSB7XG4gICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWRTaGlwUGxhY2VtZW50JylcbiAgICAgIHBsYWNlU2hpcFgoc2hpcExlbiwgZWxlbSwgY3VycmVudFBsYXllclR1cm4sIGN1cnJTaGlwTGVuZ3RoSW5kZXgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnaW52YWxpZFNoaXBQbGFjZW1lbnQnKVxuICAgIH1cbiAgfSBlbHNlIGlmIChheGlzID09PSAnWScpIHtcbiAgICBpZiAodmFsaWRTaGlwSG92ZXIoc2hpcExlbiwgZWxlbSwgYXhpcywgY3VycmVudFBsYXllclR1cm4pKSB7XG4gICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWRTaGlwUGxhY2VtZW50JylcbiAgICAgIHBsYWNlU2hpcFkoc2hpcExlbiwgZWxlbSwgY3VycmVudFBsYXllclR1cm4sIGN1cnJTaGlwTGVuZ3RoSW5kZXgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnaW52YWxpZFNoaXBQbGFjZW1lbnQnKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBwbGFjZVNoaXBYID0gKHNoaXBMZW4sIGVsZW0sIGN1cnJlbnRQbGF5ZXJUdXJuLCBjdXJyU2hpcExlbmd0aEluZGV4KSA9PiB7XG4gIGNvbnN0IFt4LCB5XSA9IFtOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3gnKSksIE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneScpKV1cbiAgY29uc3QgZmluYWxTaGlwUG9zaXRpb25YID0gKHggKyBzaGlwTGVuKSAtIDFcblxuICBpZiAoZmluYWxTaGlwUG9zaXRpb25YIDw9IDkpIHtcblxuICAgIGZvcihsZXQgaSA9IHg7IGkgPD0gZmluYWxTaGlwUG9zaXRpb25YOyBpKyspIHtcbiAgICAgIGxldCBwbGF5ZXJOdW0gPSAwXG5cbiAgICAgIGlmIChjdXJyZW50UGxheWVyVHVybi5nZXRQbGF5ZXJMYWJlbCgpID09PSAncGxheWVyVHdvJykge1xuICAgICAgICBwbGF5ZXJOdW0gPSAxXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbeD1cIiR7aX1cIl1beT1cIiR7eX1cIl1gKVtwbGF5ZXJOdW1dXG4gICAgICBob3ZlcmVkRWxlbXMucHVzaChlbGVtKVxuICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdwbGFjZWRQb3NpdGlvbicpXG4gICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoY3VycmVudFBsYXllclR1cm4uZ2V0UGxheWVyTGFiZWwoKSlcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzaGlwLWluZGV4JywgY3VyclNoaXBMZW5ndGhJbmRleClcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdwb3NpdGlvbi1pbmRleCcsIGkpXG4gICAgfVxuXG4gIH1cbn1cblxuY29uc3QgcGxhY2VTaGlwWSA9IChzaGlwTGVuLCBwb3MsIGN1cnJlbnRQbGF5ZXJUdXJuLCBjdXJyU2hpcExlbmd0aEluZGV4KSA9PiB7XG4gIGNvbnN0IFt4LCB5XSA9IFtOdW1iZXIocG9zLmdldEF0dHJpYnV0ZSgneCcpKSwgTnVtYmVyKHBvcy5nZXRBdHRyaWJ1dGUoJ3knKSldXG4gIGNvbnN0IGZpbmFsU2hpcFBvc2l0aW9uWSA9ICh5ICsgc2hpcExlbikgLSAxXG5cbiAgaWYgKGZpbmFsU2hpcFBvc2l0aW9uWSA8PSA5KSB7XG4gICAgbGV0IHBsYXllck51bSA9IDBcblxuICAgIGlmIChjdXJyZW50UGxheWVyVHVybi5nZXRQbGF5ZXJMYWJlbCgpID09PSAncGxheWVyVHdvJykge1xuICAgICAgcGxheWVyTnVtID0gMVxuICAgIH1cblxuICAgIGZvcihsZXQgaSA9IHk7IGkgPD0gZmluYWxTaGlwUG9zaXRpb25ZOyBpKyspIHtcbiAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbeD1cIiR7eH1cIl1beT1cIiR7aX1cIl1gKVtwbGF5ZXJOdW1dXG4gICAgICBob3ZlcmVkRWxlbXMucHVzaChlbGVtKVxuICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdwbGFjZWRQb3NpdGlvbicpXG4gICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoY3VycmVudFBsYXllclR1cm4uZ2V0UGxheWVyTGFiZWwoKSlcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzaGlwLWluZGV4JywgY3VyclNoaXBMZW5ndGhJbmRleClcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdwb3NpdGlvbi1pbmRleCcsIGkpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBmaW5hbGl6ZVNoaXBQbGFjZW1lbnQgPSAoKSA9PiB7XG4gIC8vIGxvb3BcbiAgY29uc29sZS5sb2coJ3BsYWNpbmcgc2hpcCcpXG4gIGNvbnNvbGUubG9nKGdhbWVTdGFydGVkKVxuXG4gIGlmIChnYW1lU3RhcnRlZCkge1xuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IHNoaXBMZW4gPSBob3ZlcmVkRWxlbXMubGVuZ3RoXG4gIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChzaGlwTGVuLCBheGlzKVxuICBjb25zdCBzaGlwUG9zaXRpb25zID0gW11cblxuICBob3ZlcmVkRWxlbXMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgIGNvbnN0IHggPSBOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3gnKSlcbiAgICBjb25zdCB5ID0gTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd5JykpXG4gICAgc2hpcFBvc2l0aW9ucy5wdXNoKFt7eCwgeSwgaGl0OiBmYWxzZX1dKVxuICB9KVxuXG4gIHNoaXAuc2V0UG9zaXRpb25zKHNoaXBQb3NpdGlvbnMpXG5cbiAgaWYgKHZhbGlkU2hpcFBsYWNlbWVudChjdXJyZW50UGxheWVyVHVybiwgc2hpcCkpIHtcbiAgICBcbiAgICBjdXJyZW50UGxheWVyVHVybi5nZXRHYW1lYm9hcmQoKS5wbGFjZVNoaXAoc2hpcClcblxuICAgIGhvdmVyZWRFbGVtcyA9IFtdXG4gICAgY3VyclNoaXBMZW5ndGhJbmRleCArPSAxXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlQ29tcHV0ZXJQbGFjZW1lbnQgPSAoKSA9PiB7XG4gIGN1cnJlbnRQbGF5ZXJUdXJuID0gcGxheWVyVHdvXG4gIGhhbmRsZUF1dG9QbGFjZSgpXG4gIGN1cnJlbnRQbGF5ZXJUdXJuID0gcGxheWVyT25lXG59XG5cbmNvbnN0IGhhbmRsZUF1dG9QbGFjZSA9ICgpID0+IHtcbiAgY2xlYXJHYW1lYm9hcmQoY3VycmVudFBsYXllclR1cm4pXG4gIGNsZWFyQWxsRWxlbUNvbG9ycyhjdXJyZW50UGxheWVyVHVybilcbiAgYXV0b1BsYWNlQWxsU2hpcHMoY3VycmVudFBsYXllclR1cm4sIGdhbWVTdGFydGVkLCB0b3RhbFNoaXBzLCBheGlzT3B0aW9ucylcbn1cblxuXG5jb25zdCBkaXNwbGF5R2FtZWJvYXJkID0gKHBsYXllcikgPT4ge1xuICBjb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZHMnKVxuICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkJywgcGxheWVyKVxuXG4gIGlmIChwbGF5ZXIgPT09ICdwbGF5ZXJPbmUnKSB7XG4gICAgZ2FtZWJvYXJkcy5jbGFzc0xpc3QuYWRkKCdjZW50ZXJHYW1lYm9hcmRzJylcbiAgICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgncGxhY2luZ1NoaXBzJylcbiAgfSBlbHNlIGlmIChwbGF5ZXIgPT09ICdwbGF5ZXJUd28nKSB7XG4gICAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoJ3BsYXllclR3b0dhbWVOb3RTdGFydGVkJylcbiAgfVxuICBcbiAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XG4gICAgXG4gICAgZm9yKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcbiAgICAgIGxldCBwb3NpdGlvbkVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgcG9zaXRpb25FbGVtLnNldEF0dHJpYnV0ZSgneCcsIHgpXG4gICAgICBwb3NpdGlvbkVsZW0uc2V0QXR0cmlidXRlKCd5JywgeSlcbiAgICAgIHBvc2l0aW9uRWxlbS5jbGFzc0xpc3QuYWRkKCdwb3NpdGlvbicpXG5cbiAgICAgIHBvc2l0aW9uRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZpbmFsaXplU2hpcFBsYWNlbWVudClcbiAgICAgIHBvc2l0aW9uRWxlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBoYW5kbGVIb3ZlclBvc2l0aW9uKVxuICAgICAgXG4gICAgICBnYW1lYm9hcmQuYXBwZW5kKHBvc2l0aW9uRWxlbSlcbiAgICB9XG4gIH1cblxuICBnYW1lYm9hcmRzLmFwcGVuZChnYW1lYm9hcmQpXG59XG5cbmRpc3BsYXlHYW1lYm9hcmQocGxheWVyT25lLnBsYXllckxhYmVsKVxuZGlzcGxheUdhbWVib2FyZChwbGF5ZXJUd28ucGxheWVyTGFiZWwpXG5cbmF1dG9QbGFjZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUF1dG9QbGFjZSlcbnN0YXJ0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0R2FtZSkiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=