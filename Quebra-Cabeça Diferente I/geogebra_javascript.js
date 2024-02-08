let { 
    setValue, 
    getXcoord, 
    getYcoord, 
    setLayer, 
    getLayer, 
    registerClientListener, 
    setCoords,
    setFixed
} = ggbApplet;

const UP = 1;
const DOWN = 2;
const LEFT = 3;
const RIGHT = 4;

class Piece {
    constructor(id, order, angle) {
        this.id = id;
        this.point = "P" + id;
        this.name = "Piece" + id;
        this.center = "C" + id;
        this.angle = angle;
        this.order = order;
        this.parts = [
            `${this.name}`,
            `${this.name}Segment1`,
            `${this.name}Segment2`,
            `${this.name}Segment3`,
            `${this.name}Segment4`,
            `up${this.id}`,
            `down${this.id}`,
            `left${this.id}`,
            `right${this.id}`
        ];
        this.originalPosition = null;
        this.selected = false;

        setValue(`angle${this.id}`,  this.angle * Math.PI / 180);
        setLayer(`up${this.id}`, order.findIndex(v => v === UP) + 1);
        setLayer(`down${this.id}`, order.findIndex(v => v === DOWN) + 1);
        setLayer(`left${this.id}`, order.findIndex(v => v === LEFT) + 1);
        setLayer(`right${this.id}`, order.findIndex(v => v === RIGHT) + 1);
    }

    getPosition() { return { x: getXcoord(this.point), y: getYcoord(this.point) } }

    getCenter() { return { x: getXcoord(this.center), y: getYcoord(this.center) } }

    select() { 
        if (this.selected) return;

        for (let part of this.parts) setLayer(part, getLayer(part) + 5);
        this.selected = true;
    }

    unselect() { 
        if (!this.selected) return;

        for (let part of this.parts) setLayer(part, getLayer(part) - 5); 
        this.selected = false;
    }

    setAngle(val) { 
        this.angle = val % 360;
        setValue(`angle${this.id}`,  this.angle * Math.PI / 180);
    }
}

let game = {
    pieces: Array(14),
    correctOrder: [DOWN, RIGHT, UP, LEFT],
    board: [
        Array(3).fill(null),
        Array(3).fill(null),
        Array(3).fill(null)
    ],
    xMin: 0,
    xMax: 2,
    yMin: 0,
    yMax: 2,
    selected: null,
    setSelected(val) {
        game.pieces.forEach(piece => piece.unselect());
        if (val) game.pieces[val.slice(5) - 1].select();
        
        this.selected = val;
    },
    setAnimating(value) {
        for (let i = 1; i < 15; i++) {
            setFixed("Piece" + i, 0, !(value || i < 5));
        }
    },
    positions: [
        [3.7, 2.4], 
        [5.3, 2.4], 
        [6.9, 2.4],
        [3.7, 1], 
        [5.3, 1], 
        [6.9, 1],
        [3.4, -0.4], 
        [4.7, -0.4], 
        [6, -0.4], 
        [7.3, -0.4]
    ]
}

function ggbOnInit() {
    let positions = shuffle(game.positions);

    createPieces(positions);
    registerClientListener(handleEvents);
    restart();
}

function handleEvents(e) {
    switch (e.type) {
        case "dragEnd": return handleDragEnd(e);
        case "mouseDown": return handleMouseDown(e);
    }
}

function handleDragEnd(e) {
    if (!e.target.startsWith("Piece")) return;

    let target = e.target.slice(5) - 1;
    let { x, y } = game.pieces[target].getCenter();
    let position = coordsToPosition(x, y);
    game.setSelected(null);

    if (!position) return reposition(game.pieces[target]);

    let boardPiece = game.board[game.yMax - position.row][position.column];

    if (boardPiece && boardPiece !== game.pieces[target]) return reposition(game.pieces[target]);

    moveToBoard(game.pieces[target], position.row, position.column);
}

function handleMouseDown(e) {
    if (!e.hits.length) return;

    if (e.hits[0] === game.selected) {
        rotate(game.pieces[game.selected.slice(5) - 1]);
        return game.setSelected(null);
    }

    if (e.hits[0].startsWith("Piece")) return game.setSelected(e.hits[0]);
}

async function reposition(piece) {
    game.setAnimating(true);

    let [oX, oY] = piece.originalPosition;

    removeFromBoard(piece);
    check();

    for (let { x, y } = piece.getPosition(); x !== oX || y !== oY;) {
        let xDiff = oX - x;
        let yDiff = oY - y;
        let newX = Math.abs(xDiff) > 0.2 ? x + 0.2 * Math.sign(xDiff) : oX;
        let newY = Math.abs(yDiff) > 0.2 ? y + 0.2 * Math.sign(yDiff) : oY;

        setCoords(piece.point, newX, newY);
        setCoords(piece.center, newX + 0.5, newY + 0.5);
        [x, y] = [newX, newY];
        await sleep(50);
    }

    game.setAnimating(false);
}

function moveToBoard(piece, row, column) {
    removeFromBoard(piece);
    setCoords(piece.point, column, row);
    setCoords(piece.center, column + 0.5, row + 0.5);

    game.board[game.yMax - row][column] = piece;
    check();
}

function removeFromBoard(piece) {
    for (let row = 0; row < game.board.length; row++) {
        for (let column = 0; column < game.board[row].length; column++) {
            if (game.board[row][column] === piece) game.board[row][column] = null;
        }
    }
}

async function rotate(piece) {
    game.setAnimating(true);

    let originalAngle = piece.angle;

    for (let i = 9; i <= 90; i += 9) {
        piece.setAngle(originalAngle + i);
        await sleep(40);
    }

    check();
    game.setAnimating(false);
}

function coordsToPosition(x, y) {
    if (x > game.xMax + 1 || y > game.yMax + 1 || x < game.xMin || y < game.yMin) return null;

    return { column: Math.floor(x), row: Math.floor(y) };
}

function shuffle(arr) {
    for (let i = 0; i < arr.length * 3; i++) {
        let m = Math.floor(Math.random() * arr.length);
        let n = Math.floor(Math.random() * arr.length);

        [arr[m], arr[n]] = [arr[n], arr[m]];
    }

    return arr;
}

function isStrictlyEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }

    return true;
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function restart() {
    setValue("ok", 0);

    game.pieces.forEach(piece => {
        setCoords(piece.point, piece.originalPosition[0], piece.originalPosition[1]);
        setCoords(piece.center, piece.originalPosition[0] + 0.5, piece.originalPosition[1] + 0.5);
    });
}

function check() {
    for (let row = 0; row < game.board.length; row++) {
        for (let column = 0; column < game.board[row].length; column++) {
            let piece = game.board[row][column];
            if (piece === null || !isCorrectPiece(piece)) return setValue("ok", 0);
        }
    }

    return setValue("ok", 1);
}

function isCorrectPiece(piece) {
    if (piece.angle === 0) return isStrictlyEqual(game.correctOrder, piece.order);
    else if (piece.angle === 180) {
        let equivalentOrder = [...piece.order];

        for (let i = 0; i < equivalentOrder.length; i++) {
            if (piece.order[i] === UP) equivalentOrder[i] = DOWN;
            else if (piece.order[i] === DOWN) equivalentOrder[i] = UP;
            else if (piece.order[i] === RIGHT) equivalentOrder[i] = LEFT;
            else if (piece.order[i] === LEFT) equivalentOrder[i] = RIGHT;
        }

        return isStrictlyEqual(game.correctOrder, equivalentOrder);
    }

    return false;
}

function createPieces(positions) {
    for (let i = 1; i < 5; i++) { 
        let column = (i - 1) % 3;
        let row = Math.floor(i / 4);

        game.pieces[i - 1] = new Piece(i, game.correctOrder, 0); 
        game.pieces[i - 1].originalPosition = [column, game.yMax - row];
        game.board[row][column] = game.pieces[i - 1];
    }
    for (let i = 5; i < 15; i++) {
        let angle = Math.floor(Math.random() * 4) * 90;
        let order = i > 9 ? shuffle([...game.correctOrder]) : game.correctOrder;

        game.pieces[i - 1] = new Piece(i, order, angle);
        game.pieces[i - 1].originalPosition = positions[i - 5];
    }
}

function clearBoard() {
    game.board = [
        Array(3).fill(null),
        Array(3).fill(null),
        Array(3).fill(null)
    ];
}

function newGame() {
    let positions = shuffle(game.positions);
    let vertical = shuffle([UP, DOWN]);
    let horizontal = shuffle([RIGHT, LEFT]);

    if (Math.random() > 0.5) game.correctOrder = [vertical[0], horizontal[0], vertical[1], horizontal[1]];
    else game.correctOrder = [horizontal[0], vertical[0], horizontal[1], vertical[1]];

    clearBoard();
    createPieces(positions);
    restart();
}