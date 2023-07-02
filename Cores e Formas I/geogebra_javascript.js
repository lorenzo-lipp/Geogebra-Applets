// GLOBAL
function ggbOnInit() {
    
    }

var Laranja = {'Triângulo' : 'B', 'Quadrado' : 'B_3', 'Circulo' : 'B_7'}
var Azul = {'Triângulo' : 'B_1', 'Quadrado' : 'B_4', 'Circulo' : 'B_8'}
var Verde = {'Triângulo' : 'B_2', 'Quadrado' : 'B_5', 'Circulo' : 'B_6'}

// Confere se não existem quadrados, triângulos ou círculos na mesma linha
function conferir(string) {
    if ((ggbApplet.getXcoord(Laranja[string]) != ggbApplet.getXcoord(Azul[string])) && (ggbApplet.getXcoord(Laranja[string]) != ggbApplet.getXcoord(Verde[string])) && (ggbApplet.getXcoord(Verde[string]) != ggbApplet.getXcoord(Azul[string]))) {
        if ((ggbApplet.getYcoord(Laranja[string]) != ggbApplet.getYcoord(Azul[string])) && (ggbApplet.getYcoord(Laranja[string]) != ggbApplet.getYcoord(Verde[string])) && (ggbApplet.getYcoord(Verde[string]) != ggbApplet.getYcoord(Azul[string]))) {
            return true
        }
    }
}

// Confere se está no tabuleiro
function conferirTabuleiro(Cor) {
    for (var key in Cor) {
        if ( 8 <= ggbApplet.getXcoord(Cor[key]) && ggbApplet.getXcoord(Cor[key]) <= 10 && 1 <= ggbApplet.getYcoord(Cor[key]) && ggbApplet.getYcoord(Cor[key]) <= 3) {}
        else {return false}
    }
}

// Confere se não existem peças da mesma cor na mesma linha
function conferirCor(Cor) {
    if (ggbApplet.getXcoord(Cor['Triângulo']) != ggbApplet.getXcoord(Cor['Quadrado']) && ggbApplet.getYcoord(Cor['Triângulo']) != ggbApplet.getYcoord(Cor['Quadrado'])) {} else {return false}
    if (ggbApplet.getXcoord(Cor['Triângulo']) != ggbApplet.getXcoord(Cor['Circulo']) && ggbApplet.getYcoord(Cor['Triângulo']) != ggbApplet.getYcoord(Cor['Circulo'])) {} else {return false}
    if (ggbApplet.getXcoord(Cor['Circulo']) != ggbApplet.getXcoord(Cor['Quadrado']) && ggbApplet.getYcoord(Cor['Circulo']) != ggbApplet.getYcoord(Cor['Quadrado'])) {} else {return false}
}

// Confere se não existem peças no mesmo quadrado do tabuleiro
function conferirPosicoes() {
    // B != B_4 && B != B_8 && B != B_5 && B != B_6 && B_3 != B_1 && B_3 != B_8 && B_3 != B_2 && B_3 != B_6 && B_7 != B_1 && B_7 != B_4 && B_7 != B_2 && B_7 != B_5 && B_1 != B_5 && B_1 != B_6 && B_4 != B_2 && B_4 != B_6 && B_8 != B_2 && B_8 != B_5
    if (ggbApplet.getVisible('q11')) {return true}
}

function conferirTudo() {
    if (conferir('Quadrado') && conferir('Triângulo') && conferir('Circulo') && conferirPosicoes()) {
        if (conferirTabuleiro(Laranja) != false && conferirTabuleiro(Verde) != false && conferirTabuleiro(Azul) != false && conferirCor(Laranja) != false && conferirCor(Verde) != false && conferirCor(Azul) != false) {ggbApplet.setVisible('errado', 0); ggbApplet.setVisible('ok', 1); ggbApplet.setTextValue('text5', "Agora sim!"); ggbApplet.setColor('text5', 0, 153, 0); ggbApplet.setVisible('text5', 1);}
        else {
            if (conferirTabuleiro(Laranja) != false && conferirTabuleiro(Verde) != false && conferirTabuleiro(Azul) != false) {ggbApplet.setVisible('ok', 0); ggbApplet.setVisible('errado', 1); ggbApplet.setTextValue('text5', "Ainda não..."); ggbApplet.setColor('text5', 255, 0, 0); ggbApplet.setVisible('text5', 1);}
            else {ggbApplet.setVisible('text5', 0); ggbApplet.setVisible('errado', 0); ggbApplet.setVisible('ok', 0);}
        }    
    }
    else {
        if (conferirTabuleiro(Laranja) != false && conferirTabuleiro(Verde) != false && conferirTabuleiro(Azul) != false) {ggbApplet.setVisible('ok', 0); ggbApplet.setVisible('errado', 1); ggbApplet.setTextValue('text5', "Ainda não..."); ggbApplet.setColor('text5', 255, 0, 0); ggbApplet.setVisible('text5', 1);}
        else {ggbApplet.setVisible('text5', 0); ggbApplet.setVisible('errado', 0); ggbApplet.setVisible('ok', 0);}
    }
}