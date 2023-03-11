const drawingBoard = document.querySelector('.drawingBoard')
const sizeButtons = [...document.querySelectorAll('input[type="radio"]')]
const currentGridSize = [...document.querySelectorAll('.gridSize')]



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