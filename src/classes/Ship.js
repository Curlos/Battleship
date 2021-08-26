class Ship {
  length;
  axis;
  positions = [];

  constructor(length, axis) {
    this.length = length
    this.axis = axis
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
    console.log(positionNum)
    console.log(this.positions)
    const position = this.positions.find(position => Number(position[0].x) === Number(positionNum[0]) && Number(position[0].y) === Number(positionNum[1]))

    console.log(position[0])
    position[0].hit = true
  }

  isSunk() {
    const positionsLeft = this.positions.filter((position) => position[0].hit === false)
    console.log(`Positions Left: ${positionsLeft}`)
    return positionsLeft.length === 0
  }
}

module.exports = {
  Ship,
}