let { setVisible, setColor, setValue, setTextValue } = ggbApplet;

let game = {
    selections: [0, 1, 2],
    pieces: [
        [
            [1, 0, 0, 0, 1, 1],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [1, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 1, 1]
        ],
        [
            [1, 1, 0, 0, 1, 1],
            [0, 0, 1, 1, 0, 0],
            [1, 1, 0, 0, 1, 1],
            [0, 0, 1, 1, 0, 0],
            [1, 1, 0, 0, 1, 1],
            [0, 0, 1, 1, 0, 0]
        ],
        [
            [1, 1, 0, 0, 1, 1],
            [1, 1, 0, 0, 1, 1],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [1, 1, 0, 0, 1, 1],
            [1, 1, 0, 0, 1, 1]
        ],
        [
            [0, 1, 1, 0, 0, 1],
            [1, 0, 0, 1, 1, 0],
            [1, 0, 0, 1, 1, 0],
            [0, 1, 1, 0, 0, 1],
            [0, 1, 1, 0, 0, 1],
            [1, 0, 0, 1, 1, 0]
        ],
        [
            [1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1]
        ],
        [
            [1, 0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1]
        ]
    ],
    colors: [
        [0, 147, 221],
        [174, 13, 228],
        [94, 211, 52],
        [252, 38, 38],
        [254, 76, 226],
        [255, 180, 0]
    ]
}

function ggbOnInit() {  }

function updatePiece(piece) {
    let selected = game.selections[piece];
    let finalPiece = game.pieces[selected];

    for (let line = 1; line < 7; line++) {
        for (let column = 1; column < 7; column++) {
            setColor(`c${column}l${line}_${piece + 1}`, ...(finalPiece[line - 1][column - 1] ? game.colors[selected] : [255, 255, 255]));
        }
    }

    setTextValue(`peca${piece + 1}`, `Peça ${game.selections[piece] + 1}`);
    setValue(`rotate${piece}`, Number(!isSymmetrical(finalPiece)));
}

function updateAllPieces() {
    updatePiece(0);
    updatePiece(1);
    updatePiece(2);
}

function rotateFromSelection(index) { rotatePiece(game.selections[index]); }

function rotatePiece(index) {
    let piece = game.pieces[index];
    let newPiece = [[], [], [], [], [], []];

    for (let line = 0; line < 6; line++) {
        for (let column = 0; column < 6; column++) {
            newPiece[line][column] = piece[column][5 - line];
        }
    }

    game.pieces[index] = newPiece;
}

function nextPiece(piece) {
    do game.selections[piece] = (game.selections[piece] + 1) % 6;
    while(game.selections.filter(v => v === game.selections[piece]).length > 1);
}

function prevPiece(piece) {
    do game.selections[piece] = (5 + game.selections[piece]) % 6;
    while(game.selections.filter(v => v === game.selections[piece]).length > 1);
}

function check() {
    let finalPiece = [Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null)];

    for (let piece = 0; piece < 3; piece++) {
        for (let line = 0; line < 6; line++) {
            for (let column = 0; column < 6; column++) {
                if (game.pieces[game.selections[piece]][line][column]) finalPiece[line][column] = piece;
            } 
        }
    }

    setVisible("a_1", 0);
    setVisible("a_3", 0);

    for (let piece of [1, 3]) {
        for (let line = 1; line < 7; line++) {
            for (let column = 1; column < 7; column++) setVisible(`c${column}l${line}_${piece}`, 0);
        }
    }

    for (let line = 1; line < 7; line++) {
        for (let column = 1; column < 7; column++) {
            let value = finalPiece[line - 1][column - 1];
            setVisible(`c${column}l${line}_2`, value !== null);
            if (value !== null) setColor(`c${column}l${line}_2`, ...game.colors[game.selections[value]]);
        }
    }

    if (finalPiece.filter(v => v.includes(null)).length) setValue("ok", 0);
    else setValue("ok", 1);
}

function restart() {
    updateAllPieces();
    setVisible("a_1", 1);
    setVisible("a_3", 1);
    setValue("ok", undefined);
}

function newGame() {
    for (let index = 0; index < 6; index++) {
        for (let line = 0; line < 6; line++) {
            for (let column = 0; column < 6; column++) {
                game.pieces[index][line][column] = Number(Math.random() <= 0.6);
            }
        }
    }

    let random = shuffle([0, 1, 2, 3, 4, 5]);

    let finalPiece = [Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null)];

    for (let piece = 0; piece < 2; piece++) {
        for (let line = 0; line < 6; line++) {
            for (let column = 0; column < 6; column++) {
                if (game.pieces[random[piece]][line][column]) finalPiece[line][column] = random[piece];
            } 
        }
    }

    for (let line = 0; line < 6; line++) {
        for (let column = 0; column < 6; column++) {
            if (finalPiece[line][column] === null) game.pieces[random[2]][line][column] = 1;
        }
    }

    for (let index = 0; index < 6; index++) {
        let rotationTimes = ~~(Math.random() * 3);
        while (rotationTimes) {
            rotatePiece(index);
            rotationTimes--;
        }
    }

    restart();
    updateSmallPieces();
    viewAll(1);
}

function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        let randomElement = ~~(Math.random() * arr.length);
        [arr[i], arr[randomElement]] = [arr[randomElement], arr[i]]
    }
    return arr;
}

function viewAll(bool) {
    setValue("viewAll", bool);
}

function updateSmallPieces() {
    for (let square = 1; square < 7; square++) {
        let piece = game.pieces[square - 1];
        for (let line = 1; line < 7; line++) {
            for (let column = 1; column < 7; column++) {
                setColor(`c${column}l${line}P${square}`, ...(piece[line - 1][column - 1] ? game.colors[square - 1] : [255, 255, 255]));
            }
        }
    }
}

function isSymmetrical(piece) {
    for (let squareSize = 6, start = 0, end = 5; squareSize > 0; squareSize -= 2, start++, end--) {
        let arr = [];

        for (let iteration = 0; iteration < 4; iteration++) {
            for (let i = start; i < end; i++) {
                let row;
                let column;
                switch (iteration) {
                    case 0: row = start; column = i; break;
                    case 1: row = i; column = end; break;
                    case 2: row = end; column = end - (i - start); break;
                    case 3: row = end - (i - start); column = start; break;
                }
                let value = piece[row][column];
                if (arr[i] === undefined) arr[i] = value;
                else if (arr[i] !== value) return false;
            }
        }
    }

    return true;
}