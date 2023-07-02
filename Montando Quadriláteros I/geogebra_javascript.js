let { getXcoord, getYcoord, setCoords, getValue, setValue } = ggbApplet;

let game = {
    polygons: [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["J", "K", "L"],
        ["G", "H", "I"]
    ],
    messageTime: 1200
}

function ggbOnInit() { }

function rotatePolygon(index) {
    let polygon = game.polygons[index];
    let radAngle = Math.PI;
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

function check() {
    let regions = [];
    let connections = {};
    let onePointTouching = 0;
    let twoPointsTouching = 0;

    for (let [polygonIndex, polygon] of game.polygons.entries()) {
        for (let point of polygon) {
            let pointCoords = { belongsTo: polygonIndex, x: getXcoord(point), y: getYcoord(point) };
            let isNewRegion = true;

            for (let i = 0; i < regions.length; i++) {
                if (insideRegion(regions[i][0], pointCoords, 0.3)) {
                    regions[i].push(pointCoords);
                    isNewRegion = false;
                    break;
                }
            }

            if (isNewRegion) regions.push([pointCoords]);
        }
    }

    for (let region of regions) {
        for (let i = 0; i < region.length; i++) {
            for (let j = i + 1; j < region.length; j++) {
                let polygonPair = region[i].belongsTo + "-" + region[j].belongsTo;
                connections[polygonPair] = connections[polygonPair] ? connections[polygonPair] + 1 : 1;
            }
        }
    }

    for (let connection in connections) {
        if (connections[connection] === 2) twoPointsTouching++;
        else if (connections[connection] === 1) onePointTouching++;
        else return flashMessage("errorMessage");
    }

    if (twoPointsTouching === 3 && onePointTouching === 2) return show(3);
    if (twoPointsTouching === 2 && onePointTouching === 1) return show(2);
    if (twoPointsTouching > 0 && onePointTouching < 2) return show(1);
    return flashMessage("errorMessage");
}

function show(num) {
    setValue("show" + num, 1);
    flashMessage("done" + num + "Message");
}

function flashMessage(messageName) {
    setValue(messageName, true);
    setTimeout(() => setValue(messageName, false), game.messageTime);
}

function insideRegion(center, point, size) {
    return Math.sqrt(Math.pow(center.x - point.x, 2) + Math.pow(center.y - point.y, 2)) <= size;
}