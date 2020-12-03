class Block {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.state = states[0]
        this.neighbours = []
        this.draw = () => {
            const state = this.state
            const x = this.x * boxSize
            const y = this.y * boxSize
            if (state === states[1]) {
                drawO(x,y)
            } else if (state === states[2]) {
                drawX(x,y)
            } else if (state === states[3]) {
                drawL(x,y)
                return
            } else if (state === states[4]) {
                drawX(x,y)
                drawL(x,y)
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
                for(var neighbour of this.neighbours) {
                    if(neighbour.state === states[0]){
                        neighbour.state = states[1]
                    }
                }
                return true
            }
            return false
        }
        this.hover = () => {
            const x = this.x * boxSize
            const y = this.y * boxSize
            strokeWeight(3)
            stroke(0,0,0);
            rect(x, y, boxSize, boxSize)
        }
    } 
}
function drawDef(x,y) {
    //Default box
    strokeWeight(1)
    stroke(0, 0, 0)
    rect(x, y, boxSize, boxSize)
}
function drawO(x,y){
    strokeWeight(4)
    stroke(0, 0, 255)
    circle(x + boxSize / 2, y + boxSize / 2, boxSize / 2)
}
function drawX(x,y){
    strokeWeight(4)
    stroke(255, 0, 0)
    line(x + 5, y + 5, x + boxSize - 5, y + boxSize - 5)
    line(x + boxSize - 5, y + 5, x + 5, y + boxSize - 5)
}
function drawL(x,y) {
    strokeWeight(4)
    stroke(255, 0, 0)
    rect(x, y, boxSize, boxSize)
}

