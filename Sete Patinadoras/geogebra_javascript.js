let g = ggbApplet;
let positions = [8.45, 6.3, 4.2, 2.1, 0, -2.1, -4.2];
let skaters = ['Red', 'Blue', 'Yellow', 'White', 'Black', 'Pink', 'Green'];
let running = false;

function ggbOnInit() {
    restart();
}

function start(time = g.getValue("time")) {
    if (time <= 0) return (() => {
        g.stopAnimation();
        check();
    })();
    
    g.setAnimating("movimento", true);
    running = true;
    g.startAnimation();

    setTimeout(() => changePositions(time), 1600);
}

function changePositions(time) {
    let first = skaters.shift();
    skaters.push(first);
    freeze(first, true);
    distances = {
        [skaters[6]]: -0.4215,
        [skaters[0]]: 0.0715,
        [skaters[1]]: 0.07,
        [skaters[2]]: 0.07,
        [skaters[3]]: 0.07,
        [skaters[4]]: 0.07,
        [skaters[5]]: 0.07
    }
    return animate(0, distances, () => {
        start(time - 1);
        freeze(skaters[6], false);
    });
}

function animate(iteration, distances, callback) {   
    if (iteration === 30) {
        for (let [i, key] of skaters.entries()) {
            g.setValue(key + "X", positions[i]);
        }
        return callback();
    }

    for (let [i, key] of skaters.entries()) {
        g.setValue(key + "X", positions[(i + 1) % 7] + (iteration + 1) * distances[key]);
    }

    setTimeout(() => {animate(iteration + 1, distances, callback)}, 75);
}

function freeze(skater, bool) {
    if (bool) g.setValue("minutes", g.getValue("minutes") + 1);
    g.setValue("freeze" + skater, bool);
    g.setLayer("fig" + skater + "1", bool ? 2 : 1);
}

function select(skater) {
    if (running) return;
    g.evalCommand(`SelectedPoint = (${skater}X + 1.66, -2.35)\nSelectObjects()`);
    g.setTextValue("Selected", skater);
}

function restart() {
    skaters = ['Red', 'Blue', 'Yellow', 'White', 'Black', 'Pink', 'Green'];
    running = false;

    for (let [i, key] of skaters.entries()) {
        g.setValue(key + "X", positions[i]);
    }

    g.setValue("minutes", 0);
    g.setValue("start", false);
    g.setValue("ok", undefined);
    g.setValue("movimento", 1);
    return g.setTextValue("Selected", "");
}

function check() {
    if (g.getValueString("Selected") === skaters[0]) {
        return g.setValue("ok", 1);
    }

    return g.setValue("ok", 0);
}

function newGame() {
    let time = Math.floor(Math.random() * 15) + 1;
    
    restart();
    g.setValue("time", time);
    g.setColor("texto4", 255, 0, 0);
    setTimeout(() => g.setColor("texto4", 0, 0, 0), 500);
}