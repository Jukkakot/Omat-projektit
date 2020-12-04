function isValidShip(ship) {
  if (ship.includes(undefined)) {
    return false
  }
  if (ship.length < 2) {
    return false
  }
  if (!(isAllSameX(ship) || isAllSameY(ship))) {
    return false
  }
  if(new Set(ship).size !== ship.length){
    return false
  }
  
  for (var b of ship) {
    for (var n of b.neighbours) {
      if (!ship.includes(n) && n.state === states[3]) {
        return false
      }
    }
  }
  return true
}
function isAllSameY(ship) {
  const y = ship[0].y
  for (var block of ship) {
    if (block.y != y) {
      return false
    }
  }
  return true
}
function isAllSameX(ship) {
  const x = ship[0].x
  for (var block of ship) {
    if (block.x != x) {
      return false
    }
  }
  return true
}

function mouseDragged() {
  if (wasInGrid1() && shipsToAddP.length > 0) {
    const block = grid1.getBlock(mX, mY)
    if (block.state === states[3]) {
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
function mouseReleased() {
  if (!isValidShip(shipArr) && !shipsToAddP.includes(shipArr.length)) {
    for (var block of shipArr) {
      block.state = states[0]
    }
  } else {
    shipsToAddP.splice(shipsToAddP.indexOf(shipArr.length), 1)
  }
  shipArr = []
}
function drawShip(x, y, size, ships) {
  var count = ships.filter(shipSize => shipSize === size).length
  if (count === 0) {
    return
  }
  for (var i = 1; i < size + 1; i++) {
    stroke(0)
    for (var j = 0; j < count; j++) {
      const sX = x + i * BOXSIZE - 20
      drawS(sX + (j * (BOXSIZE + BOXSIZE / 4) * size), y, BOXSIZE, BOXSIZE)
    }

    noStroke()
  }
  // fill(0)
  // textSize(boxSize)
  // text(`x ` + count, x + boxSize * size + boxSize, y + boxSize / 2 + boxSize / 5);
}
function isDiagNeighbour(b1, b2) {
    if(!b1.neighbours.includes(b2)){
      return false
    } 
    if(isAllSameX([b1,b2])){
      return false
    }
    if(isAllSameY([b1,b2])){
      return false
    }
    return true
}
function isSameBlock(b1,b2) {
  return b1.x === b2.x && b1.y === b2.y
}