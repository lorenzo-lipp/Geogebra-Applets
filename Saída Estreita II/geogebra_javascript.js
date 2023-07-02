/* Sequência(Segmento((-2.5, k), (10.5, k)), k, -6, 0.5, size) */
/* Sequência(Segmento((k, -6), (k, 0.5)), k, -2.5, 10.5, size) */
/* {Segmento((-2.5, -6), (-2.5, 0.5)), Segmento((-2.5, 0.5), (8, 0.5)), Segmento((-2.5, -6), (10.5, -6)), Segmento((8, 0.5), (8, -3)), Segmento((8, -4.5), (8, -6)), Segmento((10.5, -6), (10.5, -2)), Segmento((10, -2), (10.5, -2)), Segmento((8.5, -2), (9, -2))} */

let g = ggbApplet;
let game = {
    selected: "",
    start: { x: -2.5, y: 0.5 },
    width: 26,
    height: 13,
    size: 0.5,
    canPlay: true
}
game.end = {
    x: game.start.x + game.width * game.size,
    y: game.start.y - game.height * game.size
}

function ggbOnInit() { 
    softRestart();
    g.registerClientListener(selectListener);
}

function selectListener(e) {
    if (e.type === "select") setTimeout(() => g.evalCommand("SelectObjects()"), 10);
}

function move(direction) {
    if (!game.selected) return;
    let internalPoints = getPoints(game.selected);

    for (let point of internalPoints) {
        if (colide(point, direction)) return;
    }

    if (direction === "right") game.shapes[game.selected].position.x += 1;
    else if (direction === "left") game.shapes[game.selected].position.x -= 1;
    else if (direction === "up") game.shapes[game.selected].position.y -= 1;
    else game.shapes[game.selected].position.y += 1;

    updatePositions();
    check();

    return true;
}

function colide(oldPosition, direction) {
    let xWall = game.start.x + (game.width - 5) * game.size;
    let yWall = game.start.y - (game.height - 8) * game.size;
    let newPosition = { ...oldPosition };

    if (direction === "right") newPosition.x += game.size / 2;
    else if (direction === "left") newPosition.x -= game.size / 2;
    else if (direction === "up") {
        newPosition.y += game.size / 2;
        if (isInPosition("Forma3", 19, 4)) return true;
        if (isInPosition("Forma4", 19, 6)) return true;
    } else {
        newPosition.y -= game.size / 2;
        if (isInPosition("Forma3", 19, 7)) return true;
        if (isInPosition("Forma4", 21, 7)) return true;
    }

    if (newPosition.y > game.start.y - game.size / 2 || newPosition.y < game.end.y + game.size / 2) return true;
    if (newPosition.x < game.start.x + game.size / 2) return true;
    if (newPosition.x >= game.start.x + 26 * game.size) return true;
    if (newPosition.x === xWall && (newPosition.y >= game.start.y - 7 * game.size || newPosition.y <= game.end.y + 3 * game.size)) return true;
    if (newPosition.y === yWall && ((newPosition.x >= game.start.x + 21 * game.size && newPosition.x <= game.start.x + 22 * game.size) || newPosition.x >= game.start.x + 25 * game.size)) return true;
    
    return false;
}

function isInPosition(shape, x, y) {
    return game.selected === shape && game.shapes[shape].position.y === y && game.shapes[shape].position.x === x;
}

function getPoints(shape) {
    let position = game.shapes[shape].position;
    let offsetX = position.x * game.size + game.start.x;
    let offsetY = position.y * -game.size + game.start.y;
    let points = [...game.shapes[shape].points];
    return points.map(({x, y}) => ({ x: x + offsetX, y: y + offsetY }));
}

function updatePositions() {
    for (let shape of Object.keys(game.shapes)) {
        let { x, y } = game.shapes[shape].position;
        g.setValue(shape + "x", x * game.size + game.start.x)
        g.setValue(shape + "y", y * -game.size + game.start.y)
    }
}

function resetPositions() {
    for (let shape of Object.keys(game.shapes)) game.shapes[shape].position = {...game.shapes[shape].start};
}

function updateVisibility() {
    for (let shape of Object.keys(game.shapes)) g.setVisible(shape + "Fig", game.shapes[shape].visible);
}

function hideShapes(except) {
    for (let shape of Object.keys(game.shapes)) {
        if (shape !== except) g.setVisible(shape + "Fig", false);
    }
}

function softRestart() {
    resetPositions();
    updatePositions();
    updateVisibility();
}

function check() {
    if (!game.selected) return;
    let position = game.shapes[game.selected].position;
    let offsetX = position.x * game.size + game.start.x;
    let offsetY = position.y * -game.size + game.start.y;
    let points = game.shapes[game.selected].points;
    let minX = points[0].x + offsetX;
    let minY = points[0].y + offsetY;

    points.forEach(p => {
        if (p.x + offsetX < minX) minX = p.x + offsetX;
        if (p.y + offsetY < minY) minY = p.y + offsetY;
    });

    if (minX > game.start.x + (game.width - 5) * game.size && minY > game.start.y - (game.height - 8) * game.size) {
        game.shapes[game.selected].visible = false;
        game.canPlay = false;
        setTimeout(() => g.setVisible(game.selected + "Fig", false), 150);
        setTimeout(() => g.setVisible(game.selected + "Fig", true), 300);
        setTimeout(() => g.setVisible(game.selected + "Fig", false), 450);
        setTimeout(() => g.setVisible(game.selected + "Fig", true), 600);
        setTimeout(() => {
            game.canPlay = true;
            select(game.selected);
            let shapes = Object.keys(game.shapes);
            let notVisibleCount = 0;
            for (let shape of shapes) {
                if (!game.shapes[shape].visible) notVisibleCount++;
            }
            if (notVisibleCount === 2) {
                game.canPlay = false;
                g.setValue("ok", 1);
            }
        }, 750);
    }
}

function select(shape) {
    if (!game.canPlay) return;
    if (game.selected === shape) {
        game.selected = "";
        softRestart();
    } else {
        game.selected = shape;
        hideShapes(shape);
    }
    g.setTextValue("selected", game.selected);
}

function midPoint(a, b) { 
    return { x: a[0] + (b[0] - a[0]) / 2, y: a[1] + (b[1] - a[1]) / 2 } 
}

game.shapes = {
    "Forma1": {
        start: { x: 16 , y: 1 },
        position: { x: 16 , y: 1 },
        points: [
            midPoint([game.size, 0], [game.size, -game.size]),
            midPoint([2 * game.size, 0], [2 * game.size, -game.size]),
            midPoint([3 * game.size, -game.size], [3 * game.size, 2 * -game.size]),
            midPoint([3 * game.size, 2 * -game.size], [3 * game.size, 3 * -game.size]),
            midPoint([2 * game.size, 2 * -game.size], [2 * game.size, 3 * -game.size]),
            midPoint([3 * game.size, 2 * -game.size], [4 * game.size, 2 * -game.size]),
            midPoint([3 * game.size, 3 * -game.size], [4 * game.size, 3 * -game.size]),
            midPoint([game.size, 2 * -game.size], [2 * game.size, 2 * -game.size]),
            midPoint([game.size, -game.size], [2 * game.size, -game.size]),
            midPoint([2 * game.size, -game.size], [3 * game.size, -game.size]),
            midPoint([0, 0], [game.size, -game.size]),
            midPoint([game.size, -game.size], [2 * game.size, 0]),
            midPoint([2 * game.size, -game.size], [3 * game.size, 0]),
            midPoint([3 * game.size, -game.size], [4 * game.size, 2 * -game.size]),
            midPoint([3 * game.size, 2 * -game.size], [4 * game.size, 3 * -game.size]),
            midPoint([3 * game.size, 3 * -game.size], [4 * game.size, 4 * -game.size]),
            midPoint([2 * game.size, 2 * -game.size], [3 * game.size, 3 * -game.size]),
            midPoint([game.size, 2 * -game.size], [2 * game.size, 3 * -game.size]),
            midPoint([game.size, -game.size], [2 * game.size, 2 * -game.size])
        ],
        visible: true
    },
    "Forma2": {
        start: { x: 1, y: 1 },
        position: { x: 1, y: 1 },
        points: [
            midPoint([0, -game.size], [game.size, -game.size]),
            midPoint([game.size, 2 * -game.size], [2 * game.size, 2 * -game.size]),
            midPoint([game.size, 3 * -game.size], [2 * game.size, 3 * -game.size]),
            midPoint([2 * game.size, 4 * -game.size], [3 * game.size, 4 * -game.size]),
            midPoint([3 * game.size, 2 * -game.size], [4 * game.size, 2 * -game.size]),
            midPoint([3 * game.size, 3 * -game.size], [4 * game.size, 3 * -game.size]),
            midPoint([4 * game.size, -game.size], [5 * game.size, -game.size]),
            midPoint([game.size, -game.size], [game.size, 2 * -game.size]),
            midPoint([2 * game.size, 2 * -game.size], [2 * game.size, 3 * -game.size]),
            midPoint([2 * game.size, 3 * -game.size], [2 * game.size, 4 * -game.size]),
            midPoint([3 * game.size, 2 * -game.size], [3 * game.size, 3 * -game.size]),
            midPoint([3 * game.size, 3 * -game.size], [3 * game.size, 4 * -game.size]),
            midPoint([4 * game.size, -game.size], [4 * game.size, 2 * -game.size]),
            midPoint([0, 0], [game.size, -game.size]),
            midPoint([game.size, -game.size], [2 * game.size, 2 * -game.size]),
            midPoint([0, -game.size], [game.size, 2 * -game.size]),
            midPoint([game.size, 2 * -game.size], [2 * game.size, 3 * -game.size]),
            midPoint([game.size, 3 * -game.size], [2 * game.size, 4 * -game.size]),
            midPoint([2 * game.size, 2 * -game.size], [3 * game.size, 3 * -game.size]),
            midPoint([2 * game.size, 4 * -game.size], [3 * game.size, 5 * -game.size]),
            midPoint([3 * game.size, -game.size], [4 * game.size, 2 * -game.size]),
            midPoint([3 * game.size, 2 * -game.size], [4 * game.size, 3 * -game.size]),
            midPoint([3 * game.size, 3 * -game.size], [4 * game.size, 4 * -game.size]),
            midPoint([4 * game.size, 0], [5 * game.size, -game.size]),
            midPoint([4 * game.size, -game.size], [5 * game.size, 2 * -game.size])
        ],
        visible: true
    },
    "Forma3": {
        start: { x: 17, y: 8 },
        position: { x: 17, y: 8 },
        points: [
            midPoint([0, -game.size], [game.size, -game.size]),
            midPoint([game.size, -game.size], [game.size, -game.size * 2]),
            midPoint([game.size, -game.size * 2], [game.size * 2, -game.size * 2]),
            midPoint([0, -game.size], [0, -game.size * 2]),
            midPoint([0, -game.size * 2], [-game.size, -game.size * 2]),
            midPoint([0, 0], [game.size, -game.size]),
            midPoint([0, -game.size], [game.size, -game.size * 2]),
            midPoint([game.size, -game.size], [game.size * 2, -game.size * 2]),
            midPoint([-game.size, -game.size], [0, -game.size * 2]),
            midPoint([game.size, -game.size * 2], [game.size * 2, -game.size * 3]),
            midPoint([-game.size, -game.size * 2], [0, -game.size * 3]),
            midPoint([0, -game.size * 3], [game.size, -game.size * 4]),
            midPoint([game.size * 2, -game.size * 3], [game.size * 3, -game.size * 4]),
            midPoint([game.size, -game.size * 2], [game.size, -game.size * 3])
        ],
        visible: true
    },
    "Forma4": {
        start: { x: 2, y: 8 },
        position: { x: 2, y: 8 },
        points: [
            midPoint([0, -game.size], [0, 2 * -game.size]),
            midPoint([game.size, -game.size], [game.size, 2 * -game.size]),
            midPoint([game.size, 2 * -game.size], [game.size, 3 * -game.size]),
            midPoint([2 * game.size, 2 * -game.size], [2 * game.size, 3 * -game.size]),
            midPoint([0, -game.size], [game.size, -game.size]),
            midPoint([0, 2 * -game.size], [game.size, 2 * -game.size]),
            midPoint([game.size, 2 * -game.size], [2 * game.size, 2 * -game.size]),
            midPoint([game.size, 3 * -game.size], [2 * game.size, 3 * -game.size]),
            midPoint([0, 0], [game.size, -game.size]),
            midPoint([2 * game.size, 0], [3 * game.size, -game.size]),
            midPoint([-game.size, -game.size], [0, 2 * -game.size]),
            midPoint([game.size, -game.size], [2 * game.size, 2 * -game.size]),
            midPoint([0, 2 * -game.size], [game.size, 3 * -game.size]),
            midPoint([2 * game.size, 2 * -game.size], [3 * game.size, 3 * -game.size]),
            midPoint([-game.size, 3 * -game.size], [0, 4 * -game.size]),
            midPoint([game.size, 3 * -game.size], [2 * game.size, 4 * -game.size])
        ],
        visible: true
    },
    "Forma5": {
        start: { x: 10, y: 1 },
        position: { x: 10, y: 1 },
        points: [
            midPoint([game.size, -game.size * 2], [game.size * 2, -game.size * 2]),
            midPoint([game.size, -game.size * 3], [game.size * 2, -game.size * 3]),
            midPoint([0, -game.size * 2], [-game.size, -game.size * 2]),
            midPoint([0, -game.size * 3], [-game.size, -game.size * 3]),
            midPoint([game.size * 2, -game.size * 2], [game.size * 2, -game.size * 3]),
            midPoint([-game.size, -game.size * 2], [-game.size, -game.size * 3]),
            midPoint([0, 0], [game.size, -game.size]),
            midPoint([game.size, -game.size], [game.size * 2, -game.size * 2]),
            midPoint([game.size * 2, -game.size * 2], [game.size * 3, -game.size * 3]),
            midPoint([game.size, -game.size * 3], [game.size * 2, -game.size * 4]),
            midPoint([0, -game.size * 4], [game.size, -game.size * 5]),
            midPoint([-game.size, -game.size * 3], [0, -game.size * 4]),
            midPoint([-game.size * 2, -game.size * 2], [-game.size, -game.size * 3]),
            midPoint([-game.size, -game.size], [0, -game.size * 2]),
            midPoint([game.size, -game.size], [game.size, -game.size * 2]),
            midPoint([game.size, -game.size * 3], [game.size, -game.size * 4])
        ],
        visible: true
    },
    "Forma6": {
        start: { x: 9, y: 8 },
        position: { x: 9, y: 8 },
        points: [
            midPoint([0, -game.size], [game.size, -game.size]),
            midPoint([0, 2 * -game.size], [game.size, 2 * -game.size]),
            midPoint([game.size, 3 * -game.size], [2 * game.size, 3 * -game.size]),
            midPoint([2 * game.size, -game.size], [3 * game.size, -game.size]),
            midPoint([2 * game.size, 2 * -game.size], [3 * game.size, 2 * -game.size]),
            midPoint([0, -game.size], [0, 2 * -game.size]),
            midPoint([game.size, -game.size], [game.size, 2 * -game.size]),
            midPoint([game.size, 2 * -game.size], [game.size, 3 * -game.size]),
            midPoint([2 * game.size, -game.size], [2 * game.size, 2 * -game.size]),
            midPoint([2 * game.size, 2 * -game.size], [2 * game.size, 3 * -game.size]),
            midPoint([3 * game.size, 2 * -game.size], [3 * game.size, 3 * -game.size]),
            midPoint([0, 0], [game.size, -game.size]),
            midPoint([game.size, -game.size], [2 * game.size, 2 * -game.size]),
            midPoint([2 * game.size, 0], [3 * game.size, -game.size]),
            midPoint([2 * game.size, -game.size], [3 * game.size, 2 * -game.size]),
            midPoint([2 * game.size, 2 * -game.size], [3 * game.size, 3 * -game.size]),
            midPoint([3 * game.size, 2 * -game.size], [4 * game.size, 3 * -game.size]),
            midPoint([game.size, 3 * -game.size], [2 * game.size, 4 * -game.size]),
            midPoint([0, 2 * -game.size], [game.size, 3 * -game.size]),
            midPoint([-game.size, -game.size], [0, 2 * -game.size])
        ],
        visible: true
    }
}