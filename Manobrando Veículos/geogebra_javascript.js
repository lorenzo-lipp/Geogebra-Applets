// GLOBAL
function ggbOnInit() {
    
}

var tabuleiroInicial = [
    1, 1, 1, 1,
    0, 0, 1, 1,
    1, 1, 0, 1,
    1, 1, 1, 1
]
var v

function moveA() {
    ggbApplet.evalCommand('Carro_A =' + ggbApplet.getValueString('Carro_A').match(/\(.*\)/)[0] + v + '(2.37, 0)')
    ggbApplet.evalCommand('Carro_A2 =' + ggbApplet.getValueString('Carro_A2').match(/\(.*\)/)[0] + v + '(2.37, 0)')
}

function moveB() {
    ggbApplet.evalCommand('Carro_B =' + ggbApplet.getValueString('Carro_B').match(/\(.*\)/)[0] + v + '(0, 2.37)')
    ggbApplet.evalCommand('Carro_B2 =' + ggbApplet.getValueString('Carro_B2').match(/\(.*\)/)[0] + v + '(0, 2.37)')
}

function moveC() {
    ggbApplet.evalCommand('Carro_C =' + ggbApplet.getValueString('Carro_C').match(/\(.*\)/)[0] + v + '(0, 2.37)')
    ggbApplet.evalCommand('Carro_C2 =' + ggbApplet.getValueString('Carro_C2').match(/\(.*\)/)[0] + v + '(0, 2.37)')
}

function moveD() {
    ggbApplet.evalCommand('Carro_D =' + ggbApplet.getValueString('Carro_D').match(/\(.*\)/)[0] + v + '(2.37, 0)')
    ggbApplet.evalCommand('Carro_D2 =' + ggbApplet.getValueString('Carro_D2').match(/\(.*\)/)[0] + v + '(2.37, 0)')
}

function moveE() {
    ggbApplet.evalCommand('Carro_E =' + ggbApplet.getValueString('Carro_E').match(/\(.*\)/)[0] + v + '(0, 2.37)')
    ggbApplet.evalCommand('Carro_E2 =' + ggbApplet.getValueString('Carro_E2').match(/\(.*\)/)[0] + v + '(0, 2.37)')
}

function moveF() {
    ggbApplet.evalCommand('Carro_F =' + ggbApplet.getValueString('Carro_F').match(/\(.*\)/)[0] + v + '(0, 2.37)')
    ggbApplet.evalCommand('Carro_F2 =' + ggbApplet.getValueString('Carro_F2').match(/\(.*\)/)[0] + v + '(0, 2.37)')
}