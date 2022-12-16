/** @type {HTMLCanvasElement} */


const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.height = 1000
canvas.width = canvas.height * 16 / 10

class ground {
    constructor() {
        this.yPosition = canvas.height * 8 / 10
        this.height = canvas.height * 2 / 10
    }

    draw = () => {
        ctx.fillStyle = "#252525"
        ctx.fillRect(0, this.yPosition, canvas.width, this.height)
    }
}

const lowerBound = new ground()

const frame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    lowerBound.draw()
    
    window.requestAnimationFrame(frame)
}

window.requestAnimationFrame(frame)