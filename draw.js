const drawGrid = (canvas, ctx, tileSize, highlightNum) => {
    for (let y = 0; y < canvas.width / tileSize; y++) {
        for (let x = 0; x < canvas.height / tileSize; x++) {
            const parity = (x + y) % 2;
            const tileNum = x + canvas.width / tileSize * y;
            const xx = x * tileSize;
            const yy = y * tileSize;

            if (tileNum === highlightNum) {
                ctx.fillStyle = "#f0f";
            }
            else {
                ctx.fillStyle = parity ? "#DBDBDB" : "#BBBBBB";
            }
            if (data[y][x] == 1) {
                ctx.fillStyle = "#000";
            }

            ctx.fillRect(xx, yy, tileSize, tileSize);

            ctx.fillText("", xx, yy);
        }
    }
};

const generateArray = (size) => {
    let array = [];
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push(0);
        }
        array.push(row);
    }
    return array;
}

const fillArray = (value = 0) => {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            data[i][j] = value;
        }
    }
    drawGrid(canvas, ctx, tileSize);
}

const invert = () => {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            switch (data[i][j]) {
                case 1:
                    data[i][j] = 0;
                    break;
                case 0:
                    data[i][j] = 1;
                    break
            }
        }
    }
    drawGrid(canvas, ctx, tileSize);
}
/**
 * Move elements up
 */
const moveUp = (save = false) => {
    if (save) saveMovement();
    let size = data.length;
    for (let i = 1; i < size; i++) {
        for (let j = 0; j < size; j++) {
            data[i - 1][j] = data[i][j];
        }
    }
    for (let j = 0; j < size; j++) {
        data[size - 1][j] = 0;
    }
    drawGrid(canvas, ctx, tileSize);

}

/**
 * Move elements down
 */
const moveDown = (save = false) => {
    if (save) saveMovement();
    let size = data.length;
    for (let i = size - 2; i >= 0; i--) {
        for (let j = 0; j < size; j++) {
            data[i + 1][j] = data[i][j];
        }
    }
    for (let j = 0; j < size; j++) {
        data[0][j] = 0;
    }
    drawGrid(canvas, ctx, tileSize);
}

/**
 * Move elements left
 */
const moveLeft = (save = false) => {
    if (save) saveMovement();
    let size = data.length;
    for (let i = 0; i < size; i++) {
        for (let j = 1; j < size; j++) {
            data[i][j - 1] = data[i][j];
        }
    }
    for (let i = 0; i < size; i++) {
        data[i][size - 1] = 0;
    }
    drawGrid(canvas, ctx, tileSize);
}

/**
 * Move elements right
 */
const moveRight = (save = false) => {
    if (save) saveMovement();

    let size = data.length;
    for (let i = 0; i < size; i++) {
        for (let j = size - 2; j >= 0; j--) {
            data[i][j + 1] = data[i][j];
        }
    }
    for (let i = 0; i < size; i++) {
        data[i][0] = 0;
    }
    drawGrid(canvas, ctx, tileSize);

}

const addListeners = () => {
    const moveUpButton = document.getElementById('move-up');
    moveUpButton.addEventListener('click', () => {
        moveUp();
    });

    const moveLeftButton = document.getElementById('move-left');
    moveLeftButton.addEventListener('click', () => {
        moveLeft();
    });

    const moveRightButton = document.getElementById('move-right');
    moveRightButton.addEventListener('click', () => {
        moveRight();
    });

    const moveDownButton = document.getElementById('move-down');
    moveDownButton.addEventListener('click', () => {
        moveDown();
    });

    const moveUpSaveButton = document.getElementById('move-up-save');
    moveUpSaveButton.addEventListener('click', () => {
        moveUp(true);
    });

    const moveLeftSaveButton = document.getElementById('move-left-save');
    moveLeftSaveButton.addEventListener('click', () => {
        moveLeft(true);
    });

    const moveRightSaveButton = document.getElementById('move-right-save');
    moveRightSaveButton.addEventListener('click', () => {
        moveRight(true);
    });

    const moveDownSaveButton = document.getElementById('move-down-save');
    moveDownSaveButton.addEventListener('click', () => {
        moveDown(true);
    });
    const cleanButton = document.getElementById('clean');
    cleanButton.addEventListener('click', () => {
        fillArray(0);
    });

    const fillButton = document.getElementById('fill');
    fillButton.addEventListener('click', () => {
        fillArray(1);
    });


    const invertButton = document.getElementById('invert');
    invertButton.addEventListener('click', () => {
        invert();
    });
}

function binaryRowToHex(row) {
    // Convertir la fila binaria a una cadena de bits
    let binaryString = row.join('');
    // Convertir la cadena binaria a un número hexadecimal
    let hexString = parseInt(binaryString, 2).toString(16).toUpperCase().padStart(2, '0');
    return hexString;
}

function convertArrayToHex() {
    // Convertir cada fila de la matriz a hexadecimal
    const hexArray = data.map(binaryRowToHex);

    const stringResult = hexArray.join('');
    return stringResult;
}

const saveMovement = () => {

    const stringResult = convertArrayToHex();
    if (secontStr == 0) {
        secontStr++;
        const location = generateLocationString(currentMemoryLocation);
        result = result + location + stringResult;
        console.log(currentMemoryLocation);
        console.log(location);
    }
    else {

        secontStr++;
        result = result + stringResult;
        if (secontStr == 4) {
            currentMemoryLocation += 2;
            secontStr = 0;
            result = result + '\n';
        }
    }

    printResult();
}

const size = 8;
var currentMemoryLocation = 0;
var secontStr = 0;
var result = '';
const canvas = document.getElementById('theCanvas');
canvas.width = canvas.height = 600;
const ctx = canvas.getContext("2d");

ctx.font = "11px courier";
ctx.textBaseline = "top";
const tileSize = canvas.width / size;
let lastTile = -1;

const data = generateArray(8);

drawGrid(canvas, ctx, tileSize);
document.body.style.display = "flex";
document.body.style.alignItems = "flex-start";
//document.body.appendChild(canvas);

canvas.addEventListener("mousemove", evt => {
    evt.target.style.cursor = "pointer";
    const tileX = ~~(evt.offsetX / tileSize);
    const tileY = ~~(evt.offsetY / tileSize);
    const tileNum = tileX + canvas.width / tileSize * tileY;

    if (tileNum !== lastTile) {
        lastTile = tileNum;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(canvas, ctx, tileSize, tileNum);
    }

    status.innerText = `  mouse coords: {${evt.offsetX}, ${evt.offsetX}}
    tile coords : {${tileX}, ${tileY}}
    tile number : ${tileNum}`;
});

canvas.addEventListener("click", evt => {
    status.innerText += "\n  [clicked]";
    const tileX = ~~(evt.offsetX / tileSize);
    const tileY = ~~(evt.offsetY / tileSize);
    data[tileY][tileX] = data[tileY][tileX] == 0 ? 1 : 0;

});

canvas.addEventListener("mouseout", event => {
    drawGrid(canvas, ctx, tileSize);
    status.innerText = "";
    lastTile = -1;
});

addListeners();