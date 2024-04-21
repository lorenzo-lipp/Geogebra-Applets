let {
    evalCommandGetLabels,
    evalXML,
    getAllObjectNames,
    deleteObject,
    setColor,
    setFixed,
    setLabelVisible,
    setLabelStyle,
    setPointSize,
    setPointStyle,
    setCoords,
    setValue,
    getValue
} = ggbApplet;

const objectCount = 12;

let game = {
    chain: null,
    perimeter: null,
    wins: 0
}

function ggbOnInit() { 
    game.chain = [
        new Point(8.4976166751108, 1.2235418375804974),
        new Point(8.163666883389968, 6.212377126163355),
        new Point(2.1681874652760005, 6.445243068224023),
        new Point(2.3041417726717004, 5.454527959678405),
        new Point(5.525334282233713, 1.6304046854701073)
    ];
    game.perimeter = 20;

    restart(); 
    clearCanvas();
    drawPolygon();
}

function newGame() {
    let chain;

    do {
        chain = getPolygon(game.wins > 4 ? 1 : 0);
    } while (isDegenerate(chain));

    game.chain = chain;
    game.perimeter = getPerimeter(chain);

    restart();
    clearCanvas();
    drawPolygon();
}

function getPerimeter(chain) {
    let perimeter = 0;

    for (let i = 1; i < chain.length; i++) {
        perimeter += chain[i].distance(chain[i - 1]);
    }

    return Math.round((perimeter + chain[0].distance(chain[chain.length - 1])) * 10) / 10;
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
    setColor(polygon, 0, 153, 255);
    setFixed(polygon, 1, 0);
}

function isDegenerate(chain) {
    let sum = 0;

    if (chain === null) return true;
    if (isNaN(chain[2].x)) return true;

    for (let i = 1; i < chain.length; i++) {
        sum += chain[i].distance(chain[i - 1]);
    }

    return Math.abs(sum - chain[0].distance(chain[chain.length - 1])) < 1;
}

function getPolygon(decimalPlaces) {
    let power = 10 ** decimalPlaces;
    let pointsCount = Math.floor(Math.random() * 5) + 3;
    let points = Array(pointsCount).fill().map(() => new Point(Math.random() * 10, Math.random() * 10));
    let chain = getConvexHull(points);
    
    for (let i = 1; i < chain.length; i++) {
        let previous = chain[i - 1];
        let current = chain[i];
        let dist = previous.distance(current);
        let circle = new Circle(previous.x, previous.y, Math.ceil(dist * power) / power);
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
    let c2 = new Circle(first.x, first.y, Math.ceil(dist * power) / power);
    let intersections = c1.intersectWithCircle(c2);

    if (intersections === null) return null;

    if (determinant(lastButOne, intersections[0], first) <= 0) {
        chain[chain.length - 1] = intersections[1];
    } else {
        chain[chain.length - 1] = intersections[0];
    }

    return chain;
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
    let isCorrect = game.perimeter === getValue("answer");

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
        setColor(p, 0, 153, 255);
        setPointStyle(p, 0);
        setLabelVisible(p, false);
        setFixed(p, 1, 0);
    }

    drawSegmentTo(point) {
        let s = evalCommandGetLabels(`Segment((${this.x},${this.y}), (${point.x},${point.y}))`);
        
        setColor(s, 0, 153, 255);
        setFixed(s, 1, 0);
        setLabelVisible(s, false);
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

function drawLabel(point, text) {
    let label = evalCommandGetLabels(`"${text}"`);

    evalXML(`
        <expression label="${label}" exp="&quot;${text.replace(".", ",")}&quot;"/>
        <element type="text" label="${label}">
            <show object="true" label="false" ev="8"/>
            <objColor r="0" g="0" b="0" alpha="0"/>
            <layer val="0"/>
            <labelMode val="0"/>
            <fixed val="true"/>
            <selectionAllowed val="false"/>
            <font serif="false" sizeM="1.6" size="10" style="0"/>
            <startPoint x="6.77968606293582" y="2.2337543261020247" z="1"/>
        </element>
    `);

    let center = new Point(5, 5);
    let circle = new Circle(5, 5, point.distance(center) + 0.4 + 0.1 * text.length);
    let [p1, p2] = circle.intersectWithLine(center, point);

    if (point.distance(p1) < point.distance(p2)) {
        setCoords(label, p1.x - 0.15 * text.length, p1.y - 0.2);
    } else {
        setCoords(label, p2.x - 0.15 * text.length, p2.y - 0.2);
    }
}