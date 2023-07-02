// GLOBAL
function ggbOnInit() {
    ggbApplet.evalCommand('B2 = B1 + (3.03, 0)')
    ggbApplet.evalCommand('R2 = R1 + (3.03, 0)')
    ggbApplet.evalCommand('V2 = V1 + (3.03, 0)')
    ggbApplet.evalCommand('A2 = A1 + (3.03, 0)')
}

var bombom;
var y;
var last_y;
var listaDeBombons = {'A': 'Amarelo', 'B': 'Vermelho', 'V': 'Verde', 'R' : 'Roxo'};

// Pega a coordenada do ponto do bombom que está sendo arrastado e faz o polígono mais próximo ficar visível
function onUpdate(){
    if (bombom == 'a') {var listaDeValores = {'a1' : ggbApplet.getValue('a1'), 'a2' : ggbApplet.getValue('a2'), 'a3' : ggbApplet.getValue('a3'), 'a4' : ggbApplet.getValue('a4')}}
    else {if (bombom == 'b') {var listaDeValores = {'b1' : ggbApplet.getValue('b1'), 'b2' : ggbApplet.getValue('b2'), 'b3' : ggbApplet.getValue('b3'), 'b4' : ggbApplet.getValue('b4')}}
        else {if (bombom == 'r') {var listaDeValores = {'r1' : ggbApplet.getValue('r1'), 'r2' : ggbApplet.getValue('r2'), 'r3' : ggbApplet.getValue('r3'), 'r4' : ggbApplet.getValue('r4')}}
            else {if (bombom == 'v') {var listaDeValores = {'v1' : ggbApplet.getValue('v1'), 'v2' : ggbApplet.getValue('v2'), 'v3' : ggbApplet.getValue('v3'), 'v4' : ggbApplet.getValue('v4')}}}
        }
    }
    var numero = 5;
    last_y = y
// Pega a variável e vê qual é a menor
    for (var x in listaDeValores) {
        if (listaDeValores[x] < numero) {numero = listaDeValores[x], y = x};
    }
}

// Ao soltar, arrasta o ponto para o polígono mais próximo
function arrastar(){
    var BB = bombom.toUpperCase()
    if (ggbApplet.getXcoord(BB + '1') == ggbApplet.getXcoord('J') && ggbApplet.getYcoord(BB + '1') == ggbApplet.getYcoord('J')) {ggbApplet.setLayer('Bombom' + listaDeBombons[BB], 8)}
    else {if (ggbApplet.getXcoord(BB + '1') == ggbApplet.getXcoord('P') && ggbApplet.getYcoord(BB + '1') == ggbApplet.getYcoord('P')) {ggbApplet.setLayer('Bombom' + listaDeBombons[BB], 7)}
        else {if (ggbApplet.getXcoord(BB + '1') == ggbApplet.getXcoord('H') && ggbApplet.getYcoord(BB + '1') == ggbApplet.getYcoord('H')) {ggbApplet.setLayer('Bombom' + listaDeBombons[BB], 6)}
            else {if (ggbApplet.getXcoord(BB + '1') == ggbApplet.getXcoord('F') && ggbApplet.getYcoord(BB + '1') == ggbApplet.getYcoord('F')) {ggbApplet.setLayer('Bombom' + listaDeBombons[BB], 5)}
            }
        }
    }
    if (typeof y !== 'undefined') {
    if (y.match(/\d+/) == '1') {var ponto = "F"}
    else{if (y.match(/\d+/) == '2') {var ponto = "H"}
        else {if (y.match(/\d+/) == '3') {var ponto = "P"}
            else{if (y.match(/\d+/) == '4') {var ponto = "J"}}
        }
    }
}
    if (last_y != y) {
    ggbApplet.evalCommand(BB + '1 = DynamicCoordinates(B' + BB + 'P1, If(' + y + '< 0.75, x(' + ponto + '), x(B' + BB + 'P1)), If('+ y + '< 0.75, y(' + ponto + '), y(B'+  BB + 'P1)))')
    }
}