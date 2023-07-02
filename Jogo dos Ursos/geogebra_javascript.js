var g = ggbApplet;
var answerList;
solution();

// [JavaScript Object] contendo as posições dos ursos 
var obj = {
    1: {x: 3.55, y: 9.13, in: "Urso3"},
    2: {x: 8.15, y: 9.13, in: "Urso14"},
    3: {x: 12.8, y: 9.13, in: "Urso15"},
    4: {x: 1.2, y: 5.13, in: "Urso13"},
    5: {x: 5.85, y: 5.13, in: "Urso12", click() {return [1, 2, 6, 10, 9, 4]}},
    6: {x: 10.5, y: 5.13, in: "Urso11", click() {return [2, 3, 7, 11, 10, 5]}},
    7: {x: 15.15, y: 5.13, in: "Urso2"},
    8: {x: -1, y: 1.13, in: "Urso10"},
    9: {x: 3.55, y: 1.13, in: "Urso8", click() {return [4, 5, 10, 14, 13, 8]}},
    10: {x: 8.15, y: 1.13, in: "Urso1", click() {return [5, 6, 11, 15, 14, 9]}},
    11: {x: 12.8, y: 1.13, in: "Urso7", click() {return [6, 7, 12, 16, 15, 10]}},
    12: {x: 17.4, y: 1.13, in: "Urso9"},
    13: {x: 1.3, y: -2.87, in: "Urso19"},
    14: {x: 5.85, y: -2.87, in: "Urso16", click() {return [9, 10, 15, 18, 17, 13]}},
    15: {x: 10.5, y: -2.87, in: "Urso17", click() {return [10, 11, 16, 19, 18, 14]}},
    16: {x: 15.15, y: -2.87, in: "Urso18"},
    17: {x: 3.6, y: -6.87, in: "Urso4"},
    18: {x: 8.2, y: -6.87, in: "Urso5"},
    19: {x: 12.8, y: -6.87, in: "Urso6"}
};

function reset() {
    const listaInicial = ["3", "14", "15", "13", "12", "11", "2", "10", "8", "1", "7", "9", "19", "16", "17", "18", "4", "5", "6"]
    for (let key = 0; key < 19; key++) {
        g.setValue(`Urso${listaInicial[key]}X`, obj[key+1].x)
        g.setValue(`Urso${listaInicial[key]}Y`, obj[key+1].y)
        obj[key+1].in = `Urso${listaInicial[key]}`
    }
}

function ggbOnInit() {
    reset()
}

function solution() {
    answerList = [];
    let answer = g.getCommandString("l1");

    for (let i = 0; i < 19; i++) {
        answerList.push(answer[2 + 5 * i])
    }
}

// Pega um ponto e leva aos poucos até outro lugar
function translate(point, destination) {
    const pointX = g.getValue(`x(${point})`)
    const pointY = g.getValue(`y(${point})`)

    const destinationX = g.getValue(`x(${destination})`)
    const destinationY = g.getValue(`y(${destination})`)

    const movementX = -(pointX - destinationX) / 8
    const movementY = -(pointY - destinationY) / 8

    move(point, pointX, pointY, movementX, movementY, 0)
}

function move(point, pointX, pointY, X, Y, exec) {
    exec++
    if (exec < 9) {
        setTimeout(function () {
            g.setValue(`${point}X`, pointX + X * exec)
            g.setValue(`${point}Y`, pointY + Y * exec)
            move(point, pointX, pointY, X, Y, exec)
        }, 65)
    }
    else {
        setTimeout(function () {
            g.setVisible("c", 0) 
            g.setValue("translating", false)
        }, 130)
    }
}

function highlight(point) {
    g.evalCommand(`A = ${point} + (1.5, 1.89)`)
    g.setVisible("c", 1)
}

function onClick(bear) {
    g.setValue("ok", undefined)
    if (!g.getValue("translating")) {
        for (let key = 1; key < 20; key++) {
            if (obj[key].in === bear) {
                if (obj[key].hasOwnProperty("click")) {
                    g.setValue("translating", true)
                    let transList = obj[key].click()
                    let inList = obj[key].click()

                    highlight(obj[key].in)

                    for (let x in transList) {
                        transList[x] = obj[transList[x]].in
                    }

                    for (i = 0; i < 5; i++) {translate(transList[i], transList[i+1])}
                    translate(transList[5], transList[0])

                    for (i = 0; i < 5; i++) {obj[inList[i+1]].in = transList[i]}
                    obj[inList[0]].in = transList[5]
                }
                break
            }
        }
    }
}

function check() {
    for (let i = 0; i < 19; i++) {
        if (obj[i+1].in === "Urso3") {
            if (answerList[i] !== "R") {return false}
        }
        else if (obj[i+1].in === "Urso1" || obj[i+1].in === "Urso2") {
            if (answerList[i] !== "A") {return false}
        }
        else {
            if (answerList[i] !== "V") {return false}
        }
    }
    return true
}

function newGame() {
    let arr = ["A", "A", "R"]
    for (let i = 1; i < 17; i++) {
        arr.push("V")
    }
    shuffle(arr)
    console.log(arr)
    g.evalCommand(`l1 = {"${arr[0]}", "${arr[1]}", "${arr[2]}", "${arr[3]}", "${arr[4]}", "${arr[5]}", "${arr[6]}", "${arr[7]}", "${arr[8]}", "${arr[9]}", "${arr[10]}", "${arr[11]}", "${arr[12]}", "${arr[13]}", "${arr[14]}", "${arr[15]}", "${arr[16]}", "${arr[17]}", "${arr[18]}"}`)
    solution()
}

// Função que randomiza a ordem de uma lista, importada de https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}