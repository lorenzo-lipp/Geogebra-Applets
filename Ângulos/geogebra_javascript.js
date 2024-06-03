let {
    getValue,
    getXcoord,
    getYcoord,
    setColor,
    setFixed,
    setPointSize,
    setTextValue,
    setValue,
    setCoords
} = ggbApplet;

let game = {
    initialAngle: 0,
    desiredAngle: 90,
    direction: "left",
    phase: 0,
    counter: 0
};

function ggbOnInit() {}

function getDrawnAngle() { return Math.round(getValue("finalAngle") * 180 / Math.PI); }
function getWrittenAngle() { return getValue("answer"); }

function fixPoint(p) {
    setPointSize(p, 3);
    setColor(p, 255, 127, 0);
    setFixed(p, 0, 0);
}

function releasePoint(p) {
    setPointSize(p, 5);
    setColor(p, 0, 153, 255);
    setFixed(p, 0, 1);
}

function setDirection(dir) {
    game.direction = dir;
    setTextValue("direction", dir);
}

function setPhase(ph) {
    game.phase = ph;
    setValue("phase", ph);
}

function isCorrect() {
    if (game.phase) {
        return getWrittenAngle() === game.desiredAngle;
    } else {
        return getDrawnAngle() === game.desiredAngle;
    }
}

function setInitialAngle(ang) {
    game.initialAngle = ang;
    setValue("initialAngle", ang);
}

function rotatePoint(point, anchorPoint, ang) {
    setCoords(point.name, 
        Math.cos(ang) * (point.x - anchorPoint.x) - Math.sin(ang) * (point.y - anchorPoint.y) + anchorPoint.x,
        Math.sin(ang) * (point.x - anchorPoint.x) + Math.cos(ang) * (point.y - anchorPoint.y) + anchorPoint.y
    );
}

function updateInstructions(ang) {
    setTextValue("texto4", `Mova o ponto azul para formar um ângulo de ${ang}º`);
}

function newGame() {
    if (game.counter < 5) {
        game.desiredAngle = Math.floor(Math.random() * 18 + 1) * 10;
    } else {
        game.desiredAngle = Math.floor(Math.random() * 180) + 1;
    }

    if (game.counter < 2) {
        setInitialAngle(0);
    } else {
        setInitialAngle(Math.floor(Math.random() * (180 - game.desiredAngle)));
    }

    setDirection(Math.random() > 0.5 ? "right" : "left");
    setPhase(Math.random() > 0.5 ? 1 : 0);

    let startPoint = game.direction === "left" ? "B" : "C";

    if (game.phase) {
        let rotationAngle = (game.direction === "left" ? -1 : 1) * game.desiredAngle * Math.PI / 180;

        fixPoint("D");
        setValue("answer", 0);
        rotatePoint(new Point(getXcoord(startPoint), getYcoord(startPoint), "D"), ORIGIN, rotationAngle);
    } else {
        let rotationAngle = (game.direction === "left" ? -1 : 1) * Math.floor(Math.random() * (180 - game.desiredAngle)) * Math.PI / 180;

        releasePoint("D");
        rotatePoint(new Point(getXcoord(startPoint), getYcoord(startPoint), "D"), ORIGIN, rotationAngle);
        updateInstructions(game.desiredAngle);
    }

    game.counter++;
    restart();
}

function check() { setValue("ok", Number(isCorrect())); }
function restart() { setValue("ok", undefined); }

class Point {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
    }
}

const ORIGIN = new Point(0, 0, "Origin");