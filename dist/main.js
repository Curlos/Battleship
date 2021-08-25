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

  console.log('hello player one')

  let numOfPlacedShips = player.getGameboard().getPlacedShips().length

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
  if (currentPlayerTurn.playerLabel === 'playerOne') {
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
  } else if (currentPlayerTurn === 'playerTwo') {

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
      placeShipX(shipLen, elem)
    } else {
      console.log('CHANGNG CURSOR')
      console.log(elem)
      elem.classList.add('invalidShipPlacement')
    }
  } else if (axis === 'Y') {
    if ((0,_gameHelpers_validShipHover__WEBPACK_IMPORTED_MODULE_5__.default)(shipLen, elem, axis, currentPlayerTurn)) {
      placeShipY(shipLen, elem)
    }
  }
}

const placeShipX = (shipLen, elem) => {
  const [x, y] = [Number(elem.getAttribute('x')), Number(elem.getAttribute('y'))]
  const finalShipPositionX = (x + shipLen) - 1

  if (finalShipPositionX <= 9) {

    for(let i = x; i <= finalShipPositionX; i++) {
      const elem = document.querySelectorAll(`[x="${i}"][y="${y}"]`)[0]
      hoveredElems.push(elem)
      elem.style.backgroundColor = 'white'
    }

  }
}

const placeShipY = (shipLen, pos) => {
  const [x, y] = [Number(pos.getAttribute('x')), Number(pos.getAttribute('y'))]
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

const finalizeShipPlacement = () => {

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
    
    playerOne.getGameboard().placeShip(ship)

    hoveredElems = []
    currShipLengthIndex += 1
  }

  console.log(playerOne.getGameboard().getPlacedShips())
}

const handleAutoPlaceClick = () => {
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

autoPlaceButton.addEventListener('click', handleAutoPlaceClick)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7O1VDbk5BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jbGFzc2VzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NsYXNzZXMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY2xhc3Nlcy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUhlbHBlcnMvYXV0b1BsYWNlQWxsU2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lSGVscGVycy9jcmVhdGVTaGlwV2l0aFBvcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVIZWxwZXJzL3ZhbGlkU2hpcEhvdmVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUhlbHBlcnMvdmFsaWRTaGlwUGxhY2VtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBHYW1lYm9hcmQge1xuICBwb3NpdGlvbnMgPSBbXTtcbiAgcGxhY2VkU2hpcHMgPSBbXTtcblxuICBjbGVhckdhbWVib2FyZCgpIHtcbiAgICB0aGlzLnBvc2l0aW9ucyA9IFtdXG4gICAgdGhpcy5wbGFjZWRTaGlwcyA9IFtdXG4gIH1cblxuICBnZXRQbGFjZWRTaGlwcygpIHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZWRTaGlwc1xuICB9XG5cbiAgcGxhY2VTaGlwKHNoaXApIHtcbiAgICB0aGlzLnBsYWNlZFNoaXBzLnB1c2goc2hpcClcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmRzKSB7XG5cbiAgfVxufSIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vR2FtZWJvYXJkJ1xuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gIG5hbWU7XG4gIHBsYXllckxhYmVsO1xuICBnYW1lYm9hcmQ7XG4gIHdvbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIHBsYXllckxhYmVsKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnBsYXllckxhYmVsID0gcGxheWVyTGFiZWxcbiAgICB0aGlzLmdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKVxuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lXG4gIH1cblxuICBnZXRQbGF5ZXJMYWJlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5ZXJMYWJlbFxuICB9XG5cbiAgZ2V0R2FtZWJvYXJkKCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVib2FyZFxuICB9XG5cbiAgaGFzV29uKCkge1xuICAgIHJldHVybiB0aGlzLndvblxuICB9XG59IiwiY2xhc3MgU2hpcCB7XG4gIGxlbmd0aDtcbiAgYXhpcztcbiAgcG9zaXRpb25zID0gW107XG5cbiAgY29uc3RydWN0b3IobGVuZ3RoLCBheGlzKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGhcbiAgICB0aGlzLmF4aXMgPSBheGlzXG4gICAgdGhpcy5wb3NpdGlvbnNIaXQgPSBbXVxuICB9XG5cbiAgZ2V0TGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aFxuICB9XG5cbiAgZ2V0QXhpcygpIHtcbiAgICByZXR1cm4gdGhpcy5heGlzXG4gIH1cblxuICBnZXRQb3NpdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25zXG4gIH1cblxuICBnZXRQb3NpdGlvbnNIaXQoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25zLmZpbHRlcigocG9zaXRpb24pID0+IHBvc2l0aW9uLmhpdCAhPSB0cnVlKVxuICB9XG5cbiAgZ2V0Rmlyc3RQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbnNbMF1bMF1cbiAgfVxuXG4gIGdldExhc3RQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbnNbdGhpcy5wb3NpdGlvbnMubGVuZ3RoIC0gMV1bMF1cbiAgfVxuXG4gIHNldFBvc2l0aW9ucyhwb3NpdGlvbnMpIHtcbiAgICBpZihwb3NpdGlvbnMubGVuZ3RoID09PSB0aGlzLmxlbmd0aCkge1xuICAgICAgdGhpcy5wb3NpdGlvbnMgPSBwb3NpdGlvbnNcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdTaGlwIGNhbm5vdCBmaXQhJ1xuICAgIH1cbiAgfVxuXG4gIGhpdChwb3NpdGlvbk51bSkge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbnMuZmluZChwb3NpdGlvbiA9PiBwb3NpdGlvbi54ID09PSBwb3NpdGlvbk51bVswXSAmJiBwb3NpdGlvbi55ID09PSBwb3NpdGlvblsxXSlcbiAgICBwb3NpdGlvbi5oaXQgPSB0cnVlXG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgY29uc3QgcG9zaXRpb25zTGVmdCA9IHRoaXMucG9zaXRpb25zLmZpbHRlcigocG9zaXRpb24pID0+IHBvc2l0aW9uLmhpdCAhPSB0cnVlKVxuICAgIHJldHVybiBwb3NpdGlvbnNMZWZ0ID09PSAwXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNoaXAsXG59IiwiaW1wb3J0IHsgcGxhY2VTaGlwIH0gZnJvbSAnLi4vaW5kZXgnXG5cbmNvbnN0IGdldFJhbmRvbUludCA9IChtaW4sIG1heCkgPT4ge1xuICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbn1cblxuZXhwb3J0IGNvbnN0IGF1dG9QbGFjZUFsbFNoaXBzID0gKHBsYXllciwgZ2FtZVN0YXJ0ZWQsIHRvdGFsU2hpcHMsIGF4aXMpID0+IHtcbiAgaWYgKGdhbWVTdGFydGVkKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtwbGF5ZXIuZ2V0UGxheWVyTGFiZWwoKX1gKVxuXG4gIGNvbnNvbGUubG9nKCdoZWxsbyBwbGF5ZXIgb25lJylcblxuICBsZXQgbnVtT2ZQbGFjZWRTaGlwcyA9IHBsYXllci5nZXRHYW1lYm9hcmQoKS5nZXRQbGFjZWRTaGlwcygpLmxlbmd0aFxuXG4gIHdoaWxlIChudW1PZlBsYWNlZFNoaXBzIDwgdG90YWxTaGlwcykge1xuICAgIGNvbnN0IHggPSBnZXRSYW5kb21JbnQoMCwgOSlcbiAgICBjb25zdCB5ID0gZ2V0UmFuZG9tSW50KDAsIDkpXG5cbiAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3g9XCIke3h9XCJdW3k9XCIke3l9XCJdYClbMF1cbiAgICBwbGFjZVNoaXAoZWxlbSwgYXhpcylcbiAgICBlbGVtLmNsaWNrKClcblxuICAgIG51bU9mUGxhY2VkU2hpcHMgPSBPYmplY3QudmFsdWVzKHBsYXllci5nZXRHYW1lYm9hcmQoKS5nZXRQbGFjZWRTaGlwcygpKS5sZW5ndGhcbiAgfVxuXG4gIGNvbnNvbGUubG9nKGdhbWVib2FyZClcbn0iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi4vY2xhc3Nlcy9TaGlwJ1xuXG5jb25zdCBjcmVhdGVTaGlwV2l0aFBvcyA9IChwb3NpdGlvbnMsIGF4aXMpID0+IHtcbiAgY29uc3Qgc2hpcExlbiA9IHBvc2l0aW9ucy5sZW5ndGhcbiAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKHNoaXBMZW4sIGF4aXMpXG4gIGNvbnN0IHNoaXBQb3NpdGlvbnMgPSBbXVxuXG4gIHBvc2l0aW9ucy5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xuICAgIGNvbnN0IHt4LCB5fSA9IHBvc2l0aW9uXG4gICAgc2hpcFBvc2l0aW9ucy5wdXNoKFt7eCwgeSwgaGl0OiBmYWxzZX1dKVxuICB9KVxuXG4gIHNoaXAuc2V0UG9zaXRpb25zKHNoaXBQb3NpdGlvbnMpXG5cbiAgcmV0dXJuIHNoaXBcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2hpcFdpdGhQb3MiLCJpbXBvcnQgY3JlYXRlU2hpcFdpdGhQb3MgZnJvbSAnLi9jcmVhdGVTaGlwV2l0aFBvcydcbmltcG9ydCB2YWxpZFNoaXBQbGFjZW1lbnQgZnJvbSAnLi92YWxpZFNoaXBQbGFjZW1lbnQnXG5cbmNvbnN0IHZhbGlkU2hpcEhvdmVyID0gKHNoaXBMZW4sIGVsZW0sIGF4aXMsIGN1cnJlbnRQbGF5ZXJUdXJuKSA9PiB7XG4gIGNvbnN0IGhvdmVyZWRQb3MgPSBheGlzID09PSAnWCcgPyBnZXRIb3ZlcmVkUG9zWChlbGVtLCBzaGlwTGVuKSA6IGdldEhvdmVyZWRQb3NZKGVsZW0sIHNoaXBMZW4pXG4gIGNvbnN0IHNoaXAgPSBjcmVhdGVTaGlwV2l0aFBvcyhob3ZlcmVkUG9zLCBheGlzKVxuXG4gIHJldHVybiB2YWxpZFNoaXBQbGFjZW1lbnQoY3VycmVudFBsYXllclR1cm4sIHNoaXApXG59XG5cbmNvbnN0IGdldEhvdmVyZWRQb3NYID0gKGVsZW0sIHNoaXBMZW4pID0+IHtcbiAgY29uc3QgW3gsIHldID0gW051bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneCcpKSwgTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd5JykpXVxuICBjb25zdCBmaW5hbFNoaXBQb3NpdGlvblggPSAoeCArIHNoaXBMZW4pIC0gMVxuICBjb25zdCBob3ZlcmVkUG9zID0gW11cblxuICBpZiAoZmluYWxTaGlwUG9zaXRpb25YIDw9IDkpIHtcbiAgICBmb3IobGV0IGkgPSB4OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWDsgaSsrKSB7XG4gICAgICBob3ZlcmVkUG9zLnB1c2goe3g6IGksIHl9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBob3ZlcmVkUG9zXG59XG5cbmNvbnN0IGdldEhvdmVyZWRQb3NZID0gKGVsZW0sIHNoaXBMZW4pID0+IHtcbiAgY29uc3QgW3gsIHldID0gW051bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneCcpKSwgTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd5JykpXVxuICBjb25zdCBmaW5hbFNoaXBQb3NpdGlvblkgPSAoeSArIHNoaXBMZW4pIC0gMVxuICBjb25zdCBob3ZlcmVkUG9zID0gW11cblxuICBpZiAoZmluYWxTaGlwUG9zaXRpb25ZIDw9IDkpIHtcbiAgICBmb3IobGV0IGkgPSB5OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWTsgaSsrKSB7XG4gICAgICBob3ZlcmVkUG9zLnB1c2goe3gsIHk6IGl9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBob3ZlcmVkUG9zXG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkU2hpcEhvdmVyIiwiY29uc3QgdmFsaWRTaGlwUGxhY2VtZW50ID0gKGN1cnJlbnRQbGF5ZXJUdXJuLCBzaGlwKSA9PiB7XG4gIGlmIChjdXJyZW50UGxheWVyVHVybi5wbGF5ZXJMYWJlbCA9PT0gJ3BsYXllck9uZScpIHtcbiAgICBjb25zdCBwbGFjZWRTaGlwcyA9IGN1cnJlbnRQbGF5ZXJUdXJuLmdldEdhbWVib2FyZCgpLmdldFBsYWNlZFNoaXBzKClcbiAgICBpZiAoc2hpcC5nZXRQb3NpdGlvbnMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmIChzaGlwLmdldEF4aXMoKSA9PT0gJ1gnKSB7XG4gICAgICBcbiAgICAgIGZvciAobGV0IHBsYWNlZFNoaXAgb2YgcGxhY2VkU2hpcHMpIHtcbiAgICAgICAgaWYgKHZhbGlkYXRlU2hpcFdpdGhYKHNoaXAsIHBsYWNlZFNoaXApID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzaGlwLmdldEF4aXMoKSA9PT0gJ1knKSB7XG4gICAgICBmb3IgKGxldCBwbGFjZWRTaGlwIG9mIHBsYWNlZFNoaXBzKSB7XG4gICAgICAgIGlmICh2YWxpZGF0ZVNoaXBXaXRoWShzaGlwLCBwbGFjZWRTaGlwKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChjdXJyZW50UGxheWVyVHVybiA9PT0gJ3BsYXllclR3bycpIHtcblxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3QgdmFsaWRhdGVTaGlwV2l0aFggPSAoc2hpcCwgcGxhY2VkU2hpcCkgPT4ge1xuICBpZiAocGxhY2VkU2hpcC5nZXRBeGlzKCkgPT09IHNoaXAuZ2V0QXhpcygpKSB7XG4gICAgY29uc3QgeyB4OiBzaGlwU3RhcnRQb3NYLCB5OiBzaGlwU3RhcnRQb3NZIH0gPSBzaGlwLmdldEZpcnN0UG9zaXRpb24oKVxuICAgIGNvbnN0IHsgeDogc2hpcEVuZFBvc1gsIHk6IHNoaXBFbmRQb3NZIH0gPSBzaGlwLmdldExhc3RQb3NpdGlvbigpXG4gICAgY29uc3QgeyB4OiBwbGFjZWRTdGFydFBvc1gsIHk6IHBsYWNlZFN0YXJ0UG9zWSB9ID0gcGxhY2VkU2hpcC5nZXRGaXJzdFBvc2l0aW9uKClcbiAgICBjb25zdCB7IHg6IHBsYWNlZEVuZFBvc1gsIHk6IHBsYWNlZEVuZFBvc1kgfSA9IHBsYWNlZFNoaXAuZ2V0TGFzdFBvc2l0aW9uKClcbiAgICBcbiAgICBpZiAoc2hpcFN0YXJ0UG9zWSA9PT0gcGxhY2VkU3RhcnRQb3NZKSB7XG4gICAgICBpZiAoc2hpcFN0YXJ0UG9zWCA+PSBwbGFjZWRTdGFydFBvc1ggJiYgc2hpcFN0YXJ0UG9zWCA8PSBwbGFjZWRFbmRQb3NYKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICBpZiAoc2hpcEVuZFBvc1ggPj0gcGxhY2VkU3RhcnRQb3NYICYmIHNoaXBFbmRQb3NYIDw9IHBsYWNlZEVuZFBvc1gpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3QgdmFsaWRhdGVTaGlwV2l0aFkgPSAoc2hpcCwgcGxhY2VkU2hpcCkgPT4ge1xuICBjb25zdCB7IHg6IHNoaXBTdGFydFBvc1gsIHk6IHNoaXBTdGFydFBvc1kgfSA9IHNoaXAuZ2V0Rmlyc3RQb3NpdGlvbigpXG4gIGNvbnN0IHsgeDogc2hpcEVuZFBvc1gsIHk6IHNoaXBFbmRQb3NZIH0gPSBzaGlwLmdldExhc3RQb3NpdGlvbigpXG4gIGNvbnN0IHsgeDogcGxhY2VkU3RhcnRQb3NYLCB5OiBwbGFjZWRTdGFydFBvc1kgfSA9IHBsYWNlZFNoaXAuZ2V0Rmlyc3RQb3NpdGlvbigpXG4gIGNvbnN0IHsgeDogcGxhY2VkRW5kUG9zWCwgeTogcGxhY2VkRW5kUG9zWSB9ID0gcGxhY2VkU2hpcC5nZXRMYXN0UG9zaXRpb24oKVxuICBcbiAgaWYgKHNoaXBTdGFydFBvc1ggPT09IHBsYWNlZFN0YXJ0UG9zWCkge1xuICAgIFxuICAgIGlmIChzaGlwU3RhcnRQb3NZID49IHBsYWNlZFN0YXJ0UG9zWSAmJiBzaGlwU3RhcnRQb3NZIDw9IHBsYWNlZEVuZFBvc1kpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAoc2hpcFN0YXJ0UG9zWSA+PSBwbGFjZWRTdGFydFBvc1kgJiYgc2hpcFN0YXJ0UG9zWSA8PSBwbGFjZWRFbmRQb3NZKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKHNoaXBFbmRQb3NZID49IHBsYWNlZFN0YXJ0UG9zWSAmJiBzaGlwRW5kUG9zWSA8PSBwbGFjZWRFbmRQb3NZKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZFNoaXBQbGFjZW1lbnQiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9jbGFzc2VzL1NoaXAnXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2NsYXNzZXMvR2FtZWJvYXJkJ1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9jbGFzc2VzL1BsYXllcidcbmltcG9ydCB2YWxpZFNoaXBQbGFjZW1lbnQgZnJvbSAnLi9nYW1lSGVscGVycy92YWxpZFNoaXBQbGFjZW1lbnQnXG5pbXBvcnQgY3JlYXRlU2hpcFdpdGhQb3MgZnJvbSAnLi9nYW1lSGVscGVycy9jcmVhdGVTaGlwV2l0aFBvcydcbmltcG9ydCB2YWxpZFNoaXBIb3ZlciBmcm9tICcuL2dhbWVIZWxwZXJzL3ZhbGlkU2hpcEhvdmVyJ1xuaW1wb3J0IHsgYXV0b1BsYWNlQWxsU2hpcHMgfSBmcm9tICcuL2dhbWVIZWxwZXJzL2F1dG9QbGFjZUFsbFNoaXBzJ1xuXG5jb25zdCBwbGF5ZXJPbmUgPSBuZXcgUGxheWVyKCdDYXJsb3MnLCAncGxheWVyT25lJylcbmNvbnN0IHBsYXllclR3byA9IG5ldyBQbGF5ZXIoJ0FudGhvbnknLCAncGxheWVyVHdvJylcbmNvbnN0IGF4aXNPcHRpb25zID0gWydYJywgJ1knXVxuY29uc3QgYXhpcyA9ICdYJ1xuY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl1cbmNvbnN0IGF1dG9QbGFjZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdXRvUGxhY2VCdXR0b24nKVxuY29uc3Qgc3RhcnRHYW1lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0R2FtZUJ1dHRvbicpXG5jb25zdCB0b3RhbFNoaXBzID0gNVxuXG5sZXQgZ2FtZVN0YXJ0ZWQgPSBmYWxzZVxubGV0IGN1cnJlbnRQbGF5ZXJUdXJuID0gcGxheWVyT25lXG5sZXQgY3VyclNoaXBMZW5ndGhJbmRleCA9IDBcbmxldCBob3ZlcmVkRWxlbXMgPSBbXVxubGV0IGhvdmVyZWRQb3MgPSBbXVxuXG5jb25zdCBhdHRhY2tQb3NpdGlvbiA9IChldmVudCkgPT4ge1xuICBjb25zdCBwb3MgPSBldmVudC50YXJnZXRcbiAgY29uc3QgW3gsIHldID0gW051bWJlcihwb3MuZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIocG9zLmdldEF0dHJpYnV0ZSgneScpKV1cblxuXG4gIHBvcy5jbGFzc0xpc3QuYWRkKCdoaXQnKVxuXG4gIGNvbnNvbGUubG9nKHgsIHkpXG59XG5cblxuY29uc3QgY2xlYXJIb3ZlckVsZW1Db2xvcnMgPSAoKSA9PiB7XG4gIGhvdmVyZWRFbGVtcy5mb3JFYWNoKChlbGVtKSA9PiBlbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjNTc3NUIwJylcbiAgaG92ZXJlZEVsZW1zID0gW11cbiAgaG92ZXJlZFBvcyA9IFtdXG59XG5cbmNvbnN0IGNsZWFyQWxsRWxlbUNvbG9ycyA9IChwbGF5ZXIpID0+IHtcbiAgY29uc3QgYWxsUG9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7cGxheWVyLmdldFBsYXllckxhYmVsKCl9IC5wb3NpdGlvbmApXG4gIGFsbFBvcy5mb3JFYWNoKChlbGVtKSA9PiBlbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjNTc3NUIwJylcbiAgaG92ZXJlZEVsZW1zID0gW11cbiAgaG92ZXJlZFBvcyA9IFtdXG4gIGN1cnJTaGlwTGVuZ3RoSW5kZXggPSAwXG59XG5cblxuXG5jb25zdCBjbGVhckdhbWVib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgcGxheWVyLmdldEdhbWVib2FyZCgpLmNsZWFyR2FtZWJvYXJkKClcbiAgZ2FtZVN0YXJ0ZWQgPSBmYWxzZVxuICBjbGVhckFsbEVsZW1Db2xvcnMocGxheWVyKVxufVxuXG5jb25zdCBzdGFydEdhbWUgPSAoKSA9PiB7XG5cbiAgaWYgKHBsYXllck9uZS5nZXRHYW1lYm9hcmQoKS5nZXRQbGFjZWRTaGlwcygpLmxlbmd0aCA8IDUpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGdhbWVib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkcycpXG4gIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQnKVxuICBjb25zdCBwbGF5ZXJUd29HYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyVHdvJylcblxuICBnYW1lYm9hcmRzLmNsYXNzTGlzdC5yZW1vdmUoJ2NlbnRlckdhbWVib2FyZHMnKVxuICBnYW1lYm9hcmQuY2xhc3NMaXN0LnJlbW92ZSgncGxhY2luZ1NoaXBzJylcbiAgcGxheWVyVHdvR2FtZWJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXllclR3b0dhbWVOb3RTdGFydGVkJylcblxuICBjb25zb2xlLmxvZygnQWxsIG9mIHBsYXllck9uZXMgc2hpcHMgaGF2ZSBiZWVuIHBsYWNlZC4nKVxuICBnYW1lU3RhcnRlZCA9IHRydWVcblxufVxuXG5jb25zdCBoYW5kbGVIb3ZlclBvc2l0aW9uID0gKGV2ZW50KSA9PiB7XG4gIGNsZWFySG92ZXJFbGVtQ29sb3JzKClcbiAgaWYoZ2FtZVN0YXJ0ZWQgPT09IGZhbHNlKSB7XG4gICAgY29uc3QgZWxlbSA9IGV2ZW50LnRhcmdldFxuICAgIHBsYWNlU2hpcChlbGVtLCBheGlzKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBwbGFjZVNoaXAgPSAoZWxlbSwgYXhpcykgPT4ge1xuXG4gIGlmIChnYW1lU3RhcnRlZCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3Qgc2hpcExlbiA9IHNoaXBMZW5ndGhzW2N1cnJTaGlwTGVuZ3RoSW5kZXhdXG5cbiAgaWYgKGF4aXMgPT09ICdYJykge1xuICAgIGlmICh2YWxpZFNoaXBIb3ZlcihzaGlwTGVuLCBlbGVtLCBheGlzLCBjdXJyZW50UGxheWVyVHVybikpIHtcbiAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZFNoaXBQbGFjZW1lbnQnKVxuICAgICAgcGxhY2VTaGlwWChzaGlwTGVuLCBlbGVtKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnQ0hBTkdORyBDVVJTT1InKVxuICAgICAgY29uc29sZS5sb2coZWxlbSlcbiAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnaW52YWxpZFNoaXBQbGFjZW1lbnQnKVxuICAgIH1cbiAgfSBlbHNlIGlmIChheGlzID09PSAnWScpIHtcbiAgICBpZiAodmFsaWRTaGlwSG92ZXIoc2hpcExlbiwgZWxlbSwgYXhpcywgY3VycmVudFBsYXllclR1cm4pKSB7XG4gICAgICBwbGFjZVNoaXBZKHNoaXBMZW4sIGVsZW0pXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHBsYWNlU2hpcFggPSAoc2hpcExlbiwgZWxlbSkgPT4ge1xuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3knKSldXG4gIGNvbnN0IGZpbmFsU2hpcFBvc2l0aW9uWCA9ICh4ICsgc2hpcExlbikgLSAxXG5cbiAgaWYgKGZpbmFsU2hpcFBvc2l0aW9uWCA8PSA5KSB7XG5cbiAgICBmb3IobGV0IGkgPSB4OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWDsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3g9XCIke2l9XCJdW3k9XCIke3l9XCJdYClbMF1cbiAgICAgIGhvdmVyZWRFbGVtcy5wdXNoKGVsZW0pXG4gICAgICBlbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSdcbiAgICB9XG5cbiAgfVxufVxuXG5jb25zdCBwbGFjZVNoaXBZID0gKHNoaXBMZW4sIHBvcykgPT4ge1xuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKHBvcy5nZXRBdHRyaWJ1dGUoJ3gnKSksIE51bWJlcihwb3MuZ2V0QXR0cmlidXRlKCd5JykpXVxuICBjb25zdCBmaW5hbFNoaXBQb3NpdGlvblkgPSAoeSArIHNoaXBMZW4pIC0gMVxuXG4gIGlmIChmaW5hbFNoaXBQb3NpdGlvblkgPD0gOSkge1xuICAgIGNvbnNvbGUubG9nKHgsIHkpXG5cbiAgICBmb3IobGV0IGkgPSB5OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWTsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3g9XCIke3h9XCJdW3k9XCIke2l9XCJdYClbMF1cbiAgICAgIGhvdmVyZWRFbGVtcy5wdXNoKGVsZW0pXG4gICAgICBlbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSdcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgZmluYWxpemVTaGlwUGxhY2VtZW50ID0gKCkgPT4ge1xuXG4gIGNvbnNvbGUubG9nKCdwbGFjaW5nIHNoaXAnKVxuICBjb25zb2xlLmxvZyhnYW1lU3RhcnRlZClcblxuICBpZiAoZ2FtZVN0YXJ0ZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBzaGlwTGVuID0gaG92ZXJlZEVsZW1zLmxlbmd0aFxuICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbiwgYXhpcylcbiAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdXG5cbiAgaG92ZXJlZEVsZW1zLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICBjb25zdCB4ID0gTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpXG4gICAgY29uc3QgeSA9IE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneScpKVxuICAgIHNoaXBQb3NpdGlvbnMucHVzaChbe3gsIHksIGhpdDogZmFsc2V9XSlcbiAgfSlcblxuICBzaGlwLnNldFBvc2l0aW9ucyhzaGlwUG9zaXRpb25zKVxuXG4gIGlmICh2YWxpZFNoaXBQbGFjZW1lbnQoY3VycmVudFBsYXllclR1cm4sIHNoaXApKSB7XG4gICAgXG4gICAgcGxheWVyT25lLmdldEdhbWVib2FyZCgpLnBsYWNlU2hpcChzaGlwKVxuXG4gICAgaG92ZXJlZEVsZW1zID0gW11cbiAgICBjdXJyU2hpcExlbmd0aEluZGV4ICs9IDFcbiAgfVxuXG4gIGNvbnNvbGUubG9nKHBsYXllck9uZS5nZXRHYW1lYm9hcmQoKS5nZXRQbGFjZWRTaGlwcygpKVxufVxuXG5jb25zdCBoYW5kbGVBdXRvUGxhY2VDbGljayA9ICgpID0+IHtcbiAgY2xlYXJHYW1lYm9hcmQoY3VycmVudFBsYXllclR1cm4pXG4gIGF1dG9QbGFjZUFsbFNoaXBzKGN1cnJlbnRQbGF5ZXJUdXJuLCBnYW1lU3RhcnRlZCwgdG90YWxTaGlwcywgYXhpcylcbn1cblxuXG5jb25zdCBkaXNwbGF5R2FtZWJvYXJkID0gKHBsYXllcikgPT4ge1xuICBjb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZHMnKVxuICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkJywgcGxheWVyKVxuXG4gIGlmIChwbGF5ZXIgPT09ICdwbGF5ZXJPbmUnKSB7XG4gICAgZ2FtZWJvYXJkcy5jbGFzc0xpc3QuYWRkKCdjZW50ZXJHYW1lYm9hcmRzJylcbiAgICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgncGxhY2luZ1NoaXBzJylcbiAgfSBlbHNlIGlmIChwbGF5ZXIgPT09ICdwbGF5ZXJUd28nKSB7XG4gICAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoJ3BsYXllclR3b0dhbWVOb3RTdGFydGVkJylcbiAgfVxuICBcbiAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XG4gICAgXG4gICAgZm9yKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcbiAgICAgIGxldCBwb3NpdGlvbkVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgcG9zaXRpb25FbGVtLnNldEF0dHJpYnV0ZSgneCcsIHgpXG4gICAgICBwb3NpdGlvbkVsZW0uc2V0QXR0cmlidXRlKCd5JywgeSlcbiAgICAgIHBvc2l0aW9uRWxlbS5jbGFzc0xpc3QuYWRkKCdwb3NpdGlvbicpXG4gICAgICBcbiAgICAgIGlmIChwbGF5ZXIgPT09ICdwbGF5ZXJPbmUnKSB7XG4gICAgICAgIHBvc2l0aW9uRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZpbmFsaXplU2hpcFBsYWNlbWVudClcbiAgICAgICAgcG9zaXRpb25FbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGhhbmRsZUhvdmVyUG9zaXRpb24pXG4gICAgICB9IGVsc2UgaWYgKHBsYXllciA9PT0gJ3BsYXllclR3bycpIHtcbiAgICAgICAgcG9zaXRpb25FbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrUG9zaXRpb24pXG4gICAgICB9XG4gICAgICBnYW1lYm9hcmQuYXBwZW5kKHBvc2l0aW9uRWxlbSlcbiAgICB9XG4gIH1cblxuICBnYW1lYm9hcmRzLmFwcGVuZChnYW1lYm9hcmQpXG59XG5cbmRpc3BsYXlHYW1lYm9hcmQocGxheWVyT25lLnBsYXllckxhYmVsKVxuZGlzcGxheUdhbWVib2FyZChwbGF5ZXJUd28ucGxheWVyTGFiZWwpXG5cbmF1dG9QbGFjZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUF1dG9QbGFjZUNsaWNrKVxuc3RhcnRHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRHYW1lKSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==