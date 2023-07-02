// Encurta o nome usado para acessar as variáveis do geogebra
var g = ggbApplet;
// Ao clicar em um ponto (único objeto com apenas 1 caractér no nome), ativa a função de animar os pontos
g.registerClickListener((obj) => {
    if (obj.length == 1 && !animating) {
        animatePoint(obj, 5, 1)
    }
})
// Armazena os pontos, linhas e a cor de cada um dos desenhos
const DRAW = {
    1: {
        points: {
            C: [3.46, -3.24],
            D: [1.96, -1.99],
            E: [2.52, -0.27],
            F: [4.22, -0.35],
            G: [4.96, -2.14],
            H: [4.96, 1.89],
            I: [3.44, 3.29],
            J: [2.02, 1.89],
            K: [0.66, 0.91],
            L: [-1.14, 0.09],
            M: [-0.18, -1.91],
            N: [-0.12, -2.99],
            O: [0.21, -5.39],
            P: [2.52, -5.29],
            Q: [3.6, -5.23],
            R: [6.17, -5.6],
            S: [6.7, -2.79],
            T: [6.88, -1.83],
            U: [8.12, 0.13],
            V: [6, 1.17]
        },
        lines: [
            ["O", "N"],
            ["N", "D"],
            ["D", "M"],
            ["M", "L"],
            ["L", "K"],
            ["E", "J"],
            ["K", "E"],
            ["J", "I"],
            ["E", "D"],
            ["I", "H"],
            ["D", "C"],
            ["H", "F"],
            ["C", "G"],
            ["F", "V"],
            ["G", "F"],
            ["V", "U"],
            ["F", "E"],
            ["U", "T"],
            ["T", "G"],
            ["G", "S"],
            ["S", "R"],
            ["R", "Q"],
            ["Q", "C"],
            ["C", "P"],
            ["P", "O"]
        ],
        color: [255, 51, 102]
    },
    2: {
        points: {
            C: [0.13, -5.63],
            D: [2.27, -5.64],
            E: [2.27, -3.18],
            F: [4.64, -3.2],
            G: [4.65, -5.67],
            H: [6.78, -5.65],
            I: [6.78, 0.12],
            J: [0.14, 0.13],
            K: [3.46, 3.19],
            L: [4.73, 2.04],
            M: [4.73, 2.87],
            N: [6, 2.86],
            O: [5.99, 0.87]
        },
        lines: [
            ["J", "K"],
            ["K", "L"],
            ["L", "M"],
            ["M", "N"],
            ["N", "O"],
            ["O", "I"],
            ["I", "H"],
            ["H", "G"],
            ["G", "F"],
            ["F", "E"],
            ["E", "D"],
            ["D", "C"],
            ["C", "J"],
            ["J", "I"]
        ],
        color: [0, 153, 255]
    },
    3: {
        points: {
            C: [3.46, -5.43],
            D: [6.96, -3.72],
            E: [6.98, 0.27],
            F: [6.41, 2.73],
            G: [4.79, 0.8],
            H: [2.14, 0.79],
            I: [0.59, 2.75],
            J: [0.02, 0.36],
            K: [0.02, -3.71],
            L: [3.47, -3.32],
            M: [4.4, -1.86],
            N: [2.53, -1.86],
        },
        lines: [
            ["I", "H"],
            ["G", "H"],
            ["G", "F"],
            ["F", "E"],
            ["E", "D"],
            ["D", "C"],
            ["C", "K"],
            ["K", "J"],
            ["J", "I"],
            ["N", "L"],
            ["L", "M"],
            ["M", "N"],
            ["L", "C"]
        ],
        color: [255, 127, 0]
    }
};
// Previne que o aluno clique mais de uma vez no mesmo ponto, o que reiniciaria a animação
var animating = false

// Inicia no desenho 1 quando abre o jogo
draw(1)
g.setTextValue("SelectedPoint", "")


// Cria o desenho que for passado na variável num
function draw(num) {
    // Deleta as linhas e pontos do desenho anterior
    for (i = 0; i < 25; i++) {
        g.deleteObject(`line${i}`)
        g.deleteObject(`${Object.keys(DRAW[1].points)[i]}`)
    }
    for (let key in DRAW[num].points) {
        // Cria e fixa os pontos do desenho atual
        g.evalCommand(`${key} = (${DRAW[num].points[key][0]}, ${DRAW[num].points[key][1]})`)
        g.setFixed(key, 1, 1)
        g.setColor(key, ...DRAW[num].color)
        g.setLayer(key, 3)
    }
    DRAW[num].lines.forEach((list, index) => {
        // Cria as linhas, colore, muda a grossura e coloca o estilo pontilhado
        g.evalCommand(`line${index} = Segment(${list[0]}, ${list[1]})`)
        g.setColor(`line${index}`, ...DRAW[num].color)
        g.setLineThickness(`line${index}`, 13)
        g.setLineStyle(`line${index}`, 1)
        g.setLayer(`line${index}`, 0)
        g.setFixed(`line${index}`, 1, 0)
    })
}

// Função que anima os pontos, sinalizando que o usuário clicou no ponto
function animatePoint(point, size, signal) {
    let selectedPoint = g.getValueString("SelectedPoint")
    animating = true
    
    if (selectedPoint != "" && selectedPoint != point) {
        // Procura o segmento de linha que contém os últimos dois pontos selecionados e troca o estilo da linha
        for (let i = 0; i < 25; i++) {
            let line = g.getCommandString(`line${i}`)
            if ([line[8], line[11]].includes(point) && [line[8], line[11]].includes(selectedPoint)) {
                g.setLineStyle(`line${i}`, 0)
                g.setLayer(`line${i}`, 2)
                break
            }
        }
    }
    g.setTextValue("SelectedPoint", point)
    if (size == 10) {
        signal = -1
    }
    if (size + signal >= 5) {
        setTimeout(() => {
            // Após 70 milissegundos, muda o tamanho do ponto e chama a função de novo
            g.setPointSize(point, size + signal)
            animatePoint(point, size + signal, signal)
        }, 70)
    }
    else {
        setTimeout(showPoints(point), 100)
        animating = false
    }
}

// Procura os pontos com segmento em comum com o ponto selecionado e deixa eles visíveis
function showPoints(point) {
    let visible = []
    let invisible = []
    let num = g.getValue("desenho")

    for (let i = 0; i < 25; i++) {
        let line = g.getCommandString(`line${i}`)

        invisible.push(line[8], line[11])

        if (g.getLineStyle(`line${i}`)) {
            if (line[8] == point) {
                visible.push(line[11])
            }
            else if (line[11] == point) {
                visible.push(line[8])
            }
        }
    }
    invisible.forEach(value => {
        g.setFixed(value, 1, 0)
        g.setColor(value, 200, 200, 200)
        g.setPointSize(value, 5)
    })
    visible.forEach(value => {
        g.setFixed(value, 1, 1)
        g.setColor(value, ...DRAW[num].color)
        g.setPointSize(value, 7)
    })
    g.setColor(point, 255, 255, 153)
    if (visible.length == 0) {
        check()
    }
}

// Confere se todas as linhas foram traçadas
function check() {
    let num = g.getValue("desenho")
    for (let i = 0; i < 25; i++) {
        if (g.getLineStyle(`line${i}`) != 0 && g.exists(`line${i}`)) {
            g.setValue("ok", 0)
            return false
        }
    }
    Object.keys(DRAW[num].points).forEach(value => {
        g.setColor(value, ...DRAW[num].color)
    })
    g.setValue("ok", 1)
}