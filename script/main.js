/** @type {HTMLCanvasElement} */


const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.height = 1000
canvas.width = canvas.height * 16 / 10

Math.degreeToRadian = (angle) => {
    return angle * Math.PI / 180
}

Math.radianToDegree = (angle) => {
    return angle / (Math.PI / 180)
}

Math.sinD = (angleInDegrees) => {
    let radian = Math.degreeToRadian(angleInDegrees)
    let value = Math.sin(radian)
    return value
}

Math.asinD = (value) => {
    let radian = Math.asin(value)
    let degree = Math.radianToDegree(radian)
    return degree
}

Math.cosD = (angleInDegrees) => {
    let radian = Math.degreeToRadian(angleInDegrees)
    let value = Math.cos(radian)
    return value
}

Math.acosD = (value) => {
    let radian = Math.acos(value)
    let degree = Math.radianToDegree(radian)
    return degree
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
    constructor(p1, p2, order, angle) {
        this.order = order
        this.height = 100 * .9 ** this.order

        this.p1 = { x: p1[0], y: p1[1] }
        this.p2 = { x: p2[0], y: p2[1] }

        // math works now idk dont touch
        let h = this.height
        
        let deltaX = this.p2.x - this.p1.x
        let deltaY = this.p2.y - this.p1.y
        let z = Math.sqrt(deltaX ** 2 + deltaY ** 2)
        
        let v = this.angle

        let u = 90 - v
        let x = h * Math.cosD(u)
        let y = h * Math.sinD(u)
        
        this.p3 = {}
        this.p3.x = this.p2.x - x
        this.p3.y = this.p2.y - y

        this.p4 = {}
        this.p4.x = this.p1.x - x
        this.p4.y = this.p1.y - y
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
    constructor(p1, p2, angle) {
        this.p1 = { x: p1[0], y: p1[1] }
        this.p2 = { x: p2[0], y: p2[1] }

        let i = Math.radianToDegree(Math.atan((this.p2.y - this.p1.y) / (this.p2.x - this.p1.x)))
        let v = angle
        var w = v - i
        let z = Math.sqrt((this.p2.x - this.p1.x) ** 2 + (this.p2.y - this.p1.y) ** 2)
        let x = Math.cosD(w) * z
        let y = Math.sinD(w) * z

        this.p3 = { x: this.p1.x + x, y: this.p1.y - y }
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
        this.root = new square(p1, p2, 1, angle)

        this.angle = angle
        this.order = []
        for (let index = 1; index <= order; index++) {
            this.order.push(index)
        }

        this.children = [this.root]
        this.squares = [this.root]
        this.triangles = []
    }

    addSquare = (p1, p2, order) => {
        this.children.push(new square(p1, p2, order, this.angle))
    }

    addTriangle = (p1, p2) => {
        this.children.push(new triangle(p1, p2, this.angle))
    }

    generate = () => {
        let previusTriangle
        let previusSquare
        let order = this.order[0]
        this.addTriangle(this.root.getP4(), this.root.getP3())

        order = this.order[1]
        previusTriangle = this.children[this.children.length - 1]
        this.addSquare(previusTriangle.getP1(), previusTriangle.getP3(), order, this.angle)
        this.addSquare(previusTriangle.getP3(), previusTriangle.getP2(), order, this.angle)

        order = this.order[2]
        previusSquare = this.children[this.children.length - 2]
        this.addTriangle(previusSquare.getP4(), previusSquare.getP3())
        previusSquare = this.children[this.children.length - 2]
        this.addTriangle(previusSquare.getP4(), previusSquare.getP3())

        // order = this.order[3]
        // previusTriangle = this.children[this.children.length - 2]
        // this.addSquare(previusTriangle.getP1(), previusTriangle.getP3(), order, this.angle)
        // this.addSquare(previusTriangle.getP3(), previusTriangle.getP2(), order, this.angle)
        // previusTriangle = this.children[this.children.length - 3]
        // this.addSquare(previusTriangle.getP1(), previusTriangle.getP3(), order, this.angle)
        // this.addSquare(previusTriangle.getP3(), previusTriangle.getP2(), order, this.angle)
    }

    draw = () => {
        this.children.forEach(element => {
            element.draw()
        });
    }
}

const lowerBound = new ground()
const tree = new treeBuilder([725, 800], [875, 800], 47, 5)

tree.generate()

const frame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    lowerBound.draw()

    tree.draw()

    window.requestAnimationFrame(frame)
}

window.requestAnimationFrame(frame)