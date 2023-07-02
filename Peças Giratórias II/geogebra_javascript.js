let { setValue, setTextValue } = ggbApplet;

let game = {
    numbers: [
        [11, 5, 7, 3, 4, 9],
        [29, 23, 17, 19, 11, 17],
        [37, 21, 30, 25, 25, 35],
        [53, 50, 37, 39, 42, 51]
    ],
    rotations: [0, 0, 0, 0],
    isAnimating: false,
    frames: 8,
    frameTime: 75,
    polygonEdges: 6
}

function ggbOnInit() {}

async function animate(polygon) {
    if (game.isAnimating) return;
    let frame = 1;
    game.isAnimating = true;
    
    while (frame <= game.frames) {
        setValue("angle" + polygon, (frame / game.frames + game.rotations[polygon - 1]) * 2 * Math.PI / game.polygonEdges);
        frame++;
        await sleep(game.frameTime);
    }

    game.rotations[polygon - 1] = (game.rotations[polygon - 1] + 1) % game.polygonEdges;
    game.isAnimating = false;
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function check() {
    if (game.isAnimating) return;
    for (let i = 0; i < game.polygonEdges; i++) {
        let acc = 0;
        for (let j = 0; j < 4; j++) acc += game.numbers[j][(game.polygonEdges + i + game.rotations[j]) % game.polygonEdges];
        if (acc !== 100) return setValue("ok", 0); 
    }
    setValue("ok", 1);
}

function restart() {
    setValue("ok", undefined);
}

function newGame() {
    for (let i = 0; i < game.polygonEdges; i++) {
        game.numbers[0][i] = Math.floor(Math.random() * 99) + 1;
        game.numbers[1][i] = Math.floor(Math.random() * (101 - game.numbers[0][i]));
        game.numbers[2][i] = Math.floor(Math.random() * (101 - game.numbers[1][i] - game.numbers[0][i]));
        game.numbers[3][i] = 100 - game.numbers[0][i] - game.numbers[1][i] - game.numbers[2][i];
    }

    for (let i = 0; i < 4; i++) {
        let rotations = Math.floor(Math.random() * 5);
        game.numbers[i] = game.numbers[i].slice(rotations).concat(game.numbers[i].slice(0, rotations));
        game.numbers[i].forEach((value, index) => setTextValue(`p${i + 1}n${index + 1}`, value >= 10 ? String(value) : " " + value))
    }

    game.rotations = [0, 0, 0, 0];
    setValue("angle1", 0);
    setValue("angle2", 0);
    setValue("angle3", 0);
    setValue("angle4", 0);
    restart();
}