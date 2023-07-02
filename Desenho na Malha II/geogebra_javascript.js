var g = ggbApplet
var PontoSelecionado = ""
g.setValue("PontoSelecionadoX", -10)
g.setValue("PontoSelecionadoY", 0)

function gerarNovo() {
    var E = g.getValue('E')
    var GAPX = parseInt(Math.random() * 4)
    var GAPY = parseInt(Math.random() * 4)
    var horizontal = parseInt(Math.random() * 2)
    var vertical = parseInt(Math.random() * 2)


    g.setValue('Ymax', 12 - GAPY)
    g.setValue('Ymin', -6 + GAPY)
    g.setValue('Xmax', 22 - GAPX)
    g.setValue('Xmin', 3 + GAPX)

    E = parseInt(Math.random() * 2) + 2
    g.setValue('E', E)

    if (horizontal) {
        g.evalCommand('ListaX = {' + (22 - GAPX) + "," + g.getListValue('ListaAuxiliar1', 2) + "," + g.getListValue('ListaAuxiliar1', 2)
        + "," + g.getListValue('ListaAuxiliar1', 3) + "," + g.getListValue('ListaAuxiliar1', 3) + "," + g.getListValue('ListaAuxiliar1', 4) + "," + g.getListValue('ListaAuxiliar1', 4)
        + "," + g.getListValue('ListaAuxiliar1', 5) + "," + g.getListValue('ListaAuxiliar1', 5) + "," + g.getListValue('ListaAuxiliar1', 6) + "," + g.getListValue('ListaAuxiliar1', 6)
        + "," + g.getListValue('ListaAuxiliar1', 7) + "," + g.getListValue('ListaAuxiliar1', 7) + "," + g.getListValue('ListaAuxiliar1', 8) + "," + g.getListValue('ListaAuxiliar1', 8)
        + "," + g.getListValue('ListaAuxiliar1', 9) + "," + g.getListValue('ListaAuxiliar1', 9) + "," + g.getListValue('ListaAuxiliar1', 10) + "," + g.getListValue('ListaAuxiliar1', 10)
        + "}")
    }
    else {
        g.evalCommand('ListaX = {' + (3 + GAPX) + "," + (3 + GAPX) + "," + (22 - GAPX)
        + "," + g.getListValue('ListaAuxiliar1', 4) + "," + g.getListValue('ListaAuxiliar1', 4) + "," + g.getListValue('ListaAuxiliar1', 3) + "," + g.getListValue('ListaAuxiliar1', 3) 
        + "," + g.getListValue('ListaAuxiliar1', 6) + "," + g.getListValue('ListaAuxiliar1', 6) + "," + g.getListValue('ListaAuxiliar1', 5) + "," + g.getListValue('ListaAuxiliar1', 5)
        + "," + g.getListValue('ListaAuxiliar1', 8) + "," + g.getListValue('ListaAuxiliar1', 8) + "," + g.getListValue('ListaAuxiliar1', 7) + "," + g.getListValue('ListaAuxiliar1', 7)
        + "," + g.getListValue('ListaAuxiliar1', 10) + "," + g.getListValue('ListaAuxiliar1', 10) + "," + g.getListValue('ListaAuxiliar1', 9) + "," + g.getListValue('ListaAuxiliar1', 9) 
        + "}")
    }
    if(vertical) {
        g.evalCommand('ListaY = {' + (12 - GAPY) + "," + g.getListValue('ListaAuxiliar2', 2) + "," + g.getListValue('ListaAuxiliar2', 2)
        + "," + g.getListValue('ListaAuxiliar2', 3) + "," + g.getListValue('ListaAuxiliar2', 3) + "," + g.getListValue('ListaAuxiliar2', 4) + "," + g.getListValue('ListaAuxiliar2', 4)
        + "," + g.getListValue('ListaAuxiliar2', 5) + "," + g.getListValue('ListaAuxiliar2', 5) + "," + g.getListValue('ListaAuxiliar2', 6) + "," + g.getListValue('ListaAuxiliar2', 6)
        + "," + g.getListValue('ListaAuxiliar2', 7) + "," + g.getListValue('ListaAuxiliar2', 7) + "," + g.getListValue('ListaAuxiliar2', 8) + "," + g.getListValue('ListaAuxiliar2', 8)
        + "," + g.getListValue('ListaAuxiliar2', 9) + "," + g.getListValue('ListaAuxiliar2', 9) + "," + g.getListValue('ListaAuxiliar2', 10) + "," + g.getListValue('ListaAuxiliar2', 10)
        + "}")
    }
    else {
        g.evalCommand('ListaY = {' + (-6 + GAPY) + "," + (-6 + GAPY) + "," + (12 - GAPY)
        + "," + g.getListValue('ListaAuxiliar2', 4) + "," + g.getListValue('ListaAuxiliar2', 4) + "," + g.getListValue('ListaAuxiliar2', 3) + "," + g.getListValue('ListaAuxiliar2', 3) 
        + "," + g.getListValue('ListaAuxiliar2', 6) + "," + g.getListValue('ListaAuxiliar2', 6) + "," + g.getListValue('ListaAuxiliar2', 5) + "," + g.getListValue('ListaAuxiliar2', 5)
        + "," + g.getListValue('ListaAuxiliar2', 8) + "," + g.getListValue('ListaAuxiliar2', 8) + "," + g.getListValue('ListaAuxiliar2', 7) + "," + g.getListValue('ListaAuxiliar2', 7)
        + "," + g.getListValue('ListaAuxiliar2', 10) + "," + g.getListValue('ListaAuxiliar2', 10) + "," + g.getListValue('ListaAuxiliar2', 9) + "," + g.getListValue('ListaAuxiliar2', 9) 
        + "}")
    }

    novosPontos()
}

function novosPontos() {
    let breaky = false
    E = g.getValue('E')
    //Passa as listas do geogebra para o javascript
    ListaAuxiliar1 = []
    ListaAuxiliar2 = []
    for (var i = 1; i < 12; i++) {
        ListaAuxiliar1.push(g.getListValue('ListaAuxiliar1', i))
        ListaAuxiliar2.push(g.getListValue('ListaAuxiliar2', i))
    }
    // Cria uma lista com todos os X do desenho que estão entre as linhas visiveis!
    xMax = g.getValue('Xmax') - E - 1
    xMin = g.getValue('Xmin') + E + 1
    rangeX = range(xMin, xMax)
    // Faz o mesmo com o Y
    yMax = g.getValue('Ymax') - E - 1
    yMin = g.getValue('Ymin') + E + 1
    rangeY = range(yMin, yMax)
    // Embaralha a lista
    rangeX = shuffle(rangeX)
    // Cria uma lista com todos as combinações de pontos
    points = []
    for(var x in rangeX) {
        for (var y in rangeY) {
            points.push([rangeX[x], rangeY[y]])
        }
    }
    // Separa os pontos em duas listas, os pontos corretos e os incorretos!
    rightPoint = []
    wrongPoints = []
    for (var x in points) {
        index = ListaAuxiliar2.indexOf(points[x][1])
        // Confere se o Y pertence a algum segmento horizontal
        if (index >= 0) {
            if ((points[x][0] >= ListaAuxiliar1[index]  && points[x][0] <= ListaAuxiliar1[index + 1]) || (points[x][0] <= ListaAuxiliar1[index]  && points[x][0] >= ListaAuxiliar1[index + 1])) {
                rightPoint.push([points[x][0], points[x][1]])
            }
        }
        // Se o Y não pertencer a algum segmento horizontal
        else {
            index = ListaAuxiliar1.indexOf(points[x][0])
            // Confere se o Y pertence a algum segmento vertical
            if(index >= 0) {
                if ((points[x][1] >= ListaAuxiliar2[index]  && points[x][1] <= ListaAuxiliar2[index + 1]) || (points[x][1] <= ListaAuxiliar2[index]  && points[x][1] >= ListaAuxiliar2[index + 1])) {
                    rightPoint.push([points[x][0], points[x][1]])
                }
            }
            // Caso contrário, o ponto não faz parte de nenhum segmento
            else {wrongPoints.push([points[x][0], points[x][1]])}
        }
    }
    wrongPoints = shuffle(wrongPoints)
    g.setValue("Ponto1X", wrongPoints[0][0]); g.setValue("Ponto1Y", wrongPoints[0][1])
    g.setValue("Ponto2X", wrongPoints[1][0]); g.setValue("Ponto2Y", wrongPoints[1][1])
    g.setValue("Ponto3X", wrongPoints[2][0]); g.setValue("Ponto3Y", wrongPoints[2][1])
    g.setValue("Ponto5X", wrongPoints[3][0]); g.setValue("Ponto5Y", wrongPoints[3][1])
    for(var x in rightPoint) {
        for(var i=3; i < 10; i++) {
            condition1 = g.getValue("Distance[(" + rightPoint[x][0] + "," + rightPoint[x][1] + "),Horizontal" + i + "]==0") && g.getVisible("Horizontal" + i)
            condition2 = g.getValue("Distance[(" + rightPoint[x][0] + "," + rightPoint[x][1] + "),Vertical" + i + "]==0") && g.getVisible("Vertical" + i)
            if (condition1 || condition2){
                g.setValue("Ponto4X", rightPoint[x][0]); g.setValue("Ponto4Y", rightPoint[x][1]);
                breaky = true
            }
        if (breaky) {break}
        }
    }
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
// Função importada do codegrepper (pega o intervalo entre dois numeros)
var range = (min, max) => [...Array(max - min + 1).keys()].map(i => i + min);