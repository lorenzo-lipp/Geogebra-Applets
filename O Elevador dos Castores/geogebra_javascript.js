g = ggbApplet
Lista1 = ['Elemento1', 'Elemento2', 'Elemento3', 'Elemento4']
Lista2 = ['elemento1', 'elemento2', 'elemento3', 'elemento4']
Lista3 = [[3, -3.75], [4, -3.75], [3.5, -3]]
Lista4 = ['Lugar1', 'Lugar2', 'Lugar3']
Iniciais = {'CastorFilho': -3, 'CastorFilha': -3.92, 'CastorMae': -2, 'Lenha': -5}
Layers = {'CastorFilho': 3, 'CastorFilha': 4, 'CastorMae': 2, 'Lenha': 5}
Cesta1 = []
Cesta2 = []
Lugares = []
CestaOrdem = ["Lenha", "CastorMae", "CastorFilho", "CastorFilha"]

function click(obj) {
    if(!g.getValue('ganhou')) {
        elevador = g.getValue('elevador')
        qL = g.getValue('quantidadeLugares')

        if(g.getValue(obj + 'X') <= -2) {
            if(elevador == 0.55) {Cesta1.push(obj); atualizarCesta(Cesta1, Lista1)}
            else if (elevador == -3.61) {Cesta2.push(obj); atualizarCesta(Cesta2, Lista2)}
        }
        else if(g.getValue(obj + 'X') == -0.5) {
            if(elevador == 0.55) {Cesta1.splice(Cesta1.indexOf(obj), 1); atualizarCesta(Cesta1, Lista1); g.setValue(obj + 'X', Iniciais[obj]); g.setValue(obj + 'Y', 1.7)}
            else if(elevador == -3.61) {Cesta1.splice(Cesta1.indexOf(obj), 1); qL++; atualizarCesta(Cesta1, Lista1); Lugares.push(obj); atualizarCesta(Lugares, Lista4)}
        }
        else if(g.getValue(obj + 'X') == 1.2) {
            if(elevador == -3.61) {Cesta2.splice(Cesta2.indexOf(obj), 1); atualizarCesta(Cesta2, Lista2); g.setValue(obj + 'X', Iniciais[obj]); g.setValue(obj + 'Y', 1.7)}
            else if(elevador == 0.55) {Cesta2.splice(Cesta2.indexOf(obj), 1); qL++; atualizarCesta(Cesta2, Lista2); Lugares.push(obj); atualizarCesta(Lugares, Lista4)}
        }
        else if(g.getValue(obj + 'X') >= 3) {
            if(elevador == 0.55) {Cesta2.push(obj); atualizarCesta(Cesta2, Lista2); qL--; Lugares.splice(Lugares.indexOf(obj), 1); atualizarCesta(Lugares, Lista4)}
            else if (elevador == -3.61) {Cesta1.push(obj); atualizarCesta(Cesta1, Lista1); qL--; Lugares.splice(Lugares.indexOf(obj), 1); atualizarCesta(Lugares, Lista4)}
        }

        g.setValue('quantidadeLugares', qL)
        g.setValue('NaoPode', 0)
    }
}

function atualizarCesta(C, L) {
    Temp = []
    for(var x in CestaOrdem) {if (C.indexOf(CestaOrdem[x]) > -1) {Temp.push(CestaOrdem[x])}}
    for(var x in Temp) {g.setValue(Temp[x] + 'X', g.getValue('x(' + L[x] + ')')); g.setValue(Temp[x] + 'Y', g.getValue('y(' + L[x] + ')'))}
}

function contarCestas() {
    Peso1 = 0
    Peso2 = 0
    Castor = 0
    if(g.getValue('CastorMaeX') == -0.5) {Peso1 += 13; Castor++} else if(g.getValue('CastorMaeX') == 1.2) {Peso2+= 13; Castor++}
    if(g.getValue('CastorFilhoX') == -0.5) {Peso1 += 7; Castor++} else if(g.getValue('CastorFilhoX') == 1.2) {Peso2+= 7; Castor++}
    if(g.getValue('CastorFilhaX') == -0.5) {Peso1 += 6; Castor++} else if(g.getValue('CastorFilhaX') == 1.2) {Peso2+= 6; Castor++}
    if(g.getValue('LenhaX') == -0.5) {Peso1 += 5} else if(g.getValue('LenhaX') == 1.2) {Peso2+= 5}
    if(Castor > 0 && (Peso1 - Peso2)**2 == 1) {return true}
    else if(Castor == 0 && (Peso1 - Peso2)**2 == 25) {return true}
    else if(Peso1 - Peso2 == 0) {return true}
    else {return false}
}
