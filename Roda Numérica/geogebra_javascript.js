//Global
function ggbOnInit() {}

var circulos = ['nC', 'nD', 'nE', 'nF', 'nH', 'nJ', 'nK', 'nL']
var numeros = ['n2', 'n3', 'n4', 'n6', 'text4', 'text5', 'text6', 'text7']

function colorir() {
    for (var x in circulos) {
        if (ggbApplet.getColor(circulos[x]) != '#606060') {ggbApplet.setColor(circulos[x], 192, 192, 192)}}
    for (var x in numeros) {ggbApplet.setVisible(numeros[x], 0)}
    
}

function visible() {for (var x in numeros) {ggbApplet.setVisible(numeros[x], 1)}}

function conferirCaso1() {
    if (ggbApplet.getValue('c') != NaN && ggbApplet.getValue('d') != NaN && ggbApplet.getValue('e') != NaN && ggbApplet.getValue('f') != NaN) {
        if (ggbApplet.getValue('a + b') == ggbApplet.getValue('d + e') && ggbApplet.getValue('b + c') == ggbApplet.getValue('e + f') && ggbApplet.getValue('f + a') == ggbApplet.getValue('c + d')) {return true}
        else {return false}
    }
    else {return false}
}

function conferirCaso2() {
    if (ggbApplet.getValue('h') != NaN && ggbApplet.getValue('j') != NaN && ggbApplet.getValue('k') != NaN && ggbApplet.getValue('l') != NaN) {
        if (ggbApplet.getValue('g + h') == ggbApplet.getValue('j + k') && ggbApplet.getValue('h + i') == ggbApplet.getValue('k + l') && ggbApplet.getValue('i + j') == ggbApplet.getValue('l + g')) {return true}
        else {return false}
    }
    else {return false}
}