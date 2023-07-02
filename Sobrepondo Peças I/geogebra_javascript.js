let g = ggbApplet;

let game = {
    c1: 0,
    c2: 1,
    Center1: {
        start: [-0.22, -0.13],
        end: [5.18, -0.13]
    },
    Center2: {
        start: [11.18, -0.13],
        end: [500, 500]
    },
    pieces: [
        { big: [1, 0, 1, 0, 1, 0, 1, 0], small: [1, 0, 1, 0, 1, 0, 1, 0], color: [0, 147, 221] },
        { big: [1, 0, 1, 1, 1, 0, 0, 0], small: [0, 1, 0, 0, 0, 1, 1, 1], color: [255, 180, 0] },
        { big: [0, 1, 0, 0, 1, 1, 1, 0], small: [1, 0, 1, 1, 0, 0, 0, 1], color: [36, 183, 219] },
        { big: [0, 1, 0, 0, 1, 0, 1, 1], small: [1, 0, 1, 1, 0, 1, 0, 0], color: [145, 205, 60] },
        { big: [1, 0, 1, 0, 1, 0, 1, 0], small: [0, 1, 0, 1, 0, 1, 0, 1], color: [155, 83, 1] },
        { big: [0, 0, 0, 0, 1, 1, 1, 1], small: [1, 1, 1, 1, 0, 0, 0, 0], color: [32, 139, 67] },
        { big: [0, 0, 1, 1, 0, 1, 1, 0], small: [1, 1, 0, 0, 1, 0, 0, 1], color: [226, 58, 201] },
        { big: [0, 0, 1, 0, 1, 0, 1, 1], small: [1, 1, 0, 1, 0, 1, 0, 0], color: [143, 39, 241] },
        { big: [1, 1, 0, 0, 1, 1, 0, 0], small: [0, 0, 1, 1, 0, 0, 1, 1], color: [233, 48, 48] }
    ]
}
let white = [255, 255, 255];

function ggbOnInit() { restart() }

function nextPiece(circle) {
    do incrementCircle(circle); 
    while (game[circle] === game.c1 && game[circle] === game.c2);
}

function previousPiece(circle) {
    do decrementCircle(circle); 
    while (game[circle] === game.c1 && game[circle] === game.c2);
}

function incrementCircle(circle) { return game[circle] = ++game[circle] % 9;}
function decrementCircle(circle) { return game[circle] = (9 + --game[circle]) % 9;}

function updatePiece(circle) {
    let piece = game.pieces[game[circle]];
    for (let i = 0; i < 8; i++) {
        paintPiece(circle + "Big" + (i + 1), piece.big[i] ? piece.color : white);
        paintPiece(circle + "Small" + (i + 1), piece.small[i] ? piece.color : white);
    }
    if (circle === "c1") g.setTextValue("peca1", `Peça ${game[circle] + 1}`);
    else g.setTextValue("peca2", `Peça ${game[circle] + 1}`);
}

function paintPiece(name, color) {
    g.setColor(name, ...color);
}

function rotateFromCircle(circle) { rotatePiece(game[circle]) }

function rotatePiece(index) {
    let piece = game.pieces[index];
    piece.big.unshift(piece.big.pop());
    piece.small.unshift(piece.small.pop());
}

function mergePieces() {
    let pieces = [game.pieces[game.c1], game.pieces[game.c2]];
    let circle = "c1";
    for (let i = 0; i < 8; i++) {
        paintPiece(circle + "Big" + (i + 1), getMergeColor("big", pieces, i));
        paintPiece(circle + "Small" + (i + 1), getMergeColor("small", pieces, i));
    }
    g.setCoords("Center1", ...game.Center1.end);
    g.setCoords("Center2", ...game.Center2.end);
    g.setValue("ok", check());
}

function check() {
    let pieces = [game.pieces[game.c1], game.pieces[game.c2]];
    for (let i = 0; i < 8; i++) {
        if (pieces[0].big[i] === pieces[1].big[i] || pieces[0].small[i] === pieces[1].small[i]) return 0;
    }
    return 1;
}

function getMergeColor(pieceType, pieces, index) {
    let p1 = pieces[0][pieceType][index];
    let p2 = pieces[1][pieceType][index];
    if (p1 && !p2) return pieces[0].color;
    if (p2 && !p1 || p1 && p2) return pieces[1].color;
    return white;
}

function changePiece(index) {
    let big = shuffle([1, 1, 1, 1, 0, 0, 0, 0]);
    let small = shuffle([1, 1, 1, 1, 0, 0, 0, 0]);

    game.pieces[index].big = big;
    game.pieces[index].small = small;
}

function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        let randomElement = ~~(Math.random() * arr.length);
        [arr[i], arr[randomElement]] = [arr[randomElement], arr[i]]
    }
    return arr;
}

function newGame() {
    let indexes = shuffle(game.pieces.map((_, i) => i));

    for (let i = 1; i < indexes.length; i++) changePiece(indexes[i]);

    complementPiece(indexes[0], indexes[1]);
    game.c1 = 0;
    game.c2 = 1;
    updateSmallPieces();
    viewAll(1);
}

function complementPiece(pieceToChange, pieceToComplement) {
    let big = [];
    let small = [];
    let rotationTimes = ~~(Math.random() * 8);

    for (let i = 0; i < 8; i++) {
        big[i] = Number(!game.pieces[pieceToComplement].big[i]);
        small[i] = Number(!game.pieces[pieceToComplement].small[i]);
    }

    game.pieces[pieceToChange].big = [...big];
    game.pieces[pieceToChange].small = [...small];

    for (let i = 0; i < rotationTimes; i++) {
        rotatePiece(pieceToChange);
    }
}

function restart() {
    updatePiece("c1");
    updatePiece("c2");
    g.setCoords("Center1", ...game.Center1.start);
    g.setCoords("Center2", ...game.Center2.start);
    g.setValue("ok", undefined);
}

function updateSmallPieces() {
    for (let j = 0; j < 9; j++) {
        let piece = game.pieces[j];
        for (let i = 0; i < 8; i++) {
            paintPiece("c1Big" + (i + 1) + "c" + (j + 1), piece.big[i] ? piece.color : white);
            paintPiece("c1Small" + (i + 1) + "c" + (j + 1), piece.small[i] ? piece.color : white);
        }
    }
}

function viewAll(bool) {
    g.setValue("viewAll", bool);
}