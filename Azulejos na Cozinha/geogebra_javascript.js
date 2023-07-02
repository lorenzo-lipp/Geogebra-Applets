// GLOBAL
function ggbOnInit() {ggbApplet.registerClickListener(listener)}

var regex = /.*(\w\d\w\d)/
var get = ggbApplet.getCommandString
var polygon = 0
var listaDePoligonos = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6']
var listaDePoligonosFixa = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6']
var listaDeCeramicas = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8']
var tipo1 = ['l1', 'm2', 'l5','m7','m8','m9']
var tipo2 = ['l2', 'l4', 'n4', 'm6', 'n6', 'l9']
var tipo3 = ['l3', 'n3', 'm4', 'n5', 'n8', 'l8']
var tipo4 = ['n2', 'm3', 'm5', 'l6', 'l7', 'n7']
var atual = listaDePoligonos[0]
var lista = []
// get(object).match(regex)[1] --- 1 = Primeira metade do polygono 2 = Segunda metade do polygono

function L(object) {
    if (polygon == 3) {
        lista.push(object)
        ponto4 = get(lista[3]).match(regex)[1]
        ldp = [ponto1, ponto2, ponto3, ponto4].sort()
        if (ml == false && mc == false) {
            if (ldp[0].match(/l\d/)[0] == ldp[1].match(/l\d/)[0]) {
                if (ldp[1].match(/l\d/)[0] == ldp[2].match(/l\d/)[0]) {ml = true}
            }
            else {
                if (ldp[1].match(/l\d/)[0] == ldp[2].match(/l\d/)[0]) {
                    if (ldp[2].match(/l\d/)[0] == ldp[3].match(/l\d/)[0]) {ml = true}
                }
            }
            if (ldp[0].match(/l\dc(\d)/)[1] == ldp[1].match(/l\dc(\d)/)[1]) {
                if (ldp[1].match(/l\dc(\d)/)[1] == ldp[2].match(/l\dc(\d)/)[1]) {mc = true}
                if (ldp[1].match(/l\dc(\d)/)[1] == ldp[3].match(/l\dc(\d)/)[1]) {mc = true}
            }
            else {
                if (ldp[1].match(/l\dc(\d)/)[1] == ldp[2].match(/l\dc(\d)/)[1]) {
                    if (ldp[2].match(/l\dc(\d)/)[1] == ldp[3].match(/l\dc(\d)/)[1]) {mc = true}
                }
                else {
                    if (ldp[0].match(/l\dc(\d)/)[1] == ldp[2].match(/l\dc(\d)/)[1]) {
                        if (ldp[2].match(/l\dc(\d)/)[1] == ldp[3].match(/l\dc(\d)/)[1]) {mc = true}
                    }
                }
            }
        }
        if (ml == true) {
            if (ldp[0].match(/l\d/)[0] < ldp[1].match(/l\d/)[0]) {
                if (ldp[0].match(/l\dc(\d)/)[1] < ldp[3].match(/l\dc(\d)/)[1]) {
                    ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[0] + '+ (1.16, 0),' + ldp[1] + '+ (1.16, 0),' + ldp[3] + '+ (1.16, 0),' + ldp[3] + '+ (1.16, -1.18),' + ldp[1] + '+ (0, -1.18)' + ')}')
                }
                else {
                    ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[0] + '+ (1.16, 0),' + ldp[3] + '+ (1.16, -1.18),' + ldp[1] + '+ (0, -1.18),' + ldp[1] + ',' + ldp[3] + ')}')
                }
            }
            else {
                if (ldp[0].match(/l\dc(\d)/)[1] < ldp[3].match(/l\dc(\d)/)[1]) {
                    if (ldp[0].match(/l\d/)[0] == ldp[1].match(/l\d/)[0] && ldp[0].match(/l\d/)[0] == ldp[2].match(/l\d/)[0] && ldp[0].match(/l\d/)[0] == ldp[3].match(/l\d/)[0]) {
                        ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[3] + '+ (1.16, 0),' + ldp[3] + '+ (1.16, -1.18),' + ldp[0] + '+ (0, -1.18)' + ')}')
                        ggbApplet.setColor(atual, 255, 0, 0)
                    }
                    else {
                        ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[2] + '+ (1.16, 0),' + ldp[3] + '+ (1.16, -1.18),' + ldp[3] + '+ (0, -1.18),' + ldp[2] + '+ (0, -1.18),' + ldp[0] + '+ (0, -1.18)' + ')}')
                    }
                        
                }
                else {
                    ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[2] + '+ (1.16, 0),' + ldp[2] + '+ (1.16, -1.18),' + ldp[0] + '+ (1.16, -1.18),' + ldp[3] + '+ (1.16, -1.18),' + ldp[3] + '+ (0, -1.18)' + ')}')
                }
            }
        }
        else {
            if (mc == true) {
                if (ldp[0].match(/l\dc(\d)/)[1] < ldp[1].match(/l\dc(\d)/)[1]) {
                    if (ldp[0].match(/l\dc(\d)/)[1] < ldp[3].match(/l\dc(\d)/)[1]) {
                        ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[1] + '+ (1.16, 0),' + ldp[3] + '+ (1.16, -1.18),' + ldp[3] + '+ (0, -1.18),' + ldp[1] + '+ (0, -1.18),' + ldp[0] + '+ (0, -1.18)' + ')}')
                    }
                    else {
                        ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[1] + '+ (1.16, 0),' + ldp[1] + '+ (1.16, -1.18),' + ldp[0] + '+ (1.16, -1.18),' + ldp[3] + '+ (1.16, -1.18),' + ldp[3] + '+ (0, -1.18)' + ')}')
                    }
                }
                else {
                    if (ldp[0].match(/l\dc(\d)/)[1] < ldp[3].match(/l\dc(\d)/)[1]) {
                        ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[0] + '+ (1.16, 0),' + ldp[2] + '+ (1.16, 0),' + ldp[3] + '+ (1.16, 0),' + ldp[3] + '+ (1.16, -1.18),' + ldp[2] + '+ (0, -1.18)' + ')}')
                    }
                    else {
                        ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[0] + '+ (1.16, 0),' + ldp[3] + '+ (1.16, -1.18),' + ldp[2] + '+ (0, -1.18),' + ldp[2] + ',' + ldp[3] + ')}')
                    }
                }
            }
            else {
                if (ldp[0].match(/l(\d)c(\d)/)[2] == ldp[2].match(/l(\d)c(\d)/)[2]) {
                    if (ldp[1].match(/l(\d)c(\d)/)[2] == ldp[3].match(/l(\d)c(\d)/)[2]) {
                        if (ldp[0].match(/l(\d)c(\d)/)[2] < ldp[1].match(/l(\d)c(\d)/)[2]) {
                            ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[1] + '+ (1.16, 0),' + ldp[3] + '+ (1.16, -1.18),' + ldp[2] + '+ (0, -1.18)' + ')}')
                        }
                        else {
                                ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[0] + '+ (1.16, 0),' + ldp[2] + '+ (1.16, -1.18),' + ldp[1] + '+ (1.16, -1.18),' + ldp[3] + '+ (1.16, -1.18),' + ldp[3] + '+ (0, -1.18),' + ldp[1] + ',' + ldp[2] + ')}')
                        }
                    }
                }
                else {
                    if (ldp[0].match(/l(\d)c(\d)/)[2] == ldp[1].match(/l(\d)c(\d)/)[2]) {
                        ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[0] + '+ (1.16, 0),' + ldp[1] + '+ (1.16, 0),' + ldp[2] + '+ (1.16, 0),' + ldp[3] + '+ (1.16, -1.18),' + ldp[3] + '+ (0, -1.18),' + ldp[2] + '+ (0, -1.18),' + ldp[1] + '+ (0, -1.18)' + ')}')
                    }
                    if (ldp[1].match(/l(\d)c(\d)/)[2] == ldp[2].match(/l(\d)c(\d)/)[2]) {
                        ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[1] + '+ (1.16, 0),' + ldp[1] + '+ (1.16, 0),' + ldp[2] + '+ (1.16, 0),' + ldp[3] + '+ (1.16, 0),' + ldp[3] + '+ (1.16, -1.18),' + ldp[2] + '+ (0, -1.18),' + ldp[1] + '+ (0, -1.18),' + ldp[0] + '+ (0, -1.18)' + ')}')
                    }
                    if (ldp[0].match(/l(\d)c(\d)/)[2] == ldp[3].match(/l(\d)c(\d)/)[2]) {
                        ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[1] + '+ (1.16, 0),' + ldp[1] + '+ (1.16, -1.18),' + ldp[0] + '+ (1.16, -1.18),' + ldp[3] + '+ (1.16, -1.18),' + ldp[2] + '+ (0, -1.18),' + ldp[2] + ',' + ldp[3] + ')}')
                    }
                }
            }
        }
        polygon++;
    }
    if (polygon == 2) {
        lista.push(object)
        ponto3 = get(lista[2]).match(regex)[1]
        ldp = [ponto1, ponto2, ponto3].sort()
        if (ldp[0].match(/l\d/)[0] == ldp[1].match(/l\d/)[0]) {
            mc = false
            if (ldp[1].match(/l\d/)[0] == ldp[2].match(/l\d/)[0]) {
                ml = true
                ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[2] + '+ (1.16,0),' + ldp[2] + '+ (1.16, -1.18),' + ldp[0] + '+ (0, -1.18)' + ')}')
            }
            else {
                ml = false
                if (ldp[0].match(/l\dc(\d)/)[1] < ldp[2].match(/l\dc(\d)/)[1]) {
                    ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[1] + '+ (1.16,0),' + ldp[2] + '+ (1.16, -1.18),' + ldp[2] + '+ (0, -1.18),' + ldp[1] + '+ (0, -1.18),' + ldp[0] + '+ (0, -1.18)' + ')}')
                }
                else {
                    ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[0] + '+ (1.16,0),' + ldp[1] + '+ (1.16, 0),' + ldp[1] + '+ (1.16, -1.18),' + ldp[0] + '+ (1.16, -1.18),'+ ldp[2] + '+ (1.16, 0),' + ldp[2] + ' + (1.16, -1.18),' + ldp[2] + '+ (0, -1.18)' + ')}')
                }
            }
        }
        else {
            ml = false
            if (ldp[1].match(/l\d/)[0] == ldp[2].match(/l\d/)[0]) {
                mc = false
                if (ldp[0].match(/l\dc(\d)/)[1] < ldp[2].match(/l\dc(\d)/)[1]) {
                    ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[0] + '+ (1.16, 0),' + ldp[1] + '+ (1.16, 0),' + ldp[2] + '+ (1.16, 0),' + ldp[2] + '+ (1.16, -1.18),' + ldp[1] + '+ (0, -1.18)' + ')}')
                }
                else {
                    ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[0] + '+ (1.16, 0),' + ldp[2] + '+ (1.16, -1.18),' + ldp[1] + '+ (0, -1.18),' + ldp[1] + ',' + ldp[2] + ')}')
                }
            }
            else {
                mc = true
                ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[0] + '+ (1.16, 0),' + ldp[2] + '+ (1.16, -1.18),' + ldp[2] + '+ (0, -1.18)' + ')}')
            }
        }
        polygon++;
    }
    if (polygon == 1) {
        lista.push(object)
        ponto2 = get(lista[1]).match(regex)[1]
        ldp = [ponto1, ponto2].sort()
        if (ldp[0].match(/l\d/)[0] == ldp[1].match(/l\d/)[0]) {ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[0] + ',' + ldp[1] + ',' + ldp[1] + '+ (1.16, 0),' + ldp[1] + '+ (1.16, -1.18),' + ldp[0] + '+ (0, -1.18)' + ')}')}
        else {ggbApplet.evalCommand(atual + '= {Polygon(' + ldp[1] + ',' + ldp[0] + ',' + ldp[0] + '+ (1.16, 0),' + ldp[0] + '+ (1.16, -1.18),'+ ldp[1] + '+ (1.16, -1.18),' + ldp[1] + '+ (0, -1.18)' + ')}')}
        polygon++; 
    }
    if (polygon == 0) {
        polygon++; 
        lista = [object];
        ponto1 = get(lista[0]).match(regex)[1]
        ggbApplet.evalCommand(atual + '= {Polygon(' + ponto1 + ',' + ponto1 + '+ (1.16, 0),' + ponto1 + '+ (1.16, -1.18),' + ponto1 + '+ (0, -1.18)' + ')}');
        ggbApplet.setColor(atual, 0, 0, 0)
    }
}

function click(object) {
    if (!(lista.includes(object))){
    if (polygon == 0) {L(object)}
    else {
        mat = Math.abs(object.match(/\d/)[0] - lista[lista.length-1].match(/\d/)[0])
        if (mat == 1) {
            if (object.match(/\w/)[0] == lista[lista.length-1].match(/\w/)[0]) {L(object)}
            else {lista = []; polygon = 0; L(object)}}
        else {
            if (mat == 0) {
                caracteres = [object.match(/\w/)[0], lista[lista.length-1].match(/\w/)[0]].sort();
                if ((caracteres[0] == 'l' && caracteres[1] == 'm') || (caracteres[0] == 'm' && caracteres[1] == 'n')) {L(object)} 
                else {lista = []; polygon = 0; L(object)}}
            else {lista = []; polygon = 0; L(object)}
        }}}}

function listener(object) {
    if (listaDePoligonosFixa.includes(object)) {ggbApplet.evalCommand(object + '= {}'); if (!(listaDePoligonos.includes(object))) {listaDePoligonos.push(object)}; lista = []; polygon = 0; atual = listaDePoligonos[0]}
    if (listaDeCeramicas.includes(object)) {
        if (lista.length < 3) {
            click(object);
        } 
        else {
            if (lista.length == 3) {
                click(object);
                if (lista.length == 4) {
                    polygon = 0; 
                    if (conferirResultado(lista)) {ggbApplet.setColor(atual, 0, 153, 0)} else {ggbApplet.setColor(atual, 255, 0, 0)}
                    lista = [];
                    listaDePoligonos.splice(listaDePoligonos.indexOf(atual), 1);
                    atual = listaDePoligonos[0];
                }
            }
        }
    }
    if (listaDePoligonos.length == 0) {
        certos = 0
        for (var verde in listaDePoligonosFixa) {
            if (ggbApplet.getColor(listaDePoligonosFixa[verde]) == '#009900') {certos++}
        }
        if (certos == 6) {ggbApplet.setVisible('ok', 1); ggbApplet.setColor('ok', 0, 153, 0); ggbApplet.setTextValue('ok', '    Parabéns!')}
        else {ggbApplet.setVisible('ok', 1); ggbApplet.setColor('ok', 255, 0, 0); ggbApplet.setTextValue('ok', 'Há algo errado')}
    }
    else {
        ggbApplet.setVisible('ok', 0)
        for (var verde in listaDePoligonosFixa) {
            if (ggbApplet.getColor(listaDePoligonosFixa[verde]) == '#FF0000') {ggbApplet.setVisible('dica', 1)}
            else {ggbApplet.setVisible('dica', 0)}
        }
    }
}

function conferirResultado(lista) {
    conferirLetras = []
    conferirNumeros = []
    conferirIguais = [0, 0, 0, 0]
    for (var x in lista) {
        if (tipo1.includes(lista[x])) {conferirIguais[0] = 1}
        if (tipo2.includes(lista[x])) {conferirIguais[1] = 1}
        if (tipo3.includes(lista[x])) {conferirIguais[2] = 1}
        if (tipo4.includes(lista[x])) {conferirIguais[3] = 1}
    }
    for (var z in conferirIguais) {if (conferirIguais[z] == 0) {return false}}
    for (var x in lista) {conferirLetras.push(lista[x].match(/\w/)[0]); conferirNumeros.push(lista[x].match(/\d/)[0])}
    mapNumeros = conferirNumeros.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()); 
    mapNumeros = [...mapNumeros.entries()]
    mapLetras = conferirLetras.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    mapLetras = [...mapLetras.entries()]
    for (var x in mapNumeros) {
        if (mapNumeros[x][1] == 2) {
            for (var y in mapLetras) {if (mapLetras[y][1] == 3) {return true}}
        }
        if (mapNumeros[x][1] == 3) {
            for (var y in mapLetras) {if (mapLetras[y][1] == 2) {return true}}
        }
    }
}

