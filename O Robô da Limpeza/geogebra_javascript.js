var g = ggbApplet
var allPaths = {
    'a_1defn': 1,
    'a_1ff_1nq': 2,
    'gii_1q_1s_1': 3,
    'gg_1k_1q_1s_1': 4,
    'fnn_1qs_1': 5,
    'gin_1ss_1': 6,
    'a_1f_1gis': 7,
    'fhi_1q_1s_1': 8,
    'fhn_1ss_1': 9,
    'a_1ff_1hs': 10 
}
var path = {}

function move(i, direction, signal) {
    if (g.getValue("Counter") != 10) {
        setTimeout(function () {
            if (i < 10) {
                g.setValue(`Robo${direction}`, g.getValue(`Robo${direction}`) + 0.24 * signal)
                move(i + 1, direction, signal)
            }
            else {
                if (geogebraRound("RoboX") == 4.08 && geogebraRound("RoboY") == -0.1 || geogebraRound("RoboX") == 2.88 && geogebraRound("RoboY") == -1.3) {
                    resetPosition()
                }
            }
        }, 70)
    }
}

function geogebraRound(num) {
    return Math.round(g.getValue(num) * 100) / 100
}

function color(obj) {
    if (g.getValue("Counter") != 10) {
        path[obj] = 1
        g.setColor(obj, 255, 0, 0)
    }
}

function resetPosition() {
    setTimeout(() => {
        g.setValue("RoboX", -3.12)
        g.setValue("RoboY", 3.5)
        for (let key in path) {
            g.setColor(key, 220, 245, 250)
        }
    }, 1000)
    showPath()
}

function showPath(i = 0) {
    let answer = allPaths[Object.keys(path).sort().join('')]
    if (i < 10) {
        if (answer == "ok") {
            g.setVisible("jaFoi", 1)
            setTimeout(() => {
                g.setVisible("jaFoi", 0)
                path = {}
            }, 1300)
        }
        else if (answer == undefined) {
            g.setVisible("andouMuito", 1)
            setTimeout(() => {
                g.setVisible("andouMuito", 0)
                path = {}
            }, 1300)
        }
        else {
            g.setVisible(`IMG${answer}`, 1)
            g.setFilling(`IMG${answer}`, (i + 1) / 10)
            setTimeout(() => {showPath(i + 1)}, 100)
        }
    }
    else {
        g.setValue("Counter", g.getValue("Counter") + 1)
        allPaths[Object.keys(path).sort().join('')] = "ok"
        path = {}
    }
}