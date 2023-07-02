let { getXcoord, getYcoord, setCoords, getValue, setValue } = ggbApplet;

let game = {
    polygons: [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["J", "K", "L"],
        ["G", "H", "I"]
    ],
    messageTime: 1200,
    colors: ["purple", "purple", "green", "green"]
}

function ggbOnInit() { }

function rotatePolygon(index) {
    let polygon = game.polygons[index];
    let radAngle = Math.PI;
    let anchorPoint = getPolygonCenter(index);

    for (let point of polygon) {
        let x = getXcoord(point);
        let y = getYcoord(point);

        setCoords(point, 
            Math.cos(radAngle) * (x - anchorPoint.x) - Math.sin(radAngle) * (y - anchorPoint.y) + anchorPoint.x,
            Math.sin(radAngle) * (x - anchorPoint.x) + Math.cos(radAngle) * (y - anchorPoint.y) + anchorPoint.y
        );
    }
}

function getPolygonCenter(index) {
    let polygon = game.polygons[index];

    let anchorPoint = { x: 0, y: 0 };

    for (let point of polygon) {
        anchorPoint.x += getXcoord(point);
        anchorPoint.y += getYcoord(point);
    };

    anchorPoint.x /= polygon.length;
    anchorPoint.y /= polygon.length;

    return anchorPoint;
}

function check() {
    let regions = [];
    let connections = {};
    let singleTouch = { total: 0, green: 0, purple: 0 };
    let doubleTouch = { total: 0, green: 0, purple: 0 };
    let polygonsToConsider = { "0": false, "1": false, "2": false, "3": false};
    let threeDotsRegionsCount = 0;

    for (let [polygonIndex, polygon] of game.polygons.entries()) {
        for (let point of polygon) {
            let pointCoords = { polygonIndex: polygonIndex, x: getXcoord(point), y: getYcoord(point) };
            let isNewRegion = true;

            for (let i = 0; i < regions.length; i++) {
                for (let regionPoint of regions[i]) {
                    if (insideRegion(regionPoint, pointCoords, 0.3)) {
                        regions[i].push(pointCoords);
                        isNewRegion = false;
                        break;
                    }
                }
                
                if (!isNewRegion) break;
            }

            if (isNewRegion) regions.push([pointCoords]);
        }
    }

    regions.forEach(v => {
        if (v.length === 3) threeDotsRegionsCount++;
    });

    if (regions.find(v => v.length > 3) || threeDotsRegionsCount === 3) return flashMessage("errorMessage");

    for (let region of regions) {
        for (let i = 0; i < region.length; i++) {
            for (let j = i + 1; j < region.length; j++) {
                let polygonPair = region[i].polygonIndex + "-" + region[j].polygonIndex;
                connections[polygonPair] = connections[polygonPair] ? connections[polygonPair] + 1 : 1;

                if (connections[polygonPair] === 2) {
                    polygonsToConsider[region[i].polygonIndex] = true;
                    polygonsToConsider[region[j].polygonIndex] = true;
                }
            }
        }
    }

    for (let connection in connections) {
        let polygonPair = connection.split("-");

        if (connections[connection] === 2) {
            doubleTouch.total++;
            doubleTouch[game.colors[polygonPair[0]]]++;
            doubleTouch[game.colors[polygonPair[1]]]++;
        } else if (connections[connection] === 1) {
            singleTouch.total++;
            singleTouch[game.colors[polygonPair[0]]]++;
            singleTouch[game.colors[polygonPair[1]]]++;
        } else {
            return flashMessage("errorMessage");
        }
    }

    let order = getPolygonsOrder().filter(v => polygonsToConsider[v.polygonIndex]);

    if (order.length === 4) {
        let isFirstTwoColorsEqual = game.colors[order[0].polygonIndex] === game.colors[order[1].polygonIndex];

        if (doubleTouch.purple === 3 && singleTouch.purple === 2) {
            if (isFirstTwoColorsEqual) return show(13);
            return show(12);
        } else if (doubleTouch.purple === 4) {
            return show(11);
        } else if (doubleTouch.green === 4) {
            return show(10);
        }
    } else if (order.length === 3) {
        let isFirstPolygonRotated = isRotated(order[0].polygonIndex);
        let isFirstTwoColorsEqual = game.colors[order[0].polygonIndex] === game.colors[order[1].polygonIndex];
        
        if (doubleTouch.purple === 3 && singleTouch.green === 1) {
            if (isFirstPolygonRotated && isFirstTwoColorsEqual) return show(9);
            if (isFirstPolygonRotated || isFirstTwoColorsEqual) return show(8);
            return show(9);
        } else if (doubleTouch.green === 3 && singleTouch.purple === 1) {
            if (isFirstPolygonRotated && isFirstTwoColorsEqual) return show(4);
            if (isFirstPolygonRotated || isFirstTwoColorsEqual) return show(6);
            return show(4);
        } else if (doubleTouch.green === 2 && singleTouch.green === 2) {
            return show(5);
        } else if (doubleTouch.purple === 2 && singleTouch.purple === 2) {
            return show(7);
        }
    } else if (order.length === 2) {
        if (doubleTouch.purple === 2) return show(3);
        if (doubleTouch.green === 2) return show(1);
        return show(2);
    }

    return flashMessage("errorMessage");
}

function getPolygonsOrder() {
    let order = [];

    for (let [polygonIndex, polygon] of game.polygons.entries()) {
        let x1 = getXcoord(polygon[0]);
        let x2 = getXcoord(polygon[1]);
        order.push({ x: Math.min(x1, x2), polygonIndex: polygonIndex });
    }
    
    return order.sort((a, b) => a.x - b.x);
}

function isRotated(index) {
    return getYcoord(game.polygons[index][0]) - getYcoord(game.polygons[index][2]) > 0;
}

function show(num) {
    setValue("show" + num, 1);
    flashMessage("done" + num + "Message");
}

function flashMessage(messageName) {
    setValue("displayingMessage", true)
    setValue(messageName, true);
    setTimeout(() => {
        setValue(messageName, false);
        setValue("displayingMessage", false);
    }, game.messageTime);
}

function insideRegion(center, point, size) {
    return Math.sqrt(Math.pow(center.x - point.x, 2) + Math.pow(center.y - point.y, 2)) <= size;
}