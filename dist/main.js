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
    for (let i = 0; i < 10; i++) {
      let row = []
      for(let i = 0; i < 10; i++) {
        row.push(0)
      }
      positions.push(row)
    }
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

  console.log(`SHIP PLACEMENT VALID? ${(0,_validShipPlacement__WEBPACK_IMPORTED_MODULE_1__.default)(currentPlayerTurn, ship)}`)
  console.log(hoveredPos)
  console.log(ship)

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
        console.log('FALSE')
        return false
      }

      if (shipEndPosX >= placedStartPosX && shipEndPosX <= placedEndPosX) {
        console.log('FALSE')
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
    console.log('checkign....')
    console.log(`shipStartPosY: ${shipStartPosY}\nshipEndPosY: ${shipEndPosY}\nplacedStartPosY: ${placedStartPosY}`)
    
    if (shipStartPosY >= placedStartPosY && shipStartPosY <= placedEndPosY) {
      console.log('1')
      return false
    }
    if (shipStartPosY >= placedStartPosY && shipStartPosY <= placedEndPosY) {
      console.log('FALSE')
      console.log('2')
      return false
    }
    if (shipEndPosY >= placedStartPosY && shipEndPosY <= placedEndPosY) {
      console.log('FALSE')
      console.log('3')
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


const clearElemColors = () => {
  hoveredElems.forEach((elem) => elem.style.backgroundColor = '#5775B0')
  hoveredElems = []
  hoveredPos = []
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
  clearElemColors()
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

const elem = document.querySelectorAll(`[x="1"]`)
console.log(elem)
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0EsbUJBQW1CLFFBQVE7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jbGFzc2VzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NsYXNzZXMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY2xhc3Nlcy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUhlbHBlcnMvY3JlYXRlU2hpcFdpdGhQb3MuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lSGVscGVycy92YWxpZFNoaXBIb3Zlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVIZWxwZXJzL3ZhbGlkU2hpcFBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBHYW1lYm9hcmQge1xuICBwb3NpdGlvbnMgPSBbXTtcbiAgcGxhY2VkU2hpcHMgPSBbXTtcblxuICBjbGVhckdhbWVib2FyZCgpIHtcbiAgICB0aGlzLnBvc2l0aW9ucyA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBsZXQgcm93ID0gW11cbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIHJvdy5wdXNoKDApXG4gICAgICB9XG4gICAgICBwb3NpdGlvbnMucHVzaChyb3cpXG4gICAgfVxuICB9XG5cbiAgZ2V0UGxhY2VkU2hpcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxhY2VkU2hpcHNcbiAgfVxuXG4gIHBsYWNlU2hpcChzaGlwKSB7XG4gICAgdGhpcy5wbGFjZWRTaGlwcy5wdXNoKHNoaXApXG4gIH1cblxuICByZWNlaXZlQXR0YWNrKGNvb3Jkcykge1xuXG4gIH1cbn0iLCJpbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL0dhbWVib2FyZCdcbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICBuYW1lO1xuICBwbGF5ZXJMYWJlbDtcbiAgZ2FtZWJvYXJkO1xuICB3b24gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihuYW1lLCBwbGF5ZXJMYWJlbCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wbGF5ZXJMYWJlbCA9IHBsYXllckxhYmVsXG4gICAgdGhpcy5nYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKClcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZVxuICB9XG5cbiAgZ2V0UGxheWVyTGFiZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWVyTGFiZWxcbiAgfVxuXG4gIGdldEdhbWVib2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lYm9hcmRcbiAgfVxuXG4gIGhhc1dvbigpIHtcbiAgICByZXR1cm4gdGhpcy53b25cbiAgfVxufSIsImNsYXNzIFNoaXAge1xuICBsZW5ndGg7XG4gIGF4aXM7XG4gIHBvc2l0aW9ucyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgYXhpcykge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoXG4gICAgdGhpcy5heGlzID0gYXhpc1xuICAgIHRoaXMucG9zaXRpb25zSGl0ID0gW11cbiAgfVxuXG4gIGdldExlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGdldEF4aXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXhpc1xuICB9XG5cbiAgZ2V0UG9zaXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uc1xuICB9XG5cbiAgZ2V0UG9zaXRpb25zSGl0KCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9ucy5maWx0ZXIoKHBvc2l0aW9uKSA9PiBwb3NpdGlvbi5oaXQgIT0gdHJ1ZSlcbiAgfVxuXG4gIGdldEZpcnN0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25zWzBdWzBdXG4gIH1cblxuICBnZXRMYXN0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25zW3RoaXMucG9zaXRpb25zLmxlbmd0aCAtIDFdWzBdXG4gIH1cblxuICBzZXRQb3NpdGlvbnMocG9zaXRpb25zKSB7XG4gICAgaWYocG9zaXRpb25zLmxlbmd0aCA9PT0gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucG9zaXRpb25zID0gcG9zaXRpb25zXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnU2hpcCBjYW5ub3QgZml0ISdcbiAgICB9XG4gIH1cblxuICBoaXQocG9zaXRpb25OdW0pIHtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb25zLmZpbmQocG9zaXRpb24gPT4gcG9zaXRpb24ueCA9PT0gcG9zaXRpb25OdW1bMF0gJiYgcG9zaXRpb24ueSA9PT0gcG9zaXRpb25bMV0pXG4gICAgcG9zaXRpb24uaGl0ID0gdHJ1ZVxuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGNvbnN0IHBvc2l0aW9uc0xlZnQgPSB0aGlzLnBvc2l0aW9ucy5maWx0ZXIoKHBvc2l0aW9uKSA9PiBwb3NpdGlvbi5oaXQgIT0gdHJ1ZSlcbiAgICByZXR1cm4gcG9zaXRpb25zTGVmdCA9PT0gMFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTaGlwLFxufSIsImltcG9ydCB7IFNoaXAgfSBmcm9tICcuLi9jbGFzc2VzL1NoaXAnXG5cbmNvbnN0IGNyZWF0ZVNoaXBXaXRoUG9zID0gKHBvc2l0aW9ucywgYXhpcykgPT4ge1xuICBjb25zdCBzaGlwTGVuID0gcG9zaXRpb25zLmxlbmd0aFxuICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbiwgYXhpcylcbiAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdXG5cbiAgcG9zaXRpb25zLmZvckVhY2goKHBvc2l0aW9uKSA9PiB7XG4gICAgY29uc3Qge3gsIHl9ID0gcG9zaXRpb25cbiAgICBzaGlwUG9zaXRpb25zLnB1c2goW3t4LCB5LCBoaXQ6IGZhbHNlfV0pXG4gIH0pXG5cbiAgc2hpcC5zZXRQb3NpdGlvbnMoc2hpcFBvc2l0aW9ucylcblxuICByZXR1cm4gc2hpcFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTaGlwV2l0aFBvcyIsImltcG9ydCBjcmVhdGVTaGlwV2l0aFBvcyBmcm9tICcuL2NyZWF0ZVNoaXBXaXRoUG9zJ1xuaW1wb3J0IHZhbGlkU2hpcFBsYWNlbWVudCBmcm9tICcuL3ZhbGlkU2hpcFBsYWNlbWVudCdcblxuY29uc3QgdmFsaWRTaGlwSG92ZXIgPSAoc2hpcExlbiwgZWxlbSwgYXhpcywgY3VycmVudFBsYXllclR1cm4pID0+IHtcbiAgY29uc3QgaG92ZXJlZFBvcyA9IGF4aXMgPT09ICdYJyA/IGdldEhvdmVyZWRQb3NYKGVsZW0sIHNoaXBMZW4pIDogZ2V0SG92ZXJlZFBvc1koZWxlbSwgc2hpcExlbilcbiAgY29uc3Qgc2hpcCA9IGNyZWF0ZVNoaXBXaXRoUG9zKGhvdmVyZWRQb3MsIGF4aXMpXG5cbiAgY29uc29sZS5sb2coYFNISVAgUExBQ0VNRU5UIFZBTElEPyAke3ZhbGlkU2hpcFBsYWNlbWVudChjdXJyZW50UGxheWVyVHVybiwgc2hpcCl9YClcbiAgY29uc29sZS5sb2coaG92ZXJlZFBvcylcbiAgY29uc29sZS5sb2coc2hpcClcblxuICByZXR1cm4gdmFsaWRTaGlwUGxhY2VtZW50KGN1cnJlbnRQbGF5ZXJUdXJuLCBzaGlwKVxufVxuXG5jb25zdCBnZXRIb3ZlcmVkUG9zWCA9IChlbGVtLCBzaGlwTGVuKSA9PiB7XG4gIGNvbnN0IFt4LCB5XSA9IFtOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3gnKSksIE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneScpKV1cbiAgY29uc3QgZmluYWxTaGlwUG9zaXRpb25YID0gKHggKyBzaGlwTGVuKSAtIDFcbiAgY29uc3QgaG92ZXJlZFBvcyA9IFtdXG5cbiAgaWYgKGZpbmFsU2hpcFBvc2l0aW9uWCA8PSA5KSB7XG4gICAgZm9yKGxldCBpID0geDsgaSA8PSBmaW5hbFNoaXBQb3NpdGlvblg7IGkrKykge1xuICAgICAgaG92ZXJlZFBvcy5wdXNoKHt4OiBpLCB5fSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaG92ZXJlZFBvc1xufVxuXG5jb25zdCBnZXRIb3ZlcmVkUG9zWSA9IChlbGVtLCBzaGlwTGVuKSA9PiB7XG4gIGNvbnN0IFt4LCB5XSA9IFtOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3gnKSksIE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneScpKV1cbiAgY29uc3QgZmluYWxTaGlwUG9zaXRpb25ZID0gKHkgKyBzaGlwTGVuKSAtIDFcbiAgY29uc3QgaG92ZXJlZFBvcyA9IFtdXG5cbiAgaWYgKGZpbmFsU2hpcFBvc2l0aW9uWSA8PSA5KSB7XG4gICAgZm9yKGxldCBpID0geTsgaSA8PSBmaW5hbFNoaXBQb3NpdGlvblk7IGkrKykge1xuICAgICAgaG92ZXJlZFBvcy5wdXNoKHt4LCB5OiBpfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaG92ZXJlZFBvc1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZFNoaXBIb3ZlciIsImNvbnN0IHZhbGlkU2hpcFBsYWNlbWVudCA9IChjdXJyZW50UGxheWVyVHVybiwgc2hpcCkgPT4ge1xuICBpZiAoY3VycmVudFBsYXllclR1cm4ucGxheWVyTGFiZWwgPT09ICdwbGF5ZXJPbmUnKSB7XG4gICAgY29uc3QgcGxhY2VkU2hpcHMgPSBjdXJyZW50UGxheWVyVHVybi5nZXRHYW1lYm9hcmQoKS5nZXRQbGFjZWRTaGlwcygpXG4gICAgaWYgKHNoaXAuZ2V0UG9zaXRpb25zKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoc2hpcC5nZXRBeGlzKCkgPT09ICdYJykge1xuICAgICAgXG4gICAgICBmb3IgKGxldCBwbGFjZWRTaGlwIG9mIHBsYWNlZFNoaXBzKSB7XG4gICAgICAgIGlmICh2YWxpZGF0ZVNoaXBXaXRoWChzaGlwLCBwbGFjZWRTaGlwKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2hpcC5nZXRBeGlzKCkgPT09ICdZJykge1xuICAgICAgZm9yIChsZXQgcGxhY2VkU2hpcCBvZiBwbGFjZWRTaGlwcykge1xuICAgICAgICBpZiAodmFsaWRhdGVTaGlwV2l0aFkoc2hpcCwgcGxhY2VkU2hpcCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoY3VycmVudFBsYXllclR1cm4gPT09ICdwbGF5ZXJUd28nKSB7XG5cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmNvbnN0IHZhbGlkYXRlU2hpcFdpdGhYID0gKHNoaXAsIHBsYWNlZFNoaXApID0+IHtcbiAgaWYgKHBsYWNlZFNoaXAuZ2V0QXhpcygpID09PSBzaGlwLmdldEF4aXMoKSkge1xuICAgIGNvbnN0IHsgeDogc2hpcFN0YXJ0UG9zWCwgeTogc2hpcFN0YXJ0UG9zWSB9ID0gc2hpcC5nZXRGaXJzdFBvc2l0aW9uKClcbiAgICBjb25zdCB7IHg6IHNoaXBFbmRQb3NYLCB5OiBzaGlwRW5kUG9zWSB9ID0gc2hpcC5nZXRMYXN0UG9zaXRpb24oKVxuICAgIGNvbnN0IHsgeDogcGxhY2VkU3RhcnRQb3NYLCB5OiBwbGFjZWRTdGFydFBvc1kgfSA9IHBsYWNlZFNoaXAuZ2V0Rmlyc3RQb3NpdGlvbigpXG4gICAgY29uc3QgeyB4OiBwbGFjZWRFbmRQb3NYLCB5OiBwbGFjZWRFbmRQb3NZIH0gPSBwbGFjZWRTaGlwLmdldExhc3RQb3NpdGlvbigpXG4gICAgXG4gICAgaWYgKHNoaXBTdGFydFBvc1kgPT09IHBsYWNlZFN0YXJ0UG9zWSkge1xuICAgICAgaWYgKHNoaXBTdGFydFBvc1ggPj0gcGxhY2VkU3RhcnRQb3NYICYmIHNoaXBTdGFydFBvc1ggPD0gcGxhY2VkRW5kUG9zWCkge1xuICAgICAgICBjb25zb2xlLmxvZygnRkFMU0UnKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cblxuICAgICAgaWYgKHNoaXBFbmRQb3NYID49IHBsYWNlZFN0YXJ0UG9zWCAmJiBzaGlwRW5kUG9zWCA8PSBwbGFjZWRFbmRQb3NYKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGQUxTRScpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmNvbnN0IHZhbGlkYXRlU2hpcFdpdGhZID0gKHNoaXAsIHBsYWNlZFNoaXApID0+IHtcbiAgY29uc3QgeyB4OiBzaGlwU3RhcnRQb3NYLCB5OiBzaGlwU3RhcnRQb3NZIH0gPSBzaGlwLmdldEZpcnN0UG9zaXRpb24oKVxuICBjb25zdCB7IHg6IHNoaXBFbmRQb3NYLCB5OiBzaGlwRW5kUG9zWSB9ID0gc2hpcC5nZXRMYXN0UG9zaXRpb24oKVxuICBjb25zdCB7IHg6IHBsYWNlZFN0YXJ0UG9zWCwgeTogcGxhY2VkU3RhcnRQb3NZIH0gPSBwbGFjZWRTaGlwLmdldEZpcnN0UG9zaXRpb24oKVxuICBjb25zdCB7IHg6IHBsYWNlZEVuZFBvc1gsIHk6IHBsYWNlZEVuZFBvc1kgfSA9IHBsYWNlZFNoaXAuZ2V0TGFzdFBvc2l0aW9uKClcbiAgXG4gIGlmIChzaGlwU3RhcnRQb3NYID09PSBwbGFjZWRTdGFydFBvc1gpIHtcbiAgICBjb25zb2xlLmxvZygnY2hlY2tpZ24uLi4uJylcbiAgICBjb25zb2xlLmxvZyhgc2hpcFN0YXJ0UG9zWTogJHtzaGlwU3RhcnRQb3NZfVxcbnNoaXBFbmRQb3NZOiAke3NoaXBFbmRQb3NZfVxcbnBsYWNlZFN0YXJ0UG9zWTogJHtwbGFjZWRTdGFydFBvc1l9YClcbiAgICBcbiAgICBpZiAoc2hpcFN0YXJ0UG9zWSA+PSBwbGFjZWRTdGFydFBvc1kgJiYgc2hpcFN0YXJ0UG9zWSA8PSBwbGFjZWRFbmRQb3NZKSB7XG4gICAgICBjb25zb2xlLmxvZygnMScpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKHNoaXBTdGFydFBvc1kgPj0gcGxhY2VkU3RhcnRQb3NZICYmIHNoaXBTdGFydFBvc1kgPD0gcGxhY2VkRW5kUG9zWSkge1xuICAgICAgY29uc29sZS5sb2coJ0ZBTFNFJylcbiAgICAgIGNvbnNvbGUubG9nKCcyJylcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAoc2hpcEVuZFBvc1kgPj0gcGxhY2VkU3RhcnRQb3NZICYmIHNoaXBFbmRQb3NZIDw9IHBsYWNlZEVuZFBvc1kpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdGQUxTRScpXG4gICAgICBjb25zb2xlLmxvZygnMycpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZFNoaXBQbGFjZW1lbnQiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vY2xhc3Nlcy9TaGlwJ1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9jbGFzc2VzL0dhbWVib2FyZCdcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vY2xhc3Nlcy9QbGF5ZXInXG5pbXBvcnQgdmFsaWRTaGlwUGxhY2VtZW50IGZyb20gJy4vZ2FtZUhlbHBlcnMvdmFsaWRTaGlwUGxhY2VtZW50J1xuaW1wb3J0IGNyZWF0ZVNoaXBXaXRoUG9zIGZyb20gJy4vZ2FtZUhlbHBlcnMvY3JlYXRlU2hpcFdpdGhQb3MnXG5pbXBvcnQgdmFsaWRTaGlwSG92ZXIgZnJvbSAnLi9nYW1lSGVscGVycy92YWxpZFNoaXBIb3ZlcidcblxuY29uc3QgcGxheWVyT25lID0gbmV3IFBsYXllcignQ2FybG9zJywgJ3BsYXllck9uZScpXG5jb25zdCBwbGF5ZXJUd28gPSBuZXcgUGxheWVyKCdBbnRob255JywgJ3BsYXllclR3bycpXG5jb25zdCBheGlzID0gJ1gnXG5jb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXVxuXG5sZXQgZ2FtZVN0YXJ0ZWQgPSBmYWxzZVxubGV0IGN1cnJlbnRQbGF5ZXJUdXJuID0gcGxheWVyT25lXG5sZXQgY3VyclNoaXBMZW5ndGhJbmRleCA9IDBcbmxldCBob3ZlcmVkRWxlbXMgPSBbXVxubGV0IGhvdmVyZWRQb3MgPSBbXVxuXG5jb25zdCBhdHRhY2tQb3NpdGlvbiA9IChldmVudCkgPT4ge1xuICBjb25zdCBwb3MgPSBldmVudC50YXJnZXRcbiAgY29uc3QgW3gsIHldID0gW051bWJlcihwb3MuZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIocG9zLmdldEF0dHJpYnV0ZSgneScpKV1cblxuXG4gIHBvcy5jbGFzc0xpc3QuYWRkKCdoaXQnKVxuXG4gIGNvbnNvbGUubG9nKHgsIHkpXG59XG5cblxuY29uc3QgY2xlYXJFbGVtQ29sb3JzID0gKCkgPT4ge1xuICBob3ZlcmVkRWxlbXMuZm9yRWFjaCgoZWxlbSkgPT4gZWxlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzU3NzVCMCcpXG4gIGhvdmVyZWRFbGVtcyA9IFtdXG4gIGhvdmVyZWRQb3MgPSBbXVxufVxuXG5jb25zdCBzdGFydEdhbWUgPSAoKSA9PiB7XG4gIGNvbnN0IGdhbWVib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkcycpXG4gIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQnKVxuICBjb25zdCBwbGF5ZXJUd29HYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyVHdvJylcblxuICBnYW1lYm9hcmRzLmNsYXNzTGlzdC5yZW1vdmUoJ2NlbnRlckdhbWVib2FyZHMnKVxuICBnYW1lYm9hcmQuY2xhc3NMaXN0LnJlbW92ZSgncGxhY2luZ1NoaXBzJylcbiAgcGxheWVyVHdvR2FtZWJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXllclR3b0dhbWVOb3RTdGFydGVkJylcbiAgXG4gIGNvbnNvbGUubG9nKCdBbGwgb2YgcGxheWVyT25lcyBzaGlwcyBoYXZlIGJlZW4gcGxhY2VkLicpXG4gIGdhbWVTdGFydGVkID0gdHJ1ZVxuXG59XG5cbmNvbnN0IGhhbmRsZUhvdmVyUG9zaXRpb24gPSAoZXZlbnQpID0+IHtcbiAgY2xlYXJFbGVtQ29sb3JzKClcbiAgaWYoZ2FtZVN0YXJ0ZWQgPT09IGZhbHNlKSB7XG4gICAgY29uc3QgZWxlbSA9IGV2ZW50LnRhcmdldFxuICAgIHBsYWNlU2hpcChlbGVtLCBheGlzKVxuICB9XG59XG5cbmNvbnN0IHBsYWNlU2hpcCA9IChlbGVtLCBheGlzKSA9PiB7XG5cbiAgaWYgKGdhbWVTdGFydGVkKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBzaGlwTGVuID0gc2hpcExlbmd0aHNbY3VyclNoaXBMZW5ndGhJbmRleF1cblxuICBpZiAoYXhpcyA9PT0gJ1gnKSB7XG4gICAgaWYgKHZhbGlkU2hpcEhvdmVyKHNoaXBMZW4sIGVsZW0sIGF4aXMsIGN1cnJlbnRQbGF5ZXJUdXJuKSkge1xuICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZhbGlkU2hpcFBsYWNlbWVudCcpXG4gICAgICBwbGFjZVNoaXBYKHNoaXBMZW4sIGVsZW0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdDSEFOR05HIENVUlNPUicpXG4gICAgICBjb25zb2xlLmxvZyhlbGVtKVxuICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkU2hpcFBsYWNlbWVudCcpXG4gICAgfVxuICB9IGVsc2UgaWYgKGF4aXMgPT09ICdZJykge1xuICAgIGlmICh2YWxpZFNoaXBIb3ZlcihzaGlwTGVuLCBlbGVtLCBheGlzLCBjdXJyZW50UGxheWVyVHVybikpIHtcbiAgICAgIHBsYWNlU2hpcFkoc2hpcExlbiwgZWxlbSlcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgcGxhY2VTaGlwWCA9IChzaGlwTGVuLCBlbGVtKSA9PiB7XG4gIGNvbnN0IFt4LCB5XSA9IFtOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3gnKSksIE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneScpKV1cbiAgY29uc3QgZmluYWxTaGlwUG9zaXRpb25YID0gKHggKyBzaGlwTGVuKSAtIDFcblxuICBpZiAoZmluYWxTaGlwUG9zaXRpb25YIDw9IDkpIHtcblxuICAgIGZvcihsZXQgaSA9IHg7IGkgPD0gZmluYWxTaGlwUG9zaXRpb25YOyBpKyspIHtcbiAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbeD1cIiR7aX1cIl1beT1cIiR7eX1cIl1gKVswXVxuICAgICAgaG92ZXJlZEVsZW1zLnB1c2goZWxlbSlcbiAgICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJ1xuICAgIH1cblxuICB9XG59XG5cbmNvbnN0IHBsYWNlU2hpcFkgPSAoc2hpcExlbiwgcG9zKSA9PiB7XG4gIGNvbnN0IFt4LCB5XSA9IFtOdW1iZXIocG9zLmdldEF0dHJpYnV0ZSgneCcpKSwgTnVtYmVyKHBvcy5nZXRBdHRyaWJ1dGUoJ3knKSldXG4gIGNvbnN0IGZpbmFsU2hpcFBvc2l0aW9uWSA9ICh5ICsgc2hpcExlbikgLSAxXG5cbiAgaWYgKGZpbmFsU2hpcFBvc2l0aW9uWSA8PSA5KSB7XG4gICAgY29uc29sZS5sb2coeCwgeSlcblxuICAgIGZvcihsZXQgaSA9IHk7IGkgPD0gZmluYWxTaGlwUG9zaXRpb25ZOyBpKyspIHtcbiAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbeD1cIiR7eH1cIl1beT1cIiR7aX1cIl1gKVswXVxuICAgICAgaG92ZXJlZEVsZW1zLnB1c2goZWxlbSlcbiAgICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJ1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBmaW5hbGl6ZVNoaXBQbGFjZW1lbnQgPSAoKSA9PiB7XG5cbiAgaWYgKGdhbWVTdGFydGVkKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3Qgc2hpcExlbiA9IGhvdmVyZWRFbGVtcy5sZW5ndGhcbiAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKHNoaXBMZW4sIGF4aXMpXG4gIGNvbnN0IHNoaXBQb3NpdGlvbnMgPSBbXVxuXG4gIGhvdmVyZWRFbGVtcy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgY29uc3QgeCA9IE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneCcpKVxuICAgIGNvbnN0IHkgPSBOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3knKSlcbiAgICBzaGlwUG9zaXRpb25zLnB1c2goW3t4LCB5LCBoaXQ6IGZhbHNlfV0pXG4gIH0pXG5cbiAgc2hpcC5zZXRQb3NpdGlvbnMoc2hpcFBvc2l0aW9ucylcblxuICBpZiAodmFsaWRTaGlwUGxhY2VtZW50KGN1cnJlbnRQbGF5ZXJUdXJuLCBzaGlwKSkge1xuICAgIFxuICAgIHBsYXllck9uZS5nZXRHYW1lYm9hcmQoKS5wbGFjZVNoaXAoc2hpcClcblxuICAgIGhvdmVyZWRFbGVtcyA9IFtdXG4gICAgY3VyclNoaXBMZW5ndGhJbmRleCArPSAxXG4gIH1cblxuICBpZihwbGF5ZXJPbmUuZ2V0R2FtZWJvYXJkKCkuZ2V0UGxhY2VkU2hpcHMoKS5sZW5ndGggPT09IDUpIHtcbiAgICBzdGFydEdhbWUoKVxuICB9XG59XG5cbmNvbnN0IGRpc3BsYXlHYW1lYm9hcmQgPSAocGxheWVyKSA9PiB7XG4gIGNvbnN0IGdhbWVib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkcycpXG4gIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGdhbWVib2FyZC5jbGFzc0xpc3QuYWRkKCdnYW1lYm9hcmQnLCBwbGF5ZXIpXG5cbiAgaWYgKHBsYXllciA9PT0gJ3BsYXllck9uZScpIHtcbiAgICBnYW1lYm9hcmRzLmNsYXNzTGlzdC5hZGQoJ2NlbnRlckdhbWVib2FyZHMnKVxuICAgIGdhbWVib2FyZC5jbGFzc0xpc3QuYWRkKCdwbGFjaW5nU2hpcHMnKVxuICB9IGVsc2UgaWYgKHBsYXllciA9PT0gJ3BsYXllclR3bycpIHtcbiAgICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgncGxheWVyVHdvR2FtZU5vdFN0YXJ0ZWQnKVxuICB9XG4gIFxuICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcbiAgICBcbiAgICBmb3IobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xuICAgICAgbGV0IHBvc2l0aW9uRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBwb3NpdGlvbkVsZW0uc2V0QXR0cmlidXRlKCd4JywgeClcbiAgICAgIHBvc2l0aW9uRWxlbS5zZXRBdHRyaWJ1dGUoJ3knLCB5KVxuICAgICAgcG9zaXRpb25FbGVtLmNsYXNzTGlzdC5hZGQoJ3Bvc2l0aW9uJylcbiAgICAgIFxuICAgICAgaWYgKHBsYXllciA9PT0gJ3BsYXllck9uZScpIHtcbiAgICAgICAgcG9zaXRpb25FbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZmluYWxpemVTaGlwUGxhY2VtZW50KVxuICAgICAgICBwb3NpdGlvbkVsZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaGFuZGxlSG92ZXJQb3NpdGlvbilcbiAgICAgIH0gZWxzZSBpZiAocGxheWVyID09PSAncGxheWVyVHdvJykge1xuICAgICAgICBwb3NpdGlvbkVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2tQb3NpdGlvbilcbiAgICAgIH1cbiAgICAgIGdhbWVib2FyZC5hcHBlbmQocG9zaXRpb25FbGVtKVxuICAgIH1cbiAgfVxuXG4gIGdhbWVib2FyZHMuYXBwZW5kKGdhbWVib2FyZClcbn1cblxuZGlzcGxheUdhbWVib2FyZChwbGF5ZXJPbmUucGxheWVyTGFiZWwpXG5kaXNwbGF5R2FtZWJvYXJkKHBsYXllclR3by5wbGF5ZXJMYWJlbClcblxuY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFt4PVwiMVwiXWApXG5jb25zb2xlLmxvZyhlbGVtKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==