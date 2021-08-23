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
  const [x, y] = [Number(elem.getAttribute('x')), Number(elem.getAttribute('y'))]
  const finalShipPositionX = (x + shipLen) - 1
  const hoveredPos = []

  if (finalShipPositionX <= 9) {
    for(let i = x; i <= finalShipPositionX; i++) {
      hoveredPos.push({x: i, y})
    }
  }

  const ship = (0,_createShipWithPos__WEBPACK_IMPORTED_MODULE_0__.default)(hoveredPos, axis)

  console.log(`SHIP PLACEMENT VALID? ${(0,_validShipPlacement__WEBPACK_IMPORTED_MODULE_1__.default)(currentPlayerTurn, ship)}`)
  console.log(hoveredPos)
  console.log(ship)

  return (0,_validShipPlacement__WEBPACK_IMPORTED_MODULE_1__.default)(currentPlayerTurn, ship)
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
      }
    } 

    return true
  } else if (currentPlayerTurn === 'playerTwo') {
    return true
  }
}

const validateShipWithX = () => {

}

const validateShipWithY = () => {

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






const gameStarted = false
const playerOne = new _classes_Player__WEBPACK_IMPORTED_MODULE_2__.Player('Carlos', 'playerOne')
const playerTwo = new _classes_Player__WEBPACK_IMPORTED_MODULE_2__.Player('Anthony', 'playerTwo')
const axis = 'X'
const shipLengths = [5, 4, 3, 3, 2]
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

const handleHoverPosition = (event) => {
  clearElemColors()
  if(gameStarted === false) {
    const elem = event.target
    placeShip(elem, axis)
  }
}

const placeShip = (elem, axis) => {
  const shipLen = shipLengths[currShipLengthIndex]

  if (axis === 'X') {
    if ((0,_gameHelpers_validShipHover__WEBPACK_IMPORTED_MODULE_5__.default)(shipLen, elem, axis, currentPlayerTurn)) {
      placeShipX(shipLen, elem)
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
  const shipPositions = []
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

  console.log(playerOne.getGameboard())
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBLElBQUk7QUFDSixRQUFRLG9FQUFjO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIseUJBQXlCO0FBQzVDLG9EQUFvRCxFQUFFLFFBQVEsRUFBRTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUIseUJBQXlCO0FBQzVDLG9EQUFvRCxFQUFFLFFBQVEsRUFBRTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsK0NBQUk7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGlCQUFpQjtBQUMxQyxHQUFHOztBQUVIOztBQUVBLE1BQU0sd0VBQWtCO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0EsbUJBQW1CLFFBQVE7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jbGFzc2VzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NsYXNzZXMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY2xhc3Nlcy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUhlbHBlcnMvY3JlYXRlU2hpcFdpdGhQb3MuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lSGVscGVycy92YWxpZFNoaXBIb3Zlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVIZWxwZXJzL3ZhbGlkU2hpcFBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBHYW1lYm9hcmQge1xuICBwb3NpdGlvbnMgPSBbXTtcbiAgcGxhY2VkU2hpcHMgPSBbXTtcblxuICBjbGVhckdhbWVib2FyZCgpIHtcbiAgICB0aGlzLnBvc2l0aW9ucyA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBsZXQgcm93ID0gW11cbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIHJvdy5wdXNoKDApXG4gICAgICB9XG4gICAgICBwb3NpdGlvbnMucHVzaChyb3cpXG4gICAgfVxuICB9XG5cbiAgZ2V0UGxhY2VkU2hpcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxhY2VkU2hpcHNcbiAgfVxuXG4gIHBsYWNlU2hpcChzaGlwKSB7XG4gICAgdGhpcy5wbGFjZWRTaGlwcy5wdXNoKHNoaXApXG4gIH1cblxuICByZWNlaXZlQXR0YWNrKGNvb3Jkcykge1xuXG4gIH1cbn0iLCJpbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL0dhbWVib2FyZCdcbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICBuYW1lO1xuICBwbGF5ZXJMYWJlbDtcbiAgZ2FtZWJvYXJkO1xuICB3b24gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihuYW1lLCBwbGF5ZXJMYWJlbCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wbGF5ZXJMYWJlbCA9IHBsYXllckxhYmVsXG4gICAgdGhpcy5nYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKClcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZVxuICB9XG5cbiAgZ2V0UGxheWVyTGFiZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWVyTGFiZWxcbiAgfVxuXG4gIGdldEdhbWVib2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lYm9hcmRcbiAgfVxuXG4gIGhhc1dvbigpIHtcbiAgICByZXR1cm4gdGhpcy53b25cbiAgfVxufSIsImNsYXNzIFNoaXAge1xuICBsZW5ndGg7XG4gIGF4aXM7XG4gIHBvc2l0aW9ucyA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgYXhpcykge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoXG4gICAgdGhpcy5heGlzID0gYXhpc1xuICAgIHRoaXMucG9zaXRpb25zSGl0ID0gW11cbiAgfVxuXG4gIGdldExlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGdldEF4aXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXhpc1xuICB9XG5cbiAgZ2V0UG9zaXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uc1xuICB9XG5cbiAgZ2V0UG9zaXRpb25zSGl0KCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9ucy5maWx0ZXIoKHBvc2l0aW9uKSA9PiBwb3NpdGlvbi5oaXQgIT0gdHJ1ZSlcbiAgfVxuXG4gIGdldEZpcnN0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25zWzBdWzBdXG4gIH1cblxuICBnZXRMYXN0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25zW3RoaXMucG9zaXRpb25zLmxlbmd0aCAtIDFdWzBdXG4gIH1cblxuICBzZXRQb3NpdGlvbnMocG9zaXRpb25zKSB7XG4gICAgaWYocG9zaXRpb25zLmxlbmd0aCA9PT0gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucG9zaXRpb25zID0gcG9zaXRpb25zXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnU2hpcCBjYW5ub3QgZml0ISdcbiAgICB9XG4gIH1cblxuICBoaXQocG9zaXRpb25OdW0pIHtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb25zLmZpbmQocG9zaXRpb24gPT4gcG9zaXRpb24ueCA9PT0gcG9zaXRpb25OdW1bMF0gJiYgcG9zaXRpb24ueSA9PT0gcG9zaXRpb25bMV0pXG4gICAgcG9zaXRpb24uaGl0ID0gdHJ1ZVxuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGNvbnN0IHBvc2l0aW9uc0xlZnQgPSB0aGlzLnBvc2l0aW9ucy5maWx0ZXIoKHBvc2l0aW9uKSA9PiBwb3NpdGlvbi5oaXQgIT0gdHJ1ZSlcbiAgICByZXR1cm4gcG9zaXRpb25zTGVmdCA9PT0gMFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTaGlwLFxufSIsImltcG9ydCB7IFNoaXAgfSBmcm9tICcuLi9jbGFzc2VzL1NoaXAnXG5cbmNvbnN0IGNyZWF0ZVNoaXBXaXRoUG9zID0gKHBvc2l0aW9ucywgYXhpcykgPT4ge1xuICBjb25zdCBzaGlwTGVuID0gcG9zaXRpb25zLmxlbmd0aFxuICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbiwgYXhpcylcbiAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdXG5cbiAgcG9zaXRpb25zLmZvckVhY2goKHBvc2l0aW9uKSA9PiB7XG4gICAgY29uc3Qge3gsIHl9ID0gcG9zaXRpb25cbiAgICBzaGlwUG9zaXRpb25zLnB1c2goW3t4LCB5LCBoaXQ6IGZhbHNlfV0pXG4gIH0pXG5cbiAgc2hpcC5zZXRQb3NpdGlvbnMoc2hpcFBvc2l0aW9ucylcblxuICByZXR1cm4gc2hpcFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTaGlwV2l0aFBvcyIsImltcG9ydCBjcmVhdGVTaGlwV2l0aFBvcyBmcm9tICcuL2NyZWF0ZVNoaXBXaXRoUG9zJ1xuaW1wb3J0IHZhbGlkU2hpcFBsYWNlbWVudCBmcm9tICcuL3ZhbGlkU2hpcFBsYWNlbWVudCdcblxuY29uc3QgdmFsaWRTaGlwSG92ZXIgPSAoc2hpcExlbiwgZWxlbSwgYXhpcywgY3VycmVudFBsYXllclR1cm4pID0+IHtcbiAgY29uc3QgW3gsIHldID0gW051bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneCcpKSwgTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd5JykpXVxuICBjb25zdCBmaW5hbFNoaXBQb3NpdGlvblggPSAoeCArIHNoaXBMZW4pIC0gMVxuICBjb25zdCBob3ZlcmVkUG9zID0gW11cblxuICBpZiAoZmluYWxTaGlwUG9zaXRpb25YIDw9IDkpIHtcbiAgICBmb3IobGV0IGkgPSB4OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWDsgaSsrKSB7XG4gICAgICBob3ZlcmVkUG9zLnB1c2goe3g6IGksIHl9KVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNoaXAgPSBjcmVhdGVTaGlwV2l0aFBvcyhob3ZlcmVkUG9zLCBheGlzKVxuXG4gIGNvbnNvbGUubG9nKGBTSElQIFBMQUNFTUVOVCBWQUxJRD8gJHt2YWxpZFNoaXBQbGFjZW1lbnQoY3VycmVudFBsYXllclR1cm4sIHNoaXApfWApXG4gIGNvbnNvbGUubG9nKGhvdmVyZWRQb3MpXG4gIGNvbnNvbGUubG9nKHNoaXApXG5cbiAgcmV0dXJuIHZhbGlkU2hpcFBsYWNlbWVudChjdXJyZW50UGxheWVyVHVybiwgc2hpcClcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRTaGlwSG92ZXIiLCJjb25zdCB2YWxpZFNoaXBQbGFjZW1lbnQgPSAoY3VycmVudFBsYXllclR1cm4sIHNoaXApID0+IHtcbiAgaWYgKGN1cnJlbnRQbGF5ZXJUdXJuLnBsYXllckxhYmVsID09PSAncGxheWVyT25lJykge1xuICAgIGNvbnN0IHBsYWNlZFNoaXBzID0gY3VycmVudFBsYXllclR1cm4uZ2V0R2FtZWJvYXJkKCkuZ2V0UGxhY2VkU2hpcHMoKVxuICAgIGlmIChzaGlwLmdldFBvc2l0aW9ucygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHNoaXAuZ2V0QXhpcygpID09PSAnWCcpIHtcbiAgICAgIFxuICAgICAgZm9yIChsZXQgcGxhY2VkU2hpcCBvZiBwbGFjZWRTaGlwcykge1xuICAgICAgICBpZiAocGxhY2VkU2hpcC5nZXRBeGlzKCkgPT09IHNoaXAuZ2V0QXhpcygpKSB7XG4gICAgICAgICAgY29uc3QgeyB4OiBzaGlwU3RhcnRQb3NYLCB5OiBzaGlwU3RhcnRQb3NZIH0gPSBzaGlwLmdldEZpcnN0UG9zaXRpb24oKVxuICAgICAgICAgIGNvbnN0IHsgeDogc2hpcEVuZFBvc1gsIHk6IHNoaXBFbmRQb3NZIH0gPSBzaGlwLmdldExhc3RQb3NpdGlvbigpXG4gICAgICAgICAgY29uc3QgeyB4OiBwbGFjZWRTdGFydFBvc1gsIHk6IHBsYWNlZFN0YXJ0UG9zWSB9ID0gcGxhY2VkU2hpcC5nZXRGaXJzdFBvc2l0aW9uKClcbiAgICAgICAgICBjb25zdCB7IHg6IHBsYWNlZEVuZFBvc1gsIHk6IHBsYWNlZEVuZFBvc1kgfSA9IHBsYWNlZFNoaXAuZ2V0TGFzdFBvc2l0aW9uKClcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoc2hpcFN0YXJ0UG9zWSA9PT0gcGxhY2VkU3RhcnRQb3NZKSB7XG4gICAgICAgICAgICBpZiAoc2hpcFN0YXJ0UG9zWCA+PSBwbGFjZWRTdGFydFBvc1ggJiYgc2hpcFN0YXJ0UG9zWCA8PSBwbGFjZWRFbmRQb3NYKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGQUxTRScpXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICBcbiAgICAgICAgICAgIGlmIChzaGlwRW5kUG9zWCA+PSBwbGFjZWRTdGFydFBvc1ggJiYgc2hpcEVuZFBvc1ggPD0gcGxhY2VkRW5kUG9zWCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRkFMU0UnKVxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IFxuXG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIGlmIChjdXJyZW50UGxheWVyVHVybiA9PT0gJ3BsYXllclR3bycpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG59XG5cbmNvbnN0IHZhbGlkYXRlU2hpcFdpdGhYID0gKCkgPT4ge1xuXG59XG5cbmNvbnN0IHZhbGlkYXRlU2hpcFdpdGhZID0gKCkgPT4ge1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkU2hpcFBsYWNlbWVudCIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9jbGFzc2VzL1NoaXAnXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2NsYXNzZXMvR2FtZWJvYXJkJ1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9jbGFzc2VzL1BsYXllcidcbmltcG9ydCB2YWxpZFNoaXBQbGFjZW1lbnQgZnJvbSAnLi9nYW1lSGVscGVycy92YWxpZFNoaXBQbGFjZW1lbnQnXG5pbXBvcnQgY3JlYXRlU2hpcFdpdGhQb3MgZnJvbSAnLi9nYW1lSGVscGVycy9jcmVhdGVTaGlwV2l0aFBvcydcbmltcG9ydCB2YWxpZFNoaXBIb3ZlciBmcm9tICcuL2dhbWVIZWxwZXJzL3ZhbGlkU2hpcEhvdmVyJ1xuY29uc3QgZ2FtZVN0YXJ0ZWQgPSBmYWxzZVxuY29uc3QgcGxheWVyT25lID0gbmV3IFBsYXllcignQ2FybG9zJywgJ3BsYXllck9uZScpXG5jb25zdCBwbGF5ZXJUd28gPSBuZXcgUGxheWVyKCdBbnRob255JywgJ3BsYXllclR3bycpXG5jb25zdCBheGlzID0gJ1gnXG5jb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXVxubGV0IGN1cnJlbnRQbGF5ZXJUdXJuID0gcGxheWVyT25lXG5sZXQgY3VyclNoaXBMZW5ndGhJbmRleCA9IDBcbmxldCBob3ZlcmVkRWxlbXMgPSBbXVxubGV0IGhvdmVyZWRQb3MgPSBbXVxuXG5jb25zdCBhdHRhY2tQb3NpdGlvbiA9IChldmVudCkgPT4ge1xuICBjb25zdCBwb3MgPSBldmVudC50YXJnZXRcbiAgY29uc3QgW3gsIHldID0gW051bWJlcihwb3MuZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIocG9zLmdldEF0dHJpYnV0ZSgneScpKV1cblxuXG4gIHBvcy5jbGFzc0xpc3QuYWRkKCdoaXQnKVxuXG4gIGNvbnNvbGUubG9nKHgsIHkpXG59XG5cblxuY29uc3QgY2xlYXJFbGVtQ29sb3JzID0gKCkgPT4ge1xuICBob3ZlcmVkRWxlbXMuZm9yRWFjaCgoZWxlbSkgPT4gZWxlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzU3NzVCMCcpXG4gIGhvdmVyZWRFbGVtcyA9IFtdXG4gIGhvdmVyZWRQb3MgPSBbXVxufVxuXG5jb25zdCBoYW5kbGVIb3ZlclBvc2l0aW9uID0gKGV2ZW50KSA9PiB7XG4gIGNsZWFyRWxlbUNvbG9ycygpXG4gIGlmKGdhbWVTdGFydGVkID09PSBmYWxzZSkge1xuICAgIGNvbnN0IGVsZW0gPSBldmVudC50YXJnZXRcbiAgICBwbGFjZVNoaXAoZWxlbSwgYXhpcylcbiAgfVxufVxuXG5jb25zdCBwbGFjZVNoaXAgPSAoZWxlbSwgYXhpcykgPT4ge1xuICBjb25zdCBzaGlwTGVuID0gc2hpcExlbmd0aHNbY3VyclNoaXBMZW5ndGhJbmRleF1cblxuICBpZiAoYXhpcyA9PT0gJ1gnKSB7XG4gICAgaWYgKHZhbGlkU2hpcEhvdmVyKHNoaXBMZW4sIGVsZW0sIGF4aXMsIGN1cnJlbnRQbGF5ZXJUdXJuKSkge1xuICAgICAgcGxhY2VTaGlwWChzaGlwTGVuLCBlbGVtKVxuICAgIH1cbiAgfSBlbHNlIGlmIChheGlzID09PSAnWScpIHtcbiAgICBpZiAodmFsaWRTaGlwSG92ZXIoc2hpcExlbiwgZWxlbSwgYXhpcywgY3VycmVudFBsYXllclR1cm4pKSB7XG4gICAgICBwbGFjZVNoaXBZKHNoaXBMZW4sIGVsZW0pXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHBsYWNlU2hpcFggPSAoc2hpcExlbiwgZWxlbSkgPT4ge1xuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3knKSldXG4gIGNvbnN0IGZpbmFsU2hpcFBvc2l0aW9uWCA9ICh4ICsgc2hpcExlbikgLSAxXG5cbiAgaWYgKGZpbmFsU2hpcFBvc2l0aW9uWCA8PSA5KSB7XG5cbiAgICBmb3IobGV0IGkgPSB4OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWDsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3g9XCIke2l9XCJdW3k9XCIke3l9XCJdYClbMF1cbiAgICAgIGhvdmVyZWRFbGVtcy5wdXNoKGVsZW0pXG4gICAgICBlbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSdcbiAgICB9XG4gICAgXG4gIH1cbn1cblxuY29uc3QgcGxhY2VTaGlwWSA9IChzaGlwTGVuLCBwb3MpID0+IHtcbiAgY29uc3QgW3gsIHldID0gW051bWJlcihwb3MuZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIocG9zLmdldEF0dHJpYnV0ZSgneScpKV1cbiAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdXG4gIGNvbnN0IGZpbmFsU2hpcFBvc2l0aW9uWSA9ICh5ICsgc2hpcExlbikgLSAxXG5cbiAgaWYgKGZpbmFsU2hpcFBvc2l0aW9uWSA8PSA5KSB7XG4gICAgY29uc29sZS5sb2coeCwgeSlcblxuICAgIGZvcihsZXQgaSA9IHk7IGkgPD0gZmluYWxTaGlwUG9zaXRpb25ZOyBpKyspIHtcbiAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbeD1cIiR7eH1cIl1beT1cIiR7aX1cIl1gKVswXVxuICAgICAgaG92ZXJlZEVsZW1zLnB1c2goZWxlbSlcbiAgICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJ1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBmaW5hbGl6ZVNoaXBQbGFjZW1lbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHNoaXBMZW4gPSBob3ZlcmVkRWxlbXMubGVuZ3RoXG4gIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChzaGlwTGVuLCBheGlzKVxuICBjb25zdCBzaGlwUG9zaXRpb25zID0gW11cblxuICBob3ZlcmVkRWxlbXMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgIGNvbnN0IHggPSBOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3gnKSlcbiAgICBjb25zdCB5ID0gTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd5JykpXG4gICAgc2hpcFBvc2l0aW9ucy5wdXNoKFt7eCwgeSwgaGl0OiBmYWxzZX1dKVxuICB9KVxuXG4gIHNoaXAuc2V0UG9zaXRpb25zKHNoaXBQb3NpdGlvbnMpXG5cbiAgaWYgKHZhbGlkU2hpcFBsYWNlbWVudChjdXJyZW50UGxheWVyVHVybiwgc2hpcCkpIHtcbiAgICBcbiAgICBwbGF5ZXJPbmUuZ2V0R2FtZWJvYXJkKCkucGxhY2VTaGlwKHNoaXApXG5cbiAgICBob3ZlcmVkRWxlbXMgPSBbXVxuICAgIGN1cnJTaGlwTGVuZ3RoSW5kZXggKz0gMVxuICB9XG5cbiAgY29uc29sZS5sb2cocGxheWVyT25lLmdldEdhbWVib2FyZCgpKVxufVxuXG5jb25zdCBkaXNwbGF5R2FtZWJvYXJkID0gKHBsYXllcikgPT4ge1xuICBjb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZHMnKVxuICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkJywgcGxheWVyKVxuICBcbiAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XG4gICAgXG4gICAgZm9yKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcbiAgICAgIGxldCBwb3NpdGlvbkVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgcG9zaXRpb25FbGVtLnNldEF0dHJpYnV0ZSgneCcsIHgpXG4gICAgICBwb3NpdGlvbkVsZW0uc2V0QXR0cmlidXRlKCd5JywgeSlcbiAgICAgIHBvc2l0aW9uRWxlbS5jbGFzc0xpc3QuYWRkKCdwb3NpdGlvbicpXG4gICAgICBcbiAgICAgIGlmIChwbGF5ZXIgPT09ICdwbGF5ZXJPbmUnKSB7XG4gICAgICAgIHBvc2l0aW9uRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZpbmFsaXplU2hpcFBsYWNlbWVudClcbiAgICAgICAgcG9zaXRpb25FbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGhhbmRsZUhvdmVyUG9zaXRpb24pXG4gICAgICB9IGVsc2UgaWYgKHBsYXllciA9PT0gJ3BsYXllclR3bycpIHtcbiAgICAgICAgcG9zaXRpb25FbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrUG9zaXRpb24pXG4gICAgICB9XG4gICAgICBnYW1lYm9hcmQuYXBwZW5kKHBvc2l0aW9uRWxlbSlcbiAgICB9XG4gIH1cblxuICBnYW1lYm9hcmRzLmFwcGVuZChnYW1lYm9hcmQpXG59XG5cbmRpc3BsYXlHYW1lYm9hcmQocGxheWVyT25lLnBsYXllckxhYmVsKVxuZGlzcGxheUdhbWVib2FyZChwbGF5ZXJUd28ucGxheWVyTGFiZWwpXG5cbmNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbeD1cIjFcIl1gKVxuY29uc29sZS5sb2coZWxlbSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=