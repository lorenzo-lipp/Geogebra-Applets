let g = ggbApplet;
let unsetPieces;
let selected = null;
let game = [
    [2, 3, null, 4],
    [null, null, 14, 12],
    [6, null, null, null],
    [0, null, 8, null]
];
let originalGame = [[...game[0]], [...game[1]], [...game[2]], [...game[3]]];
const emptySpots = [
    [4.4, 2.75], [5.625, 2.75], [6.85, 2.75],
    [4.4, 1.525], [5.625, 1.525], [6.85, 1.525],
    [4.4, 0.3], [5.625, 0.3], [6.85, 0.3]
]
const colors = ['red', 'yellow', 'orange', 'blue', 'gray', 'purple', 'pink', 'green'];
const range = (start, end) => Array(end - start).fill(0).map((_, i) => start + i);
const hasNull = () => game.flat().includes(null);
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

function ggbOnInit() {
    reset();
    g.registerClientListener((e) => {
        if (e.type === "select") select(e.target);
        else if (e.type === "dragEnd") handleDragEnd();
        else if (e.type === "deselect") unselect(selected);

    })
}

function select(target) {
    selected = target;
    if (target.includes("Peca")) {
        g.setLayer(target, 3);
        g.setLayer("Borda" + target, 4);
    }
}

function unselect(target) {
    selected = null;
    if (target.includes("Peca")) {
        g.setLayer(target, 0);
        g.setLayer("Borda" + target, 2);
    }
}

function reset() {
    unsetPieces = range(0, 16);

    for (let row in originalGame) {
        for (let column in originalGame[row]) {
            if (originalGame[row][column] !== null) {
                g.evalCommand(`PontoPeca${originalGame[row][column] + 1} = (${column}, ${3 - row})`);
                g.setFixed(`Peca${originalGame[row][column] + 1}`, 0, 0);
                unsetPieces = unsetPieces.filter(v => v !== originalGame[row][column]);
            }
        }
    }

    for (let piece of unsetPieces) {
        returnPiece((+piece) + 1);
    }

    g.setValue("showCheckButton", !hasNull());
    g.setValue("ok", undefined);
}

function returnPiece(num) {
    let index = unsetPieces.indexOf(num - 1);
    if (index !== -1) {
        g.evalCommand(`PontoPeca${num} = (${emptySpots[index].join(",")})`);
        g.setFixed(`Peca${num}`, 0, 1);
        removeFromGame(num - 1);
        g.setValue("showCheckButton", !hasNull());
        g.setValue("ok", undefined);
    }
}

function setPiecePosition(num, x, y) {
    if (game[3 - y][x] === null) {
        g.evalCommand(`PontoPeca${num} = (${x}, ${y})`);
        removeFromGame(num - 1);
        game[3 - y][x] = num - 1;
        g.setValue("showCheckButton", !hasNull());
    } else {
        returnPiece(num);
    }
}

function handleDragEnd() {
    if (selected !== null && selected.includes("Peca")) {
        let x = g.getXcoord("Ponto" + selected) + 0.5;
        let y = g.getYcoord("Ponto" + selected) + 0.5;
        let num = +selected.substr(4);

        if (y > 4 || y < 0 || x > 4 || x < 0) returnPiece(num);
        else setPiecePosition(num, Math.floor(x), Math.floor(y));
    }
}

function removeFromGame(num) {
    for (let row in game) {
        for (let column in game[row]) {
            if (game[row][column] === num) game[row][column] = null;
        }
    }
}

function check() {
    let isOk = !hasNull();

    for (let row = 0; row < game.length; row++) {
        for (let column = 0; column < game[row].length; column++) {
            let piece = game[row][column];
            let neighbors = [
                game[row + 1] && game[row + 1][column],
                game[row][column - 1],
                game[row][column + 1],
                game[row - 1] && game[row - 1][column]
            ];

            if (piece % 2 === 0) {
                if (!neighbors.includes(piece + 1)) isOk = false;
            } else {
                if (!neighbors.includes(piece - 1)) isOk = false;
            }
        }
    }

    g.setValue("ok", Number(isOk));
    g.setValue("showCheckButton", false);
}

function newGame() {
    let continueLoop = true;

    gameGenerator: while(continueLoop) {
        let availablePieces = range(0, 8);
        game = [
            Array(4).fill(null),
            Array(4).fill(null),
            Array(4).fill(null),
            Array(4).fill(null)
        ];

        for (let row = 0; row < game.length; row++) {
            for (let column = 0; column < game[row].length; column++) {
                if (game[row][column] === null) {
                    let piece = randomElement(availablePieces) * 2;
                    let neighbors = {
                        down: game[row + 1] && game[row + 1][column],
                        left: game[row][column - 1],
                        right: game[row][column + 1],
                        up: game[row - 1] && game[row - 1][column]
                    };
    
                    for (let direction of Object.keys(neighbors)) {
                        if (neighbors[direction] !== null) delete neighbors[direction];
                    }
    
                    let availablePlaces = Object.keys(neighbors);
                    if (availablePlaces.length === 0) continue gameGenerator;
    
                    let finalDirection = randomElement(availablePlaces);

                    switch (finalDirection) {
                        case "up": game[row - 1][column] = piece + 1; break;
                        case "down": game[row + 1][column] = piece + 1; break;
                        case "left": game[row][column - 1] = piece + 1; break;
                        case "right": game[row][column + 1] = piece + 1; break;
                    }
                    availablePieces = availablePieces.filter(v => v !== piece / 2);
                    game[row][column] = piece;
                }
            }
        }

        continueLoop = false;
    }

    let availableToRemove = range(0, 16);

    for (let i = 0; i < 8; i++) {
        let piece = randomElement(availableToRemove);
        let row = Math.floor(piece / 4);
        let column = piece - 4 * row;

        game[row][column] = null;
        availableToRemove = availableToRemove.filter((v) => v !== piece);
    }


    originalGame = [[...game[0]], [...game[1]], [...game[2]], [...game[3]]];
    reset();
}