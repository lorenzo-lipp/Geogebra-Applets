let g = ggbApplet;

var game = {
    frogs: 5,
    frames: 15,
    frameTime: 70,
    maxJumps: 2,
    isFirstGame: true
};

function ggbOnInit() { 
    g.registerClickListener(handleClick);
    restart();
    updateFilling();
    g.setValue("firstGame", true);
    g.setValue("showGuide", false);
}

function restart(update = true) {
    game.board = [
            ["", "", "", "", ""],
            ["", "", "", "Frog4", ""],
            ["", "", "Frog3", "Frog1", "Frog2"],
            ["", "", "", "Frog5", ""],
            ["", "", "", "", ""],
        ];
    game.isAnimating = false;
    game.totalJumps = 0;
    game.gameEnd = false;
    game.solution = game.solution || [0, 2, 5, 6, 7];
    game.solutionColors = game.solutionColors || ["Green", "Green", "Brown", "Green", "Brown"];
    if (update) updatePositions();
    else game.guide = [];
    g.setValue("ok", undefined);
}

function getPosition(row, column) { return { x: -1.06 + 1.8 * column, y: 0.1 - 1.4 * row } }

function updatePositions() {
    for (let i = 1; i <= game.frogs; i++) {
        let frog = "Frog" + i;
        let {x, y} = getFrogPosition("Frog" + i);
        
        g.setValue(frog + "X", x);
        g.setValue(frog + "Y", y);
    }
}

function updateFilling() {
    for (let i = 1; i < 6; i++) {
        for (let j = 1; j < 6; j++) {
            let position = 5 * (i - 1) + j - 1;
            let filling = 0.01;
            let color = [0, 0, 0];

            if (!game.isFirstGame && game.solution.includes(position)) {
                filling = 0.2;
                color = getColor[game.solutionColors[game.solution.indexOf(position)]];
            }
            g.setFilling("row" + i + "column" + j, filling);
            g.setColor("row" + i + "column" + j, ...color);
        }
    }
}

function getFrogPosition(frog) {
    for (let row in game.board) {
        for (let column in game.board[row]) {
            if (frog === game.board[row][column]) return getPosition(row, column);
        }
    }
}

function move(frog, to, preventJump = false) {

    let frogRow, frogColumn;

    for (let row in game.board) {
        for (let column in game.board[row]) {
            if (frog === game.board[row][column]) {
                frogRow = +row; 
                frogColumn = +column;
            }
        }
    }

    let { direction, isDouble, isTriple } = getDirection({ x: frogColumn, y: frogRow }, to);

    if (!direction) return;

    if (!preventJump) jump(frog, direction, isDouble, isTriple);
    game.board[frogRow][frogColumn] = "";
    game.board[to.y][to.x] = frog;
    game.totalJumps++;
    game.isAnimating = true;
    return true;
}

function getDirection(from, to) {
    let direction;
    let isDouble;
    let isTriple;

    let xDiff = from.x - to.x;
    let yDiff = from.y - to.y;

    if (!xDiff && !yDiff) return {};
    if (Math.abs(xDiff) === 1 || Math.abs(yDiff) === 1) return {};
    if (!xDiff && yDiff) {
        if (yDiff > 0) direction = "north";
        else direction = "south";
        isDouble = Math.abs(yDiff) === 3;
        isTriple = Math.abs(yDiff) === 4;
    } else if (!yDiff && xDiff) {
        if (xDiff > 0) direction = "west";
        else direction = "east";
        isDouble = Math.abs(xDiff) === 3;
        isTriple = Math.abs(xDiff) === 4;
    } else {
        if (Math.abs(xDiff) !== Math.abs(yDiff)) return {};
        if (xDiff > 0) {
            if (yDiff > 0) direction = "northWest";
            else direction = "southWest";
        } else {
            if (yDiff > 0) direction = "northEast";
            else direction = "southEast";
        }
        isDouble = Math.abs(xDiff) === 3;
        isTriple = Math.abs(xDiff) === 4;
    }

    if (!game.board[from.y + (yDiff ? -1 * Math.sign(yDiff) : 0)][from.x + (xDiff ? -1 * Math.sign(xDiff) : 0)]) return {}; 
    if ((isDouble || isTriple) && !game.board[from.y + (yDiff ? -2 * Math.sign(yDiff) : 0)][from.x + (xDiff ? -2 * Math.sign(xDiff) : 0)]) return {};
    if (isTriple && !game.board[from.y + (yDiff ? -3 * Math.sign(yDiff) : 0)][from.x + (xDiff ? -3 * Math.sign(xDiff) : 0)]) return {};

    return { direction, isDouble, isTriple };
}

function jump(frog, direction, isDouble, isTriple, percent = 0, start = null) {
    start = start || getFrogPosition(frog);
    let animation = direction + (isDouble ? "Double" : "") + (isTriple ? "Triple" : "");
    let frames = game.frames + (isDouble ? 5 : 0) + (isTriple ? 10 : 0);
    percent = Math.min(percent, 1);
    let { x, y } = getAnimation[animation](percent, start);

    g.setValue(frog + "X", x);
    g.setValue(frog + "Y", y);

    if (percent !== 1) setTimeout(() => jump(frog, direction, isDouble, isTriple, percent + 1 / frames, start), game.frameTime);
    else {
        game.isAnimating = false;
        g.setTextValue("selected", "");
        if (game.totalJumps === game.maxJumps) check();
    }
}

function handleClick(obj) {
    let matchResult = obj.match(/row(\d)column(\d)/);
    if (game.isAnimating || game.gameEnd) return;
    if (matchResult) {
        let selected = g.getValueString("selected");
        let row = +matchResult[1] - 1;
        let column = +matchResult[2] - 1;
        let frog = game.board[row][column];

        if (frog) {
            if (frog !== selected) g.setTextValue("selected", frog);
            else g.setTextValue("selected", "");
        } 
        else if (selected) move(selected, { x: column, y: row });
        else g.setTextValue("selected", "");

        g.evalCommand("SelectObjects()");
    }
}

function check() {
    let isOk = false;
    let boardCopy = game.board.flat();
    game.gameEnd = true;

    for (let i = 0; i < boardCopy.length; i++) {
        let foundSolution = true;
        game.solution.forEach((v, index) => foundSolution = foundSolution && boardCopy[i + v] && game.solutionColors[index] === getColor[boardCopy[i + v]]);
        if (foundSolution) {
            isOk = true;
            break;
        }
        if (!game.isFirstGame) break;
    }

    g.setTextValue("selected", "");

    setTimeout(() => g.setValue("ok", isOk), 200);
}

function newGame() {
    restart(false);
    let startBoard = game.board.flat();
    game.maxJumps = 5;

    for (let i = 0; i < game.maxJumps; i++) {
        if (!randomMove(startBoard)) return newGame();
    }

    let boardCopy = game.board.flat();

    restart(true);
    game.solution = boardCopy.map((v, i) => v ? i : null).filter(v => v !== null);
    game.solutionColors = boardCopy.map(v => v ? getColor[v] : null).filter(v => v !== null);
    game.isFirstGame = false;
    g.setValue("firstGame", false);
    g.setValue("showGuide", false);
    updateFilling();
}

function randomMove(startBoard) {
    let possibleMoves = {};
    let flatBoard = game.board.flat();

    for (let i = 1; i < 6; i++) {
        let frog = "Frog" + i;
        let frogPosition = flatBoard.indexOf(frog);
        let frogInitialPosition = startBoard.indexOf(frog);
        let frogX = frogPosition % 5;
        let frogY = ~~(frogPosition / 5);
        let frogInitialX = frogInitialPosition % 5;
        let frogInitialY = ~~(frogInitialPosition / 5);
        for (let row in game.board) {
            for (let column in game.board[row]) {
                let [ x, y ] = [ +column, +row ];
                if (game.board[row][column] === "" && (x !== frogInitialX || y !== frogInitialY)) {
                    let { direction } = getDirection({ x: frogX, y: frogY }, { x, y });
                    if (direction) {
                        if (!possibleMoves[frog]) possibleMoves[frog] = [];
                        possibleMoves[frog].push({ x, y });
                    }
                }
            }
        }
    }

    let frogs = Object.keys(possibleMoves)

    if (!frogs.length) return false;

    let frog = getRandomElement(frogs);
    let { x, y } = getRandomElement(possibleMoves[frog]);
    let frogPosition = flatBoard.indexOf(frog);
    let frogX = frogPosition % 5;
    let frogY = ~~(frogPosition / 5);
    
    move(frog, { x, y }, true);
    setGuide({ x: frogX, y: frogY }, { x, y });
    return true;
}

function getRandomElement(arr) {
    return arr[~~(Math.random() * arr.length)];
}

function setGuide(initialPosition, endPosition) {
    if (!game.guide) return;
    let nextGuide = game.guide.length;
    game.guide[nextGuide] = `${nextGuide + 1}. Mova o sapo da posição ${String.fromCharCode(65 + initialPosition.x) + (initialPosition.y + 1)} para ${String.fromCharCode(65 + endPosition.x) + (endPosition.y + 1)}.`;
    g.setTextValue("guide" + (nextGuide + 1), game.guide[nextGuide]);
}

let getColor = {
    "Frog1": "Brown",
    "Frog2": "Brown",
    "Frog3": "Green",
    "Frog4": "Green",
    "Frog5": "Green",
    "Green": [102, 204, 0],
    "Brown": [153, 51, 0]
}

let getAnimation = {
    "northEast": (percent, start) => {
        let x, y;
        if (percent < 0.44) {
            x = 1.17 * Math.pow(percent, 3) + 2.52 * percent + start.x;
            y = -1.39 * Math.pow(percent, 3) + 5.69 * percent + start.y;
        } else if (percent < 0.64) {
            x = 16.51 * Math.pow(percent, 3) - 22.72 * Math.pow(percent, 2) + 13.89 * percent + start.x - 1.91;
            y = 1.15 * Math.pow(percent, 3) - 2.6 * Math.pow(percent, 2) + 6.44 * percent + start.y - 0.05;
        } else if (percent < 0.81) {
            x = -36.58 * Math.pow(percent, 3) + 78.66 * Math.pow(percent, 2) - 50.64 * percent + start.x + 11.78;
            y = -60.16 * Math.pow(percent, 3) + 114.48 * Math.pow(percent, 2) - 68.09 * percent + start.y + 15.76;
        } else {
            x = 17.44 * Math.pow(percent, 3) - 52.33 * Math.pow(percent, 2) + 55.23 * percent + start.x - 16.75;
            y = 54.6 * Math.pow(percent, 3) - 163.79 * Math.pow(percent, 2) + 156.83 * percent + start.y - 44.83;
        }
        return { x, y }
    },
    "northEastDouble": (percent, start) => {
        let x, y;
        if (percent < 0.58) {
            x = -0.68 * Math.pow(percent, 3) + 5.36 * percent + start.x;
            y = -0.12 * Math.pow(percent, 3) + 6.49 * percent + start.y;
        } else if (percent < 0.73) {
            x = 39 * Math.pow(percent, 3) - 69.61 * Math.pow(percent, 2) + 46.07 * percent + start.x - 7.93;
            y = -2.36 * Math.pow(percent, 3) + 3.92 * Math.pow(percent, 2) + 4.19 * percent + start.y + 0.45;
        } else if (percent < 0.86) {
            x = -89.85 * Math.pow(percent, 3) + 213.03 * Math.pow(percent, 2) - 160.59 * percent + start.x + 42.43;
            y = -147.09 * Math.pow(percent, 3) + 321.41 * Math.pow(percent, 2) - 227.95 * percent + start.y + 57.03;
        } else {
            x = 43.02 * Math.pow(percent, 3) - 129.06 * Math.pow(percent, 2) + 132.99 * percent + start.x - 41.55;
            y = 134.69 * Math.pow(percent, 3) - 404.06 * Math.pow(percent, 2) + 394.65 * percent + start.y - 121.08;
        }
        return { x, y };
    },
    "northEastTriple": (percent, start) => {
        let x, y;
        if (percent < 0.55) {
            x = -0.07 * Math.pow(percent, 3) + 6.96 * percent + start.x;
            y = -1.69 * Math.pow(percent, 3) + 8.78 * percent + start.y;
        } else if (percent < 0.73) {
            x = 27.44 * Math.pow(percent, 3) - 45.67 * Math.pow(percent, 2) + 32.23 * percent + start.x - 4.66;
            y = 27.98 * Math.pow(percent, 3) - 49.26 * Math.pow(percent, 2) + 36.04 * percent + start.y - 5.03;
        } else if (percent < 0.88) {
            x = -88.84 * Math.pow(percent, 3) + 207.29 * Math.pow(percent, 2) - 151.2 * percent + start.x + 39.72;
            y = -206.22 * Math.pow(percent, 3) + 460.24 * Math.pow(percent, 2) - 333.43 * percent + start.y + 84.28;
        } else {
            x = 78.83 * Math.pow(percent, 3) - 236.49 * Math.pow(percent, 2) + 240.32 * percent + start.x - 75.46;
            y = 242.22 * Math.pow(percent, 3) - 726.67 * Math.pow(percent, 2) + 713.72 * percent + start.y - 223.67;
        }
        return { x, y };
    },
    "northWest": (percent, start) => {
        let { x, y } = getAnimation.northEast(percent, start);
        x = -x + 2 * start.x;
        return { x, y };
    },
    "northWestDouble": (percent, start) => {
        let { x, y } = getAnimation.northEastDouble(percent, start);
        x = -x + 2 * start.x;
        return { x, y };
    },
    "northWestTriple": (percent, start) => {
        let { x, y } = getAnimation.northEastTriple(percent, start);
        x = -x + 2 * start.x;
        return { x, y };
    },
    "southEast": (percent, start) => {
        let { x, y } = getAnimation.northEast(1 - percent, start);
        x = -x + 2 * start.x + 2 * 1.8;
        y -= 2 * 1.4;
        return { x, y };
    },
    "southEastDouble": (percent, start) => {
        let { x, y } = getAnimation.northEastDouble(1 - percent, start);
        x = -x + 2 * start.x + 3 * 1.8;
        y -= 3 * 1.4;
        return { x, y };
    },
    "southEastTriple": (percent, start) => {
        let { x, y } = getAnimation.northEastTriple(1 - percent, start);
        x = -x + 2 * start.x + 4 * 1.8;
        y -= 4 * 1.4;
        return { x, y };
    },
    "southWest": (percent, start) => {
        let { x, y } = getAnimation.northWest(1 - percent, start);
        x = -x + 2 * start.x - 2 * 1.8;
        y -= 2 * 1.4;
        return { x, y };
    },
    "southWestDouble": (percent, start) => {
        let { x, y } = getAnimation.northWestDouble(1 - percent, start);
        x = -x + 2 * start.x - 3 * 1.8;
        y -= 3 * 1.4;
        return { x, y };
    },
    "southWestTriple": (percent, start) => {
        let { x, y } = getAnimation.northWestTriple(1 - percent, start);
        x = -x + 2 * start.x - 4 * 1.8;
        y -= 4 * 1.4;
        return { x, y };
    },
    "east": (percent, start) => {
        let x, y;
        if (percent < 0.29) {
            x = 7.67 * Math.pow(percent, 3) + 2.29 * percent + start.x;
            y = -2.87 * Math.pow(percent, 3) + 5.27 * percent + start.y;
        } else if (percent < 0.54) {
            x = -11.29 * Math.pow(percent, 3) + 16.62 * Math.pow(percent, 2) - 2.57 * percent + start.x + 0.47;
            y = -21.61 * Math.pow(percent, 3) + 16.44 * Math.pow(percent, 2) + 0.47 * percent + start.y + 0.47;
        } else if (percent < 0.75) {
            x = -11.14 * Math.pow(percent, 3) + 16.39 * Math.pow(percent, 2) - 2.45 * percent + start.x + 0.45;
            y = 25.86 * Math.pow(percent, 3) - 60.63 * Math.pow(percent, 2) + 42.17 * percent + start.y - 7.05;
        } else {
            x = 11.75 * Math.pow(percent, 3) - 35.25 * Math.pow(percent, 2) + 36.38 * percent + start.x - 9.28;
            y = 3.08 * Math.pow(percent, 3) - 9.24 * Math.pow(percent, 2) + 3.53 * percent + start.y + 2.63;
        }
        return { x, y };
    },
    "eastDouble": (percent, start) => {
        let x, y;
        if (percent < 0.26) {
            x = 8.16 * Math.pow(percent, 3) + 3.86 * percent + start.x;
            y = -7.3 * Math.pow(percent, 3) + 6.11 * percent + start.y;
        } else if (percent < 0.5) {
            x = -7.95 * Math.pow(percent, 3) + 12.67 * Math.pow(percent, 2) + 0.54 * percent + start.x + 0.29;
            y = -9.67 * Math.pow(percent, 3) + 1.86 * Math.pow(percent, 2) + 5.62 * percent + start.y + 0.04;
        } else if (percent < 0.77) {
            x = -11.47 * Math.pow(percent, 3) + 17.98 * Math.pow(percent, 2) - 2.13 * percent + start.x + 0.74;
            y = 7.68 * Math.pow(percent, 3) - 24.35 * Math.pow(percent, 2) + 18.82 * percent + start.y - 2.17;
        } else {
            x = 12.7 * Math.pow(percent, 3) - 38.1 * Math.pow(percent, 2) + 41.25 * percent + start.x - 10.45;
            y = 9.6 * Math.pow(percent, 3) - 28.81 * Math.pow(percent, 2) + 22.27 * percent + start.y - 3.06;
        }
        return { x, y };
    },
    "eastTriple": (percent, start) => {
        let x, y;
        if (percent < 0.27) {
            x = 5.22 * Math.pow(percent, 3) + 6.22 * percent + start.x;
            y = -7.86 * Math.pow(percent, 3) + 5.69 * percent + start.y;
        } else if (percent < 0.51) {
            x = -4.97 * Math.pow(percent, 3) + 8.16 * Math.pow(percent, 2) + 4.04 * percent + start.x + 0.19;
            y = -4.48 * Math.pow(percent, 3) - 2.71 * Math.pow(percent, 2) + 6.42 * percent + start.y - 0.06;
        } else if (percent < 0.76) {
            x = -9.07 * Math.pow(percent, 3) + 14.49 * Math.pow(percent, 2) + 0.79 * percent + start.x + 0.75;
            y = 1.6 * Math.pow(percent, 3) - 12.09 * Math.pow(percent, 2) + 11.24 * percent + start.y - 0.89;
        } else {
            x = 8.63 * Math.pow(percent, 3) - 25.9 * Math.pow(percent, 2) + 31.5 * percent + start.x - 7.03;
            y = 11.75 * Math.pow(percent, 3) - 35.25 * Math.pow(percent, 2) + 28.86 * percent + start.y - 5.36;
        }
        return { x, y };
    },
    "west": (percent, start) => {
        let { x, y } = getAnimation.east(percent, start);
        x = -x + 2 * start.x;
        return { x, y };
    },
    "westDouble": (percent, start) => {
        let { x, y } = getAnimation.eastDouble(percent, start);
        x = -x + 2 * start.x;
        return { x, y };
    },
    "westTriple": (percent, start) => {
        let { x, y } = getAnimation.eastTriple(percent, start);
        x = -x + 2 * start.x;
        return { x, y };
    },
    "south": (percent, start) => {
        let x, y;
        if (percent < 0.2) {
            x = -1.22 * Math.pow(percent, 3) + 0.74 * percent + start.x;
            y = -36.76 * Math.pow(percent, 3) + 6.19 * percent + start.y;
        } if (percent < 0.71) {
            x = -0.36 * Math.pow(percent, 3) - 0.53 * Math.pow(percent, 2) + 0.85 * percent + start.x - 0.01;
            y = 19.45 * Math.pow(percent, 3) - 34.27 * Math.pow(percent, 2) + 13.16 * percent + start.y - 0.47;
        } else {
            x = 1.49 * Math.pow(percent, 3) - 4.46 * Math.pow(percent, 2) + 3.65 * percent + start.x - 0.67;
            y = -8.35 * Math.pow(percent, 3) + 25.06 * Math.pow(percent, 2) - 29.04 * percent + start.y + 9.53;
        }
        return { x, y }
    },
    "southDouble": (percent, start) => {
        let x, y;
        if (percent < 0.16) {
            x = -1.73 * Math.pow(percent, 3) + 0.94 * percent + start.x;
            y = -69.38 * Math.pow(percent, 3) + 7.77 * percent + start.y;
        } else if (percent < 0.63) {
            x = -0.59 * Math.pow(percent, 3) - 0.54 * Math.pow(percent, 2) + 1.02 * percent + start.x;
            y = 29.6 * Math.pow(percent, 3) - 46.5 * Math.pow(percent, 2) + 15.05 * percent + start.y - 0.38;
        } else {
            x = 1.46 * Math.pow(percent, 3) - 4.39 * Math.pow(percent, 2) + 3.44 * percent + start.x - 0.51;
            y = -8.18 * Math.pow(percent, 3) + 24.55 * Math.pow(percent, 2) - 29.5 * percent + start.y + 8.93;
        }
        return { x, y }
    },
    "southTriple": (percent, start) => {
        let x, y;
        if (percent < 0.13) {
            x = -2.46 * Math.pow(percent, 3) + 1.14 * percent + start.x;
            y = -111.19 * Math.pow(percent, 3) + 9.26 * percent + start.y;
        } else if (percent < 0.59) {
            x = -0.71 * Math.pow(percent, 3) - 0.67 * Math.pow(percent, 2) + 1.22 * percent + start.x;
            y = 38.79 * Math.pow(percent, 3) - 57.34 * Math.pow(percent, 2) + 16.57 * percent + start.y - 0.31;
        } else {
            x = 1.56 * Math.pow(percent, 3) - 4.68 * Math.pow(percent, 2) + 3.59 * percent + start.x - 0.46;
            y = -9.21 * Math.pow(percent, 3) + 27.63 * Math.pow(percent, 2) - 33.57 * percent + start.y + 9.55;
        }
        return { x, y }
    },
    "north": (percent, start) => {
        let { x, y } = getAnimation.south(1 - percent, start);
        y += 0.47 + 2 * 1.4;
        return { x, y };
    },
    "northDouble": (percent, start) => {
        let { x, y } = getAnimation.southDouble(1 - percent, start);
        y += 3 * 1.4;
        return { x, y };
    },
    "northTriple": (percent, start) => {
        let { x, y } = getAnimation.southTriple(1 - percent, start);
        y += 4 * 1.4;
        return { x, y };
    }
}