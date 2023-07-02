let { registerClientListener, registerClickListener, getXcoord, getYcoord, getColor, setColor, evalCommand, setValue } = ggbApplet;
let selected = null;
let lastPosition = null;
let gray = [227, 227, 227];
let sticks = {
    blue: {
        value: 6,
        color: [0, 153, 255],
        lightColor: [91, 183, 244],
        command: 'B=(3.9,2)\nD=(4.3,2)\nE=(4.3, 3)\nF=(3.9, 3)',
        mainPoint: "B"
    },
    green: {
        value: 6,
        color: [0, 204, 0],
        lightColor: [91, 214, 91],
        command: 'G=(5,2)\nH=(5.4,2)\nI=(5.4,3)\nJ=(5,3)',
        mainPoint: "G"
    },
    red: {
        value: 6,
        color: [255, 26, 0],
        lightColor: [244, 107, 91],
        command: 'K=(3.9,0.5)\nL=(4.3,0.5)\nM=(4.3,1.5)\nN=(3.9,1.5)',
        mainPoint: "K"
    },
    yellow: {
        value: 6,
        color: [255, 239, 54],
        lightColor: [244, 234, 124],
        command: 'O=(5,0.5)\nP=(5.4,0.5)\nQ=(5.4,1.5)\nR=(5,1.5)',
        mainPoint: "O"
    }
}
let board = [
    { x: 0.5, y: 3, color: gray }, { x: 1.5, y: 3, color: gray }, { x: 2.5, y: 3, color: gray },
    { x: 0, y: 2.5, color: gray }, { x: 1, y: 2.5, color: gray }, { x: 2, y: 2.5, color: gray }, { x: 3, y: 2.5, color: gray },
    { x: 0.5, y: 2, color: gray }, { x: 1.5, y: 2, color: gray }, { x: 2.5, y: 2, color: gray },
    { x: 0, y: 1.5, color: gray }, { x: 1, y: 1.5, color: gray }, { x: 2, y: 1.5, color: gray }, { x: 3, y: 1.5, color: gray },
    { x: 0.5, y: 1, color: gray }, { x: 1.5, y: 1, color: gray }, { x: 2.5, y: 1, color: gray },
    { x: 0, y: 0.5, color: gray }, { x: 1, y: 0.5, color: gray }, { x: 2, y: 0.5, color: gray }, { x: 3, y: 0.5, color: gray },
    { x: 0.5, y: 0, color: gray }, { x: 1.5, y: 0, color: gray }, { x: 2.5, y: 0, color: gray },
]

function ggbOnInit() {
    registerClientListener(e => {
        if (e.type === 'select') selected = e.target;
        else if (e.type === 'movedGeos') {
            if (sticks[selected]) {
                let point = sticks[selected].mainPoint;
                let x = getXcoord(point);
                let y = getYcoord(point) + 0.5;
                let minDistance = Infinity;

                updateColors();

                if (x < 3.3 && x > -0.3 && y < 3.3 && y > -0.3) {
                    board.forEach((v, i) => {
                        let distance = getDistance(v, { x, y })
                        if (minDistance > distance) {
                            lastPosition = i;
                            minDistance = distance;
                        }
                    });
                    if (board[lastPosition].color === gray) setColor("s" + (lastPosition + 1), ...sticks[selected].lightColor);
                } else {
                    lastPosition = null;
                }
            }
        } else if (e.type === 'dragEnd') {
            if (sticks[selected]) {
                if (board[lastPosition] && board[lastPosition].color === gray) {
                    let stickColor = getStickByColor(board[lastPosition].color);

                    if (stickColor) sticks[stickColor].value++; 

                    board[lastPosition].color = sticks[selected].color;
                    sticks[selected].value--;

                    updateSticks();
                }
                updateColors();
                evalCommand(sticks[selected].command);
            }
        } else if (e.type === 'deselect') selected = null;
    });
    registerClickListener(e => {
        let arr = e.match(/s(\d+)/);

        if (arr) {
            let stickColor = getStickByColor(board[arr[1] - 1].color);
            board[arr[1] - 1].color = gray;
            
            if (stickColor) sticks[stickColor].value++;
            updateColors();
            updateSticks();
            setValue("ok", undefined);
        }
    });
    reset();
}

function getDistance(a, b) {
    return Math.sqrt(Math.abs(a.x - b.x) ** 2 + Math.abs(a.y - b.y) ** 2);
}

function getStickByColor(color) {
    return Object.keys(sticks).find(v => String(color) === String(sticks[v].color));
}

function updateSticks() {
    Object.keys(sticks).forEach(v => {
        setValue('count' + v, sticks[v].value);
    });
}

function updateColors() {
    board.forEach((v, i) => setColor("s" + (i + 1), ...v.color));
}

function toCamelCase(str) {
    return str[0].toUpperCase() + str.substring(1);
}

function reset() {
    Object.keys(sticks).forEach(v => {
        sticks[v].value = 6;
        evalCommand(sticks[v].command);
    });
    board.forEach(v => v.color = gray);
    
    updateColors();
    updateSticks();
    setValue("ok", undefined);
}

function check() {
    let isOk = true;

    for (let column = 0; column < 3; column++) {
        for (let row = 0; row < 3; row++) {
            let colors = [
                getColor("s" + (row + column * 7 + 1)),
                getColor("s" + (row + column * 7 + 4)),
                getColor("s" + (row + column * 7 + 5)),
                getColor("s" + (row + column * 7 + 8))
            ];

            if (colors.length !== new Set(colors).size) isOk = false;
            if (colors.includes('#E3E3E3')) isOk = false;
        }
    }

    setValue("ok", isOk);
}