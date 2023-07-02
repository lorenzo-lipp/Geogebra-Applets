function ggbOnInit() {
    ggbApplet.registerClickListener(click)
}

var vis = []
var inv = []
var lis = []
numero = 0
g = ggbApplet
for (var i = 1; i < 25; i++) {vis.push('s' + i); inv.push('o' + i); lis.push('l' + i)}

function click(obj) {
    nmb = obj.match(/\d+/)[0]
    if (lis.includes(obj)) {
        run = 0
        if (numero < 6) {
            if (g.getVisible('s' + nmb)) {
                g.setVisible('s' + nmb, 0)
                g.setVisible('o' + nmb, 1)
                numero++
                g.evalCommand('numero = ' + numero)
                run = 1
            }
        }
        if (run == 0 && g.getVisible('o' + nmb) && numero < 7) {
                g.setVisible('o' + nmb, 0)
                g.setVisible('s' + nmb, 1)
                numero--
                g.evalCommand('numero = ' + numero)
        }
    }
}

function conferirResultado() {
    correto = true
    hor = ['s1', 's2', 's3', 's8', 's9', 's10', 's15', 's16', 's17', 's22', 's23', 's24']
    for (var x in hor) {
        if (correto == true) {
            n = Number(hor[x].match(/\d+/)[0])
            temp = [hor[x], 's' + (n + 3), 's' + (n + 4), 's' + (n + 7)]
            tr = 0
            for (var it in temp) {if (g.getVisible(temp[it])) {tr++}}
            if (tr == temp.length){
                correto = false
                for (var it in temp) {g.setColor(temp[it], 255, 0, 0)}
            }
        }
    }
    hor = ['s1', 's2', 's8', 's9']
    for (var x in hor) {
        if (correto == true) {
            n = Number(hor[x].match(/\d+/)[0])
            temp = [hor[x], 's' + (n + 1), 's' + (n + 3), 's' + (n + 5), 's' + (n + 10), 's' + (n + 12), 's' + (n + 14), 's' + (n + 15)]
            tr = 0
            for (var it in temp) {if (g.getVisible(temp[it])) {tr++}}
            if (tr == temp.length){
                correto = false
                for (var it in temp) {g.setColor(temp[it], 255, 0, 0)}
            }
        }
    }
    if (correto == true) {
        temp = ['s1', 's2', 's3', 's4', 's7', 's11', 's14', 's18', 's21', 's22', 's23', 's24']
        tr = 0
        for (var it in temp) {if (g.getVisible(temp[it])) {tr++}}
        if (tr == temp.length){
            correto = false
            for (var it in temp) {g.setColor(temp[it], 255, 0, 0)}
        }
    }
    if (correto == true) {g.setVisible('ok', 1); numero = 7; g.setVisible('reiniciar', 1)} else {g.setVisible('reiniciar', 1); g.setVisible('errado', 1); numero = 7;}
}