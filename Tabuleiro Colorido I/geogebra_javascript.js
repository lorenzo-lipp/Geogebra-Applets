let {
    setColor,
    setValue,
    setCoords,
    setLayer,
    getXcoord,
    getYcoord,
    registerClientListener
} = ggbApplet;

let game = {
    pieces: [
        { point: "A", color: "red", name: "l2" },
        { point: "B", color: "purple", name: "l3" },
        { point: "C", color: "green", name: "l4" },
        { point: "D", color: "blue", name: "l5" },
        { point: "G", color: "green", name: "l8" },
        { point: "E", color: "green", name: "l6" },
        { point: "F", color: "red", name: "l7" },
        { point: "H", color: "red", name: "l9" },
        { point: "I", color: "red", name: "l10" },
        { point: "J", color: "blue", name: "l11" },
        { point: "K", color: "blue", name: "l12" },
        { point: "L", color: "blue", name: "l13" },
        { point: "M", color: "purple", name: "l14" },
        { point: "N", color: "purple", name: "l15" },
        { point: "O", color: "purple", name: "l16" },
        { point: "P", color: "purple", name: "l17" }
    ],
    colors: {
        "red": [255, 51, 102],
        "purple": [153, 102, 255],
        "green": [95, 230, 114],
        "blue": [102, 153, 255]
    },
    board: [
        [null, 2, null, 1],
        [null, null, null, null],
        [null, null, 0, null],
        [3, null, null, null]
    ],
    selected: null
}

function ggbOnInit() {
    updatePieces();
    registerClientListener(handleEvents);
}

function updatePieces() {
    for (let piece of game.pieces) setColor(piece.name, ...game.colors[piece.color]);
}

function handleEvents(e) {
    switch (e.type) {
        case "dragEnd":
            return handleDrop(e.target);
        case "select":
            return handleSelect(e.target);
        case "deselect":
            return handleDeselect();
    }
}

function handleSelect(target) {
    if (target.match(/l\d+/)) {
        game.selected = target;
        setLayer(target, 3);
    }
}

function handleDeselect() { 
    if (game.selected === null) return;
    setLayer(game.selected, 2); 
    game.selected = null;
}

function handleDrop(target) {
    let targetIndex = game.pieces.findIndex(p => p.name === target);

    if (targetIndex === -1) return;

    let dropCoords = getCoords(game.pieces[targetIndex].point);
    let row = getRow(dropCoords.y + 0.5);
    let column = getColumn(dropCoords.x + 0.5);

    if (row > 3 || 
        row < 0 || 
        column > 3 || 
        column < 0 ||
        (game.board[row][column] < 4 && game.board[row][column] !== null)
    ) returnPiece(targetIndex);
    else dropPiece(targetIndex, dropCoords);
}

function returnPiece(targetIndex) {
    let x = ((targetIndex - 4) % 3) * 1.1 + 4.6;
    let y = 3 - Math.floor((targetIndex - 4) / 3);

    setCoords(game.pieces[targetIndex].point, x, y);
    
    removeFromBoard(targetIndex);
    setValue("ok", undefined);
}

function dropPiece(targetIndex, dropCoords) {
    let x = Math.floor(dropCoords.x + 0.5);
    let y = Math.floor(dropCoords.y + 0.5);
    let target = game.pieces[targetIndex];
    let row = getRow(y);
    let column = getColumn(x);

    if (game.board[row][column] !== null) returnPiece(game.board[row][column]);

    returnPiece(targetIndex);
    game.board[row][column] = targetIndex;

    setCoords(target.point, x, y);
}

function removeFromBoard(index) {
    for (let row = 0; row < game.board.length; row++) {
        for (let column = 0; column < game.board[row].length; column++) {
            if (game.board[row][column] === index) game.board[row][column] = null;
        }
    }
}

function newGame() {
    let arr = shuffle([
        new Piece("red", "fixed"), 
        new Piece("purple", "fixed"), 
        new Piece("green", "fixed"), 
        new Piece("blue", "fixed")
    ]);
    let newBoard = Array(4).fill().map((_, i) => {
        let row = Array(4).fill(null);

        row[Math.floor(Math.random() * 4)] = arr[i];

        return row;
    });

    for (let emptySpaces = 12; emptySpaces > 0; emptySpaces--) {
        let options = [];
        let breakAll = false;

        for (let row = 0; row < 4; row++) {
            for (let column = 0; column < 4; column++) {
                if (newBoard[row][column] !== null || breakAll) continue;
                let set = getOptions(newBoard, column, row);

                if (set.length === 1) {
                    breakAll = true;
                    newBoard[row][column] = set[0];
                } else {
                    options.push([row, column, set]);
                }
            }
        }

        if (breakAll) continue;

        let [row, column, set] = options[Math.floor(Math.random() * options.length)];
        newBoard[row][column] = set[Math.floor(Math.random() * set.length)];
    }

    let count = { 
        "green": 0,
        "red": 0,
        "blue": 0,
        "purple": 0 
    };

    for (let row = 0; row < 4; row++) {
        for (let column = 0; column < 4; column++) {
            let piece = newBoard[row][column];

            if (piece.direction === "fixed") {
                newBoard[row][column] = game.pieces.findIndex(p => p.color === piece.color);
                setCoords(game.pieces[newBoard[row][column]].point, column, 3 - row);
            } else {
                newBoard[row][column] = null;
                count[piece.color]++;
            }
        }
    }

    let start = 4;
    for (let i = start; i < start + count.green; i++) game.pieces[i].color = "green";
    start += count.green;
    for (let i = start; i < start + count.red; i++) game.pieces[i].color = "red";
    start += count.red;
    for (let i = start; i < start + count.blue; i++) game.pieces[i].color = "blue";
    start += count.blue;
    for (let i = start; i < start + count.purple; i++) game.pieces[i].color = "purple";

    game.board = newBoard;
    returnAllPieces();
    updatePieces();
    setValue("ok", undefined);
}

function getOptions(board, column, row) {
    let options = [];
    let top = getTopNeighbor(board, column, row);
    let bottom = getBottomNeighbor(board, column, row);
    let right = getRightNeighbor(board, column, row);
    let left = getLeftNeighbor(board, column, row);

    if (left !== null && (left.direction === "right" || left.direction === "fixed")) {
        options.push(new Piece(left.color, "right"));
    }
    if (right !== null && (right.direction === "left" || right.direction === "fixed")) {
        options.push(new Piece(right.color, "left"));
    } 
    if (top !== null && (top.direction === "down" || top.direction === "fixed")) {
        options.push(new Piece(top.color, "down"));
    }
    if (bottom !== null && (bottom.direction === "up" || bottom.direction === "fixed")) {
        options.push(new Piece(bottom.color, "up"));
    }

    if (bottom !== null && top !== null && bottom.color === top.color) {
        return [new Piece(bottom.color, bottom.direction === "fixed" ? top.direction : bottom.direction)];
    }

    if (right !== null && left !== null && right.color === left.color) {
        return [new Piece(right.color, right.direction === "fixed" ? left.direction : right.direction)];
    }

    return options;
}

function getTopNeighbor(board, column, row) {
    for (let newRow = row - 1; newRow >= 0; newRow--) {
        let piece = board[newRow][column];

        if (piece === null) continue;
        return piece;
    }

    return null;
}

function getBottomNeighbor(board, column, row) {
    for (let newRow = row + 1; newRow < 4; newRow++) {
        let piece = board[newRow][column];

        if (piece === null) continue;
        return piece;
    }

    return null;
}

function getRightNeighbor(board, column, row) {
    for (let newColumn = column + 1; newColumn < 4; newColumn++) {
        let piece = board[row][newColumn];

        if (piece === null) continue;
        return piece;
    }

    return null;
}

function getLeftNeighbor(board, column, row) {
    for (let newColumn = column - 1; newColumn >= 0; newColumn--) {
        let piece = board[row][newColumn];

        if (piece === null) continue;
        return piece;
    }

    return null;
}

function shuffle(arr) {
    for (let i = 0; i < arr.length * 3; i++) {
        let random1 = Math.floor(Math.random() * arr.length);
        let random2 = Math.floor(Math.random() * arr.length);

        [arr[random1], arr[random2]] = [arr[random2], arr[random1]];
    }

    return arr;
}

function returnAllPieces() {
    for (let i = 4; i < game.pieces.length; i++) returnPiece(i);
}

function getCoords(point) { return { x: getXcoord(point), y: getYcoord(point) }}
function getRow(y) { return 3 - Math.floor(y); }
function getColumn(x) { return Math.floor(x); }

function check() {
    for (let row = 0; row < 4; row++) {
        for (let column = 0; column < 4; column++) {
            if (game.board[row][column] === null) return setValue("ok", 0);

            let piece = game.pieces[game.board[row][column]];
            let isCorrect = game.board[row][column] < 4;
            
            for (let r = row + 1; r < 4; r++) {
                let neighbor = game.pieces[game.board[r][column]];

                if (game.board[r][column] === null || neighbor.color !== piece.color) break;
                if (game.board[r][column] < 4) isCorrect = true;
            }

            for (let r = row - 1; r >= 0; r--) {
                let neighbor = game.pieces[game.board[r][column]];

                if (game.board[r][column] === null || neighbor.color !== piece.color) break;
                if (game.board[r][column] < 4) isCorrect = true;
            }

            for (let c = column + 1; c < 4; c++) {
                let neighbor = game.pieces[game.board[row][c]];

                if (game.board[row][c] === null || neighbor.color !== piece.color) break;
                if (game.board[row][c] < 4) isCorrect = true;
            }

            for (let c = column - 1; c >= 0; c--) {
                let neighbor = game.pieces[game.board[row][c]];

                if (game.board[row][c] === null || neighbor.color !== piece.color) break;
                if (game.board[row][c] < 4) isCorrect = true;
            }
            
            if (!isCorrect) return setValue("ok", 0);
        }
    }

    return setValue("ok", 1);
}

class Piece {
    constructor(color, direction) {
        this.color = color;
        this.direction = direction;
    }
}