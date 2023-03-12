const drawingBoard = document.querySelector('.drawingBoard')
const sizeButtons = [...document.querySelectorAll('input[type="radio"]')]
const currentGridSize = [...document.querySelectorAll('.gridSize')]
const penColor = document.querySelector('input[type="color"]')
const penSettings = [...document.querySelectorAll('.penSettings button')]
const clearButton = document.querySelector('.clear')
const gridButton = document.querySelector('.grid')

const DEFAULT_COLOR = '#e7dcdc'
const DEFAULT_BORDER_COLOR = '#00000080'

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
        if(gridButton.classList.contains('active')) square.classList.add('removeBorder')
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

function rgbColor() {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`
}

function checkColor() {
    const selectedSetting = penSettings.find((elm) => elm.classList.contains('selected'))
    if (selectedSetting.textContent === 'Color') return penColor.value;
    else if (selectedSetting.textContent === 'Rainbow') return rgbColor();
    else if (selectedSetting.textContent === 'Eraser') return DEFAULT_COLOR
}

drawingBoard.addEventListener('mouseover', (e) => {
    if (!e.target.classList.contains('square')) return;
    if (e.buttons === 1) {
        const color = checkColor()
        const square = e.target
        square.style.backgroundColor = color
    }
})

drawingBoard.addEventListener('mousedown', (e) => {
    if (!e.target.classList.contains('square')) return;
    const color = checkColor()
    const square = e.target
    square.style.backgroundColor = color
})

clearButton.addEventListener('click', () => {
    const size = sizeButtons.find((elm) => elm.checked === true)
    const measurements = getGridSize(size.value)
    createGrid(+measurements[0], +measurements[1], size.value)
})

function clearSelected() {
    if (!this.classList.contains('selected')) {
        penSettings.forEach((elm) => { elm.classList.remove('selected') })
        this.classList.add('selected')
    }
}

for (let setting of penSettings) {
    if (setting.classList.contains('clear') || setting.classList.contains('grid')) continue;
    setting.addEventListener('click', clearSelected)
}

penColor.addEventListener('change', (e) => {
    penSettings.forEach((elm) => { elm.classList.remove('selected') })
    penSettings[0].classList.add('selected')
})

gridButton.addEventListener('click', () => {
    const sqaures = [...drawingBoard.childNodes]
    gridButton.classList.toggle('active')
    if(gridButton.classList.contains('active')){
        sqaures.forEach((elm)=>{elm.classList.add('removeBorder')})
    }else{
        sqaures.forEach((elm)=>{elm.classList.remove('removeBorder')})
    }
})