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
    const position = this.positions.find(position => position.x === positionNum[0] && position.y === position[1])
    position.hit = true
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
/* harmony export */   "placeShip": () => (/* binding */ placeShip)
/* harmony export */ });
/* harmony import */ var _classes_Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Ship */ "./src/classes/Ship.js");
/* harmony import */ var _classes_Ship__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_classes_Ship__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _classes_Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Gameboard */ "./src/classes/Gameboard.js");
/* harmony import */ var _classes_Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Player */ "./src/classes/Player.js");
/* harmony import */ var _gameHelpers_validShipPlacement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameHelpers/validShipPlacement */ "./src/gameHelpers/validShipPlacement.js");
/* harmony import */ var _gameHelpers_createShipWithPos__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gameHelpers/createShipWithPos */ "./src/gameHelpers/createShipWithPos.js");
/* harmony import */ var _gameHelpers_validShipHover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gameHelpers/validShipHover */ "./src/gameHelpers/validShipHover.js");
/* harmony import */ var _gameHelpers_autoPlaceAllShips__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./gameHelpers/autoPlaceAllShips */ "./src/gameHelpers/autoPlaceAllShips.js");








const playerOne = new _classes_Player__WEBPACK_IMPORTED_MODULE_2__.Player('Carlos', 'playerOne')
const playerTwo = new _classes_Player__WEBPACK_IMPORTED_MODULE_2__.Player('Anthony', 'playerTwo')
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

const attackPosition = (event) => {
  const pos = event.target
  const [x, y] = [Number(pos.getAttribute('x')), Number(pos.getAttribute('y'))]


  pos.classList.add('hit')

  console.log(x, y)
}


const clearHoverElemColors = () => {
  hoveredElems.forEach((elem) => elem.style.backgroundColor = '#5775B0')
  hoveredElems = []
  hoveredPos = []
}

const clearAllElemColors = (player) => {
  const allPos = document.querySelectorAll(`.${player.getPlayerLabel()} .position`)
  allPos.forEach((elem) => elem.style.backgroundColor = '#5775B0')
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
    if ((0,_gameHelpers_validShipHover__WEBPACK_IMPORTED_MODULE_5__.default)(shipLen, elem, axis, currentPlayerTurn)) {
      elem.classList.remove('invalidShipPlacement')
      placeShipX(shipLen, elem, currentPlayerTurn)
    } else {
      console.log('CHANGNG CURSOR')
      console.log(elem)
      elem.classList.add('invalidShipPlacement')
    }
  } else if (axis === 'Y') {
    if ((0,_gameHelpers_validShipHover__WEBPACK_IMPORTED_MODULE_5__.default)(shipLen, elem, axis, currentPlayerTurn)) {
      placeShipY(shipLen, elem, currentPlayerTurn)
    }
  }
}

const placeShipX = (shipLen, elem, currentPlayerTurn) => {
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
      elem.style.backgroundColor = 'white'

      console.log('hello wrold')
      console.log(document.querySelectorAll(`[x="${i}"][y="${y}"]`))
    }

  }
}

const placeShipY = (shipLen, pos, currentPlayerTurn) => {
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
      elem.style.backgroundColor = 'white'
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

  if ((0,_gameHelpers_validShipPlacement__WEBPACK_IMPORTED_MODULE_3__.default)(currentPlayerTurn, ship)) {
    
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
  ;(0,_gameHelpers_autoPlaceAllShips__WEBPACK_IMPORTED_MODULE_6__.autoPlaceAllShips)(currentPlayerTurn, gameStarted, totalShips, axis)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBLG1CQUFtQixRQUFRO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7O1VDdk9BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jbGFzc2VzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NsYXNzZXMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY2xhc3Nlcy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUhlbHBlcnMvYXV0b1BsYWNlQWxsU2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lSGVscGVycy9jcmVhdGVTaGlwV2l0aFBvcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVIZWxwZXJzL3ZhbGlkU2hpcEhvdmVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUhlbHBlcnMvdmFsaWRTaGlwUGxhY2VtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBHYW1lYm9hcmQge1xuICBwb3NpdGlvbnMgPSBbXTtcbiAgcGxhY2VkU2hpcHMgPSBbXTtcblxuICBjbGVhckdhbWVib2FyZCgpIHtcbiAgICB0aGlzLnBvc2l0aW9ucyA9IFtdXG4gICAgdGhpcy5wbGFjZWRTaGlwcyA9IFtdXG4gIH1cblxuICBnZXRQbGFjZWRTaGlwcygpIHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZWRTaGlwc1xuICB9XG5cbiAgcGxhY2VTaGlwKHNoaXApIHtcbiAgICB0aGlzLnBsYWNlZFNoaXBzLnB1c2goc2hpcClcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmRzKSB7XG5cbiAgfVxufSIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vR2FtZWJvYXJkJ1xuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gIG5hbWU7XG4gIHBsYXllckxhYmVsO1xuICBnYW1lYm9hcmQ7XG4gIHdvbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIHBsYXllckxhYmVsKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnBsYXllckxhYmVsID0gcGxheWVyTGFiZWxcbiAgICB0aGlzLmdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKVxuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lXG4gIH1cblxuICBnZXRQbGF5ZXJMYWJlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5ZXJMYWJlbFxuICB9XG5cbiAgZ2V0R2FtZWJvYXJkKCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVib2FyZFxuICB9XG5cbiAgaGFzV29uKCkge1xuICAgIHJldHVybiB0aGlzLndvblxuICB9XG59IiwiY2xhc3MgU2hpcCB7XG4gIGxlbmd0aDtcbiAgYXhpcztcbiAgcG9zaXRpb25zID0gW107XG5cbiAgY29uc3RydWN0b3IobGVuZ3RoLCBheGlzKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGhcbiAgICB0aGlzLmF4aXMgPSBheGlzXG4gICAgdGhpcy5wb3NpdGlvbnNIaXQgPSBbXVxuICB9XG5cbiAgZ2V0TGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aFxuICB9XG5cbiAgZ2V0QXhpcygpIHtcbiAgICByZXR1cm4gdGhpcy5heGlzXG4gIH1cblxuICBnZXRQb3NpdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25zXG4gIH1cblxuICBnZXRQb3NpdGlvbnNIaXQoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25zLmZpbHRlcigocG9zaXRpb24pID0+IHBvc2l0aW9uLmhpdCAhPSB0cnVlKVxuICB9XG5cbiAgZ2V0Rmlyc3RQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbnNbMF1bMF1cbiAgfVxuXG4gIGdldExhc3RQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbnNbdGhpcy5wb3NpdGlvbnMubGVuZ3RoIC0gMV1bMF1cbiAgfVxuXG4gIHNldFBvc2l0aW9ucyhwb3NpdGlvbnMpIHtcbiAgICBpZihwb3NpdGlvbnMubGVuZ3RoID09PSB0aGlzLmxlbmd0aCkge1xuICAgICAgdGhpcy5wb3NpdGlvbnMgPSBwb3NpdGlvbnNcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdTaGlwIGNhbm5vdCBmaXQhJ1xuICAgIH1cbiAgfVxuXG4gIGhpdChwb3NpdGlvbk51bSkge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbnMuZmluZChwb3NpdGlvbiA9PiBwb3NpdGlvbi54ID09PSBwb3NpdGlvbk51bVswXSAmJiBwb3NpdGlvbi55ID09PSBwb3NpdGlvblsxXSlcbiAgICBwb3NpdGlvbi5oaXQgPSB0cnVlXG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgY29uc3QgcG9zaXRpb25zTGVmdCA9IHRoaXMucG9zaXRpb25zLmZpbHRlcigocG9zaXRpb24pID0+IHBvc2l0aW9uLmhpdCAhPSB0cnVlKVxuICAgIHJldHVybiBwb3NpdGlvbnNMZWZ0ID09PSAwXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNoaXAsXG59IiwiaW1wb3J0IHsgcGxhY2VTaGlwIH0gZnJvbSAnLi4vaW5kZXgnXG5cbmNvbnN0IGdldFJhbmRvbUludCA9IChtaW4sIG1heCkgPT4ge1xuICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbn1cblxuZXhwb3J0IGNvbnN0IGF1dG9QbGFjZUFsbFNoaXBzID0gKHBsYXllciwgZ2FtZVN0YXJ0ZWQsIHRvdGFsU2hpcHMsIGF4aXMpID0+IHtcbiAgaWYgKGdhbWVTdGFydGVkKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtwbGF5ZXIuZ2V0UGxheWVyTGFiZWwoKX1gKVxuXG4gIGNvbnNvbGUubG9nKCdoZWxsbyBwbGF5ZXInKVxuXG4gIGxldCBudW1PZlBsYWNlZFNoaXBzID0gT2JqZWN0LnZhbHVlcyhwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkuZ2V0UGxhY2VkU2hpcHMoKSkubGVuZ3RoXG5cbiAgd2hpbGUgKG51bU9mUGxhY2VkU2hpcHMgPCB0b3RhbFNoaXBzKSB7XG4gICAgY29uc3QgeCA9IGdldFJhbmRvbUludCgwLCA5KVxuICAgIGNvbnN0IHkgPSBnZXRSYW5kb21JbnQoMCwgOSlcblxuICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbeD1cIiR7eH1cIl1beT1cIiR7eX1cIl1gKVswXVxuICAgIHBsYWNlU2hpcChlbGVtLCBheGlzKVxuICAgIGVsZW0uY2xpY2soKVxuXG4gICAgbnVtT2ZQbGFjZWRTaGlwcyA9IE9iamVjdC52YWx1ZXMocGxheWVyLmdldEdhbWVib2FyZCgpLmdldFBsYWNlZFNoaXBzKCkpLmxlbmd0aFxuICB9XG5cbiAgY29uc29sZS5sb2coZ2FtZWJvYXJkKVxufSIsImltcG9ydCB7IFNoaXAgfSBmcm9tICcuLi9jbGFzc2VzL1NoaXAnXG5cbmNvbnN0IGNyZWF0ZVNoaXBXaXRoUG9zID0gKHBvc2l0aW9ucywgYXhpcykgPT4ge1xuICBjb25zdCBzaGlwTGVuID0gcG9zaXRpb25zLmxlbmd0aFxuICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbiwgYXhpcylcbiAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdXG5cbiAgcG9zaXRpb25zLmZvckVhY2goKHBvc2l0aW9uKSA9PiB7XG4gICAgY29uc3Qge3gsIHl9ID0gcG9zaXRpb25cbiAgICBzaGlwUG9zaXRpb25zLnB1c2goW3t4LCB5LCBoaXQ6IGZhbHNlfV0pXG4gIH0pXG5cbiAgc2hpcC5zZXRQb3NpdGlvbnMoc2hpcFBvc2l0aW9ucylcblxuICByZXR1cm4gc2hpcFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTaGlwV2l0aFBvcyIsImltcG9ydCBjcmVhdGVTaGlwV2l0aFBvcyBmcm9tICcuL2NyZWF0ZVNoaXBXaXRoUG9zJ1xuaW1wb3J0IHZhbGlkU2hpcFBsYWNlbWVudCBmcm9tICcuL3ZhbGlkU2hpcFBsYWNlbWVudCdcblxuY29uc3QgdmFsaWRTaGlwSG92ZXIgPSAoc2hpcExlbiwgZWxlbSwgYXhpcywgY3VycmVudFBsYXllclR1cm4pID0+IHtcbiAgY29uc3QgaG92ZXJlZFBvcyA9IGF4aXMgPT09ICdYJyA/IGdldEhvdmVyZWRQb3NYKGVsZW0sIHNoaXBMZW4pIDogZ2V0SG92ZXJlZFBvc1koZWxlbSwgc2hpcExlbilcbiAgY29uc3Qgc2hpcCA9IGNyZWF0ZVNoaXBXaXRoUG9zKGhvdmVyZWRQb3MsIGF4aXMpXG5cbiAgcmV0dXJuIHZhbGlkU2hpcFBsYWNlbWVudChjdXJyZW50UGxheWVyVHVybiwgc2hpcClcbn1cblxuY29uc3QgZ2V0SG92ZXJlZFBvc1ggPSAoZWxlbSwgc2hpcExlbikgPT4ge1xuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3knKSldXG4gIGNvbnN0IGZpbmFsU2hpcFBvc2l0aW9uWCA9ICh4ICsgc2hpcExlbikgLSAxXG4gIGNvbnN0IGhvdmVyZWRQb3MgPSBbXVxuXG4gIGlmIChmaW5hbFNoaXBQb3NpdGlvblggPD0gOSkge1xuICAgIGZvcihsZXQgaSA9IHg7IGkgPD0gZmluYWxTaGlwUG9zaXRpb25YOyBpKyspIHtcbiAgICAgIGhvdmVyZWRQb3MucHVzaCh7eDogaSwgeX0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGhvdmVyZWRQb3Ncbn1cblxuY29uc3QgZ2V0SG92ZXJlZFBvc1kgPSAoZWxlbSwgc2hpcExlbikgPT4ge1xuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3knKSldXG4gIGNvbnN0IGZpbmFsU2hpcFBvc2l0aW9uWSA9ICh5ICsgc2hpcExlbikgLSAxXG4gIGNvbnN0IGhvdmVyZWRQb3MgPSBbXVxuXG4gIGlmIChmaW5hbFNoaXBQb3NpdGlvblkgPD0gOSkge1xuICAgIGZvcihsZXQgaSA9IHk7IGkgPD0gZmluYWxTaGlwUG9zaXRpb25ZOyBpKyspIHtcbiAgICAgIGhvdmVyZWRQb3MucHVzaCh7eCwgeTogaX0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGhvdmVyZWRQb3Ncbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRTaGlwSG92ZXIiLCJjb25zdCB2YWxpZFNoaXBQbGFjZW1lbnQgPSAoY3VycmVudFBsYXllclR1cm4sIHNoaXApID0+IHtcbiAgY29uc3QgcGxhY2VkU2hpcHMgPSBjdXJyZW50UGxheWVyVHVybi5nZXRHYW1lYm9hcmQoKS5nZXRQbGFjZWRTaGlwcygpXG4gIGlmIChzaGlwLmdldFBvc2l0aW9ucygpLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgaWYgKHNoaXAuZ2V0QXhpcygpID09PSAnWCcpIHtcbiAgICBcbiAgICBmb3IgKGxldCBwbGFjZWRTaGlwIG9mIHBsYWNlZFNoaXBzKSB7XG4gICAgICBpZiAodmFsaWRhdGVTaGlwV2l0aFgoc2hpcCwgcGxhY2VkU2hpcCkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChzaGlwLmdldEF4aXMoKSA9PT0gJ1knKSB7XG4gICAgZm9yIChsZXQgcGxhY2VkU2hpcCBvZiBwbGFjZWRTaGlwcykge1xuICAgICAgaWYgKHZhbGlkYXRlU2hpcFdpdGhZKHNoaXAsIHBsYWNlZFNoaXApID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCB2YWxpZGF0ZVNoaXBXaXRoWCA9IChzaGlwLCBwbGFjZWRTaGlwKSA9PiB7XG4gIGlmIChwbGFjZWRTaGlwLmdldEF4aXMoKSA9PT0gc2hpcC5nZXRBeGlzKCkpIHtcbiAgICBjb25zdCB7IHg6IHNoaXBTdGFydFBvc1gsIHk6IHNoaXBTdGFydFBvc1kgfSA9IHNoaXAuZ2V0Rmlyc3RQb3NpdGlvbigpXG4gICAgY29uc3QgeyB4OiBzaGlwRW5kUG9zWCwgeTogc2hpcEVuZFBvc1kgfSA9IHNoaXAuZ2V0TGFzdFBvc2l0aW9uKClcbiAgICBjb25zdCB7IHg6IHBsYWNlZFN0YXJ0UG9zWCwgeTogcGxhY2VkU3RhcnRQb3NZIH0gPSBwbGFjZWRTaGlwLmdldEZpcnN0UG9zaXRpb24oKVxuICAgIGNvbnN0IHsgeDogcGxhY2VkRW5kUG9zWCwgeTogcGxhY2VkRW5kUG9zWSB9ID0gcGxhY2VkU2hpcC5nZXRMYXN0UG9zaXRpb24oKVxuICAgIFxuICAgIGlmIChzaGlwU3RhcnRQb3NZID09PSBwbGFjZWRTdGFydFBvc1kpIHtcbiAgICAgIGlmIChzaGlwU3RhcnRQb3NYID49IHBsYWNlZFN0YXJ0UG9zWCAmJiBzaGlwU3RhcnRQb3NYIDw9IHBsYWNlZEVuZFBvc1gpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGlmIChzaGlwRW5kUG9zWCA+PSBwbGFjZWRTdGFydFBvc1ggJiYgc2hpcEVuZFBvc1ggPD0gcGxhY2VkRW5kUG9zWCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCB2YWxpZGF0ZVNoaXBXaXRoWSA9IChzaGlwLCBwbGFjZWRTaGlwKSA9PiB7XG4gIGNvbnN0IHsgeDogc2hpcFN0YXJ0UG9zWCwgeTogc2hpcFN0YXJ0UG9zWSB9ID0gc2hpcC5nZXRGaXJzdFBvc2l0aW9uKClcbiAgY29uc3QgeyB4OiBzaGlwRW5kUG9zWCwgeTogc2hpcEVuZFBvc1kgfSA9IHNoaXAuZ2V0TGFzdFBvc2l0aW9uKClcbiAgY29uc3QgeyB4OiBwbGFjZWRTdGFydFBvc1gsIHk6IHBsYWNlZFN0YXJ0UG9zWSB9ID0gcGxhY2VkU2hpcC5nZXRGaXJzdFBvc2l0aW9uKClcbiAgY29uc3QgeyB4OiBwbGFjZWRFbmRQb3NYLCB5OiBwbGFjZWRFbmRQb3NZIH0gPSBwbGFjZWRTaGlwLmdldExhc3RQb3NpdGlvbigpXG4gIFxuICBpZiAoc2hpcFN0YXJ0UG9zWCA9PT0gcGxhY2VkU3RhcnRQb3NYKSB7XG4gICAgXG4gICAgaWYgKHNoaXBTdGFydFBvc1kgPj0gcGxhY2VkU3RhcnRQb3NZICYmIHNoaXBTdGFydFBvc1kgPD0gcGxhY2VkRW5kUG9zWSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmIChzaGlwU3RhcnRQb3NZID49IHBsYWNlZFN0YXJ0UG9zWSAmJiBzaGlwU3RhcnRQb3NZIDw9IHBsYWNlZEVuZFBvc1kpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAoc2hpcEVuZFBvc1kgPj0gcGxhY2VkU3RhcnRQb3NZICYmIHNoaXBFbmRQb3NZIDw9IHBsYWNlZEVuZFBvc1kpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkU2hpcFBsYWNlbWVudCIsImltcG9ydCB7IFNoaXAgfSBmcm9tICcuL2NsYXNzZXMvU2hpcCdcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vY2xhc3Nlcy9HYW1lYm9hcmQnXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL2NsYXNzZXMvUGxheWVyJ1xuaW1wb3J0IHZhbGlkU2hpcFBsYWNlbWVudCBmcm9tICcuL2dhbWVIZWxwZXJzL3ZhbGlkU2hpcFBsYWNlbWVudCdcbmltcG9ydCBjcmVhdGVTaGlwV2l0aFBvcyBmcm9tICcuL2dhbWVIZWxwZXJzL2NyZWF0ZVNoaXBXaXRoUG9zJ1xuaW1wb3J0IHZhbGlkU2hpcEhvdmVyIGZyb20gJy4vZ2FtZUhlbHBlcnMvdmFsaWRTaGlwSG92ZXInXG5pbXBvcnQgeyBhdXRvUGxhY2VBbGxTaGlwcyB9IGZyb20gJy4vZ2FtZUhlbHBlcnMvYXV0b1BsYWNlQWxsU2hpcHMnXG5cbmNvbnN0IHBsYXllck9uZSA9IG5ldyBQbGF5ZXIoJ0NhcmxvcycsICdwbGF5ZXJPbmUnKVxuY29uc3QgcGxheWVyVHdvID0gbmV3IFBsYXllcignQW50aG9ueScsICdwbGF5ZXJUd28nKVxuY29uc3QgYXhpc09wdGlvbnMgPSBbJ1gnLCAnWSddXG5jb25zdCBheGlzID0gJ1gnXG5jb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXVxuY29uc3QgYXV0b1BsYWNlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF1dG9QbGFjZUJ1dHRvbicpXG5jb25zdCBzdGFydEdhbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnRHYW1lQnV0dG9uJylcbmNvbnN0IHRvdGFsU2hpcHMgPSA1XG5cbmxldCBnYW1lU3RhcnRlZCA9IGZhbHNlXG5sZXQgY3VycmVudFBsYXllclR1cm4gPSBwbGF5ZXJPbmVcbmxldCBjdXJyU2hpcExlbmd0aEluZGV4ID0gMFxubGV0IGhvdmVyZWRFbGVtcyA9IFtdXG5sZXQgaG92ZXJlZFBvcyA9IFtdXG5cbmNvbnN0IGF0dGFja1Bvc2l0aW9uID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHBvcyA9IGV2ZW50LnRhcmdldFxuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKHBvcy5nZXRBdHRyaWJ1dGUoJ3gnKSksIE51bWJlcihwb3MuZ2V0QXR0cmlidXRlKCd5JykpXVxuXG5cbiAgcG9zLmNsYXNzTGlzdC5hZGQoJ2hpdCcpXG5cbiAgY29uc29sZS5sb2coeCwgeSlcbn1cblxuXG5jb25zdCBjbGVhckhvdmVyRWxlbUNvbG9ycyA9ICgpID0+IHtcbiAgaG92ZXJlZEVsZW1zLmZvckVhY2goKGVsZW0pID0+IGVsZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyM1Nzc1QjAnKVxuICBob3ZlcmVkRWxlbXMgPSBbXVxuICBob3ZlcmVkUG9zID0gW11cbn1cblxuY29uc3QgY2xlYXJBbGxFbGVtQ29sb3JzID0gKHBsYXllcikgPT4ge1xuICBjb25zdCBhbGxQb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtwbGF5ZXIuZ2V0UGxheWVyTGFiZWwoKX0gLnBvc2l0aW9uYClcbiAgYWxsUG9zLmZvckVhY2goKGVsZW0pID0+IGVsZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyM1Nzc1QjAnKVxuICBob3ZlcmVkRWxlbXMgPSBbXVxuICBob3ZlcmVkUG9zID0gW11cbiAgY3VyclNoaXBMZW5ndGhJbmRleCA9IDBcbn1cblxuXG5cbmNvbnN0IGNsZWFyR2FtZWJvYXJkID0gKHBsYXllcikgPT4ge1xuICBwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkuY2xlYXJHYW1lYm9hcmQoKVxuICBnYW1lU3RhcnRlZCA9IGZhbHNlXG4gIGNsZWFyQWxsRWxlbUNvbG9ycyhwbGF5ZXIpXG59XG5cbmNvbnN0IHN0YXJ0R2FtZSA9ICgpID0+IHtcblxuICBpZiAocGxheWVyT25lLmdldEdhbWVib2FyZCgpLmdldFBsYWNlZFNoaXBzKCkubGVuZ3RoIDwgNSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgaGFuZGxlQ29tcHV0ZXJQbGFjZW1lbnQoKVxuXG4gIGNvbnN0IGdhbWVib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkcycpXG4gIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQnKVxuICBjb25zdCBwbGF5ZXJUd29HYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyVHdvJylcblxuICBnYW1lYm9hcmRzLmNsYXNzTGlzdC5yZW1vdmUoJ2NlbnRlckdhbWVib2FyZHMnKVxuICBnYW1lYm9hcmQuY2xhc3NMaXN0LnJlbW92ZSgncGxhY2luZ1NoaXBzJylcbiAgcGxheWVyVHdvR2FtZWJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXllclR3b0dhbWVOb3RTdGFydGVkJylcblxuICBjb25zb2xlLmxvZygnQWxsIG9mIHBsYXllck9uZXMgc2hpcHMgaGF2ZSBiZWVuIHBsYWNlZC4nKVxuICBnYW1lU3RhcnRlZCA9IHRydWVcblxufVxuXG5jb25zdCBoYW5kbGVIb3ZlclBvc2l0aW9uID0gKGV2ZW50KSA9PiB7XG4gIGNsZWFySG92ZXJFbGVtQ29sb3JzKClcbiAgaWYoZ2FtZVN0YXJ0ZWQgPT09IGZhbHNlKSB7XG4gICAgY29uc3QgZWxlbSA9IGV2ZW50LnRhcmdldFxuICAgIHBsYWNlU2hpcChlbGVtLCBheGlzKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBwbGFjZVNoaXAgPSAoZWxlbSwgYXhpcykgPT4ge1xuXG4gIGlmIChnYW1lU3RhcnRlZCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3Qgc2hpcExlbiA9IHNoaXBMZW5ndGhzW2N1cnJTaGlwTGVuZ3RoSW5kZXhdXG5cbiAgaWYgKGF4aXMgPT09ICdYJykge1xuICAgIGlmICh2YWxpZFNoaXBIb3ZlcihzaGlwTGVuLCBlbGVtLCBheGlzLCBjdXJyZW50UGxheWVyVHVybikpIHtcbiAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZFNoaXBQbGFjZW1lbnQnKVxuICAgICAgcGxhY2VTaGlwWChzaGlwTGVuLCBlbGVtLCBjdXJyZW50UGxheWVyVHVybilcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ0NIQU5HTkcgQ1VSU09SJylcbiAgICAgIGNvbnNvbGUubG9nKGVsZW0pXG4gICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2ludmFsaWRTaGlwUGxhY2VtZW50JylcbiAgICB9XG4gIH0gZWxzZSBpZiAoYXhpcyA9PT0gJ1knKSB7XG4gICAgaWYgKHZhbGlkU2hpcEhvdmVyKHNoaXBMZW4sIGVsZW0sIGF4aXMsIGN1cnJlbnRQbGF5ZXJUdXJuKSkge1xuICAgICAgcGxhY2VTaGlwWShzaGlwTGVuLCBlbGVtLCBjdXJyZW50UGxheWVyVHVybilcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgcGxhY2VTaGlwWCA9IChzaGlwTGVuLCBlbGVtLCBjdXJyZW50UGxheWVyVHVybikgPT4ge1xuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3knKSldXG4gIGNvbnN0IGZpbmFsU2hpcFBvc2l0aW9uWCA9ICh4ICsgc2hpcExlbikgLSAxXG5cbiAgY29uc29sZS5sb2coZWxlbSlcblxuICBpZiAoZmluYWxTaGlwUG9zaXRpb25YIDw9IDkpIHtcblxuICAgIGZvcihsZXQgaSA9IHg7IGkgPD0gZmluYWxTaGlwUG9zaXRpb25YOyBpKyspIHtcbiAgICAgIGxldCBwbGF5ZXJOdW0gPSAwXG5cbiAgICAgIGlmIChjdXJyZW50UGxheWVyVHVybi5nZXRQbGF5ZXJMYWJlbCgpID09PSAncGxheWVyVHdvJykge1xuICAgICAgICBwbGF5ZXJOdW0gPSAxXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbeD1cIiR7aX1cIl1beT1cIiR7eX1cIl1gKVtwbGF5ZXJOdW1dXG4gICAgICBob3ZlcmVkRWxlbXMucHVzaChlbGVtKVxuICAgICAgZWxlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnXG5cbiAgICAgIGNvbnNvbGUubG9nKCdoZWxsbyB3cm9sZCcpXG4gICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbeD1cIiR7aX1cIl1beT1cIiR7eX1cIl1gKSlcbiAgICB9XG5cbiAgfVxufVxuXG5jb25zdCBwbGFjZVNoaXBZID0gKHNoaXBMZW4sIHBvcywgY3VycmVudFBsYXllclR1cm4pID0+IHtcbiAgY29uc3QgW3gsIHldID0gW051bWJlcihwb3MuZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIocG9zLmdldEF0dHJpYnV0ZSgneScpKV1cbiAgY29uc3QgZmluYWxTaGlwUG9zaXRpb25ZID0gKHkgKyBzaGlwTGVuKSAtIDFcblxuICBpZiAoZmluYWxTaGlwUG9zaXRpb25ZIDw9IDkpIHtcbiAgICBsZXQgcGxheWVyTnVtID0gMFxuXG4gICAgaWYgKGN1cnJlbnRQbGF5ZXJUdXJuLmdldFBsYXllckxhYmVsKCkgPT09ICdwbGF5ZXJUd28nKSB7XG4gICAgICBwbGF5ZXJOdW0gPSAxXG4gICAgfVxuXG4gICAgZm9yKGxldCBpID0geTsgaSA8PSBmaW5hbFNoaXBQb3NpdGlvblk7IGkrKykge1xuICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFt4PVwiJHt4fVwiXVt5PVwiJHtpfVwiXWApW3BsYXllck51bV1cbiAgICAgIGhvdmVyZWRFbGVtcy5wdXNoKGVsZW0pXG4gICAgICBlbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSdcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgZmluYWxpemVTaGlwUGxhY2VtZW50ID0gKCkgPT4ge1xuICAvLyBsb29wXG4gIGNvbnNvbGUubG9nKCdwbGFjaW5nIHNoaXAnKVxuICBjb25zb2xlLmxvZyhnYW1lU3RhcnRlZClcblxuICBpZiAoZ2FtZVN0YXJ0ZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBzaGlwTGVuID0gaG92ZXJlZEVsZW1zLmxlbmd0aFxuICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbiwgYXhpcylcbiAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdXG5cbiAgaG92ZXJlZEVsZW1zLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICBjb25zdCB4ID0gTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpXG4gICAgY29uc3QgeSA9IE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneScpKVxuICAgIHNoaXBQb3NpdGlvbnMucHVzaChbe3gsIHksIGhpdDogZmFsc2V9XSlcbiAgfSlcblxuICBzaGlwLnNldFBvc2l0aW9ucyhzaGlwUG9zaXRpb25zKVxuXG4gIGlmICh2YWxpZFNoaXBQbGFjZW1lbnQoY3VycmVudFBsYXllclR1cm4sIHNoaXApKSB7XG4gICAgXG4gICAgY3VycmVudFBsYXllclR1cm4uZ2V0R2FtZWJvYXJkKCkucGxhY2VTaGlwKHNoaXApXG5cbiAgICBob3ZlcmVkRWxlbXMgPSBbXVxuICAgIGN1cnJTaGlwTGVuZ3RoSW5kZXggKz0gMVxuICB9XG5cbiAgY29uc29sZS5sb2coY3VycmVudFBsYXllclR1cm4uZ2V0R2FtZWJvYXJkKCkuZ2V0UGxhY2VkU2hpcHMoKSlcbn1cblxuY29uc3QgaGFuZGxlQ29tcHV0ZXJQbGFjZW1lbnQgPSAoKSA9PiB7XG4gIGN1cnJlbnRQbGF5ZXJUdXJuID0gcGxheWVyVHdvXG4gIGhhbmRsZUF1dG9QbGFjZSgpXG4gIGN1cnJlbnRQbGF5ZXJUdXJuID0gcGxheWVyT25lXG59XG5cbmNvbnN0IGhhbmRsZUF1dG9QbGFjZSA9ICgpID0+IHtcbiAgY2xlYXJHYW1lYm9hcmQoY3VycmVudFBsYXllclR1cm4pXG4gIGF1dG9QbGFjZUFsbFNoaXBzKGN1cnJlbnRQbGF5ZXJUdXJuLCBnYW1lU3RhcnRlZCwgdG90YWxTaGlwcywgYXhpcylcbn1cblxuXG5jb25zdCBkaXNwbGF5R2FtZWJvYXJkID0gKHBsYXllcikgPT4ge1xuICBjb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZHMnKVxuICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkJywgcGxheWVyKVxuXG4gIGlmIChwbGF5ZXIgPT09ICdwbGF5ZXJPbmUnKSB7XG4gICAgZ2FtZWJvYXJkcy5jbGFzc0xpc3QuYWRkKCdjZW50ZXJHYW1lYm9hcmRzJylcbiAgICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgncGxhY2luZ1NoaXBzJylcbiAgfSBlbHNlIGlmIChwbGF5ZXIgPT09ICdwbGF5ZXJUd28nKSB7XG4gICAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoJ3BsYXllclR3b0dhbWVOb3RTdGFydGVkJylcbiAgfVxuICBcbiAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XG4gICAgXG4gICAgZm9yKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcbiAgICAgIGxldCBwb3NpdGlvbkVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgcG9zaXRpb25FbGVtLnNldEF0dHJpYnV0ZSgneCcsIHgpXG4gICAgICBwb3NpdGlvbkVsZW0uc2V0QXR0cmlidXRlKCd5JywgeSlcbiAgICAgIHBvc2l0aW9uRWxlbS5jbGFzc0xpc3QuYWRkKCdwb3NpdGlvbicpXG5cbiAgICAgIHBvc2l0aW9uRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZpbmFsaXplU2hpcFBsYWNlbWVudClcbiAgICAgIHBvc2l0aW9uRWxlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBoYW5kbGVIb3ZlclBvc2l0aW9uKVxuICAgICAgXG4gICAgICBnYW1lYm9hcmQuYXBwZW5kKHBvc2l0aW9uRWxlbSlcbiAgICB9XG4gIH1cblxuICBnYW1lYm9hcmRzLmFwcGVuZChnYW1lYm9hcmQpXG59XG5cbmRpc3BsYXlHYW1lYm9hcmQocGxheWVyT25lLnBsYXllckxhYmVsKVxuZGlzcGxheUdhbWVib2FyZChwbGF5ZXJUd28ucGxheWVyTGFiZWwpXG5cbmF1dG9QbGFjZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUF1dG9QbGFjZSlcbnN0YXJ0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0R2FtZSkiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=