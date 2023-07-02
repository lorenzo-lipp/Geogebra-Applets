// GLOBAL
function ggbOnInit() {
    
    }

function conferirTabuleiro() {
    pontos = ['B', 'B_2', 'B_3', 'B_4', 'B_5', 'B_6', 'B_7']
    var a = true
    for (var key in pontos) {
        if (ggbApplet.getXcoord(pontos[key]) > 10.5 || ggbApplet.getXcoord(pontos[key]) < 7.5) {a = false}
        if (ggbApplet.getYcoord(pontos[key]) > 3.5 || ggbApplet.getYcoord(pontos[key]) < 0.5) {a = false}
    }
    return a
}

function conferirPorcos() {
    if (Math.round(ggbApplet.getXcoord('B')) == 9 && Math.round(ggbApplet.getYcoord('B')) == 1) {
        if(Math.round(ggbApplet.getXcoord('B_4')) == 8 && Math.round(ggbApplet.getYcoord('B_4')) == 2) {
            return true
        }
    }
    if (Math.round(ggbApplet.getXcoord('B_4')) == 9 && Math.round(ggbApplet.getYcoord('B_4')) == 1) {
        if(Math.round(ggbApplet.getXcoord('B')) == 8 && Math.round(ggbApplet.getYcoord('B')) == 2) {
            return true
        }
    }
}

function conferirCavalos() {
    if (Math.round(ggbApplet.getXcoord('B_3')) == 9 && Math.round(ggbApplet.getYcoord('B_3')) == 3) {
        if(Math.round(ggbApplet.getXcoord('B_6')) == 10 && Math.round(ggbApplet.getYcoord('B_6')) == 2) {
            return true
        }
    }
    if (Math.round(ggbApplet.getXcoord('B_6')) == 9 && Math.round(ggbApplet.getYcoord('B_6')) == 3) {
        if(Math.round(ggbApplet.getXcoord('B_3')) == 10 && Math.round(ggbApplet.getYcoord('B_3')) == 2) {
            return true
        }
    }
}

function conferirVacas() {

    if (Math.round(ggbApplet.getXcoord('B_2')) == 8 && Math.round(ggbApplet.getYcoord('B_2')) == 3) {
        if (Math.round(ggbApplet.getXcoord('B_7')) == 9 && Math.round(ggbApplet.getYcoord('B_7')) == 2) {
            if (Math.round(ggbApplet.getXcoord('B_5')) == 10 && Math.round(ggbApplet.getYcoord('B_5')) == 1) {
                return true
            }
        }
        if (Math.round(ggbApplet.getXcoord('B_7')) == 10 && Math.round(ggbApplet.getYcoord('B_7')) == 1) {
            if (Math.round(ggbApplet.getXcoord('B_5')) == 9 && Math.round(ggbApplet.getYcoord('B_5')) == 2) {
                return true
            }
        }
    }

    if (Math.round(ggbApplet.getXcoord('B_2')) == 9 && Math.round(ggbApplet.getYcoord('B_2')) == 2) {
        if (Math.round(ggbApplet.getXcoord('B_7')) == 8 && Math.round(ggbApplet.getYcoord('B_7')) == 3) {
            if (Math.round(ggbApplet.getXcoord('B_5')) == 10 && Math.round(ggbApplet.getYcoord('B_5')) == 1) {
                return true
            }
        }
        if (Math.round(ggbApplet.getXcoord('B_7')) == 10 && Math.round(ggbApplet.getYcoord('B_7')) == 1) {
            if (Math.round(ggbApplet.getXcoord('B_5')) == 8 && Math.round(ggbApplet.getYcoord('B_5')) == 3) {
                return true
            }
        }
    }

    if (Math.round(ggbApplet.getXcoord('B_2')) == 10 && Math.round(ggbApplet.getYcoord('B_2')) == 1) {
        if (Math.round(ggbApplet.getXcoord('B_7')) == 8 && Math.round(ggbApplet.getYcoord('B_7')) == 3) {
            if (Math.round(ggbApplet.getXcoord('B_5')) == 9 && Math.round(ggbApplet.getYcoord('B_5')) == 2) {
                return true
            }
        }
        if (Math.round(ggbApplet.getXcoord('B_7')) == 9 && Math.round(ggbApplet.getYcoord('B_7')) == 2) {
            if (Math.round(ggbApplet.getXcoord('B_5')) == 8 && Math.round(ggbApplet.getYcoord('B_5')) == 3) {
                return true
            }
        }
    }
}

function conferirResultado() {
    ggbApplet.setVisible('Validar', 0)
    if (conferirPorcos() && conferirVacas() && conferirCavalos()) {
        ggbApplet.setTextValue('ok', '     Parabéns!')
        ggbApplet.setColor('ok', 0, 204, 0)
        ggbApplet.setVisible('ok', 1)
    }
    else {
            ggbApplet.setTextValue('ok', 'Há algo errado...')
            ggbApplet.setColor('ok', 255, 0, 0)
            ggbApplet.setVisible('ok', 1)
    }
}