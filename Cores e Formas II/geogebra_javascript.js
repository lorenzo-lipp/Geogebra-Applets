// GLOBAL
function ggbOnInit() {
    
}

var Laranja = {'Triângulo' : 'B', 'Quadrado' : 'B_3', 'Circulo' : 'B_7', 'Pentagono' : 'B_9'}
var Azul = {'Triângulo' : 'B_1', 'Quadrado' : 'B_4', 'Circulo' : 'B_8', 'Pentagono' : 'B_{10}'}
var Verde = {'Triângulo' : 'B_2', 'Quadrado' : 'B_5', 'Circulo' : 'B_6', 'Pentagono' : 'B_{11}'}
var Vermelho = {'Triângulo' : 'B_{12}', 'Quadrado' : 'B_{15}', 'Circulo' : 'B_{13}', 'Pentagono' : 'B_{14}'}

// Confere se não existem quadrados, triângulos ou círculos na mesma linha
function conferir(string) {
if ((ggbApplet.getXcoord(Laranja[string]) != ggbApplet.getXcoord(Azul[string])) && (ggbApplet.getXcoord(Laranja[string]) != ggbApplet.getXcoord(Verde[string])) && (ggbApplet.getXcoord(Verde[string]) != ggbApplet.getXcoord(Azul[string])) && (ggbApplet.getXcoord(Vermelho[string]) != ggbApplet.getXcoord(Azul[string])) && (ggbApplet.getXcoord(Vermelho[string]) != ggbApplet.getXcoord(Verde[string])) && (ggbApplet.getXcoord(Vermelho[string]) != ggbApplet.getXcoord(Laranja[string]))) {
    if ((ggbApplet.getYcoord(Laranja[string]) != ggbApplet.getYcoord(Azul[string])) && (ggbApplet.getYcoord(Laranja[string]) != ggbApplet.getYcoord(Verde[string])) && (ggbApplet.getYcoord(Verde[string]) != ggbApplet.getYcoord(Azul[string])) && (ggbApplet.getYcoord(Vermelho[string]) != ggbApplet.getYcoord(Azul[string])) && (ggbApplet.getYcoord(Vermelho[string]) != ggbApplet.getYcoord(Verde[string])) && (ggbApplet.getYcoord(Vermelho[string]) != ggbApplet.getYcoord(Laranja[string]))) {
        return true
    }
}
}

// Confere se está no tabuleiro
function conferirTabuleiro(Cor) {
for (var key in Cor) {
    if ( 8 <= ggbApplet.getXcoord(Cor[key]) && ggbApplet.getXcoord(Cor[key]) <= 11 && 1 <= ggbApplet.getYcoord(Cor[key]) && ggbApplet.getYcoord(Cor[key]) <= 4) {}
    else {return false}
}
}

// Confere se não existem peças da mesma cor na mesma linha
function conferirCor(Cor) {
    if (ggbApplet.getXcoord(Cor['Triângulo']) != ggbApplet.getXcoord(Cor['Quadrado']) && ggbApplet.getYcoord(Cor['Triângulo']) != ggbApplet.getYcoord(Cor['Quadrado'])) {} else {return false}
    if (ggbApplet.getXcoord(Cor['Triângulo']) != ggbApplet.getXcoord(Cor['Circulo']) && ggbApplet.getYcoord(Cor['Triângulo']) != ggbApplet.getYcoord(Cor['Circulo'])) {} else {return false}
    if (ggbApplet.getXcoord(Cor['Circulo']) != ggbApplet.getXcoord(Cor['Quadrado']) && ggbApplet.getYcoord(Cor['Circulo']) != ggbApplet.getYcoord(Cor['Quadrado'])) {} else {return false}
    if (ggbApplet.getXcoord(Cor['Pentagono']) != ggbApplet.getXcoord(Cor['Quadrado']) && ggbApplet.getYcoord(Cor['Pentagono']) != ggbApplet.getYcoord(Cor['Quadrado'])) {} else {return false}
    if (ggbApplet.getXcoord(Cor['Circulo']) != ggbApplet.getXcoord(Cor['Pentagono']) && ggbApplet.getYcoord(Cor['Circulo']) != ggbApplet.getYcoord(Cor['Pentagono'])) {} else {return false}
    if (ggbApplet.getXcoord(Cor['Pentagono']) != ggbApplet.getXcoord(Cor['Triângulo']) && ggbApplet.getYcoord(Cor['Pentagono']) != ggbApplet.getYcoord(Cor['Triângulo'])) {} else {return false}
}

// Confere se não existem peças no mesmo quadrado do tabuleiro
function conferirPosicoes() {
// B != B_4 && B != B_8 && B != B_5 && B != B_6 && B_3 != B_1 && B_3 != B_8 && B_3 != B_2 && B_3 != B_6 && B_7 != B_1 && B_7 != B_4 && B_7 != B_2 && B_7 != B_5 && B_1 != B_5 && B_1 != B_6 && B_4 != B_2 && B_4 != B_6 && B_8 != B_2 && B_8 != B_5 && B_12 != B_3 && B_12 != B_4 && B_12 != B_5 && B_12 != B_6 && B_12 != B_7 && B_12 != B_8 && B_12 != B_9 && B_12 != B_10 && B_12 != B_11 && B_15 != B && B_15 != B_1 && B_15 != B_2 && B_15 != B_6 && B_15 != B_7 && B_15 != B_8 && B_15 != B_9 && B_15 != B_10 && B_15 != B_11 && B_13 != B && B_13 != B_1 && B_13 != B_2 && B_13 != B_3 && B_13 != B_4 && B_13 != B_5 && B_13 != B_9 && B_13 != B_10 && B_13 != B_11 && B_14 != B && B_14 != B_1 && B_14 != B_2 && B_14 != B_3 && B_14 != B_4 && B_14 != B_5 && B_14 != B_6 && B_14 != B_7 && B_14 != B_8
if (ggbApplet.getVisible('q11')) {return true}
}

function conferirTudo() {
    if (conferir('Quadrado') && conferir('Triângulo') && conferir('Circulo') && conferir('Pentagono') && conferirPosicoes()) {
        if (conferirTabuleiro(Laranja) != false && conferirTabuleiro(Verde) != false && conferirTabuleiro(Azul) != false && conferirTabuleiro(Vermelho) != false && conferirCor(Laranja) != false && conferirCor(Verde) != false && conferirCor(Azul) != false && conferirCor(Vermelho) != false) {ggbApplet.setVisible('errado', 0); ggbApplet.setVisible('ok', 1); ggbApplet.setTextValue('text5', "Agora sim!"); ggbApplet.setColor('text5', 0, 153, 0); ggbApplet.setVisible('text5', 1);}
        else {
            if (conferirTabuleiro(Laranja) != false && conferirTabuleiro(Verde) != false && conferirTabuleiro(Azul) != false && conferirTabuleiro(Vermelho) != false) {ggbApplet.setVisible('ok', 0); ggbApplet.setVisible('errado', 1); ggbApplet.setTextValue('text5', "Ainda não..."); ggbApplet.setColor('text5', 255, 0, 0); ggbApplet.setVisible('text5', 1);}
            else {ggbApplet.setVisible('text5', 0); ggbApplet.setVisible('errado', 0); ggbApplet.setVisible('ok', 0);}
        }
    }    
    else {
        if (conferirTabuleiro(Laranja) != false && conferirTabuleiro(Verde) != false && conferirTabuleiro(Azul) != false  && conferirTabuleiro(Vermelho) != false) {ggbApplet.setVisible('ok', 0); ggbApplet.setVisible('errado', 1); ggbApplet.setTextValue('text5', "Ainda não..."); ggbApplet.setColor('text5', 255, 0, 0); ggbApplet.setVisible('text5', 1);}
        else {ggbApplet.setVisible('text5', 0); ggbApplet.setVisible('errado', 0); ggbApplet.setVisible('ok', 0);}
    }
}