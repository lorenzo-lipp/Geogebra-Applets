var g = ggbApplet
var PontoSelecionado = ""
g.setValue("PontoSelecionadoX", -10)
g.setValue("PontoSelecionadoY", 0)

function novoJogo() {
    var valor1 = parseInt(Math.random() * 7) 
    var valor2 = valor1
    var valor3 = valor1
    while (valor2 == valor1) {valor2 = parseInt(Math.random() * 7)}
    while (valor3 == valor1 || valor3 == valor2) {valor3 = parseInt(Math.random() * 7)}
    for (var i = 1; i < 5; i++) {
        g.setListValue('ListaY', i, valor1)
    }
    for (var i = 5; i < 8; i++) {
        g.setListValue('ListaY', i, valor2)
    }
    for (var i = 8; i < 10; i++) {
        g.setListValue('ListaY', i, valor3)
    }
    novosPontos()
}

function novosPontos() {
    var xValor1 = parseInt(Math.random() * 11) + 18
    var listaDeX = [xValor1]
    var xValor2 = xValor1
    var xValor3 = xValor1
    var xValor4 = xValor1
    var xValor5 = xValor1
    while (listaDeX.includes(xValor2)) {xValor2 = parseInt(Math.random() * 11) + 18}
    listaDeX.push(xValor2)
    while (listaDeX.includes(xValor3)) {xValor3 = parseInt(Math.random() * 11) + 18}
    listaDeX.push(xValor3)
    while (listaDeX.includes(xValor4)) {xValor4 = parseInt(Math.random() * 11) + 18}
    listaDeX.push(xValor4)
    while (listaDeX.includes(xValor5)) {xValor5 = parseInt(Math.random() * 11) + 18}
    listaDeX.push(xValor5)
    var yValor1 = parseInt(Math.random() * 8) 
    var yValor2 = parseInt(Math.random() * 8)
    var yValor3 = parseInt(Math.random() * 8)
    var yValor4 = parseInt(Math.random() * 8)
    var yValor5 = parseInt(Math.random() * 8)
    if ([1,2,5].includes(xValor4 % 9)) {yValor4 = g.getListValue('ListaY', xValor4 % 9 + 1)}
    else {while(yValor4 > g.getListValue('ListaY', xValor4 % 9 + 1)) {yValor4 = parseInt(Math.random() * 8)}}
    yValor1 = gerarErrado(yValor1, xValor1)
    yValor2 = gerarErrado(yValor2, xValor2)
    yValor3 = gerarErrado(yValor3, xValor3)
    yValor5 = gerarErrado(yValor5, xValor5)
    g.setValue("Ponto1X", xValor1); g.setValue("Ponto1Y", yValor1)
    g.setValue("Ponto2X", xValor2); g.setValue("Ponto2Y", yValor2)
    g.setValue("Ponto3X", xValor3); g.setValue("Ponto3Y", yValor3)
    g.setValue("Ponto4X", xValor4); g.setValue("Ponto4Y", yValor4)
    g.setValue("Ponto5X", xValor5); g.setValue("Ponto5Y", yValor5)
}

function gerarErrado(yValorN, xValorN) { 
    while (([1,2,5].includes(xValorN % 9) && yValorN == g.getListValue('ListaY', xValorN % 9 + 1)) || yValorN <= g.getListValue('ListaY', xValorN % 9 + 1)) {yValorN = parseInt(Math.random() * 8)}
    return yValorN
}