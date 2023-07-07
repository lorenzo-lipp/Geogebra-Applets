let { setValue, getXcoord, getYcoord, reset } = ggbApplet;

let game = {
    regions: [
        {x: -2.05, y: -0.5, coins: [1, 7, 10]},
        {x: -0.6, y: -0.5, coins: [2]},
        {x: 0.85, y: -0.5, coins: [3]},
        {x: 2.3, y: -0.5, coins: [1, 7, 10]},
        {x: -1.4, y: -1.95, coins: [4]},
        {x: 0.1, y: -1.95, coins: [5]},
        {x: 1.6, y: -1.95, coins: [6]},
        {x: -0.6, y: -3.35, coins: [8]},
        {x: 0.9, y: -3.35, coins: [9]},
        {x: 0.1, y: -4.75, coins: [1, 7, 10]}
    ],
    coins: 10
}

function ggbOnInit() {}

function insideRegion(center, point) {
    return Math.sqrt(Math.pow(center.x - point.x, 2) + Math.pow(center.y - point.y, 2)) <= 0.5;
}

function check() {
    for (let region of game.regions) {
        let hasCoin = false;

        for (let coin of region.coins) {
            let x = getXcoord("M" + coin);
            let y = getYcoord("M" + coin);

            if (insideRegion(region, { x, y })) {
                hasCoin = true;
                break;
            }
        }

        if (!hasCoin) return setValue("ok", 0);
    }

    return setValue("ok", 1);
}

function onMove() { setValue("ok", undefined) }

function restart() { reset(); }