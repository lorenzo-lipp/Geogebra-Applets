// GLOBAL
function ggbOnInit() {
    
}

var apertados = ['c1', 'c2', 'c3', 'c4', 'c5', 'm1', 'm2', 'm3', 'm4', 'm5', 'b1', 'b2', 'b3', 'b4', 'b5']

function botoesApertados() {
    var x = 0
    for (var key in apertados) {
        x = x + ggbApplet.getValue(apertados[key])}
    return x
}

function texto() {
    if (botoesApertados() > 5) {
        ggbApplet.setTextValue('texto', '  Há ' + botoesApertados() + ' botões apertados...'); ggbApplet.setVisible('texto', 1)
        ggbApplet.setVisible('ok', 0)
        
    }
    else {
        ggbApplet.setVisible('texto', 0);
        if (botoesApertados() == 5) {
            ggbApplet.setVisible('ok', 1)
            if (conferir() != false) {ggbApplet.setTextValue('ok', '                          Parabéns!'); ggbApplet.setColor('ok', 0, 204, 0)}
            if (conferir() == false) {ggbApplet.setTextValue('ok', '                     Há algo errado...'); ggbApplet.setColor('ok', 255, 0, 0)}
        }
        else {ggbApplet.setVisible('ok', 0)}
    }
}

function conferir() {
    var linhaCima = ggbApplet.getValue('c1') + ggbApplet.getValue('c2') + ggbApplet.getValue('c3') + ggbApplet.getValue('c4') + ggbApplet.getValue('c5')
    if (!(linhaCima != 0 && linhaCima % 2 == 1)) {return false}
    var linhaMeio = ggbApplet.getValue('m1') + ggbApplet.getValue('m2') + ggbApplet.getValue('m3') + ggbApplet.getValue('m4') + ggbApplet.getValue('m5')
    if (!(linhaMeio != 0 && linhaMeio % 2 == 1)) {return false}
    var linhaBaixo = ggbApplet.getValue('b1') + ggbApplet.getValue('b2') + ggbApplet.getValue('b3') + ggbApplet.getValue('b4') + ggbApplet.getValue('b5')
    if (!(linhaBaixo != 0 && linhaBaixo % 2 == 1)) {return false}
    var linhaVertical1 = ggbApplet.getValue('c1') + ggbApplet.getValue('m1') + ggbApplet.getValue('b1')
    var linhaVertical2 = ggbApplet.getValue('c2') + ggbApplet.getValue('m2') + ggbApplet.getValue('b2')
    var linhaVertical3 = ggbApplet.getValue('c3') + ggbApplet.getValue('m3') + ggbApplet.getValue('b3')
    var linhaVertical4 = ggbApplet.getValue('c4') + ggbApplet.getValue('m4') + ggbApplet.getValue('b4')
    var linhaVertical5 = ggbApplet.getValue('c5') + ggbApplet.getValue('m5') + ggbApplet.getValue('b5')
    if (!(linhaVertical1 != 0 && linhaVertical1 % 2 == 1)) {return false}
    if (!(linhaVertical2 != 0 && linhaVertical2 % 2 == 1)) {return false}
    if (!(linhaVertical3 != 0 && linhaVertical3 % 2 == 1)) {return false}
    if (!(linhaVertical4 != 0 && linhaVertical4 % 2 == 1)) {return false}
    if (!(linhaVertical5 != 0 && linhaVertical5 % 2 == 1)) {return false}
}