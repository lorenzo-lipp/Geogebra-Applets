let { setValue, setCoords, setFilling } = ggbApplet;

let game = {
    left: {
        x: 1.2,
        y: -1.65,
        point: null
    },
    right: {
        x: 5.05,
        y: -1.65,
        point: null
    },
    outside: {
        x: 17.44, 
        y: -2.85
    },
    smallClusters: 3,
    mediumLargeClusters: 3,
    mediumSmallClusters: 3,
    bigClusters: 7,
    count: [30, 22, 5],
    initialCount: [30, 22, 5],
    answer: 0,
    speed: 1
}

function ggbOnInit() { }

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function rotateAround(angle, start, destination) {
    let radAngle = angle * (Math.PI / 180);
    let anchorPoint = { x: start.x + (destination.x - start.x) / 2, y: start.y };

    return {
        x: Math.cos(radAngle) * (start.x - anchorPoint.x) - Math.sin(radAngle) * (start.y - anchorPoint.y) + anchorPoint.x,
        y: Math.sin(radAngle) * (start.x - anchorPoint.x) + Math.cos(radAngle) * (start.y - anchorPoint.y) + anchorPoint.y
    }
}

function getRandomCluster(type) {
    let amount = game[type + "Clusters"];
    let num = Math.floor(Math.random() * amount) + 1;

    return getClusterPoint(type, num);
}

function getClusterPoint(type, num) {
    switch(type) {
        case "small": return "Cluster" + num + "Small";
        case "big": return "Cluster" + num + "Big";
        case "mediumLarge": return "Cluster" + num + "Medium";
        case "mediumSmall": return "Cluster" + (num + game.mediumLargeClusters) + "Medium";
    }
}

async function exchangeAll() {
    setValue("ok", -1);

    while (game.count[0] >= 7 || game.count[1] >= 5) {
        if (game.count[0] >= 7) {
            game.left.point = getRandomCluster("small");
            game.right.point = getRandomCluster("mediumSmall");
            game.count[0] -= 7;
            game.count[1] += 4;
            setValue("tradeText", 1);
        } else {
            game.left.point = getRandomCluster("mediumLarge");
            game.right.point = getRandomCluster("big");
            game.count[1] -= 5;
            game.count[2] += 2;
            setValue("tradeText", 2);
        }

        await runAnimations();
    }

    check();
}

async function runAnimations() {
    bringClusters();
    await fadeIn();
    await sleep(2000 / game.speed);
    await animateExchange();
    setValue("tradeText", 0);
    updateCount();
    await sleep(1000 / game.speed);
    await fadeOut();
    returnClusters();
    await sleep(1000 / game.speed);
}

async function animateExchange() {
    let step = 0.035;
    
    for (let percent = step; percent <= 1; percent = Math.min(1, percent + step)) {
        let rotationLeft = rotateAround(-180 * percent, game.left, game.right);
        let rotationRight = rotateAround(-180 * percent, game.right, game.left);

        setCoords(game.left.point, rotationLeft.x, rotationLeft.y);
        setCoords(game.right.point, rotationRight.x, rotationRight.y);
        await sleep(40 / game.speed);
        
        if (percent === 1) break;
    }
}

async function fadeIn() {
    let step = 0.05;
    
    for (let percent = 0; percent <= 1; percent = Math.min(1, percent + step)) {
        setFilling("q1", 1 - percent);
        await sleep(35 / game.speed);
        
        if (percent === 1) break;
    }
}

async function fadeOut() {
    let step = 0.05;
    
    for (let percent = 0; percent <= 1; percent = Math.min(1, percent + step)) {
        setFilling("q1", percent);
        await sleep(30 / game.speed);
        
        if (percent === 1) break;
    }
}

function bringClusters() {
    setCoords(game.left.point, game.left.x, game.left.y);
    setCoords(game.right.point, game.right.x, game.right.y);
}

function returnClusters() {
    setCoords(game.left.point, game.outside.x, game.outside.y);
    setCoords(game.right.point, game.outside.x, game.outside.y);
}

function updateCount() {
    setValue("countSmall", game.count[0]);
    setValue("countMedium", game.count[1]);
    setValue("countBig", game.count[2]);
}

function updateInitialCount() {
    setValue("initialSmall", game.initialCount[0]);
    setValue("initialMedium", game.initialCount[1]);
    setValue("initialBig", game.initialCount[2]);
}

function setAnswer(value) {
    game.answer = value;
}

function getRandomKid() {
    setValue("kid", Math.floor(Math.random() * 5) + 1);
}

function newGame() {
    game.initialCount = [
        Math.floor(Math.random() * 36) + 2,
        Math.floor(Math.random() * 36) + 2,
        Math.floor(Math.random() * 10) + 2
    ];

    getRandomKid();
    updateInitialCount();
    restart();
}

function restart() {
    game.count = [...game.initialCount];

    updateCount();
    setAnswer(0);
    setValue("answer", 0);
    setValue("ok", undefined);
    setSpeed(1);
}

function check() {
    if (game.count[2] === game.answer) return setValue("ok", 1);
    setValue("ok", 0);
}

function setSpeed(val) { 
    game.speed = val;
    setValue("speed", val);
}