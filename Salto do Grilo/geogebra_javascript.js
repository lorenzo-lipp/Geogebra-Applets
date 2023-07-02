var g = ggbApplet
var positions = {
    1: [-0.57, -3.84],
    2: [0.28, -3.93],
    3: [1.18, -3.94],
    4: [2.09, -3.91],
    5: [3.02, -3.84],
    6: [3.94, -3.74],
    7: [4.8, -3.67],
    8: [5.66, -3.61],
    9: [6.52, -3.54]
}
var saltando = false

function animation(initialX, initialY, i, finalX, finalY, signal) {
    let list = [
        [initialX, initialY],
        [initialX - 0.04 * signal, initialY + 0.33],
        [initialX - 0.06 * signal, initialY + 0.66],
        [initialX - 0.03 * signal, initialY + 0.93],
        [initialX + 0.16 * signal, initialY + 1.43],
        [initialX + 0.41 * signal, initialY + 1.61],
        [initialX + 0.69 * signal, initialY + 1.51],
        [initialX + 0.78 * signal, initialY + 1.4],
        [initialX + 0.88 * signal, initialY + 1.23],
        [initialX + 0.99 * signal, initialY + 0.86],
        [initialX + 0.97 * signal, initialY + 0.56],
        [initialX + 0.93 * signal, initialY + 0.36],
        [initialX + 0.92 * signal, initialY + 0.15],
        [finalX, finalY]
    ]

    g.setValue("signal", signal)

    if (!(i == 0 && saltando)) {
        if (g.getValue("position") + signal > 0 && g.getValue("position") + signal < 10) {
            if (i < list.length) {
                setTimeout(function () {
                    saltando = true
                    g.setValue("GriloX", list[i][0])
                    g.setValue("GriloY", list[i][1])
                    animation(initialX, initialY, i + 1, finalX, finalY, signal)
                }, 65)
            }
            else {
                saltando = false
                g.setValue("position", g.getValue("position") + signal)
                g.setValue("saltos", g.getValue("saltos") - 1)
                if (g.getValue("saltos") == 0 && g.getValue("GriloX") == 3.02) {write(0)} 
            }
        }
    }
}

function write(i) {
    let text;
    let exec = g.getValue("write")
    if (exec == 0) {text = "Tico, se você sair desta posição, será que consegue voltar para \n    a mesma posição depois de ter dado um total de 7 saltos?"}
    else {text = `Não, borboleta, mas com \n    ${g.getValue("saltosIniciais")} saltos eu consigo!`}

    const max = text.length

    if (i <= max) {
        if (text[i] == " " || text[i] == "\n") {
            write(i + 1)
        }
        else {
            setTimeout(function () {
                if (exec == 0) {g.setTextValue("texto3", text.slice(0, i))}
                else {
                    g.setTextValue("texto10", text.slice(0, i))
                    g.setTextValue("texto12", text.slice(0, i))
                }
                write(i + 1)
            }, 100)
        }
    }
    else {
        g.setValue("write", 1)
    }
}