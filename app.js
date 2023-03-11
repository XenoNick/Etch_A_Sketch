const drawingBoard = document.querySelector('.drawingBoard')
const sizeButtons = [...document.querySelectorAll('input[type="radio"]')]
const currentGridSize = [...document.querySelectorAll('.gridSize')]
const penColor = document.querySelector('input[type="color"]')
const penSettings = [...document.querySelectorAll('.penSettings button')]
const clearButton = document.querySelector('.clear')

const DEFAULT_COLOR = '#e7dcdc'
const DEFAULT_BORDER_COLOR = '#00000080'
const COLOR_BLACK = '#000000'

function emptyGrid() {
    const gridSqaures = [...drawingBoard.childNodes]
    for (let square of gridSqaures) {
        square.remove()
    }
}

function createGrid(width, height, size) {
    if (drawingBoard.childElementCount > 0) emptyGrid()
    for (let i = 0; i < (width * height); i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        square.classList.add(size)
        drawingBoard.append(square)
    }
}

function getGridSize(size) {
    const measurements = []
    if (size === 'large') {
        measurements.push(currentGridSize[0].textContent = '80')
        measurements.push(currentGridSize[1].textContent = '40')
    } else if (size === 'medium') {
        measurements.push(currentGridSize[0].textContent = '32')
        measurements.push(currentGridSize[1].textContent = '16')
    } else {
        measurements.push(currentGridSize[0].textContent = '16')
        measurements.push(currentGridSize[1].textContent = '8')
    }
    return measurements
}

for (let sizeButton of sizeButtons) {
    sizeButton.addEventListener('click', (e) => {
        const measurements = getGridSize(e.target.value)
        createGrid(+measurements[0], +measurements[1], e.target.value)
    })
}

window.addEventListener('load', () => {
    sizeButtons[1].checked = true
    createGrid(+currentGridSize[0].textContent, +currentGridSize[1].textContent,
        sizeButtons[1].value)

})

function checkColor() {

}

drawingBoard.addEventListener('mouseover', (e) => {
    if (!e.target.classList.contains('square')) return;
    if (e.buttons === 1) {
        const color = checkColor()
        const square = e.target
        square.style.backgroundColor = COLOR_BLACK
        square.style.borderColor = COLOR_BLACK
    }
})

drawingBoard.addEventListener('mousedown', (e) => {
    if (!e.target.classList.contains('square')) return;
    const color = checkColor()
    const square = e.target
    square.style.backgroundColor = COLOR_BLACK
    square.style.borderColor = COLOR_BLACK
})

clearButton.addEventListener('click', () => {
    const size = sizeButtons.find((elm) => elm.checked === true)
    const measurements = getGridSize(size.value)
    createGrid(+measurements[0], +measurements[1], size.value)
})

for (let setting of penSettings) {
    if (setting.classList.contains('clear')) continue;
    setting.addEventListener('click', () => {
        if (!setting.classList.contains('selected')) {
            penSettings.forEach((elm) => { elm.classList.remove('selected') })
            setting.classList.toggle('selected')
        }
    })
}