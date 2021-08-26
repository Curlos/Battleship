export class Gameboard {
  positions = [];
  placedShips = [];
  sunkenShips = [];

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

  receiveAttack(ship) {
    if (ship.isSunk()) {
      this.sunkenShips.push(ship)
    }
  }

  allShipsSunken() {
    console.log(this.sunkenShips)
    return this.placedShips.length === this.sunkenShips.length
  }
}