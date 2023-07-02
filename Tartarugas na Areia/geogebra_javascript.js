let g = ggbApplet;
let gameMap;
let turtles;

class Turtle {
    constructor(x, y, name, grounds) {
        this.name = name;
        this.grounds = grounds;
        this.x = x;
        this.y = y;
        this.polyline = [centerOf(x, y)];
    }
}

class Grass {
    constructor() {
        this.type = "Grass";
        this.available = true;
    }
}

class Sand {
    constructor() {
        this.type = "Sand";
        this.available = true;
    }
}

class Water {
    constructor() {
        this.type = "Water";
        this.available = true;
    }
}

function ggbOnInit() {
    reset();
}

function move(name, direction) {
    if (isNaN(g.getValue("ok"))) {
        let turtle = turtles[name];
        let {x, y} = turtle;
        let mapPosition = gameMap[y][x];

        if (direction === "right") x++;
        else if (direction === "left") x--;
        else if (direction === "up") y--;
        else if (direction === "down") y++;

        if (x < 0 || x > 3 || y < 0 || y > 3) return;
        if (!turtle.grounds.includes(gameMap[y][x].type)) return;
        if (gameMap[y][x].available) {
            mapPosition.available = false;
            turtle.x = x;
            turtle.y = y;
            turtle.polyline.push(centerOf(x, y));
            updatePolyline(turtle.polyline, turtle.name);
            updateTurtle(turtle);
            updateCollectibles(turtle);
            check();
        }
    }
}

function centerOf(x, y) {
    let centerX = x * 1.3 + 1.2 + 0.6;
    let centerY = y * -1.3 - 0.9 + 1;

    return `(${Math.round(centerX * 100) / 100}, ${Math.round(centerY * 100) / 100})`;
}

function updateCollectibles({ x, y }) {
    g.setVisible(`lin${y + 1}col${x + 1}`, false);
}

function updatePolyline(arr, name) {
    let points = arr.join(",");
    g.evalCommand(`Caminho${name} = PolyLine(${points})`);
}

function updateTurtle(turtle) {
    g.setValue(`x${turtle.name}`, turtle.x * 1.3 + 1.2);
    g.setValue(`y${turtle.name}`, turtle.y * -1.3 - 0.9);
}

function check() {
    if (turtles.cascadura.x === turtles.casquinha.x && turtles.cascadura.y === turtles.casquinha.y) {
        let ok = true;

        for (let row in gameMap) {
            for (let column in gameMap[row]) {
                if (gameMap[row][column].available && (row != turtles.cascadura.y || column != turtles.cascadura.x)) ok = false;
            }
        }

        g.setValue("ok", Number(ok));
        g.setValue("xCascadura", g.getValue("xCascadura") - 0.3);
        g.setValue("yCascadura", g.getValue("yCascadura") - 0.3);
        g.setValue("xCasquinha", g.getValue("xCasquinha") + 0.3);
        g.setValue("yCasquinha", g.getValue("yCasquinha") + 0.3);
    }
}

function reset() {
    turtles = {
        cascadura: new Turtle(0, 1, "Cascadura", ["Grass", "Sand"]),
        casquinha: new Turtle(3, 3, "Casquinha", ["Water", "Sand"])
    }
    gameMap = [
        [new Grass(), new Grass(), new Sand(), new Water()],
        [new Grass(), new Grass(), new Sand(), new Water()],
        [new Sand(), new Sand(), new Water(), new Water()],
        [new Grass(), new Grass(), new Sand(), new Water()]
    ];

    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            g.setVisible(`lin${y + 1}col${x + 1}`, true);
        }
    }

    updateTurtle(turtles.cascadura);
    updateTurtle(turtles.casquinha);
    updatePolyline([centerOf(0, 1), centerOf(0, 1)], "Cascadura");
    updatePolyline([centerOf(3, 3), centerOf(3, 3)], "Casquinha");
    g.setValue("ok", undefined);
}