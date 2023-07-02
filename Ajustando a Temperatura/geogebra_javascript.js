let g = ggbApplet;
let images = {
    "curveUpLeft": "58324ecf12f2f46255c1dc2e5fae7282/001.png",
    "curveUpRight": "b1738813d928c001f27c471a60cfc622/002.png",
    "tRight": "bd0f36ff35b746539654c606e8ea527c/003.png",
    "tLeft": "a0bf802767072aed7d1c7b66558b7a0c/004.png",
    "vertical": "1919440fc0cf5e92015f166ae1400bbd/005.png",
    "curveDownRight": "7b748a326550a3e164b927c725da55f7/006.png",
    "curveDownLeft": "a88974c681ef4cb243c68f1e8041f904/007.png",
    "tDown": "adba988afb0f3a5bab927197fd2cd561/008.png",
    "tUp": "03faea522744c456a4219335156d1b55/009.png",
    "horizontal": "346131746c21d05ba170ac883831205b/010.png",
    "blank": "2aa03bc8c40021e8b16f9f39960cd189/011.png",
    "curveUpLeftPainted": "8a5b0d5da044cf4265672eb2f2f21417/012.png",
    "curveUpRightPainted": "1e0bb0103a9f666db69836f1cab1a62d/013.png",
    "tRightPainted-upright": "c99b3ba387b342dbdbce42d0e8de71a3/014.png",
    "tLeftPainted-updown": "9cfbeb8fce3502c03dd510c66f3a65b4/015.png",
    "verticalPainted": "b29478e265c5bd0720860ee75dd520ff/016.png",
    "curveDownRightPainted": "4c4a3facf6de33b9db161a90a02437fa/017.png",
    "curveDownLeftPainted": "66d09c05ee52157087c5c1a0b09e5233/018.png",
    "tDownPainted-rightleft": "f18c8f4600d911eb4f1d57d0496ae05c/019.png",
    "tUpPainted-rightleft": "22ca3e59bd1b2dba46ac77d48dbf644a/020.png",
    "horizontalPainted": "9e85f53fa36c400d6f317763ab657cda/021.png",
    "tRightPainted-rightdown": "f77367119f0c90ab6195f633018134bc/022.png",
    "tRightPainted-updown": "7fcac41b292d1c12745076d8bdbddb68/023.png",
    "tUpPainted-upleft": "16ebcb37855052fc91101532cd08ae3e/024.png",
    "tUpPainted-upright": "72e4c68e44b9c7d923fb784bb0719fb9/025.png",
    "tDownPainted-rightdown": "238c98c4d06e92ab2ee038ea60a876c3/026.png",
    "tDownPainted-leftdown": "0c719a9d44762b90a12b14a98b6f1a11/027.png",
    "tLeftPainted-upleft": "8fd8c1278aba43d68ffd99e4f4847113/028.png",
    "tLeftPainted-leftdown": "1f73d0d593df23dd08f01c28560e48c9/029.png",
    "completeDown": "3e9426b1f49d5f647dcb2455206120fe/030.png",
    "completeUp": "02f8e0e1b3d9f53cc3f63013d478a635/031.png",
    "completeLeft": "f38941256b841671c8abd824c9973095/032.png",
    "completeRight": "52dd7c30427ade202955457b2f8b664c/033.png",
    "tRight-objective": "9da6eb607ecde4729f7db6ee8c117745/034.png",
    "curveUpLeft-objective": "8e944ce8fde2f67c71e350b35166aae9/035.png",
    "horizontal-objective": "bb3311ab5e6819b556380500915ca47d/036.png",
    "tUp-objective": "f0abf01da066b6110f3de79b945813b5/037.png",
    "tDown-objective": "dccc0d0c25c8044a0a091be09f06464a/038.png",
    "curveDownLeft-objective": "ba0d8efa1557d2a28d8ac4d6e1688a5f/039.png",
    "curveDownRight-objective": "c2e64fdfbca69991349c7f143b42a81b/040.png",
    "vertical-objective": "a15d5bce5e47b68e20c309dfeb092f70/041.png",
    "tLeft-objective": "e355e9e73e3f205925d93814e1edfa5c/042.png",
    "curveUpRight-objective": "510ba2f706060c04882210bcf8b6bf60/043.png"
}
let pipes = [
    {
        pipe: "curveUpLeft",
        up: true, 
        down: false,
        left: true,
        right: false
    },
    {
        pipe: "curveUpRight",
        up: true,
        down: false,
        left: false,
        right: true
    },
    {
        pipe: "tRight",
        up: true,
        down: true,
        left: false,
        right: true
    },
    {
        pipe: "tLeft",
        up: true,
        down: true,
        left: true,
        right: false
    },
    {
        pipe: "vertical",
        up: true,
        down: true,
        left: false,
        right: false
    },
    {
        pipe: "curveDownRight",
        up: false,
        down: true,
        left: false,
        right: true
    },
    {
        pipe: "curveDownLeft",
        up: false,
        down: true,
        left: true,
        right: false
    },
    {
        pipe: "tDown",
        up: false,
        down: true,
        left: true,
        right: true
    },
    {
        pipe: "tUp",
        up: true,
        down: false,
        left: true,
        right: true
    },
    {
        pipe: "horizontal",
        up: false,
        down: false,
        left: true,
        right: true
    },
    {
        pipe: "blank",
        up: false,
        down: false,
        left: false,
        right: false
    }
]
let gameColumns = 9;
let ratPosition, gameLoaded, lastDirection, passedBy, objectives, startColumn, lastTimeout;

function ggbOnInit() {
    gameLoaded = [
        ['blank', 'blank', 'vertical', 'blank', 'curveDownRight', 'horizontal', 'horizontal', 'horizontal', 'curveDownLeft'],
        ['blank', 'blank', 'vertical', 'blank', 'vertical', 'curveDownRight', 'horizontal', 'tDown', 'tLeft'],
        ['curveDownRight', 'horizontal', 'curveUpLeft', 'blank', 'curveUpRight', 'tLeft', 'blank', 'vertical', 'vertical'],
        ['tRight', 'horizontal', 'horizontal', 'horizontal', 'horizontal', 'tUp', 'horizontal', 'curveUpLeft', 'vertical'],
        ['vertical', 'blank', 'blank', 'blank', 'blank', 'curveDownRight', 'horizontal', 'horizontal', 'tLeft'],
        ['tRight', 'horizontal', 'horizontal', 'curveDownLeft', 'curveDownRight', 'tUp', 'tDown', 'horizontal', 'tLeft'],
        ['vertical', 'blank', 'blank', 'vertical', 'vertical', 'curveDownRight', 'curveUpLeft', 'blank', 'vertical'],
        ['tRight', 'curveDownLeft', 'blank', 'curveUpRight', 'curveUpLeft', 'curveUpRight', 'tDown', 'horizontal', 'tLeft'],
        ['vertical', 'curveUpRight', 'curveDownLeft', 'blank', 'blank', 'blank', 'vertical', 'blank', 'vertical'],
        ['curveUpRight', 'horizontal', 'tUp', 'horizontal', 'horizontal', 'horizontal', 'curveUpLeft', 'blank', 'vertical']
    ];
    objectives = ['R0C7', 'R1C5', 'R6C5', 'R8C0'];
    startColumn = 2;
    restart();
}

function constructGame(game) {
    for (let i = 0; i < game.length; i++) {
        for (let j = 0; j < gameColumns; j++) {
            geogebraPaint(i, j, images[game[i][j]]);
        }
    }
}

function newGame() {
    let game;
    let row = 0;
    startColumn = Math.floor(Math.random() * 9);
    let column = startColumn;
    let direction = "down";
    
    do {
        game = blankGame();
        connect(game, {
            row,
            column,
            startColumn,
            direction
        })
    } while(!countExitPipes(game[game.length - 1]));

    gameLoaded = game;
    updateObjectives({ row, column, direction })
    restart();
}

function updateObjectives({ row, column, direction }) {
    let paths = getAllPaths(gameLoaded, { row, column, direction });
    let [randomOne, randomTwo] = [pickRandom(paths), pickRandom(paths)];
    randomOne = Array.from(randomOne).slice(2, -1);
    let size = randomOne.length;
    if (size >= 8) objectives = [randomOne[Math.floor(size / 4 - 2)], randomOne[Math.floor(2 * size / 4)], randomOne[Math.floor(3 * size / 4)], randomOne[Math.floor(4 * size / 4) - 2]];
    else objectives = Array.from(randomTwo).sort(() => 0.5 - Math.random()).slice(0, 4);
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function reverse(direction) {
    switch(direction) {
        case "up": return "down";
        case "down": return "up";
        case "right": return "left";
        case "left": return "right";
    }
}

function connect(game, gameProperties) {
    let savedStates = [];
    let { row, column, startColumn, direction } = gameProperties;
    let maxExitPipes = Math.floor(Math.random() * 2) + 1;

    while(true) {
        if (row === game.length || row < 0 || game[row][column] !== 'blank') {
            break;
        }

        let availablePipes = pipes.filter((v) => v[reverse(direction)]);
        let neighborPipes = {
            up: (game[row - 1] && pipes.find(v => v.pipe === game[row - 1][column])) || pipes.find(v => v.pipe === "blank"),
            down: (game[row + 1] && pipes.find(v => v.pipe === game[row + 1][column])) || pipes.find(v => v.pipe === "blank"),
            left: (game[row][column - 1] && pipes.find(v => v.pipe === game[row][column - 1])) || pipes.find(v => v.pipe === "blank"),
            right: (game[row][column + 1] && pipes.find(v => v.pipe === game[row][column + 1])) || pipes.find(v => v.pipe === "blank")
        }
        
        if (column === game[0].length - 1) availablePipes = availablePipes.filter((v) => !v.right); // Se estiver na última coluna
        if (column === 0) availablePipes = availablePipes.filter((v) => !v.left); // Se estiver na primeira coluna
        if (row === 0 && startColumn !== column) availablePipes = availablePipes.filter((v) => !v.up); // Se estiver na primeira linha
        if (row === game.length - 1 && countExitPipes(game[row]) >= maxExitPipes) availablePipes = availablePipes.filter((v) => !v.down); // Se estiver na última linha e já houver 3 saídas

        
        if (neighborPipes.left.right) availablePipes = availablePipes.filter((v) => v.left); // Se o cano a esquerda se liga com esse
        else if (neighborPipes.left.pipe !== "blank") availablePipes = availablePipes.filter((v) => !v.left);
        if (neighborPipes.right.left) availablePipes = availablePipes.filter((v) => v.right); // Se o cano a direita se liga com esse
        else if (neighborPipes.right.pipe !== "blank") availablePipes = availablePipes.filter((v) => !v.right);
        if (neighborPipes.up.down) availablePipes = availablePipes.filter((v) => v.up); // Se o cano de cima se liga com esse
        else if (neighborPipes.up.pipe !== "blank") availablePipes = availablePipes.filter((v) => !v.up);
        if (neighborPipes.down.up) availablePipes = availablePipes.filter((v) => v.down); // Se o cano de baixo se liga com esse
        else if (neighborPipes.down.pipe !== "blank") availablePipes = availablePipes.filter((v) => !v.down);
        
        let randomPipe = pickRandom(availablePipes);
        if (!randomPipe) {
            game[row][column] = completePiece(direction);
            break;
        }
        game[row][column] = randomPipe.pipe;
        let nextDirections = getDirections(randomPipe, direction);

        for (let i = 1; i < nextDirections.length; i++) {
            let { row: nextRow, column: nextColumn } = getNextPosition({ row, column, direction: nextDirections[i] });
            
            savedStates.push({
                row: nextRow,
                column: nextColumn,
                direction: nextDirections[i],
                startColumn: startColumn
            });
        }

        direction = nextDirections[0];
        ({ row, column } = getNextPosition({ row, column, direction }));
    }
    
    for (let state of savedStates) {
        connect(game, state);
    }
}

function blankGame() {
    let arr = new Array(10).fill(new Array(gameColumns).fill('blank'));
    return JSON.parse(JSON.stringify(arr));
}

function getDirections(pipe, direction) {
    let directions = [];

    for (let key of Object.keys(pipe)) {
        if (pipe[key] && key !== reverse(direction) && key !== "pipe") directions.push(key);
    }

    return directions;
}

function getNextPosition(position) {
    let { row, column, direction } = position;
    if (direction === "right") column++;
    if (direction === "left") column--;
    if (direction === "up") row--;
    if (direction === "down") row++;
    return { row, column, direction };
}

function countExitPipes(arr, shouldUpdateText = false) {
    let exitPipes = 0;

    for (let i in arr) {
        let pipe = pipes.find(v => v.pipe === arr[i]);
        if (pipe && pipe.down) {
            exitPipes++;
            if (shouldUpdateText) updateText(i, exitPipes, true);
        }
    }

    if (shouldUpdateText && exitPipes < 2) updateText(0, 2, false);
    return exitPipes;
}

function completePiece(direction) {
    switch(direction) {
        case "up": return "completeUp";
        case "down": return "completeDown";
        case "left": return "completeLeft";
        case "right": return "completeRight";
    }
}

function getAllPaths(game, start) {
    let pathCollection = [];
    emulateMove(game, start, pathCollection);
    return pathCollection;
}

function emulateMove(game, position, pathCollection, path = new Set()) {
    let { row, column, direction } = position;
    let encodedPosition = `R${row}C${column}`;

    if (pathCollection.length > 50) return; 
    if (row === game.length) return pathCollection.push(path);

    let pipe = pipes.find(v => v.pipe === game[row][column]);
    if (!pipe) return;

    let nextDirections = getDirections(pipe, direction);

    if (nextDirections.length === 1) return emulateMove(game, getNextPosition({ row, column, direction: nextDirections[0] }), pathCollection, path.add(encodedPosition));

    for (let i in nextDirections) {
        const nextDirection = nextDirections[i];
        if (!path.has(encodedPosition)) {
            let newPath = new Set(path);
            emulateMove(game, getNextPosition({ row, column, direction: nextDirection }), pathCollection, newPath.add(encodedPosition));
        }
    }
}

function animate(direction) {
    if (canGo(direction)) {
        paintPipe({ row: ratPosition.row, column: ratPosition.column, direction });
        move(ratPosition.column + 0.5, 8.5 - ratPosition.row, direction);
        if (direction === "up") ratPosition.row--;
        if (direction === "down") ratPosition.row++;
        if (direction === "right") ratPosition.column++;
        if (direction === "left") ratPosition.column--;
        showButtons();
    }
}

function canGo(direction) {
    let { row, column}  = ratPosition;
    if (direction === "up") row--;
    if (direction === "down") row++;
    if (direction === "right") column++;
    if (direction === "left") column--;
    let encodedPosition = `R${row}C${column}`;
    if (passedBy.includes(encodedPosition) || row === -1) return false;

    let pipe = (ratPosition.row in gameLoaded && pipes.find(v => v.pipe === gameLoaded[ratPosition.row][ratPosition.column])) || pipes.find(v => v.pipe === "blank");
    return (ratPosition.row === -1 && direction === "down") || pipe[direction];
}

function move(x, y, direction, i = 1) {
    if (i < 6) {
        let endX = x, endY = y;
        if (direction === "up") endY++;
        if (direction === "down") endY--;
        if (direction === "right") endX++;
        if (direction === "left") endX--;
        if (endY === -1.5 && i === 1) check();
        let stepX = (endX - x) / 5;
        let stepY = (endY - y) / 5;

        setRatPosition(x + stepX * i, y + stepY * i);
        clearTimeout(lastTimeout);
        lastTimeout = setTimeout(() => {
            move(x, y, direction, ++i);
        }, 50);
    }
}

function setRatPosition(x, y) {
    g.evalXML(`
        <element type="image" label="fig34">
            <file name="4555aa29267ec5fe3e8f9262c0eb9bbe/044.png"/>
            <inBackground val="false"/>
            <startPoint number="0" x="${x - 0.65}" y="${y - 0.8}" z="1"/>
            <startPoint number="1" x="${x - 0.65 + 1}" y="${y - 0.8}" z="1"/>
            <show object="true" label="false"/>
            <objColor r="0" g="0" b="0" alpha="1"/>
            <layer val="2"/>
            <labelMode val="0"/>
            <animation step="1" speed="1" type="0" playing="false"/>
            <selectionAllowed val="false"/>
        </element>`);
}

function check() {
    for (let objective of objectives) {
        if (!passedBy.includes(objective)) return g.setValue("ok", 0);
    }
    return g.setValue("ok", 1);
}

function showButtons() {
    let directions = ["up", "down", "left", "right"];
    for (let direction of directions) {
        if (canGo(direction)) g.setVisible("disable" + direction, 0);
        else g.setVisible("disable" + direction, 1);
    }
}

function paintPipe(position) {
    let { row, column, direction } = position;
    let encodedPosition = `R${row}C${column}`;
    if (!(row in gameLoaded)) return;
    let possibleImages = [
        gameLoaded[row][column] + "Painted", 
        gameLoaded[row][column] + "Painted-" + direction + lastDirection,
        gameLoaded[row][column] + "Painted-" + lastDirection + direction
    ];
    let imageName;
    
    lastDirection = reverse(direction);
    passedBy.push(encodedPosition);
    if (images[possibleImages[0]]) {imageName = possibleImages[0];}
    else if (images[possibleImages[1]]) {imageName = possibleImages[1];}
    else if (images[possibleImages[2]]) {imageName = possibleImages[2];}
    else {return;}

    geogebraPaint(row, column, images[imageName]);
}

function geogebraPaint(row, column, image) {
    g.evalXML(`
        <element type="image" label="img${row}${column}">
            <file name="${image}"/>
            <inBackground val="false"/>
            <startPoint number="0" x="${column}" y="${8 - row}" z="1"/>
            <startPoint number="1" x="${column + 1}" y="${8 - row}" z="1"/>
            <show object="true" label="true"/>
            <objColor r="0" g="0" b="0" alpha="1"/>
            <layer val="0"/>
            <labelMode val="0"/>
            <animation step="1" speed="1" type="0" playing="false"/>
            <selectionAllowed val="false"/>
        </element>
    `);
}

function paintObjectives() {
    for (let position of objectives) {
        let [_, row, column] = position.split(/R|C/);
        let imageName = gameLoaded[row][column] + "-objective";

        geogebraPaint((+row), (+column), images[imageName]);
    }
}

function restart() {
    g.setValue("ok", undefined);
    g.setValue("gerando", true);
    setTimeout(() => {
        passedBy = [];
        lastDirection = "up";
        constructGame(gameLoaded);
        setRatPosition(0.5 + startColumn, 9.5);
        paintObjectives();
        ratPosition = { row: -1, column: startColumn };
        showButtons();
        countExitPipes(gameLoaded[gameLoaded.length - 1], true)
        g.setValue("gerando", false);
    }, 100);
}

function updateText(column, textNum, visible) {
    g.evalXML(`
    <expression label="texto${8 + textNum - 1}" exp="&quot;Saída&quot;"/>
    <element type="text" label="texto${8 + textNum - 1}">
        <show object="${visible}" label="false" ev="8"/>
        <objColor r="0" g="0" b="0" alpha="0"/>
        <layer val="1"/>
        <labelMode val="0"/>
        <selectionAllowed val="false"/>
        <font serif="false" sizeM="0.7" size="-5" style="1"/>
        <startPoint x="${(+column) + 0.2}" y="-1.4" z="1"/>
    </element>`);
}