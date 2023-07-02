var g = ggbApplet
// Armazena a construção de cada tipo de formato do caminho
const SHAPES = {
    1 : {
        type: 'SQUARE',
        color: [58, 253, 117],
        constructor: 'Polygon',
        points: {
            A: [0, 0],
            B: [1, 0],
            C: [1, 1],
            D: [0, 1]
        },
        order: ["A", "B", "C", "D"],
        segments: [
            ["A", "B"],
            ["B", "C"],
            ["C", "D"],
            ["D", "A"]
        ]
    },
    2: {
        type: 'CIRCLE',
        color: [27, 141, 203],
        constructor: 'Circle',
        points: {
            A: [0.5, 0.5],
            B: [1, 0.5]
        },
        segments: [
            ["A", "B"]
        ]
    },
    3: {
        type: 'TRIANGLE',
        color: [7, 233, 225],
        constructor: 'Polygon',
        points: {
            A: [0, 0],
            B: [1, 0],
            C: [0.5, 1]
        },
        order: ["A", "B", "C"],
        segments: [
            ["A", "B"],
            ["B", "C"],
            ["C", "A"]
        ]
    },
    4: {
        type: 'PENTAGON',
        color: [230, 66, 74],
        constructor: 'Polygon',
        points: {
            A: [0.2, 0],
            B: [0.8, 0],
            C: [1, 0.6],
            D: [0.5, 1],
            E: [0, 0.6]
        },
        order: ["A", "B", "C", "D", "E"],
        segments: [
            ["A", "B"],
            ["B", "C"],
            ["C", "D"],
            ["D", "E"],
            ["E", "A"]
        ]
    },
    5: {
        type: 'STAR',
        color: [255, 207, 51],
        constructor: 'Polygon',
        points: {
            A: [0.1, -0.1],
            B: [0.5, 0.2],
            C: [0.9, -0.1],
            D: [0.75, 0.4],
            E: [1.1, 0.7],
            F: [0.65, 0.7],
            G: [0.5, 1.15],
            H: [0.35, 0.7],
            I: [-0.1, 0.7],
            J: [0.25, 0.4]
        },
        order: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        segments: [
            ["A", "B"],
            ["B", "C"],
            ["C", "D"],
            ["D", "E"],
            ["E", "F"],
            ["F", "G"],
            ["G", "H"],
            ["H", "I"],
            ["I", "J"],
            ["J", "A"]
        ]
    },
    6: {
        type: 'HEART',
        color: [255, 54, 171],
        constructor: ['Polygon', 'Circle'],
        points: {
            A: [0.5, 0],
            B: [1, 0.5],
            C: [0, 0.5],
            D: [0.5, 0.8],
            E: [0.75, 0.65],
            F: [0.25, 0.65]
        }
    },
    7: {
        type: 'MOON',
        color: [143, 0, 179],
        constructor: "Circle",
        points: {
            A: [0.5, 0.5],
            B: [1, 0.5],
            C: [0.7, 0.5],
            D: [1.1, 0.5]
        },
        segments: [
            ["A", "B"],
            ["C", "D"]
        ]
    }
}
let board = [7, 1, 5, 6, 2, 3, 2, 4, 1, 4, 5, 7, 7, 3, 6, 1]
const COLORS = {
    off: [192, 192, 192],
    on: [0, 0, 0],
    crossed: [0, 0, 0]
}
const PATH_CROSSED = {
    arrows: [],
    shapes: [board[0]]
}

// Função que constrói o formato escolhido, em determinada posição
function build(num, position, offset = [0, 0]) {
    let obj = SHAPES[num];
    // Constrói cada ponto que formato possui, fixa o ponto e deixa invisível
    for (let key in obj.points) {
        g.evalCommand(`${key + position} = (${obj.points[key][0] + offset[0]}, ${obj.points[key][1] + offset[1]})`);
        g.setFixed(key + position, 1, 0);
        g.setVisible(key + position, 0);
    };
    // Se o objeto for um coração, a fórmula de construção acaba sendo específica para este objeto
    if (obj.type == 'HEART') {
        // Cria um triângulo e dois círculos, colore eles e deixa o objeto completamente opaco
        g.evalCommand(`H${position}1 = {${obj.constructor[0]}(A${position}, B${position}, C${position})}`);
        g.evalCommand(`H${position}2 = ${obj.constructor[1]}(E${position}, D${position})`);
        g.evalCommand(`H${position}3 = ${obj.constructor[1]}(F${position}, D${position})`);
        for (let i = 1; i < 4; i++) {
            g.setColor("H" + position + i, ...obj.color);
            g.setFilling("H" + position + i, 1);
            g.setFixed("H" + position + i, 1, 0);
        };
    }
    // Se o método de construção do objeto for com a ferramenta polígono, aplica a fórmula a seguir
    else if (obj.constructor == 'Polygon') {
        // Cria o polígono com todos os pontos do desenho
        g.evalCommand(`P${position} = {Polygon(${obj.order.join(`${position}, `)}${position})}`);
        g.setColor("P" + position, ...obj.color);
        g.setFilling("P" + position, 1);
        g.setFixed("P" + position, 1, 0);
    }
    // Se o método de construção do objeto for com a ferramenta círculo, aplica a fórmula a seguir
    else if (obj.constructor == 'Circle') {
        // Para cada "segmento" definido no objeto, cria um círculo com os pontos do segmento
        for (let i in obj.segments) {
            g.evalCommand(`C${position + i} = ${obj.constructor}(${obj.segments[i].join(`${position}, `)}${position})`);
            // Se for o primeiro círculo que estiver sendo criado, aplica a cor do objeto, se não aplica a cor branca (necessária para fazer a meia lua)
            i == 0 ? g.setColor("C" + position + i, ...obj.color) : g.setColor("C" + position + i, 255, 255, 255);
            g.setFilling("C" + position + i, 1);
            g.setFixed("C" + position + i, 1, 0);
        }
    };
};

// Procura todos os elementos do geogebra e apaga aqueles que estão depois da posição 40 na lista (os outros itens são texto, pontos, setas e não devem ser apagados)
function cleanBoard() {
    let deleteList = g.getAllObjectNames();
    for (i = 41; i < deleteList.length; i++) {
        g.deleteObject(deleteList[i])
    };
};

// Gera um caminho novo para o desafio
function generatePath() {
    let path = [0];
    let i = 0;
    let random;
    while (i < 15) {
        // São 15 posições, se a posição divida por quatro tiver resto 3, significa que não existe seta para a direita, então define o valor do número aleatório = 1
        // Se não, sorteia um número que pode ser 0 ou 1
        i % 4 == 3 ? random = 1 : i < 12 ? random = Math.floor(Math.random() * 2) : random = 0;
        // Se o número for 0, o caminho escolhe a seta para a direita, se não, escolhe a seta para cima
        random == 0 ? i++ : i += 4;
        path.push(i);
    };
    return path;
};

// Preenche o tabuleiro com o caminho novo que será gerado
function fillBoard() {
    // Cria uma lista de 1 a 7, que terá seus itens removidos um a um para formar o caminho correto
    let figures = [1, 2, 3, 4, 5, 6, 7];
    // Gera o caminho para o desafio
    let path = generatePath();
    // x e y são o offset da posição 0 do tabuleiro
    let x = 2;
    let y = -4;
    let position = 0;
    let random;
    while (position < 16) {
        // Se a posição estiver no caminho definido como correto, coloca uma das figuras da lista figures e depois remove essa figura (para evitar repetição)
        if (path.includes(position)) {
            random = Math.floor(Math.random() * figures.length);
            build(figures[random], position + 16, [(position % 4) * x, y + 2 * Math.floor(position / 4)]);
            board[position] = figures[random];
            figures = figures.slice(0, random).concat(figures.slice(random + 1));
        }
        // Se não, coloca uma figura aleatória de 1 a 7
        else {
            random = Math.floor(Math.random() * 7) + 1;
            build(random, position + 16, [(position % 4) * x, y + 2 * Math.floor(position / 4)]);
            board[position] = random;
        }
        position++
    };
};

// Recolore as setas do tabuleiro
function updateArrows() {
    let x = (g.getValue("x(C)") - 0.5) / 2;
    let y = (g.getValue("y(C)") + 3.5) / 2;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            // Confere se a seta vertical deveria ser clicável ou se já foi clicada e define a cor
            if (i == y && j == x) {
                g.setColor(`Arrow${i}${j}`, ...COLORS.on);
            } 
            else if (PATH_CROSSED.arrows.includes(`Arrow${i}${j}`)) {
                g.setColor(`Arrow${i}${j}`, ...COLORS.crossed)
            } 
            else {
                g.setColor(`Arrow${i}${j}`, ...COLORS.off)
            }

            // Confere se a seta horizontal deveria ser clicável ou se já foi clicada e define a cor
            if (i == x && j == y) {
                g.setColor(`HArrow${j}${i}`, ...COLORS.on);
            } 
            else if (PATH_CROSSED.arrows.includes(`HArrow${j}${i}`)) {
                g.setColor(`HArrow${j}${i}`, ...COLORS.crossed)
            } 
            else {
                g.setColor(`HArrow${j}${i}`, ...COLORS.off)
            }
        }
    }
}

// Recomeça o mesmo jogo
function restart() {
    // Limpa a lista do caminho percorrido, recoloca o ponto C no início do tabuleiro e recolore as setas
    PATH_CROSSED.shapes = [board[0]]
    PATH_CROSSED.arrows = []
    g.evalCommand("C = (0.5, -3.5)")
    updateArrows()
}

// Gera um novo jogo
function newGame() {
    // Limpa o tabuleiro com o cleanBoard e preenche ele com novas figuras e um novo caminho com o fillBoard
    cleanBoard();
    fillBoard();
    restart();
};

// Confere se o jogador está na última posição do tabuleiro
function check(x , y) {
    if (x == 6.5 && y == 2.5) {
        // Retorna uma lista sem os elementos que se repetem na lista
        let uniqueArray = PATH_CROSSED.shapes.filter((value, index, self) => {
            return index == self.indexOf(value);
        });
        // Se essa lista tiver 7 elementos, então nenhum deles se repetia, logo o caminho passou por todas as figuras
        if (uniqueArray.length == 7) {
            g.setValue("ok", 1);
        }
        else {
            g.setValue("ok", 0);
        }
    }
}

// Move a posição no tabuleiro
function move(arrow) {
    let x = g.getValue("x(C)");
    let y = g.getValue("y(C)");
    let arrowPositionX = (x - 0.5) / 2;
    let arrowPositionY = (y + 3.5) / 2;

    if (arrow == 'l1') {
        // Se foi clicado em uma seta vertical, coloca essa seta na lista de caminho percorrido e coloca a próxima figura na lista de figuras coletadas
        let boardPosition = (x - 0.5) / 2 + (y + 2 + 3.5) * 2;

        PATH_CROSSED.arrows.push(`Arrow${arrowPositionY}${arrowPositionX}`);
        PATH_CROSSED.shapes.push(board[boardPosition]);
        g.evalCommand(`C = (${x} , ${y + 2})`);
        check(x, y + 2)
    }
    else {
        // Se foi clicado em uma seta horizontal, coloca essa seta na lista de caminho percorrido e coloca a próxima figura na lista de figuras coletadas
        let boardPosition = (x + 2 - 0.5) / 2 + (y + 3.5) * 2;

        PATH_CROSSED.arrows.push(`HArrow${arrowPositionY}${arrowPositionX}`);
        PATH_CROSSED.shapes.push(board[boardPosition]);
        g.evalCommand(`C = (${x + 2} , ${y})`)
        check(x + 2, y)
    }
    updateArrows()
}