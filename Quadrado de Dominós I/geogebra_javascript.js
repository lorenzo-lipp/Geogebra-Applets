function ggbOnInit() {
    ggbApplet.registerClickListener(click)
}

g = ggbApplet
dominos = [1,2,3,4,5,6,7,8]
valores = [[1,3], [1,6], [2,3], [2,6], [3,5], [3,6], [5,6], [6,6]]
quadrado = ['l1', 'l2']
l1X = g.getXcoord('l1_1')
l1Y = g.getYcoord('l1_1')
l1_4X = g.getXcoord('l1_4')
l1_4Y = g.getYcoord('l1_4')
l2X = g.getXcoord('l2_1')
l2Y = g.getYcoord('l2_1')
l2_4X = g.getXcoord('l2_4')
l2_4Y = g.getYcoord('l2_4')

function click(obj) {
    if (quadrado.includes(obj)) {
        clickQuadrado(obj)
    }
    else {
        if (obj.match(/Peca(\d+)/) != null) {
            clickPeca(obj)
        }
        if (obj.match(/Selecionada(\d+)/) != null) {
            clickSelecionada(obj)
        }
    }
    g.setVisible('l1', 0)
    g.setVisible('l2', 0)
    g.setVisible('Fundo2', 0)
    g.setVisible('button1', 0)
    g.setVisible('button2', 0)
    if (!(g.getVisible('ok') || g.getVisible('ok1'))) {g.setValue('conferiu', false)}
    for (var x in dominos) {
        if (g.getVisible('Selecionada' + dominos[x])) {
            g.setVisible('l1', 1);
            g.setVisible('l2', 1);
            g.setVisible('Fundo2', 1);
            if (g.getYcoord('Peca_' + dominos[x]) < 5.5) {
                g.setValue('conferiu', true);
                g.setVisible('button1', 1);
                g.setVisible('button2', 1);
                g.setVisible('ok', 0)
                g.setVisible('ok1', 0)
                g.setVisible('Reiniciar', 0)
                g.setVisible('texto1', 0)
                g.setVisible('text14', 0)
                g.setVisible('text20', 0)
                g.setVisible('text26', 0)
            }
            break
        }
    }
    atribuirValor()
}

function clickQuadrado(obj) {
    for (var x in dominos) {
        if (g.getVisible('Selecionada' + dominos[x])) {
            if (obj == 'l1') {
                fixed(0)
                g.setCoords('Peca_' + objeto[1], l1X - 0.15, l1Y - 0.2)
                g.setCoords('Peca2_' + objeto[1], l1X + 1.85, l1Y - 0.2)
                fixed(1)
                g.setVisible('Selecionada' + objeto[1], 0)
                g.setVisible('Peca' + objeto[1], 1)
            }
            else {
                fixed(0)
                g.setCoords('Peca_' + objeto[1], l2X + 0.2, l2Y - 0.2)
                g.setCoords('Peca2_' + objeto[1], l2X + 0.2, l2Y + 1.8)
                fixed(1)
                g.setVisible('Selecionada' + objeto[1], 0)
                g.setVisible('Peca' + objeto[1], 1)
            }
            break
        }
    }
}

function clickPeca(obj) {
    objeto = obj.match(/Peca(\d+)/)
    if (objeto.length == 2) {
        for (var x in dominos) {g.setVisible('Selecionada' + dominos[x], 0)}
        for (var x in dominos) {g.setVisible('Peca' + dominos[x], 1)}
        g.setVisible('Selecionada' + objeto[1], 1)
        g.setVisible('Peca' + objeto[1], 0)
    }
}

function clickSelecionada(obj) {
    objeto = obj.match(/Selecionada(\d+)/)
    if (objeto.length == 2) {
        for (var x in dominos) {g.setVisible('Selecionada' + dominos[x], 0)}
        for (var x in dominos) {g.setVisible('Peca' + dominos[x], 1)}
    }
}

function rotacionar() {
    if (g.getVisible('Selecionada' + objeto[1])) {
        if (g.getXcoord('Peca_' + objeto[1]) == l1X - 0.15 && g.getYcoord('Peca_' + objeto[1]) == l1Y - 0.2) {
            fixed(0)
            g.setCoords('Peca_' + objeto[1], l1_4X + 0.15, l1_4Y + 0.2)
            g.setCoords('Peca2_' + objeto[1], l1_4X - 1.85, l1_4Y + 0.2)
            fixed(1)
            g.setVisible('Selecionada' + objeto[1], 0)
            g.setVisible('Peca' + objeto[1], 1)
        }
        else {
            if (g.getXcoord('Peca_' + objeto[1]) == l1_4X + 0.15 && g.getYcoord('Peca_' + objeto[1]) == l1_4Y + 0.2) {
                fixed(0)
                g.setCoords('Peca_' + objeto[1], l1X - 0.15, l1Y - 0.2)
                g.setCoords('Peca2_' + objeto[1], l1X + 1.85, l1Y - 0.2)
                fixed(1)
                g.setVisible('Selecionada' + objeto[1], 0)
                g.setVisible('Peca' + objeto[1], 1)
            }
            else {
                if (g.getXcoord('Peca_' + objeto[1]) == l2X + 0.2 && g.getYcoord('Peca_' + objeto[1]) == l2Y - 0.2) {
                    fixed(0)
                    g.setCoords('Peca_' + objeto[1], l2_4X - 0.2, l2_4Y + 0.1)
                    g.setCoords('Peca2_' + objeto[1], l2_4X - 0.2, l2_4Y - 1.9)
                    fixed(1)
                    g.setVisible('Selecionada' + objeto[1], 0)
                    g.setVisible('Peca' + objeto[1], 1)
                } 
                else {
                    if (g.getXcoord('Peca_' + objeto[1]) == l2_4X - 0.2 && g.getYcoord('Peca_' + objeto[1]) == l2_4Y + 0.1) {
                        fixed(0)
                        g.setCoords('Peca_' + objeto[1], l2X + 0.2, l2Y - 0.2)
                        g.setCoords('Peca2_' + objeto[1], l2X + 0.2, l2Y + 1.8)
                        fixed(1)
                        g.setVisible('Selecionada' + objeto[1], 0)
                        g.setVisible('Peca' + objeto[1], 1)
                    }
                }
            }
        }
    }
}

function devolver() {
    if (g.getVisible('Selecionada' + objeto[1])) {
        fixed(0)
        g.setCoords('Peca_' + objeto[1], -0.4 + 2*parseInt(objeto[1] - 1), 5.53)
        g.setCoords('Peca2_' + objeto[1], -0.4 + 2*parseInt(objeto[1]), 5.53)
        fixed(1)
        g.setVisible('Selecionada' + objeto[1], 0)
        g.setVisible('Peca' + objeto[1], 1)
    }
}

function fixed(a) {
    g.setFixed('Peca_' + objeto[1], a, 0)
    g.setFixed('Peca2_' + objeto[1], a, 0)
}

function atribuirValor() {
    g.setValue("d", undefined)
    g.setValue("e", undefined)
    g.setValue("f", undefined)
    g.setValue("g", undefined)
    for (var x in dominos) {
        if(g.getXcoord('Peca_' + dominos[x]) == l1X - 0.15 && g.getYcoord('Peca_' + dominos[x]) == l1Y - 0.2) {
            g.setValue("f", valores[dominos[x]-1][1])
            g.setValue("g", valores[dominos[x]-1][0])
        }
        else {
            if (g.getXcoord('Peca_' + dominos[x]) == l1_4X + 0.15 && g.getYcoord('Peca_' + dominos[x]) == l1_4Y + 0.2) {
            g.setValue("f", valores[dominos[x]-1][0])
            g.setValue("g", valores[dominos[x]-1][1])
            }
            else {
                if (g.getXcoord('Peca_' + dominos[x]) == l2X + 0.2 && g.getYcoord('Peca_' + dominos[x]) == l2Y - 0.2) {
                    g.setValue("d", valores[dominos[x]-1][0])
                    g.setValue("e", valores[dominos[x]-1][1])
                }
                else {
                    if (g.getXcoord('Peca_' + dominos[x]) == l2_4X - 0.2 && g.getYcoord('Peca_' + dominos[x]) == l2_4Y + 0.1) {
                        g.setValue("d", valores[dominos[x]-1][1])
                        g.setValue("e", valores[dominos[x]-1][0])
                    }
                }
            }
        }
    }
}