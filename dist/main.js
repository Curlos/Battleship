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







const playerOne = new _classes_Player__WEBPACK_IMPORTED_MODULE_2__.Player('Carlos', 'playerOne')
const playerTwo = new _classes_Player__WEBPACK_IMPORTED_MODULE_2__.Player('Anthony', 'playerTwo')
const axis = 'X'
const shipLengths = [5, 4, 3, 3, 2]
const autoPlaceButton = document.querySelector('.autoPlaceButton')
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

  if(playerOne.getGameboard().getPlacedShips().length === 5) {
    startGame()
  }
}

const handleAutoPlaceClick = () => {
  autoPlaceAllShips('playerOne')
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const autoPlaceAllShips = (player) => {
  if (gameStarted) {
    return
  }

  const gameboard = document.querySelector(`.${player}`)
  clearGameboard(player)

  if (player === playerOne.getPlayerLabel()) {
    console.log('hello player one')

    let numOfPlacedShips = playerOne.getGameboard().getPlacedShips().length

    console.log(numOfPlacedShips)
    let i = 0;

    while (i < totalShips) {
      const x = getRandomInt(0, 9)
      const y = getRandomInt(0, 9)

      const elem = document.querySelectorAll(`[x="${x}"][y="${y}"]`)[0]
      placeShip(elem, axis)
      elem.click()

      console.log(numOfPlacedShips)
      i += 1

    }


  } else if (player === playerTwo.getPlayerLabel()) {

  }

  console.log(gameboard)
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QStDLE9BQU87QUFDdEQ7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvREFBb0QsRUFBRSxRQUFRLEVBQUU7QUFDaEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0EsbUJBQW1CLFFBQVE7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwrRCIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY2xhc3Nlcy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jbGFzc2VzL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NsYXNzZXMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVIZWxwZXJzL2NyZWF0ZVNoaXBXaXRoUG9zLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUhlbHBlcnMvdmFsaWRTaGlwSG92ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lSGVscGVycy92YWxpZFNoaXBQbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgcG9zaXRpb25zID0gW107XG4gIHBsYWNlZFNoaXBzID0gW107XG5cbiAgY2xlYXJHYW1lYm9hcmQoKSB7XG4gICAgdGhpcy5wb3NpdGlvbnMgPSBbXVxuICAgIHRoaXMucGxhY2VkU2hpcHMgPSBbXVxuICB9XG5cbiAgZ2V0UGxhY2VkU2hpcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxhY2VkU2hpcHNcbiAgfVxuXG4gIHBsYWNlU2hpcChzaGlwKSB7XG4gICAgdGhpcy5wbGFjZWRTaGlwcy5wdXNoKHNoaXApXG4gIH1cblxuICByZWNlaXZlQXR0YWNrKGNvb3Jkcykge1xuXG4gIH1cbn0iLCJpbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL0dhbWVib2FyZCdcbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICBuYW1lO1xuICBwbGF5ZXJMYWJlbDtcbiAgZ2FtZWJvYXJkO1xuICB3b24gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihuYW1lLCBwbGF5ZXJMYWJlbCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wbGF5ZXJMYWJlbCA9IHBsYXllckxhYmVsXG4gICAgdGhpcy5nYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKClcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZVxuICB9XG5cbiAgZ2V0UGxheWVyTGFiZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWVyTGFiZWxcbiAgfVxuXG4gIGdldEdhbWVib2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lYm9hcmRcbiAgfVxuXG4gIGhhc1dvbigpIHtcbiAgICByZXR1cm4gdGhpcy53b25cbiAgfVxufSIsImNsYXNzIFNoaXAge1xuICBsZW5ndGg7XG4gIGF4aXM7XG4gIHBvc2l0aW9ucyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgYXhpcykge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoXG4gICAgdGhpcy5heGlzID0gYXhpc1xuICAgIHRoaXMucG9zaXRpb25zSGl0ID0gW11cbiAgfVxuXG4gIGdldExlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGdldEF4aXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXhpc1xuICB9XG5cbiAgZ2V0UG9zaXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uc1xuICB9XG5cbiAgZ2V0UG9zaXRpb25zSGl0KCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9ucy5maWx0ZXIoKHBvc2l0aW9uKSA9PiBwb3NpdGlvbi5oaXQgIT0gdHJ1ZSlcbiAgfVxuXG4gIGdldEZpcnN0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25zWzBdWzBdXG4gIH1cblxuICBnZXRMYXN0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25zW3RoaXMucG9zaXRpb25zLmxlbmd0aCAtIDFdWzBdXG4gIH1cblxuICBzZXRQb3NpdGlvbnMocG9zaXRpb25zKSB7XG4gICAgaWYocG9zaXRpb25zLmxlbmd0aCA9PT0gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucG9zaXRpb25zID0gcG9zaXRpb25zXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnU2hpcCBjYW5ub3QgZml0ISdcbiAgICB9XG4gIH1cblxuICBoaXQocG9zaXRpb25OdW0pIHtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb25zLmZpbmQocG9zaXRpb24gPT4gcG9zaXRpb24ueCA9PT0gcG9zaXRpb25OdW1bMF0gJiYgcG9zaXRpb24ueSA9PT0gcG9zaXRpb25bMV0pXG4gICAgcG9zaXRpb24uaGl0ID0gdHJ1ZVxuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGNvbnN0IHBvc2l0aW9uc0xlZnQgPSB0aGlzLnBvc2l0aW9ucy5maWx0ZXIoKHBvc2l0aW9uKSA9PiBwb3NpdGlvbi5oaXQgIT0gdHJ1ZSlcbiAgICByZXR1cm4gcG9zaXRpb25zTGVmdCA9PT0gMFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTaGlwLFxufSIsImltcG9ydCB7IFNoaXAgfSBmcm9tICcuLi9jbGFzc2VzL1NoaXAnXG5cbmNvbnN0IGNyZWF0ZVNoaXBXaXRoUG9zID0gKHBvc2l0aW9ucywgYXhpcykgPT4ge1xuICBjb25zdCBzaGlwTGVuID0gcG9zaXRpb25zLmxlbmd0aFxuICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbiwgYXhpcylcbiAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdXG5cbiAgcG9zaXRpb25zLmZvckVhY2goKHBvc2l0aW9uKSA9PiB7XG4gICAgY29uc3Qge3gsIHl9ID0gcG9zaXRpb25cbiAgICBzaGlwUG9zaXRpb25zLnB1c2goW3t4LCB5LCBoaXQ6IGZhbHNlfV0pXG4gIH0pXG5cbiAgc2hpcC5zZXRQb3NpdGlvbnMoc2hpcFBvc2l0aW9ucylcblxuICByZXR1cm4gc2hpcFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTaGlwV2l0aFBvcyIsImltcG9ydCBjcmVhdGVTaGlwV2l0aFBvcyBmcm9tICcuL2NyZWF0ZVNoaXBXaXRoUG9zJ1xuaW1wb3J0IHZhbGlkU2hpcFBsYWNlbWVudCBmcm9tICcuL3ZhbGlkU2hpcFBsYWNlbWVudCdcblxuY29uc3QgdmFsaWRTaGlwSG92ZXIgPSAoc2hpcExlbiwgZWxlbSwgYXhpcywgY3VycmVudFBsYXllclR1cm4pID0+IHtcbiAgY29uc3QgaG92ZXJlZFBvcyA9IGF4aXMgPT09ICdYJyA/IGdldEhvdmVyZWRQb3NYKGVsZW0sIHNoaXBMZW4pIDogZ2V0SG92ZXJlZFBvc1koZWxlbSwgc2hpcExlbilcbiAgY29uc3Qgc2hpcCA9IGNyZWF0ZVNoaXBXaXRoUG9zKGhvdmVyZWRQb3MsIGF4aXMpXG5cbiAgcmV0dXJuIHZhbGlkU2hpcFBsYWNlbWVudChjdXJyZW50UGxheWVyVHVybiwgc2hpcClcbn1cblxuY29uc3QgZ2V0SG92ZXJlZFBvc1ggPSAoZWxlbSwgc2hpcExlbikgPT4ge1xuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3knKSldXG4gIGNvbnN0IGZpbmFsU2hpcFBvc2l0aW9uWCA9ICh4ICsgc2hpcExlbikgLSAxXG4gIGNvbnN0IGhvdmVyZWRQb3MgPSBbXVxuXG4gIGlmIChmaW5hbFNoaXBQb3NpdGlvblggPD0gOSkge1xuICAgIGZvcihsZXQgaSA9IHg7IGkgPD0gZmluYWxTaGlwUG9zaXRpb25YOyBpKyspIHtcbiAgICAgIGhvdmVyZWRQb3MucHVzaCh7eDogaSwgeX0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGhvdmVyZWRQb3Ncbn1cblxuY29uc3QgZ2V0SG92ZXJlZFBvc1kgPSAoZWxlbSwgc2hpcExlbikgPT4ge1xuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3knKSldXG4gIGNvbnN0IGZpbmFsU2hpcFBvc2l0aW9uWSA9ICh5ICsgc2hpcExlbikgLSAxXG4gIGNvbnN0IGhvdmVyZWRQb3MgPSBbXVxuXG4gIGlmIChmaW5hbFNoaXBQb3NpdGlvblkgPD0gOSkge1xuICAgIGZvcihsZXQgaSA9IHk7IGkgPD0gZmluYWxTaGlwUG9zaXRpb25ZOyBpKyspIHtcbiAgICAgIGhvdmVyZWRQb3MucHVzaCh7eCwgeTogaX0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGhvdmVyZWRQb3Ncbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRTaGlwSG92ZXIiLCJjb25zdCB2YWxpZFNoaXBQbGFjZW1lbnQgPSAoY3VycmVudFBsYXllclR1cm4sIHNoaXApID0+IHtcbiAgaWYgKGN1cnJlbnRQbGF5ZXJUdXJuLnBsYXllckxhYmVsID09PSAncGxheWVyT25lJykge1xuICAgIGNvbnN0IHBsYWNlZFNoaXBzID0gY3VycmVudFBsYXllclR1cm4uZ2V0R2FtZWJvYXJkKCkuZ2V0UGxhY2VkU2hpcHMoKVxuICAgIGlmIChzaGlwLmdldFBvc2l0aW9ucygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHNoaXAuZ2V0QXhpcygpID09PSAnWCcpIHtcbiAgICAgIFxuICAgICAgZm9yIChsZXQgcGxhY2VkU2hpcCBvZiBwbGFjZWRTaGlwcykge1xuICAgICAgICBpZiAodmFsaWRhdGVTaGlwV2l0aFgoc2hpcCwgcGxhY2VkU2hpcCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNoaXAuZ2V0QXhpcygpID09PSAnWScpIHtcbiAgICAgIGZvciAobGV0IHBsYWNlZFNoaXAgb2YgcGxhY2VkU2hpcHMpIHtcbiAgICAgICAgaWYgKHZhbGlkYXRlU2hpcFdpdGhZKHNoaXAsIHBsYWNlZFNoaXApID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGN1cnJlbnRQbGF5ZXJUdXJuID09PSAncGxheWVyVHdvJykge1xuXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCB2YWxpZGF0ZVNoaXBXaXRoWCA9IChzaGlwLCBwbGFjZWRTaGlwKSA9PiB7XG4gIGlmIChwbGFjZWRTaGlwLmdldEF4aXMoKSA9PT0gc2hpcC5nZXRBeGlzKCkpIHtcbiAgICBjb25zdCB7IHg6IHNoaXBTdGFydFBvc1gsIHk6IHNoaXBTdGFydFBvc1kgfSA9IHNoaXAuZ2V0Rmlyc3RQb3NpdGlvbigpXG4gICAgY29uc3QgeyB4OiBzaGlwRW5kUG9zWCwgeTogc2hpcEVuZFBvc1kgfSA9IHNoaXAuZ2V0TGFzdFBvc2l0aW9uKClcbiAgICBjb25zdCB7IHg6IHBsYWNlZFN0YXJ0UG9zWCwgeTogcGxhY2VkU3RhcnRQb3NZIH0gPSBwbGFjZWRTaGlwLmdldEZpcnN0UG9zaXRpb24oKVxuICAgIGNvbnN0IHsgeDogcGxhY2VkRW5kUG9zWCwgeTogcGxhY2VkRW5kUG9zWSB9ID0gcGxhY2VkU2hpcC5nZXRMYXN0UG9zaXRpb24oKVxuICAgIFxuICAgIGlmIChzaGlwU3RhcnRQb3NZID09PSBwbGFjZWRTdGFydFBvc1kpIHtcbiAgICAgIGlmIChzaGlwU3RhcnRQb3NYID49IHBsYWNlZFN0YXJ0UG9zWCAmJiBzaGlwU3RhcnRQb3NYIDw9IHBsYWNlZEVuZFBvc1gpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGlmIChzaGlwRW5kUG9zWCA+PSBwbGFjZWRTdGFydFBvc1ggJiYgc2hpcEVuZFBvc1ggPD0gcGxhY2VkRW5kUG9zWCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCB2YWxpZGF0ZVNoaXBXaXRoWSA9IChzaGlwLCBwbGFjZWRTaGlwKSA9PiB7XG4gIGNvbnN0IHsgeDogc2hpcFN0YXJ0UG9zWCwgeTogc2hpcFN0YXJ0UG9zWSB9ID0gc2hpcC5nZXRGaXJzdFBvc2l0aW9uKClcbiAgY29uc3QgeyB4OiBzaGlwRW5kUG9zWCwgeTogc2hpcEVuZFBvc1kgfSA9IHNoaXAuZ2V0TGFzdFBvc2l0aW9uKClcbiAgY29uc3QgeyB4OiBwbGFjZWRTdGFydFBvc1gsIHk6IHBsYWNlZFN0YXJ0UG9zWSB9ID0gcGxhY2VkU2hpcC5nZXRGaXJzdFBvc2l0aW9uKClcbiAgY29uc3QgeyB4OiBwbGFjZWRFbmRQb3NYLCB5OiBwbGFjZWRFbmRQb3NZIH0gPSBwbGFjZWRTaGlwLmdldExhc3RQb3NpdGlvbigpXG4gIFxuICBpZiAoc2hpcFN0YXJ0UG9zWCA9PT0gcGxhY2VkU3RhcnRQb3NYKSB7XG4gICAgXG4gICAgaWYgKHNoaXBTdGFydFBvc1kgPj0gcGxhY2VkU3RhcnRQb3NZICYmIHNoaXBTdGFydFBvc1kgPD0gcGxhY2VkRW5kUG9zWSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmIChzaGlwU3RhcnRQb3NZID49IHBsYWNlZFN0YXJ0UG9zWSAmJiBzaGlwU3RhcnRQb3NZIDw9IHBsYWNlZEVuZFBvc1kpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAoc2hpcEVuZFBvc1kgPj0gcGxhY2VkU3RhcnRQb3NZICYmIHNoaXBFbmRQb3NZIDw9IHBsYWNlZEVuZFBvc1kpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkU2hpcFBsYWNlbWVudCIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9jbGFzc2VzL1NoaXAnXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2NsYXNzZXMvR2FtZWJvYXJkJ1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9jbGFzc2VzL1BsYXllcidcbmltcG9ydCB2YWxpZFNoaXBQbGFjZW1lbnQgZnJvbSAnLi9nYW1lSGVscGVycy92YWxpZFNoaXBQbGFjZW1lbnQnXG5pbXBvcnQgY3JlYXRlU2hpcFdpdGhQb3MgZnJvbSAnLi9nYW1lSGVscGVycy9jcmVhdGVTaGlwV2l0aFBvcydcbmltcG9ydCB2YWxpZFNoaXBIb3ZlciBmcm9tICcuL2dhbWVIZWxwZXJzL3ZhbGlkU2hpcEhvdmVyJ1xuXG5jb25zdCBwbGF5ZXJPbmUgPSBuZXcgUGxheWVyKCdDYXJsb3MnLCAncGxheWVyT25lJylcbmNvbnN0IHBsYXllclR3byA9IG5ldyBQbGF5ZXIoJ0FudGhvbnknLCAncGxheWVyVHdvJylcbmNvbnN0IGF4aXMgPSAnWCdcbmNvbnN0IHNoaXBMZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdXG5jb25zdCBhdXRvUGxhY2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0b1BsYWNlQnV0dG9uJylcbmNvbnN0IHRvdGFsU2hpcHMgPSA1XG5cbmxldCBnYW1lU3RhcnRlZCA9IGZhbHNlXG5sZXQgY3VycmVudFBsYXllclR1cm4gPSBwbGF5ZXJPbmVcbmxldCBjdXJyU2hpcExlbmd0aEluZGV4ID0gMFxubGV0IGhvdmVyZWRFbGVtcyA9IFtdXG5sZXQgaG92ZXJlZFBvcyA9IFtdXG5cbmNvbnN0IGF0dGFja1Bvc2l0aW9uID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHBvcyA9IGV2ZW50LnRhcmdldFxuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKHBvcy5nZXRBdHRyaWJ1dGUoJ3gnKSksIE51bWJlcihwb3MuZ2V0QXR0cmlidXRlKCd5JykpXVxuXG5cbiAgcG9zLmNsYXNzTGlzdC5hZGQoJ2hpdCcpXG5cbiAgY29uc29sZS5sb2coeCwgeSlcbn1cblxuXG5jb25zdCBjbGVhckhvdmVyRWxlbUNvbG9ycyA9ICgpID0+IHtcbiAgaG92ZXJlZEVsZW1zLmZvckVhY2goKGVsZW0pID0+IGVsZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyM1Nzc1QjAnKVxuICBob3ZlcmVkRWxlbXMgPSBbXVxuICBob3ZlcmVkUG9zID0gW11cbn1cblxuY29uc3QgY2xlYXJBbGxFbGVtQ29sb3JzID0gKHBsYXllcikgPT4ge1xuICBjb25zdCBhbGxQb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtwbGF5ZXJ9IC5wb3NpdGlvbmApXG4gIGFsbFBvcy5mb3JFYWNoKChlbGVtKSA9PiBlbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjNTc3NUIwJylcbiAgaG92ZXJlZEVsZW1zID0gW11cbiAgaG92ZXJlZFBvcyA9IFtdXG59XG5cblxuXG5jb25zdCBjbGVhckdhbWVib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgaWYgKHBsYXllciA9PT0gJ3BsYXllck9uZScpIHtcbiAgICBwbGF5ZXJPbmUuZ2V0R2FtZWJvYXJkKCkuY2xlYXJHYW1lYm9hcmQoKVxuICB9IGVsc2UgaWYgKHBsYXllciA9PT0gJ3BsYXllclR3bycpIHtcbiAgICBwbGF5ZXJUd28uZ2V0R2FtZWJvYXJkKCkuY2xlYXJHYW1lYm9hcmQoKVxuICB9XG4gIGNvbnNvbGUubG9nKHBsYXllck9uZS5nZXRHYW1lYm9hcmQoKS5nZXRQbGFjZWRTaGlwcygpKVxuXG4gIGdhbWVTdGFydGVkID0gZmFsc2VcbiAgY2xlYXJBbGxFbGVtQ29sb3JzKHBsYXllcilcbn1cblxuY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xuICBjb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZHMnKVxuICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkJylcbiAgY29uc3QgcGxheWVyVHdvR2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllclR3bycpXG5cbiAgZ2FtZWJvYXJkcy5jbGFzc0xpc3QucmVtb3ZlKCdjZW50ZXJHYW1lYm9hcmRzJylcbiAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYWNpbmdTaGlwcycpXG4gIHBsYXllclR3b0dhbWVib2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5ZXJUd29HYW1lTm90U3RhcnRlZCcpXG5cbiAgY29uc29sZS5sb2coJ0FsbCBvZiBwbGF5ZXJPbmVzIHNoaXBzIGhhdmUgYmVlbiBwbGFjZWQuJylcbiAgZ2FtZVN0YXJ0ZWQgPSB0cnVlXG5cbn1cblxuY29uc3QgaGFuZGxlSG92ZXJQb3NpdGlvbiA9IChldmVudCkgPT4ge1xuICBjbGVhckhvdmVyRWxlbUNvbG9ycygpXG4gIGlmKGdhbWVTdGFydGVkID09PSBmYWxzZSkge1xuICAgIGNvbnN0IGVsZW0gPSBldmVudC50YXJnZXRcbiAgICBwbGFjZVNoaXAoZWxlbSwgYXhpcylcbiAgfVxufVxuXG5jb25zdCBwbGFjZVNoaXAgPSAoZWxlbSwgYXhpcykgPT4ge1xuXG4gIGlmIChnYW1lU3RhcnRlZCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3Qgc2hpcExlbiA9IHNoaXBMZW5ndGhzW2N1cnJTaGlwTGVuZ3RoSW5kZXhdXG5cbiAgaWYgKGF4aXMgPT09ICdYJykge1xuICAgIGlmICh2YWxpZFNoaXBIb3ZlcihzaGlwTGVuLCBlbGVtLCBheGlzLCBjdXJyZW50UGxheWVyVHVybikpIHtcbiAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZFNoaXBQbGFjZW1lbnQnKVxuICAgICAgcGxhY2VTaGlwWChzaGlwTGVuLCBlbGVtKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnQ0hBTkdORyBDVVJTT1InKVxuICAgICAgY29uc29sZS5sb2coZWxlbSlcbiAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnaW52YWxpZFNoaXBQbGFjZW1lbnQnKVxuICAgIH1cbiAgfSBlbHNlIGlmIChheGlzID09PSAnWScpIHtcbiAgICBpZiAodmFsaWRTaGlwSG92ZXIoc2hpcExlbiwgZWxlbSwgYXhpcywgY3VycmVudFBsYXllclR1cm4pKSB7XG4gICAgICBwbGFjZVNoaXBZKHNoaXBMZW4sIGVsZW0pXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHBsYWNlU2hpcFggPSAoc2hpcExlbiwgZWxlbSkgPT4ge1xuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3knKSldXG4gIGNvbnN0IGZpbmFsU2hpcFBvc2l0aW9uWCA9ICh4ICsgc2hpcExlbikgLSAxXG5cbiAgaWYgKGZpbmFsU2hpcFBvc2l0aW9uWCA8PSA5KSB7XG5cbiAgICBmb3IobGV0IGkgPSB4OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWDsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3g9XCIke2l9XCJdW3k9XCIke3l9XCJdYClbMF1cbiAgICAgIGhvdmVyZWRFbGVtcy5wdXNoKGVsZW0pXG4gICAgICBlbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSdcbiAgICB9XG5cbiAgfVxufVxuXG5jb25zdCBwbGFjZVNoaXBZID0gKHNoaXBMZW4sIHBvcykgPT4ge1xuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKHBvcy5nZXRBdHRyaWJ1dGUoJ3gnKSksIE51bWJlcihwb3MuZ2V0QXR0cmlidXRlKCd5JykpXVxuICBjb25zdCBmaW5hbFNoaXBQb3NpdGlvblkgPSAoeSArIHNoaXBMZW4pIC0gMVxuXG4gIGlmIChmaW5hbFNoaXBQb3NpdGlvblkgPD0gOSkge1xuICAgIGNvbnNvbGUubG9nKHgsIHkpXG5cbiAgICBmb3IobGV0IGkgPSB5OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWTsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3g9XCIke3h9XCJdW3k9XCIke2l9XCJdYClbMF1cbiAgICAgIGhvdmVyZWRFbGVtcy5wdXNoKGVsZW0pXG4gICAgICBlbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSdcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgZmluYWxpemVTaGlwUGxhY2VtZW50ID0gKCkgPT4ge1xuXG4gIGNvbnNvbGUubG9nKCdwbGFjaW5nIHNoaXAnKVxuICBjb25zb2xlLmxvZyhnYW1lU3RhcnRlZClcblxuICBpZiAoZ2FtZVN0YXJ0ZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBzaGlwTGVuID0gaG92ZXJlZEVsZW1zLmxlbmd0aFxuICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbiwgYXhpcylcbiAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdXG5cbiAgaG92ZXJlZEVsZW1zLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICBjb25zdCB4ID0gTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpXG4gICAgY29uc3QgeSA9IE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneScpKVxuICAgIHNoaXBQb3NpdGlvbnMucHVzaChbe3gsIHksIGhpdDogZmFsc2V9XSlcbiAgfSlcblxuICBzaGlwLnNldFBvc2l0aW9ucyhzaGlwUG9zaXRpb25zKVxuXG4gIGlmICh2YWxpZFNoaXBQbGFjZW1lbnQoY3VycmVudFBsYXllclR1cm4sIHNoaXApKSB7XG4gICAgXG4gICAgcGxheWVyT25lLmdldEdhbWVib2FyZCgpLnBsYWNlU2hpcChzaGlwKVxuXG4gICAgaG92ZXJlZEVsZW1zID0gW11cbiAgICBjdXJyU2hpcExlbmd0aEluZGV4ICs9IDFcbiAgfVxuXG4gIGlmKHBsYXllck9uZS5nZXRHYW1lYm9hcmQoKS5nZXRQbGFjZWRTaGlwcygpLmxlbmd0aCA9PT0gNSkge1xuICAgIHN0YXJ0R2FtZSgpXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlQXV0b1BsYWNlQ2xpY2sgPSAoKSA9PiB7XG4gIGF1dG9QbGFjZUFsbFNoaXBzKCdwbGF5ZXJPbmUnKVxufVxuXG5jb25zdCBnZXRSYW5kb21JbnQgPSAobWluLCBtYXgpID0+IHtcbiAgbWluID0gTWF0aC5jZWlsKG1pbik7XG4gIG1heCA9IE1hdGguZmxvb3IobWF4KTtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG59XG5cblxuY29uc3QgYXV0b1BsYWNlQWxsU2hpcHMgPSAocGxheWVyKSA9PiB7XG4gIGlmIChnYW1lU3RhcnRlZCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7cGxheWVyfWApXG4gIGNsZWFyR2FtZWJvYXJkKHBsYXllcilcblxuICBpZiAocGxheWVyID09PSBwbGF5ZXJPbmUuZ2V0UGxheWVyTGFiZWwoKSkge1xuICAgIGNvbnNvbGUubG9nKCdoZWxsbyBwbGF5ZXIgb25lJylcblxuICAgIGxldCBudW1PZlBsYWNlZFNoaXBzID0gcGxheWVyT25lLmdldEdhbWVib2FyZCgpLmdldFBsYWNlZFNoaXBzKCkubGVuZ3RoXG5cbiAgICBjb25zb2xlLmxvZyhudW1PZlBsYWNlZFNoaXBzKVxuICAgIGxldCBpID0gMDtcblxuICAgIHdoaWxlIChpIDwgdG90YWxTaGlwcykge1xuICAgICAgY29uc3QgeCA9IGdldFJhbmRvbUludCgwLCA5KVxuICAgICAgY29uc3QgeSA9IGdldFJhbmRvbUludCgwLCA5KVxuXG4gICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3g9XCIke3h9XCJdW3k9XCIke3l9XCJdYClbMF1cbiAgICAgIHBsYWNlU2hpcChlbGVtLCBheGlzKVxuICAgICAgZWxlbS5jbGljaygpXG5cbiAgICAgIGNvbnNvbGUubG9nKG51bU9mUGxhY2VkU2hpcHMpXG4gICAgICBpICs9IDFcblxuICAgIH1cblxuXG4gIH0gZWxzZSBpZiAocGxheWVyID09PSBwbGF5ZXJUd28uZ2V0UGxheWVyTGFiZWwoKSkge1xuXG4gIH1cblxuICBjb25zb2xlLmxvZyhnYW1lYm9hcmQpXG59XG5cbmNvbnN0IGRpc3BsYXlHYW1lYm9hcmQgPSAocGxheWVyKSA9PiB7XG4gIGNvbnN0IGdhbWVib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkcycpXG4gIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGdhbWVib2FyZC5jbGFzc0xpc3QuYWRkKCdnYW1lYm9hcmQnLCBwbGF5ZXIpXG5cbiAgaWYgKHBsYXllciA9PT0gJ3BsYXllck9uZScpIHtcbiAgICBnYW1lYm9hcmRzLmNsYXNzTGlzdC5hZGQoJ2NlbnRlckdhbWVib2FyZHMnKVxuICAgIGdhbWVib2FyZC5jbGFzc0xpc3QuYWRkKCdwbGFjaW5nU2hpcHMnKVxuICB9IGVsc2UgaWYgKHBsYXllciA9PT0gJ3BsYXllclR3bycpIHtcbiAgICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgncGxheWVyVHdvR2FtZU5vdFN0YXJ0ZWQnKVxuICB9XG4gIFxuICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcbiAgICBcbiAgICBmb3IobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xuICAgICAgbGV0IHBvc2l0aW9uRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBwb3NpdGlvbkVsZW0uc2V0QXR0cmlidXRlKCd4JywgeClcbiAgICAgIHBvc2l0aW9uRWxlbS5zZXRBdHRyaWJ1dGUoJ3knLCB5KVxuICAgICAgcG9zaXRpb25FbGVtLmNsYXNzTGlzdC5hZGQoJ3Bvc2l0aW9uJylcbiAgICAgIFxuICAgICAgaWYgKHBsYXllciA9PT0gJ3BsYXllck9uZScpIHtcbiAgICAgICAgcG9zaXRpb25FbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZmluYWxpemVTaGlwUGxhY2VtZW50KVxuICAgICAgICBwb3NpdGlvbkVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaGFuZGxlSG92ZXJQb3NpdGlvbilcbiAgICAgIH0gZWxzZSBpZiAocGxheWVyID09PSAncGxheWVyVHdvJykge1xuICAgICAgICBwb3NpdGlvbkVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2tQb3NpdGlvbilcbiAgICAgIH1cbiAgICAgIGdhbWVib2FyZC5hcHBlbmQocG9zaXRpb25FbGVtKVxuICAgIH1cbiAgfVxuXG4gIGdhbWVib2FyZHMuYXBwZW5kKGdhbWVib2FyZClcbn1cblxuZGlzcGxheUdhbWVib2FyZChwbGF5ZXJPbmUucGxheWVyTGFiZWwpXG5kaXNwbGF5R2FtZWJvYXJkKHBsYXllclR3by5wbGF5ZXJMYWJlbClcblxuYXV0b1BsYWNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQXV0b1BsYWNlQ2xpY2spIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9