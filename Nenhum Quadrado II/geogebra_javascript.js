function ggbOnInit() {
    ggbApplet.registerClickListener(click)
}

var vis = []
var inv = []
var lis = []
numero = 0
g = ggbApplet
for (var i = 1; i < 41; i++) {vis.push('s' + i); inv.push('o' + i); lis.push('l' + i)}

function click(obj) {
    nmb = obj.match(/\d+/)[0]
    if (lis.includes(obj)) {
        run = 0
        if (numero < 9) {
            if (g.getVisible('s' + nmb)) {
                g.setVisible('s' + nmb, 0)
                g.setVisible('o' + nmb, 1)
                numero++
                g.evalCommand('numero = ' + numero)
                run = 1
            }
        }
        if (run == 0 && g.getVisible('o' + nmb) && numero < 10) {
                g.setVisible('o' + nmb, 0)
                g.setVisible('s' + nmb, 1)
                numero--
                g.evalCommand('numero = ' + numero)
        }
    }
}

function conferirResultado() {
    correto = true
    hor = ['s1', 's2', 's3', 's4', 's10', 's11', 's12', 's13', 's19', 's20', 's21', 's22', 's28', 's29', 's30', 's31', 's37', 's38', 's39', 's40']
    for (var x in hor) {
        if (correto == true) {
            n = Number(hor[x].match(/\d+/)[0])
            temp = [hor[x], 's' + (n + 4), 's' + (n + 5), 's' + (n + 9)]
            tr = 0
            for (var it in temp) {if (g.getVisible(temp[it])) {tr++}}
            if (tr == temp.length){
                correto = false
                for (var it in temp) {g.setColor(temp[it], 255, 0, 0)}
            }
        }
    }
    hor = ['s1', 's2', 's3', 's10', 's11', 's12', 's19', 's20', 's21']
    for (var x in hor) {
        if (correto == true) {
            n = Number(hor[x].match(/\d+/)[0])
            temp = [hor[x], 's' + (n + 1), 's' + (n + 4), 's' + (n + 6), 's' + (n + 13), 's' + (n + 15), 's' + (n + 18), 's' + (n + 19)]
            tr = 0
            for (var it in temp) {if (g.getVisible(temp[it])) {tr++}}
            if (tr == temp.length){
                correto = false
                for (var it in temp) {g.setColor(temp[it], 255, 0, 0)}
            }
        }
    }
    hor = ['s1', 's2', 's10', 's11']
    for (var x in hor) {
        if (correto == true) {
            n = Number(hor[x].match(/\d+/)[0])
            temp = [hor[x], 's' + (n + 1), 's' + (n + 2), 's' + (n + 4), 's' + (n + 7), 's' + (n + 13), 's' + (n + 16), 's' + (n + 22), 's' + (n + 25), 's' + (n + 27), 's' + (n + 28), 's' + (n + 29)]
            tr = 0
            for (var it in temp) {if (g.getVisible(temp[it])) {tr++}}
            if (tr == temp.length){
                correto = false
                for (var it in temp) {g.setColor(temp[it], 255, 0, 0)}
            }
        }
    }
    temp = ['s1', 's2', 's3', 's4', 's5', 's9', 's14', 's18', 's23', 's27', 's32', 's36', 's37', 's38', 's39', 's40']
    if (correto == true) {
        tr = 0
        for (var it in temp) {if (g.getVisible(temp[it])) {tr++}}
        if (tr == temp.length){
            correto = false
            for (var it in temp) {g.setColor(temp[it], 255, 0, 0)}
        }
    }
    if (correto == true) {g.setVisible('ok', 1); numero = 10; g.setVisible('reiniciar', 1)} else {g.setVisible('reiniciar', 1); g.setVisible('errado', 1); numero = 10;}
}