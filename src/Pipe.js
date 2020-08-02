let pipeBorderWidth = 2

class Pipe {
  constructor() {
    this.spacing = 200
    this.top = random(height / 6, (3 / 4) * height)
    this.bottom = height - (this.top + this.spacing)
    this.x = width
    this.width = 80
    this.speed = 6
    this.hasScored = false
  }

  update() {
    this.x -= this.speed

    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.width) {
        isGameOver = true
      }
    }

    this.checkIfHasScored()

    this.draw()
  }

  checkIfHasScored() {
    if (bird.x > this.x + this.width / 2 && !this.hasScored) {
      score++
      this.hasScored = true
      $score.innerHTML = score
    }
  }

  isOffscreen() {
    if (this.x < -this.width) {
      return true
    } else {
      return false
    }
  }

  draw() {
    strokeWeight(3)
    this.drawPipeCoverFill(this.top - pipeBorderWidth)
    this.drawPipe(-pipeBorderWidth, this.top)
    this.drawPipeCover(this.top - pipeBorderWidth)
    this.drawPipeCoverFill(height - this.bottom + 40 - pipeBorderWidth)
    this.drawPipe(height - this.bottom, this.bottom + pipeBorderWidth)
    this.drawPipeCover(height - this.bottom + 40 - pipeBorderWidth)
  }

  drawPipe(top, bottom) {
    // base
    stroke('#543847')
    fill('#73bf2e')
    rect(this.x, top - pipeBorderWidth, this.width, bottom + pipeBorderWidth)
    // Left shine
    fill('#9ce659')
    noStroke()
    rect(this.x + pipeBorderWidth, top + 2, this.width / 3, bottom - pipeBorderWidth - 2)
    // Left shine line
    stroke('#73bf2e')
    rect(this.x + pipeBorderWidth + 4, top + 2, 2, bottom - pipeBorderWidth - 3)
    fill('#558022')
    // Right shadow
    noStroke()
    rect(this.x + this.width - 20, top + 2, this.width / 3 - 10, bottom - pipeBorderWidth - 2)
    // Right shadow line
    fill('#73bf2e')
    rect(this.x + this.width - 5, top - pipeBorderWidth, 2, bottom - pipeBorderWidth)
  }

  drawPipeCover(top) {
    // base
    stroke('#543847')
    noFill()
    rect(this.x - 5, top - 40, this.width + 10, 40)
  }

  drawPipeCoverFill(top) {
    // base
    stroke('#543847')
    fill('#73bf2e')
    rect(this.x - 5, top - 40, this.width + 10, 40)
  }
}
