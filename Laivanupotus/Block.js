class Block {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.state = states[0]
        this.neighbours = []
        this.draw = (drawShips) => {
            const state = this.state
            const x = this.x * BOXSIZE
            const y = this.y * BOXSIZE
            if (state === states[1]) {
                drawO(x,y)
            } else if (state === states[2]) {
                drawX(x,y)
            } else if (state === states[3] && drawShips) {
                drawS(x,y)
            } else if (state === states[4]) {
                drawS(x,y)
                drawX(x,y)
                return
            }
            drawDef(x,y)
        }
        this.click = () => {
            if (this.state === states[0]) {
               this.state = states[1]
               return true
            }
            if (this.state === states[3]) {
                //Osui
                this.state = states[4]
                for(var n of this.neighbours) {
                    if(n.state === states[0] && isDiagNeighbour(this,n)){
                        n.state = states[1]
                    }
                }
                return true
            }
            return false
        }
        this.hover = () => {
            const x = this.x * BOXSIZE
            const y = this.y * BOXSIZE
            strokeWeight(3)
            stroke(0);
            rect(x, y, BOXSIZE, BOXSIZE)
            noStroke()
        }
    } 
}
function drawDef(x,y) {
    //Default box
    strokeWeight(1)
    stroke(0)
    rect(x, y, BOXSIZE, BOXSIZE)
    noStroke()
}
function drawO(x,y){
    strokeWeight(4)
    stroke(0, 0, 255)
    circle(x + BOXSIZE / 2, y + BOXSIZE / 2, BOXSIZE / 2)
    noStroke()
}
function drawX(x,y){
    strokeWeight(4)
    stroke(255, 0, 0)
    line(x + 5, y + 5, x + BOXSIZE - 5, y + BOXSIZE - 5)
    line(x + BOXSIZE - 5, y + 5, x + 5, y + BOXSIZE - 5)
    noStroke()
}
function drawS(x,y) {
    strokeWeight(3)
    stroke(0)
    fill(200)
    rect(x, y, BOXSIZE, BOXSIZE)
    noFill()
    noStroke()
}

