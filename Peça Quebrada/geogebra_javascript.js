let { getXcoord, getYcoord, setCoords, getValue, setValue, reset } = ggbApplet;

let game = {
    polygons: [
        ["C", "O", "P", "D"],
        ["E", "M", "N", "F"],
        ["G", "L", "Q", "H"],
        ["I", "K", "J"]
    ],
    angles: {
        J: 55, 
        I: 55,
        K: 70,
        E: 125,
        F: 55,
        M: 55,
        N: 125,
        P: 90,
        O: 90,
        C: 90,
        D: 90,
        G: 90,
        L: 90,
        Q: 90,
        H: 90
    },
    regions: [
        { x: 1.5, y: -2, angle: 90 }, 
        { x: 3.5, y: -2, angle: 180 }, 
        { x: 5.5, y: -2, angle: 90 }, 
        { x: 5.5, y: -0.5, angle: 145 }, 
        { x: 4.5, y: 1, angle: 125 }, 
        { x: 3.5, y: -0.5, angle: 360 }, 
        { x: 2.5, y: 1, angle: 125 }, 
        { x: 1.5, y: -0.5, angle: 145 }, 
    ],
    isAnimating: false
}

function ggbOnInit() { }

async function reflectPolygon(index) {
    if (game.isAnimating) return;
    game.isAnimating = true;

    let polygon = game.polygons[index];
    let initialCoords = [];
    let finalCoords = [];
    let anchorPoint = { x: 0 };

    for (let point of polygon) anchorPoint.x += getXcoord(point);

    anchorPoint.x /= polygon.length;

    for (let [i, point] of polygon.entries()) {
        let x = getXcoord(point);

        initialCoords[i] = x;
        finalCoords[i] = 2 * anchorPoint.x - x;
    }

    for (let percent = 0; percent <= 1; percent += 1/15) {
        for (let [i, point] of polygon.entries()) {
            setCoords(point, initialCoords[i] + (finalCoords[i] - initialCoords[i]) * percent, getYcoord(point));
        }

        await sleep(40);
    } 

    game.isAnimating = false;
}

async function rotatePolygon(index) {
    if (game.isAnimating) return;
    game.isAnimating = true;

    let polygon = game.polygons[index];
    let anchorPoint = { x: 0, y: 0 };
    let initialCoords = [];

    for (let [i, point] of polygon.entries()) {
        let x = getXcoord(point);
        let y = getYcoord(point);

        anchorPoint.x += x;
        anchorPoint.y += y;
        initialCoords[i] = [x, y];
    };

    anchorPoint.x /= polygon.length;
    anchorPoint.y /= polygon.length;

    for (let percent = 0; percent <= 1; percent += 0.1) {
        let radAngle = percent * 90 * (Math.PI / 180);

        for (let [i, point] of polygon.entries()) {
            let [x, y] = initialCoords[i];
    
            setCoords(point, 
                Math.cos(radAngle) * (x - anchorPoint.x) - Math.sin(radAngle) * (y - anchorPoint.y) + anchorPoint.x,
                Math.sin(radAngle) * (x - anchorPoint.x) + Math.cos(radAngle) * (y - anchorPoint.y) + anchorPoint.y
            );
        }

        await sleep(50);
    }
    
    game.isAnimating = false;
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function check() {
    let regions = game.regions;
    let angles = regions.map(v => v.angle);

    for (let polygon of game.polygons) {
        for (let point of polygon) {
            for (let i = 0; i < regions.length; i++) {
                if (insideRegion(regions[i], { x: getXcoord(point), y: getYcoord(point) }, 0.2)) angles[i] -= game.angles[point];
            }
        }
    }

    setValue("ok", angles.every(v => v === 0));
}

function insideRegion(center, point, size) {
    return Math.sqrt(Math.pow(center.x - point.x, 2) + Math.pow(center.y - point.y, 2)) <= size;
}

function restart() { reset() }