let g = ggbApplet;
let squares =  [["A", "B", "C"], 
                ["D", "E", "F"]];
let initialValues = {
    "A": 1,
    "B": 1,
    "C": 6,
    "D": 1,
    "E": 6,
    "F": 1
}
let totalTimeouts;
let timeoutEnds;

function ggbOnInit() {}

function rotate() {
    let selected = g.getValueString("selected");
    let obj = selected[1];
    let squaresToRotate = new Set();
    
    getRow(obj).forEach(v => squaresToRotate.add(v));
    getColumn(obj).forEach(v => squaresToRotate.add(v));
    select(selected);
    increment("jogadas");

    squaresToRotate = Array.from(squaresToRotate);
    totalTimeouts = squaresToRotate.length;
    timeoutEnds = 0;
    squaresToRotate.forEach(v => {
        let value = g.getValue("Quadrado" + v);
        changeValue("Quadrado" + v, value);
    });
}

function changeValue(obj, value, direction) {
    if (direction === undefined) {
        if (value === 6) direction = -1;
        else if (value === 1) direction = 1;
    }
    
    if (direction === -1 && value > 1 || direction === 1 && value < 6) {
        setTimeout(() => {
            let newValue = value + direction
            g.setValue(obj, newValue);
            changeValue(obj, newValue, direction);
        }, 100);
    } else {
        timeoutEnds++;
        if (timeoutEnds === totalTimeouts) check();
    }
}

function select(obj) {
    g.evalCommand("SelectObjects()");
    if (g.getValue("jogadas") < 2) {
        let selected = g.getValueString("selected");
        g.setLineThickness(selected, 0);
        if (selected !== obj) {
            g.setTextValue("selected", obj);
            g.setLineThickness(obj, 13);
        } else {
            g.setTextValue("selected", "");
        }
    }
}

function getRow(element) {
    return squares.find(v => v.includes(element));
}

function getColumn(element) {
    let index = getRow(element).indexOf(element);
    return squares.map(v => v[index]);
}

function reset() {
    g.setTextValue("selected", "");
    Object.keys(initialValues).forEach(v => g.setValue("Quadrado" + v, initialValues[v])); 
    g.setValue("jogadas", 0);
    g.setValue("ok", undefined);
}

function increment(obj) {
    g.setValue(obj, g.getValue(obj) + 1);
}

function check() {
    if (g.getValue("jogadas") === 2) {
        let value;
        let winGame = true;

        squares.flat().forEach(v => {
            if (value === undefined) value = g.getValue("Quadrado" + v);
            else if (value !== g.getValue("Quadrado" + v)) winGame = false;
        });

        g.setValue("ok", Number(winGame));
    }
}

function newGame() {
    let value = Math.random() > 0.5 ? 1 : 6;
    let keys = Object.keys(initialValues);
    let randomValues = [];

    randomValues.push(keys[Math.floor(Math.random() * keys.length)]);
    let nextKeys = keys.filter(v => {
        if (randomValues[0] === "A" && v === "F") return false;
        if (randomValues[0] === "F" && v === "A") return false;
        if (randomValues[0] === "D" && v === "C") return false;
        if (randomValues[0] === "C" && v === "D") return false;
        return v !== randomValues[0];
    });
    randomValues.push(nextKeys[Math.floor(Math.random() * nextKeys.length)]);

    let rows = [getRow(randomValues[0]), getRow(randomValues[1])];
    let columns = [getColumn(randomValues[0]), getColumn(randomValues[1])];
    let squaresToRotate =  [Array.from(new Set(rows[0].concat(columns[0]))), 
                            Array.from(new Set(rows[1].concat(columns[1])))];

    keys.forEach(v => initialValues[v] = value);
    squaresToRotate[0].forEach(v => initialValues[v] = initialValues[v] === 1 ? 6 : 1);
    squaresToRotate[1].forEach(v => initialValues[v] = initialValues[v] === 1 ? 6 : 1);
    reset();
}