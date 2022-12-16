/** @type {HTMLCanvasElement} */


const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.height = 1000
canvas.width = canvas.height * 10 / 16

const frame = () => {

    window.requestAnimationFrame(frame)
}

window.requestAnimationFrame(frame)