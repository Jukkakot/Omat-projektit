const defaultBoxSize = 40
const defaultCanvasSize = 40 * 24
var BOXSIZE = defaultBoxSize
//                0         1         2           3         4
const states = ["hidden", "open", "hiddenMine", "openMine", "flag"]
const difficulties = [
  [9,9,10],
  [16,16,40],
  [24,24,99]
]
var difficulty = 2
var W = difficulties[difficulty][0]
var H = difficulties[difficulty][1]
var mineCount = difficulties[difficulty][2]
let cnv
var grid
var mX, mY
var wasRightClick = false
var restartB
var showMines = false
function scaling() {
  // size >= defaultBoxSize ? BOXSIZE = defaultBoxSize : BOXSIZE = size
  windowWidth <= defaultCanvasSize ? BOXSIZE = windowWidth/W : BOXSIZE = defaultCanvasSize / W
  // cnv = createCanvas(defaultCanvasSize, defaultCanvasSize + BOXSIZE*0.4*H*0.4)
  cnv = createCanvas(BOXSIZE * W, (BOXSIZE * H) + BOXSIZE*0.4*H*0.4)
  document.getElementById("defaultCanvas0").oncontextmenu = function () { return false; }
  restartB.style('background-color', color(25, 23, 200, 50))
  showB.style('background-color', color(25, 23, 200, 50))
  easyB.style('background-color', color(25, 23, 200, 50))
  mediumB.style('background-color', color(25, 23, 200, 50))
  hardB.style('background-color', color(25, 23, 200, 50))

  showB.position(cnv.position().x + BOXSIZE*W* 0.220, cnv.position().y + BOXSIZE * H + BOXSIZE*0.4*H*0.1)
  showB.size(W * BOXSIZE *0.2, BOXSIZE*0.4*H*0.2)
  showB.style('font-size', BOXSIZE*0.4*H*0.2 *0.3 + "px")
  showB.mousePressed(()=> {
    showMines = !showMines
  })

  restartB.position(cnv.position().x + BOXSIZE*W* 0.01, cnv.position().y + BOXSIZE * H + BOXSIZE*0.4*H*0.1)
  restartB.size(W * BOXSIZE *0.2, BOXSIZE*0.4*H*0.2)
  restartB.style('font-size', BOXSIZE*0.4*H*0.2 *0.3 + "px")
  restartB.mousePressed(start)

  easyB.position(cnv.position().x + BOXSIZE * W*0.6, cnv.position().y + BOXSIZE * H + BOXSIZE*0.4*H*0.1)
  easyB.size(W * 0.1* BOXSIZE, BOXSIZE*0.4*H*0.2)
  easyB.style('font-size', BOXSIZE*0.4*H*0.2 *0.3 + "px")
  easyB.mousePressed(() => {
    if(difficulty === 0 ) return
    difficulty = 0
    start()
  })

  mediumB.position(cnv.position().x + BOXSIZE * W*0.75, cnv.position().y + BOXSIZE * H + BOXSIZE*0.4*H*0.1)
  mediumB.size(W * 0.1*BOXSIZE, BOXSIZE*0.4*H*0.2)
  mediumB.style('font-size', BOXSIZE*0.4*H*0.2 *0.3 + "px")
  mediumB.mousePressed(() => {
    if(difficulty === 1 ) return
    difficulty = 1
    start()
  })

  hardB.position(cnv.position().x + BOXSIZE * W*0.90, cnv.position().y + BOXSIZE * H + BOXSIZE*0.4*H*0.1)
  hardB.size(W * 0.1*BOXSIZE, BOXSIZE*0.4*H*0.2)
  hardB.style('font-size', BOXSIZE*0.4*H*0.2 *0.3 + "px")
  hardB.mousePressed(() => {
    if(difficulty === 2 ) return
    difficulty = 2
    start()
  })
}
function setup() {
  cnv = createCanvas(defaultCanvasSize, defaultCanvasSize + BOXSIZE*0.4*H*0.4)
  restartB = createButton("Restart")
  showB = createButton("Show mines")
  easyB = createButton("Easy")
  mediumB = createButton("Medium")
  hardB = createButton("Hard")
  start()
}
function start() {
  console.log("Starting..")
  W = difficulties[difficulty][0]
  H = difficulties[difficulty][1]
  mineCount = difficulties[difficulty][2]
  grid = new Grid(W, H)
  grid.randomMines(mineCount)
  scaling()
}
function windowResized() {
  scaling()
}

function mousePressed() {
  if (grid.gameWon()) return
  if (mouseButton === RIGHT && !grid.gameOver) {
    grid.rightClick()
  }
}
function mouseClicked() {
  if (grid.gameWon()) return
  if (wasRightClick === RIGHT || grid.gameOver) return
  if (wasInGrid()) {
    grid.click()
  }
}
function draw() {
  if (frameCount === 1) scaling()
  background(80)
  mX = Math.floor(mouseX / BOXSIZE)
  mY = Math.floor(mouseY / BOXSIZE)
  grid.draw(grid.gameOver || showMines)
  // grid.draw(true)
  
  if (wasInGrid()) {
    drawText(mX + "," + mY, width / 2, BOXSIZE * H + BOXSIZE*0.4*H*0.2 , BOXSIZE*0.4*H*0.2 *0.5)
    grid.hover()
  }
  // drawText('Player won!', width / 2, height / 4, BOXSIZE)

  if (grid.gameWon()) {
    drawText('Player won!', width / 2, height / 4, BOXSIZE)
  }
}
function drawText(txt, x, y, size) {
  textAlign(CENTER, CENTER);
  fill(0)
  noStroke()
  textSize(size);
  text(txt, x, y);
  noFill()
}



