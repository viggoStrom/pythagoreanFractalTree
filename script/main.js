/** @type {HTMLCanvasElement} */


const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.height = 1000
canvas.width = canvas.height * 16 / 10

const degree = (angle) => {
    return angle * Math.PI / 180
}

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

class square {
    constructor(p1, p2, angle, order) {
        this.order = order
        this.height = 50 * .9 ** this.order

        this.p1 = { x: p1[0], y: p1[1] }
        this.p2 = { x: p2[0], y: p2[1] }

        let z = Math.sqrt((this.p2.x - this.p1.x) ** 2 + (this.p2.y - this.p1.y) ** 2)
        let x = Math.cos(degree(angle)) * z
        let y = Math.sin(degree(angle)) * z

        this.p3 = {}
        this.p3.x = this.p1.x + x
        this.p3.y = this.p1.y - y

        this.p4 = {}
        this.p4.x = this.p2.x + x
        this.p4.y = this.p2.y - y

    }

    draw = () => {
        ctx.fillStyle = "whitesmoke"
        ctx.beginPath()
        ctx.moveTo(this.p1.x, this.p1.y)
        ctx.lineTo(this.p2.x, this.p2.y)
        ctx.lineTo(this.p4.x, this.p4.y)
        ctx.lineTo(this.p3.x, this.p3.y)
        ctx.fill()
    }
}

class triangle {
    constructor(p1, p2, angle, order) {
        this.p1 = { x: p1[0], y: p1[1] }
        this.p2 = { x: p2[0], y: p2[1] }

        let z = Math.cos(degree(angle)) * (this.p2.x - this.p1.x)
        let x = Math.cos(degree(angle)) * z
        let y = Math.sin(degree(angle)) * z

        this.p3 = {}
        this.p3.x = this.p1.x + x
        this.p3.y = this.p1.y - y
    }

    draw = () => {
        ctx.fillStyle = "whitesmoke"
        ctx.beginPath()
        ctx.moveTo(this.p1.x, this.p1.y)
        ctx.lineTo(this.p2.x, this.p2.y)
        ctx.lineTo(this.p3.x, this.p3.y)
        ctx.fill()
    }
}

const lowerBound = new ground()
const order1Square1 = new square([700, 800], [800, 800], 80)
const order1Triangle1 = new triangle(0, 0, 0, 0)

const frame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    lowerBound.draw()
    order1Square1.draw()
    // order1Triangle1.draw()

    window.requestAnimationFrame(frame)
}

window.requestAnimationFrame(frame)