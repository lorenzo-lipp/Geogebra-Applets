g = ggbApplet
listaDeObjetos = []
listaAzul = []
Regexp = /\((.*?),(.*?)\)/g
arraySegmentos = ''
i = 1
var elementos = 0
var pontosAzuis = ['4, 4', '3, 4', '2, 4', '3, 3', '4, 2', '4, 3']
var pontosAzuisE = ['4, 4', '2, 4', '4, 2']

g.registerAddListener(linha)
g.registerClickListener(borracha)
corDaCaneta()

function linha(obj) {
    if(obj.match(/poly/) == undefined) {
        arrayX = []
        arrayY = []
        stringMatch = [...ggbApplet.getCommandString(obj).matchAll(Regexp)]
        for(var x in stringMatch) {arrayX.push(stringMatch[x][1]); arrayY.push(stringMatch[x][2])}
        ultimoX = undefined; ultimoY = undefined;
        for (var x in arrayX) {
            if (x != arrayX.length - 1) {
                if(!isNaN(arrayX[x])) {
                    tempx = Math.round(arrayX[x])
                    tempy = Math.round(arrayY[x])
                    if((!(Math.abs(arrayX[x] - tempx) >= 0.2 && Math.abs(arrayX[x] - tempx) <= 0.8) && !(Math.abs(arrayY[x] - tempy) >= 0.2 && Math.abs(arrayY[x] - tempy) <= 0.8)) || arraySegmentos == '') {
                        if(tempx != ultimoX || tempy != ultimoY) {arraySegmentos += '(' + tempx + ',' + tempy + '),'}
                        ultimoX = tempx
                        ultimoY = tempy
                    }
                }
            } 
            else {
                if(!isNaN(arrayX[x])) {
                    tempx = Math.round(arrayX[x])
                    tempy = Math.round(arrayY[x])
                    if((!(Math.abs(arrayX[x] - tempx) >= 0.4 && Math.abs(arrayX[x] - tempx) <= 0.6) && !(Math.abs(arrayY[x] - tempy) >= 0.4 && Math.abs(arrayY[x] - tempy) <= 0.6)) || arraySegmentos == '') {
                        if(tempx != ultimoX || tempy != ultimoY) {arraySegmentos += '(' + tempx + ',' + tempy + '),'}
                        ultimoX = tempx
                        ultimoY = tempy
                    }
                }
            }
        }
        if(foraDaTela()) {
            g.setValue('correto', undefined)
            g.evalCommand('poly' + i + ' = PolyLine(' + arraySegmentos.slice(0, arraySegmentos.length - 1) + ')')
            g.setFixed('poly' + i, 1, 1)
            listaDeObjetos.push('poly' + i)
            colorir('poly' + i)
            i++
        }        
        arraySegmentos = ''
        setTimeout(function () {g.setMode(0); g.setMode(62); g.deleteObject(obj)}, 100)
        g.setValue('borracha', false)
        g.setValue('caneta', true)
    }
    corDaCaneta()

}

function borracha(obj) {
    if(obj.match(/poly/) != undefined && g.getValue('borracha')) {g.deleteObject(obj); listaDeObjetos.splice(listaDeObjetos.indexOf(obj), 1); g.setValue('correto', undefined); if (listaAzul.indexOf(obj) != -1) {listaAzul.splice(listaAzul.indexOf(obj), 1)}}
    corDaCaneta()
}

function colorir(input) {
    desenho = g.getValue('desenho')
    azul = g.getValue('azul')
    if(desenho == 1) {g.setColor(input, 236, 38, 143)}
    else if (desenho == 2) {g.setColor(input, 255, 153, 51)}
    else if (desenho == 3 && !azul) {g.setColor(input, 156, 119, 92)}
    else {g.setColor(input, 81, 168, 177); listaAzul.push(input)}
    g.setLineThickness(input, 13)
}

function foraDaTela() {
    if(arraySegmentos.match(/\(\-/) != null) {return false}
    if(arraySegmentos.match(/\([7-9]/) != null) {return false}
    if(arraySegmentos.match(/\(1[0-9]/) != null) {return false}
    if(arraySegmentos.match(/\-\d+\)/) != null) {return false}
    if(arraySegmentos.match(/[7-9]\)/) != null) {return false}
    if(arraySegmentos.match(/1[0-9]\)/) != null) {return false}
    if(arraySegmentos.length <= 8) {return false}
    return true
}

function corDaCaneta() {
    desenho = g.getValue('desenho')
    azul = g.getValue('azul')
    if(desenho == 1) {g.setPenColor(236, 38, 143)}
    else if (desenho == 2) {g.setPenColor(255, 153, 51)}
    else if (desenho == 3 && !azul) {g.setPenColor(156, 119, 92)}
    else {g.setPenColor(81, 168, 177)}
}

function conferir() {
    desenho = g.getValue('desenho')
    pontosT = []
    for(var x in listaDeObjetos) {
        listaTemporaria = ggbApplet.getCommandString(listaDeObjetos[x]).match(/\d+\, \d+/g)
        for(var i in listaTemporaria) {
            if(i < listaTemporaria.length - 1) {pontosT.push([listaTemporaria[i], listaTemporaria[parseInt(i)+1]])}
        }
    }
    pTS = []
    for(var n = 0; n < pontosT.length; n++) {pontosT[n].sort(); pTS.push("" + pontosT[n])}
    for(var x in pTS) {
        removerItem(pTS, ["0, 6,1, 6", "1, 6,2, 6", "2, 6,3, 6", "3, 6,4, 6", "4, 6,5, 6", "5, 6,6, 6"])
        removerItem(pTS, ["0, 6,2, 6", "0, 6,3, 6", "0, 6,4, 6", "0, 6,5, 6", "0, 6,6, 6"])
        removerItem(pTS, ["1, 6,3, 6", "1, 6,4, 6", "1, 6,5, 6", "1, 6,6, 6"])
        removerItem(pTS, ["2, 6,4, 6", "2, 6,5, 6", "2, 6,6, 6"])
        removerItem(pTS, ["3, 6,5, 6", "3, 6,6, 6"])
        removerItem(pTS, ["4, 6,6, 6"])
        if(pTS[x] == "1, 5,5, 5") {pTS[x] = "1, 5,2, 5"; pTS.push("2, 5,3, 5", "3, 5,4, 5", "4, 5,5, 5")}
        else if(pTS[x] == "2, 5,5, 5") {pTS[x] = "2, 5,3, 5"; pTS.push("3, 5,4, 5", "4, 5,5, 5")}
        else if(pTS[x] == "1, 5,4, 5") {pTS[x] = "1, 5,2, 5"; pTS.push("2, 5,3, 5", "3, 5,4, 5")}
        else if(pTS[x] == "2, 5,4, 5") {pTS[x] = "2, 5,3, 5"; pTS.push("3, 5,4, 5")}
        else if(pTS[x] == "1, 5,3, 5") {pTS[x] = "1, 5,2, 5"; pTS.push("2, 5,3, 5")}
        else if(pTS[x] == "3, 5,5, 5") {pTS[x] = "3, 5,4, 5"; pTS.push("4, 5,5, 5")}
    }
    elementos = 0
    pTS = pTS.filter(onlyUnique)
    if(desenho == 1) {
        temporario = 0
        conferirLinhas('3, 4,3, 5', '3, 5,3, 6')
        conferirLinhas('3, 4,3, 6')
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas('1, 2,2, 3', '2, 3,3, 4')
        conferirLinhas('1, 2,3, 4')
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas('3, 4,4, 3', '4, 3,5, 2')
        conferirLinhas('3, 4,5, 2')
        if(temporario == elementos) {return false}
        if(elementos != pTS.length) {return false}
    }
    else if (desenho == 2) {
        temporario = 0
        conferirLinhas('2, 6,3, 4')
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas('3, 4,4, 6')
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas('1, 6,2, 4', '2, 4,3, 2')
        conferirLinhas('1, 6,3, 2')
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas('3, 2,4, 4', '4, 4,5, 6')
        conferirLinhas('3, 2,5, 6')
        if(temporario == elementos) {return false}
        if(elementos != pTS.length) {return false}
    }
    else if (desenho == 3) {
        temporario = 0
        conferirLinhas('1, 5,2, 6')
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas('4, 6,5, 5')
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas('1, 5,2, 5')
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas('2, 5,3, 5')
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas('3, 5,4, 5')
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas('4, 5,5, 5')
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas('4, 4,4, 5')
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas('2, 4,3, 4', '3, 4,4, 4')
        conferirLinhas('2, 4,4, 4')
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas('2, 4,3, 3', '3, 3,4, 2')
        conferirLinhas('2, 4,4, 2')
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas('4, 2,4, 3', '4, 3,4, 4')
        conferirLinhas('4, 2,4, 4')
        if(temporario == elementos) {return false}
        if(elementos != pTS.length) {return false}
        listaTemporaria = []
        for(var m in listaAzul) {
            lT = ggbApplet.getCommandString(listaAzul[m]).match(/\d+\, \d+/g)
            for (var x in lT) {listaTemporaria.push(lT[x])}
        }
        for (var x in listaTemporaria) {if (!pontosAzuis.includes(listaTemporaria[x])) {return false}}
        for (var x in pontosAzuisE) {if(!listaTemporaria.includes(pontosAzuisE[x])) {return false}}
    }
    return true
}

function conferirLinhas(string1, string2) {
    if (string2 != undefined) {if (pTS.includes(string1) && pTS.includes(string2)) {elementos++; elementos++}}
    else if (pTS.includes(string1)) {elementos++}
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

function removerItem(lista, listaDeObjetos) {
    for (var x in listaDeObjetos) {if (lista.indexOf(listaDeObjetos[x]) != -1) {lista.splice(lista.indexOf(listaDeObjetos[x]), 1)}}
  }