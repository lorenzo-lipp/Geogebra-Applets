g = ggbApplet

cores = [["#FF9900", "#00CC00"], ["#FF9900", "#00CC00"], ["#FF6699", "#FFFF66"], ["#FF6699", "#FFFF66"]]

function atualizarCores(x) {
    pessoa = g.getValue('Pessoa' + x)
    coluna = g.getValue('Coluna' + x)
    string = ""
    g.setValue('ganhou', undefined)

    for (var y = 1; y < 7; y++) {
        string += `SetBackgroundColor(bt${x}${y}, "#FFFFFF")\n`
        g.setLayer(`bt${x}${y}`, 0)
    }
    g.evalCommand(string)

    if (isNaN(pessoa)) {
        if (!isNaN(coluna)) {
            g.evalCommand(`SetBackgroundColor(bt${x}${coluna}, "#9966FF")`)
            g.setLayer(`bt${x}${coluna}`, 2)
        }
    }
    else {
            g.evalCommand(`SetBackgroundColor(bt${x}${pessoa}, "${cores[x-1][pessoa-1]}")`)
            g.setLayer(`bt${x}${pessoa}`, 2)
            if (!isNaN(coluna)) {
                g.evalCommand(`SetBackgroundColor(bt${x}${coluna}, "${cores[x-1][pessoa-1]}")`)
                g.setLayer(`bt${x}${coluna}`, 2)
            }
    }
}