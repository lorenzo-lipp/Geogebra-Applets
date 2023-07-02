tB = 30
tC = 50
tC2 = 60
tR = 95
BY = -4.35
CY = -3.25
RY = -2.25
time = 0
lista = []
restantes = 5
coletados = {'A': 0, 'B': 0, 'C':0, 'D':0}
function pegarDireita(vertical, horizontal, ponto, t) {setTimeout(function() {
    if (time < t) {
        ggbApplet.setCoords('F', horizontal - time * 0.1, vertical)
        time++
        pegarDireita(vertical, horizontal, ponto, t)}
    else if (time > t - 1 && time < 2*t) {
        ggbApplet.setCoords('F', horizontal - (t-1) * 0.1 + (time - t + 1) * 0.1, vertical)
        ggbApplet.setFixed(ponto, 0, 0)
        ggbApplet.setCoords(ponto, horizontal - (t-1) * 0.1 + (time - t + 1) * 0.1 + 2.55, ggbApplet.getYcoord(ponto))
        ggbApplet.setFixed(ponto, 1, 0)
        time++
        pegarDireita(vertical, horizontal, ponto, t)}
    else {
        time = 0;
        restantes--
        ggbApplet.setValue('restantes', restantes)
        coletados[ponto] = 1
        if(lista.length > 1) {lista = [lista[1]]} else {lista = []}
        ggbApplet.setValue('executar', ggbApplet.getValue('executar') + 1)
    }
}, 33/1.5)}
function pegarEsquerda(vertical, horizontal, ponto, t) {setTimeout(function() {
    if (time < t) {
        ggbApplet.setCoords('F2', horizontal + time * 0.1, vertical)
        time++
        pegarEsquerda(vertical, horizontal, ponto, t)}
    else if (time > t - 1 && time < 2*t + 8) {
        ggbApplet.setCoords('F2', horizontal + (t-1) * 0.1 - (time - t + 1) * 0.1, vertical)
        ggbApplet.setFixed(ponto, 0, 0)
        ggbApplet.setCoords(ponto, horizontal + 15 + (t-1) * 0.1 - (time - t + 1) * 0.1 - 4.55, ggbApplet.getYcoord(ponto))
        ggbApplet.setFixed(ponto, 1, 0)
        time++
        pegarEsquerda(vertical, horizontal, ponto, t)}
    else {
        time = 0;
        restantes--
        ggbApplet.setValue('restantes', restantes)
        coletados[ponto] = 1
        if(lista.length > 1) {lista = [lista[1]]} else {lista = []}
        ggbApplet.setValue('executar', ggbApplet.getValue('executar') + 1)
    }
}, 33/1.5)}
function lado(vertical, horizontal, ponto, t, string, gabriel) {
    if (gabriel == 'gabriel') {ggbApplet.setVisible('BraçoGabriel1', 1); ggbApplet.setVisible('BraçoGabriel2', 1)}
    else {ggbApplet.setVisible('BraçoGabriel1', 0); ggbApplet.setVisible('BraçoGabriel2', 0)}
    if(ponto == "A" || ponto == "B") {ggbApplet.setLayer('BraçoDireita', 3); ggbApplet.setLayer('BraçoEsquerda', 3); ggbApplet.setLayer('BraçoGabriel1', 3); ggbApplet.setLayer('BraçoGabriel2', 3)}
    if(ponto == "C" || ponto == "D") {ggbApplet.setLayer('BraçoDireita', 4); ggbApplet.setLayer('BraçoEsquerda', 4); ggbApplet.setLayer('BraçoGabriel1', 4); ggbApplet.setLayer('BraçoGabriel2', 4)}
    if(ponto == "E") {ggbApplet.setLayer('BraçoDireita', 2); ggbApplet.setLayer('BraçoEsquerda', 2)}
    if (string == 'esquerda') {
        ggbApplet.setVisible('BraçoDireita', 0);
        ggbApplet.setVisible('BraçoEsquerda', 1);
        pegarEsquerda(vertical, horizontal, ponto, t)
    } 
    else if (string == 'direita') {
        ggbApplet.setVisible('BraçoEsquerda', 0);
        ggbApplet.setVisible('BraçoDireita', 1); 
        pegarDireita(vertical, horizontal, ponto, t)
    }
}
function botao() {
    if (lista.length > 0 && ggbApplet.getValue('executar') < 1) {ggbApplet.setVisible('bt1', 1); ggbApplet.setVisible('clique', 0)} else {ggbApplet.setVisible('bt1', 0); if (ggbApplet.getValue('executar') < 1 && restantes > 0) {ggbApplet.setVisible('clique', 1)}}
}