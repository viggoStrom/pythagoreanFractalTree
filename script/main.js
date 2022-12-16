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

const square = (point, width, angle) => {
    ctx.fillStyle = "#363636"
    ctx.translate(point[0], point[1])
    ctx.rotate(angle * -Math.PI / 180)
    ctx.fillRect(0, 0, width, width * -0.7)
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    return 
}

const lowerBound = new ground()

const frame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    square([675, 800], 150, 0)
    square([700, 500], 100, 30)

    lowerBound.draw()

    window.requestAnimationFrame(frame)
}

window.requestAnimationFrame(frame)