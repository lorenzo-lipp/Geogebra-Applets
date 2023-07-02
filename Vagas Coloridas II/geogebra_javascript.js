g = ggbApplet
pontos = []

function estacionar(vaga = "") {
    if (vaga == "Vaga1") {pontos = [[-2.85, -5.8], [-3.25, -5.1], [-1.55, -5.05]]}
    if (vaga == "Vaga2") {pontos = [[-3.1, -1.5], [-2.7, -0.8], [-1.8, -2.25]]}
    if (vaga == "Vaga3") {pontos = [[0.25, 1.4], [1.05, 1.4], [0.25, -0.1]]}
    if (vaga == "Vaga4") {pontos = [[4.4, -1.5], [4, -0.8], [3.1, -2.25]]}
    if (vaga == "Vaga5") {pontos = [[4.15, -5.8], [4.55, -5.1], [2.85, -5.05]]}
    if (vaga == "Vaga6") {pontos = [[0.25, -7.1], [1.05, -7.1], [0.25, -5.6]]}
}

function moverCarro(carro) {
    if (carro == "Amarelo") {
        g.setCoords("Amarelo1", pontos[0][0], pontos[0][1])
        g.setCoords("Amarelo2", pontos[1][0], pontos[1][1])
        g.setCoords("Amarelo4", pontos[2][0], pontos[2][1])
    }
    if (carro == "Rosa") {
        g.setCoords("Rosa1", pontos[0][0], pontos[0][1])
        g.setCoords("Rosa2", pontos[1][0], pontos[1][1])
        g.setCoords("Rosa4", pontos[2][0], pontos[2][1])
    }
    if (carro == "Vermelho") {
        g.setCoords("Vermelho1", pontos[0][0], pontos[0][1])
        g.setCoords("Vermelho2", pontos[1][0], pontos[1][1])
        g.setCoords("Vermelho4", pontos[2][0], pontos[2][1])
    }
    if (carro == "Verde") {
        g.setCoords("Verde1", pontos[0][0], pontos[0][1])
        g.setCoords("Verde2", pontos[1][0], pontos[1][1])
        g.setCoords("Verde4", pontos[2][0], pontos[2][1])
    }
    if (carro == "Azul") {
        g.setCoords("Azul1", pontos[0][0], pontos[0][1])
        g.setCoords("Azul2", pontos[1][0], pontos[1][1])
        g.setCoords("Azul4", pontos[2][0], pontos[2][1])
    }
}

function trocarCarros(vaga1, vaga2) {
    textoVaga2 = g.getValueString(vaga1)
    textoVaga1 = g.getValueString(vaga2)
    g.setTextValue(vaga2, textoVaga2)
    g.setTextValue(vaga1, textoVaga1)
    estacionar(vaga1)
    moverCarro(textoVaga1)
    estacionar(vaga2)
    moverCarro(textoVaga2)
}