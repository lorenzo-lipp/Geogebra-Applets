let {
    evalCommandGetLabels,
    evalCommand,
    evalXML,
    getAllObjectNames,
    deleteObject,
    setColor,
    setFixed,
    setLabelVisible,
    setLabelStyle,
    setLineStyle,
    setPointSize,
    setPointStyle,
    setCoords,
    setValue,
    getValue,
    setVisible,
    setFilling
} = ggbApplet;

const objectCount = 17;

let game = {
    chain: null,
    height: null,
    area: null,
    type: null,
    wins: 0
}

function ggbOnInit() { 
    game.chain = [
        new Point(2.5136439633240757, 1.238169728414305),
        new Point(9.303032646988356, 8.580117787487685),
        new Point(3.183323389687569, 5.1817124840980116)
    ];
    game.height = 2.2;
    game.area = 11;
    game.type = 0;

    setValue("type", game.type);
    restart(); 
    clearCanvas();
    drawPolygon();
}

function newGame() {
    let chain;

    do {
        game.type = Math.round(Math.random());
        chain = game.type ? getParalelogram() : getTriangle();
    } while (isDegenerate(chain));

    game.chain = chain;

    restart();
    clearCanvas();
    drawPolygon();
    setValue("type", game.type);
}

function drawPolygon() {
    centerPolygon();
    
    game.chain.forEach(p => p.draw());

    for (let i = 1; i < game.chain.length; i++) {
        let current = game.chain[i];
        let previous = game.chain[i - 1];
        let middlePoint = new Point((current.x + previous.x) / 2, (current.y + previous.y) / 2);

        current.drawSegmentTo(previous);
        drawLabel(middlePoint, String(Math.round(current.distance(previous) * 10) / 10));
    }

    let first = game.chain[0];
    let last = game.chain[game.chain.length - 1];
    let middlePoint = new Point((first.x + last.x) / 2, (first.y + last.y) / 2);

    first.drawSegmentTo(last);
    drawLabel(middlePoint, String(Math.round(first.distance(last) * 10) / 10));

    let polygon = evalCommandGetLabels(`{Polygon(${game.chain.join(",")})}`);
    setColor(polygon, 255, 102, 105);
    setFixed(polygon, 1, 0);
    drawHeight();
}

function drawHeight() {
    let arr = game.type ?
        [["C", "f"],["A", "h"],["B", "h"], ["D", "f"]] :
        [["A", "g"],["C", "f"],["B", "h"]];
    arr.sort(() => Math.random() - Math.random());

    let result = "undefined";
    while (result === "undefined") {
        result = evalCommandGetLabels(
            `Segment(${arr[0][0]},Intersect(PerpendicularLine(${arr[0][0]},${arr[0][1]}),${arr[0][1]}))`
        );
        if (result === "undefined") arr.shift();
    }
    
    let first = new Point(getValue(`x(${arr[0][0]})`), getValue(`y(${arr[0][0]})`));
    let last = new Point(
        getValue(`x(Intersect(PerpendicularLine(${arr[0][0]},${arr[0][1]}),${arr[0][1]}))`), 
        getValue(`y(Intersect(PerpendicularLine(${arr[0][0]},${arr[0][1]}),${arr[0][1]}))`)
    );
    let middlePoint = new Point((first.x + last.x) / 2, (first.y + last.y) / 2);
    game.height = Math.round(first.distance(last) * 10) / 10;
    game.area = Math.round(getValue(arr[0][1]) * (game.type ? 1 : 0.5) * game.height * 100) / 100;

    drawLabel(middlePoint, String(game.height), false, { bold: 1, r: 255, g: 0, b: 51 });
    deleteObject(result);
    first.drawSegmentTo(last, 1);

    let anglePoint = evalCommandGetLabels(`Intersect(PerpendicularLine(${arr[0][0]},${arr[0][1]}),${arr[0][1]})`);
    let points = game.type ? ["A", "B", "C", "D"] : ["A", "B", "C"];

    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (j === i) continue;
            let angleVal = getValue(`Angle(${points[i]}, ${anglePoint}, ${points[j]})`);

            if (Math.abs(angleVal - 1.57) < 0.15) {
                let angle = evalCommandGetLabels(`Angle(${points[i]}, ${anglePoint}, ${points[j]})`);
                setColor(angle, 255, 140, 150);
                setFixed(angle, 1, 0);
                setLabelVisible(angle, 0);
                setFilling(angle, 0.6);
                i = j = Infinity;
            }
        }
    }
    setVisible(anglePoint, false);
}

function isDegenerate(chain) {
    let sum = 0;

    if (chain === null) return true;
    if (chain.every((v) => v.y === chain[0].y)) return true;
    if (chain.length < 3) return true;
    if (isNaN(chain[2].x)) return true;

    for (let i = 1; i < chain.length; i++) {
        sum += chain[i].distance(chain[i - 1]);
    }

    return Math.abs(sum - chain[0].distance(chain[chain.length - 1])) < 1;
}

function getTriangle() {
    let pointsCount = 3;
    let points = Array(pointsCount).fill().map(() => new Point(Math.random() * 10, Math.random() * 10));
    let chain = getConvexHull(points);
    
    for (let i = 1; i < chain.length; i++) {
        let previous = chain[i - 1];
        let current = chain[i];
        let dist = previous.distance(current);
        let circle = new Circle(previous.x, previous.y, Math.ceil(dist));
        let { x, y } = current;

        let [p1, p2] = circle.intersectWithLine(previous, current);
        let newP = current.distance(p1) > current.distance(p2) ? p2 : p1;

        for (let j = i + 1; j < chain.length; j++) {
            chain[j].offset(newP.x - x, newP.y - y);
        }

        chain[i] = newP;
    }

    let first = chain[0];
    let last = chain[chain.length - 1];
    let lastButOne = chain[chain.length - 2];
    let dist = last.distance(first);
    let c1 = new Circle(lastButOne.x, lastButOne.y, last.distance(lastButOne));
    let c2 = new Circle(first.x, first.y, Math.ceil(dist));
    let intersections = c1.intersectWithCircle(c2);

    if (intersections === null) return null;

    if (determinant(lastButOne, intersections[0], first) <= 0) {
        chain[chain.length - 1] = intersections[1];
    } else {
        chain[chain.length - 1] = intersections[0];
    }

    return chain;
}

function getParalelogram() {
    let width = Math.floor(Math.random() * 5) + 3;
    let height = Math.floor(Math.random() * 10);
    let shift = Math.floor(Math.random() * 2) + 1;
    shift = Math.random() > 0.5 ? -shift : shift;

    return [
        new Point(0 + shift, 0), 
        new Point(width + shift, 0), 
        new Point(width, height), 
        new Point(0, height)
    ];
}

function getConvexHull(points) {
    let stack = [];
    let p0 = points[0];

    for (let i = 1; i < points.length; i++) {
        if (points[i].y < p0.y || (points[i].y === p0.y && points.x < p0.x)) p0 = points[i];
    }

    points.sort((a, b) => a == p0 ? -1 : polarAngle(p0, a) - polarAngle(p0, b));

    for (let point of points) {
        while (stack.length > 1 && 
            determinant(stack[stack.length - 2], stack[stack.length - 1], point) <= 0
        ) stack.pop();

        stack.push(point);
    }

    return stack;
}

function polarAngle(p1, p2) {
    return (360 + Math.atan((p2.y - p1.y) / (p2.x - p1.x)) * 360 / (2 * Math.PI)) % 360;
}

function determinant(p1, p2, p3) { 
    return p1.x * p2.y + p1.y * p3.x + p2.x * p3.y - p1.y * p2.x - p2.y * p3.x - p3.y * p1.x; 
}

function check() {
    let isCorrect = game.area === getValue("answer");

    setValue("ok", Number(isCorrect));
    
    if (isCorrect) game.wins++;
}

function restart() {
    setValue("ok", undefined);
    setValue("answer", undefined);
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    distance(point) {
        return Math.hypot(point.x - this.x, point.y - this.y);
    }

    offset(x, y) {
        this.x += x;
        this.y += y;
    }

    draw() {
        let p = evalCommandGetLabels(this.toString());

        setPointSize(p, 3);
        setColor(p, 255, 102, 105);
        setPointStyle(p, 0);
        setLabelVisible(p, false);
        setFixed(p, 1, 0);
    }

    drawSegmentTo(point, style=0) {
        let s = evalCommandGetLabels(`Segment((${this.x},${this.y}), (${point.x},${point.y}))`);
        
        setColor(s, 255, 102, 105);
        setFixed(s, 1, 0);
        setLabelVisible(s, false);
        setLineStyle(s, style);
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    // https://stackoverflow.com/a/12221389
    intersectWithCircle(circle) {
        let dx = circle.x - this.x;
        let dy = circle.y - this.y;
        let dist = Math.hypot(dx, dy);

        if (dist > (this.radius + circle.radius) || dist < Math.abs(this.radius - circle.radius)) {
            return null;
        }

        let a = ((this.radius ** 2) - (circle.radius ** 2) + (dist ** 2)) / (2 * dist) ;
        let x2 = this.x + (dx * a / dist);
        let y2 = this.y + (dy * a / dist);
        let h = Math.sqrt((this.radius ** 2) - (a ** 2));
        let rx = -dy * h / dist;
        let ry = dx * h / dist;

        return [
            new Point(x2 + rx, y2 + ry), 
            new Point(x2 - rx, y2 - ry)
        ];
    }

    // https://mathworld.wolfram.com/Circle-LineIntersection.html
    intersectWithLine(p1, p2) {
        p1.offset(-this.x, -this.y);
        p2.offset(-this.x, -this.y);

        let dx = p2.x - p1.x;
        let dy = p2.y - p1.y;
        let drSq = dx ** 2 + dy ** 2;
        let D = p1.x * p2.y - p2.x * p1.y;
        let delta = this.radius ** 2 * drSq - D ** 2;

        if (delta < 0) return null;

        p1.offset(this.x, this.y);
        p2.offset(this.x, this.y);

        return [
            new Point((D * dy + Math.sign(dy) * dx * Math.sqrt(delta)) / drSq + this.x, (-D * dx + Math.abs(dy) * Math.sqrt(delta)) / drSq + this.y),
            new Point((D * dy - Math.sign(dy) * dx * Math.sqrt(delta)) / drSq + this.x, (-D * dx - Math.abs(dy) * Math.sqrt(delta)) / drSq + this.y)
        ];
    }
}

function clearCanvas() {
    getAllObjectNames().slice(objectCount).forEach(v => deleteObject(v));
}

function centerPolygon() {
    let centerX = game.chain.reduce((acc, p) => acc + p.x, 0) / game.chain.length;
    let centerY = game.chain.reduce((acc, p) => acc + p.y, 0) / game.chain.length;

    game.chain.forEach(p => p.offset(5 - centerX, 5 - centerY));
}

function drawLabel(point, text, centerText=true, style={bold: 0, r: 0, g: 0, b: 0}) {
    let label = evalCommandGetLabels(`"${text}"`);

    evalXML(`
        <expression label="${label}" exp="&quot;${text.replace(".", ",")}&quot;"/>
        <element type="text" label="${label}">
            <show object="true" label="false" ev="8"/>
            <objColor r="${style.r / 255}" g="${style.g / 255}" b="${style.b / 255}" alpha="0"/>
            <layer val="0"/>
            <labelMode val="0"/>
            <fixed val="true"/>
            <selectionAllowed val="false"/>
            <font serif="false" sizeM="1.2" size="10" style="${style.bold}"/>
            <startPoint x="6.77968606293582" y="2.2337543261020247" z="1"/>
        </element>
    `);

    let center = new Point(5, 5);
    let circle = new Circle(5, 5, point.distance(center) + 0.4 + 0.1 * text.length);
    let [p1, p2] = circle.intersectWithLine(center, point);

    if (!centerText) {
        setCoords(label, point.x - 0.15 * text.length + 0.2, point.y);
        setColor(label, 255, 80, 76);
    } else if (game.type) {
        if (point.distance(p1) <= point.distance(p2)) {
            if (point.x > p1.x) {
                setCoords(label, point.x + 0.08 * text.length, p1.y - 0.2);
            } else {
                setCoords(label, point.x - 0.3 * text.length, p1.y - 0.2);
            }
        } else {
            setCoords(label, point.x - 0.15 * text.length, p2.y - 0.2);
        }
    } else if (point.distance(p1) <= point.distance(p2)) {
        setCoords(label, p1.x - 0.15 * text.length, p1.y - 0.2);
    } else {
        setCoords(label, p2.x - 0.15 * text.length, p2.y - 0.2);
    }
}