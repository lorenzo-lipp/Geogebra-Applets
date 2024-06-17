let {
    registerClickListener,
    setTextValue,
    deleteObject,
    evalCommand,
    setFixed,
    setColor,
    setLayer,
    setLineStyle,
    setLineThickness,
    getValueString,
    getCommandString,
    setPointSize,
    getValue,
    getLineStyle,
    exists,
    setValue
} = ggbApplet;

let game = {
    drawings: {
        1: {
            points: {
                C: [3.46, -3.24],
                D: [1.96, -1.99],
                E: [2.52, -0.27],
                F: [4.22, -0.35],
                G: [4.96, -2.14],
                H: [4.96, 1.89],
                I: [3.44, 3.29],
                J: [2.02, 1.89],
                K: [0.66, 0.91],
                L: [-1.14, 0.09],
                M: [-0.18, -1.91],
                N: [-0.12, -2.99],
                O: [0.21, -5.39],
                P: [2.52, -5.29],
                Q: [3.6, -5.23],
                R: [6.17, -5.6],
                S: [6.7, -2.79],
                T: [6.88, -1.83],
                U: [8.12, 0.13],
                V: [6, 1.17]
            },
            lines: [
                ["O", "N"],
                ["N", "D"],
                ["D", "M"],
                ["M", "L"],
                ["L", "K"],
                ["E", "J"],
                ["K", "E"],
                ["J", "I"],
                ["E", "D"],
                ["I", "H"],
                ["D", "C"],
                ["H", "F"],
                ["C", "G"],
                ["F", "V"],
                ["G", "F"],
                ["V", "U"],
                ["F", "E"],
                ["U", "T"],
                ["T", "G"],
                ["G", "S"],
                ["S", "R"],
                ["R", "Q"],
                ["Q", "C"],
                ["C", "P"],
                ["P", "O"]
            ],
            color: [255, 51, 102]
        },
        2: {
            points: {
                C: [0.13, -5.63],
                D: [2.27, -5.64],
                E: [2.27, -3.18],
                F: [4.64, -3.2],
                G: [4.65, -5.67],
                H: [6.78, -5.65],
                I: [6.78, 0.12],
                J: [0.14, 0.13],
                K: [3.46, 3.19],
                L: [4.73, 2.04],
                M: [4.73, 2.87],
                N: [6, 2.86],
                O: [5.99, 0.87]
            },
            lines: [
                ["J", "K"],
                ["K", "L"],
                ["L", "M"],
                ["M", "N"],
                ["N", "O"],
                ["O", "I"],
                ["I", "H"],
                ["H", "G"],
                ["G", "F"],
                ["F", "E"],
                ["E", "D"],
                ["D", "C"],
                ["C", "J"],
                ["J", "I"]
            ],
            color: [0, 153, 255]
        },
        3: {
            points: {
                C: [3.46, -5.43],
                D: [6.96, -3.72],
                E: [6.98, 0.27],
                F: [6.41, 2.73],
                G: [4.79, 0.8],
                H: [2.14, 0.79],
                I: [0.59, 2.75],
                J: [0.02, 0.36],
                K: [0.02, -3.71],
                L: [3.47, -3.32],
                M: [4.4, -1.86],
                N: [2.53, -1.86],
            },
            lines: [
                ["I", "H"],
                ["G", "H"],
                ["G", "F"],
                ["F", "E"],
                ["E", "D"],
                ["D", "C"],
                ["C", "K"],
                ["K", "J"],
                ["J", "I"],
                ["N", "L"],
                ["L", "M"],
                ["M", "N"],
                ["L", "C"]
            ],
            color: [255, 127, 0]
        }
    },
    animating: false
};

function ggbOnInit() {
    registerClickListener((obj) => {
        if (obj.length == 1 && !game.animating) animatePoint(obj, 5, 1);
    });

    draw(1);
    setTextValue("SelectedPoint", "");
}

function draw(num) {
    for (i = 0; i < 25; i++) {
        deleteObject(`line${i}`);
        deleteObject(`${Object.keys(game.drawings[1].points)[i]}`);
    }

    // Cria e fixa os pontos do desenho atual
    for (let key in game.drawings[num].points) {
        evalCommand(`${key} = (${game.drawings[num].points[key][0]}, ${game.drawings[num].points[key][1]})`);
        setFixed(key, 1, 1);
        setColor(key, ...game.drawings[num].color);
        setLayer(key, 3);
    }

    // Cria as linhas, colore, muda a grossura e coloca o estilo pontilhado
    game.drawings[num].lines.forEach((list, index) => {
        evalCommand(`line${index} = Segment(${list[0]}, ${list[1]})`);
        setColor(`line${index}`, ...game.drawings[num].color);
        setLineThickness(`line${index}`, 13);
        setLineStyle(`line${index}`, 1);
        setLayer(`line${index}`, 0);
        setFixed(`line${index}`, 1, 0);
    })
}

async function animatePoint(point) {
    let selectedPoint = getValueString("SelectedPoint");
    game.animating = true;

    // Procura o segmento de linha que contém os últimos dois pontos selecionados e troca o estilo da linha
    if (selectedPoint != "" && selectedPoint != point) {
        for (let i = 0; i < 25; i++) {
            let line = getCommandString(`line${i}`);

            if ([line[line.indexOf("(") + 1], line[line.indexOf(")") - 1]].includes(point) && [line[line.indexOf("(") + 1], line[line.indexOf(")") - 1]].includes(selectedPoint)) {
                setLineStyle(`line${i}`, 0);
                setLayer(`line${i}`, 2);
                break;
            }
        }
    }

    setTextValue("SelectedPoint", point);

    for (let size = 5, signal = 1; size + signal >= 5; size += signal) {
        setPointSize(point, size + signal);

        if (size == 9) signal = -1;

        await sleep(50);
    }
    

    await sleep(100);
    showPoints(point);
    game.animating = false;
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

// Procura os pontos com segmento em comum com o ponto selecionado e deixa eles visíveis
function showPoints(point) {
    let visible = [];
    let invisible = [];
    let num = getValue("desenho");

    for (let i = 0; i < 25; i++) {
        let line = getCommandString(`line${i}`);

        invisible.push(line[line.indexOf("(") + 1], line[line.indexOf(")") - 1]);

        if (getLineStyle(`line${i}`)) {
            if (line[line.indexOf("(") + 1] == point) visible.push(line[line.indexOf(")") - 1]);
            else if (line[line.indexOf(")") - 1] == point) visible.push(line[line.indexOf("(") + 1]);
        }
    }

    invisible.forEach(value => {
        setFixed(value, 1, 0);
        setColor(value, 200, 200, 200);
        setPointSize(value, 5);
    });

    visible.forEach(value => {
        setFixed(value, 1, 1);
        setColor(value, ...game.drawings[num].color);
        setPointSize(value, 7);
    });

    setColor(point, 255, 255, 153);

    if (visible.length == 0) check();
}

function check() {
    let num = getValue("desenho");

    for (let i = 0; i < 25; i++) {
        if (exists(`line${i}`) && getLineStyle(`line${i}`)) {
            setValue("ok", 0);
            return false;
        }
    }

    Object.keys(game.drawings[num].points).forEach(value => {
        setColor(value, ...game.drawings[num].color);
    })

    setValue("ok", 1);
}