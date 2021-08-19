class Ship {
  length;
  positions;
  positionsHit;

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
    return this.positionsHit
  }

  hit(positionNum) {
    this.positionsHit.push(positionNum)
  }

  isSunk() {
    return this.positionsHit.length ===  this.length
  }
}

module.exports = {
  Ship,
}