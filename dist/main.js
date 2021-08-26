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

  receiveAttack(coords) {

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
    this.positionsHit = []
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
    const positionsLeft = this.positions.filter((position) => position.hit != true)
    return positionsLeft === 0
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
/* harmony export */   "attackPosition": () => (/* binding */ attackPosition)
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

const autoPlaceAllShips = (player, gameStarted, totalShips, axis) => {
  if (gameStarted) {
    return
  }

  const gameboard = document.querySelector(`.${player.getPlayerLabel()}`)

  console.log('hello player')

  let numOfPlacedShips = Object.values(player.getGameboard().getPlacedShips()).length

  while (numOfPlacedShips < totalShips) {
    const x = getRandomInt(0, 9)
    const y = getRandomInt(0, 9)

    const elem = document.querySelectorAll(`[x="${x}"][y="${y}"]`)[0]
    ;(0,_index__WEBPACK_IMPORTED_MODULE_0__.placeShip)(elem, axis)
    elem.click()

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
const axis = 'X'
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
      console.log('CHANGNG CURSOR')
      console.log(elem)
      elem.classList.add('invalidShipPlacement')
    }
  } else if (axis === 'Y') {
    if ((0,_gameHelpers_validShipHover__WEBPACK_IMPORTED_MODULE_3__.default)(shipLen, elem, axis, currentPlayerTurn)) {
      placeShipY(shipLen, elem, currentPlayerTurn, currShipLengthIndex)
    }
  }
}

const placeShipX = (shipLen, elem, currentPlayerTurn, currShipLengthIndex) => {
  const [x, y] = [Number(elem.getAttribute('x')), Number(elem.getAttribute('y'))]
  const finalShipPositionX = (x + shipLen) - 1

  console.log(elem)

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

      console.log('hello wrold')
      console.log(document.querySelectorAll(`[x="${i}"][y="${y}"]`))
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
      elem.setAttribute('shipIndex', currShipLengthIndex)
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

  console.log(currentPlayerTurn.getGameboard().getPlacedShips())
}

const handleComputerPlacement = () => {
  currentPlayerTurn = playerTwo
  handleAutoPlace()
  currentPlayerTurn = playerOne
}

const handleAutoPlace = () => {
  clearGameboard(currentPlayerTurn)
  clearAllElemColors(currentPlayerTurn)
  ;(0,_gameHelpers_autoPlaceAllShips__WEBPACK_IMPORTED_MODULE_4__.autoPlaceAllShips)(currentPlayerTurn, gameStarted, totalShips, axis)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQnVDO0FBQ2hDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGlEQUFTO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNURBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RG9DOztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBLCtDQUErQyx3QkFBd0I7O0FBRXZFOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrREFBa0QsRUFBRSxRQUFRLEVBQUU7QUFDOUQsSUFBSSxrREFBUztBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQnNDOztBQUV0QztBQUNBO0FBQ0EsbUJBQW1CLCtDQUFJO0FBQ3ZCOztBQUVBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLHlCQUF5QixpQkFBaUI7QUFDMUMsR0FBRzs7QUFFSDs7QUFFQTtBQUNBOztBQUVBLGlFQUFlOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCc0Q7QUFDVzs7QUFFekU7QUFDUCxFQUFFLDJEQUFVO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUIsbUJBQW1CLFFBQVE7QUFDM0Isb0RBQW9ELEVBQUUsUUFBUSxFQUFFOztBQUVoRSx3Q0FBd0MseURBQXFCO0FBQzdELDRDQUE0Qyx1REFBbUI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUIsbUJBQW1CLFFBQVE7QUFDM0Isb0RBQW9ELEVBQUUsUUFBUSxFQUFFOztBQUVoRSx3Q0FBd0MseURBQXFCO0FBQzdELDRDQUE0Qyx1REFBbUI7QUFDL0QscUNBQXFDLDhEQUFpQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDbUQ7QUFDRTs7QUFFckQ7QUFDQTtBQUNBLGVBQWUsMkRBQWlCOztBQUVoQyxTQUFTLDREQUFrQjtBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQix5QkFBeUI7QUFDNUMsdUJBQXVCLFFBQVE7QUFDL0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLHlCQUF5QjtBQUM1Qyx1QkFBdUIsUUFBUTtBQUMvQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQ3RDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLHFDQUFxQztBQUNqRCxZQUFZLGlDQUFpQztBQUM3QyxZQUFZLHlDQUF5QztBQUNyRCxZQUFZLHFDQUFxQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFVBQVUscUNBQXFDO0FBQy9DLFVBQVUsaUNBQWlDO0FBQzNDLFVBQVUseUNBQXlDO0FBQ25ELFVBQVUscUNBQXFDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25Fc0I7QUFDSTtBQUN3QjtBQUNSO0FBQ1U7QUFDRTs7QUFFckUsc0JBQXNCLG1EQUFNO0FBQzVCLHNCQUFzQixtREFBTTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLHlCQUF5QjtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUUsb0ZBQWtCOztBQUVwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87O0FBRVA7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsUUFBUSxvRUFBYztBQUN0QjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVEsb0VBQWM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLG1CQUFtQix5QkFBeUI7QUFDNUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9EQUFvRCxFQUFFLFFBQVEsRUFBRTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbURBQW1ELEVBQUUsUUFBUSxFQUFFO0FBQy9EOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQix5QkFBeUI7QUFDNUMsb0RBQW9ELEVBQUUsUUFBUSxFQUFFO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLCtDQUFJO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixpQkFBaUI7QUFDMUMsR0FBRzs7QUFFSDs7QUFFQSxNQUFNLHdFQUFrQjtBQUN4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRSxrRkFBaUI7QUFDbkI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBLG1CQUFtQixRQUFRO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7O1VDek9BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jbGFzc2VzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NsYXNzZXMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY2xhc3Nlcy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUhlbHBlcnMvYXR0YWNrUG9zaXRpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lSGVscGVycy9hdXRvUGxhY2VBbGxTaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVIZWxwZXJzL2NyZWF0ZVNoaXBXaXRoUG9zLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUhlbHBlcnMvZWRpdEJvYXJkTGlzdGVuZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUhlbHBlcnMvdmFsaWRTaGlwSG92ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lSGVscGVycy92YWxpZFNoaXBQbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEdhbWVib2FyZCB7XG4gIHBvc2l0aW9ucyA9IFtdO1xuICBwbGFjZWRTaGlwcyA9IFtdO1xuXG4gIGNsZWFyR2FtZWJvYXJkKCkge1xuICAgIHRoaXMucG9zaXRpb25zID0gW11cbiAgICB0aGlzLnBsYWNlZFNoaXBzID0gW11cbiAgfVxuXG4gIGdldFBsYWNlZFNoaXBzKCkge1xuICAgIHJldHVybiB0aGlzLnBsYWNlZFNoaXBzXG4gIH1cblxuICBwbGFjZVNoaXAoc2hpcCkge1xuICAgIHRoaXMucGxhY2VkU2hpcHMucHVzaChzaGlwKVxuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZHMpIHtcblxuICB9XG59IiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9HYW1lYm9hcmQnXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgbmFtZTtcbiAgcGxheWVyTGFiZWw7XG4gIGdhbWVib2FyZDtcbiAgd29uID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IobmFtZSwgcGxheWVyTGFiZWwpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucGxheWVyTGFiZWwgPSBwbGF5ZXJMYWJlbFxuICAgIHRoaXMuZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpXG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWVcbiAgfVxuXG4gIGdldFBsYXllckxhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLnBsYXllckxhYmVsXG4gIH1cblxuICBnZXRHYW1lYm9hcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZWJvYXJkXG4gIH1cblxuICBoYXNXb24oKSB7XG4gICAgcmV0dXJuIHRoaXMud29uXG4gIH1cbn0iLCJjbGFzcyBTaGlwIHtcbiAgbGVuZ3RoO1xuICBheGlzO1xuICBwb3NpdGlvbnMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihsZW5ndGgsIGF4aXMpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aFxuICAgIHRoaXMuYXhpcyA9IGF4aXNcbiAgICB0aGlzLnBvc2l0aW9uc0hpdCA9IFtdXG4gIH1cblxuICBnZXRMZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoXG4gIH1cblxuICBnZXRBeGlzKCkge1xuICAgIHJldHVybiB0aGlzLmF4aXNcbiAgfVxuXG4gIGdldFBvc2l0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbnNcbiAgfVxuXG4gIGdldFBvc2l0aW9uc0hpdCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbnMuZmlsdGVyKChwb3NpdGlvbikgPT4gcG9zaXRpb24uaGl0ICE9IHRydWUpXG4gIH1cblxuICBnZXRGaXJzdFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uc1swXVswXVxuICB9XG5cbiAgZ2V0TGFzdFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uc1t0aGlzLnBvc2l0aW9ucy5sZW5ndGggLSAxXVswXVxuICB9XG5cbiAgc2V0UG9zaXRpb25zKHBvc2l0aW9ucykge1xuICAgIGlmKHBvc2l0aW9ucy5sZW5ndGggPT09IHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnBvc2l0aW9ucyA9IHBvc2l0aW9uc1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ1NoaXAgY2Fubm90IGZpdCEnXG4gICAgfVxuICB9XG5cbiAgaGl0KHBvc2l0aW9uTnVtKSB7XG4gICAgY29uc29sZS5sb2cocG9zaXRpb25OdW0pXG4gICAgY29uc29sZS5sb2codGhpcy5wb3NpdGlvbnMpXG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9ucy5maW5kKHBvc2l0aW9uID0+IE51bWJlcihwb3NpdGlvblswXS54KSA9PT0gTnVtYmVyKHBvc2l0aW9uTnVtWzBdKSAmJiBOdW1iZXIocG9zaXRpb25bMF0ueSkgPT09IE51bWJlcihwb3NpdGlvbk51bVsxXSkpXG5cbiAgICBjb25zb2xlLmxvZyhwb3NpdGlvblswXSlcbiAgICBwb3NpdGlvblswXS5oaXQgPSB0cnVlXG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgY29uc3QgcG9zaXRpb25zTGVmdCA9IHRoaXMucG9zaXRpb25zLmZpbHRlcigocG9zaXRpb24pID0+IHBvc2l0aW9uLmhpdCAhPSB0cnVlKVxuICAgIHJldHVybiBwb3NpdGlvbnNMZWZ0ID09PSAwXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNoaXAsXG59IiwibGV0IHBsYXllck9uZTtcbmxldCBwbGF5ZXJUd287XG5cbmV4cG9ydCBjb25zdCBzZXRQbGF5ZXJzID0gKHBsYXllck9uZVZhciwgcGxheWVyVHdvVmFyKSA9PiB7XG4gIHBsYXllck9uZSA9IHBsYXllck9uZVZhclxuICBwbGF5ZXJUd28gPSBwbGF5ZXJUd29WYXJcbn1cblxuZXhwb3J0IGNvbnN0IGhhbmRsZUF0dGFja0NsaWNrID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IGVsZW0gPSBldmVudC50YXJnZXRcbiAgY29uc3QgYXR0YWNrZWRQbGF5ZXIgPSBlbGVtLmNsYXNzTGlzdC5jb250YWlucygncGxheWVyVHdvJykgPyBwbGF5ZXJUd28gOiBwbGF5ZXJPbmVcbiAgYXR0YWNrUG9zaXRpb24oZWxlbSwgYXR0YWNrZWRQbGF5ZXIpXG59XG5cbmV4cG9ydCBjb25zdCBhdHRhY2tQb3NpdGlvbiA9IChlbGVtLCBhdHRhY2tlZFBsYXllcikgPT4ge1xuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3knKSldXG5cbiAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSA9PT0gZmFsc2UpIHtcbiAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ25vdEhpdCcpXG4gICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdoaXQnKVxuXG4gICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdwbGFjZWRQb3NpdGlvbicpKSB7XG4gICAgICBjb25zb2xlLmxvZygnQVRUQUNLRUQgQSBTSElQISEhISEnKVxuICAgICAgXG4gICAgICBjb25zdCBhdHRhY2tlZFBsYXllclNoaXBzID0gQXJyYXkuZnJvbShPYmplY3QudmFsdWVzKGF0dGFja2VkUGxheWVyLmdldEdhbWVib2FyZCgpLmdldFBsYWNlZFNoaXBzKCkpKVxuICAgICAgY29uc3Qgc2hpcEluZGV4ID0gTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCdzaGlwLWluZGV4JykpXG4gICAgICBjb25zdCB4ID0gTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpXG4gICAgICBjb25zdCB5ID0gTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd5JykpXG4gICAgICBjb25zb2xlLmxvZyhzaGlwSW5kZXgpXG4gICAgICBjb25zdCBzaGlwID0gYXR0YWNrZWRQbGF5ZXJTaGlwc1tzaGlwSW5kZXhdXG5cbiAgICAgIHNoaXAuaGl0KFt4LCB5XSlcblxuXG4gICAgICBjb25zb2xlLmxvZyhzaGlwKVxuICAgICAgXG4gICAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICBzdW5rU2hpcCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKClcbiAgfVxuXG4gIGNvbnNvbGUubG9nKHgsIHkpXG59XG5cbmNvbnN0IHN1bmtTaGlwID0gKCkgPT4ge1xuICAvLyByZXZlYWwgdGhlIHNoaXAgcG9zaXRpb24gYW5kIHBpY3R1cmUgb2YgdGhlIHNpbGhvdWV0dGVcbiAgLy8gYWxzbyBhZGQgZmFkZSBvdXQgdGhlIHNoaXAgb24gdGhlIGJvYXJkXG5cbiAgY29uc29sZS5sb2coJ1NISVAgSEFTIEJFRU4gU1VOSyEgTUFZREFZISBNQVlEQVkhJylcbn1cblxuY29uc3QgYWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuXG59IiwiaW1wb3J0IHsgcGxhY2VTaGlwIH0gZnJvbSAnLi4vaW5kZXgnXG5cbmNvbnN0IGdldFJhbmRvbUludCA9IChtaW4sIG1heCkgPT4ge1xuICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbn1cblxuZXhwb3J0IGNvbnN0IGF1dG9QbGFjZUFsbFNoaXBzID0gKHBsYXllciwgZ2FtZVN0YXJ0ZWQsIHRvdGFsU2hpcHMsIGF4aXMpID0+IHtcbiAgaWYgKGdhbWVTdGFydGVkKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtwbGF5ZXIuZ2V0UGxheWVyTGFiZWwoKX1gKVxuXG4gIGNvbnNvbGUubG9nKCdoZWxsbyBwbGF5ZXInKVxuXG4gIGxldCBudW1PZlBsYWNlZFNoaXBzID0gT2JqZWN0LnZhbHVlcyhwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkuZ2V0UGxhY2VkU2hpcHMoKSkubGVuZ3RoXG5cbiAgd2hpbGUgKG51bU9mUGxhY2VkU2hpcHMgPCB0b3RhbFNoaXBzKSB7XG4gICAgY29uc3QgeCA9IGdldFJhbmRvbUludCgwLCA5KVxuICAgIGNvbnN0IHkgPSBnZXRSYW5kb21JbnQoMCwgOSlcblxuICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbeD1cIiR7eH1cIl1beT1cIiR7eX1cIl1gKVswXVxuICAgIHBsYWNlU2hpcChlbGVtLCBheGlzKVxuICAgIGVsZW0uY2xpY2soKVxuXG4gICAgbnVtT2ZQbGFjZWRTaGlwcyA9IE9iamVjdC52YWx1ZXMocGxheWVyLmdldEdhbWVib2FyZCgpLmdldFBsYWNlZFNoaXBzKCkpLmxlbmd0aFxuICB9XG5cbiAgY29uc29sZS5sb2coZ2FtZWJvYXJkKVxufSIsImltcG9ydCB7IFNoaXAgfSBmcm9tICcuLi9jbGFzc2VzL1NoaXAnXG5cbmNvbnN0IGNyZWF0ZVNoaXBXaXRoUG9zID0gKHBvc2l0aW9ucywgYXhpcykgPT4ge1xuICBjb25zdCBzaGlwTGVuID0gcG9zaXRpb25zLmxlbmd0aFxuICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbiwgYXhpcylcbiAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdXG5cbiAgcG9zaXRpb25zLmZvckVhY2goKHBvc2l0aW9uKSA9PiB7XG4gICAgY29uc3Qge3gsIHl9ID0gcG9zaXRpb25cbiAgICBzaGlwUG9zaXRpb25zLnB1c2goW3t4LCB5LCBoaXQ6IGZhbHNlfV0pXG4gIH0pXG5cbiAgc2hpcC5zZXRQb3NpdGlvbnMoc2hpcFBvc2l0aW9ucylcblxuICByZXR1cm4gc2hpcFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTaGlwV2l0aFBvcyIsImltcG9ydCB7IGZpbmFsaXplU2hpcFBsYWNlbWVudCwgaGFuZGxlSG92ZXJQb3NpdGlvbiB9IGZyb20gJy4uL2luZGV4J1xuaW1wb3J0IHsgc2V0UGxheWVycywgaGFuZGxlQXR0YWNrQ2xpY2ssIGF0dGFja1Bvc2l0aW9uIH0gZnJvbSAnLi9hdHRhY2tQb3NpdGlvbidcblxuZXhwb3J0IGNvbnN0IGVkaXRCb2FyZExpc3RlbmVycyA9IChwbGF5ZXJPbmUsIHBsYXllclR3bykgPT4ge1xuICBzZXRQbGF5ZXJzKHBsYXllck9uZSwgcGxheWVyVHdvKVxuICBlZGl0UGxheWVyT25lQm9hcmRMaXN0ZW5lcnMoKVxuICBlZGl0UGxheWVyVHdvQm9hcmRMaXN0ZW5lcnMoKVxuICBcbn1cblxuY29uc3QgZWRpdFBsYXllck9uZUJvYXJkTGlzdGVuZXJzID0gKCkgPT4ge1xuICBjb25zdCBwbGF5ZXJOdW0gPSAwXG4gIFxuICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcbiAgICBmb3IobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xuICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFt4PVwiJHt4fVwiXVt5PVwiJHt5fVwiXWApW3BsYXllck51bV1cblxuICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGZpbmFsaXplU2hpcFBsYWNlbWVudClcbiAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaGFuZGxlSG92ZXJQb3NpdGlvbilcbiAgICAgIGNvbnNvbGUubG9nKGVsZW0pXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGVkaXRQbGF5ZXJUd29Cb2FyZExpc3RlbmVycyA9ICgpID0+IHtcbiAgY29uc3QgcGxheWVyTnVtID0gMVxuICBcbiAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XG4gICAgZm9yKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcbiAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbeD1cIiR7eH1cIl1beT1cIiR7eX1cIl1gKVtwbGF5ZXJOdW1dXG5cbiAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmaW5hbGl6ZVNoaXBQbGFjZW1lbnQpXG4gICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGhhbmRsZUhvdmVyUG9zaXRpb24pXG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQXR0YWNrQ2xpY2spXG4gICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2VuZW15UG9zaXRpb24nKVxuICAgICAgY29uc29sZS5sb2coZWxlbSlcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgY3JlYXRlU2hpcFdpdGhQb3MgZnJvbSAnLi9jcmVhdGVTaGlwV2l0aFBvcydcbmltcG9ydCB2YWxpZFNoaXBQbGFjZW1lbnQgZnJvbSAnLi92YWxpZFNoaXBQbGFjZW1lbnQnXG5cbmNvbnN0IHZhbGlkU2hpcEhvdmVyID0gKHNoaXBMZW4sIGVsZW0sIGF4aXMsIGN1cnJlbnRQbGF5ZXJUdXJuKSA9PiB7XG4gIGNvbnN0IGhvdmVyZWRQb3MgPSBheGlzID09PSAnWCcgPyBnZXRIb3ZlcmVkUG9zWChlbGVtLCBzaGlwTGVuKSA6IGdldEhvdmVyZWRQb3NZKGVsZW0sIHNoaXBMZW4pXG4gIGNvbnN0IHNoaXAgPSBjcmVhdGVTaGlwV2l0aFBvcyhob3ZlcmVkUG9zLCBheGlzKVxuXG4gIHJldHVybiB2YWxpZFNoaXBQbGFjZW1lbnQoY3VycmVudFBsYXllclR1cm4sIHNoaXApXG59XG5cbmNvbnN0IGdldEhvdmVyZWRQb3NYID0gKGVsZW0sIHNoaXBMZW4pID0+IHtcbiAgY29uc3QgW3gsIHldID0gW051bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneCcpKSwgTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd5JykpXVxuICBjb25zdCBmaW5hbFNoaXBQb3NpdGlvblggPSAoeCArIHNoaXBMZW4pIC0gMVxuICBjb25zdCBob3ZlcmVkUG9zID0gW11cblxuICBpZiAoZmluYWxTaGlwUG9zaXRpb25YIDw9IDkpIHtcbiAgICBmb3IobGV0IGkgPSB4OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWDsgaSsrKSB7XG4gICAgICBob3ZlcmVkUG9zLnB1c2goe3g6IGksIHl9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBob3ZlcmVkUG9zXG59XG5cbmNvbnN0IGdldEhvdmVyZWRQb3NZID0gKGVsZW0sIHNoaXBMZW4pID0+IHtcbiAgY29uc3QgW3gsIHldID0gW051bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneCcpKSwgTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd5JykpXVxuICBjb25zdCBmaW5hbFNoaXBQb3NpdGlvblkgPSAoeSArIHNoaXBMZW4pIC0gMVxuICBjb25zdCBob3ZlcmVkUG9zID0gW11cblxuICBpZiAoZmluYWxTaGlwUG9zaXRpb25ZIDw9IDkpIHtcbiAgICBmb3IobGV0IGkgPSB5OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWTsgaSsrKSB7XG4gICAgICBob3ZlcmVkUG9zLnB1c2goe3gsIHk6IGl9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBob3ZlcmVkUG9zXG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkU2hpcEhvdmVyIiwiY29uc3QgdmFsaWRTaGlwUGxhY2VtZW50ID0gKGN1cnJlbnRQbGF5ZXJUdXJuLCBzaGlwKSA9PiB7XG4gIGNvbnN0IHBsYWNlZFNoaXBzID0gY3VycmVudFBsYXllclR1cm4uZ2V0R2FtZWJvYXJkKCkuZ2V0UGxhY2VkU2hpcHMoKVxuICBpZiAoc2hpcC5nZXRQb3NpdGlvbnMoKS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGlmIChzaGlwLmdldEF4aXMoKSA9PT0gJ1gnKSB7XG4gICAgXG4gICAgZm9yIChsZXQgcGxhY2VkU2hpcCBvZiBwbGFjZWRTaGlwcykge1xuICAgICAgaWYgKHZhbGlkYXRlU2hpcFdpdGhYKHNoaXAsIHBsYWNlZFNoaXApID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoc2hpcC5nZXRBeGlzKCkgPT09ICdZJykge1xuICAgIGZvciAobGV0IHBsYWNlZFNoaXAgb2YgcGxhY2VkU2hpcHMpIHtcbiAgICAgIGlmICh2YWxpZGF0ZVNoaXBXaXRoWShzaGlwLCBwbGFjZWRTaGlwKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3QgdmFsaWRhdGVTaGlwV2l0aFggPSAoc2hpcCwgcGxhY2VkU2hpcCkgPT4ge1xuICBpZiAocGxhY2VkU2hpcC5nZXRBeGlzKCkgPT09IHNoaXAuZ2V0QXhpcygpKSB7XG4gICAgY29uc3QgeyB4OiBzaGlwU3RhcnRQb3NYLCB5OiBzaGlwU3RhcnRQb3NZIH0gPSBzaGlwLmdldEZpcnN0UG9zaXRpb24oKVxuICAgIGNvbnN0IHsgeDogc2hpcEVuZFBvc1gsIHk6IHNoaXBFbmRQb3NZIH0gPSBzaGlwLmdldExhc3RQb3NpdGlvbigpXG4gICAgY29uc3QgeyB4OiBwbGFjZWRTdGFydFBvc1gsIHk6IHBsYWNlZFN0YXJ0UG9zWSB9ID0gcGxhY2VkU2hpcC5nZXRGaXJzdFBvc2l0aW9uKClcbiAgICBjb25zdCB7IHg6IHBsYWNlZEVuZFBvc1gsIHk6IHBsYWNlZEVuZFBvc1kgfSA9IHBsYWNlZFNoaXAuZ2V0TGFzdFBvc2l0aW9uKClcbiAgICBcbiAgICBpZiAoc2hpcFN0YXJ0UG9zWSA9PT0gcGxhY2VkU3RhcnRQb3NZKSB7XG4gICAgICBpZiAoc2hpcFN0YXJ0UG9zWCA+PSBwbGFjZWRTdGFydFBvc1ggJiYgc2hpcFN0YXJ0UG9zWCA8PSBwbGFjZWRFbmRQb3NYKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICBpZiAoc2hpcEVuZFBvc1ggPj0gcGxhY2VkU3RhcnRQb3NYICYmIHNoaXBFbmRQb3NYIDw9IHBsYWNlZEVuZFBvc1gpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3QgdmFsaWRhdGVTaGlwV2l0aFkgPSAoc2hpcCwgcGxhY2VkU2hpcCkgPT4ge1xuICBjb25zdCB7IHg6IHNoaXBTdGFydFBvc1gsIHk6IHNoaXBTdGFydFBvc1kgfSA9IHNoaXAuZ2V0Rmlyc3RQb3NpdGlvbigpXG4gIGNvbnN0IHsgeDogc2hpcEVuZFBvc1gsIHk6IHNoaXBFbmRQb3NZIH0gPSBzaGlwLmdldExhc3RQb3NpdGlvbigpXG4gIGNvbnN0IHsgeDogcGxhY2VkU3RhcnRQb3NYLCB5OiBwbGFjZWRTdGFydFBvc1kgfSA9IHBsYWNlZFNoaXAuZ2V0Rmlyc3RQb3NpdGlvbigpXG4gIGNvbnN0IHsgeDogcGxhY2VkRW5kUG9zWCwgeTogcGxhY2VkRW5kUG9zWSB9ID0gcGxhY2VkU2hpcC5nZXRMYXN0UG9zaXRpb24oKVxuICBcbiAgaWYgKHNoaXBTdGFydFBvc1ggPT09IHBsYWNlZFN0YXJ0UG9zWCkge1xuICAgIFxuICAgIGlmIChzaGlwU3RhcnRQb3NZID49IHBsYWNlZFN0YXJ0UG9zWSAmJiBzaGlwU3RhcnRQb3NZIDw9IHBsYWNlZEVuZFBvc1kpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAoc2hpcFN0YXJ0UG9zWSA+PSBwbGFjZWRTdGFydFBvc1kgJiYgc2hpcFN0YXJ0UG9zWSA8PSBwbGFjZWRFbmRQb3NZKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKHNoaXBFbmRQb3NZID49IHBsYWNlZFN0YXJ0UG9zWSAmJiBzaGlwRW5kUG9zWSA8PSBwbGFjZWRFbmRQb3NZKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZFNoaXBQbGFjZW1lbnQiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9jbGFzc2VzL1NoaXAnXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL2NsYXNzZXMvUGxheWVyJ1xuaW1wb3J0IHZhbGlkU2hpcFBsYWNlbWVudCBmcm9tICcuL2dhbWVIZWxwZXJzL3ZhbGlkU2hpcFBsYWNlbWVudCdcbmltcG9ydCB2YWxpZFNoaXBIb3ZlciBmcm9tICcuL2dhbWVIZWxwZXJzL3ZhbGlkU2hpcEhvdmVyJ1xuaW1wb3J0IHsgYXV0b1BsYWNlQWxsU2hpcHMgfSBmcm9tICcuL2dhbWVIZWxwZXJzL2F1dG9QbGFjZUFsbFNoaXBzJ1xuaW1wb3J0IHsgZWRpdEJvYXJkTGlzdGVuZXJzIH0gZnJvbSAnLi9nYW1lSGVscGVycy9lZGl0Qm9hcmRMaXN0ZW5lcnMnXG5cbmNvbnN0IHBsYXllck9uZSA9IG5ldyBQbGF5ZXIoJ0NhcmxvcycsICdwbGF5ZXJPbmUnKVxuY29uc3QgcGxheWVyVHdvID0gbmV3IFBsYXllcignQW50aG9ueScsICdwbGF5ZXJUd28nKVxuY29uc3QgYXhpc09wdGlvbnMgPSBbJ1gnLCAnWSddXG5jb25zdCBheGlzID0gJ1gnXG5jb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXVxuY29uc3QgYXV0b1BsYWNlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF1dG9QbGFjZUJ1dHRvbicpXG5jb25zdCBzdGFydEdhbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnRHYW1lQnV0dG9uJylcbmNvbnN0IHRvdGFsU2hpcHMgPSA1XG5cbmxldCBnYW1lU3RhcnRlZCA9IGZhbHNlXG5sZXQgY3VycmVudFBsYXllclR1cm4gPSBwbGF5ZXJPbmVcbmxldCBjdXJyU2hpcExlbmd0aEluZGV4ID0gMFxubGV0IGhvdmVyZWRFbGVtcyA9IFtdXG5sZXQgaG92ZXJlZFBvcyA9IFtdXG5cblxuY29uc3QgY2xlYXJIb3ZlckVsZW1Db2xvcnMgPSAoKSA9PiB7XG4gIGhvdmVyZWRFbGVtcy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdwbGFjZWRQb3NpdGlvbicpXG4gICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdub3RIaXQnKVxuICB9KVxuICBob3ZlcmVkRWxlbXMgPSBbXVxuICBob3ZlcmVkUG9zID0gW11cbn1cblxuY29uc3QgY2xlYXJBbGxFbGVtQ29sb3JzID0gKHBsYXllcikgPT4ge1xuICBjb25zdCBhbGxQb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtwbGF5ZXIuZ2V0UGxheWVyTGFiZWwoKX0gLnBvc2l0aW9uYClcbiAgYWxsUG9zLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ25vdEhpdCcpXG4gICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZhbGlkU2hpcFBsYWNlbWVudCcsICdwbGFjZWRQb3NpdGlvbicpXG4gIH0pXG4gIGhvdmVyZWRFbGVtcyA9IFtdXG4gIGhvdmVyZWRQb3MgPSBbXVxuICBjdXJyU2hpcExlbmd0aEluZGV4ID0gMFxufVxuXG5cblxuY29uc3QgY2xlYXJHYW1lYm9hcmQgPSAocGxheWVyKSA9PiB7XG4gIHBsYXllci5nZXRHYW1lYm9hcmQoKS5jbGVhckdhbWVib2FyZCgpXG4gIGdhbWVTdGFydGVkID0gZmFsc2VcbiAgY2xlYXJBbGxFbGVtQ29sb3JzKHBsYXllcilcbn1cblxuY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xuXG4gIGlmIChwbGF5ZXJPbmUuZ2V0R2FtZWJvYXJkKCkuZ2V0UGxhY2VkU2hpcHMoKS5sZW5ndGggPCA1KSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBoYW5kbGVDb21wdXRlclBsYWNlbWVudCgpXG4gIGVkaXRCb2FyZExpc3RlbmVycyhwbGF5ZXJPbmUsIHBsYXllclR3bylcblxuICBjb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZHMnKVxuICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkJylcbiAgY29uc3QgcGxheWVyVHdvR2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllclR3bycpXG5cbiAgZ2FtZWJvYXJkcy5jbGFzc0xpc3QucmVtb3ZlKCdjZW50ZXJHYW1lYm9hcmRzJylcbiAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYWNpbmdTaGlwcycpXG4gIHBsYXllclR3b0dhbWVib2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5ZXJUd29HYW1lTm90U3RhcnRlZCcpXG5cbiAgY29uc29sZS5sb2coJ0FsbCBvZiBwbGF5ZXJPbmVzIHNoaXBzIGhhdmUgYmVlbiBwbGFjZWQuJylcbiAgZ2FtZVN0YXJ0ZWQgPSB0cnVlXG5cbn1cblxuZXhwb3J0IGNvbnN0IGhhbmRsZUhvdmVyUG9zaXRpb24gPSAoZXZlbnQpID0+IHtcbiAgY2xlYXJIb3ZlckVsZW1Db2xvcnMoKVxuICBpZihnYW1lU3RhcnRlZCA9PT0gZmFsc2UpIHtcbiAgICBjb25zdCBlbGVtID0gZXZlbnQudGFyZ2V0XG4gICAgcGxhY2VTaGlwKGVsZW0sIGF4aXMpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHBsYWNlU2hpcCA9IChlbGVtLCBheGlzKSA9PiB7XG5cbiAgaWYgKGdhbWVTdGFydGVkKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBzaGlwTGVuID0gc2hpcExlbmd0aHNbY3VyclNoaXBMZW5ndGhJbmRleF1cblxuICBpZiAoYXhpcyA9PT0gJ1gnKSB7XG4gICAgaWYgKHZhbGlkU2hpcEhvdmVyKHNoaXBMZW4sIGVsZW0sIGF4aXMsIGN1cnJlbnRQbGF5ZXJUdXJuKSkge1xuICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZhbGlkU2hpcFBsYWNlbWVudCcpXG4gICAgICBwbGFjZVNoaXBYKHNoaXBMZW4sIGVsZW0sIGN1cnJlbnRQbGF5ZXJUdXJuLCBjdXJyU2hpcExlbmd0aEluZGV4KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnQ0hBTkdORyBDVVJTT1InKVxuICAgICAgY29uc29sZS5sb2coZWxlbSlcbiAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnaW52YWxpZFNoaXBQbGFjZW1lbnQnKVxuICAgIH1cbiAgfSBlbHNlIGlmIChheGlzID09PSAnWScpIHtcbiAgICBpZiAodmFsaWRTaGlwSG92ZXIoc2hpcExlbiwgZWxlbSwgYXhpcywgY3VycmVudFBsYXllclR1cm4pKSB7XG4gICAgICBwbGFjZVNoaXBZKHNoaXBMZW4sIGVsZW0sIGN1cnJlbnRQbGF5ZXJUdXJuLCBjdXJyU2hpcExlbmd0aEluZGV4KVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBwbGFjZVNoaXBYID0gKHNoaXBMZW4sIGVsZW0sIGN1cnJlbnRQbGF5ZXJUdXJuLCBjdXJyU2hpcExlbmd0aEluZGV4KSA9PiB7XG4gIGNvbnN0IFt4LCB5XSA9IFtOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3gnKSksIE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneScpKV1cbiAgY29uc3QgZmluYWxTaGlwUG9zaXRpb25YID0gKHggKyBzaGlwTGVuKSAtIDFcblxuICBjb25zb2xlLmxvZyhlbGVtKVxuXG4gIGlmIChmaW5hbFNoaXBQb3NpdGlvblggPD0gOSkge1xuXG4gICAgZm9yKGxldCBpID0geDsgaSA8PSBmaW5hbFNoaXBQb3NpdGlvblg7IGkrKykge1xuICAgICAgbGV0IHBsYXllck51bSA9IDBcblxuICAgICAgaWYgKGN1cnJlbnRQbGF5ZXJUdXJuLmdldFBsYXllckxhYmVsKCkgPT09ICdwbGF5ZXJUd28nKSB7XG4gICAgICAgIHBsYXllck51bSA9IDFcbiAgICAgIH1cblxuICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFt4PVwiJHtpfVwiXVt5PVwiJHt5fVwiXWApW3BsYXllck51bV1cbiAgICAgIGhvdmVyZWRFbGVtcy5wdXNoKGVsZW0pXG4gICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ3BsYWNlZFBvc2l0aW9uJylcbiAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChjdXJyZW50UGxheWVyVHVybi5nZXRQbGF5ZXJMYWJlbCgpKVxuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ3NoaXAtaW5kZXgnLCBjdXJyU2hpcExlbmd0aEluZGV4KVxuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uLWluZGV4JywgaSlcblxuICAgICAgY29uc29sZS5sb2coJ2hlbGxvIHdyb2xkJylcbiAgICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFt4PVwiJHtpfVwiXVt5PVwiJHt5fVwiXWApKVxuICAgIH1cblxuICB9XG59XG5cbmNvbnN0IHBsYWNlU2hpcFkgPSAoc2hpcExlbiwgcG9zLCBjdXJyZW50UGxheWVyVHVybiwgY3VyclNoaXBMZW5ndGhJbmRleCkgPT4ge1xuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKHBvcy5nZXRBdHRyaWJ1dGUoJ3gnKSksIE51bWJlcihwb3MuZ2V0QXR0cmlidXRlKCd5JykpXVxuICBjb25zdCBmaW5hbFNoaXBQb3NpdGlvblkgPSAoeSArIHNoaXBMZW4pIC0gMVxuXG4gIGlmIChmaW5hbFNoaXBQb3NpdGlvblkgPD0gOSkge1xuICAgIGxldCBwbGF5ZXJOdW0gPSAwXG5cbiAgICBpZiAoY3VycmVudFBsYXllclR1cm4uZ2V0UGxheWVyTGFiZWwoKSA9PT0gJ3BsYXllclR3bycpIHtcbiAgICAgIHBsYXllck51bSA9IDFcbiAgICB9XG5cbiAgICBmb3IobGV0IGkgPSB5OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWTsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3g9XCIke3h9XCJdW3k9XCIke2l9XCJdYClbcGxheWVyTnVtXVxuICAgICAgaG92ZXJlZEVsZW1zLnB1c2goZWxlbSlcbiAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgncGxhY2VkUG9zaXRpb24nKVxuICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKGN1cnJlbnRQbGF5ZXJUdXJuLmdldFBsYXllckxhYmVsKCkpXG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZSgnc2hpcEluZGV4JywgY3VyclNoaXBMZW5ndGhJbmRleClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGZpbmFsaXplU2hpcFBsYWNlbWVudCA9ICgpID0+IHtcbiAgLy8gbG9vcFxuICBjb25zb2xlLmxvZygncGxhY2luZyBzaGlwJylcbiAgY29uc29sZS5sb2coZ2FtZVN0YXJ0ZWQpXG5cbiAgaWYgKGdhbWVTdGFydGVkKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3Qgc2hpcExlbiA9IGhvdmVyZWRFbGVtcy5sZW5ndGhcbiAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKHNoaXBMZW4sIGF4aXMpXG4gIGNvbnN0IHNoaXBQb3NpdGlvbnMgPSBbXVxuXG4gIGhvdmVyZWRFbGVtcy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgY29uc3QgeCA9IE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneCcpKVxuICAgIGNvbnN0IHkgPSBOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3knKSlcbiAgICBzaGlwUG9zaXRpb25zLnB1c2goW3t4LCB5LCBoaXQ6IGZhbHNlfV0pXG4gIH0pXG5cbiAgc2hpcC5zZXRQb3NpdGlvbnMoc2hpcFBvc2l0aW9ucylcblxuICBpZiAodmFsaWRTaGlwUGxhY2VtZW50KGN1cnJlbnRQbGF5ZXJUdXJuLCBzaGlwKSkge1xuICAgIFxuICAgIGN1cnJlbnRQbGF5ZXJUdXJuLmdldEdhbWVib2FyZCgpLnBsYWNlU2hpcChzaGlwKVxuXG4gICAgaG92ZXJlZEVsZW1zID0gW11cbiAgICBjdXJyU2hpcExlbmd0aEluZGV4ICs9IDFcbiAgfVxuXG4gIGNvbnNvbGUubG9nKGN1cnJlbnRQbGF5ZXJUdXJuLmdldEdhbWVib2FyZCgpLmdldFBsYWNlZFNoaXBzKCkpXG59XG5cbmNvbnN0IGhhbmRsZUNvbXB1dGVyUGxhY2VtZW50ID0gKCkgPT4ge1xuICBjdXJyZW50UGxheWVyVHVybiA9IHBsYXllclR3b1xuICBoYW5kbGVBdXRvUGxhY2UoKVxuICBjdXJyZW50UGxheWVyVHVybiA9IHBsYXllck9uZVxufVxuXG5jb25zdCBoYW5kbGVBdXRvUGxhY2UgPSAoKSA9PiB7XG4gIGNsZWFyR2FtZWJvYXJkKGN1cnJlbnRQbGF5ZXJUdXJuKVxuICBjbGVhckFsbEVsZW1Db2xvcnMoY3VycmVudFBsYXllclR1cm4pXG4gIGF1dG9QbGFjZUFsbFNoaXBzKGN1cnJlbnRQbGF5ZXJUdXJuLCBnYW1lU3RhcnRlZCwgdG90YWxTaGlwcywgYXhpcylcbn1cblxuXG5jb25zdCBkaXNwbGF5R2FtZWJvYXJkID0gKHBsYXllcikgPT4ge1xuICBjb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZHMnKVxuICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkJywgcGxheWVyKVxuXG4gIGlmIChwbGF5ZXIgPT09ICdwbGF5ZXJPbmUnKSB7XG4gICAgZ2FtZWJvYXJkcy5jbGFzc0xpc3QuYWRkKCdjZW50ZXJHYW1lYm9hcmRzJylcbiAgICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgncGxhY2luZ1NoaXBzJylcbiAgfSBlbHNlIGlmIChwbGF5ZXIgPT09ICdwbGF5ZXJUd28nKSB7XG4gICAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoJ3BsYXllclR3b0dhbWVOb3RTdGFydGVkJylcbiAgfVxuICBcbiAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XG4gICAgXG4gICAgZm9yKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcbiAgICAgIGxldCBwb3NpdGlvbkVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgcG9zaXRpb25FbGVtLnNldEF0dHJpYnV0ZSgneCcsIHgpXG4gICAgICBwb3NpdGlvbkVsZW0uc2V0QXR0cmlidXRlKCd5JywgeSlcbiAgICAgIHBvc2l0aW9uRWxlbS5jbGFzc0xpc3QuYWRkKCdwb3NpdGlvbicpXG5cbiAgICAgIHBvc2l0aW9uRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZpbmFsaXplU2hpcFBsYWNlbWVudClcbiAgICAgIHBvc2l0aW9uRWxlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBoYW5kbGVIb3ZlclBvc2l0aW9uKVxuICAgICAgXG4gICAgICBnYW1lYm9hcmQuYXBwZW5kKHBvc2l0aW9uRWxlbSlcbiAgICB9XG4gIH1cblxuICBnYW1lYm9hcmRzLmFwcGVuZChnYW1lYm9hcmQpXG59XG5cbmRpc3BsYXlHYW1lYm9hcmQocGxheWVyT25lLnBsYXllckxhYmVsKVxuZGlzcGxheUdhbWVib2FyZChwbGF5ZXJUd28ucGxheWVyTGFiZWwpXG5cbmF1dG9QbGFjZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUF1dG9QbGFjZSlcbnN0YXJ0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0R2FtZSkiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=