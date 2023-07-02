let { setValue, setCoords, getXcoord, getYcoord, setTextValue } = ggbApplet;

let game = {
    candys: [2, 3, 4, 5, 6],
    points: [
        ["K", "L", 0.44],
        ["M", "N", 1.72],
        ["I", "J", 3],
        ["O", "P", 4.2],
        ["G", "H", 5.41]
    ],
    leftGirl: [-1.5, -1.5],
    rightGirl: [8.8, -1.5],
    pointsY: -6.1,
    pointsDistance: 1.6,
    frameTime: 75
}

function ggbOnInit() { restart(); }

function check() {
    let leftGirlSum = 0;
    let rightGirlSum = 0;

    for (let i = 0; i < 5; i++) {
        let jar = `Jar${i + 1}Center`;
        if (distance(game.leftGirl, [getXcoord(jar), getYcoord(jar)]) < 4) leftGirlSum += game.candys[i];
        else rightGirlSum += game.candys[i];
    }

    animateEnd(Number(leftGirlSum === rightGirlSum));
}

function newGame() {
    game.candys = getNewCandys().sort((a, b) => a - b);
    restart();
}

function getNewCandys() {
    let girlA = { candys: [], numCandys: Math.random() > 0.8 ? 1 : 2, totalSum: 0 };
    let girlB = { candys: Array(5 - girlA.numCandys).fill(1), totalSum: 5 - girlA.numCandys };

    for (let i = 0; i < girlA.numCandys; i++) { 
        let jar = girlA.numCandys === 1 ? Math.floor(Math.random() * 2) + 5 : Math.floor(Math.random() * 6) + 1;
        if (girlA.candys[0] === 1 && jar === 1) {
            jar += Math.floor(Math.random() * 5) + 1;
        }
        girlA.candys.push(jar);
        girlA.totalSum += jar;
    }

    while(girlB.totalSum !== girlA.totalSum) {
        let availableJars = [];
        girlB.candys.forEach((v, i) => { if (v !== 6) availableJars.push(i); });
        let jar = availableJars[Math.floor(Math.random() * availableJars.length)];
        
        girlB.candys[jar]++;
        girlB.totalSum++;
    }

    return girlA.candys.concat(girlB.candys);
}

function distance(a, b) {
    return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}

function restart() {
    for (let point of game.points) {
        setCoords(point[0], point[2], game.pointsY);
        setCoords(point[1], point[2] + game.pointsDistance, game.pointsY);
    }
    for (let [index, candy] of game.candys.entries()) setValue("jar" + (index + 1), candy);
    setValue("ok", undefined);
}

async function animateEnd(checkResult) {
    let letters = 0;
    let text = checkResult === 1 ? "Parabéns!" : "Há algo errado...";
    let textName = checkResult === 1 ? "texto2" : "texto3";

    while (letters <= text.length) {
        if (letters === 0) {
            setTextValue(textName, "");
            setValue("ok", checkResult);
        }

        await sleep(game.frameTime);

        setTextValue(textName, text.substring(0, ++letters));
    }
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }