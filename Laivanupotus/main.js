const boxSize = 40
var grid1
var grid2
const states = ["", "o", "x", "l", "xl"]
var mX, mY
var shipArr = []
function setup() {
  createCanvas(880, 500)
  //background(220);
  grid1 = new Grid(0, 0, boxSize)
  grid2 = new Grid(12, 0, boxSize)
  grid2.randomShips(0.1)
}
function mouseClicked(e) {
  if (wasInGrid2()) {
    if (!grid1.gameOver() && !grid2.gameOver() && grid2.click()) {
      grid1.clickRandom()
    }
  }
}
function mouseDragged() {
  if (wasInGrid1()) {
    const block = grid1.getBlock(mX, mY)
    if(block.state === states[3]) {
      return
    }
    if (shipArr.length === 0) {
      shipArr.push(block)
      block.state = states[3]
    } else if (!shipArr.includes(block) && shipArr[shipArr.length - 1].neighbours.includes(block)) {
      shipArr.push(block)
      block.state = states[3]
    }
  }
}
function isValidShip() {
  if(shipArr.length <= 1){
    return false
  }
  if(!(sameX(shipArr[0].x) || sameY(shipArr[0].y))){
    return false
  }
  for(var b of shipArr){
    for(var n of b.neighbours){
      if(!shipArr.includes(n) && n.state === states[3]){
        return false
      }
    }
  }
  return true
}
function sameY(y) {
  for (var block of shipArr) {
    if (block.y != y) {
      return false
    }
  }
  return true
}
function sameX(x) {
  for (var block of shipArr) {
    if (block.x != x) {
      return false
    }
  }
  return true
}
function mouseReleased() {
  if (!isValidShip()) {
    for (var block of shipArr) {
      block.state = states[0]
    }
  } 
  shipArr = []
}
function wasInGrid1() {
  return mX >= 0 && mX <= 9 && mY >= 0 && mY <= 9
}
function wasInGrid2() {
  return mX >= 12 && mX <= 21 && mY >= 0 && mY <= 9
}

function draw() {
  background(240);
  noFill()
  mX = Math.floor(mouseX / boxSize)
  mY = Math.floor(mouseY / boxSize)
 
  grid1.draw()
  grid2.draw()
  if (wasInGrid1()) {
    grid1.hover()
  }
  if (wasInGrid2()) {
    grid2.hover()
  }
  if(grid1.gameOver() || grid2.gameOver()){
    fill(0)
    noStroke()
    textSize(80);
    textAlign(CENTER, CENTER);
    text('Game over!', width/2, height/4);
    noFill()
    noLoop();
  }
}
