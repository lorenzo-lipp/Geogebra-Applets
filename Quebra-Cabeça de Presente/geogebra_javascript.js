let { getXcoord, getYcoord, setCoords, getValue, setValue, reset } = ggbApplet;

let game = {
    polygons: [
        ["C", "O", "P", "D"],
        ["E", "M", "F"],
        ["G", "L", "H"],
        ["I", "K", "J"],
        ["A", "B", "N"]
    ],
    angles: {
        C: 90,
        O: 90,
        P: 90,
        D: 90,
        E: 45,
        M: 45,
        F: 90,
        G: 45,
        L: 45,
        H: 90,
        I: 45,
        K: 45,
        J: 90,
        A: 45,
        B: 90,
        N: 45
    },
    regions: [
        [
            { x: 2.5, y: -2.5, angle: 90 }, 
            { x: 4, y: -2.5, angle: 90 }, 
            { x: 4, y: -1, angle: 270 }, 
            { x: 5.5, y: -1, angle: 90 }, 
            { x: 5.5, y: 0.5, angle: 90 }, 
            { x: 4, y: 0.5, angle: 180 }, 
            { x: 2.5, y: 0.5, angle: 90 },
            { x: 2.5, y: -1, angle: 180 }
        ],
        [
            { x: 1.5, y: -2.5, angle: 90 },
            { x: 3, y: -2.5, angle: 180 },
            { x: 4.5, y: -2.5, angle: 180 },
            { x: 6, y: -2.5, angle: 45 },
            { x: 4.5, y: -1, angle: 135 },
            { x: 3, y: -1, angle: 270 },
            { x: 3, y: 0.5, angle: 45 },
            { x: 1.5, y: -1, angle: 135 },
        ],
        [
            { x: 2.5, y: 0.5, angle: 90 },
            { x: 4, y: 0.5, angle: 135 },
            { x: 5.5, y: -1, angle: 135 },
            { x: 4, y: -1, angle: 360 },
            { x: 5.5, y: -2.5, angle: 90 },
            { x: 4, y: -2.5, angle: 135 },
            { x: 2.5, y: -1, angle: 135 },
        ],
        [
            { x: 1.5, y: 0.5, angle: 90 },
            { x: 3, y: 0.5, angle: 180 },
            { x: 4.5, y: 0.5, angle: 180 },
            { x: 6, y: 0.5, angle: 90 },
            { x: 6, y: -1, angle: 90 },
            { x: 4.5, y: -1, angle: 180 },
            { x: 3, y: -1, angle: 180 },
            { x: 1.5, y: -1, angle: 90 },
        ],
        [
            { x: 1, y: 0.5, angle: 45 },
            { x: 2.5, y: 0.5, angle: 180 },
            { x: 4, y: 0.5, angle: 90 },
            { x: 4, y: -1, angle: 225 },
            { x: 5.5, y: -2.5, angle: 45 },
            { x: 4, y: -2.5, angle: 180 },
            { x: 2.5, y: -2.5, angle: 90 },
            { x: 2.5, y: -1, angle: 225 },
        ],
        [
            { x: 1, y: 0.5, angle: 90 }, 
            { x: 2.5, y: 0.5, angle: 135 },
            { x: 4, y: -1, angle: 180 },
            { x: 5.5, y: -2.5, angle: 45 },
            { x: 4, y: -2.5, angle: 180 },
            { x: 2.5, y: -2.5, angle: 90 },
            { x: 2.5, y: -1, angle: 270 },
            { x: 1, y: -1, angle: 90 },
        ]
    ]
}

function ggbOnInit() { }

function rotatePolygon(index) {
    let polygon = game.polygons[index];
    let radAngle = 90 * (Math.PI / 180);
    let anchorPoint = { x: 0, y: 0 };

    for (let point of polygon) {
        anchorPoint.x += getXcoord(point);
        anchorPoint.y += getYcoord(point);
    };

    anchorPoint.x /= polygon.length;
    anchorPoint.y /= polygon.length;

    for (let point of polygon) {
        let x = getXcoord(point);
        let y = getYcoord(point);

        setCoords(point, 
            Math.cos(radAngle) * (x - anchorPoint.x) - Math.sin(radAngle) * (y - anchorPoint.y) + anchorPoint.x,
            Math.sin(radAngle) * (x - anchorPoint.x) + Math.cos(radAngle) * (y - anchorPoint.y) + anchorPoint.y
        );
    }
}

function nextChallenge() {
    let challenge = getValue("desafio");
    setValue("desafio", challenge + 1);
    setValue("ok", undefined);
    resetPositions();
}

function check() {
    let regions = game.regions[getValue("desafio") - 1];
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

function resetPositions() {
    setCoords("A", 4.18528 - 5, -0.83719);
    setCoords("B", 5.68528 - 5, -0.83719);
    setCoords("C", 2.36655 - 5, -0.7976);
    setCoords("D", 3.86655 - 5, -0.7976);
    setCoords("E", 4.60409 - 5, -2.71775);
    setCoords("F", 6.10409 - 5, -2.71775);
    setCoords("G", 2.92011 - 5, -2.71775);
    setCoords("H", 4.42011 - 5, -2.71775);
    setCoords("I", 1.29961 - 5, -2.75734);
    setCoords("J", 2.79961 - 5, -2.75734);
    setCoords("K", 2.79961 - 5, -1.25734);
    setCoords("L", 4.42011 - 5, -1.21775);
    setCoords("M", 6.10409 - 5, -1.21775);
    setCoords("N", 5.68528 - 5, 0.66281);
    setCoords("O", 3.86655 - 5, 0.7024);
    setCoords("P", 2.36655 - 5, 0.7024);
}

function restart() { reset(); }