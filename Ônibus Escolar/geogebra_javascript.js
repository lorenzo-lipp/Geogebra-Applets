let { setValue, setTextValue, getValue, getValueString } = ggbApplet;

let game = {
    bkgPosition: 51,
    bkgStep: 1,
    sleepTime: 55,
    intervals: [
        2, 
        1, 
        4, 
        3, 
        5, 
        4, 
        1, 
        2
    ],
    xMin: -3.85,
    xMax: 10.05,
    moveBus: true,
    framesElapsed: 0,
    visiblePlates: 0,
    startPlate: 0,
    stopPlate: 0,
    hidePlates: 0,
    platePoints: [
        -3.85, 
        -2.313, 
        -1.045, 
        1.027, 
        2.831, 
        5.172, 
        7.245, 
        8.513, 
        10.05
    ]
}

function ggbOnInit() {}

async function runBus() {
    let gabriel = getValue("gabriel");
    let clara = getValue("clara");

    if (gabriel >= clara) return;

    setValue("ok", 2);

    while(game.moveBus) {
        updatePlates();
        moveBackground();
        moveBusPoint();
        await sleep(game.sleepTime);
    }

    check();
}

function updatePlates() {
    let interval = game.intervals[game.visiblePlates];

    if (game.bkgPosition === 26 || game.bkgPosition === 0) {
        if (++game.hidePlates === interval) {
            game.visiblePlates++;
            game.hidePlates = 0;
            game.framesElapsed = 0;
            game.moveBus = game.visiblePlates !== game.stopPlate;
        }
    } else if (game.bkgPosition === 37 || game.bkgPosition === 11) { 
        let showPlate = game.hidePlates + 1 === interval;
        let showGirl = game.stopPlate === game.visiblePlates + 1;
        setValue("showPlate", showPlate);
        setValue("showGirl", showPlate && showGirl);
    }

    game.framesElapsed++;
}

function moveBackground() {
    setValue("backgroundShift", game.bkgPosition);
    game.bkgPosition = Math.round(((52 + game.bkgPosition - game.bkgStep) % 52) * 10) / 10; 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function arrangePlates() {
    let width = game.xMax - game.xMin - 8;
    let intervalSum = 0;

    for (let plate = 0; plate <= 8; plate++) {
        game.platePoints[plate] = game.xMin + plate + (intervalSum / 22) * width;
        intervalSum += game.intervals[plate];

        setValue(`plate${plate + 1}`, game.platePoints[plate]);
    }
}

function moveBusPoint() {
    let percent = game.framesElapsed / ((26 / game.bkgStep) * game.intervals[game.visiblePlates]);
    let lastPlatePoint = game.platePoints[game.visiblePlates];
    let platePointsDiff = game.platePoints[game.visiblePlates + 1] - lastPlatePoint;

    if (!isNaN(percent)) {
        setValue("busPosition", 0.375 + lastPlatePoint + platePointsDiff * percent);
    }
}

function moveClaraPoint() {
    setValue("claraPosition", 0.375 +  game.platePoints[game.stopPlate]);
}

function newGame() {
    let newIntervals = Array(8).fill(1);

    for (let n = 0; n < 14; n++) {
        let index = Math.floor(Math.random() * newIntervals.length);

        newIntervals[index]++;
    }

    for (let i = 0; i < newIntervals.length; i++) {
        setTextValue(`time${i + 1}`, newIntervals[i] + " min");
    }

    let startPoint = Math.floor(Math.random() * (newIntervals.length - 2));
    let endPoint = startPoint + 2 + Math.floor(Math.random() * (newIntervals.length - startPoint - 1));

    setTextValue("time0", newIntervals.slice(startPoint, endPoint).reduce(sum));

    game.intervals = newIntervals;
    arrangePlates();
    restart();
}

function sum(a, b) { return a + b }

function updateAnswer(kid, amount) {
    let oldValue = getValue(kid);
    let newValue = oldValue + amount;
    
    if (newValue > 9 || newValue < 1 || (kid === "gabriel" && newValue === 9)) return;

    setValue(kid, newValue);

    if (kid === "gabriel") {
        game.visiblePlates = newValue - 1;
        game.startPlate = game.visiblePlates;
        moveBusPoint();
    } else {
        game.stopPlate = newValue - 1;
        moveClaraPoint();
    }
}

function check() {
    let time = +getValueString("time0");
    let interval = game.intervals.slice(game.startPlate, game.stopPlate);

    if (time === interval.reduce(sum)) {
        setValue("ok", 1);
    } else {
        setValue("ok", 0);
        setTextValue("errorMessage", `Passaram-se ${interval.reduce(sum)} minutos do ponto ${game.startPlate + 1} ao ponto ${game.stopPlate + 1}`)
    }
}

function restart() {
    game.visiblePlates = 0;
    game.framesElapsed = 0;
    game.hidePlates = 0;
    game.startPlate = 0;
    game.stopPlate = 0;
    game.moveBus = true;
    
    moveBusPoint();
    moveClaraPoint();
    setValue("gabriel", 1);
    setValue("clara", 1);
    setValue("ok", undefined);
    setValue("showGirl", false);
}