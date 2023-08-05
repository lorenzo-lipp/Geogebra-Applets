let { setValue, getXcoord, getYcoord, reset } = ggbApplet;

let game = {
    regions: [
        {x: 0, y: 1.55, coin: 1},
        {x: -0.65, y: 0.45, coin: 2},
        {x: 0.65, y: 0.45, coin: 3},
        {x: -1.3, y: -0.7, coin: 4},
        {x: 1.3, y: -0.7, coin: 5},
        {x: 0, y: -0.7, coin: 6},
        {x: -1.95, y: -1.85, coin: 7},
        {x: -0.65, y: -1.85, coin: 8},
        {x: 0.65, y: -1.85, coin: 9},
        {x: 1.95, y: -1.85, coin: 10},
        {x: -2.6, y: -3, coin: 11},
        {x: -1.3, y: -3, coin: 12},
        {x: 0, y: -3, coin: 13},
        {x: 1.3, y: -3, coin: 14},
        {x: 2.6, y: -3, coin: 15}
    ],
    coins: 15
}

function ggbOnInit() {}

function insideRegion(center, point) {
    return Math.sqrt(Math.pow(center.x - point.x, 2) + Math.pow(center.y - point.y, 2)) <= 0.5;
}

function check() {
    let coins = {
        wasMoved: Array(15),
        positions: Array(15),
        lowerMost: { x: null, y: Infinity, coin: null }
    };

    for (let [index, region] of game.regions.entries()) {
        let x = getXcoord("M" + region.coin);
        let y = getYcoord("M" + region.coin);
        
        if (coins.lowerMost.y > y) {
            coins.lowerMost.x = x;
            coins.lowerMost.y = y;
            coins.lowerMost.coin = region.coin;
        }

        coins.positions[index] = { x, y };
        coins.wasMoved[index] = insideRegion(region, coins.positions[index]);
    }

    if (coins.wasMoved.reduce((a, b) => a + b) !== 10) return setValue("ok", 0);
    
    for (let row = 2; row <= 5; row++) {
        for (let i = 0; i < row; i++) {
            let x = coins.lowerMost.x + 1.3 * i;
            let y = coins.lowerMost.y + 1.15 * (row - 1);

            if (row % 2 == 0) x -= 0.65 * (row - 1);
            else x -= 1.3 * ((row - 1) / 2);

            if (!coins.positions.find(position => insideRegion({ x, y }, position))) {
                return setValue("ok", 0);
            };
        }
    }
    
    return setValue("ok", 1);
}

function onMove() { setValue("ok", undefined) }

function restart() { reset(); }