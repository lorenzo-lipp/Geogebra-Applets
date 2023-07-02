// GLOBAL
function ggbOnInit() {
    ggbApplet.registerClickListener(click)
    var botoes = [1,2,3,4,5,6,7,8,9,10]
    botoes.forEach(function(currentValue) {ggbApplet.setVisible(`button${currentValue}`, 1); ggbApplet.setVisible(`Num${currentValue}`, 0)})
    }

var ficha = ''
var fichas = {'q1': 0, 'q2': 0, 'q3': 0, 'q4': 0, 'q5': 0, 'q6': 0, 'q7': 0, 'q8': 0, 'q9': 0, 'q10': 0}
var botoes = [1,2,3,4,5,6,7,8,9,10]
var textvalue = ''
var listaDePrimos = [2,3,5,7,11,13,17,19]

function primo(valor1, valor2) {
    var resultado = valor1 + valor2; 
    if (listaDePrimos.indexOf(resultado) >= 0) {
        return true
    }
}
    
function conferirFichas() {
    for (var key in fichas) {
        var numeroDaFicha = key.match(/\d+/); 
        if (numeroDaFicha % 2 == 0 && fichas[key] == 0) {
            ggbApplet.setColor(`${key}`,192,192,192)} 
            else if (fichas[key] == 0) {ggbApplet.setColor(`${key}`,225,225,225)};}
}
    
function conferirResultado() {
    var preenchidos = 0
    var primos = []
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
    for (var key in fichas) {
        if (fichas[key] > 0) {preenchidos ++; primos.push(fichas[key])} 
    }
// Soma as fichas vizinhas e confere se é primo.
    if (primo(fichas['q1'],fichas['q10']) && primo(fichas['q1'],fichas['q2']) && primo(fichas['q2'],fichas['q3']) && primo(fichas['q3'],fichas['q4']) && primo(fichas['q4'],fichas['q5']) && primo(fichas['q5'],fichas['q6']) && primo(fichas['q6'],fichas['q7']) && primo(fichas['q7'],fichas['q8']) && primo(fichas['q8'],fichas['q9']) && primo(fichas['q9'],fichas['q10'])) {var certo = true} else {var certo = false}
    if (findDuplicates(primos).length == 0 && preenchidos == 10 && certo == true) {ggbApplet.setTextValue('ok', 'Parabéns, essa é uma combinação possível.'); ggbApplet.setVisible('ok', 1); ggbApplet.setColor('ok',0,153,0);} else if (preenchidos == 10) {ggbApplet.setTextValue('ok', '     Essa não é uma combinação possível.'); ggbApplet.setVisible('ok', 1); ggbApplet.setColor('ok',255,0,0);}
}
    
// Ao clicar, coloca todos os quadrados sem número em suas cores originais, após, pega o objeto clicado e troca para uma cor mais escura, para demonstrar ao usuário qual ficha está selecionada.
function click(clickedName) {
// Recoloca o objeto na lista e apaga o valor do texto
    conferirFichas()
    ggbApplet.setColor(`${clickedName}`,51,0,0); 
    if (ggbApplet.getColor(`${ficha}`) == '#330000') {ggbApplet.setVisible(`Num${textvalue}`, 0); fichas[ficha] = 0}
    fichas[""] = 0
// Recolore a ficha que 
// Depois de clicar, aparece os números selecionáveis abaixo da ficha.
    var arrayBotoes = [1,2,3,4,5,6,7,8,9,10]
    for (var key in fichas) {var botao = arrayBotoes.indexOf(fichas[key]); if (botao > -1) {arrayBotoes.splice(botao, 1)};}
    botoes.forEach(function(currentValue) {ggbApplet.setVisible(`button${currentValue}`, 0)})
    arrayBotoes.forEach(function(currentValue) {ggbApplet.setVisible(`button${currentValue}`, 1)})
    for (var key in fichas) {if (key == clickedName) {ficha = clickedName; ggbApplet.setVisible('ok', 0)};}
    textvalue = ficha.match(/\d+/)
    if (ggbApplet.getColor(`${ficha}`) == '#330000') {ggbApplet.setVisible(`Num${textvalue}`, 0); fichas[ficha] = 0}
}