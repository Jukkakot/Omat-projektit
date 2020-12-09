const defaultBoxSize = 80
var BOXSIZE = defaultBoxSize
//                0         1         2           3         4
const states = ["hidden", "open","hiddenMine","openMine","flag"]
var W = 10
var H = 8
let cnv
var grid
var mX, mY
var wasRightClick = false

function scaling() {
  const size = windowWidth / (W)
  size >= defaultBoxSize ?  BOXSIZE = defaultBoxSize : BOXSIZE = size 
  cnv = createCanvas(BOXSIZE * W, (BOXSIZE * H)+BOXSIZE)
  document.getElementById("defaultCanvas0").
  oncontextmenu = function() { return false; } 
}
function setup() {
  scaling()
  start()
}
function start() {
  console.log("Starting..")
  grid = new Grid(W, H)
  grid.randomMines(0.2)
}
function windowResized() {
  scaling()
}

function mousePressed() {
  if (mouseButton === RIGHT) {
    grid.rightClick()
  }
}
function mouseClicked() {
  if(wasRightClick === RIGHT) return
  if (wasInGrid()) {
    grid.click()
  }
}
function draw() {
  if (frameCount === 1) scaling()
  background(80)
  mX = Math.floor(mouseX / BOXSIZE)
  mY = Math.floor(mouseY / BOXSIZE)
  grid.draw()

  drawText(mX + "," + mY, width/2, height-BOXSIZE/2)
  if (wasInGrid()) {
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



