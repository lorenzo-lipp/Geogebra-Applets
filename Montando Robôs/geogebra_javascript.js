g = ggbApplet
combinacoes = [[1,1,1], [1,1,3], [1,1,2],[1,2,2],[1,2,3],[1,2,1], [1,3,1], [1,3,3], [1,3,2], [2,2,2], [2,2,3], [2,2,1], [2,1,1], [2,1,3], [2,1,2], [2,3,2], [2,3,3], [2,3,1], [3,3,2],[3,3,3],[3,3,1], [3,2,1],[3,2,3],[3,2,2],[3,1,2],[3,1,3],[3,1,1]]

function confirmar() {
    cabeca = g.getValue('cabeca')
    corpo = g.getValue('corpo')
    perna = g.getValue('perna')
    index = parseInt(indexArray(combinacoes, [cabeca, corpo, perna])) + 1
    if (g.getVisible('Obscuro' + index)) {g.setVisible('Obscuro' + index, 0); g.setVisible('Combinacao' + index, 1)}
    else {g.setVisible('Jaclicou', 1)}
    parabens()
}

function apagarMSG() {
    g.setVisible('Jaclicou', 0)
}

function indexArray(lista = [[], []], elemento = []) {
    for (var x in lista) {if(lista[x][0] == elemento[0] && lista[x][1] == elemento[1] && lista[x][2] == elemento[2]) {return x}}
}

function parabens() {
    for (var i = 1; i < 28; i++) {if(g.getVisible('Obscuro' + i)) {return false}}
    g.setVisible('ok', 1)
    g.setVisible('Confirmar', 0)
}