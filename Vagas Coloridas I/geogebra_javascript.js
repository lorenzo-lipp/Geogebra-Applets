g = ggbApplet
pontos = []

function estacionar(vaga = "") {
    if (vaga == "Vaga1") {pontos = [[-3.1, -4.1], [-2.7, -3.4], [-1.8, -4.85]]}
    if (vaga == "Vaga2") {pontos = [[-2.5, -1.15], [-1.8, -0.75], [-1.75, -2.45]]}
    if (vaga == "Vaga3") {pontos = [[0.25, 0.5], [1.05, 0.5], [0.25, -1]]}
    if (vaga == "Vaga4") {pontos = [[3.8, -1.15], [3.1, -0.75], [3.05, -2.45]]}
    if (vaga == "Vaga5") {pontos = [[4.4, -4.1], [4, -3.4], [3.1, -4.85]]}
    if (vaga == "Vaga6") {pontos = [[0.25, -6.5], [1.05, -6.5], [0.25, -5]]}
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