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
const autoPlaceAllShips = (player) => {
  if (gameStarted) {
    return
  }

  const gameboard = document.querySelector(`.${player}`)
  clearGameboard(player)

  if (player === playerOne.getPlayerLabel()) {
    console.log('hello player one')

    let numOfPlacedShips = playerOne.getGameboard().getPlacedShips().length

    while (numOfPlacedShips < totalShips) {
      const x = getRandomInt(0, 9)
      const y = getRandomInt(0, 9)

      const elem = document.querySelectorAll(`[x="${x}"][y="${y}"]`)[0]
      placeShip(elem, axis)
      elem.click()

      numOfPlacedShips = Object.values(playerOne.getGameboard().getPlacedShips()).length
    }


  } else if (player === playerTwo.getPlayerLabel()) {

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
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
  const allPos = document.querySelectorAll(`.${player} .position`)
  allPos.forEach((elem) => elem.style.backgroundColor = '#5775B0')
  hoveredElems = []
  hoveredPos = []
  currShipLengthIndex = 0
}



const clearGameboard = (player) => {
  if (player === 'playerOne') {
    playerOne.getGameboard().clearGameboard()
  } else if (player === 'playerTwo') {
    playerTwo.getGameboard().clearGameboard()
  }
  console.log(playerOne.getGameboard().getPlacedShips())

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
  ;(0,_gameHelpers_autoPlaceAllShips__WEBPACK_IMPORTED_MODULE_6__.autoPlaceAllShips)('playerOne')
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBbUIsK0NBQUk7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGlCQUFpQjtBQUMxQyxHQUFHOztBQUVIOztBQUVBLE1BQU0sd0VBQWtCO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLGtGQUFpQjtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBLG1CQUFtQixRQUFRO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvRCIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY2xhc3Nlcy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jbGFzc2VzL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NsYXNzZXMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVIZWxwZXJzL2F1dG9QbGFjZUFsbFNoaXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUhlbHBlcnMvY3JlYXRlU2hpcFdpdGhQb3MuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lSGVscGVycy92YWxpZFNoaXBIb3Zlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVIZWxwZXJzL3ZhbGlkU2hpcFBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBHYW1lYm9hcmQge1xuICBwb3NpdGlvbnMgPSBbXTtcbiAgcGxhY2VkU2hpcHMgPSBbXTtcblxuICBjbGVhckdhbWVib2FyZCgpIHtcbiAgICB0aGlzLnBvc2l0aW9ucyA9IFtdXG4gICAgdGhpcy5wbGFjZWRTaGlwcyA9IFtdXG4gIH1cblxuICBnZXRQbGFjZWRTaGlwcygpIHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZWRTaGlwc1xuICB9XG5cbiAgcGxhY2VTaGlwKHNoaXApIHtcbiAgICB0aGlzLnBsYWNlZFNoaXBzLnB1c2goc2hpcClcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmRzKSB7XG5cbiAgfVxufSIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vR2FtZWJvYXJkJ1xuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gIG5hbWU7XG4gIHBsYXllckxhYmVsO1xuICBnYW1lYm9hcmQ7XG4gIHdvbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIHBsYXllckxhYmVsKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnBsYXllckxhYmVsID0gcGxheWVyTGFiZWxcbiAgICB0aGlzLmdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKVxuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lXG4gIH1cblxuICBnZXRQbGF5ZXJMYWJlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5wbGF5ZXJMYWJlbFxuICB9XG5cbiAgZ2V0R2FtZWJvYXJkKCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVib2FyZFxuICB9XG5cbiAgaGFzV29uKCkge1xuICAgIHJldHVybiB0aGlzLndvblxuICB9XG59IiwiY2xhc3MgU2hpcCB7XG4gIGxlbmd0aDtcbiAgYXhpcztcbiAgcG9zaXRpb25zID0gW107XG5cbiAgY29uc3RydWN0b3IobGVuZ3RoLCBheGlzKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGhcbiAgICB0aGlzLmF4aXMgPSBheGlzXG4gICAgdGhpcy5wb3NpdGlvbnNIaXQgPSBbXVxuICB9XG5cbiAgZ2V0TGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aFxuICB9XG5cbiAgZ2V0QXhpcygpIHtcbiAgICByZXR1cm4gdGhpcy5heGlzXG4gIH1cblxuICBnZXRQb3NpdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25zXG4gIH1cblxuICBnZXRQb3NpdGlvbnNIaXQoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25zLmZpbHRlcigocG9zaXRpb24pID0+IHBvc2l0aW9uLmhpdCAhPSB0cnVlKVxuICB9XG5cbiAgZ2V0Rmlyc3RQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbnNbMF1bMF1cbiAgfVxuXG4gIGdldExhc3RQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbnNbdGhpcy5wb3NpdGlvbnMubGVuZ3RoIC0gMV1bMF1cbiAgfVxuXG4gIHNldFBvc2l0aW9ucyhwb3NpdGlvbnMpIHtcbiAgICBpZihwb3NpdGlvbnMubGVuZ3RoID09PSB0aGlzLmxlbmd0aCkge1xuICAgICAgdGhpcy5wb3NpdGlvbnMgPSBwb3NpdGlvbnNcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdTaGlwIGNhbm5vdCBmaXQhJ1xuICAgIH1cbiAgfVxuXG4gIGhpdChwb3NpdGlvbk51bSkge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbnMuZmluZChwb3NpdGlvbiA9PiBwb3NpdGlvbi54ID09PSBwb3NpdGlvbk51bVswXSAmJiBwb3NpdGlvbi55ID09PSBwb3NpdGlvblsxXSlcbiAgICBwb3NpdGlvbi5oaXQgPSB0cnVlXG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgY29uc3QgcG9zaXRpb25zTGVmdCA9IHRoaXMucG9zaXRpb25zLmZpbHRlcigocG9zaXRpb24pID0+IHBvc2l0aW9uLmhpdCAhPSB0cnVlKVxuICAgIHJldHVybiBwb3NpdGlvbnNMZWZ0ID09PSAwXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNoaXAsXG59IiwiZXhwb3J0IGNvbnN0IGF1dG9QbGFjZUFsbFNoaXBzID0gKHBsYXllcikgPT4ge1xuICBpZiAoZ2FtZVN0YXJ0ZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3BsYXllcn1gKVxuICBjbGVhckdhbWVib2FyZChwbGF5ZXIpXG5cbiAgaWYgKHBsYXllciA9PT0gcGxheWVyT25lLmdldFBsYXllckxhYmVsKCkpIHtcbiAgICBjb25zb2xlLmxvZygnaGVsbG8gcGxheWVyIG9uZScpXG5cbiAgICBsZXQgbnVtT2ZQbGFjZWRTaGlwcyA9IHBsYXllck9uZS5nZXRHYW1lYm9hcmQoKS5nZXRQbGFjZWRTaGlwcygpLmxlbmd0aFxuXG4gICAgd2hpbGUgKG51bU9mUGxhY2VkU2hpcHMgPCB0b3RhbFNoaXBzKSB7XG4gICAgICBjb25zdCB4ID0gZ2V0UmFuZG9tSW50KDAsIDkpXG4gICAgICBjb25zdCB5ID0gZ2V0UmFuZG9tSW50KDAsIDkpXG5cbiAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbeD1cIiR7eH1cIl1beT1cIiR7eX1cIl1gKVswXVxuICAgICAgcGxhY2VTaGlwKGVsZW0sIGF4aXMpXG4gICAgICBlbGVtLmNsaWNrKClcblxuICAgICAgbnVtT2ZQbGFjZWRTaGlwcyA9IE9iamVjdC52YWx1ZXMocGxheWVyT25lLmdldEdhbWVib2FyZCgpLmdldFBsYWNlZFNoaXBzKCkpLmxlbmd0aFxuICAgIH1cblxuXG4gIH0gZWxzZSBpZiAocGxheWVyID09PSBwbGF5ZXJUd28uZ2V0UGxheWVyTGFiZWwoKSkge1xuXG4gIH1cblxuICBjb25zb2xlLmxvZyhnYW1lYm9hcmQpXG59IiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4uL2NsYXNzZXMvU2hpcCdcblxuY29uc3QgY3JlYXRlU2hpcFdpdGhQb3MgPSAocG9zaXRpb25zLCBheGlzKSA9PiB7XG4gIGNvbnN0IHNoaXBMZW4gPSBwb3NpdGlvbnMubGVuZ3RoXG4gIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChzaGlwTGVuLCBheGlzKVxuICBjb25zdCBzaGlwUG9zaXRpb25zID0gW11cblxuICBwb3NpdGlvbnMuZm9yRWFjaCgocG9zaXRpb24pID0+IHtcbiAgICBjb25zdCB7eCwgeX0gPSBwb3NpdGlvblxuICAgIHNoaXBQb3NpdGlvbnMucHVzaChbe3gsIHksIGhpdDogZmFsc2V9XSlcbiAgfSlcblxuICBzaGlwLnNldFBvc2l0aW9ucyhzaGlwUG9zaXRpb25zKVxuXG4gIHJldHVybiBzaGlwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNoaXBXaXRoUG9zIiwiaW1wb3J0IGNyZWF0ZVNoaXBXaXRoUG9zIGZyb20gJy4vY3JlYXRlU2hpcFdpdGhQb3MnXG5pbXBvcnQgdmFsaWRTaGlwUGxhY2VtZW50IGZyb20gJy4vdmFsaWRTaGlwUGxhY2VtZW50J1xuXG5jb25zdCB2YWxpZFNoaXBIb3ZlciA9IChzaGlwTGVuLCBlbGVtLCBheGlzLCBjdXJyZW50UGxheWVyVHVybikgPT4ge1xuICBjb25zdCBob3ZlcmVkUG9zID0gYXhpcyA9PT0gJ1gnID8gZ2V0SG92ZXJlZFBvc1goZWxlbSwgc2hpcExlbikgOiBnZXRIb3ZlcmVkUG9zWShlbGVtLCBzaGlwTGVuKVxuICBjb25zdCBzaGlwID0gY3JlYXRlU2hpcFdpdGhQb3MoaG92ZXJlZFBvcywgYXhpcylcblxuICByZXR1cm4gdmFsaWRTaGlwUGxhY2VtZW50KGN1cnJlbnRQbGF5ZXJUdXJuLCBzaGlwKVxufVxuXG5jb25zdCBnZXRIb3ZlcmVkUG9zWCA9IChlbGVtLCBzaGlwTGVuKSA9PiB7XG4gIGNvbnN0IFt4LCB5XSA9IFtOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3gnKSksIE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneScpKV1cbiAgY29uc3QgZmluYWxTaGlwUG9zaXRpb25YID0gKHggKyBzaGlwTGVuKSAtIDFcbiAgY29uc3QgaG92ZXJlZFBvcyA9IFtdXG5cbiAgaWYgKGZpbmFsU2hpcFBvc2l0aW9uWCA8PSA5KSB7XG4gICAgZm9yKGxldCBpID0geDsgaSA8PSBmaW5hbFNoaXBQb3NpdGlvblg7IGkrKykge1xuICAgICAgaG92ZXJlZFBvcy5wdXNoKHt4OiBpLCB5fSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaG92ZXJlZFBvc1xufVxuXG5jb25zdCBnZXRIb3ZlcmVkUG9zWSA9IChlbGVtLCBzaGlwTGVuKSA9PiB7XG4gIGNvbnN0IFt4LCB5XSA9IFtOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3gnKSksIE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneScpKV1cbiAgY29uc3QgZmluYWxTaGlwUG9zaXRpb25ZID0gKHkgKyBzaGlwTGVuKSAtIDFcbiAgY29uc3QgaG92ZXJlZFBvcyA9IFtdXG5cbiAgaWYgKGZpbmFsU2hpcFBvc2l0aW9uWSA8PSA5KSB7XG4gICAgZm9yKGxldCBpID0geTsgaSA8PSBmaW5hbFNoaXBQb3NpdGlvblk7IGkrKykge1xuICAgICAgaG92ZXJlZFBvcy5wdXNoKHt4LCB5OiBpfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaG92ZXJlZFBvc1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZFNoaXBIb3ZlciIsImNvbnN0IHZhbGlkU2hpcFBsYWNlbWVudCA9IChjdXJyZW50UGxheWVyVHVybiwgc2hpcCkgPT4ge1xuICBpZiAoY3VycmVudFBsYXllclR1cm4ucGxheWVyTGFiZWwgPT09ICdwbGF5ZXJPbmUnKSB7XG4gICAgY29uc3QgcGxhY2VkU2hpcHMgPSBjdXJyZW50UGxheWVyVHVybi5nZXRHYW1lYm9hcmQoKS5nZXRQbGFjZWRTaGlwcygpXG4gICAgaWYgKHNoaXAuZ2V0UG9zaXRpb25zKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoc2hpcC5nZXRBeGlzKCkgPT09ICdYJykge1xuICAgICAgXG4gICAgICBmb3IgKGxldCBwbGFjZWRTaGlwIG9mIHBsYWNlZFNoaXBzKSB7XG4gICAgICAgIGlmICh2YWxpZGF0ZVNoaXBXaXRoWChzaGlwLCBwbGFjZWRTaGlwKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2hpcC5nZXRBeGlzKCkgPT09ICdZJykge1xuICAgICAgZm9yIChsZXQgcGxhY2VkU2hpcCBvZiBwbGFjZWRTaGlwcykge1xuICAgICAgICBpZiAodmFsaWRhdGVTaGlwV2l0aFkoc2hpcCwgcGxhY2VkU2hpcCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoY3VycmVudFBsYXllclR1cm4gPT09ICdwbGF5ZXJUd28nKSB7XG5cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmNvbnN0IHZhbGlkYXRlU2hpcFdpdGhYID0gKHNoaXAsIHBsYWNlZFNoaXApID0+IHtcbiAgaWYgKHBsYWNlZFNoaXAuZ2V0QXhpcygpID09PSBzaGlwLmdldEF4aXMoKSkge1xuICAgIGNvbnN0IHsgeDogc2hpcFN0YXJ0UG9zWCwgeTogc2hpcFN0YXJ0UG9zWSB9ID0gc2hpcC5nZXRGaXJzdFBvc2l0aW9uKClcbiAgICBjb25zdCB7IHg6IHNoaXBFbmRQb3NYLCB5OiBzaGlwRW5kUG9zWSB9ID0gc2hpcC5nZXRMYXN0UG9zaXRpb24oKVxuICAgIGNvbnN0IHsgeDogcGxhY2VkU3RhcnRQb3NYLCB5OiBwbGFjZWRTdGFydFBvc1kgfSA9IHBsYWNlZFNoaXAuZ2V0Rmlyc3RQb3NpdGlvbigpXG4gICAgY29uc3QgeyB4OiBwbGFjZWRFbmRQb3NYLCB5OiBwbGFjZWRFbmRQb3NZIH0gPSBwbGFjZWRTaGlwLmdldExhc3RQb3NpdGlvbigpXG4gICAgXG4gICAgaWYgKHNoaXBTdGFydFBvc1kgPT09IHBsYWNlZFN0YXJ0UG9zWSkge1xuICAgICAgaWYgKHNoaXBTdGFydFBvc1ggPj0gcGxhY2VkU3RhcnRQb3NYICYmIHNoaXBTdGFydFBvc1ggPD0gcGxhY2VkRW5kUG9zWCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cblxuICAgICAgaWYgKHNoaXBFbmRQb3NYID49IHBsYWNlZFN0YXJ0UG9zWCAmJiBzaGlwRW5kUG9zWCA8PSBwbGFjZWRFbmRQb3NYKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmNvbnN0IHZhbGlkYXRlU2hpcFdpdGhZID0gKHNoaXAsIHBsYWNlZFNoaXApID0+IHtcbiAgY29uc3QgeyB4OiBzaGlwU3RhcnRQb3NYLCB5OiBzaGlwU3RhcnRQb3NZIH0gPSBzaGlwLmdldEZpcnN0UG9zaXRpb24oKVxuICBjb25zdCB7IHg6IHNoaXBFbmRQb3NYLCB5OiBzaGlwRW5kUG9zWSB9ID0gc2hpcC5nZXRMYXN0UG9zaXRpb24oKVxuICBjb25zdCB7IHg6IHBsYWNlZFN0YXJ0UG9zWCwgeTogcGxhY2VkU3RhcnRQb3NZIH0gPSBwbGFjZWRTaGlwLmdldEZpcnN0UG9zaXRpb24oKVxuICBjb25zdCB7IHg6IHBsYWNlZEVuZFBvc1gsIHk6IHBsYWNlZEVuZFBvc1kgfSA9IHBsYWNlZFNoaXAuZ2V0TGFzdFBvc2l0aW9uKClcbiAgXG4gIGlmIChzaGlwU3RhcnRQb3NYID09PSBwbGFjZWRTdGFydFBvc1gpIHtcbiAgICBcbiAgICBpZiAoc2hpcFN0YXJ0UG9zWSA+PSBwbGFjZWRTdGFydFBvc1kgJiYgc2hpcFN0YXJ0UG9zWSA8PSBwbGFjZWRFbmRQb3NZKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKHNoaXBTdGFydFBvc1kgPj0gcGxhY2VkU3RhcnRQb3NZICYmIHNoaXBTdGFydFBvc1kgPD0gcGxhY2VkRW5kUG9zWSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmIChzaGlwRW5kUG9zWSA+PSBwbGFjZWRTdGFydFBvc1kgJiYgc2hpcEVuZFBvc1kgPD0gcGxhY2VkRW5kUG9zWSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRTaGlwUGxhY2VtZW50IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFNoaXAgfSBmcm9tICcuL2NsYXNzZXMvU2hpcCdcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vY2xhc3Nlcy9HYW1lYm9hcmQnXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL2NsYXNzZXMvUGxheWVyJ1xuaW1wb3J0IHZhbGlkU2hpcFBsYWNlbWVudCBmcm9tICcuL2dhbWVIZWxwZXJzL3ZhbGlkU2hpcFBsYWNlbWVudCdcbmltcG9ydCBjcmVhdGVTaGlwV2l0aFBvcyBmcm9tICcuL2dhbWVIZWxwZXJzL2NyZWF0ZVNoaXBXaXRoUG9zJ1xuaW1wb3J0IHZhbGlkU2hpcEhvdmVyIGZyb20gJy4vZ2FtZUhlbHBlcnMvdmFsaWRTaGlwSG92ZXInXG5pbXBvcnQgeyBhdXRvUGxhY2VBbGxTaGlwcyB9IGZyb20gJy4vZ2FtZUhlbHBlcnMvYXV0b1BsYWNlQWxsU2hpcHMnXG5cbmNvbnN0IHBsYXllck9uZSA9IG5ldyBQbGF5ZXIoJ0NhcmxvcycsICdwbGF5ZXJPbmUnKVxuY29uc3QgcGxheWVyVHdvID0gbmV3IFBsYXllcignQW50aG9ueScsICdwbGF5ZXJUd28nKVxuY29uc3QgYXhpc09wdGlvbnMgPSBbJ1gnLCAnWSddXG5jb25zdCBheGlzID0gJ1gnXG5jb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXVxuY29uc3QgYXV0b1BsYWNlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF1dG9QbGFjZUJ1dHRvbicpXG5jb25zdCBzdGFydEdhbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnRHYW1lQnV0dG9uJylcbmNvbnN0IHRvdGFsU2hpcHMgPSA1XG5cbmxldCBnYW1lU3RhcnRlZCA9IGZhbHNlXG5sZXQgY3VycmVudFBsYXllclR1cm4gPSBwbGF5ZXJPbmVcbmxldCBjdXJyU2hpcExlbmd0aEluZGV4ID0gMFxubGV0IGhvdmVyZWRFbGVtcyA9IFtdXG5sZXQgaG92ZXJlZFBvcyA9IFtdXG5cbmNvbnN0IGF0dGFja1Bvc2l0aW9uID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHBvcyA9IGV2ZW50LnRhcmdldFxuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKHBvcy5nZXRBdHRyaWJ1dGUoJ3gnKSksIE51bWJlcihwb3MuZ2V0QXR0cmlidXRlKCd5JykpXVxuXG5cbiAgcG9zLmNsYXNzTGlzdC5hZGQoJ2hpdCcpXG5cbiAgY29uc29sZS5sb2coeCwgeSlcbn1cblxuXG5jb25zdCBjbGVhckhvdmVyRWxlbUNvbG9ycyA9ICgpID0+IHtcbiAgaG92ZXJlZEVsZW1zLmZvckVhY2goKGVsZW0pID0+IGVsZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyM1Nzc1QjAnKVxuICBob3ZlcmVkRWxlbXMgPSBbXVxuICBob3ZlcmVkUG9zID0gW11cbn1cblxuY29uc3QgY2xlYXJBbGxFbGVtQ29sb3JzID0gKHBsYXllcikgPT4ge1xuICBjb25zdCBhbGxQb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtwbGF5ZXJ9IC5wb3NpdGlvbmApXG4gIGFsbFBvcy5mb3JFYWNoKChlbGVtKSA9PiBlbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjNTc3NUIwJylcbiAgaG92ZXJlZEVsZW1zID0gW11cbiAgaG92ZXJlZFBvcyA9IFtdXG4gIGN1cnJTaGlwTGVuZ3RoSW5kZXggPSAwXG59XG5cblxuXG5jb25zdCBjbGVhckdhbWVib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgaWYgKHBsYXllciA9PT0gJ3BsYXllck9uZScpIHtcbiAgICBwbGF5ZXJPbmUuZ2V0R2FtZWJvYXJkKCkuY2xlYXJHYW1lYm9hcmQoKVxuICB9IGVsc2UgaWYgKHBsYXllciA9PT0gJ3BsYXllclR3bycpIHtcbiAgICBwbGF5ZXJUd28uZ2V0R2FtZWJvYXJkKCkuY2xlYXJHYW1lYm9hcmQoKVxuICB9XG4gIGNvbnNvbGUubG9nKHBsYXllck9uZS5nZXRHYW1lYm9hcmQoKS5nZXRQbGFjZWRTaGlwcygpKVxuXG4gIGdhbWVTdGFydGVkID0gZmFsc2VcbiAgY2xlYXJBbGxFbGVtQ29sb3JzKHBsYXllcilcbn1cblxuY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xuXG4gIGlmIChwbGF5ZXJPbmUuZ2V0R2FtZWJvYXJkKCkuZ2V0UGxhY2VkU2hpcHMoKS5sZW5ndGggPCA1KSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZHMnKVxuICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkJylcbiAgY29uc3QgcGxheWVyVHdvR2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllclR3bycpXG5cbiAgZ2FtZWJvYXJkcy5jbGFzc0xpc3QucmVtb3ZlKCdjZW50ZXJHYW1lYm9hcmRzJylcbiAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYWNpbmdTaGlwcycpXG4gIHBsYXllclR3b0dhbWVib2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5ZXJUd29HYW1lTm90U3RhcnRlZCcpXG5cbiAgY29uc29sZS5sb2coJ0FsbCBvZiBwbGF5ZXJPbmVzIHNoaXBzIGhhdmUgYmVlbiBwbGFjZWQuJylcbiAgZ2FtZVN0YXJ0ZWQgPSB0cnVlXG5cbn1cblxuY29uc3QgaGFuZGxlSG92ZXJQb3NpdGlvbiA9IChldmVudCkgPT4ge1xuICBjbGVhckhvdmVyRWxlbUNvbG9ycygpXG4gIGlmKGdhbWVTdGFydGVkID09PSBmYWxzZSkge1xuICAgIGNvbnN0IGVsZW0gPSBldmVudC50YXJnZXRcbiAgICBwbGFjZVNoaXAoZWxlbSwgYXhpcylcbiAgfVxufVxuXG5jb25zdCBwbGFjZVNoaXAgPSAoZWxlbSwgYXhpcykgPT4ge1xuXG4gIGlmIChnYW1lU3RhcnRlZCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3Qgc2hpcExlbiA9IHNoaXBMZW5ndGhzW2N1cnJTaGlwTGVuZ3RoSW5kZXhdXG5cbiAgaWYgKGF4aXMgPT09ICdYJykge1xuICAgIGlmICh2YWxpZFNoaXBIb3ZlcihzaGlwTGVuLCBlbGVtLCBheGlzLCBjdXJyZW50UGxheWVyVHVybikpIHtcbiAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZFNoaXBQbGFjZW1lbnQnKVxuICAgICAgcGxhY2VTaGlwWChzaGlwTGVuLCBlbGVtKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnQ0hBTkdORyBDVVJTT1InKVxuICAgICAgY29uc29sZS5sb2coZWxlbSlcbiAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnaW52YWxpZFNoaXBQbGFjZW1lbnQnKVxuICAgIH1cbiAgfSBlbHNlIGlmIChheGlzID09PSAnWScpIHtcbiAgICBpZiAodmFsaWRTaGlwSG92ZXIoc2hpcExlbiwgZWxlbSwgYXhpcywgY3VycmVudFBsYXllclR1cm4pKSB7XG4gICAgICBwbGFjZVNoaXBZKHNoaXBMZW4sIGVsZW0pXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHBsYWNlU2hpcFggPSAoc2hpcExlbiwgZWxlbSkgPT4ge1xuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3knKSldXG4gIGNvbnN0IGZpbmFsU2hpcFBvc2l0aW9uWCA9ICh4ICsgc2hpcExlbikgLSAxXG5cbiAgaWYgKGZpbmFsU2hpcFBvc2l0aW9uWCA8PSA5KSB7XG5cbiAgICBmb3IobGV0IGkgPSB4OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWDsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3g9XCIke2l9XCJdW3k9XCIke3l9XCJdYClbMF1cbiAgICAgIGhvdmVyZWRFbGVtcy5wdXNoKGVsZW0pXG4gICAgICBlbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSdcbiAgICB9XG5cbiAgfVxufVxuXG5jb25zdCBwbGFjZVNoaXBZID0gKHNoaXBMZW4sIHBvcykgPT4ge1xuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKHBvcy5nZXRBdHRyaWJ1dGUoJ3gnKSksIE51bWJlcihwb3MuZ2V0QXR0cmlidXRlKCd5JykpXVxuICBjb25zdCBmaW5hbFNoaXBQb3NpdGlvblkgPSAoeSArIHNoaXBMZW4pIC0gMVxuXG4gIGlmIChmaW5hbFNoaXBQb3NpdGlvblkgPD0gOSkge1xuICAgIGNvbnNvbGUubG9nKHgsIHkpXG5cbiAgICBmb3IobGV0IGkgPSB5OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWTsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3g9XCIke3h9XCJdW3k9XCIke2l9XCJdYClbMF1cbiAgICAgIGhvdmVyZWRFbGVtcy5wdXNoKGVsZW0pXG4gICAgICBlbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSdcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgZmluYWxpemVTaGlwUGxhY2VtZW50ID0gKCkgPT4ge1xuXG4gIGNvbnNvbGUubG9nKCdwbGFjaW5nIHNoaXAnKVxuICBjb25zb2xlLmxvZyhnYW1lU3RhcnRlZClcblxuICBpZiAoZ2FtZVN0YXJ0ZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBzaGlwTGVuID0gaG92ZXJlZEVsZW1zLmxlbmd0aFxuICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbiwgYXhpcylcbiAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdXG5cbiAgaG92ZXJlZEVsZW1zLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICBjb25zdCB4ID0gTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpXG4gICAgY29uc3QgeSA9IE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneScpKVxuICAgIHNoaXBQb3NpdGlvbnMucHVzaChbe3gsIHksIGhpdDogZmFsc2V9XSlcbiAgfSlcblxuICBzaGlwLnNldFBvc2l0aW9ucyhzaGlwUG9zaXRpb25zKVxuXG4gIGlmICh2YWxpZFNoaXBQbGFjZW1lbnQoY3VycmVudFBsYXllclR1cm4sIHNoaXApKSB7XG4gICAgXG4gICAgcGxheWVyT25lLmdldEdhbWVib2FyZCgpLnBsYWNlU2hpcChzaGlwKVxuXG4gICAgaG92ZXJlZEVsZW1zID0gW11cbiAgICBjdXJyU2hpcExlbmd0aEluZGV4ICs9IDFcbiAgfVxuXG4gIGNvbnNvbGUubG9nKHBsYXllck9uZS5nZXRHYW1lYm9hcmQoKS5nZXRQbGFjZWRTaGlwcygpKVxufVxuXG5jb25zdCBoYW5kbGVBdXRvUGxhY2VDbGljayA9ICgpID0+IHtcbiAgYXV0b1BsYWNlQWxsU2hpcHMoJ3BsYXllck9uZScpXG59XG5cbmNvbnN0IGdldFJhbmRvbUludCA9IChtaW4sIG1heCkgPT4ge1xuICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbn1cblxuY29uc3QgZGlzcGxheUdhbWVib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgY29uc3QgZ2FtZWJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmRzJylcbiAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoJ2dhbWVib2FyZCcsIHBsYXllcilcblxuICBpZiAocGxheWVyID09PSAncGxheWVyT25lJykge1xuICAgIGdhbWVib2FyZHMuY2xhc3NMaXN0LmFkZCgnY2VudGVyR2FtZWJvYXJkcycpXG4gICAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoJ3BsYWNpbmdTaGlwcycpXG4gIH0gZWxzZSBpZiAocGxheWVyID09PSAncGxheWVyVHdvJykge1xuICAgIGdhbWVib2FyZC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXJUd29HYW1lTm90U3RhcnRlZCcpXG4gIH1cbiAgXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgMTA7IHkrKykge1xuICAgIFxuICAgIGZvcihsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XG4gICAgICBsZXQgcG9zaXRpb25FbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIHBvc2l0aW9uRWxlbS5zZXRBdHRyaWJ1dGUoJ3gnLCB4KVxuICAgICAgcG9zaXRpb25FbGVtLnNldEF0dHJpYnV0ZSgneScsIHkpXG4gICAgICBwb3NpdGlvbkVsZW0uY2xhc3NMaXN0LmFkZCgncG9zaXRpb24nKVxuICAgICAgXG4gICAgICBpZiAocGxheWVyID09PSAncGxheWVyT25lJykge1xuICAgICAgICBwb3NpdGlvbkVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmaW5hbGl6ZVNoaXBQbGFjZW1lbnQpXG4gICAgICAgIHBvc2l0aW9uRWxlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBoYW5kbGVIb3ZlclBvc2l0aW9uKVxuICAgICAgfSBlbHNlIGlmIChwbGF5ZXIgPT09ICdwbGF5ZXJUd28nKSB7XG4gICAgICAgIHBvc2l0aW9uRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFja1Bvc2l0aW9uKVxuICAgICAgfVxuICAgICAgZ2FtZWJvYXJkLmFwcGVuZChwb3NpdGlvbkVsZW0pXG4gICAgfVxuICB9XG5cbiAgZ2FtZWJvYXJkcy5hcHBlbmQoZ2FtZWJvYXJkKVxufVxuXG5kaXNwbGF5R2FtZWJvYXJkKHBsYXllck9uZS5wbGF5ZXJMYWJlbClcbmRpc3BsYXlHYW1lYm9hcmQocGxheWVyVHdvLnBsYXllckxhYmVsKVxuXG5hdXRvUGxhY2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVBdXRvUGxhY2VDbGljaylcbnN0YXJ0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0R2FtZSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=