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

function getGridSize(e) {
    const size = []
    if (e.target.value === 'large') {
        size.push(currentGridSize[0].textContent = '80')
        size.push(currentGridSize[1].textContent = '40')
    } else if (e.target.value === 'medium') {
        size.push(currentGridSize[0].textContent = '32')
        size.push(currentGridSize[1].textContent = '16')
    } else {
        size.push(currentGridSize[0].textContent = '16')
        size.push(currentGridSize[1].textContent = '8')
    }
    return size
}

for (let sizeButton of sizeButtons) {
    sizeButton.addEventListener('click', (e) => {
        const size = getGridSize(e)
        createGrid(+size[0], +size[1], e.target.value)
    })
}

window.addEventListener('load', () => {
    sizeButtons[1].checked = true
    createGrid(+currentGridSize[0].textContent, +currentGridSize[1].textContent,
        sizeButtons[1].value)
        
})