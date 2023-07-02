var g = ggbApplet
var listaDeObjetos = []
var listaVerde = []
var listaAzul = []
var listaChamine = []
var listaMarrom = []
var listaTelhado = []
var Regexp = /\((.*?),(.*?)\)/g
var arraySegmentos = ''
var i = 1
var elementos = 0
var arrayX
var tempx
var tempy
var ultimoX
var ultimoY

/*
    OK - Arrumar erro da chaminé (desenho torto se passar do 0.5)
    Conferir a resposta antes do parabéns
    Zerar listas ao passar de nível/reiniciar
    Arrumar parabéns final e Há algo errado / botão reiniciar
*/

g.registerAddListener(linha)
g.registerClickListener(borracha)
corDaCaneta()

function linha(obj) {
    desenho = g.getValue('desenho')
    if(obj.match(/poly/) == undefined) {
        arrayX = []
        arrayY = []
        stringMatch = [...ggbApplet.getCommandString(obj).matchAll(Regexp)]
        for(var x in stringMatch) {arrayX.push(stringMatch[x][1]); arrayY.push(stringMatch[x][2])}
        ultimoX = undefined; ultimoY = undefined;
        for (var x in arrayX) {
            if(!isNaN(arrayX[x])) {
                if (desenho < 3) {tempx = Math.round(arrayX[x] * 2) / 2}
                else {tempx = Math.round(arrayX[x])}
                tempy = Math.round(arrayY[x])
                desenhar(desenho, x)
                console.log(arrayX[x], arrayY[x], tempx, tempy, arraySegmentos)
            }
        }
        if (desenho < 3) {
            if(arraySegmentos.match(/\(2.5,2\)/) != null && arraySegmentos.match(/\(3,2\)/) != null) {arraySegmentos = arraySegmentos.replace("(2.5,2),", "")}
            if(arraySegmentos.match(/\(2.5,3\)/) != null && arraySegmentos.match(/\(3,2\)/) != null) {arraySegmentos = arraySegmentos.replace("(2.5,3),", "")}
            if(arraySegmentos.match(/\(3.5,2\)/) != null && arraySegmentos.match(/\(3,2\)/) != null) {arraySegmentos = arraySegmentos.replace("(3.5,2),", "")}
            if(arraySegmentos.match(/\(3.5,3\)/) != null && arraySegmentos.match(/\(3,2\)/) != null) {arraySegmentos = arraySegmentos.replace("(3.5,3),", "")}
            if(arraySegmentos.match(/\(4,3\)/) != null && arraySegmentos.match(/\(3,2\)/) != null) {arraySegmentos = arraySegmentos.replace("(4,3),", "")}
            if(arraySegmentos.match(/\(4,3\)/) != null) {
                if (arraySegmentos.indexOf("(4.5,3),") > arraySegmentos.indexOf("(4,3),")) {arraySegmentos = arraySegmentos.replace("(4,3),", "(4,3.3),(4,3),")}
                else {arraySegmentos = arraySegmentos.replace("(4,3),", "(4,3),(4,3.3),")}
            }
            if(arraySegmentos.match(/\(4,3.3\)/) != null && arraySegmentos.match(/\(3,3\)/) != null) {arraySegmentos = arraySegmentos.replace("(3.5,3),", "")}
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
    if(obj.match(/poly/) != undefined && g.getValue('borracha')) {
        g.deleteObject(obj);
        listaDeObjetos.splice(listaDeObjetos.indexOf(obj), 1);
        g.setValue('correto', undefined);
        removerItem(listaVerde, [obj])
        removerItem(listaAzul, [obj])
        removerItem(listaChamine, [obj])
        removerItem(listaTelhado, [obj])
        removerItem(listaMarrom, [obj])
    }
    corDaCaneta()
}

function colorir(input) {
    desenho = g.getValue('desenho')
    verde = g.getValue('verde')
    verde = g.getValue('verde')
    chamine = g.getValue('chamine')
    azul = g.getValue('azul')
    if(desenho == 1 && verde) {g.setColor(input, 65, 208, 122); listaVerde.push(input)}
    else if (desenho == 1) {g.setColor(input, 160, 123, 94); listaMarrom.push(input)}
    else if (desenho == 2 && chamine) {g.setColor(input, 93, 93, 93); listaChamine.push(input)}
    else if (desenho == 2 && azul) {g.setColor(input, 94, 204, 213); listaAzul.push(input)}
    else if (desenho == 2) {g.setColor(input, 211, 143, 98); listaTelhado.push(input)}
    else {g.setColor(input, 255, 0, 0)}
    g.setLineThickness(input, 13)
}

function foraDaTela() {
    desenho = g.getValue('desenho')
    if(desenho == 3) {
        if(arraySegmentos.match(/\(\-[2-9]/) != null) {return false}
        if(arraySegmentos.match(/\([8-9]/) != null) {return false}
    }
    else {
        if(arraySegmentos.match(/\(0,/) != null) {return false}
        if(arraySegmentos.match(/\(\-/) != null) {return false}
        if(arraySegmentos.match(/\([6-9]/) != null) {return false}
    }
    if(arraySegmentos.match(/\(1[0-9]/) != null) {return false}
    if(arraySegmentos.match(/\-\d+\)/) != null) {return false}
    if(arraySegmentos.match(/0(.5)?\)/) != null) {return false}
    if(arraySegmentos.match(/[7-9]\)/) != null) {return false}
    if(arraySegmentos.match(/1[0-9]\)/) != null) {return false}
    if(arraySegmentos.length <= 8) {return false}
    return true
}

function corDaCaneta() {
    desenho = g.getValue('desenho')
    verde = g.getValue('verde')
    chamine = g.getValue('chamine')
    azul = g.getValue('azul')
    if(desenho == 1 && verde) {g.setPenColor(65, 208, 122)}
    else if (desenho == 1) {g.setPenColor(160, 123, 94)}
    else if (desenho == 2 && chamine) {g.setPenColor(93, 93, 93)}
    else if (desenho == 2 && azul) {g.setPenColor(94, 204, 213)}
    else if (desenho == 2) {g.setPenColor(211, 143, 98)}
    else {g.setPenColor(255, 0, 0)}
}

function conferir() {
    desenho = g.getValue('desenho')
    pontosT = []
    for(var x in listaDeObjetos) {
        listaTemporaria = ggbApplet.getCommandString(listaDeObjetos[x]).match(/\d+.?5?\, \d+/g)
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
        if(pTS[x] == "1.5, 5,3.5, 5") {pTS[x] = "1.5, 5,2.5, 5"; pTS.push("2.5, 5,3.5, 5")}
        else if(pTS[x] == "1.5, 5,4.5, 5") {pTS[x] = "1.5, 5,2.5, 5"; pTS.push("2.5, 5,3.5, 5", "3.5, 5,4.5, 5");}
        else if(pTS[x] == "2.5, 5,4.5, 5") {pTS[x] = "2.5, 5,3.5, 5"; pTS.push("3.5, 5,4.5, 5");}
        else if(pTS[x] == "1.5, 4,3.5, 4") {pTS[x] = "1.5, 4,2.5, 4"; pTS.push("2.5, 4,3.5, 4")}
        else if(pTS[x] == "1.5, 4,4.5, 4") {pTS[x] = "1.5, 4,2.5, 4"; pTS.push("2.5, 4,3.5, 4", "3.5, 4,4.5, 4");}
        else if(pTS[x] == "2.5, 4,4.5, 4") {pTS[x] = "2.5, 4,3.5, 4"; pTS.push("3.5, 4,4.5, 4");}
        else if(pTS[x] == "0, 3,6, 3") {pTS[x] = "0, 3,2, 3"; pTS.push("2, 3,4, 3", "4, 3,6, 3");}
        else if(pTS[x] == "0, 3,5, 3") {pTS[x] = "0, 3,2, 3"; pTS.push("2, 3,4, 3", "4, 3,5, 3");}
        else if(pTS[x] == "0, 3,4, 3") {pTS[x] = "0, 3,2, 3"; pTS.push("2, 3,4, 3");}
        else if(pTS[x] == "0, 3,3, 3") {pTS[x] = "0, 3,2, 3"; pTS.push("2, 3,3, 3");}
        else if(pTS[x] == "1, 3,6, 3") {pTS[x] = "1, 3,2, 3"; pTS.push("2, 3,4, 3", "4, 3,6, 3");}
        else if(pTS[x] == "1, 3,5, 3") {pTS[x] = "1, 3,2, 3"; pTS.push("2, 3,4, 3", "4, 3,5, 3");}
        else if(pTS[x] == "1, 3,4, 3") {pTS[x] = "1, 3,2, 3"; pTS.push("2, 3,4, 3");}
        else if(pTS[x] == "1, 3,3, 3") {pTS[x] = "1, 3,2, 3"; pTS.push("2, 3,3, 3");}
        else if(pTS[x] == "2, 3,6, 3") {pTS[x] = "2, 3,4, 3"; pTS.push("4, 3,6, 3");}
        else if(pTS[x] == "2, 3,5, 3") {pTS[x] = "2, 3,4, 3"; pTS.push("4, 3,5, 3");}
        else if(pTS[x] == "3, 3,6, 3") {pTS[x] = "3, 3,4, 3"; pTS.push("4, 3,6, 3");}
        else if(pTS[x] == "3, 3,5, 3") {pTS[x] = "3, 3,4, 3"; pTS.push("4, 3,5, 3");}
        else if(pTS[x] == "1, 2,5, 2") {pTS[x] = "1, 2,3, 2"; pTS.push("3, 2,5, 2");}
        else if(pTS[x] == "1, 2,4, 2") {pTS[x] = "1, 2,3, 2"; pTS.push("3, 2,4, 2");}
        else if(pTS[x] == "2, 2,5, 2") {pTS[x] = "2, 2,3, 2"; pTS.push("3, 2,5, 2");}
        else if(pTS[x] == "2, 2,4, 2") {pTS[x] = "2, 2,3, 2"; pTS.push("3, 2,4, 2");}
        else if(pTS[x] == "3, 6,6, 3") {pTS[x] = "3, 6,4, 5"; pTS.push("4, 5,5, 4", "5, 4,6, 3");}
        else if(pTS[x] == "3, 6,5, 4") {pTS[x] = "3, 6,4, 5"; pTS.push("4, 5,5, 4");}
        else if(pTS[x] == "4, 5,6, 3") {pTS[x] = "4, 5,5, 4"; pTS.push("5, 4,6, 3");}
        else if(pTS[x] == "0, 3,3, 6") {pTS[x] = "0, 3,1, 4"; pTS.push("1, 4,2, 5", "2, 5,3, 6");}
        else if(pTS[x] == "0, 3,2, 5") {pTS[x] = "0, 3,1, 4"; pTS.push("1, 4,2, 5");}
        else if(pTS[x] == "1, 4,3, 6") {pTS[x] = "1, 4,2, 5"; pTS.push("2, 5,3, 6");}
    }
    elementos = 0
    pTS = pTS.filter(onlyUnique)
    if(desenho == 1) {
        temporario = 0
        conferirLinhas("3.5, 5,3.5, 6")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("2.5, 5,2.5, 6")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("1.5, 5,2.5, 5", "2.5, 5,3.5, 5")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("3.5, 5,4.5, 5")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("3.5, 4,4.5, 5", "1.5, 5,2.5, 4")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("1.5, 4,2.5, 4", "2.5, 4,3.5, 4")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("3.5, 4,4.5, 4")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("3, 2,4.5, 4", "1.5, 4,3, 2")
        if(temporario == elementos) {return false} else {temporario = elementos}
        if(elementos != pTS.length) {return false}
        listaTemporaria = []
        for(var m in listaVerde) {
            lT = ggbApplet.getCommandString(listaVerde[m]).match(/\d+.?5?\, \d+/g)
            for (var x in lT) {listaTemporaria.push(lT[x])}
        }
        if(listaTemporaria.includes('3.5, 6') || listaTemporaria.includes('2.5, 6')) {return false}
        listaTemporaria = []
        for(var m in listaMarrom) {
            lT = ggbApplet.getCommandString(listaMarrom[m]).match(/\d+.?5?\, \d+/g)
            for (var x in lT) {listaTemporaria.push(lT[x])}
        }
        if(listaTemporaria.includes('1.5, 5') || listaTemporaria.includes('4.5, 5') || listaTemporaria.includes('3.5, 4') || listaTemporaria.includes('2.5, 4') || listaTemporaria.includes('3, 2')) {return false}
    }
    else if (desenho == 2) {
        conferirLinhas("1.5, 4,2.5, 4", "2.5, 4,3.5, 4")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("3.5, 4,4.5, 4")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("1.5, 5,1.5, 6", "1.5, 4,1.5, 5")
        conferirLinhas("1.5, 4,1.5, 6")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("4.5, 5,4.5, 6", "4.5, 4,4.5, 5")
        conferirLinhas("4.5, 4,4.5, 6")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("2.5, 5,2.5, 6", "2.5, 5,3.5, 5")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("3.5, 5,3.5, 6")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("3, 2,4.5, 4", "1.5, 4,3, 2")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("4.5, 3,4.5, 4", "4, 3,4.5, 3")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("4, 3,4, 3")
        if(temporario == elementos) {return false} else {temporario = elementos}
        if(elementos != pTS.length) {return false}
        listaTemporaria = []
        for(var m in listaChamine) {
            lT = ggbApplet.getCommandString(listaChamine[m]).match(/\d+.?5?\, \d+/g)
            for (var x in lT) {listaTemporaria.push(lT[x])}
        }
        if(listaTemporaria.includes('3, 2') || listaTemporaria.includes('1.5, 5') || listaTemporaria.includes('4.5, 5') || listaTemporaria.includes('2.5, 4') || listaTemporaria.includes('1.5, 4') || listaTemporaria.includes('3.5, 4')) {return false}
        listaTemporaria = []
        for(var m in listaAzul) {
            lT = ggbApplet.getCommandString(listaAzul[m]).match(/\d+.?5?\, \d+/g)
            for (var x in lT) {listaTemporaria.push(lT[x])}
        }
        if(listaTemporaria.includes('2.5, 5') || listaTemporaria.includes('3.5, 5') || listaTemporaria.includes('4.5, 3') || listaTemporaria.includes('3, 2')) {return false}
        listaTemporaria = []
        for(var m in listaTelhado) {
            lT = ggbApplet.getCommandString(listaTelhado[m]).match(/\d+.?5?\, \d+/g)
            for (var x in lT) {listaTemporaria.push(lT[x])}
        }
        if(listaTemporaria.includes('1.5, 6') || listaTemporaria.includes('4.5, 6') || listaTemporaria.includes('2.5, 5') || listaTemporaria.includes('3.5, 5') || listaTemporaria.includes('4.5, 5') || listaTemporaria.includes('1.5, 5') || listaTemporaria.includes('4.5, 3') || listaTemporaria.includes('2.5, 4') || listaTemporaria.includes('3.5, 4')) {return false}
    }
    else if (desenho == 3) {
        conferirLinhas("4, 3,5, 2", "5, 2,6, 3")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("3, 2,4, 3", "2, 3,3, 2")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("1, 2,2, 3", "0, 3,1, 2")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("3, 6,4, 3", "2, 3,3, 6")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("0, 3,1, 3", "1, 3,2, 3")
        conferirLinhas("0, 3,2, 3")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("2, 3,3, 3", "3, 3,4, 3")
        conferirLinhas("2, 3,4, 3")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("4, 3,5, 3", "5, 3,6, 3")
        conferirLinhas("4, 3,6, 3")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("1, 2,2, 2", "2, 2,3, 2")
        conferirLinhas("1, 2,3, 2")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("3, 2,4, 2", "4, 2,5, 2")
        conferirLinhas("3, 2,5, 2")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("3, 6,4, 5", "4, 5,5, 4")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("5, 4,6, 3")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("2, 5,3, 6")
        if(temporario == elementos) {return false} else {temporario = elementos}
        conferirLinhas("1, 4,2, 5", "0, 3,1, 4")
        if(temporario == elementos) {return false} else {temporario = elementos}
        if(elementos != pTS.length) {return false}
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

function desenhar(desenho, x) {
    if(desenho == 1) {condicional = (tempx == 3 && tempy == 2)}
    if(desenho == 2) {condicional = (tempx == 3 && tempy == 2) || (tempx == 4 && tempy == 3)}
    if(desenho == 3) {
        if (x != arrayX.length - 1) {
            if((!(Math.abs(arrayX[x] - tempx) >= 0.2 && Math.abs(arrayX[x] - tempx) <= 0.8) && !(Math.abs(arrayY[x] - tempy) >= 0.2 && Math.abs(arrayY[x] - tempy) <= 0.8)) || arraySegmentos == '') {
                if(tempx != ultimoX || tempy != ultimoY) {arraySegmentos += '(' + tempx + ',' + tempy + '),'}
                ultimoX = tempx
                ultimoY = tempy        
            }
        } 
        else {
            if((!(Math.abs(arrayX[x] - tempx) >= 0.4 && Math.abs(arrayX[x] - tempx) <= 0.6) && !(Math.abs(arrayY[x] - tempy) >= 0.4 && Math.abs(arrayY[x] - tempy) <= 0.6)) || arraySegmentos == '') {
                if(tempx != ultimoX || tempy != ultimoY) {arraySegmentos += '(' + tempx + ',' + tempy + '),'}
                ultimoX = tempx
                ultimoY = tempy
            }
        }
    }
    else {
        if (x != arrayX.length - 1) {
            if(tempx % 1 != 0 && (!(Math.abs(arrayY[x] - tempy) <= 0.25 && Math.abs(arrayY[x] - tempy) >= 0.75) || arraySegmentos == '') || condicional) {
                if(tempx != ultimoX || tempy != ultimoY) {arraySegmentos += '(' + tempx + ',' + tempy + '),'}
                ultimoX = tempx
                ultimoY = tempy
            }
        } 
        else {
            if(tempx % 1 != 0 && (!(Math.abs(arrayY[x] - tempy) <= 0.4 && Math.abs(arrayY[x] - tempy) >= 0.6) || arraySegmentos == '') || condicional) {
                if(tempx != ultimoX || tempy != ultimoY) {arraySegmentos += '(' + tempx + ',' + tempy + '),'}
                ultimoX = tempx
                ultimoY = tempy
            }
        }
    }
}
