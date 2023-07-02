var g = ggbApplet
var obj = {
    row: [-0.8, 1.95, 4.8],
    column: [-0.25, -2.55, -4.85],
}
var bird = {
    C: {row: 1,
        column: 0},
    K: {row: 2,
        column: 0},
    O: {row: 0,
        column: 0},
    E: {row: 2,
        column: 1},
    Q: {row: 1,
        column: 1},
    G: {row: 0,
        column: 1},
    M: {row: 0,
        column: 2},
    S: {row: 1,
        column: 2},
    I: {row: 2,
        column: 2}
}
var executing = false
var canClickButtons = true

var audioA = new Audio('https://drive.google.com/u/0/uc?id=1pAKP7kAtMp045KIFDF1SyIKCD_tMEBxy&export=download')
var audioB = new Audio('https://drive.google.com/u/0/uc?id=1dOl3kl1uehuG5Q6F_qkeoIh28NdXe5L2&export=download')
var audioC = new Audio('https://drive.google.com/u/0/uc?id=1xi9FKLGqOj6OStEPMHa23SP7AFHkxnV1&export=download')
var audioD = new Audio('https://drive.google.com/u/0/uc?id=1hOqPzYnQh4De1u4pp8EnFKs8diHZJtBL&export=download')

loadAudio()

function loadAudio() {
    setTimeout(function () {
        audioA = new Audio('https://drive.google.com/u/0/uc?id=1pAKP7kAtMp045KIFDF1SyIKCD_tMEBxy&export=download')
        audioB = new Audio('https://drive.google.com/u/0/uc?id=1dOl3kl1uehuG5Q6F_qkeoIh28NdXe5L2&export=download')
        audioC = new Audio('https://drive.google.com/u/0/uc?id=1xi9FKLGqOj6OStEPMHa23SP7AFHkxnV1&export=download')
        audioD = new Audio('https://drive.google.com/u/0/uc?id=1hOqPzYnQh4De1u4pp8EnFKs8diHZJtBL&export=download')
        loadAudio()
    }, 30000)
}

// Previne que, quando abrir no geogebra classroom, os pássaros estejam em local diferente do inicial
for (let key in bird) {
    g.setValue(key + "x", obj.row[bird[key].row])
    g.setValue(key + "y", obj.column[bird[key].column])
}

function animation([l, audio]) {
    if (!executing) {
        let oldObjects = []
        l.forEach((i, n) => {
            oldObjects.push(Object.assign({}, bird[i[1]]))
            move(l[n][0], l[n][1], 0)   
        })
        audio.currentTime = 0
        audio.volume = 0.3
        audio.play()
        oldObjects.forEach((value, index) => {bird[l[index][0]] = oldObjects[index]})
        g.setValue("apito", true)
    }
}

function getBirds(bell) {
    let list = [[0, 0], [0, 0], [0, 0], [0, 0]]
    let x;
    let y;
    let audio;

    if (bell == "A") {
        x = 0
        y = 0
        audio = audioA
    }
    else if (bell == "B") {
        x = 1
        y = 0
        audio = audioB
    }
    else if (bell == "C") {
        x = 1
        y = 1
        audio = audioC
    }
    else {
        x = 0
        y = 1
        audio = audioD
    }

    for (let key in bird) {
        if(bird[key].row == (0 + x) && bird[key].column == (0 + y)) {
            list[0][0] = key
            list[3][1] = key
        }
        else if (bird[key].row == (1 + x) && bird[key].column == (0 + y)) {
            list[0][1] = key
            list[1][0] = key
        }
        else if (bird[key].row == (1 + x) && bird[key].column == (1 + y)) {
            list[1][1] = key
            list[2][0] = key
        }
        else if (bird[key].row == (0 + x) && bird[key].column == (1 + y)) {
            list[2][1] = key
            list[3][0] = key
        }
    }

    return [list, audio]
}

function increment(value, number) {
    g.setValue(value, g.getValue(value) + number)
}

function move(start, final, i, l = []) {
    if (i == 0) {
        let stepX = -(obj.row[bird[start].row] - obj.row[bird[final].row]) / 10
        let stepY = -(obj.column[bird[start].column] - obj.column[bird[final].column]) / 10
        executing = true
        move(start,final, i + 1, [stepX, stepY])
    }
    else if (i < 11) {
        setTimeout(function () {
            increment(start + "x", l[0])
            increment(start + "y", l[1])
            move(start,final, i + 1, l)
            if (i == 10) {executing = false}
        }, 80)
    }
}

function check() {
    canClickButtons = true
    g.setValue("canClick", 1)
    let selected = g.getValueString("Selected")
    if (bird[selected].row == 1 && bird[selected].column == 1) {
        g.setValue("ganhou", 1)
    }
    else {
        g.setValue("ganhou", 0)
    }
}

function executeList(l, i) {
    canClickButtons = false
    g.setValue("canClick", 0)
    if (i < l.length) {
        if (!executing) {
            animation(getBirds(l[i]))
            setTimeout(function () {executeList(l, i + 1)}, 1300)
        }
        else {setTimeout(function () {executeList(l, i)}, 1300)}
    }
    else {
        check()
    }
}

function newGame() {
    let random = Math.floor(Math.random() * 4)
    let apitos = ["A", "B", "C", "D"]
    g.setTextValue("apito1", apitos[random])
    random = Math.floor(Math.random() * 4)
    g.setTextValue("apito2", apitos[random])
    random = Math.floor(Math.random() * 4)
    g.setTextValue("apito3", apitos[random])
    random = Math.floor(Math.random() * 4)
    g.setTextValue("apito4", apitos[random])
}

function select(point) {
    if (isNaN(g.getValue("ganhou")) && canClickButtons) {
        let selected = g.getValueString("Selected")
        switch(selected) {
            case point:
                g.setTextValue("Selected", " ")
            default:
                g.setTextValue("Selected", point)
                g.evalCommand(`Square = ${point}`)
        }
    }
}