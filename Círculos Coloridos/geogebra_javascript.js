var g = ggbApplet
var lista = ["C11", "C12", "C13", "C14", "C15", "C21", "C22", "C23", "C24", "C31", "C32", "C33", "C41", "C42", "C51"]

function atualizarCores(cor = undefined) {
    g.evalCommand("SelectObjects()")
    if (cor != undefined) {
        let valorInicial = g.getValue(cor)
        g.setValue(cor, valorInicial + 1)
        g.setValue("AtualizadorDeCores", !g.getValue("AtualizadorDeCores"))
    }
    else {
        for (var x in lista) {
            g.setValue("ok", 0)
            let modulo = g.getValue(lista[x]) % 4
            if (modulo == 0) {
                g.setColor(lista[x].toLowerCase(), 0, 204, 0)
            }
            else if (modulo == 1) {
                g.setColor(lista[x].toLowerCase(), 255, 255, 255)
            }
            else if (modulo == 2) {
                g.setColor(lista[x].toLowerCase(), 255, 51, 102)
            }
            else {
                g.setColor(lista[x].toLowerCase(), 0, 153, 255)
            }
        }
    }
}

function conferir() {
    let objeto = {}
    for (var x in lista) {
        objeto[lista[x]] = g.getValue(lista[x])
    }
    let fichas = Object.keys(objeto)
    let index = 1
    for (var x in fichas) {
        let ficha = fichas[x]
        let fichaAoLado = fichas[parseInt(x) + 1]
        let fichaAbaixo = `C${parseInt(fichas[x].slice(-2, -1)) + 1}${fichas[x].slice(-1)}`
        let objFicha = objeto[ficha] % 4
        let objFichaAoLado = objeto[fichaAoLado] % 4
        let objFichaAbaixo = objeto[fichaAbaixo] % 4

        if (index != 5 && index != 9 && index != 12 && index != 14 && index != 15) {
            if (objFichaAbaixo == 1) {return false}
            else if(objFicha == objFichaAoLado) {
                if(objFichaAbaixo != objFicha) {
                    return false
                }
            }
            else {
                if(objFichaAbaixo == objFicha || objFichaAbaixo == objFichaAoLado) {
                    return false
                }
            }
        }
        index++
    }
}

function reiniciar() {
    for (var x = 0; x < 5; x++) {
        g.setValue(lista[x], g.getListValue("l1", x + 1))
    }
    for(var x = 5; x < 15; x++) {
        g.setValue(lista[x], 1)
    }
    atualizarCores()
}

function novoJogo() {
    for (var x = 0; x < 5; x++) {
        let temporario = Math.floor(Math.random() * 3) + 2
        g.setValue(lista[x], temporario)
        g.setListValue("l1", x + 1, temporario)
    }
    for(var x = 5; x < 15; x++) {
        g.setValue(lista[x], 1)
    }
    atualizarCores()
}