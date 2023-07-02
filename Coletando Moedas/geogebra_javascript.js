// GLOBAL
function ggbOnInit() {
    ggbApplet.registerClickListener(click)
}

g = ggbApplet
get = g.getValue
set = g.setValue
selecionado = 0
valores = [2, 2, 1, 1, 2, 1, 1, 4, 2, 1, 1, 2, 1, 1, 3, 1]
sacos = []
for(var i = 1; i < 17; i++) {sacos.push('S' + i)}
relation = {'S1':['S2', 'S5'], 'S2':['S1', 'S3', 'S6'], 'S3':['S2', 'S4', 'S7'], 'S4': ['S3', 'S8'],
            'S5':['S1', 'S6', 'S9'], 'S6': ['S5', 'S2', 'S10', 'S7'], 'S7':['S3', 'S6', 'S8', 'S11'], 'S8':['S4', 'S7', 'S12'],
            'S9':['S5', 'S10', 'S13'], 'S10':['S6', 'S9', 'S11', 'S14'], 'S11':['S7', 'S10', 'S12', 'S15'], 'S12':['S8', 'S11', 'S16'],
            'S13':['S9', 'S14'], 'S14':['S13', 'S10', 'S15'], 'S15':['S14', 'S11', 'S16'], 'S16':['S15', 'S12']}

function click(obj) {
    numero = obj.match(/\d+/)
    if(sacos.includes('S' + numero) && valores[sacos.indexOf('S' + numero)] != 0) {
        if(selecionado == 0) {g.setVisible('Selec' + valores[numero-1] + 'S' + numero, 1)}
        else {
            if(selecionado == obj || selecionado == 'S' + numero) {g.setVisible('Selec' + valores[numero-1] + 'S' + numero, 0); selecionado = 1}
            else {
                selecionado = 'S' + selecionado.match(/\d+/)
                obj = 'S' + obj.match(/\d+/)
                if(relation[selecionado].includes(obj)) {
                    numero = selecionado.match(/\d+/)
                    g.setVisible('Selec' + valores[numero-1] + 'S' + numero, 0)
                    valores[sacos.indexOf(selecionado)]-- 
                    valores[sacos.indexOf(obj)]--
                    atribuirValor()
                    selecionado = 1
                }
                else {
                    g.setVisible('Selec' + valores[numero-1] + 'S' + numero, 1)
                    numero = selecionado.match(/\d+/)
                    g.setVisible('Selec' + valores[numero-1] + 'S' + numero, 0)
                }
            }
        }
        if(selecionado != 1) {selecionado = obj}
        if(selecionado == 1) {selecionado = 0}
    }
    conferir()
}

function atribuirValor() {
    for (var x in sacos) {set(sacos[x], valores[x])}
}

function conferir() {
    errado = undefined
    saquinhos = []
    for (var x in valores) {if (valores[x] != 0) {saquinhos.push('S' + (parseInt(x) + 1))}}
    for (var x in saquinhos) {
        for (var y in saquinhos) {if (relation[saquinhos[x]].includes(saquinhos[y])) {errado = false}}
    }
    if (errado == undefined) {g.setVisible('errado', 1)}
    for (var x in valores) {if (valores[x] != 0) {return false}}
    g.setVisible('errado', 0)
    g.setVisible('ok', 1)
}