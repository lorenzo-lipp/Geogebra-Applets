function ggbOnInit() {
    ggbApplet.registerClickListener(click)
}

valores = {'l1':0, 'l2':0, 'l3':0, 'l4':0, 'l5':0, 'l6':0, 'l7':0, 'l8':0, 'l9':0, 'l10':0, 'l11':0, 'l12':0, 'l13':0, 'l14':0, 'l15':0, 'l16':0}
valoresCorretos = {'l1':1, 'l2':0, 'l3':0, 'l4':2, 'l5':0, 'l6':1, 'l7':2, 'l8':0, 'l9':0, 'l10':1, 'l11':1, 'l12':0, 'l13':1, 'l14':0, 'l15':0, 'l16':1}
quadradosMaiores = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8']
quadradosMenores = ['l9', 'l10', 'l11', 'l12', 'l13', 'l14', 'l15', 'l16']
valoresm = {'m1':0, 'm2':0, 'm3':0, 'm4':0, 'm5':0, 'm6':0, 'm7':0, 'm8':0, 'm9':0, 'm10':0, 'm11':0, 'm12':0, 'm13':0, 'm14':0, 'm15':0, 'm16':0}
valoresmCorretos = {'m1':0, 'm2':1, 'm3':2, 'm4':0, 'm5':1, 'm6':0, 'm7':0, 'm8':2, 'm9':1, 'm10':0, 'm11':0, 'm12':1, 'm13':0, 'm14':1, 'm15':1, 'm16':0}
quadradosMaioresm = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8']
quadradosMenoresm = ['m9', 'm10', 'm11', 'm12', 'm13', 'm14', 'm15', 'm16']
valoresn = {'n1':0, 'n2':0, 'n3':0, 'n4':0, 'n5':0, 'n6':0, 'n7':0, 'n8':0, 'n9':0, 'n10':0, 'n11':0, 'n12':0, 'n13':0, 'n14':0, 'n15':0, 'n16':0}
valoresnCorretos = {'n1':0, 'n2':2, 'n3':0, 'n4':1, 'n5':2, 'n6':0, 'n7':1, 'n8':0, 'n9':1, 'n10':0, 'n11':1, 'n12':0, 'n13':0, 'n14':1, 'n15':0, 'n16':1}
quadradosMaioresn = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8']
quadradosMenoresn = ['n9', 'n10', 'n11', 'n12', 'n13', 'n14', 'n15', 'n16']

function click(obj) {
    if (quadradosMenores.includes(obj)) {
        run = 0
        num = (quadradosMenores.indexOf(obj) + 1).toString()
        if (!(ggbApplet.getVisible('Central5Triangulo' + num))) {run = 1; ggbApplet.setVisible('Central5Triangulo' + num, 1)}
        if (valores[obj] == 0 && run == 0) {
            run = 1
            ggbApplet.setColor('Central5Triangulo' + num, 53, 130, 146)
            valores[obj] = 1
        }
        if (valores[obj] == 1 && run == 0) {
            ggbApplet.setColor('Central5Triangulo' + num, 195, 224, 230)
            valores[obj] = 0
        }
    }
    if (quadradosMenoresm.includes(obj)) {
        run = 0
        num = (quadradosMenoresm.indexOf(obj) + 1).toString()
        if (!(ggbApplet.getVisible('Central7Triangulo' + num))) {run = 1; ggbApplet.setVisible('Central7Triangulo' + num, 1)}
        if (valoresm[obj] == 0 && run == 0) {
            run = 1
            ggbApplet.setColor('Central7Triangulo' + num, 53, 130, 146)
            valoresm[obj] = 1
        }
        if (valoresm[obj] == 1 && run == 0) {
            ggbApplet.setColor('Central7Triangulo' + num, 195, 224, 230)
            valoresm[obj] = 0
        }
    }
    if (quadradosMenoresn.includes(obj)) {
        run = 0
        num = (quadradosMenoresn.indexOf(obj) + 1).toString()
        if (!(ggbApplet.getVisible('Central10Triangulo' + num))) {run = 1; ggbApplet.setVisible('Central10Triangulo' + num, 1)}
        if (valoresn[obj] == 0 && run == 0) {
            run = 1
            ggbApplet.setColor('Central10Triangulo' + num, 53, 130, 146)
            valoresn[obj] = 1
        }
        if (valoresn[obj] == 1 && run == 0) {
            ggbApplet.setColor('Central10Triangulo' + num, 195, 224, 230)
            valoresn[obj] = 0
        }
    }
    if (quadradosMaiores.includes(obj)) {
        run = 0
        num = (quadradosMaiores.indexOf(obj) + 1).toString()
        if (!(ggbApplet.getVisible('Central5Trapezio' + num))) {run = 1; ggbApplet.setVisible('Central5Trapezio' + num, 1)}
        if (valores[obj] == 0 && run == 0) {
            run = 1
            ggbApplet.setColor('Central5Trapezio' + num, 53, 130, 146)
            valores[obj] = 1
        }
        if (valores[obj] == 1 && run == 0) {
            run = 1
            ggbApplet.setVisible('Central5Bolinha' + num, 1)
            ggbApplet.setVisible('Central5Desenho' + num, 1)
            ggbApplet.setColor('Central5Trapezio' + num, 195, 224, 230)
            valores[obj] = 2
        }
        if (valores[obj] == 2 && run == 0) {
            ggbApplet.setVisible('Central5Bolinha' + num, 0)
            ggbApplet.setVisible('Central5Desenho' + num, 0)
            ggbApplet.setColor('Central5Trapezio' + num, 195, 224, 230)
            valores[obj] = 0
        }
    }
    if (quadradosMaioresm.includes(obj)) {
        run = 0
        num = (quadradosMaioresm.indexOf(obj) + 1).toString()
        if (!(ggbApplet.getVisible('Central7Trapezio' + num))) {run = 1; ggbApplet.setVisible('Central7Trapezio' + num, 1)}
        if (valoresm[obj] == 0 && run == 0) {
            run = 1
            ggbApplet.setColor('Central7Trapezio' + num, 53, 130, 146)
            valoresm[obj] = 1
        }
        if (valoresm[obj] == 1 && run == 0) {
            run = 1
            ggbApplet.setVisible('Central7Bolinha' + num, 1)
            ggbApplet.setVisible('Central7Desenho' + num, 1)
            ggbApplet.setColor('Central7Trapezio' + num, 195, 224, 230)
            valoresm[obj] = 2
        }
        if (valoresm[obj] == 2 && run == 0) {
            ggbApplet.setVisible('Central7Bolinha' + num, 0)
            ggbApplet.setVisible('Central7Desenho' + num, 0)
            ggbApplet.setColor('Central7Trapezio' + num, 195, 224, 230)
            valoresm[obj] = 0
        }
    }
    if (quadradosMaioresn.includes(obj)) {
        run = 0
        num = (quadradosMaioresn.indexOf(obj) + 1).toString()
        if (!(ggbApplet.getVisible('Central10Trapezio' + num))) {run = 1; ggbApplet.setVisible('Central10Trapezio' + num, 1)}
        if (valoresn[obj] == 0 && run == 0) {
            run = 1
            ggbApplet.setColor('Central10Trapezio' + num, 53, 130, 146)
            valoresn[obj] = 1
        }
        if (valoresn[obj] == 1 && run == 0) {
            run = 1
            ggbApplet.setVisible('Central10Bolinha' + num, 1)
            ggbApplet.setVisible('Central10Desenho' + num, 1)
            ggbApplet.setColor('Central10Trapezio' + num, 195, 224, 230)
            valoresn[obj] = 2
        }
        if (valoresn[obj] == 2 && run == 0) {
            ggbApplet.setVisible('Central10Bolinha' + num, 0)
            ggbApplet.setVisible('Central10Desenho' + num, 0)
            ggbApplet.setColor('Central10Trapezio' + num, 195, 224, 230)
            valoresn[obj] = 0
        }
    }
    conferirResultado()
}

function conferirResultado() {
    peca_5 = true
    peca_7 = true
    peca_10 = true
    for (var key in valores) {if (!(valores[key] == valoresCorretos[key])) {peca_5 = false; break}}
    for (var key in valoresm) {if (!(valoresm[key] == valoresmCorretos[key])) {peca_7 = false; break}}
    for (var key in valoresn) {if (!(valoresn[key] == valoresnCorretos[key])) {peca_10 = false; break}}
    if (peca_5 && ggbApplet.getVisible('l1')) {ggbApplet.setVisible('ok5', 1); ggbApplet.setVisible('button5', 1)} else {ggbApplet.setVisible('ok5', 0); ggbApplet.setVisible('button5', 0);}
    if (peca_7 && ggbApplet.getVisible('m1')) {ggbApplet.setVisible('ok7', 1); ggbApplet.setVisible('button7', 1)} else {ggbApplet.setVisible('ok7', 0); ggbApplet.setVisible('button7', 0);}
    if (peca_10 && ggbApplet.getVisible('n1')) {ggbApplet.setVisible('ok10', 1); ggbApplet.setVisible('Reiniciar', 1)} else {ggbApplet.setVisible('ok10', 0); ggbApplet.setVisible('Reiniciar', 0)}
}

function apagar() {
    range8 = [1, 2,3,4,5,6,7,8]
    if (ggbApplet.getVisible('l1') == 0) {
        for (var i in range8) {
            ggbApplet.setVisible('Central5Desenho' + range8[i], 0)
            ggbApplet.setVisible('Central5Bolinha' + range8[i], 0)
        }
    }
    if (ggbApplet.getVisible('m1') == 0) {
        for (var i in range8) {
            ggbApplet.setVisible('Central7Desenho' + range8[i], 0)
            ggbApplet.setVisible('Central7Bolinha' + range8[i], 0)
        }
    }
}