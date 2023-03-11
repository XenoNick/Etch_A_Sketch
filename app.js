const drawingBoard = document.querySelector('.drawingBoard')
const sizeButtons = [...document.querySelectorAll('input[type="radio"]')]
const currentGridSize = [...document.querySelectorAll('.gridSize')]

function createGrid(width, height, size) {
    for (let i = 0; i < (width * height); i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        square.classList.add(size)
        drawingBoard.append(square)
    }
}

createGrid(+currentGridSize[0].textContent, +currentGridSize[1].textContent,
    sizeButtons[1].value)
