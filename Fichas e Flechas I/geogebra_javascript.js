let g = ggbApplet;
let lastSelected = "";
let vectors = ["AB", "AD", "BC", "BE", "CF", "DE", "DG", "EF", "EH", "FI", "GH", "HI"];
let squares = {
    "A": { x: -1.04, y: -0.41 },
    "B": { x: 0.96, y: -0.41 },
    "C": { x: 2.96, y: -0.41 },
    "D": { x: -1.04, y: -2.41 },
    "E": { x: 0.96, y: -2.41 },
    "F": { x: 2.96, y: -2.41 },
    "G": { x: -1.04, y: -4.41 },
    "H": { x: 0.96, y: -4.41 },
    "I": { x: 2.96, y: -4.41 }
}
let game;
let numsToBeFixed = [];

function ggbOnInit() {
    ggbApplet.registerClientListener(eventHandler);
    game = {
        "A": 8,
        "B": 9,
        "C": 3,
        "D": 7,
        "E": 4,
        "F": 1,
        "G": 6,
        "H": 5,
        "I": 2
    };

    restart(false);
    arrangeVectors();
    fixNums(["E", "I"]);
}

function eventHandler(e) {
    if (e.type === "select") {
        lastSelected = e.target;
    } else if (e.type === "dragEnd") {
        if (lastSelected.slice(0, 4) != "PNum") return false;

        let dragPlace = getSquare(lastSelected.slice(1));

        return move(lastSelected, dragPlace);
    }
}

function arrangeVectors() {
    let commands = [];

    for (let vector of vectors) {
        if (game[vector[0]] < game[vector[1]]) {
            commands.push(`${vector} = Vector(${vector}1, ${vector}2)`);
        } else {
            commands.push(`${vector} = Vector(${vector}2, ${vector}1)`);
        }
    }

    g.evalCommand(commands.join("\n"));
}

function newGame() {
    let arr = Array.from(new Array(9), (x, i) => i + 1);
    let index = 0;
    arr.sort(() => Math.floor(Math.random() * 10) - Math.floor(Math.random() * 10));

    for (let key of Object.keys(game)) {
        game[key] = arr[index++];
    }

    arrangeVectors();
    restart(false);
    fixNums();
}

function restart(fix=true) {
    commands = [];

    for (let i = 1; i <= 9; i++) {
        let x = g.getValue("Column" + (i % 3 == 0 ? 3 : i % 3));
        let y = g.getValue("Row" + Math.floor((i - 1)/3 + 1));
        commands.push(`Num${i} = (${x}, ${y})`);
        g.setFixed("PNum" + i, 0, 1);
    }

    g.setValue("ok", undefined);
    g.evalCommand(commands.join("\n"));
    if (fix && numsToBeFixed.length) fixNums(numsToBeFixed);
}

function getSquare(num) {
    let x = g.getValue(`x(${num})`) + 0.61;
    let y = g.getValue(`y(${num})`) + 0.61;

    if (isInside(x, y, "A")) {
        return "A";
    } else if (isInside(x, y, "B")) {
        return "B";
    } else if (isInside(x, y, "C")) {
        return "C";
    } else if (isInside(x, y, "D")) {
        return "D";
    } else if (isInside(x, y, "E")) {
        return "E";
    } else if (isInside(x, y, "F")) {
        return "F";
    } else if (isInside(x, y, "G")) {
        return "G";
    } else if (isInside(x, y, "H")) {
        return "H";
    } else if (isInside(x, y, "I")) {
        return "I";
    } else {
        return "OUT";
    }
}

function isInside(x, y, sq) {
    return x >= squares[sq].x && x <= squares[sq].x + 1.22 && y >= squares[sq].y && y <= squares[sq].y + 1.22;
}

function move(obj, dragPlace) {
    let i = +obj[4];
    let takenSquares = [];

    g.setValue("ok", undefined);

    for (let j = 1; j <= 9; j++) {
        if (j != i) takenSquares.push(getSquare("Num" + j));
    }

    if (dragPlace === "OUT" || takenSquares.indexOf(dragPlace) >= 0) {
        let x = g.getValue("Column" + (i % 3 == 0 ? 3 : i % 3));
        let y = g.getValue("Row" + Math.floor((i - 1)/3 + 1));

        return g.evalCommand(`Num${i} = (${x}, ${y})`);
    }

    let { x, y } = squares[dragPlace];
    return g.evalCommand(`Num${i} = (${x}, ${y})`);
}

function fixNums(positions = []) {
    if (positions.length === 0) {
        let keys = Object.keys(game);
        keys.sort(() => Math.floor(Math.random() * 10) - Math.floor(Math.random() * 10));
        positions = [keys[0], keys[1]];
    }

    for (let position of positions) {
        let obj = "PNum" + game[position]
        move(obj, position);
        g.setFixed(obj, 1, 0);
    }

    numsToBeFixed = [...positions];
}

function check() {
    let result = {};

    for (let i = 1; i <= 9; i++) {
        let square = getSquare("Num" + i);
        if (square === "OUT") return false;
        result[square] = i;
    }

    /* for (let i = 1; i <= 9; i++) {
        let obj = "PNum" + i
        g.setFixed(obj, 1, 0);
    } */

    if (Object.keys(result).length != 9) return g.setValue("ok", 0);

    for (let vector of vectors) {
        if (game[vector[0]] < game[vector[1]]) {
            if (result[vector[0]] > result[vector[1]]) return g.setValue("ok", 0);
        } else {
            if (result[vector[0]] < result[vector[1]]) return g.setValue("ok", 0);
        }
    }

    return g.setValue("ok", 1);
}