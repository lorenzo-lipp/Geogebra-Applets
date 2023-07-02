function ggbOnInit() {
    ggbApplet.registerClickListener(click)
}

aviao = ["Avião", "Blank"]
carro = ["Carro", "Blank"]
trem = ["Trem", "Blank"]
navio = ["Navio", "Blank"]
botoesAviao = ['button1', 'button2', 'button3', 'button4']
botoesCarro = ['button5', 'button6', 'button7', 'button8']
botoesTrem = ['button9', 'button10', 'button11', 'button12']
botoesNavio = ['button13', 'button14', 'button15', 'button16']
pessoas = ['Álvaro', 'Carla', 'Murilo', 'Rita']
respostas = [0, 0, 0, 0]

function click(obj) {
    if (obj != "") {ggbApplet.setVisible('nao', 0)}
    if (ggbApplet.getValue('t') < 2) {
    if (botoesAviao.includes(obj)) {limparCor(botoesAviao, aviao); trocarCor(obj, aviao); if (aviao[1] == "Yellow") {respostas[0] = pessoas[botoesAviao.indexOf(obj)]} else {respostas[0] = 0}}
    if (botoesCarro.includes(obj)) {limparCor(botoesCarro, carro); trocarCor(obj, carro); if (carro[1] == "Yellow") {respostas[1] = pessoas[botoesCarro.indexOf(obj)]} else {respostas[1] = 0}}
    if (botoesTrem.includes(obj)) {limparCor(botoesTrem, trem); trocarCor(obj, trem); if (trem[1] == "Yellow") {respostas[2] = pessoas[botoesTrem.indexOf(obj)]} else {respostas[2] = 0}}
    if (botoesNavio.includes(obj)) {limparCor(botoesNavio, navio); trocarCor(obj, navio); if (navio[1] == "Yellow") {respostas[3] = pessoas[botoesNavio.indexOf(obj)]} else {respostas[3] = 0}}
    mostrarBotao()
    }
}

function limparCor(l, veiculo) {
    if (veiculo[0] == "Avião") {aviao[1] = "Blank"}
    if (veiculo[0] == "Carro") {carro[1] = "Blank"}
    if (veiculo[0] == "Trem") {trem[1] = "Blank"}
    if (veiculo[0] == "Navio") {navio[1] = "Blank"}
    for (var x in l) {ggbApplet.evalCommand('SetBackgroundColor(' + l[x] + ', White)')}
}

function trocarCor(botao, veiculo = [0,0], trocarPara = '') {
    run = 0
    if (trocarPara == "Vermelho") {cor = "Red"; run = 1; mudarTabela(veiculo, "Erro")}
    if (trocarPara == "Verde") {cor = "Green"; run = 1; mudarTabela(veiculo, "Certo")}
    if (veiculo[1] == "Blank" && run == 0) {cor = "Yellow"; mudarTabela(veiculo, "Yellow"); run = 1}
    if (veiculo[1] == "Yellow" && run == 0) {cor = "White"; mudarTabela(veiculo, "Blank"); run = 1}
    ggbApplet.evalCommand('SetBackgroundColor(' + botao + ', ' + cor + ')')
}

function mudarTabela(veiculo, string) {
    if (veiculo[0] == "Avião") {aviao[1] = string}
    if (veiculo[0] == "Carro") {carro[1] = string}
    if (veiculo[0] == "Trem") {trem[1] = string}
    if (veiculo[0] == "Navio") {navio[1] = string}
}

function conferirResultado() {
    ggbApplet.setValue('t', 2)
    a = true
    for (var x in respostas) {if (respostas[x] == 0) {return false}}
    trocarCor(botoesAviao[pessoas.indexOf(respostas[0])], aviao, "Verde")
    trocarCor(botoesCarro[pessoas.indexOf(respostas[1])], carro, "Verde")
    trocarCor(botoesTrem[pessoas.indexOf(respostas[2])], trem, "Verde")
    trocarCor(botoesNavio[pessoas.indexOf(respostas[3])], navio, "Verde")
    conferirIndices(indices(respostas, "Álvaro"), 0)
    conferirIndices(indices(respostas, "Carla"), 1)
    conferirIndices(indices(respostas, "Murilo"), 2)
    conferirIndices(indices(respostas, "Rita"), 3)
    if (respostas[0] == "Álvaro") {trocarCor('button1', aviao, "Vermelho"); a = false; ggbApplet.setValue('t', 3)}
    if (respostas[2] == "Álvaro") {trocarCor('button9', trem, "Vermelho"); a = false; ggbApplet.setValue('t', 3)}
    if (respostas[3] == "Álvaro") {trocarCor('button13', navio, "Vermelho"); a = false; ggbApplet.setValue('t', 3)}
    if (!(respostas.includes('Álvaro') && respostas.includes('Carla') && respostas.includes('Murilo') && respostas.includes('Rita'))) {a = false}
    if (!(respostas[1] == "Álvaro")) {trocarCor(botoesCarro[pessoas.indexOf(respostas[1])], carro, "Vermelho"); a = false; ggbApplet.setValue('t', 3)}
    if (respostas[0] == "Carla") {trocarCor(botoesAviao[pessoas.indexOf(respostas[0])], aviao, "Vermelho"); a = false; ggbApplet.setValue('t', 2)}
    if (respostas[3] == "Murilo") {trocarCor(botoesNavio[pessoas.indexOf(respostas[3])], navio, "Vermelho"); a = false; ggbApplet.setValue('t', 4)}
    if (a == false) {return a}
    ggbApplet.setValue('t', 5)
}

function indices(lista, string) {
    ind = []
    for (var x in lista) {if (lista[x] == string) {ind.push(x)}}
    return ind
}

function conferirIndices(indice, numero) {
    if (indice.length > 1) {
        for (var x in indice) {
            if (indice[x] == 0) {trocarCor(botoesAviao[numero], aviao, "Vermelho")}
            if (indice[x] == 1) {trocarCor(botoesCarro[numero], carro, "Vermelho")}
            if (indice[x] == 2) {trocarCor(botoesTrem[numero], trem, "Vermelho")}
            if (indice[x] == 3) {trocarCor(botoesNavio[numero], navio, "Vermelho")}
        }
    }
}

function mostrarBotao() {
    for (var x in respostas) {if (respostas[x] == 0) {return false}}
    ggbApplet.setValue('t', 1)
}