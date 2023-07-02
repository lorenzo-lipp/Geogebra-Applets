var g = ggbApplet
// Locais dos bancos
var places = [[8.7, 13.1], [-0.6, 10.1], [-2.9, 5.7], [3, 1.1], [11.5, 1.1], [15, 5.5], [13.6, 9.8]]
var places2 = [[7.8, 13.1], [-1.5, 10.1], [-4.05, 5.7], [2, 1.1], [12.75, 1.1], [16.45, 5.5], [14.6, 9.8]]
// Lista auxiliar para saber em que banco o monstro irá
var indexPlaces = [8.7, -0.6, -2.9, 3, 11.5, 15, 13.6]
var index = [8.7, 13.6, 15, 11.5, 3, -2.9, -0.6]
var indexy = [13.1, 9.8, 5.5, 1.1, 1.1, 5.7, 10.1]
var execute;
var i;
var times;
var round;
// Objeto que contém a posição e a cor (que define quantos passos o monstro dará) dos monstros
var monsters = {"Monstro1": {place: places[0], color: 3, visible: 1}, 
                "Monstro2": {place: places[6], color: -1, visible: 1},
                "Monstro3": {place: places[5], color: 2, visible: 1},
                "Monstro4": {place: places[4], color: 2, visible: 1},
                "Monstro5": {place: places[3], color: -1, visible: 1},
                "Monstro6": {place: places[2], color: 3, visible: 1},
                "Monstro7": {place: places[1], color: -1, visible: 1}
}
var ordem = ["Monstro1", "Monstro6", "Monstro3", "Monstro4", "Monstro2", "Monstro5", "Monstro7"]

restartGame()

// Começa uma rodada do jogo
function startRound() {
    round = 1
    startTimeout()
}

function startTimeout() {
    if (round >= 8) {
        setTimeout(() => {endRound()}, 1000)
        return false
    }
    let m = ordem[round - 1]
    round++
    if(monsters[m].visible) {times = monsters[m].color; moveMonster(m)}
    else {startTimeout()}
}

// Move o monstro de um banco para o outro
function moveMonster(m) {
    let from = monsters[m].place
    let steps = monsters[m].color
    i = indexPlaces.indexOf(from[0])
    if (steps < 0) {to = places[(i + steps + 7) % 7]}
    else {to = places[(i + 8) % 7]}
    // Divide a diferença entre os dois bancos por 10 para animação (a função abs() retorna o valor sem o sinal)
    let step_x = Math.abs((from[0] - to[0]) / 10)
    let step_y = Math.abs((from[1] - to[1]) / 10)
    execute = 0
    // Lógica para descobrir se o valor de X/Y será aumentado ou diminuido
    if(from[0] > to[0]) {
        if (from[1] > to[1]) {animateMonster(step_x, step_y, -1, -1, m)}
        else if (from[1] < to[1]) {animateMonster(step_x, step_y, -1, 1, m)}
        else {animateMonster(step_x, step_y, -1, 0, m)}
    }
    else {
        if (from[1] > to[1]) {animateMonster(step_x, step_y, 1, -1, m)}
        else if (from[1] < to[1]) {animateMonster(step_x, step_y, 1, 1, m)}
        else {animateMonster(step_x, step_y, 1, 0, m)}
    }
}
// Executa uma função 10x, uma a cada 65 milisegundos, que aumenta/diminui o valor do X e do Y até chegar no ponto desejado
function animateMonster(step_x, step_y, signal_x, signal_y, m) {
    setTimeout(() => {
        g.setValue(m + "X", g.getValue(m + "X") + (step_x * signal_x))
        g.setValue(m + "Y", g.getValue(m + "Y") + (step_y * signal_y))
        execute++
        if (execute < 10) {animateMonster(step_x, step_y, signal_x, signal_y, m)}
        // Se já terminou de mover de um banco para o outro, confere se precisa andar novamente
        else {
            // Atualiza a posição do monstro
            monsters[m].place = places[(i + 8) % 7]
            if (times > 1 && monsters[m].color > 1) {i++; moveMonster(m); times--;}
            else {
                if (times == -1) {monsters[m].place = places[(i+6) % 7]}
                // Faz o próximo monstro começar a andar
                if (round < 9) {setTimeout(() => {startTimeout()}, 500)}
                distanceMonsters()
            }
        }
    }, 65)
}

// Termina o round e se houver mais de 1 monstro no jogo, espera um tempo e inicia o próximo round
function endRound() {
    let placeList = []
    let eliminate = []
    // Coloca em uma lista todas as posições dos monstros
    for (var key in monsters) {
        if (monsters[key].visible) {placeList.push(monsters[key].place[0])}
    }
    // Confere quais posições se repetem
    for (var x in placeList) {
        if(placeList.lastIndexOf(placeList[x]) != x && !eliminate.includes(placeList[x])) {
            eliminate.push(placeList[x])
        }
    }
    // Torna invisível os monstros das posições que se repetem
    for (var x in eliminate) {
        g.setVisible(`E${index.indexOf(eliminate[x]) + 1}`, 1)
    }
    g.setValue("eliminating", true)
    setTimeout(() => {
        let visible = []
        let selected = g.getValueString("Selected")
        for (var key in monsters) {
            if (eliminate.includes(monsters[key].place[0])) {
                monsters[key].visible = 0
                g.setVisible(key, 0)
                if(selected == key) {g.setTextValue("Selected", "")}
            }
        }
        for (var x in eliminate) {
            g.setVisible(`E${index.indexOf(eliminate[x]) + 1}`, 0)
        }
        for (var key in monsters) {
            if (monsters[key].visible) {visible.push(key)}
        }
        g.setValue("eliminating", false)
        g.setValue("rodada", g.getValue("rodada") + 1)
        if (visible.length > 1 && g.getValueString("Selected") != "") {setTimeout(() => {startRound()}, 750)}
        else {finish()}
        }, 2500)
}

// Gera uma nova combinação dos monstros
function newGame() {
    let x = 0
    shuffle(places)
    for(let key in monsters) {
        monsters[key].place = places[x]
        x++
    }
    // Confere se a solução sobra um único monstro, se não, gera outra combinação até achar alguma viável
    while(solution() == false) {newGame(); return false}
    x = 0
    for(let key in monsters) {
        g.setValue(key + "X", places[x][0])
        g.setValue(key + "Y", places[x][1])
        x++
    }
    places = [[8.7, 13.1], [-0.6, 10.1], [-2.9, 5.7], [3, 1.1], [11.5, 1.1], [15, 5.5], [13.6, 9.8]]
    // Permite selecionar um monstro e validar
    for (var key in monsters) {
        g.setFixed(key, 1, 1)
        g.setVisible(key, 1)
        monsters[key].visible = 1
    }
    g.setValue("rodada", 1)
    g.setValue("Clicked", 0)
    g.setTextValue("Selected", "")
    opacity(1)
    g.evalCommand(`l1 = {${returnList(0)}, ${returnList(1)}, ${returnList(2)}, ${returnList(3)}, ${returnList(4)}, ${returnList(5)}, ${returnList(6)}}`)
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

// Não deixa um monstro ficar em cima do outro (a não ser que tenham mais de 2)
function distanceMonsters() {
    let placeList = []
    let distance = []
    // Coloca em uma lista todas as posições dos monstros
    for (var key in monsters) {
        if (monsters[key].visible) {placeList.push(monsters[key].place[0])}
    }
    // Confere quais posições se repetem
    for (var x in placeList) {
        if(placeList.lastIndexOf(placeList[x]) != x && !distance.includes(placeList[x])) {
            distance.push(placeList[x])
        }
    }

    for (var key in monsters) {
        if (monsters[key].visible) {
            // Se o monstro está na mesma posição que outro [...]
            if (distance.includes(monsters[key].place[0])) {
                let from = places2[indexPlaces.indexOf(monsters[key].place[0])]
                // [...] afasta ele um pouco
                g.setValue(key + "X", from[0])
                g.setValue(key + "Y", from[1])
                distance.splice(distance.indexOf(monsters[key].place[0]), 1)
            }
            else {
                let from = monsters[key].place
                g.setValue(key + "X", from[0])
                g.setValue(key + "Y", from[1])
            }
        } 
    }
}

// Testa a solução do desafio
function solution() {
    // Começa com uma lista com todos os monstros [...]
    let rightAnswers = ["Monstro1", "Monstro2", "Monstro3", "Monstro4", "Monstro5", "Monstro6", "Monstro7"]
    let eliminate = [1]
    let list = []
    let item = 1

    while(eliminate.length != 0) {
        eliminate = []
        list = []
        for (var key in monsters) {
            if (rightAnswers.includes(key)) {
                list.push((7 * item + index.indexOf(monsters[key].place[0]) + 1 - monsters[key].color * item) % 7)
            }
        }
        // [...] e se uma posição aparece mais de uma vez na lista de monstros [...]
        for (var x in list) {
            if(list.lastIndexOf(list[x]) != x && !eliminate.includes(list[x])) {
                eliminate.push(list[x])
            }
        }
        // [...] remove os monstros nessa posição da lista de "respostas corretas"
        for (var key in monsters) {
            if (eliminate.includes((7 * item + index.indexOf(monsters[key].place[0]) + 1 - monsters[key].color * item) % 7) && rightAnswers.includes(key)) {
                rightAnswers.splice(rightAnswers.indexOf(key), 1)
            }
        }
        item++
    }
    // Se tiver mais de um monstro na lista de "respostas corretas", retorna que não tem uma solução, se não, tudo certo
    if (rightAnswers.length != 1) {console.log("Pulou"); return false}
    console.log(rightAnswers, monsters)
}

// Quando clica no botão de validar, confere se selecionou algum monstro e inicia o jogo
function validate() {
    if (g.getValueString("Selected") != "") {
        for (var x in monsters) {g.setFixed(x, 1, 0)}
        g.setValue("Clicked", 1)
        startRound()
    }
}

// Quando termina todas as rodadas, confere se o monstro selecionado está visível e mostra se o jogador ganhou ou perdeu
function finish() {
    if (g.getValueString("Selected") != "") {g.setValue("Clicked", 2)}
    else {g.setValue("Clicked", 3)}
}

// Função para recomeçar o jogo quando erra
function restartGame() {
    for (var key in monsters) {
        g.setFixed(key, 1, 1)
        g.setVisible(key, 1)
        monsters[key].visible = 1
    }
    for (var x = 1; x < 8; x++) {
        let m = "Monstro" + g.getListValue("l1", x)
        monsters[m].place = [index[x - 1], indexy[x - 1]]
        g.setValue(m + "X", monsters[m].place[0])
        g.setValue(m + "Y", monsters[m].place[1])
    }
    g.setValue("Clicked", 0)
    g.setTextValue("Selected", "")
    g.setValue("rodada", 1)
    opacity(1)
}

// Função para descobrir a posição de cada monstro e salvar em uma lista do geogebra (necessário para o geogebra classroom, já que os valores do javascript não salvam quando fecha)
function returnList(x) {
    for (var key in monsters) {
        if(index.indexOf(monsters[key].place[0]) == x) {return key.substr(-1)}
    }
}

function opacity(n) {
    for (let key in monsters) {
        g.setFilling(key, n)
    }
}