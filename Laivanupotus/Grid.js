class Grid {
  constructor(x, y) {
    this.blocks = createBlocks(x, y)
    this.randomShips = (sCount) => {
      for (var row of this.blocks) {
        for (var block of row) {
          if (random() < sCount) {
            block.state = states[3]
          }
        }
      }
    }
    this.click = () => {
      return this.blocks[mY][mX % 12].click()
    }
    this.clickRandom = () => {
      while (true) {
        const rX = Math.floor(random(0, 10))
        const rY = Math.floor(random(0, 10))
        var rBlock = this.blocks[rY][rX]
        if (rBlock.state === states[0] || rBlock.state === states[3]) {
          rBlock.click()
          break
        }
      }
    }
    this.draw = () => {
      for (var row of this.blocks) {
        for (var block of row) {
          block.draw()
        }
      }
    }
    this.hover = () => {
      this.blocks[mY][mX % 12].hover()
    }
    this.getBlock = (x, y) => {
      return this.blocks[y][x]
    }
    this.gameOver = () => {
      return hasState(states[4],this.blocks) && !hasState(states[3],this.blocks)
    }
  }
}
function hasState(state,blocks) {
  for (var row of blocks){
    if(row.find(b => b.state === state)) {
        return true
    }
  }
  return false
}
function createBlocks(x, y) {
  var blocks = []
  for (var i = y; i < y + 10; i++) {
    const row = []
    for (var j = x; j < x + 10; j++) {
      row.push(new Block(j, i))
    }
    blocks.push(row)
  }
  for (var row of blocks) {
    for (var block of row) {
      block.neighbours = giveNeighbours(block.x, block.y, blocks)
    }
  }
  return blocks
}

function giveNeighbours(x, y, blocks) {
  var neighbours = []
  if(x > 9){
    x = x -12
  }
 //console.log(x,y)
  //VasenYlä
  if (y - 1 >= 0 && x - 1 >= 0) {
    neighbours.push(blocks[y - 1][x - 1])
  }
  //Ylä
  if (y - 1 >= 0) {
    neighbours.push(blocks[y - 1][x])
  }
  //OikeaYlä
  if (y - 1 >= 0 && x + 1 <= 9) {
    neighbours.push(blocks[y - 1][x + 1])
  }
  //Vasen
  if (x - 1 >= 0) {
    neighbours.push(blocks[y][x - 1])
  }
  //Oikea
  if (x + 1 <= 9) {
    neighbours.push(blocks[y][x + 1])
  }
  //VasenAla
  if (y + 1 <= 9 && x - 1 >= 0) {
    neighbours.push(blocks[y + 1][x - 1])
  }
  //Ala
  if (y + 1 <= 9) {
    neighbours.push(blocks[y + 1][x])
  }
  //OikeaAla
  if (y + 1 <= 9 && x + 1 <= 9) {
    neighbours.push(blocks[y + 1][x + 1])
  }
  return neighbours
}



