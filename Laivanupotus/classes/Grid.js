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
      return this.getBlock(mX, mY).click()
    }
    this.clickRandom = () => {
      while (true) {
        const rX = Math.floor(random(0, 10))
        const rY = Math.floor(random(0, 10))
        var rBlock = this.getBlock(rX, rY)
        if (rBlock.isState(0) || rBlock.isState(3)) {
          rBlock.click()
          break
        }
      }
    }
    this.draw = (drawShips) => {
      for (var row of this.blocks) {
        for (var block of row) {
          block.draw(drawShips)
        }
      }
    }
    this.hover = () => {
      this.getBlock(mX, mY).hover()
    }
    this.getBlock = (x, y) => {
      x = x % 12
      if (x >= 0 && x <= 9 && y >= 0 && y <= 9) {
        return this.blocks[y][x]
      } else {
        return false
      }

    }
    this.hasWon = () => {
      return hasState(states[4], this.blocks) && !hasState(states[3], this.blocks)
    }
    this.addRandomShips = (shipsToAdd) => {
      for (var size of shipsToAdd) {
        for (var block of buildRandomShip(size, this.blocks)) {
          block.state = states[3]
        }
      }
      shipsToAdd.splice(0)
    }
    this.clickSmart = (args) => {
      if (args === undefined) return [false, giveRandBlock(this.blocks), [giveRandBlock(this.blocks)]]

      const isTargetMode = args[0]
      const currBlock = args[1]
      const prevBlocks = args[2]

      if (currBlock === undefined || currBlock.isState(1) || currBlock.isState(4)) {
        console.log("Uh oh, somethings broken...\n", args)
      }

      currBlock.click()

      // if(isTargetMode && prevBlock.isState(1) ) debugger
      if (currBlock.isState(4)) {
        for (var nei of currBlock.neighbours) {
          if (nei.isState(0) || nei.isState(3)) {
            prevBlocks.push(currBlock)
            return [true, nei, prevBlocks]
          }
        }
      }
      if (isTargetMode || getLastElement(prevBlocks).isState(4)) {
        for (var block of prevBlocks) {
          if (!block.isState(4)) continue
          for (var nei of block.neighbours) {
            if (nei.isState(0) || nei.isState(3)) {
              prevBlocks.push(currBlock)
              return [true, nei, prevBlocks]
            }
          }
        }

      }
      //prevBlocks.isState(4) || 
      if ((isTargetMode && currBlock.isState(1))) {
        //find block with hit ship and "tunnel" to the other side of that
        var block = currBlock
        if (getLastElement(prevBlocks).isState(4)) {
          block = getLastElement(prevBlocks)
        }
        var nextBlock = neighbourHasState(block, states[4])
        var coords = getDirection(block, nextBlock)
        if (!coords) {
          prevBlocks.push(currBlock)
          return [false, giveRandBlock(this.blocks), prevBlocks]
        }
        var xDif = coords[0]
        var yDif = coords[1]
        while (true) {
          if (nextBlock.isState(4)) {
            //Was xs (hit ship)
            //-> continue "tunneling"
            var nextX = nextBlock.x + xDif
            var nextY = nextBlock.y + yDif
            nextBlock = this.getBlock(nextX, nextY)
          }
          //Hit and sink
          if (!nextBlock || nextBlock.isState(1)) break
          if (nextBlock.isState(0) || nextBlock.isState(3)) {
            prevBlocks.push(currBlock)
            //Was empty or a ship 
            return [true, nextBlock, prevBlocks]
          }

        }
      }
      prevBlocks.push(currBlock)
      return [false, giveRandBlock(this.blocks), prevBlocks]
    }
  }
}
function giveRandBlock(blocks) {
  var loopCount = 0
  while (loopCount++ < 100) {
    var rX = Math.floor(random(0, 10))
    var rY = Math.floor(random(0, 10))
    if (!isEven(rX) && !isEven(rY)) continue
    if (isEven(rX) && isEven(rY)) continue
    if (rX === rY) continue
    const block = blocks[rY][rX]
    if (block !== undefined && (block.isState(0) || block.isState(3))) {
      return block
    }
  }
  for (var row of blocks) {
    for (var block of row) {
      if (block.isState(0) || block.isState(3)) {
        return block
      }
    }
  }
}
function buildRandomShip(size, blocks) {
  var loopCounter = 0
  var ship = []
  while (ship.length != size || !isValidShip(ship)) {
    var prevBlock
    if (ship.length === 0) {
      while (ship.length === 0) {
        var rX = Math.floor(random(0, 10))
        var rY = Math.floor(random(0, 10))
        prevBlock = blocks[rY][rX]
        if (prevBlock.isState(0)) {
          ship.push(prevBlock)
        }
      }
    } else {
      prevBlock = ship[ship.length - 1]
    }
    var addedBlock = false
    for (var n of prevBlock.neighbours) {
      if (!n.isState(0)) {
        continue
      }
      const copyShip = [...ship]
      copyShip.push(n)
      if (!isDiagNeighbour(prevBlock, n) && isValidShip(copyShip)) {
        if (ship.push(n) > size) {
          ship = []
        }
        addedBlock = true
        // break;
      }
    }
    if (loopCounter++ > 1000) {
      infiniteLoop = true
      return ship
    }
    if (!addedBlock) {
      ship = []
    }
  }
  return ship
}

function hasState(state, ship) {
  for (var row of ship) {
    if (row.find(b => b.state === state)) {
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
  x = x % 12
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
  
  return shuffle(neighbours)
 
}


function wasInGrid1() {
  return mX >= 0 && mX <= 9 && mY >= 0 && mY <= 9
}
function wasInGrid2() {
  return mX >= 12 && mX <= 21 && mY >= 0 && mY <= 9
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function neighbourHasState(block, state) {
  for (var n of block.neighbours) {
    if (n.state === state) return n
  }
  return false
}
function getDirection(b1, b2) {
  if (!b1 || !b2) return false
  const xDif = b1.x - b2.x
  const yDif = b1.y - b2.y
  return [xDif, yDif]
}
function getLastElement(arr) {
  if (arr.length === 0) return
  return arr[arr.length - 1]
}
function isEven(num) {
  return num % 2 == 0
}

