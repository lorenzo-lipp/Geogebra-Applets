var g = ggbApplet
var colors = ["Amarelo", "Verde", "Roxo", "Vermelho", "Azul"]
var dict = {"Verde": "L", "Amarelo": "L", "Azul": "R", "Vermelho": "R", "Roxo":"R"}
var order = []
var layer = 1
// Ordem inicial do jogo
var gameList = [4, 2, 1, 5, 3]
// Ativa ao clicar em um tapete
function click(color, numero) {
    g.setValue("correto", undefined)
    let colorLC = color.toLowerCase()
    fixed()
    if (numero < 2) {
        // Ativa a animação do tapete desenrolando
        g.setAnimating(colorLC, 1)
        g.startAnimation()
        order.push(color)
        let i = order.length - 1
        if (dict[order[i]] != dict[order[i-1]] && i > 0) {
            layer++
        }
        changeLayer(color)
    }
    else {
        // Enrola o tapete novamente
        let i = order.length - 1
        if (dict[order[i]] != dict[order[i-1]] && i > 0) {roll(colorLC, 1)}
        else {roll(colorLC, 0)}
        removeItem(order, color)
    }
    unfixed()
}
// Não deixa clicar em nenhum dos tapetes desdobrados
function fixed() {
    for (var x in colors) {
        g.setFixed("Box" + colors[x] + "2", 1, 0)
    }
}
// Libera todos os tapetes que não estejam sobrepostos
function unfixed() {
    let i = order.length - 1
    g.setFixed("Box" + order[i] + "2", 1, 1)
    while (dict[order[i]] == dict[order[i-1]] && i > 0) {
        g.setFixed("Box" + order[i-1] + "2", 1, 1)
        i--
    }
}
//
function changeLayer(color) {
    for(i = 2; i < 5; i++) {
        g.setLayer("Tapete" + color + i, layer)
    }
}
// Diminui até 1 o valor do controle deslizante que representa a cor
function roll(color, decrease) {
    setTimeout(function () {
        g.setValue(color, g.getValue(color) - 1)
        if(g.getValue(color) > 1) {roll(color, decrease)}
        else if (decrease) {layer--}
    }, 100)
}
// Função do controle deslizante, controla qual tapete pode ser clicado
function update(color) {
    let value = g.getValue(color.toLowerCase())
    if (value == 1) {
        g.setFixed("Box" + color + "1", 1, 1)
        g.setFixed("Box" + color + "2", 1, 0)
        g.setLayer("Tapete" + color + "4", 0)
    }
    else if (value > 1) {
        g.setFixed("Box" + color + "1", 1, 0)
        if (value == 4 && order[order.length - 1] == color) {g.setFixed("Box" + color + "2", 1, 1)}
    }
}
// Função que remove um item (i) de uma lista (l)
function removeItem(l, i) {
    if (l.indexOf(i) != -1) {l.splice(l.indexOf(i), 1)}
  }
// Confere se a resposta do jogador é igual a ordem sorteada
function validate() {
    let answer = []
    for(var x in colors) {answer.push(g.getLayer("Tapete" + colors[x] + "4"))}
    for (var x in answer) {
        if(answer[x] != gameList[x]) {return false}
    }
    return true
}
// Gera um jogo novo, sempre diferente do atual
function newGame(oldGameList) {
    while(sameList(oldGameList, gameList)) {
        let leftList = shuffle([2,4])
        let rightList = shuffle([1,3,5])
        gameList = leftList
        for(var x in rightList) {
            gameList.push(rightList[x])
        }
    }
    reset()
    for (var x = 0; x < 5; x++) {
        g.setLayer("Exemplo" + colors[x], gameList[x])
    }
}
// Desenrola todos os tapetes
function reset() {
    layer = 1
    order = []
    for (var x = 0; x < 5; x++) {
        g.setLayer("Tapete" + colors[x] + "4", 0)
        g.setValue(colors[x].toLowerCase(), 1)
        g.setValue("correto", undefined)
    }
}
// Confere se duas listas são iguais
function sameList(l1, l2) {
    for(var x in l1) {
        if (l1[x] != l2[x]) {return false}
    }
    return true
}
// Função importada pronta do stackoverflow (embaralha uma lista)
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}