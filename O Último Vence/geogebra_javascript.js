var g = ggbApplet
const kids = ["A", "B", "C", "D", "E", "F", "G", "H"]
var kidsPlaying = ["A", "B", "C", "D", "E", "F", "G", "H"]
var inputText;

// Função do botão Validar
function validate() {
    inputText = g.getValueString("box").toUpperCase().trim()

    if(kids.includes(inputText)) {
        let turn = kids.indexOf(inputText) + 1
        g.setValue("vez", turn)
        g.setValue("contagem", 1)
        // Inserir função que começa a contagem a partir da criança selecionada
        execute = setTimeout(function() {count(turn - 1)}, 700)
        return true
    }
    return false
}

// Função que inicia a contagem
function count(param) {
    let counting = g.getValue("contagem")
    let next = kids.indexOf(kidsPlaying[(param + 1) % kidsPlaying.length])
    
    if (kidsPlaying.length > 1) {
        if(counting <= 12) {
            g.setValue("contagem", counting + 1)
        }
        else {
            removedKid = kids[g.getValue("vez") - 1]
            param = kidsPlaying.indexOf(removedKid) -1
            removerItem(kidsPlaying, removedKid)
            g.setVisible("fig" + removedKid, 0)
            g.setValue("contagem", 1)

            if (removedKid == "C") {
                g.setValue("contagem", 14)
                return false
            }
        }
    }

    if (kidsPlaying.length <= 1) {
        if(inputText == "E") {g.setValue("contagem", 15)}
        else {g.setValue("contagem", 14)}
        return false
    }
    g.setValue("vez", next + 1)
    execute = setTimeout(function() {count(param + 1)}, 700)
}

// Função que remove um item de uma lista
function removerItem(l, i) {
    for (var x in i) {if (l.indexOf(i) != -1) {l.splice(l.indexOf(i[x]), 1)}}
}