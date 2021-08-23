export class Gameboard {
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
    placedShips.push(ship)
  }

  receiveAttack(coords) {

  }
}