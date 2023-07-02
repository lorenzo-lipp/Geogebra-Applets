// GLOBAL
var iniciais = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1']
var casas = {
    'A': ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
    'B': ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10'],
    'C': ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10'],
    'D': ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10'],
    'E': ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10'],
    'F': ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10'],
    'G': ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10'],
    'H': ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10'],
    'I': ['I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10'],
    'J': ['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10']
}
var numeroDasCasas = {'A':1, 'B':2, 'C':3, 'D':4, 'E':5, 'F':6, 'G':7, 'H':8, 'I':9, 'J':10}
var nomeDasCasas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
var casasPares = ['A2', 'A4', 'A6', 'A8', 'A10', 'B1', 'B3', 'B5', 'B7', 'B9','C2', 'C4', 'C6', 'C8', 'C10', 'D1', 'D3', 'D5', 'D7', 'D9','E2', 'E4', 'E6', 'E8', 'E10', 'F1', 'F3', 'F5', 'F7', 'F9','G2', 'G4', 'G6', 'G8', 'G10', 'H1', 'H3', 'H5', 'H7', 'H9', 'I2', 'I4', 'I6', 'I8', 'I10', 'J1', 'J3', 'J5', 'J7', 'J9']
var casa
var a = 0

function ggbOnInit() {
    a = 0
    corNormal()
    for (var casa in iniciais) {
        if (casasPares.includes(iniciais[casa])) {ggbApplet.setFilling(iniciais[casa], 0.60)}
        else {ggbApplet.setFilling(iniciais[casa], 0.7)}
        ggbApplet.setColor(iniciais[casa], 102, 0, 204)
    }
}

function inicio() {
    if (a == 0) {
        for (var casa in iniciais) {
            if (ggbApplet.getColor(iniciais[casa]) == '#6600CC') {ggbApplet.setFilling(iniciais[casa], 0)}
        }}
}

function click(clickedName) {
    corNormal()
    inicio()
    a++
    var letra = clickedName.match(/[A-J]/)[0]
    var numero = clickedName.match(/\d+/)[0]
    if (letra != null) {
        casa = [
            nomeDasCasas[numeroDasCasas[letra]] + (parseInt(numero) - 1).toString(),
            nomeDasCasas[numeroDasCasas[letra]] + numero,
            nomeDasCasas[numeroDasCasas[letra]] + (parseInt(numero) + 1).toString(),
            nomeDasCasas[numeroDasCasas[letra]-1] + (parseInt(numero) - 1).toString(),
            nomeDasCasas[numeroDasCasas[letra]-1] + (parseInt(numero) + 1).toString(),
            nomeDasCasas[numeroDasCasas[letra]-2] + (parseInt(numero) - 1).toString(),
            nomeDasCasas[numeroDasCasas[letra]-2] + numero,
            nomeDasCasas[numeroDasCasas[letra]-2] + (parseInt(numero) + 1).toString()
        ]
        for (var item in casa) {
            if (ggbApplet.getColor(casa[item]) != '#009900') {
                if (casasPares.includes(casa[item])) {ggbApplet.setFilling(casa[item], 0.60)}
                else {ggbApplet.setFilling(casa[item], 0.7)}
                ggbApplet.setColor(casa[item], 102, 0, 204)
            }
        }
    }
}

function corNormal() {
    for (var item in casa) {
            if (ggbApplet.getColor(casa[item]) == '#6600CC') {
                if (casasPares.includes(casa[item])) {ggbApplet.setColor(casa[item], 254, 241, 214)}
                else {ggbApplet.setColor(casa[item], 236, 161, 138)}
        }
    }
}

function conferir() {
    corNormal()
    if (ggbApplet.getValue('claras') > 3) {ggbApplet.setColor('text4', 255, 0, 0)} else {ggbApplet.setColor('text4', 0, 0, 0)}
    if (ggbApplet.getValue('escuras') > 7) {ggbApplet.setColor('text5', 255, 0, 0)} else {ggbApplet.setColor('text5', 0, 0, 0)}
    if (ggbApplet.getValue('claras') == 3 && ggbApplet.getValue('escuras') == 7) {
        ggbApplet.evalCommand('D_5 = (42.5, 15)')
        ggbApplet.setVisible('Menino', 0)
        ggbApplet.setVisible('Ganhou', 1)
        ggbApplet.setVisible('ok', 1)
        ggbApplet.setColor('ok', 0, 100, 0)
        ggbApplet.setTextValue('ok', '     Parabéns!')
        corNormal()
    }
    else {
        ggbApplet.evalCommand('D_5 = (42.5, 15)')
        ggbApplet.setVisible('ok', 1)
        ggbApplet.setColor('ok', 255, 0, 0)
        ggbApplet.setTextValue('ok', 'Há algo errado...')
        ggbApplet.setVisible('Menino', 0)
        ggbApplet.setVisible('Perdeu', 1)
    }
}