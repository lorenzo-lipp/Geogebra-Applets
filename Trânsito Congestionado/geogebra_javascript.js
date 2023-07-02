let { setValue, getValue, setVisible, evalCommand, registerClientListener } = ggbApplet;
let game = {
    positions: {
        "1": { x: -2.1, y: -1.85 },
        "2": { x: -0.28, y: -1.85 },
        "3": { x: 1.5, y: -1.85 },
        "4A": { x: 3.3, y: -1.85 },
        "4B": { x: 3.3, y: -3.05 },
        "5": { x: 5.2, y: -1.85 },
        "6": { x: 7.02, y: -1.85 },
        "7": { x: 8.8, y: -1.85 },
        "endLeft": { x: -4.4, y: -1.85 },
        "endRight": { x: 10.8, y: -1.85 }
    },
    frames: 8,
    frameTime: 75,
    carPositions: {
        1: "2",
        2: "3",
        3: "6",
        4: "5"
    },
    carPointsTo: {
        1: "right",
        2: "right",
        3: "left",
        4: "left"
    },
    isAnimating: false
}

function ggbOnInit() { 
    restart();
}

function move(to) {
    game.isAnimating = true;
    updateMovements(null);
    let carNum = getValue("selected");
    for (let i = 0; i < game.frames; i++) {
        setTimeout(() => {
            let percent = (i + 1) / game.frames;
            let { x, y } = getAnimation(game.carPositions[carNum], to, percent);
            setValue(`Car${carNum}X`, x);
            setValue(`Car${carNum}Y`, y);
            if (percent === 1) handleEndMove(carNum, to);
        }, game.frameTime * i);
    }
}

function handleEndMove(carNum, to) {
    game.carPositions[carNum] = to;
    if (game.carPointsTo[carNum] === "left" && to === "1") return move("endLeft");
    if (game.carPointsTo[carNum] === "right" && to === "7") return move("endRight");
    setValue("selected", 0);
    check();
}

function getPossibleMoves(carNum) {
    let carPosition = game.carPositions[carNum];

    let isThereACarAt = {};
    for (let car in game.carPositions) isThereACarAt[game.carPositions[car]] = true;
    
    const removeUnreachable = (arr) => arr.filter(v => (v === "4B" || carPosition === "4B") && isThereACarAt["4A"] ? false : !isThereACarAt[v]);

    switch(carPosition) {
        case "1": return removeUnreachable(["2"]);
        case "2": return removeUnreachable(["1", "3"]);
        case "3": return removeUnreachable(["2", "4A", "4B"]);
        case "4A": case "4B": return removeUnreachable(["3", "5"]);
        case "5": return removeUnreachable(["4A", "4B", "6"]);
        case "6": return removeUnreachable(["5", "7"]);
        case "7": return removeUnreachable(["6"]);
    }
}

function updateMovements(carNum) {
    let possibleMoves = carNum !== null ? getPossibleMoves(carNum) : [];
    let pointsToLeft = game.carPointsTo[carNum] === "left";
    let pointsToRight = !pointsToLeft;

    for (let pos in game.positions) {
        if (pos === "endLeft" || pos === "endRight") continue;
        let canMoveToPos = possibleMoves.includes(pos);
        setVisible(`Pos${pos}Left`, pointsToLeft && canMoveToPos);
        setVisible(`Pos${pos}Right`, pointsToRight && canMoveToPos);
    }
}

function check() {
    game.isAnimating = false;
    for (let carNum in game.carPositions) {
        let carPosition = game.carPositions[carNum];
        if (carPosition !== "endRight" && carPosition !== "endLeft") return;
    }
    setValue("ok", 1);
    setValue("selected", 0);
}

function select(carNum) { 
    if (game.isAnimating) return;
    if (getValue("selected") === carNum) {
        setValue("selected", 0);
        updateMovements(null);
    } else {
        setValue("selected", carNum);
        updateMovements(carNum);
    }
}

function restart() {
    game.carPositions = {
        1: "2",
        2: "3",
        3: "6",
        4: "5"
    };

    for (let carNum in game.carPositions) {
        let { x, y } = game.positions[game.carPositions[carNum]];
        setValue(`Car${carNum}X`, x);
        setValue(`Car${carNum}Y`, y);
    }

    setValue("ok", 0);
    setValue("selected", 0);
    updateMovements(null);
}

function getAnimation(from, to, percent) {
    let x, y;
    let animationName = `${from}-${to}`;
    switch(animationName) {
        case "4B-5":
            if (percent < 0.51) {
                x = 0.8 * Math.pow(percent, 3) + 1.29 * percent + 3.3;
                y = -1.29 * Math.pow(percent, 3) + 2.18 * percent - 3.05;
            } else {
                x = -0.84 * Math.pow(percent, 3) + 2.52 * Math.pow(percent, 2) + 3.52;
                y = 1.36 * Math.pow(percent, 3) - 4.07 * Math.pow(percent, 2) + 4.27 * percent - 3.41;
            }
            return { x, y };
        case "5-4B":
            return getAnimation("4B", "5", 1 - percent);
        case "3-4B": 
            if (percent < 0.5) {
                x = -0.66 * Math.pow(percent, 3) + 2.3 * percent + 1.5;
                y = -0.99 * Math.pow(percent, 3) - 0.46 * percent - 1.85;
            } else { 
                x = 0.67 * Math.pow(percent, 3) - 2 * Math.pow(percent, 2) + 3.3 * percent + 1.33;
                y = Math.pow(percent, 3) - 2.99 * Math.pow(percent, 2) + 1.05 * percent - 2.1;
            }
            return { x, y };
        case "4B-3":
            return getAnimation("3", "4B", 1 - percent);
        default: 
            x = game.positions[from].x + (game.positions[to].x - game.positions[from].x) * percent;
            y = game.positions[from].y + (game.positions[to].y - game.positions[from].y) * percent;
            return { x, y };
    }
}