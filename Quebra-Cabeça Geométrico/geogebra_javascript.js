let { getXcoord, getYcoord, setCoords, getValue, setValue, setColor } = ggbApplet;

let game = {
    polygons: [
        ["E", "M", "N", "F"],
        ["C", "O", "P", "D"],
        ["G", "L", "H"],
        ["I", "K", "J"]
    ],
    angles: {
        E: 60,
        M: 96,
        N: 114,
        F: 90,
        C: 90,
        O: 97,
        D: 113,
        P: 60,
        L: 84,
        G: 66,
        H: 30,
        I: 68,
        K: 82,
        J: 30
    },
    origins: [
        ["E", 0.14277663378848257, -2.1018418343183227],
        ['M', 1.1327766337884828, -0.4018418343183239],
        ['N', 2.91277663378848, -1.171841834318323],
        ['F', 2.91277663378848, -2.1118418343183234],
        ['C', -2.9075442209089006, -2.0926604273486897],
        ['O', 0.22245577909109931, -1.1026604273486895],
        ['P', -2.9075442209089006, 0.6773395726513094],
        ['D', -0.18754422090890074, -2.0926604273486897],
        ['G', 3.2602913740914494, -2.067017001969982],
        ['L', 4.030291374091458, -0.2870170019699867],
        ['H', 7.160291374091431, -2.067017001969982],
        ['I', 7.397981282046071, -2.0322511308335063],
        ['K', 7.80798128204607, -1.0422511308335065],
        ['J', 9.507981282046073, -2.0322511308335063]
    ]
}

function ggbOnInit() { }

function reflectPolygon(index) {
    let polygon = game.polygons[index];
    let anchorPoint = { x: 0 };

    for (let point of polygon) anchorPoint.x += getXcoord(point);

    anchorPoint.x /= polygon.length;

    for (let point of polygon) {
        let x = getXcoord(point);
        let y = getYcoord(point);

        setCoords(point, 2 * anchorPoint.x - x, y);
    }
}

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

function check() {
    let challenge = getValue("desafio");

    switch(challenge) {
        case 1: return setValue("ok", checkRectangle());
        case 2: return setValue("ok", checkTriangle());
        case 3: return setValue("ok", checkParalelogram());
        case 4: return setValue("ok", checkTrapezoid());
    }
}

function nextChallenge() {
    let challenge = getValue("desafio") + 1;
    let text = "f" + challenge;
    
    setValue("desafio", challenge);
    setValue("ok", undefined);
    softReset();
    setColor(text, 255, 0, 0);
    setTimeout(() => setColor(text, 0, 0, 0), 500);
}

function checkRectangle() {
    let regions = getRegions();
    let externalAngles = 0;

    if (regions.length !== 7) return 0;

    for (let region of regions) {
        let sumAngles = region.reduce((a, b) => a + b.angle, 0);

        if ((90 === sumAngles) ||
            (170 <= sumAngles && 190 >= sumAngles) ||
            (350 <= sumAngles && 370 >= sumAngles)) {
            if (sumAngles < 170) externalAngles += sumAngles;
            continue;
        }

        return 0;
    }

    return Number(350 <= externalAngles && 370 >= externalAngles);
}

function checkParalelogram() {
    let regions = getRegions();
    let externalAngles = 0;
    let triangleBorders = [];

    if (regions.length !== 8) return checkRectangle() ? 2 : 0;

    for (let region of regions) {
        let sumAngles = region.reduce((a, b) => a + b.angle, 0);

        if ((30 === sumAngles) ||
            (50 <= sumAngles && 70 >= sumAngles) ||
            (170 <= sumAngles && 190 >= sumAngles) ||
            (140 <= sumAngles && 160 >= sumAngles) ||
            (110 <= sumAngles && 130 >= sumAngles)) {   
            if (sumAngles < 170) externalAngles += sumAngles;
            if ((50 <= sumAngles && 70 >= sumAngles)) triangleBorders.push(region[0]);
            continue;
        }

        return 0;
    }

    if (triangleBorders.length === 2 && (
        insideRegion({x: 0, y: triangleBorders[0].y}, {x: 0, y: triangleBorders[1].y}, 0.2) ||
        insideRegion({x: triangleBorders[0].x, y: 0}, {x: triangleBorders[1].x, y: 0}, 0.2)
    )) return 0;

    return Number(350 <= externalAngles && 370 >= externalAngles);
}

function checkTriangle() {
    let regions = getRegions();
    let externalAngles = 0;

    if (regions.length !== 8) return 0;

    for (let region of regions) {
        let sumAngles = region.reduce((a, b) => a + b.angle, 0);

        if ((30 === sumAngles) ||
            (50 <= sumAngles && 70 >= sumAngles) ||
            (170 <= sumAngles && 190 >= sumAngles)||
            (110 <= sumAngles && 130 >= sumAngles)) {
            if (sumAngles < 170) externalAngles += sumAngles;
            continue;
        }

        return 0;
    }

    return Number(170 <= externalAngles && 190 >= externalAngles);
}

function checkTrapezoid() {
    let regions = getRegions();
    let externalAngles = 0;
    let triangleBorders = [];

    if (regions.length !== 8) return checkRectangle() ? 3 : 0;

    for (let region of regions) {
        let sumAngles = region.reduce((a, b) => a + b.angle, 0);
        
        if ((50 <= sumAngles && 70 >= sumAngles) ||
            (170 <= sumAngles && 190 >= sumAngles) ||
            (110 <= sumAngles && 130 >= sumAngles)) {
            if (sumAngles < 170) externalAngles += sumAngles;
            if ((50 <= sumAngles && 70 >= sumAngles)) triangleBorders.push(region[0]);
            continue;
        }

        return checkParalelogram() ? 3 : 0;
    }

    if (triangleBorders.length === 2 && (
        !insideRegion({x: 0, y: triangleBorders[0].y}, {x: 0, y: triangleBorders[1].y}, 0.2) &&
        !insideRegion({x: triangleBorders[0].x, y: 0}, {x: triangleBorders[1].x, y: 0}, 0.2)
    )) return checkParalelogram() ? 3 : 0;

    return Number(350 <= externalAngles && 370 >= externalAngles);
}

function getRegions() {
    let points = [];
    let regions = [];

    for (let polygon of game.polygons) {
        for (let point of polygon) {
            let x = getXcoord(point);
            let y = getYcoord(point); 
            points.push({ x, y, angle: game.angles[point] });
        }
    }

    for (let point of points) {
        if (!regions.length) regions.push([point]);
        else {
            let newRegion = true;

            for (let region of regions) {
                if (insideRegion(region[0], point, 0.2)) {
                    region.push(point);
                    newRegion = false;
                    break;
                }
            }

            if (newRegion) regions.push([point]);
        }
    }

    return regions;
}

function insideRegion(center, point, size) {
    return Math.sqrt(Math.pow(center.x - point.x, 2) + Math.pow(center.y - point.y, 2)) <= size;
}

function softReset() {
    for (let point of game.origins) setCoords(...point);
}

function reset() {
    softReset();
    setValue("desafio", 1);
    setValue("ok", undefined);
}