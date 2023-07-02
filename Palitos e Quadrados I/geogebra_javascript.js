horizontais = [1, 2, 6, 7]
g = ggbApplet

function trocarCor(num) {
    if (g.getValue('conferir') && !g.getValue('reiniciar')) {
        g.setValue('palitos', 0)
        if(g.getValue('n' + num)) {
            g.setValue('n' + num, 0)
        }
        else {
            g.setValue('n' + num, 1)
        }
    }
}

function conferir(palitos, quadrados) {
    g.setValue('reiniciar', 1)
    listPalitos = []; quantQuadrados = 0; list0 = []; formouQuadrado = []
    for (i = 1; i < 13; i++) {
        value = g.getValue('n' + i)
        listPalitos.push(value)
        if (!value) {list0.push(0)}
        else {formouQuadrado.push(i)}
    }
    for (var x in horizontais) {
        if (listPalitos[horizontais[x] - 1] && listPalitos[horizontais[x] + 1] && listPalitos[horizontais[x] + 2] && listPalitos[horizontais[x] + 4]) {
            quantQuadrados++
            formouQuadrado = formouQuadrado.filter(item => item !== horizontais[x] && item !== horizontais[x] + 2 && item !== horizontais[x] + 3 && item !== horizontais[x] + 5)
        }
    }
    if (listPalitos[0] && listPalitos[1] && listPalitos[2] && listPalitos[4] && listPalitos[7] && listPalitos[9] && listPalitos[10] && listPalitos[11]) {
        quantQuadrados++
        formouQuadrado = formouQuadrado.filter(item => item !== 1 && item !== 2 && item !== 3 && item !== 5 && item !== 8 && item !== 10 && item !== 11 && item !== 12)
    }
    if(list0.length != palitos) {g.setValue('palitos', 1); return false} 
    else if (formouQuadrado.length > 0) {return false}
    if (quantQuadrados != quadrados) {g.setValue('quadrados', quantQuadrados); return false}
    g.setValue('reiniciar', 0)
    g.setValue('conferir', 0)
    if (g.getValue('desafio') == 3) {g.setValue('desafio', 4)}
}
