let WRONG_COLOR = [237, 0, 0];
let RIGHT_COLOR = [0, 153, 0];
let FIXED_COLOR_1 = [0, 153, 255];
let FIXED_COLOR_2 = [153, 102, 255];

let canvas = document.querySelector('canvas') || {};
let dimensions = {
    get width() { return this.scale(760); },
    get height() { return this.scale(580); },
    get start() { return { x: this.scale(80), y: this.scale(135) }},
    get end() { return { x: this.scale(420), y: this.scale(475)}},
    scale(value) { return value * (canvas.getBoundingClientRect().width / 760); }
}
let game = {
    clickStart: null,
    lastPosition: null,
    geogebraValues: { startX: 0, startY: 0, endX: 0, endY: 0 },
    polygonColor: WRONG_COLOR,
    diceResult: null,
    board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}

let { 
    setValue, 
    setColor, 
    evalCommandGetLabels, 
    setFixed, 
    setFilling, 
    deleteObject, 
    getAllObjectNames, 
    getValue 
} = ggbApplet;

function ggbOnInit() {}

function rollDice() {
    game.diceResult = [
        Math.floor(Math.random() * 6 + 1), 
        Math.floor(Math.random() * 6 + 1)
    ];

    setValue("dice1", game.diceResult[0]);
    setValue("dice2", game.diceResult[1]);

    document.addEventListener("pointerdown", onDragStart);
    document.addEventListener("pointerup", onDragEnd);
}

function updateGeogebra() {
    if (!game.clickStart || !game.lastPosition) resetValues();
    else updateValues();

    for (let key in game.geogebraValues) setValue(key, game.geogebraValues[key]);
    setColor("l2", ...game.polygonColor);
}

function updateValues() {
    game.geogebraValues.startX = Math.min(game.clickStart.x, game.lastPosition.x);
    game.geogebraValues.startY = Math.min(game.clickStart.y, game.lastPosition.y);
    game.geogebraValues.endX = Math.max(game.clickStart.x, game.lastPosition.x);
    game.geogebraValues.endY = Math.max(game.clickStart.y, game.lastPosition.y);
    
    if (isValidRectangle()) game.polygonColor = RIGHT_COLOR;
    else game.polygonColor = WRONG_COLOR;
}

function resetValues() {
    game.geogebraValues = { startX: 0, startY: 0, endX: 0, endY: 0 };
    game.polygonColor = WRONG_COLOR;
}

function onDragStart(e) {
    let position = pixelsToSquare(e);

    if (!isValidPosition(position)) return;
    setValue("showConfirm", false);
    game.clickStart = position;
    game.lastPosition = null;
    document.addEventListener("pointermove", onDragMove);
    updateGeogebra();
}

function onDragMove(e) {
    if (game.clickStart) {
        let position = pixelsToSquare(e);

        if (!isValidPosition(position)) return;
        if (!game.lastPosition || position.x !== game.lastPosition.x || position.y !== game.lastPosition.y) {
            game.lastPosition = position;
            updateGeogebra();
        }
    }
}

function onDragEnd(e) {
    if (game.clickStart && game.lastPosition) {
        let position = pixelsToSquare(e);

        if (!isValidPosition(position)) position = game.lastPosition; 
    }

    if (!isValidRectangle()) {
        game.clickStart = null;
        game.lastPosition = null;
    } else {
        setValue("showConfirm", true);
    }

    document.removeEventListener("pointermove", onDragMove);
    updateGeogebra();
}

function pixelsToSquare(e) {
    let x = e.x - canvas.getBoundingClientRect().left;
    let y = e.y - canvas.getBoundingClientRect().top;
    let start = dimensions.start;
    let end = dimensions.end;
    let squareSize = (end.x - start.x) / 10;
    
    return { 
        x: Math.floor((x - start.x) / squareSize) + 1,
        y: Math.floor((y - start.y) / squareSize) + 1
    };
}

function isValidPosition(position) {
    if (position.x < 1 || position.x > 10 || position.y < 1 || position.y > 10) return false;
    return true;
}

function isValidRectangle() {
    let { startX, startY, endX, endY } = game.geogebraValues;

    if (!(game.diceResult[0] === (1 + endX - startX) && game.diceResult[1] === (1 + endY - startY)) &&
        !(game.diceResult[1] === (1 + endX - startX) && game.diceResult[0] === (1 + endY - startY))
    ) return false;

    if (startX === 0 && startY === 0) return false;

    for (let row = startY; row <= endY; row++) {
        for (let column = startX; column <= endX; column++) {
            if (game.board[row - 1][column - 1]) return false;
        }
    }

    return true;
}

function confirmRectangle() {
    if (isValidRectangle()) {
        let { startX, startY, endX, endY } = game.geogebraValues;

        for (let row = startY; row <= endY; row++) {
            for (let column = startX; column <= endX; column++) {
                game.board[row - 1][column - 1] = 1;
            }
        }

        resetListeners();
        setValue("showConfirm", false);
        setValue("pass", false);
        clonePolygon();
        addScore(game.diceResult[0] * game.diceResult[1]);
        nextTurn();
    }
}

function passTurn() {
    nextTurn();
    resetListeners();
    setValue("showConfirm", false);
    if (getValue("pass")) return endGame();
    setValue("pass", true);
}

function endGame() {
    setValue("end", true);
    resetDices();
}

function nextTurn() {
    let newValue = getValue("turn") === 1 ? 2 : 1;
    setValue("turn", newValue);
    resetDices();
}

function resetDices() {
    game.diceResult = null;
    setValue("dice1", undefined);
    setValue("dice2", undefined);
}

function clonePolygon() {
    let { startX, startY, endX, endY } = game.geogebraValues;
    let maxX = Math.max(endX, startX);
    let maxY = Math.max(endY, startY);

    let command = `(${startX - 1} , ${11 - startY}), (${maxX}, ${11 - startY}), (${maxX}, ${10 - maxY}), (${startX - 1}, ${10 - maxY})`
    let label = evalCommandGetLabels(`{Polygon(${command})}`);

    if (getValue("turn") === 1) setColor(label, ...FIXED_COLOR_1);
    else setColor(label, ...FIXED_COLOR_2);
    setFilling(label, 0.4);
    setFixed(label, 0, 0);

    resetBoardTrackers();
    updateGeogebra();
}

function resetBoardTrackers() {
    game.clickStart = null;
    game.lastPosition = null;
}

function resetBoard() {
    game.board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
}

function resetListeners() {
    document.removeEventListener("pointerdown", onDragStart);
    document.removeEventListener("pointermove", onDragMove);
    document.removeEventListener("pointerup", onDragEnd);
}

function resetPolygons() {
    getAllObjectNames("List").forEach(v => {
        if (v !== "l1" && v !== "l2") deleteObject(v);
    });
}

function resetTurn() {
    setValue("turn", 1);
}

function resetScore() {
    setValue("score", 0);
}

function addScore(num) {
    setValue("score", getValue("score") + num);
}

function reset() {
    setValue("pass", false);
    setValue("showConfirm", false);
    setValue("end", false);
    resetTurn();
    resetScore();
    resetBoard();
    resetDices();
    resetListeners();
    resetPolygons();
    resetBoardTrackers();
    updateGeogebra();
}