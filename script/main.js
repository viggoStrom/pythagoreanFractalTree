/** @type {HTMLCanvasElement} */


const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.height = 1000
canvas.width = canvas.height * 16 / 10

const degreeToRadian = (angle) => {
    return angle * Math.PI / 180
}

const radianToDegree = (angle) => {
    return angle / (Math.PI / 180)
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
    constructor(p1, p2, order) {
        this.order = order
        this.height = 100 * .9 ** this.order

        this.p1 = { x: p1[0], y: p1[1] }
        this.p2 = { x: p2[0], y: p2[1] }

        // math works now idk dont touch
        let y = this.p2.y - this.p1.y
        let z = Math.sqrt((this.p2.x - this.p1.x) ** 2 + (y) ** 2)
        let v = radianToDegree(Math.asin(y / z))
        let u = 90 - v
        let h = this.height
        let g = h * Math.sin(degreeToRadian(u))
        let f = h * Math.cos(degreeToRadian(u))

        this.p3 = {}
        this.p3.x = this.p2.x + f
        this.p3.y = this.p2.y - g

        this.p4 = {}
        this.p4.x = this.p1.x + f
        this.p4.y = this.p1.y - g
    }

    getP3 = () => {
        return [this.p3.x, this.p3.y]
    }
    getP4 = () => {
        return [this.p4.x, this.p4.y]
    }

    draw = () => {
        ctx.fillStyle = "whitesmoke"
        ctx.beginPath()
        ctx.moveTo(this.p1.x, this.p1.y)
        ctx.lineTo(this.p2.x, this.p2.y)
        ctx.lineTo(this.p3.x, this.p3.y)
        ctx.lineTo(this.p4.x, this.p4.y)
        ctx.fill()
    }
}

class triangle {
    constructor(p1, p2, order, angle) {
        this.p1 = { x: p1[0], y: p1[1] }
        this.p2 = { x: p2[0], y: p2[1] }

        let z = Math.cos(degreeToRadian(angle)) * (this.p2.x - this.p1.x)
        let x = Math.cos(degreeToRadian(angle)) * z
        let y = Math.sin(degreeToRadian(angle)) * z

        this.p3 = {}
        this.p3.x = this.p1.x + x
        this.p3.y = this.p1.y - y
    }

    getP3 = () => {
        return [this.p3.x, this.p3.y]
    }
    getP2 = () => {
        return [this.p2.x, this.p2.y]
    }
    getP1 = () => {
        return [this.p1.x, this.p1.y]
    }

    draw = () => {
        ctx.fillStyle = "lightGray"
        ctx.beginPath()
        ctx.moveTo(this.p1.x, this.p1.y)
        ctx.lineTo(this.p2.x, this.p2.y)
        ctx.lineTo(this.p3.x, this.p3.y)
        ctx.fill()
    }
}

class treeBuilder {
    constructor(p1, p2, angle, order) {
        this.root = new square(p1, p2, 1)

        this.angle = angle
        this.order = []
        for (let index = 1; index <= order; index++) {
            this.order.push(index)
        }

        this.children = [this.root]
    }

    addSquare = (p1, p2, order) => {
        this.children.push(new square(p1, p2, order))
    }

    addTriangle = (p1, p2, order) => {
        this.children.push(new triangle(p1, p2, order, this.angle))
    }

    generate = () => {
        this.addTriangle(this.root.getP4(), this.root.getP3(), 1)
        this.addSquare()
    }

    draw = () => {
        this.children.forEach(element => {
            element.draw()
        });
    }
}

const lowerBound = new ground()
const tree = new treeBuilder([725, 800], [875, 800], 30, 3)

tree.generate()

const frame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    lowerBound.draw()

    tree.draw()

    window.requestAnimationFrame(frame)
}

window.requestAnimationFrame(frame)