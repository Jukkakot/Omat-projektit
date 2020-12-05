var BOXSIZE = 40
const states = ["", "miss", "hit", "ship", "hit ship"]
let stats = [0, 0]
let playerWinCount = 0
let opponentWinCount = 0
var clickCounts = [0, 0]
let cnv
var grid1, grid2
var mX, mY
var shipArr = []
var shipsToAddP, shipsToAddO
var infiniteLoop
var showShips
var autoplay = false
var smartReturnComputer
var smartReturnPlayer
function start() {
  console.log("Starting..")
  shipsToAddP = [2,3,3,4,5]
  shipsToAddO = [...shipsToAddP]
  infiniteLoop = false
  showShips = false
  grid1 = new Grid(0, 0)
  grid2 = new Grid(12, 0)
  if (autoplay) {
    grid1.addRandomShips(shipsToAddP)
  }
  grid2.addRandomShips(shipsToAddO)
  
  var rX = Math.floor(random(0, 10))
  var rY = Math.floor(random(0, 10))
  smartReturnComputer = [false, grid1.getBlock(rX, rY)]
  rX = Math.floor(random(0, 10))
  rY = Math.floor(random(0, 10))
  smartReturnPlayer = [false, grid2.getBlock(rX, rY)]
}
function setup() {
  cnv = createCanvas(BOXSIZE * 22, BOXSIZE * 20)
  cnv.mouseWheel(scrollGame)
  //background(220);
  const showB = createButton("Show ships")
  const restartB = createButton("Restart")
  const randomShips = createButton("Add random ships")
  const autoButton = createButton("Toggle autoplay")

  autoButton.position(BOXSIZE * 10, BOXSIZE * 1.1)
  autoButton.mousePressed(() => {
    autoplay = !autoplay
    start()
    loop()
  })
  autoButton.size(BOXSIZE * 2, BOXSIZE)
  autoButton.style('background-color', color(25, 23, 200, 50))

  randomShips.position(0, BOXSIZE * 10)
  randomShips.mousePressed(() => { grid1.addRandomShips(shipsToAddP) })
  randomShips.size(BOXSIZE * 10, BOXSIZE)
  randomShips.style('background-color', color(25, 23, 200, 50))

  restartB.position(BOXSIZE * 10, 0)
  restartB.mousePressed(() => {
    start()
    loop()
  })
  restartB.size(BOXSIZE * 2, BOXSIZE)
  restartB.style('background-color', color(25, 23, 200, 50))

  showB.position(BOXSIZE * 12, BOXSIZE * 10)
  showB.mousePressed(() => { showShips = !showShips })
  showB.size(BOXSIZE * 10, BOXSIZE)
  showB.style('background-color', color(25, 23, 200, 50))
  start()
  //grid2.randomShips(0.1)

}
function autoGame() {
  if (shipsToAddO.length === 0 && shipsToAddP.length === 0) {
    
    if (!grid1.hasWon()) {
      smartReturnPlayer = grid2.clickSmart(smartReturnPlayer)
      clickCounts[0]++
    }
    if (!grid2.hasWon()) {
      smartReturnComputer = grid1.clickSmart(smartReturnComputer)
      clickCounts[1]++
    }
    
  }
}
function scrollGame() {
  if (autoplay) return
  if (shipsToAddO.length === 0 && shipsToAddP.length === 0 && !grid1.hasWon() && !grid2.hasWon()) {
    smartReturnPlayer = grid2.clickSmart(smartReturnPlayer)
    if (!grid2.hasWon()) {
      smartReturnComputer = grid1.clickSmart(smartReturnComputer)
    }
  }
}
function mouseClicked(e) {
  if (autoplay) return
  if (wasInGrid2() && !grid2.hasWon()) {
    if (shipsToAddP.length === 0 && !grid1.hasWon() && grid2.click() && !grid2.hasWon()) {
      smartReturnComputer = grid1.clickSmart(smartReturnComputer)
    }
  }
}

function draw() {
  background(255);
  mX = Math.floor(mouseX / BOXSIZE)
  mY = Math.floor(mouseY / BOXSIZE)
  grid1.draw(true)
  grid2.draw(showShips)
  if (autoplay) {
    drawText("Autoplay ON", BOXSIZE * 11, BOXSIZE * 12, BOXSIZE)
    autoGame()
  }
  drawText("Stats:", BOXSIZE * 11, BOXSIZE * 4, BOXSIZE * 0.6)
  //drawText(stats[0] + " / " + stats[1], BOXSIZE * 11, BOXSIZE * 5, BOXSIZE * 0.6)
  drawText(opponentWinCount + " / " + playerWinCount, BOXSIZE * 11, BOXSIZE * 5, BOXSIZE * 0.6)
  // drawText(clickCounts[0] + " / " + clickCounts[1], BOXSIZE * 11, BOXSIZE * 6, BOXSIZE * 0.8)
  if (wasInGrid1()) {
    drawText(mX % 12 + "," + mY, width / 2, height - BOXSIZE, BOXSIZE * 2)
    grid1.hover()
  }
  if (wasInGrid2()) {
    drawText(mX % 12 + "," + mY, width / 2, height - BOXSIZE, BOXSIZE * 2)
    grid2.hover()
  }
  if (grid2.hasWon() || grid1.hasWon() ) {
    if (grid2.hasWon()) {
      drawText('Player won!', width / 2, height / 4, BOXSIZE * 2)
      stats[1]++
      playerWinCount++
    } else if (grid1.hasWon()) {
      drawText('Opponent won!', width / 2, height / 4, BOXSIZE * 2)
      stats[0]++
      opponentWinCount++
    } 
    if (autoplay) {
      start()
      return
    }
    noLoop()
  }
  drawShips()
  if (infiniteLoop) {
    drawText("Could not set opponent ships", width / 2, height / 3, BOXSIZE)
  }
  
}

function drawText(txt, x, y, size) {
  fill(0)
  noStroke()
  textSize(size);
  textAlign(CENTER, CENTER);
  text(txt, x, y);
  noFill()
}
function drawShips() {
  if (shipsToAddP.length > 0) {
    drawText("Players ships to add:", BOXSIZE * 5, BOXSIZE * 11.5, BOXSIZE)
    for (var i = Math.min(...shipsToAddP); i < Math.max(...shipsToAddP) + 1; i++) {
      drawShip(0, BOXSIZE * 10 + i * (BOXSIZE + BOXSIZE / 4), i, [...shipsToAddP])
    }
  }
  if (shipsToAddO.length > 0) {
    drawText("Opponents ships to add:", BOXSIZE * 16, BOXSIZE * 11.5, BOXSIZE)
    for (var i = Math.min(...shipsToAddO); i < Math.max(...shipsToAddO) + 1; i++) {
      drawShip(BOXSIZE * 12, BOXSIZE * 10 + i * (BOXSIZE + 10), i, [...shipsToAddO])
    }
  }
}

