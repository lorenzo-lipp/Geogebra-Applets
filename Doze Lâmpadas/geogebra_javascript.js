function ggbOnInit() {
}

g = ggbApplet
ultimaCombinacao = [g.getValue('sorteado1'), g.getValue('sorteado2')]
selecionados = []

function acenderLampadas() {
    for (var i = 1; i < 13; i++) {g.setVisible('On' + i, 0)}
    sorteado1 = g.getValue('sorteado1')
    sorteado2 = g.getValue('sorteado2')
    for (var i = 1; i < 13; i++) {
        if(Math.floor(i/sorteado1) == i/sorteado1 && Math.floor(i/sorteado2) == i/sorteado2){g.setVisible('On' + i, 0)}
        else {
            if(Math.floor(i/sorteado1) == i/sorteado1){g.setVisible('On' + i, 1)}
            else {
                if(Math.floor(i/sorteado2) == i/sorteado2){g.setVisible('On' + i, 1)}
            }
        }
    }
}

function sortear() {
    random1 = Math.floor(Math.random() * 6 + 1)
    random2 = Math.floor(Math.random() * 6 + 1)
    while (random2 == random1) {random2 = Math.floor(Math.random() * 6 + 1)}
    if(ultimaCombinacao.includes(random1) && ultimaCombinacao.includes(random2)) {sortear()}
    else {ultimaCombinacao = [random1, random2]}
    g.setValue('sorteado1', random1)
    g.setValue('sorteado2', random2)
    acenderLampadas()
}
