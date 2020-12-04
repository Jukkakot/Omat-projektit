var BOXSIZE = 40
var grid1
var grid2
const states = ["", "o", "x", "s", "xs"]
const directions = [0, 1, -1]
var mX, mY
var shipArr = []
var shipsToAddP = [2,3,3,4,5]
var shipsToAddR = [...shipsToAddP]
var infiniteLoop = false
function setup() {
  createCanvas(BOXSIZE * 22, BOXSIZE * 17)
  //background(220);

  grid1 = new Grid(0, 0, BOXSIZE)
  grid2 = new Grid(12, 0, BOXSIZE)
  grid2.addRandomShips(shipsToAddR)
  //grid2.randomShips(0.1)

}
function mouseClicked(e) {
  if (wasInGrid2()) {
    if (shipsToAddP.length === 0 && !grid1.gameOver() && !grid2.gameOver() && grid2.click()) {
      grid1.clickRandom()
    }
  }
}

function draw() {
  background(240);
  if (infiniteLoop) {
    fill(255, 0, 0)
    noStroke()
    textSize(BOXSIZE * 2);
    textAlign(CENTER, CENTER);
    text('Infinite loop', width / 2, height * 0.8);
    noFill()
  }
  noFill()
  mX = Math.floor(mouseX / BOXSIZE)
  mY = Math.floor(mouseY / BOXSIZE)
  fill(0)
  noStroke()
  textSize(BOXSIZE * 2);
  textAlign(CENTER, CENTER);
  text(mX + "," + mY, width / 2, height - BOXSIZE);
  noFill()
  grid1.draw(true)
  grid2.draw()
  if (wasInGrid1()) {
    grid1.hover()
  }
  if (wasInGrid2()) {
    grid2.hover()
  }
  if (grid1.gameOver() || grid2.gameOver()) {
    fill(0)
    noStroke()
    textSize(BOXSIZE * 2);
    textAlign(CENTER, CENTER);
    text('Game over!', width / 2, height / 4);
    noFill()
    noLoop();
  }
  for (var i = Math.min(...shipsToAddP); i < Math.max(...shipsToAddP) + 1; i++) {
    drawShip(BOXSIZE, BOXSIZE * 8.5 + i * (BOXSIZE + 10), i, [...shipsToAddP])
  }
  for (var i = Math.min(...shipsToAddR); i < Math.max(...shipsToAddR) + 1; i++) {
    drawShip(BOXSIZE * 12, BOXSIZE * 8.5 + i * (BOXSIZE + 10), i, [...shipsToAddR])
  }

}

