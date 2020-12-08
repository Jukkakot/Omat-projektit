class Block {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.state = states[0]
        this.value = 0
        this.isMine = false
        this.neighbours = []
        this.draw = (drawMines) => {
            const x = this.x * BOXSIZE
            const y = this.y * BOXSIZE
            drawHidden(x, y)
            if (this.isState(1)) {
                drawOpen(x, y, this.value)
            } else if (this.isState(2) && drawMines) {
                drawMine(x, y)
            } else if (this.isState(3)) {
                drawOpen(x, y)
                drawMine(x, y)
            }


        }
        this.click = () => {
            //Hidden
            if (this.isState(0) && this.value === 0) {
                this.state = states[1]
                for (var n of this.neighbours) {
                    n.click()   
                }
            } else if (this.isState(0) && this.value > 0) {
                this.state = states[1]
            } else if (this.isState(2)) {
                this.state = states[3]
            }
        }
        this.hover = () => {
            hoverBox()
        }
        this.isState = (num) => {
            return this.state === states[num]
        }
    }
}
//Default box
function drawDef(x, y) {
    strokeWeight(2)
    stroke(0)
    rect(x, y, BOXSIZE, BOXSIZE)
    noStroke()
}
function drawHidden(x, y) {
    strokeWeight(2)
    stroke(0)
    fill(120)
    rect(x, y, BOXSIZE, BOXSIZE)
    noFill()
    noStroke()
}
function drawOpen(x, y, value) {

   
    strokeWeight(2)
    stroke(0)
    fill(80)
    rect(x, y, BOXSIZE, BOXSIZE)
    noFill()
    noStroke()
    if (value >= 1) drawValue(x, y, value)
}
function drawMine(x, y) {
    strokeWeight(4)
    stroke(0)
    fill(0)
    circle(x + BOXSIZE / 2, y + BOXSIZE / 2, BOXSIZE / 2)
    noFill()
    noStroke()
}
function drawValue(x, y, value) {
    // textAlign(CENTER, CENTER);
    fill(0)
    noStroke()
    textSize(BOXSIZE / 2);
    text(value, x+BOXSIZE/2, y+BOXSIZE/2);
    noFill()
}
function hoverBox() {
    noFill()
    strokeWeight(5)
    stroke(0);
    rect(mX * BOXSIZE, mY * BOXSIZE, BOXSIZE, BOXSIZE)
    noStroke()
}