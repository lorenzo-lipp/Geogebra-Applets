g = ggbApplet
if (g.getValueString("corInicial") == "laranja") {corDoPolvo = "Laranja"} else {corDoPolvo = "Azul"}
animais = ['AguaViva', 'Baleia', 'Carangueijo', 'CarangueijoGrande', 'Foca', 'Peixe', 'PeixeAmarelo', 'PeixeListrado', 'Tartaruga']
animalAnterior = -1
vezes = 0
vezesTotais = parseInt(g.getValueString('encontrou'))
passou = 0

function mudarLayer(corAtual) {
    if (corAtual == "Laranja") {
        g.setLayer('figPolvo1', 7)
        g.setLayer('figPolvo2', 7)
        g.setLayer('figPolvo3', 7)
        g.setLayer('figAzul1', 8)
        g.setLayer('figAzul2', 8)
        g.setLayer('figAzul3', 8)
    }
    else {
        g.setLayer('figAzul1', 7)
        g.setLayer('figAzul2', 7)
        g.setLayer('figAzul3', 7)
        g.setLayer('figPolvo1', 8)
        g.setLayer('figPolvo2', 8)
        g.setLayer('figPolvo3', 8)
    }
}

function mudarOpacidade() {
    g.setValue('opacidade', 0)
    g.setAnimating('opacidade', 1)
    g.startAnimation()
}

function mudarCor(corAtual) {
    mudarOpacidade()
    mudarLayer(corAtual)
}

function proximoAnimal() {
    vezes += 1
    aleatorio = animalAnterior
    while (aleatorio == animalAnterior) {aleatorio = Math.floor(Math.random() * 9)}
    g.setValue('executando', 1)
    g.setValue('scroll' + animais[aleatorio], -12.3)
    g.setAnimating('scroll' + animais[aleatorio], 1)
    g.startAnimation()
    animalAnterior = aleatorio
}

function toggleScroll() {
    if(g.getValue('executando')) {g.setAnimating('scroll', 1)}
    else {g.setAnimating('scroll', 0)}
    g.startAnimation()
}

function scroll(textoScroll) {
    if (g.getValue(textoScroll) > -1 && g.getValue(textoScroll) < 4 &&  !passou) {passou = 1; mudarCor(corDoPolvo); g.setValue('vezes', g.getValue('vezes') + 1)}
    else if (g.getValue(textoScroll) > 4 && passou && g.getValue(textoScroll) != 6) {
        if(vezes != vezesTotais) {proximoAnimal()} else {conferirResultado()}
        passou = 0
    }
    else if (g.getValue(textoScroll) == 6) {g.setAnimating(textoScroll, 0)}
}

function conferirResultado() {
    g.setValue('executando', 0)
    toggleScroll()
    if (g.getValueString("corInicial") == "laranja" && vezesTotais % 2) {
        if (resposta == "Azul") {g.setValue('ganhou', 1); return false}
        else {g.setValue('ganhou', 0); return false}
    }
    else if (g.getValueString("corInicial") == "laranja" && !(vezesTotais % 2)) {
        if (resposta == "Laranja") {g.setValue('ganhou', 1); return false}
        else {g.setValue('ganhou', 0); return false}
    }
    else if (vezesTotais % 2) {
        if (resposta == "Laranja") {g.setValue('ganhou', 1); return false}
        else {g.setValue('ganhou', 0); return false}
    }
    else {
        if (resposta == "Azul") {g.setValue('ganhou', 1); return false}
        else {g.setValue('ganhou', 0); return false}
    }
}