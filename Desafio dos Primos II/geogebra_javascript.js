// GLOBAL
function ggbOnInit() {
    var botoes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    ggbApplet.registerClickListener(click)
    botoes.forEach(function(currentValue) {ggbApplet.setVisible(`button${currentValue}`, 1); ggbApplet.setVisible(`Num${currentValue}`, 0)})
    }

var ficha = ''
var fichas = {'q1': 0, 'q2': 0, 'q3': 0, 'q4': 0, 'q5': 0, 'q6': 0, 'q7': 0, 'q8': 0, 'q9': 0, 'q10': 0,
              'q11': 0, 'q12': 0, 'q13': 0, 'q14': 0, 'q15': 0, 'q16': 0, 'q17': 0, 'q18': 0, 'q19': 0, 'q20': 0}
var botoes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
var textvalue = ''
var listaDePrimos = [2,3,5,7,11,13,17,19,23,29,31,37]

function primo(valor1, valor2) {
    var resultado = valor1 + valor2; 
    if (listaDePrimos.indexOf(resultado) >= 0) {
        return true
    }
    return false
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
    ggbApplet.setVisible('ok', 0)
    ggbApplet.setVisible('ok1', 0)
    var certo = true
// Soma as fichas vizinhas e confere se é primo.
    for(var x = 1; x < 20;x++) {
        if (!primo(fichas[`q${x}`], fichas[`q${x+1}`])) {var certo = false}
    }
    if (findDuplicates(primos).length == 0 && preenchidos == 20 && certo == true && primo(fichas['q1'], fichas['q20'])) {ggbApplet.setVisible('ok1', 1)} 
    else if (preenchidos == 20) {ggbApplet.setVisible('ok', 1)}
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
    var arrayBotoes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    for (var key in fichas) {var botao = arrayBotoes.indexOf(fichas[key]); if (botao > -1) {arrayBotoes.splice(botao, 1)};}
    botoes.forEach(function(currentValue) {ggbApplet.setVisible(`button${currentValue}`, 0)})
    arrayBotoes.forEach(function(currentValue) {ggbApplet.setVisible(`button${currentValue}`, 1)})
    for (var key in fichas) {if (key == clickedName) {ficha = clickedName; ggbApplet.setVisible('ok', 0); ggbApplet.setVisible('ok1', 0)};}
    textvalue = ficha.match(/\d+/)
    if (ggbApplet.getColor(`${ficha}`) == '#330000') {ggbApplet.setVisible(`Num${textvalue}`, 0); fichas[ficha] = 0}
}