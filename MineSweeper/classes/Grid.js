class Grid {
  constructor() {
    this.blocks = createBlocks()
    this.click = () => {
      return this.getBlock(mX, mY).click()
    }
    this.rightClick = () => {
      var block = this.getBlock(mX, mY)
      block.isFlag = !block.isFlag
    }
    this.randomMines = (mCount) => {
      for (var row of this.blocks) {
        for (var block of row) {
          if (random() < mCount) {
            block.isMine = true
            block.state = states[2]
            for(var n of block.neighbours){
              n.value ++
            }
          }
        }
      }
    }
    this.draw = (drawMines) => {
      for (var row of this.blocks) {
        for (var block of row) {
          block.draw(drawMines)
        }
      }
    }

    this.hover = () => {
      if(wasInGrid()){
        this.getBlock(mX, mY).hover()
      }
    }

    this.getBlock = (x, y) => {
      if (wasInGrid()) {
        return this.blocks[y][x]
      } else {
        return false
      }
    }
  }
}
function createBlocks() {
  var blocks = []
  for (var i = 0; i < H; i++) {
    const row = []
    for (var j = 0; j < W; j++) {
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
  //Top
  if (y - 1 >= 0) {
    neighbours.push(blocks[y - 1][x])
    //Top left
    if (x - 1 >= 0) {
      neighbours.push(blocks[y - 1][x - 1])
    }
    //Top right
    if (x + 1 < W) {
      neighbours.push(blocks[y - 1][x + 1])
    }
  }

  //Bottom
  if (y + 1 < H) {
    neighbours.push(blocks[y + 1][x])
    //Bottom left
    if (x - 1 >= 0) {
      neighbours.push(blocks[y + 1][x - 1])
    }
    //Bottom right
    if (x + 1 < W) {
      neighbours.push(blocks[y + 1][x + 1])
    }
  }

  //Left
  if (x - 1 >= 0) {
    neighbours.push(blocks[y][x - 1])
  }
  //Right
  if (x + 1 < W) {
    neighbours.push(blocks[y][x + 1])
  }
 // console.log(x,y,neighbours)
  return neighbours
}
function wasInGrid() {
  return mX >= 0 && mX < W && mY >= 0 && mY < H
}