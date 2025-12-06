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

const objectCount = 15;

let game = {
    chain: null,
    area: null,
    wins: 0
}

function ggbOnInit() { 
    game.chain = [
        new Point(2.5, 1.5),
        new Point(7.5, 1.5),
        new Point(7.5, 8.5),
        new Point(2.5, 8.5)
    ];
    game.area = 35;

    restart(); 
    clearCanvas();
    drawPolygon(0);
    drawAngles();
}

function newGame() {
    let i = 0;
    do {
        game.chain = getPolygon(game.wins > 4 ? 1 : 0);
        i > 0 && console.log("Degenerate: ", game.chain);
        i++;
    } while (isDegenerate(game.chain));
    
    game.area = getArea(game.chain, game.wins > 4 ? 1 : 0);

    restart();
    clearCanvas();
    drawPolygon(game.wins > 4 ? 1 : 0);
    drawAngles();
}

function getArea(chain, decimalPlaces) {
    return (chain[1].x * 10 ** decimalPlaces) * (chain[2].y * 10 ** decimalPlaces);
}

function drawPolygon(decimalPlaces) {
    centerPolygon();
    
    game.chain.forEach(p => p.draw());

    for (let i = 1; i < game.chain.length; i++) {
        let current = game.chain[i];
        let previous = game.chain[i - 1];

        current.drawSegmentTo(previous);
        drawLabel(current, previous, String(round(current.distance(previous) * 10 ** decimalPlaces)));
    }

    let first = game.chain[0];
    let last = game.chain[game.chain.length - 1];

    first.drawSegmentTo(last);
    drawLabel(first, last, String(round(first.distance(last)  * 10 ** decimalPlaces)));

    let polygon = evalCommandGetLabels(`{Polygon(${game.chain.join(",")})}`);
    setColor(polygon, 186, 102, 255);
    setFixed(polygon, 1, 0);
}

function drawAngles() {
    let points = ["A", "B", "C", "D"];

    for (let i = 0; i < 4; i++) {
        angle = evalCommandGetLabels(`Angle(${points[(i + 2) % 4]}, ${points[(i + 1) % 4]}, ${points[i]})`);
        setLabelVisible(angle, 0);
        setColor(angle, 186, 102, 255);
        setFixed(angle, 1, 0);
    }     
}

function isDegenerate(chain) {
    return chain[0].x === chain[1].x || chain[1].y === chain[2].y;
}

function getPolygon(decimalPlaces) {
    let width = decimalPlaces ? Math.floor(Math.random() * 90) + 10 : Math.floor(Math.random() * 10);
    let height = decimalPlaces ? Math.floor(Math.random() * 90) + 10 : Math.floor(Math.random() * 10);
    return [
        new Point(0, 0), 
        new Point(decimalPlaces ? width / 10 : width, 0), 
        new Point(decimalPlaces ? width / 10 : width, decimalPlaces ? height / 10: height), 
        new Point(0, decimalPlaces ? height / 10: height)
    ];
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

function round(value, decimalPlaces=0) {
    return Math.round(value * 10 ** (decimalPlaces + 1) / 10 ** (decimalPlaces + 1));
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
        setColor(p, 186, 102, 255);
        setPointStyle(p, 0);
        setLabelVisible(p, false);
        setFixed(p, 1, 0);
    }

    drawSegmentTo(point) {
        let s = evalCommandGetLabels(`Segment((${this.x},${this.y}), (${point.x},${point.y}))`);
        
        setColor(s, 186, 102, 255);
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

function drawLabel(p1, p2, text) {
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

    if (p1.x === p2.x) {
        if (game.wins > 4) {
            setCoords(label, p1.x - 0.15 * text.length + (p1.y > p2.y ? 0.5 : -0.7), (p1.y + p2.y) / 2 - 0.2);
        } else {
            setCoords(label, p1.x - 0.15 * text.length + (p1.y > p2.y ? 0.3 : -0.4), (p1.y + p2.y) / 2 - 0.2);
        }
    } else {
        setCoords(label, (p1.x + p2.x) / 2 - 0.15 * text.length, p2.y + (p1.x < p2.x ? 0.2 : -0.8));
    }
}