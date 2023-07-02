let g = ggbApplet;
const WALK = {
    1: "Deslocar um metro à frente",
    2: "Deslocar dois metros à frente",
    3: "Deslocar três metros à frente",
    4: "Deslocar quatro metros à frente"
}
const BOARD = {
    facing: 1,
    position: [-4, 7.7],
    path: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 4], [2, 4], [2, 3]],
    moves: [[0, 0]],
    directions: [1, 1, 1, 1, 1, 3, 3, 2, 4, 2, 2, 2, 4],
    fullPath: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 4], [2, 4], [2, 3], [1, 3], [1, 2], [1, 1], [1, 0], [0, 0]],
    space: 3.7,
    step: 0,
    instructions: [],
    userInstructions: [
        "Girar um quarto de volta no sentido anti-horário", 
        WALK[1],
        "Girar um quarto de volta no sentido horário",
        WALK[3],
        "Girar um quarto de volta no sentido anti-horário",
        WALK[1],
    ],
    playerActions: 0,
    saveMoves: [[0, 0]],
    savePosition: [-4, 7.7]
}
let save = null;


function ggbOnInit() {
    restart(false);
    g.setVisible('bt6', 1);
    g.setValue('canPlay', false);
    saveGame();
}

function move() {
    BOARD.facing = g.getValue('Lado');
    const robot = {
        x: BOARD.position[0] * 10,
        y: BOARD.position[1] * 10,
        space: BOARD.space * 10
    }
    switch(BOARD.facing) {
        case 1: return g.setValue('positionY', moveY(robot.y, -robot.space));
        case 2: return g.setValue('positionY', moveY(robot.y, robot.space));
		case 3: return g.setValue('positionX', moveX(robot.x, robot.space));
		case 4: return g.setValue('positionX', moveX(robot.x, -robot.space));
    }
}

function moveY(coord, space) {
    const n = coord + space
    return (n >= -71 && n <= 77 ? n : coord) / 10
}

function moveX(coord, space) {
    const n = coord + space
    return (n >= -40 && n <= 71 ? n : coord) / 10
}

function paint() {
    move();
    const robot = {
        x: g.getValue('positionX'),
        y: g.getValue('positionY')
    }
    const target = [Math.abs((robot.x * 10 + 40) / 37), Math.abs((robot.y * 10 - 77) / 37)];
    if (BOARD.position[0] != robot.x) {
        // MOVEU HORIZONTAL
        if (BOARD.position[0] > robot.x) {
            g.setVisible(`h${target[1]}${target[0]}`, 1);
        } else {
            g.setVisible(`h${target[1]}${target[0] - 1}`, 1);
        }
        BOARD.position[0] = robot.x;
    } else if (BOARD.position[1] != robot.y) {
        // MOVEU VERTICAL
        if (BOARD.position[1] < robot.y) {
            g.setVisible(`v${target[0]}${target[1]}`, 1);
        } else {
            g.setVisible(`v${target[0]}${target[1] - 1}`, 1);
        }
        BOARD.position[1] = robot.y;
    } else {
        // NÃO MOVEU
        g.setValue('wrong', 1);
        setTimeout(() => g.setValue('wrong', 0), 500);
        return false;
    }
    BOARD.moves.push(target);
}

function goToPath() {
    if (BOARD.step < BOARD.path.length) {
        let facing
        const robot = {
            x: g.getValue('positionX'),
            y: g.getValue('positionY')
        }
        const target = [Math.abs((robot.x * 10 + 40) / 37), Math.abs((robot.y * 10 - 77) / 37)]
        if (BOARD.path[BOARD.step][0] > target[0]) {
            facing = 3
        } else if (BOARD.path[BOARD.step][0] < target[0]) {
            facing = 4
        } else if (BOARD.path[BOARD.step][1] > target[1]) {
            facing = 1
        } else {
            facing = 2
        }
        setTimeout(() => {
            let time = 0
            if (facing != g.getValue('Lado')) {
                time = 600
            }
            g.setValue('Lado', facing)
            setTimeout(() => {
                paint()
                BOARD.step++
                goToPath()
            }, time)
        }, 600);
    } else {
        g.setValue('canPlay', true);
        getNextInstruction();
        saveGame();
    }
}

function newGame() {
    g.setValue('newGame', 1);
    BOARD.fullPath = [[0, 0], [0, 1]]
    BOARD.directions = [1, 1]

    while (BOARD.fullPath.slice(-1)[0][0] != 0 || BOARD.fullPath.slice(-1)[0][1] != 0) {
        let lastX = BOARD.fullPath.slice(-1)[0][0]
        let lastY = BOARD.fullPath.slice(-1)[0][1]
        let previousX = BOARD.fullPath.slice(-2)[0][0]
        let previousY = BOARD.fullPath.slice(-2)[0][1]

        if (previousX == lastX) {
            if (lastY == 0) {
                lastX--
            } else if (lastX == 0) {
                if (lastY < 4) {
                    Math.floor(Math.random() * 2) ? lastX++ : lastY++
                } else {
                    lastX++
                }
            } else if (lastX == 3) {
                if (lastY != 0) {
                    lastY--
                } else {
                    lastX--
                }
            } else { // X = 1 ou X = 2
                if (lastY > previousY) { // Desceu na última rodada
                    if (lastY != 4) {
                        Math.floor(Math.random() * 2) ? lastX++ : lastY++
                    } else {
                        lastX++
                    }
                } else { // Subiu na ultima rodada
                    Math.floor(Math.random() * 2) ? lastX++ : lastY--
                }
            }
        } else { // previousY == lastY
            if (lastY == 0) {
                lastX--
            } else if (lastX == 3) {
                lastY--
            } else if (lastY == 4) {
                if (lastX != 3) {
                    Math.floor(Math.random() * 2) ? lastX++ : lastY--
                } else {
                    lastY--
                }
            } else { // Y = 1 ou Y = 2
                if (lastX > previousX) { // Moveu para a direita
                    if (lastX != 3) {
                       Math.floor(Math.random() * 2) ? lastX++ : lastY++
                    } else {
                        lastY++
                    }
                } else { // Moveu para a esquerda
                    Math.floor(Math.random() * 2) ? lastX-- : lastY++
                }
            }
        }

        let fullPathLast = BOARD.fullPath[BOARD.fullPath.length - 1];
        BOARD.fullPath.push([lastX, lastY])

        if (lastX > fullPathLast[0]) BOARD.directions.push(3);
        else if (lastX < fullPathLast[0]) BOARD.directions.push(4);
        else if (lastY > fullPathLast[1]) BOARD.directions.push(1);
        else BOARD.directions.push(2);
    }

    newInstructions();
    newPath();
    restart();
}

function newInstructions() {
    let direction = 1;
    BOARD.instructions = [];
    BOARD.fullPath.forEach((v, i) => {
        let clockwise = "Girar um quarto de volta no sentido horário"
        let counterClockwise = "Girar um quarto de volta no sentido anti-horário"

        if (i != 0 && i != BOARD.fullPath.length - 1) {
            let next = BOARD.fullPath[i + 1]
            if (v[0] != next[0]) { // Moveu no eixo x
                if (v[0] < next[0]) { // Moveu para a direita
                    if (direction != 3) {
                        if (direction == 1) {
                            BOARD.instructions.push(counterClockwise)
                        } else { // direction = 2
                            BOARD.instructions.push(clockwise)
                        }
                        direction = 3
                    } 
                } else { // v[0] < next[0], Moveu para a esquerda
                    if (direction != 4) {
                        if (direction == 1) {
                            BOARD.instructions.push(clockwise)
                        } else { // direction = 2
                            BOARD.instructions.push(counterClockwise)
                        }
                        direction = 4
                    }
                }
            } else { // MUDOU O Y
                if (v[1] < next[1]) { // Moveu para baixo
                    if (direction != 1) {
                        if (direction == 3) {
                            BOARD.instructions.push(clockwise)
                        } else { // direction == 4
                            BOARD.instructions.push(counterClockwise)
                        }
                        direction = 1
                    }
                } else { // v[1] > next[1], Moveu para cima
                    if (direction != 2) {
                        if (direction == 3) {
                            BOARD.instructions.push(counterClockwise)
                        } else { // direction == 4
                            BOARD.instructions.push(clockwise)
                        }
                        direction = 2
                    }
                }
            }
        }
        if (i != BOARD.fullPath.length - 1) {BOARD.instructions.push("Deslocar um metro à frente")}
    })
}

function newPath() {
    let lastMove = BOARD.instructions.length - 1;
    BOARD.userInstructions = [];
    BOARD.path = [];
    const addInstruction = (num) => BOARD.userInstructions.unshift(WALK[num]);

    for (let i = lastMove; i >= 0; i--) {
        if (!BOARD.instructions[i].includes("Deslocar")) {
            addInstruction(lastMove - i);
            lastMove = i - 1;
            BOARD.userInstructions.unshift(BOARD.instructions[i]);
        } else if (i === 0) {
            addInstruction(lastMove + 1);
        }
    }
}

function restart(canPlay = true) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
            g.setVisible(`h${j}${i}`, 0)
            if (j < 4) {g.setVisible(`v${i}${j}`, 0)}
        }
    }
    g.setValue('Lado', 1);
    BOARD.facing = 1;
    BOARD.moves = [[0, 0]];
    BOARD.step = 0;
    BOARD.position = [-4, 7.7];
    BOARD.playerActions = 0;
    g.setValue('positionX', -4);
    g.setValue('positionY', 7.7);
    g.setValue('canPlay', canPlay);
    g.setValue('ok', undefined);
    getNextInstruction();
    /* if (goTo) {
        g.setVisible('bt6', 0);
        setTimeout(() => goToPath(), 1000);
    } else  */saveGame();
}

function checkPoint() {
    if (save) {
        g.setXML(save);
        BOARD.moves = [...BOARD.saveMoves];
        BOARD.position = [...BOARD.savePosition];
/*         if (BOARD.path.length > BOARD.moves.length) restart(); */
    }
}

function rotate(direction) {
    switch(direction) {
        case "left":
            BOARD.facing = 3;
            break;
        case "right":
            BOARD.facing = 4;
            break;
        case "up": 
            BOARD.facing = 2;
            break;
        case "down":
            BOARD.facing = 1;
            break;
    }

    g.setValue("Lado", BOARD.facing);
}

function check() {

    if (BOARD.moves.length >= BOARD.fullPath.length) {
        let isOk = true;

        for (let i in BOARD.moves) {
            if (BOARD.fullPath[i][0] !== BOARD.moves[i][0] || BOARD.fullPath[i][1] !== BOARD.moves[i][1]) {
                isOk = false;
            }
        }

        return g.setValue('ok', Number(isOk))
    }

    let instruction = BOARD.userInstructions[BOARD.playerActions];
    console.log(BOARD);

    if (instruction.includes("Girar")) {
        if (BOARD.directions[BOARD.moves.length] === g.getValue("Lado")) {
            BOARD.playerActions++;
            getNextInstruction();
            saveGame();
        } else g.setValue("ok", 0);
    } else if (BOARD.directions[BOARD.moves.length - 1] !== BOARD.directions[BOARD.moves.length]) {
        let isOk = true;

        for (let i in BOARD.moves) {
            if (BOARD.fullPath[i][0] !== BOARD.moves[i][0] || BOARD.fullPath[i][1] !== BOARD.moves[i][1]) {
                isOk = false;
            }
        }

        if (!isOk) g.setValue("ok", 0);
        else {
            BOARD.playerActions++;
            getNextInstruction();
            saveGame();
        }
    } else g.setValue("ok", 0);
}

function getNextInstruction() {
    let instruction = BOARD.userInstructions[BOARD.playerActions];
    if (instruction) {
        g.setTextValue(instruction.includes("Girar") && "instructionGirar" || "instructionDeslocar", `${BOARD.playerActions + 1}) ${instruction};`);
        g.setValue("gameAction", instruction.includes("Girar") && 1 || 2);
    }
}

function saveGame() {
    save = g.getXML();
    BOARD.savePosition = [...BOARD.position];
    BOARD.saveMoves = [...BOARD.moves];
/*     console.log("Salvo"); */
}