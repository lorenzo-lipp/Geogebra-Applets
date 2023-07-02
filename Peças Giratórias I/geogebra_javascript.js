let { setValue, setTextValue } = ggbApplet;

let game = {
    numbers: [
        [4, 2, 7, 8, 5],
        [10, 11, 6, 10, 8],
        [18, 15, 12, 14, 20]
    ],
    rotations: [0, 0, 0],
    isAnimating: false,
    frames: 8,
    frameTime: 75,
    polygonEdges: 5
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

    game.rotations[polygon - 1] = (game.rotations[polygon - 1] + 1) % 5;
    game.isAnimating = false;
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function check() {
    if (game.isAnimating) return;
    for (let i = 0; i < game.polygonEdges; i++) {
        let acc = 0;
        for (let j = 0; j < 3; j++) acc += game.numbers[j][(game.polygonEdges + i + game.rotations[j]) % game.polygonEdges];
        if (acc !== 30) return setValue("ok", 0); 
    }
    setValue("ok", 1);
}

function restart() {
    setValue("ok", undefined);
}

function newGame() {
    for (let i = 0; i < game.polygonEdges; i++) {
        game.numbers[0][i] = Math.floor(Math.random() * 31);
        game.numbers[1][i] = Math.floor(Math.random() * (31 - game.numbers[0][i]));
        game.numbers[2][i] = 30 - game.numbers[0][i] - game.numbers[1][i];
    }

    for (let i = 0; i < 3; i++) {
        let rotations = Math.floor(Math.random() * 4);
        game.numbers[i] = game.numbers[i].slice(rotations).concat(game.numbers[i].slice(0, rotations));
        game.numbers[i].forEach((value, index) => setTextValue(`p${i + 1}n${index + 1}`, value >= 10 ? String(value) : " " + value))
    }

    game.rotations = [0, 0, 0];
    setValue("angle1", 0);
    setValue("angle2", 0);
    setValue("angle3", 0);
    restart();
}