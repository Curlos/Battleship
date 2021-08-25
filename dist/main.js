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

/***/ "./src/classes/ShipPlacement.js":
/*!**************************************!*\
  !*** ./src/classes/ShipPlacement.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShipPlacement": () => (/* binding */ ShipPlacement)
/* harmony export */ });
/* harmony import */ var _gameHelpers_validShipHover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../gameHelpers/validShipHover */ "./src/gameHelpers/validShipHover.js");


let hoveredElems = []

class ShipPlacement {

  gameStarted;
  hoveredElems = [];

  placeShip(elem, axis, shipLengths, currShipLengthIndex, currentPlayerTurn, gameStarted) {

    this.gameStarted = gameStarted

    const shipLen = shipLengths[currShipLengthIndex]
  
    if (axis === 'X') {
      if ((0,_gameHelpers_validShipHover__WEBPACK_IMPORTED_MODULE_0__.default)(shipLen, elem, axis, currentPlayerTurn)) {
        elem.classList.remove('invalidShipPlacement')
        this.placeShipX(shipLen, elem)
      } else {
        console.log('CHANGNG CURSOR')
        console.log(elem)
        elem.classList.add('invalidShipPlacement')
      }
    } else if (axis === 'Y') {
      if ((0,_gameHelpers_validShipHover__WEBPACK_IMPORTED_MODULE_0__.default)(shipLen, elem, axis, currentPlayerTurn)) {
        this.placeShipY(shipLen, elem)
      }
    }
  }
  
  placeShipX(shipLen, elem) {
    const [x, y] = [Number(elem.getAttribute('x')), Number(elem.getAttribute('y'))]
    const finalShipPositionX = (x + shipLen) - 1
  
    if (finalShipPositionX <= 9) {
  
      for(let i = x; i <= finalShipPositionX; i++) {
        const elem = document.querySelectorAll(`[x="${i}"][y="${y}"]`)[0]
        this.hoveredElems.push(elem)
        elem.style.backgroundColor = 'white'
      }
  
    }
  }
  
  placeShipY(shipLen, pos) {
    const [x, y] = [Number(pos.getAttribute('x')), Number(pos.getAttribute('y'))]
    const finalShipPositionY = (y + shipLen) - 1
  
    if (finalShipPositionY <= 9) {
      console.log(x, y)
  
      for(let i = y; i <= finalShipPositionY; i++) {
        const elem = document.querySelectorAll(`[x="${x}"][y="${i}"]`)[0]
        this.hoveredElems.push(elem)
        elem.style.backgroundColor = 'white'
      }
    }
  }
  
  finalizeShipPlacement() {
  
    console.log('placing ship')
    console.log(gameStarted)
  
    if (gameStarted) {
      return
    }
    const shipLen = hoveredElems.length
    const ship = new Ship(shipLen, axis)
    const shipPositions = []
  
    this.hoveredElems.forEach((elem) => {
      const x = Number(elem.getAttribute('x'))
      const y = Number(elem.getAttribute('y'))
      shipPositions.push([{x, y, hit: false}])
    })
  
    ship.setPositions(shipPositions)
  
    if (validShipPlacement(currentPlayerTurn, ship)) {
      
      playerOne.getGameboard().placeShip(ship)
  
      this.hoveredElems = []
      currShipLengthIndex += 1
    }
  
    console.log(playerOne.getGameboard().getPlacedShips())
  }
  
  setHoveredElems(newHoveredElems) {
    this.hoveredElems = newHoveredElems
  }
  
  getHoveredElems() {
    return this.hoveredElems
  }

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
/* harmony import */ var _classes_ShipPlacement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./classes/ShipPlacement */ "./src/classes/ShipPlacement.js");
/* harmony import */ var _gameHelpers_validShipPlacement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gameHelpers/validShipPlacement */ "./src/gameHelpers/validShipPlacement.js");
/* harmony import */ var _gameHelpers_createShipWithPos__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gameHelpers/createShipWithPos */ "./src/gameHelpers/createShipWithPos.js");
/* harmony import */ var _gameHelpers_validShipHover__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./gameHelpers/validShipHover */ "./src/gameHelpers/validShipHover.js");








const playerOne = new _classes_Player__WEBPACK_IMPORTED_MODULE_2__.Player('Carlos', 'playerOne')
const playerTwo = new _classes_Player__WEBPACK_IMPORTED_MODULE_2__.Player('Anthony', 'playerTwo')
const shipPlacement = new _classes_ShipPlacement__WEBPACK_IMPORTED_MODULE_3__.ShipPlacement()
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

  if (gameStarted) {
    return
  }

  clearHoverElemColors()
  const elem = event.target
  shipPlacement.placeShip(elem, axis, shipLengths, currShipLengthIndex, currentPlayerTurn)

  hoveredElems = shipPlacement.getHoveredElems()
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

    while (numOfPlacedShips < totalShips) {
      const x = getRandomInt(0, 9)
      const y = getRandomInt(0, 9)

      const elem = document.querySelectorAll(`[x="${x}"][y="${y}"]`)[0]
      shipPlacement.placeShip(elem, axis, shipLengths, currShipLengthIndex, currentPlayerTurn)
      hoveredElems = shipPlacement.getHoveredElems()
      elem.click()

      numOfPlacedShips = Object.values(playerOne.getGameboard().getPlacedShips()).length
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
        positionElem.addEventListener('click', _classes_ShipPlacement__WEBPACK_IMPORTED_MODULE_3__.ShipPlacement.finalizeShipPlacement)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQ0FBK0MsT0FBTztBQUN0RDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvREFBb0QsRUFBRSxRQUFRLEVBQUU7QUFDaEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUI7QUFDQSxtQkFBbUIsUUFBUTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsdUZBQW1DO0FBQ2xGO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NsYXNzZXMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY2xhc3Nlcy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jbGFzc2VzL1NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jbGFzc2VzL1NoaXBQbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lSGVscGVycy9jcmVhdGVTaGlwV2l0aFBvcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVIZWxwZXJzL3ZhbGlkU2hpcEhvdmVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUhlbHBlcnMvdmFsaWRTaGlwUGxhY2VtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEdhbWVib2FyZCB7XG4gIHBvc2l0aW9ucyA9IFtdO1xuICBwbGFjZWRTaGlwcyA9IFtdO1xuXG4gIGNsZWFyR2FtZWJvYXJkKCkge1xuICAgIHRoaXMucG9zaXRpb25zID0gW11cbiAgICB0aGlzLnBsYWNlZFNoaXBzID0gW11cbiAgfVxuXG4gIGdldFBsYWNlZFNoaXBzKCkge1xuICAgIHJldHVybiB0aGlzLnBsYWNlZFNoaXBzXG4gIH1cblxuICBwbGFjZVNoaXAoc2hpcCkge1xuICAgIHRoaXMucGxhY2VkU2hpcHMucHVzaChzaGlwKVxuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZHMpIHtcblxuICB9XG59IiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9HYW1lYm9hcmQnXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgbmFtZTtcbiAgcGxheWVyTGFiZWw7XG4gIGdhbWVib2FyZDtcbiAgd29uID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IobmFtZSwgcGxheWVyTGFiZWwpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucGxheWVyTGFiZWwgPSBwbGF5ZXJMYWJlbFxuICAgIHRoaXMuZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpXG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWVcbiAgfVxuXG4gIGdldFBsYXllckxhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLnBsYXllckxhYmVsXG4gIH1cblxuICBnZXRHYW1lYm9hcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZWJvYXJkXG4gIH1cblxuICBoYXNXb24oKSB7XG4gICAgcmV0dXJuIHRoaXMud29uXG4gIH1cbn0iLCJjbGFzcyBTaGlwIHtcbiAgbGVuZ3RoO1xuICBheGlzO1xuICBwb3NpdGlvbnMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihsZW5ndGgsIGF4aXMpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aFxuICAgIHRoaXMuYXhpcyA9IGF4aXNcbiAgICB0aGlzLnBvc2l0aW9uc0hpdCA9IFtdXG4gIH1cblxuICBnZXRMZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoXG4gIH1cblxuICBnZXRBeGlzKCkge1xuICAgIHJldHVybiB0aGlzLmF4aXNcbiAgfVxuXG4gIGdldFBvc2l0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbnNcbiAgfVxuXG4gIGdldFBvc2l0aW9uc0hpdCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbnMuZmlsdGVyKChwb3NpdGlvbikgPT4gcG9zaXRpb24uaGl0ICE9IHRydWUpXG4gIH1cblxuICBnZXRGaXJzdFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uc1swXVswXVxuICB9XG5cbiAgZ2V0TGFzdFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uc1t0aGlzLnBvc2l0aW9ucy5sZW5ndGggLSAxXVswXVxuICB9XG5cbiAgc2V0UG9zaXRpb25zKHBvc2l0aW9ucykge1xuICAgIGlmKHBvc2l0aW9ucy5sZW5ndGggPT09IHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnBvc2l0aW9ucyA9IHBvc2l0aW9uc1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ1NoaXAgY2Fubm90IGZpdCEnXG4gICAgfVxuICB9XG5cbiAgaGl0KHBvc2l0aW9uTnVtKSB7XG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9ucy5maW5kKHBvc2l0aW9uID0+IHBvc2l0aW9uLnggPT09IHBvc2l0aW9uTnVtWzBdICYmIHBvc2l0aW9uLnkgPT09IHBvc2l0aW9uWzFdKVxuICAgIHBvc2l0aW9uLmhpdCA9IHRydWVcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBjb25zdCBwb3NpdGlvbnNMZWZ0ID0gdGhpcy5wb3NpdGlvbnMuZmlsdGVyKChwb3NpdGlvbikgPT4gcG9zaXRpb24uaGl0ICE9IHRydWUpXG4gICAgcmV0dXJuIHBvc2l0aW9uc0xlZnQgPT09IDBcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgU2hpcCxcbn0iLCJpbXBvcnQgdmFsaWRTaGlwSG92ZXIgZnJvbSAnLi4vZ2FtZUhlbHBlcnMvdmFsaWRTaGlwSG92ZXInXG5cbmxldCBob3ZlcmVkRWxlbXMgPSBbXVxuXG5leHBvcnQgY2xhc3MgU2hpcFBsYWNlbWVudCB7XG5cbiAgZ2FtZVN0YXJ0ZWQ7XG4gIGhvdmVyZWRFbGVtcyA9IFtdO1xuXG4gIHBsYWNlU2hpcChlbGVtLCBheGlzLCBzaGlwTGVuZ3RocywgY3VyclNoaXBMZW5ndGhJbmRleCwgY3VycmVudFBsYXllclR1cm4sIGdhbWVTdGFydGVkKSB7XG5cbiAgICB0aGlzLmdhbWVTdGFydGVkID0gZ2FtZVN0YXJ0ZWRcblxuICAgIGNvbnN0IHNoaXBMZW4gPSBzaGlwTGVuZ3Roc1tjdXJyU2hpcExlbmd0aEluZGV4XVxuICBcbiAgICBpZiAoYXhpcyA9PT0gJ1gnKSB7XG4gICAgICBpZiAodmFsaWRTaGlwSG92ZXIoc2hpcExlbiwgZWxlbSwgYXhpcywgY3VycmVudFBsYXllclR1cm4pKSB7XG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZFNoaXBQbGFjZW1lbnQnKVxuICAgICAgICB0aGlzLnBsYWNlU2hpcFgoc2hpcExlbiwgZWxlbSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDSEFOR05HIENVUlNPUicpXG4gICAgICAgIGNvbnNvbGUubG9nKGVsZW0pXG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnaW52YWxpZFNoaXBQbGFjZW1lbnQnKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYXhpcyA9PT0gJ1knKSB7XG4gICAgICBpZiAodmFsaWRTaGlwSG92ZXIoc2hpcExlbiwgZWxlbSwgYXhpcywgY3VycmVudFBsYXllclR1cm4pKSB7XG4gICAgICAgIHRoaXMucGxhY2VTaGlwWShzaGlwTGVuLCBlbGVtKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgcGxhY2VTaGlwWChzaGlwTGVuLCBlbGVtKSB7XG4gICAgY29uc3QgW3gsIHldID0gW051bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneCcpKSwgTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd5JykpXVxuICAgIGNvbnN0IGZpbmFsU2hpcFBvc2l0aW9uWCA9ICh4ICsgc2hpcExlbikgLSAxXG4gIFxuICAgIGlmIChmaW5hbFNoaXBQb3NpdGlvblggPD0gOSkge1xuICBcbiAgICAgIGZvcihsZXQgaSA9IHg7IGkgPD0gZmluYWxTaGlwUG9zaXRpb25YOyBpKyspIHtcbiAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFt4PVwiJHtpfVwiXVt5PVwiJHt5fVwiXWApWzBdXG4gICAgICAgIHRoaXMuaG92ZXJlZEVsZW1zLnB1c2goZWxlbSlcbiAgICAgICAgZWxlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnXG4gICAgICB9XG4gIFxuICAgIH1cbiAgfVxuICBcbiAgcGxhY2VTaGlwWShzaGlwTGVuLCBwb3MpIHtcbiAgICBjb25zdCBbeCwgeV0gPSBbTnVtYmVyKHBvcy5nZXRBdHRyaWJ1dGUoJ3gnKSksIE51bWJlcihwb3MuZ2V0QXR0cmlidXRlKCd5JykpXVxuICAgIGNvbnN0IGZpbmFsU2hpcFBvc2l0aW9uWSA9ICh5ICsgc2hpcExlbikgLSAxXG4gIFxuICAgIGlmIChmaW5hbFNoaXBQb3NpdGlvblkgPD0gOSkge1xuICAgICAgY29uc29sZS5sb2coeCwgeSlcbiAgXG4gICAgICBmb3IobGV0IGkgPSB5OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbeD1cIiR7eH1cIl1beT1cIiR7aX1cIl1gKVswXVxuICAgICAgICB0aGlzLmhvdmVyZWRFbGVtcy5wdXNoKGVsZW0pXG4gICAgICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJ1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgZmluYWxpemVTaGlwUGxhY2VtZW50KCkge1xuICBcbiAgICBjb25zb2xlLmxvZygncGxhY2luZyBzaGlwJylcbiAgICBjb25zb2xlLmxvZyhnYW1lU3RhcnRlZClcbiAgXG4gICAgaWYgKGdhbWVTdGFydGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3Qgc2hpcExlbiA9IGhvdmVyZWRFbGVtcy5sZW5ndGhcbiAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbiwgYXhpcylcbiAgICBjb25zdCBzaGlwUG9zaXRpb25zID0gW11cbiAgXG4gICAgdGhpcy5ob3ZlcmVkRWxlbXMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgY29uc3QgeCA9IE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneCcpKVxuICAgICAgY29uc3QgeSA9IE51bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneScpKVxuICAgICAgc2hpcFBvc2l0aW9ucy5wdXNoKFt7eCwgeSwgaGl0OiBmYWxzZX1dKVxuICAgIH0pXG4gIFxuICAgIHNoaXAuc2V0UG9zaXRpb25zKHNoaXBQb3NpdGlvbnMpXG4gIFxuICAgIGlmICh2YWxpZFNoaXBQbGFjZW1lbnQoY3VycmVudFBsYXllclR1cm4sIHNoaXApKSB7XG4gICAgICBcbiAgICAgIHBsYXllck9uZS5nZXRHYW1lYm9hcmQoKS5wbGFjZVNoaXAoc2hpcClcbiAgXG4gICAgICB0aGlzLmhvdmVyZWRFbGVtcyA9IFtdXG4gICAgICBjdXJyU2hpcExlbmd0aEluZGV4ICs9IDFcbiAgICB9XG4gIFxuICAgIGNvbnNvbGUubG9nKHBsYXllck9uZS5nZXRHYW1lYm9hcmQoKS5nZXRQbGFjZWRTaGlwcygpKVxuICB9XG4gIFxuICBzZXRIb3ZlcmVkRWxlbXMobmV3SG92ZXJlZEVsZW1zKSB7XG4gICAgdGhpcy5ob3ZlcmVkRWxlbXMgPSBuZXdIb3ZlcmVkRWxlbXNcbiAgfVxuICBcbiAgZ2V0SG92ZXJlZEVsZW1zKCkge1xuICAgIHJldHVybiB0aGlzLmhvdmVyZWRFbGVtc1xuICB9XG5cbn0iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi4vY2xhc3Nlcy9TaGlwJ1xuXG5jb25zdCBjcmVhdGVTaGlwV2l0aFBvcyA9IChwb3NpdGlvbnMsIGF4aXMpID0+IHtcbiAgY29uc3Qgc2hpcExlbiA9IHBvc2l0aW9ucy5sZW5ndGhcbiAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKHNoaXBMZW4sIGF4aXMpXG4gIGNvbnN0IHNoaXBQb3NpdGlvbnMgPSBbXVxuXG4gIHBvc2l0aW9ucy5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xuICAgIGNvbnN0IHt4LCB5fSA9IHBvc2l0aW9uXG4gICAgc2hpcFBvc2l0aW9ucy5wdXNoKFt7eCwgeSwgaGl0OiBmYWxzZX1dKVxuICB9KVxuXG4gIHNoaXAuc2V0UG9zaXRpb25zKHNoaXBQb3NpdGlvbnMpXG5cbiAgcmV0dXJuIHNoaXBcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2hpcFdpdGhQb3MiLCJpbXBvcnQgY3JlYXRlU2hpcFdpdGhQb3MgZnJvbSAnLi9jcmVhdGVTaGlwV2l0aFBvcydcbmltcG9ydCB2YWxpZFNoaXBQbGFjZW1lbnQgZnJvbSAnLi92YWxpZFNoaXBQbGFjZW1lbnQnXG5cbmNvbnN0IHZhbGlkU2hpcEhvdmVyID0gKHNoaXBMZW4sIGVsZW0sIGF4aXMsIGN1cnJlbnRQbGF5ZXJUdXJuKSA9PiB7XG4gIGNvbnN0IGhvdmVyZWRQb3MgPSBheGlzID09PSAnWCcgPyBnZXRIb3ZlcmVkUG9zWChlbGVtLCBzaGlwTGVuKSA6IGdldEhvdmVyZWRQb3NZKGVsZW0sIHNoaXBMZW4pXG4gIGNvbnN0IHNoaXAgPSBjcmVhdGVTaGlwV2l0aFBvcyhob3ZlcmVkUG9zLCBheGlzKVxuXG4gIHJldHVybiB2YWxpZFNoaXBQbGFjZW1lbnQoY3VycmVudFBsYXllclR1cm4sIHNoaXApXG59XG5cbmNvbnN0IGdldEhvdmVyZWRQb3NYID0gKGVsZW0sIHNoaXBMZW4pID0+IHtcbiAgY29uc3QgW3gsIHldID0gW051bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneCcpKSwgTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd5JykpXVxuICBjb25zdCBmaW5hbFNoaXBQb3NpdGlvblggPSAoeCArIHNoaXBMZW4pIC0gMVxuICBjb25zdCBob3ZlcmVkUG9zID0gW11cblxuICBpZiAoZmluYWxTaGlwUG9zaXRpb25YIDw9IDkpIHtcbiAgICBmb3IobGV0IGkgPSB4OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWDsgaSsrKSB7XG4gICAgICBob3ZlcmVkUG9zLnB1c2goe3g6IGksIHl9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBob3ZlcmVkUG9zXG59XG5cbmNvbnN0IGdldEhvdmVyZWRQb3NZID0gKGVsZW0sIHNoaXBMZW4pID0+IHtcbiAgY29uc3QgW3gsIHldID0gW051bWJlcihlbGVtLmdldEF0dHJpYnV0ZSgneCcpKSwgTnVtYmVyKGVsZW0uZ2V0QXR0cmlidXRlKCd5JykpXVxuICBjb25zdCBmaW5hbFNoaXBQb3NpdGlvblkgPSAoeSArIHNoaXBMZW4pIC0gMVxuICBjb25zdCBob3ZlcmVkUG9zID0gW11cblxuICBpZiAoZmluYWxTaGlwUG9zaXRpb25ZIDw9IDkpIHtcbiAgICBmb3IobGV0IGkgPSB5OyBpIDw9IGZpbmFsU2hpcFBvc2l0aW9uWTsgaSsrKSB7XG4gICAgICBob3ZlcmVkUG9zLnB1c2goe3gsIHk6IGl9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBob3ZlcmVkUG9zXG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkU2hpcEhvdmVyIiwiY29uc3QgdmFsaWRTaGlwUGxhY2VtZW50ID0gKGN1cnJlbnRQbGF5ZXJUdXJuLCBzaGlwKSA9PiB7XG4gIGlmIChjdXJyZW50UGxheWVyVHVybi5wbGF5ZXJMYWJlbCA9PT0gJ3BsYXllck9uZScpIHtcbiAgICBjb25zdCBwbGFjZWRTaGlwcyA9IGN1cnJlbnRQbGF5ZXJUdXJuLmdldEdhbWVib2FyZCgpLmdldFBsYWNlZFNoaXBzKClcbiAgICBpZiAoc2hpcC5nZXRQb3NpdGlvbnMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmIChzaGlwLmdldEF4aXMoKSA9PT0gJ1gnKSB7XG4gICAgICBcbiAgICAgIGZvciAobGV0IHBsYWNlZFNoaXAgb2YgcGxhY2VkU2hpcHMpIHtcbiAgICAgICAgaWYgKHZhbGlkYXRlU2hpcFdpdGhYKHNoaXAsIHBsYWNlZFNoaXApID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzaGlwLmdldEF4aXMoKSA9PT0gJ1knKSB7XG4gICAgICBmb3IgKGxldCBwbGFjZWRTaGlwIG9mIHBsYWNlZFNoaXBzKSB7XG4gICAgICAgIGlmICh2YWxpZGF0ZVNoaXBXaXRoWShzaGlwLCBwbGFjZWRTaGlwKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChjdXJyZW50UGxheWVyVHVybiA9PT0gJ3BsYXllclR3bycpIHtcblxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3QgdmFsaWRhdGVTaGlwV2l0aFggPSAoc2hpcCwgcGxhY2VkU2hpcCkgPT4ge1xuICBpZiAocGxhY2VkU2hpcC5nZXRBeGlzKCkgPT09IHNoaXAuZ2V0QXhpcygpKSB7XG4gICAgY29uc3QgeyB4OiBzaGlwU3RhcnRQb3NYLCB5OiBzaGlwU3RhcnRQb3NZIH0gPSBzaGlwLmdldEZpcnN0UG9zaXRpb24oKVxuICAgIGNvbnN0IHsgeDogc2hpcEVuZFBvc1gsIHk6IHNoaXBFbmRQb3NZIH0gPSBzaGlwLmdldExhc3RQb3NpdGlvbigpXG4gICAgY29uc3QgeyB4OiBwbGFjZWRTdGFydFBvc1gsIHk6IHBsYWNlZFN0YXJ0UG9zWSB9ID0gcGxhY2VkU2hpcC5nZXRGaXJzdFBvc2l0aW9uKClcbiAgICBjb25zdCB7IHg6IHBsYWNlZEVuZFBvc1gsIHk6IHBsYWNlZEVuZFBvc1kgfSA9IHBsYWNlZFNoaXAuZ2V0TGFzdFBvc2l0aW9uKClcbiAgICBcbiAgICBpZiAoc2hpcFN0YXJ0UG9zWSA9PT0gcGxhY2VkU3RhcnRQb3NZKSB7XG4gICAgICBpZiAoc2hpcFN0YXJ0UG9zWCA+PSBwbGFjZWRTdGFydFBvc1ggJiYgc2hpcFN0YXJ0UG9zWCA8PSBwbGFjZWRFbmRQb3NYKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICBpZiAoc2hpcEVuZFBvc1ggPj0gcGxhY2VkU3RhcnRQb3NYICYmIHNoaXBFbmRQb3NYIDw9IHBsYWNlZEVuZFBvc1gpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3QgdmFsaWRhdGVTaGlwV2l0aFkgPSAoc2hpcCwgcGxhY2VkU2hpcCkgPT4ge1xuICBjb25zdCB7IHg6IHNoaXBTdGFydFBvc1gsIHk6IHNoaXBTdGFydFBvc1kgfSA9IHNoaXAuZ2V0Rmlyc3RQb3NpdGlvbigpXG4gIGNvbnN0IHsgeDogc2hpcEVuZFBvc1gsIHk6IHNoaXBFbmRQb3NZIH0gPSBzaGlwLmdldExhc3RQb3NpdGlvbigpXG4gIGNvbnN0IHsgeDogcGxhY2VkU3RhcnRQb3NYLCB5OiBwbGFjZWRTdGFydFBvc1kgfSA9IHBsYWNlZFNoaXAuZ2V0Rmlyc3RQb3NpdGlvbigpXG4gIGNvbnN0IHsgeDogcGxhY2VkRW5kUG9zWCwgeTogcGxhY2VkRW5kUG9zWSB9ID0gcGxhY2VkU2hpcC5nZXRMYXN0UG9zaXRpb24oKVxuICBcbiAgaWYgKHNoaXBTdGFydFBvc1ggPT09IHBsYWNlZFN0YXJ0UG9zWCkge1xuICAgIFxuICAgIGlmIChzaGlwU3RhcnRQb3NZID49IHBsYWNlZFN0YXJ0UG9zWSAmJiBzaGlwU3RhcnRQb3NZIDw9IHBsYWNlZEVuZFBvc1kpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAoc2hpcFN0YXJ0UG9zWSA+PSBwbGFjZWRTdGFydFBvc1kgJiYgc2hpcFN0YXJ0UG9zWSA8PSBwbGFjZWRFbmRQb3NZKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKHNoaXBFbmRQb3NZID49IHBsYWNlZFN0YXJ0UG9zWSAmJiBzaGlwRW5kUG9zWSA8PSBwbGFjZWRFbmRQb3NZKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZFNoaXBQbGFjZW1lbnQiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vY2xhc3Nlcy9TaGlwJ1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9jbGFzc2VzL0dhbWVib2FyZCdcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vY2xhc3Nlcy9QbGF5ZXInXG5pbXBvcnQgeyBTaGlwUGxhY2VtZW50IH0gZnJvbSAnLi9jbGFzc2VzL1NoaXBQbGFjZW1lbnQnXG5pbXBvcnQgdmFsaWRTaGlwUGxhY2VtZW50IGZyb20gJy4vZ2FtZUhlbHBlcnMvdmFsaWRTaGlwUGxhY2VtZW50J1xuaW1wb3J0IGNyZWF0ZVNoaXBXaXRoUG9zIGZyb20gJy4vZ2FtZUhlbHBlcnMvY3JlYXRlU2hpcFdpdGhQb3MnXG5pbXBvcnQgdmFsaWRTaGlwSG92ZXIgZnJvbSAnLi9nYW1lSGVscGVycy92YWxpZFNoaXBIb3ZlcidcblxuY29uc3QgcGxheWVyT25lID0gbmV3IFBsYXllcignQ2FybG9zJywgJ3BsYXllck9uZScpXG5jb25zdCBwbGF5ZXJUd28gPSBuZXcgUGxheWVyKCdBbnRob255JywgJ3BsYXllclR3bycpXG5jb25zdCBzaGlwUGxhY2VtZW50ID0gbmV3IFNoaXBQbGFjZW1lbnQoKVxuY29uc3QgYXhpcyA9ICdYJ1xuY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl1cbmNvbnN0IGF1dG9QbGFjZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdXRvUGxhY2VCdXR0b24nKVxuY29uc3Qgc3RhcnRHYW1lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0R2FtZUJ1dHRvbicpXG5jb25zdCB0b3RhbFNoaXBzID0gNVxuXG5sZXQgZ2FtZVN0YXJ0ZWQgPSBmYWxzZVxubGV0IGN1cnJlbnRQbGF5ZXJUdXJuID0gcGxheWVyT25lXG5sZXQgY3VyclNoaXBMZW5ndGhJbmRleCA9IDBcbmxldCBob3ZlcmVkRWxlbXMgPSBbXVxubGV0IGhvdmVyZWRQb3MgPSBbXVxuXG5jb25zdCBhdHRhY2tQb3NpdGlvbiA9IChldmVudCkgPT4ge1xuICBjb25zdCBwb3MgPSBldmVudC50YXJnZXRcbiAgY29uc3QgW3gsIHldID0gW051bWJlcihwb3MuZ2V0QXR0cmlidXRlKCd4JykpLCBOdW1iZXIocG9zLmdldEF0dHJpYnV0ZSgneScpKV1cblxuXG4gIHBvcy5jbGFzc0xpc3QuYWRkKCdoaXQnKVxuXG4gIGNvbnNvbGUubG9nKHgsIHkpXG59XG5cblxuY29uc3QgY2xlYXJIb3ZlckVsZW1Db2xvcnMgPSAoKSA9PiB7XG4gIGhvdmVyZWRFbGVtcy5mb3JFYWNoKChlbGVtKSA9PiBlbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjNTc3NUIwJylcbiAgaG92ZXJlZEVsZW1zID0gW11cbiAgaG92ZXJlZFBvcyA9IFtdXG59XG5cbmNvbnN0IGNsZWFyQWxsRWxlbUNvbG9ycyA9IChwbGF5ZXIpID0+IHtcbiAgY29uc3QgYWxsUG9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7cGxheWVyfSAucG9zaXRpb25gKVxuICBhbGxQb3MuZm9yRWFjaCgoZWxlbSkgPT4gZWxlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzU3NzVCMCcpXG4gIGhvdmVyZWRFbGVtcyA9IFtdXG4gIGhvdmVyZWRQb3MgPSBbXVxuICBjdXJyU2hpcExlbmd0aEluZGV4ID0gMFxufVxuXG5cblxuY29uc3QgY2xlYXJHYW1lYm9hcmQgPSAocGxheWVyKSA9PiB7XG4gIGlmIChwbGF5ZXIgPT09ICdwbGF5ZXJPbmUnKSB7XG4gICAgcGxheWVyT25lLmdldEdhbWVib2FyZCgpLmNsZWFyR2FtZWJvYXJkKClcbiAgfSBlbHNlIGlmIChwbGF5ZXIgPT09ICdwbGF5ZXJUd28nKSB7XG4gICAgcGxheWVyVHdvLmdldEdhbWVib2FyZCgpLmNsZWFyR2FtZWJvYXJkKClcbiAgfVxuICBjb25zb2xlLmxvZyhwbGF5ZXJPbmUuZ2V0R2FtZWJvYXJkKCkuZ2V0UGxhY2VkU2hpcHMoKSlcblxuICBnYW1lU3RhcnRlZCA9IGZhbHNlXG4gIGNsZWFyQWxsRWxlbUNvbG9ycyhwbGF5ZXIpXG59XG5cbmNvbnN0IHN0YXJ0R2FtZSA9ICgpID0+IHtcblxuICBpZiAocGxheWVyT25lLmdldEdhbWVib2FyZCgpLmdldFBsYWNlZFNoaXBzKCkubGVuZ3RoIDwgNSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgZ2FtZWJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmRzJylcbiAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZCcpXG4gIGNvbnN0IHBsYXllclR3b0dhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXJUd28nKVxuXG4gIGdhbWVib2FyZHMuY2xhc3NMaXN0LnJlbW92ZSgnY2VudGVyR2FtZWJvYXJkcycpXG4gIGdhbWVib2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdwbGFjaW5nU2hpcHMnKVxuICBwbGF5ZXJUd29HYW1lYm9hcmQuY2xhc3NMaXN0LnJlbW92ZSgncGxheWVyVHdvR2FtZU5vdFN0YXJ0ZWQnKVxuXG4gIGNvbnNvbGUubG9nKCdBbGwgb2YgcGxheWVyT25lcyBzaGlwcyBoYXZlIGJlZW4gcGxhY2VkLicpXG4gIGdhbWVTdGFydGVkID0gdHJ1ZVxuXG59XG5cbmNvbnN0IGhhbmRsZUhvdmVyUG9zaXRpb24gPSAoZXZlbnQpID0+IHtcblxuICBpZiAoZ2FtZVN0YXJ0ZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNsZWFySG92ZXJFbGVtQ29sb3JzKClcbiAgY29uc3QgZWxlbSA9IGV2ZW50LnRhcmdldFxuICBzaGlwUGxhY2VtZW50LnBsYWNlU2hpcChlbGVtLCBheGlzLCBzaGlwTGVuZ3RocywgY3VyclNoaXBMZW5ndGhJbmRleCwgY3VycmVudFBsYXllclR1cm4pXG5cbiAgaG92ZXJlZEVsZW1zID0gc2hpcFBsYWNlbWVudC5nZXRIb3ZlcmVkRWxlbXMoKVxufVxuXG5jb25zdCBoYW5kbGVBdXRvUGxhY2VDbGljayA9ICgpID0+IHtcbiAgYXV0b1BsYWNlQWxsU2hpcHMoJ3BsYXllck9uZScpXG59XG5cbmNvbnN0IGdldFJhbmRvbUludCA9IChtaW4sIG1heCkgPT4ge1xuICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbn1cblxuXG5jb25zdCBhdXRvUGxhY2VBbGxTaGlwcyA9IChwbGF5ZXIpID0+IHtcbiAgaWYgKGdhbWVTdGFydGVkKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtwbGF5ZXJ9YClcbiAgY2xlYXJHYW1lYm9hcmQocGxheWVyKVxuXG4gIGlmIChwbGF5ZXIgPT09IHBsYXllck9uZS5nZXRQbGF5ZXJMYWJlbCgpKSB7XG4gICAgY29uc29sZS5sb2coJ2hlbGxvIHBsYXllciBvbmUnKVxuXG4gICAgbGV0IG51bU9mUGxhY2VkU2hpcHMgPSBwbGF5ZXJPbmUuZ2V0R2FtZWJvYXJkKCkuZ2V0UGxhY2VkU2hpcHMoKS5sZW5ndGhcblxuICAgIHdoaWxlIChudW1PZlBsYWNlZFNoaXBzIDwgdG90YWxTaGlwcykge1xuICAgICAgY29uc3QgeCA9IGdldFJhbmRvbUludCgwLCA5KVxuICAgICAgY29uc3QgeSA9IGdldFJhbmRvbUludCgwLCA5KVxuXG4gICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3g9XCIke3h9XCJdW3k9XCIke3l9XCJdYClbMF1cbiAgICAgIHNoaXBQbGFjZW1lbnQucGxhY2VTaGlwKGVsZW0sIGF4aXMsIHNoaXBMZW5ndGhzLCBjdXJyU2hpcExlbmd0aEluZGV4LCBjdXJyZW50UGxheWVyVHVybilcbiAgICAgIGhvdmVyZWRFbGVtcyA9IHNoaXBQbGFjZW1lbnQuZ2V0SG92ZXJlZEVsZW1zKClcbiAgICAgIGVsZW0uY2xpY2soKVxuXG4gICAgICBudW1PZlBsYWNlZFNoaXBzID0gT2JqZWN0LnZhbHVlcyhwbGF5ZXJPbmUuZ2V0R2FtZWJvYXJkKCkuZ2V0UGxhY2VkU2hpcHMoKSkubGVuZ3RoXG4gICAgfVxuXG5cbiAgfSBlbHNlIGlmIChwbGF5ZXIgPT09IHBsYXllclR3by5nZXRQbGF5ZXJMYWJlbCgpKSB7XG5cbiAgfVxuXG4gIGNvbnNvbGUubG9nKGdhbWVib2FyZClcbn1cblxuY29uc3QgZGlzcGxheUdhbWVib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgY29uc3QgZ2FtZWJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmRzJylcbiAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoJ2dhbWVib2FyZCcsIHBsYXllcilcblxuICBpZiAocGxheWVyID09PSAncGxheWVyT25lJykge1xuICAgIGdhbWVib2FyZHMuY2xhc3NMaXN0LmFkZCgnY2VudGVyR2FtZWJvYXJkcycpXG4gICAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoJ3BsYWNpbmdTaGlwcycpXG4gIH0gZWxzZSBpZiAocGxheWVyID09PSAncGxheWVyVHdvJykge1xuICAgIGdhbWVib2FyZC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXJUd29HYW1lTm90U3RhcnRlZCcpXG4gIH1cbiAgXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgMTA7IHkrKykge1xuICAgIFxuICAgIGZvcihsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XG4gICAgICBsZXQgcG9zaXRpb25FbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIHBvc2l0aW9uRWxlbS5zZXRBdHRyaWJ1dGUoJ3gnLCB4KVxuICAgICAgcG9zaXRpb25FbGVtLnNldEF0dHJpYnV0ZSgneScsIHkpXG4gICAgICBwb3NpdGlvbkVsZW0uY2xhc3NMaXN0LmFkZCgncG9zaXRpb24nKVxuICAgICAgXG4gICAgICBpZiAocGxheWVyID09PSAncGxheWVyT25lJykge1xuICAgICAgICBwb3NpdGlvbkVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBTaGlwUGxhY2VtZW50LmZpbmFsaXplU2hpcFBsYWNlbWVudClcbiAgICAgICAgcG9zaXRpb25FbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGhhbmRsZUhvdmVyUG9zaXRpb24pXG4gICAgICB9IGVsc2UgaWYgKHBsYXllciA9PT0gJ3BsYXllclR3bycpIHtcbiAgICAgICAgcG9zaXRpb25FbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrUG9zaXRpb24pXG4gICAgICB9XG4gICAgICBnYW1lYm9hcmQuYXBwZW5kKHBvc2l0aW9uRWxlbSlcbiAgICB9XG4gIH1cblxuICBnYW1lYm9hcmRzLmFwcGVuZChnYW1lYm9hcmQpXG59XG5cbmRpc3BsYXlHYW1lYm9hcmQocGxheWVyT25lLnBsYXllckxhYmVsKVxuZGlzcGxheUdhbWVib2FyZChwbGF5ZXJUd28ucGxheWVyTGFiZWwpXG5cbmF1dG9QbGFjZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUF1dG9QbGFjZUNsaWNrKVxuc3RhcnRHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRHYW1lKVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9