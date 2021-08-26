import { finalizeShipPlacement, handleHoverPosition } from '../index'
import { setPlayers, handleAttackClick, attackPosition } from './attackPosition'

export const editBoardListeners = (playerOne, playerTwo) => {
  setPlayers(playerOne, playerTwo)
  editPlayerOneBoardListeners()
  editPlayerTwoBoardListeners()
  
}

const editPlayerOneBoardListeners = () => {
  const playerNum = 0
  
  for (let y = 0; y < 10; y++) {
    for(let x = 0; x < 10; x++) {
      const elem = document.querySelectorAll(`[x="${x}"][y="${y}"]`)[playerNum]

      elem.removeEventListener('click', finalizeShipPlacement)
      elem.removeEventListener('mouseover', handleHoverPosition)
      console.log(elem)
    }
  }
}

const editPlayerTwoBoardListeners = () => {
  const playerNum = 1
  
  for (let y = 0; y < 10; y++) {
    for(let x = 0; x < 10; x++) {
      const elem = document.querySelectorAll(`[x="${x}"][y="${y}"]`)[playerNum]

      elem.removeEventListener('click', finalizeShipPlacement)
      elem.removeEventListener('mouseover', handleHoverPosition)
      elem.addEventListener('click', handleAttackClick)
      elem.classList.add('enemyPosition')
      console.log(elem)
    }
  }
}