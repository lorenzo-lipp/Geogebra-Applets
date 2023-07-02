g = ggbApplet

function conferir() {
    var valoresSlots = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for(var x = 1; x < 11; x++) {
        if(g.getValue("IsInRegion(pFlor" + x + "n1, q1)")) {valoresSlots[0] = x}
        else if(g.getValue("IsInRegion(pFlor" + x + "n1, q2)")) {valoresSlots[1] = x}
        else if(g.getValue("IsInRegion(pFlor" + x + "n1, q3)")) {valoresSlots[2] = x}
        else if(g.getValue("IsInRegion(pFlor" + x + "n1, q4)")) {valoresSlots[3] = x}
        else if(g.getValue("IsInRegion(pFlor" + x + "n1, q5)")) {valoresSlots[4] = x}
        else if(g.getValue("IsInRegion(pFlor" + x + "n1, q6)")) {valoresSlots[5] = x}
        else if(g.getValue("IsInRegion(pFlor" + x + "n1, q7)")) {valoresSlots[6] = x}
        else if(g.getValue("IsInRegion(pFlor" + x + "n1, q8)")) {valoresSlots[7] = x}
        else if(g.getValue("IsInRegion(pFlor" + x + "n1, q9)")) {valoresSlots[8] = x}
        else if(g.getValue("IsInRegion(pFlor" + x + "n1, q10)")) {valoresSlots[9] = x}
    }
    for (var x in valoresSlots) {if(valoresSlots[x] == 0) {return false}}

    var fileiras = [valoresSlots[0] + valoresSlots[1] + valoresSlots[2] + valoresSlots[3], valoresSlots[6] + valoresSlots[7] + valoresSlots[8] + valoresSlots[9], valoresSlots[0] + valoresSlots[4] + valoresSlots[6], valoresSlots[3] + valoresSlots[5] + valoresSlots[9]]
    for (var x in fileiras) {if (fileiras[x] != 22) {return false}}
    return true
}