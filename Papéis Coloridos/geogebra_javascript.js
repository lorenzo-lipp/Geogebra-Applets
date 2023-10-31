let { 
    setValue, 
    getXcoord, 
    getYcoord, 
    setCoords, 
    setLayer, 
    registerClientListener, 
    setFixed,
    setColor
} = ggbApplet;

let game = {
    sheets: [
        {
            color: "Blue",
            rgbColor: [102, 199, 255],
            initialPosition: [5, 3]
        },
        {
            color: "Red",
            rgbColor: [255, 69, 73],
            initialPosition: [7.5, 3]
        },
        {
            color: "Purple",
            rgbColor: [186, 102, 255],
            initialPosition: [10, 3]
        },
        {
            color: "Brown",
            rgbColor: [153, 91, 28],
            initialPosition: [5, 0.5]
        },
        {
            color: "Green",
            rgbColor: [117, 255, 127],
            initialPosition: [7.5, 0.5]
        },
        {
            color: "Yellow",
            rgbColor: [254, 215, 110],
            initialPosition: [10, 0.5]
        },
        {
            color: "Orange",
            rgbColor: [255, 141, 66],
            initialPosition: [6.25, -2]
        },
        {
            color: "Pink",
            rgbColor: [255, 122, 188],
            initialPosition: [8.75, -2]
        }
    ],
    table: [
        ["Re", "Gr", "Pu", "Pu"],
        ["Re", "Bl", "Bl", "Pu"],
        ["Br", "Bl", "Bl", "Ye"],
        ["Or", "Or", "Pi", "Ye"]
    ],
    sheetsOnTable: 0,
    xMin: -0.2,
    xMax: 3.8,
    yMin: -1.7,
    yMax: 2.3,
    stack: []
}

function ggbOnInit() {
    registerClientListener(handleEvents);
}

function handleEvents(e) {
    if (e.type === "mouseDown" && e.hits.length > 0) {
        onDragStart(e.hits[0].slice(0, -5));
    } else if (e.type === "dragEnd") {
        onDragEnd(e.target.slice(0, -5));
    }
}

function onDragStart(sheetColor) {
    setLayer(sheetColor + "Sheet", game.sheetsOnTable + 1);
}

function onDragEnd(sheetColor) {
    let sheet = game.sheets.find(s => s.color === sheetColor);
    let { x, y } = getCoords(sheet.color);

    if (isInsideTable(x, y)) {
        placeItCorrectly(sheet.color, x, y);
        if (game.stack.length === 8) check();
    } else {
        returnIt(sheet.color, ...sheet.initialPosition);
    }
}

function getCoords(point) {
    return { x: getXcoord(point), y: getYcoord(point) }
}

function isInsideTable(x, y) {
    return (
        x > game.xMin - 0.5 
        && x < game.xMax - 1.5
        && y > game.yMin - 0.5
        && y < game.yMax - 1.5
    );
}

function placeItCorrectly(color, x, y) {
    let tableColumn = Math.floor(x - (game.xMin - 0.5));
    let tableRow = Math.floor(y - (game.yMin - 0.5));

    setCoords(color, game.xMin + tableColumn, game.yMin + tableRow);
    setFixed(color + "Sheet", 0, 0);
    game.stack.push(color);
    game.sheetsOnTable++;
}

function returnIt(color, x, y) {
    setCoords(color, x, y);
    setLayer(color + "Sheet", 0);
    setFixed(color + "Sheet", 0, 1);
}

function returnLast() {
    let color = game.stack.pop();
    let sheet = game.sheets.find(s => s.color === color);

    if (sheet) {
        returnIt(sheet.color, ...sheet.initialPosition);
        setValue("ok", undefined);
        game.sheetsOnTable--;
    }
}

function check() {
    let userTable = [[], [], [], []];

    for (let color of game.stack) {
        let { x, y } = getCoords(color);
        let column = Math.floor(x - game.xMin);
        let row = 4 - Math.floor(y - game.yMin + 1);
        let colorAlias = color.slice(0, 2);

        userTable[row][column] = colorAlias;
        userTable[row - 1][column] = colorAlias;
        userTable[row][column + 1] = colorAlias;
        userTable[row - 1][column + 1] = colorAlias;
    }

    for (let row = 0; row < 4; row++) {
        for (let column = 0; column < 4; column++) {
            if (userTable[row][column] !== game.table[row][column]) {
                return setValue("ok", 0);
            }
        }
    }

    return setValue("ok", 1);
}

function newGame() {
    let newTable = [[], [], [], []];
    let allPositions = randomize([
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1],
        [3, 0], [3, 1], [3, 2]
    ]);
    let newStack = randomize(["Blue", "Red", "Orange", "Pink", "Yellow", "Purple", "Brown", "Green"]);

    for (let i = 0; i < 8; i++) {
        let row = allPositions[i][0];
        let column = allPositions[i][1];
        let colorAlias = newStack[i].slice(0, 2);

        newTable[row][column] = colorAlias;
        newTable[row - 1][column] = colorAlias;
        newTable[row - 1][column + 1] = colorAlias;
        newTable[row][column + 1] = colorAlias;

        updateTableColor(row, column, newStack[i]);
    }

    game.table = newTable;
    restart();
}

function restart() {
    while(game.stack.length) {
        returnLast();
    }
}

function randomize(arr) {
    for (let i = 0; i < arr.length * 10; i++) {
        let firstElement = Math.floor(Math.random() * arr.length);
        let secondElement = Math.floor(Math.random() * arr.length);

        [arr[firstElement], arr[secondElement]] = [arr[secondElement], arr[firstElement]];
    }

    return arr;
}

function updateTableColor(row, column, color) {
    let sheet = game.sheets.find(s => s.color === color);

    let dl = row * 4 + column + 1;
    let dr = row * 4 + column + 2;
    let ul = (row - 1) * 4 + column + 1;
    let ur = (row - 1) * 4 + column + 2;

    setColor(`table${dl}`, ...sheet.rgbColor);
    setColor(`table${dr}`, ...sheet.rgbColor);
    setColor(`table${ul}`, ...sheet.rgbColor);
    setColor(`table${ur}`, ...sheet.rgbColor);
}