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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxpQiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY2xhc3Nlcy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jbGFzc2VzL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NsYXNzZXMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVIZWxwZXJzL2NyZWF0ZVNoaXBXaXRoUG9zLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUhlbHBlcnMvdmFsaWRTaGlwSG92ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lSGVscGVycy92YWxpZFNoaXBQbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgcG9zaXRpb25zID0gW107XG4gIHBsYWNlZFNoaXBzID0gW107XG5cbiAgY2xlYXJHYW1lYm9hcmQoKSB7XG4gICAgdGhpcy5wb3NpdGlvbnMgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgbGV0IHJvdyA9IFtdXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICByb3cucHVzaCgwKVxuICAgICAgfVxuICAgICAgcG9zaXRpb25zLnB1c2gocm93KVxuICAgIH1cbiAgfVxuXG4gIGdldFBsYWNlZFNoaXBzKCkge1xuICAgIHJldHVybiB0aGlzLnBsYWNlZFNoaXBzXG4gIH1cblxuICBwbGFjZVNoaXAoc2hpcCkge1xuICAgIHRoaXMucGxhY2VkU2hpcHMucHVzaChzaGlwKVxuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZHMpIHtcblxuICB9XG59IiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9HYW1lYm9hcmQnXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgbmFtZTtcbiAgcGxheWVyTGFiZWw7XG4gIGdhbWVib2FyZDtcbiAgd29uID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IobmFtZSwgcGxheWVyTGFiZWwpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucGxheWVyTGFiZWwgPSBwbGF5ZXJMYWJlbFxuICAgIHRoaXMuZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpXG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWVcbiAgfVxuXG4gIGdldFBsYXllckxhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLnBsYXllckxhYmVsXG4gIH1cblxuICBnZXRHYW1lYm9hcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZWJvYXJkXG4gIH1cblxuICBoYXNXb24oKSB7XG4gICAgcmV0dXJuIHRoaXMud29uXG4gIH1cbn0iLCJjbGFzcyBTaGlwIHtcbiAgbGVuZ3RoO1xuICBheGlzO1xuICBwb3NpdGlvbnMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihsZW5ndGgsIGF4aXMpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aFxuICAgIHRoaXMuYXhpcyA9IGF4aXNcbiAgICB0aGlzLnBvc2l0aW9uc0hpdCA9IFtdXG4gIH1cblxuICBnZXRMZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoXG4gIH1cblxuICBnZXRBeGlzKCkge1xuICAgIHJldHVybiB0aGlzLmF4aXNcbiAgfVxuXG4gIGdldFBvc2l0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbnNcbiAgfVxuXG4gIGdldFBvc2l0aW9uc0hpdCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbnMuZmlsdGVyKChwb3NpdGlvbikgPT4gcG9zaXRpb24uaGl0ICE9IHRydWUpXG4gIH1cblxuICBnZXRGaXJzdFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uc1swXVswXVxuICB9XG5cbiAgZ2V0TGFzdFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uc1t0aGlzLnBvc2l0aW9ucy5sZW5ndGggLSAxXVswXVxuICB9XG5cbiAgc2V0UG9zaXRpb25zKHBvc2l0aW9ucykge1xuICAgIGlmKHBvc2l0aW9ucy5sZW5ndGggPT09IHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnBvc2l0aW9ucyA9IHBvc2l0aW9uc1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ1NoaXAgY2Fubm90IGZpdCEnXG4gICAgfVxuICB9XG5cbiAgaGl0KHBvc2l0aW9uTnVtKSB7XG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9ucy5maW5kKHBvc2l0aW9uID0+IHBvc2l0aW9uLnggPT09IHBvc2l0aW9uTnVtWzBdICYmIHBvc2l0aW9uLnkgPT09IHBvc2l0aW9uWzFdKVxuICAgIHBvc2l0aW9uLmhpdCA9IHRydWVcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBjb25zdCBwb3NpdGlvbnNMZWZ0ID0gdGhpcy5wb3NpdGlvbnMuZmlsdGVyKChwb3NpdGlvbikgPT4gcG9zaXRpb24uaGl0ICE9IHRydWUpXG4gICAgcmV0dXJuIHBvc2l0aW9uc0xlZnQgPT09IDBcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgU2hpcCxcbn0iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi4vY2xhc3Nlcy9TaGlwJ1xuXG5jb25zdCBjcmVhdGVTaGlwV2l0aFBvcyA9IChwb3NpdGlvbnMsIGF4aXMpID0+IHtcbiAgY29uc3Qgc2hpcExlbiA9IHBvc2l0aW9ucy5sZW5ndGhcbiAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKHNoaXBMZW4sIGF4aXMpXG4gIGNvbnN0IHNoaXBQb3NpdGlvbnMgPSBbXVxuXG4gIHBvc2l0aW9ucy5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xuICAgIGNvbnN0IHt4LCB5fSA9IHBvc2l0aW9uXG4gICAgc2hpcFBvc2l0aW9ucy5wdXNoKFt7eCwgeSwgaGl0OiBmYWxzZX1dKVxuICB9KVxuXG4gIHNoaXAuc2V0UG9zaXRpb25zKHNoaXBQb3NpdGlvbnMpXG5cbiAgcmV0dXJuIHNoaXBcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2hpcFdpdGhQb3MiLCJpbXBvcnQgY3JlYXRlU2hpcFdpdGhQb3MgZnJvbSAnLi9jcmVhdGVTaGlwV2l0aFBvcydcbmltcG9ydCB2YWxpZFNoaXBQbGFjZW1lbnQgZnJvbSAnLi92YWxpZFNoaXBQbGFjZW1lbnQnXG5cbmNvbnN0IHZhbGlkU2hpcEhvdmVyID0gKHNoaXBMZW4sIGVsZW0sIGF4aXMsIGN1cnJlbnRQbGF5ZXJUdXJuKSA9PiB7XG4gIGNvbnN0IGhvdmVyZWRQb3MgPSBheGlzID09PSAnWCcgPyBnZXRIb3ZlcmVkUG9zWChlbGVtLCBzaGlwTGVuKSA6IGdldEhvdmVyZWRQb3NZKGVsZW0sIHNoaXBMZW4pXG4gIGNvbnN0IHNoaXAgPSBjcmVhdGVTaGlwV2l0aFBvcyhob3ZlcmVkUG9zLCBheGlzKVxuXG4gIGNvbnNvbGUubG9nKGBTSElQIFBMQUNFTUVOVCBWQUxJRD8gJHt2YWxpZFNoaXBQbGFjZW1lbnQoY3VycmVudFBsYXllclR1cm4sIHNoaXApfWApXG4gIGNvbnNvbGUubG9nKGhvdmVyZWRQb3MpXG4gIGNvbnNvbGUubG9nKHNoaXApXG5cbiAgcmV0dXJuIHZhbGlkU2hpcFBsYWNlbWVudChjdXJyZW50UGxheWVyVHVybiwgc2hpcClcbn1cblxuY29uc3QgZ2V0SG92ZXJlZFBvc1ggPSAoZWxlbSwgc2hpcExlbikgPT4ge1xuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3knKSldXG4gIGNvbnN0IGZpbmFsU2hpcFBvc2l0aW9uWCA9ICh4ICsgc2hpcExlbikgLSAxXG4gIGNvbnN0IGhvdmVyZWRQb3MgPSBbXVxuXG4gIGlmIChmaW5hbFNoaXBQb3NpdGlvblggPD0gOSkge1xuICAgIGZvcihsZXQgaSA9IHg7IGkgPD0gZmluYWxTaGlwUG9zaXRpb25YOyBpKyspIHtcbiAgICAgIGhvdmVyZWRQb3MucHVzaCh7eDogaSwgeX0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGhvdmVyZWRQb3Ncbn1cblxuY29uc3QgZ2V0SG92ZXJlZFBvc1kgPSAoZWxlbSwgc2hpcExlbikgPT4ge1xuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3knKSldXG4gIGNvbnN0IGZpbmFsU2hpcFBvc2l0aW9uWSA9ICh5ICsgc2hpcExlbikgLSAxXG4gIGNvbnN0IGhvdmVyZWRQb3MgPSBbXVxuXG4gIGlmIChmaW5hbFNoaXBQb3NpdGlvblkgPD0gOSkge1xuICAgIGZvcihsZXQgaSA9IHk7IGkgPD0gZmluYWxTaGlwUG9zaXRpb25ZOyBpKyspIHtcbiAgICAgIGhvdmVyZWRQb3MucHVzaCh7eCwgeTogaX0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGhvdmVyZWRQb3Ncbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRTaGlwSG92ZXIiLCJjb25zdCB2YWxpZFNoaXBQbGFjZW1lbnQgPSAoY3VycmVudFBsYXllclR1cm4sIHNoaXApID0+IHtcbiAgaWYgKGN1cnJlbnRQbGF5ZXJUdXJuLnBsYXllckxhYmVsID09PSAncGxheWVyT25lJykge1xuICAgIGNvbnN0IHBsYWNlZFNoaXBzID0gY3VycmVudFBsYXllclR1cm4uZ2V0R2FtZWJvYXJkKCkuZ2V0UGxhY2VkU2hpcHMoKVxuICAgIGlmIChzaGlwLmdldFBvc2l0aW9ucygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHNoaXAuZ2V0QXhpcygpID09PSAnWCcpIHtcbiAgICAgIFxuICAgICAgZm9yIChsZXQgcGxhY2VkU2hpcCBvZiBwbGFjZWRTaGlwcykge1xuICAgICAgICBpZiAodmFsaWRhdGVTaGlwV2l0aFgoc2hpcCwgcGxhY2VkU2hpcCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNoaXAuZ2V0QXhpcygpID09PSAnWScpIHtcbiAgICAgIGZvciAobGV0IHBsYWNlZFNoaXAgb2YgcGxhY2VkU2hpcHMpIHtcbiAgICAgICAgaWYgKHZhbGlkYXRlU2hpcFdpdGhZKHNoaXAsIHBsYWNlZFNoaXApID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGN1cnJlbnRQbGF5ZXJUdXJuID09PSAncGxheWVyVHdvJykge1xuXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCB2YWxpZGF0ZVNoaXBXaXRoWCA9IChzaGlwLCBwbGFjZWRTaGlwKSA9PiB7XG4gIGlmIChwbGFjZWRTaGlwLmdldEF4aXMoKSA9PT0gc2hpcC5nZXRBeGlzKCkpIHtcbiAgICBjb25zdCB7IHg6IHNoaXBTdGFydFBvc1gsIHk6IHNoaXBTdGFydFBvc1kgfSA9IHNoaXAuZ2V0Rmlyc3RQb3NpdGlvbigpXG4gICAgY29uc3QgeyB4OiBzaGlwRW5kUG9zWCwgeTogc2hpcEVuZFBvc1kgfSA9IHNoaXAuZ2V0TGFzdFBvc2l0aW9uKClcbiAgICBjb25zdCB7IHg6IHBsYWNlZFN0YXJ0UG9zWCwgeTogcGxhY2VkU3RhcnRQb3NZIH0gPSBwbGFjZWRTaGlwLmdldEZpcnN0UG9zaXRpb24oKVxuICAgIGNvbnN0IHsgeDogcGxhY2VkRW5kUG9zWCwgeTogcGxhY2VkRW5kUG9zWSB9ID0gcGxhY2VkU2hpcC5nZXRMYXN0UG9zaXRpb24oKVxuICAgIFxuICAgIGlmIChzaGlwU3RhcnRQb3NZID09PSBwbGFjZWRTdGFydFBvc1kpIHtcbiAgICAgIGlmIChzaGlwU3RhcnRQb3NYID49IHBsYWNlZFN0YXJ0UG9zWCAmJiBzaGlwU3RhcnRQb3NYIDw9IHBsYWNlZEVuZFBvc1gpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ZBTFNFJylcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGlmIChzaGlwRW5kUG9zWCA+PSBwbGFjZWRTdGFydFBvc1ggJiYgc2hpcEVuZFBvc1ggPD0gcGxhY2VkRW5kUG9zWCkge1xuICAgICAgICBjb25zb2xlLmxvZygnRkFMU0UnKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCB2YWxpZGF0ZVNoaXBXaXRoWSA9IChzaGlwLCBwbGFjZWRTaGlwKSA9PiB7XG4gIGNvbnN0IHsgeDogc2hpcFN0YXJ0UG9zWCwgeTogc2hpcFN0YXJ0UG9zWSB9ID0gc2hpcC5nZXRGaXJzdFBvc2l0aW9uKClcbiAgY29uc3QgeyB4OiBzaGlwRW5kUG9zWCwgeTogc2hpcEVuZFBvc1kgfSA9IHNoaXAuZ2V0TGFzdFBvc2l0aW9uKClcbiAgY29uc3QgeyB4OiBwbGFjZWRTdGFydFBvc1gsIHk6IHBsYWNlZFN0YXJ0UG9zWSB9ID0gcGxhY2VkU2hpcC5nZXRGaXJzdFBvc2l0aW9uKClcbiAgY29uc3QgeyB4OiBwbGFjZWRFbmRQb3NYLCB5OiBwbGFjZWRFbmRQb3NZIH0gPSBwbGFjZWRTaGlwLmdldExhc3RQb3NpdGlvbigpXG4gIFxuICBpZiAoc2hpcFN0YXJ0UG9zWCA9PT0gcGxhY2VkU3RhcnRQb3NYKSB7XG4gICAgY29uc29sZS5sb2coJ2NoZWNraWduLi4uLicpXG4gICAgY29uc29sZS5sb2coYHNoaXBTdGFydFBvc1k6ICR7c2hpcFN0YXJ0UG9zWX1cXG5zaGlwRW5kUG9zWTogJHtzaGlwRW5kUG9zWX1cXG5wbGFjZWRTdGFydFBvc1k6ICR7cGxhY2VkU3RhcnRQb3NZfWApXG4gICAgXG4gICAgaWYgKHNoaXBTdGFydFBvc1kgPj0gcGxhY2VkU3RhcnRQb3NZICYmIHNoaXBTdGFydFBvc1kgPD0gcGxhY2VkRW5kUG9zWSkge1xuICAgICAgY29uc29sZS5sb2coJzEnKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmIChzaGlwU3RhcnRQb3NZID49IHBsYWNlZFN0YXJ0UG9zWSAmJiBzaGlwU3RhcnRQb3NZIDw9IHBsYWNlZEVuZFBvc1kpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdGQUxTRScpXG4gICAgICBjb25zb2xlLmxvZygnMicpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKHNoaXBFbmRQb3NZID49IHBsYWNlZFN0YXJ0UG9zWSAmJiBzaGlwRW5kUG9zWSA8PSBwbGFjZWRFbmRQb3NZKSB7XG4gICAgICBjb25zb2xlLmxvZygnRkFMU0UnKVxuICAgICAgY29uc29sZS5sb2coJzMnKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRTaGlwUGxhY2VtZW50IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFNoaXAgfSBmcm9tICcuL2NsYXNzZXMvU2hpcCdcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vY2xhc3Nlcy9HYW1lYm9hcmQnXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL2NsYXNzZXMvUGxheWVyJ1xuaW1wb3J0IHZhbGlkU2hpcFBsYWNlbWVudCBmcm9tICcuL2dhbWVIZWxwZXJzL3ZhbGlkU2hpcFBsYWNlbWVudCdcbmltcG9ydCBjcmVhdGVTaGlwV2l0aFBvcyBmcm9tICcuL2dhbWVIZWxwZXJzL2NyZWF0ZVNoaXBXaXRoUG9zJ1xuaW1wb3J0IHZhbGlkU2hpcEhvdmVyIGZyb20gJy4vZ2FtZUhlbHBlcnMvdmFsaWRTaGlwSG92ZXInXG5jb25zdCBnYW1lU3RhcnRlZCA9IGZhbHNlXG5jb25zdCBwbGF5ZXJPbmUgPSBuZXcgUGxheWVyKCdDYXJsb3MnLCAncGxheWVyT25lJylcbmNvbnN0IHBsYXllclR3byA9IG5ldyBQbGF5ZXIoJ0FudGhvbnknLCAncGxheWVyVHdvJylcbmNvbnN0IGF4aXMgPSAnWCdcbmNvbnN0IHNoaXBMZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdXG5sZXQgY3VycmVudFBsYXllclR1cm4gPSBwbGF5ZXJPbmVcbmxldCBjdXJyU2hpcExlbmd0aEluZGV4ID0gMFxubGV0IGhvdmVyZWRFbGVtcyA9IFtdXG5sZXQgaG92ZXJlZFBvcyA9IFtdXG5cbmNvbnN0IGF0dGFja1Bvc2l0aW9uID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHBvcyA9IGV2ZW50LnRhcmdldFxuICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKHBvcy5nZXRBdHRyaWJ1dGUoJ3gnKSksIE51bWJlcihwb3MuZ2V0QXR0cmlidXRlKCd5JykpXVxuXG5cbiAgcG9zLmNsYXNzTGlzdC5hZGQoJ2hpdCcpXG5cbiAgY29uc29sZS5sb2coeCwgeSlcbn1cblxuXG5jb25zdCBjbGVhckVsZW1Db2xvcnMgPSAoKSA9PiB7XG4gIGhvdmVyZWRFbGVtcy5mb3JFYWNoKChlbGVtKSA9PiBlbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjNTc3NUIwJylcbiAgaG92ZXJlZEVsZW1zID0gW11cbiAgaG92ZXJlZFBvcyA9IFtdXG59XG5cbmNvbnN0IGhhbmRsZUhvdmVyUG9zaXRpb24gPSAoZXZlbnQpID0+IHtcbiAgY2xlYXJFbGVtQ29sb3JzKClcbiAgaWYoZ2FtZVN0YXJ0ZWQgPT09IGZhbHNlKSB7XG4gICAgY29uc3QgZWxlbSA9IGV2ZW50LnRhcmdldFxuICAgIHBsYWNlU2hpcChlbGVtLCBheGlzKVxuICB9XG59XG5cbmNvbnN0IHBsYWNlU2hpcCA9IChlbGVtLCBheGlzKSA9PiB7XG4gIGNvbnN0IHNoaXBMZW4gPSBzaGlwTGVuZ3Roc1tjdXJyU2hpcExlbmd0aEluZGV4XVxuXG4gIGlmIChheGlzID09PSAnWCcpIHtcbiAgICBpZiAodmFsaWRTaGlwSG92ZXIoc2hpcExlbiwgZWxlbSwgYXhpcywgY3VycmVudFBsYXllclR1cm4pKSB7XG4gICAgICBwbGFjZVNoaXBYKHNoaXBMZW4sIGVsZW0pXG4gICAgfVxuICB9IGVsc2UgaWYgKGF4aXMgPT09ICdZJykge1xuICAgIGlmICh2YWxpZFNoaXBIb3ZlcihzaGlwTGVuLCBlbGVtLCBheGlzLCBjdXJyZW50UGxheWVyVHVybikpIHtcbiAgICAgIHBsYWNlU2hpcFkoc2hpcExlbiwgZWxlbSlcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgcGxhY2VTaGlwWCA9IChzaGlwTGVuLCBlbGVtKSA9PiB7XG4gIGNvbnN0IFt4LCB5XSA9IFtOdW1iZXIoZWxlbS5nZXRBdHRyaWJ1dGUoJ3gnKSksIE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneScpKV1cbiAgY29uc3QgZmluYWxTaGlwUG9zaXRpb25YID0gKHggKyBzaGlwTGVuKSAtIDFcblxuICBpZiAoZmluYWxTaGlwUG9zaXRpb25YIDw9IDkpIHtcblxuICAgIGZvcihsZXQgaSA9IHg7IGkgPD0gZmluYWxTaGlwUG9zaXRpb25YOyBpKyspIHtcbiAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbeD1cIiR7aX1cIl1beT1cIiR7eX1cIl1gKVswXVxuICAgICAgaG92ZXJlZEVsZW1zLnB1c2goZWxlbSlcbiAgICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJ1xuICAgIH1cblxuICB9XG59XG5cbmNvbnN0IHBsYWNlU2hpcFkgPSAoc2hpcExlbiwgcG9zKSA9PiB7XG4gIGNvbnN0IFt4LCB5XSA9IFtOdW1iZXIocG9zLmdldEF0dHJpYnV0ZSgneCcpKSwgTnVtYmVyKHBvcy5nZXRBdHRyaWJ1dGUoJ3knKSldXG4gIGNvbnN0IHNoaXBQb3NpdGlvbnMgPSBbXVxuICBjb25zdCBmaW5hbFNoaXBQb3NpdGlvblkgPSAoeSArIHNoaXBMZW4pIC0gMVxuXG4gIGlmIChmaW5hbFNoaXBQb3NpdGlvblkgPD0gOSkge1xuICAgIGNvbnNvbGUubG9nKHgsIHkpXG5cbiAgICBmb3IobGV0IGkgPSB5OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWTsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3g9XCIke3h9XCJdW3k9XCIke2l9XCJdYClbMF1cbiAgICAgIGhvdmVyZWRFbGVtcy5wdXNoKGVsZW0pXG4gICAgICBlbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSdcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgZmluYWxpemVTaGlwUGxhY2VtZW50ID0gKCkgPT4ge1xuICBjb25zdCBzaGlwTGVuID0gaG92ZXJlZEVsZW1zLmxlbmd0aFxuICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbiwgYXhpcylcbiAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdXG5cbiAgaG92ZXJlZEVsZW1zLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICBjb25zdCB4ID0gTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd4JykpXG4gICAgY29uc3QgeSA9IE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneScpKVxuICAgIHNoaXBQb3NpdGlvbnMucHVzaChbe3gsIHksIGhpdDogZmFsc2V9XSlcbiAgfSlcblxuICBzaGlwLnNldFBvc2l0aW9ucyhzaGlwUG9zaXRpb25zKVxuXG4gIGlmICh2YWxpZFNoaXBQbGFjZW1lbnQoY3VycmVudFBsYXllclR1cm4sIHNoaXApKSB7XG4gICAgXG4gICAgcGxheWVyT25lLmdldEdhbWVib2FyZCgpLnBsYWNlU2hpcChzaGlwKVxuXG4gICAgaG92ZXJlZEVsZW1zID0gW11cbiAgICBjdXJyU2hpcExlbmd0aEluZGV4ICs9IDFcbiAgfVxuXG4gIGNvbnNvbGUubG9nKHBsYXllck9uZS5nZXRHYW1lYm9hcmQoKSlcbn1cblxuY29uc3QgZGlzcGxheUdhbWVib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgY29uc3QgZ2FtZWJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmRzJylcbiAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoJ2dhbWVib2FyZCcsIHBsYXllcilcbiAgXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgMTA7IHkrKykge1xuICAgIFxuICAgIGZvcihsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XG4gICAgICBsZXQgcG9zaXRpb25FbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIHBvc2l0aW9uRWxlbS5zZXRBdHRyaWJ1dGUoJ3gnLCB4KVxuICAgICAgcG9zaXRpb25FbGVtLnNldEF0dHJpYnV0ZSgneScsIHkpXG4gICAgICBwb3NpdGlvbkVsZW0uY2xhc3NMaXN0LmFkZCgncG9zaXRpb24nKVxuICAgICAgXG4gICAgICBpZiAocGxheWVyID09PSAncGxheWVyT25lJykge1xuICAgICAgICBwb3NpdGlvbkVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmaW5hbGl6ZVNoaXBQbGFjZW1lbnQpXG4gICAgICAgIHBvc2l0aW9uRWxlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBoYW5kbGVIb3ZlclBvc2l0aW9uKVxuICAgICAgfSBlbHNlIGlmIChwbGF5ZXIgPT09ICdwbGF5ZXJUd28nKSB7XG4gICAgICAgIHBvc2l0aW9uRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFja1Bvc2l0aW9uKVxuICAgICAgfVxuICAgICAgZ2FtZWJvYXJkLmFwcGVuZChwb3NpdGlvbkVsZW0pXG4gICAgfVxuICB9XG5cbiAgZ2FtZWJvYXJkcy5hcHBlbmQoZ2FtZWJvYXJkKVxufVxuXG5kaXNwbGF5R2FtZWJvYXJkKHBsYXllck9uZS5wbGF5ZXJMYWJlbClcbmRpc3BsYXlHYW1lYm9hcmQocGxheWVyVHdvLnBsYXllckxhYmVsKVxuXG5jb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3g9XCIxXCJdYClcbmNvbnNvbGUubG9nKGVsZW0pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9