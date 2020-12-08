const defaultBoxSize = 80
var BOXSIZE = defaultBoxSize
const states = ["hidden", "open","hiddenMine","openMine"]
var W = 10
var H = 8
let cnv
var grid
var mX, mY
//scaling?
function scale() {
  
}
function setup() {
  const size = windowWidth / (W + 0.5)
  size >= defaultBoxSize ? BOXSIZE = size : BOXSIZE = 80
  cnv = createCanvas(BOXSIZE * W, (BOXSIZE * H)+BOXSIZE)

  start()
}
function start() {
  console.log("Starting..")
  grid = new Grid(W, H)
  grid.randomMines(0.1)
}
function windowResized() {
  const size = windowWidth / (W + 0.5)
  size >= defaultBoxSize ? BOXSIZE = 80 : BOXSIZE = size
  cnv = createCanvas(BOXSIZE * W, (BOXSIZE * H)+BOXSIZE)
}
function mouseClicked(e) {
  if (wasInGrid()) {
    grid.click()
  }
}

function draw() {
  if (frameCount === 1) windowResized()
  background(80)
  mX = Math.floor(mouseX / BOXSIZE)
  mY = Math.floor(mouseY / BOXSIZE)
  grid.draw()
  if (wasInGrid()) {
    drawText(mX + "," + mY, width/2, height-BOXSIZE/2)
    grid.hover()
 
  }
  
  
}
function drawText(txt,x, y) {
  textAlign(CENTER, CENTER);
  fill(0)
  noStroke()
  textSize(BOXSIZE / 2);
  text(txt, x, y);
  noFill()
}



