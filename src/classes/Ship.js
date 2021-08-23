class Ship {
  length;
  positions = [];

  constructor(length) {
    this.length = length
    this.positionsHit = []
  }

  getLength() {
    return this.length
  }

  setPositions(positions) {
    if(positions.length === this.length) {
      this.positions = positions
    } else {
      return 'Ship cannot fit!'
    }
  }

  getPositions() {
    return this.positions
  }

  getPositionsHit() {
    return this.positions.filter((position) => position.hit != true)
  }

  hit(positionNum) {
    this.positions.find(position => position.x === positionNum[0] && position.y === position[1])
  }

  isSunk() {
    const positionsLeft = this.positions.filter((position) => position.hit != true)
    return positionsLeft === 0
  }
}

module.exports = {
  Ship,
}