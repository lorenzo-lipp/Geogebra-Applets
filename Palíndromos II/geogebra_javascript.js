var g = ggbApplet
var obj = {
    c: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
    k: false,
    p: false,
    q: false,
    r: false,
    s: false,
    t: false,
    c_1: false,
    d_1: false
}
const SOLUTIONS = {
    q1: ["c", "d", "e", "f", "g"],
    q2: ["d", "e", "f"],
    q3: ["h", "k", "p"],
    q4: ["q", "r", "s"],
    q5: ["r", "s", "t", "c_1"],
    q6: ["f", "g", "h", "k"]
}

function click(circle) {
    let lineThickness = 1

    if (!obj[circle]) {
        lineThickness = 7
        g.setValue("cliques", g.getValue("cliques") + 1)
    }
    else {g.setValue("cliques", g.getValue("cliques") - 1)}

    obj[circle] = !obj[circle]
    if (g.getValue("ok") != 1) {
        g.setLineThickness(circle, lineThickness)   
    }
    g.evalCommand("SelectObjects()")
}

function mark() {
    let solution = ""
    if (obj["c"]) {
        solution = "q1"
    }
    else if (obj["d"]) {
        solution = "q2"
    }
    else if (obj["q"]) {
        solution = "q4"
    }
    else if (obj["p"]) {
        solution = "q3"
    }
    else if (obj["r"]) {
        solution = "q5"
    }
    else if (obj["f"]) {
        solution = "q6"
    }
    if (solution == "") {
        return check([])
    }
    if (check(SOLUTIONS[solution])) {
        g.setVisible(solution, 1)
    }
}

function check(list) {
    let temp = []
    for (let key in obj) {
        if (obj[key]) {
            temp.push(key)
            click(key)
        }
    }
    g.setValue("cliques", 0)
    if (temp.length != list.length) {
        return wrong()
    }
    for (let index in temp) {
        if (!list.includes(temp[index])) {
            return wrong()
        }
    }
    return true
}

function wrong() {
    g.setValue("naoEh", 1)
    setTimeout(() => {
        g.setValue("naoEh", 0)
    }, 1000)
}

function checkOk() {
    if (g.getVisible("q1") && g.getVisible("q2") && g.getVisible("q4") && g.getVisible("q5") && g.getVisible("q6")) {
        g.setValue("ok", 1)
    }
}