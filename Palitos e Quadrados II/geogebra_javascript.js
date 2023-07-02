horizontais = [1, 2, 3, 4, 5, 6, 14, 15, 16, 17, 18, 19, 27, 28, 29, 30, 31, 32]
horizontaisGG = [1,2,3,4,5,14,15,16,17,18]
palitosIniciais = [16, 17, 22, 23, 24, 29, 30, 35, 36, 37, 42, 43]
g = ggbApplet

function ggbOnInit() {
    ggbApplet.registerClickListener(click)
}

function click(object) {
    clicado = object.match(/(figPalito)(\d+)(.*)/)
    if (clicado[0] != null) {trocarCor(clicado[2])}
}

function trocarCor(num) {
    if (g.getValue('conferir') && !g.getValue('reiniciar')) {
        if(g.getValue('n' + num)) {
            g.setValue('n' + num, 0)
            g.setValue('palitos', g.getValue('palitos') + 1)
        }
        else if (g.getValue('palitos') > 0) {
            g.setValue('n' + num, 1)
            g.setValue('palitos', g.getValue('palitos') - 1)
        }
    }
}

function conferir(palitos, quadrados) {
    g.setValue('reiniciar', 1)
    listPalitos = []; quantQuadrados = 0; list0 = []; formouQuadrado = []; quantPalitos = 0
    for (i = 1; i < 46; i++) {
        value = g.getValue('n' + i)
        listPalitos.push(value)
        if (!value) {list0.push(0)}
        else {formouQuadrado.push(i)}
    }
    for (var x in palitosIniciais) {
        if (!listPalitos[palitosIniciais[x] - 1]) {quantPalitos++}
    }
    if(quantPalitos != palitos) {return false}
    if(list0.length != 33) {return false}
    for (var x in horizontais) {
        if (listPalitos[horizontais[x] - 1] && listPalitos[horizontais[x] + 5] && listPalitos[horizontais[x] + 6] && listPalitos[horizontais[x] + 12]) {
            quantQuadrados++
            formouQuadrado = formouQuadrado.filter(item => item !== horizontais[x] && item !== horizontais[x] + 6 && item !== horizontais[x] + 7 && item !== horizontais[x] + 13)
        }
    }
    for (var x in horizontaisGG) {
        if (listPalitos[horizontaisGG[x] - 1] && listPalitos[horizontaisGG[x]] && listPalitos[horizontaisGG[x] + 5] && listPalitos[horizontaisGG[x] + 7] && listPalitos[horizontaisGG[x] + 18] && listPalitos[horizontaisGG[x] + 20] && listPalitos[horizontaisGG[x] + 25] && listPalitos[horizontaisGG[x] + 26]) {
            quantQuadrados++
            formouQuadrado = formouQuadrado.filter(item => item !== horizontaisGG[x] && item !== horizontaisGG[x] + 1 && item !== horizontaisGG[x] + 6 && item !== horizontaisGG[x] + 8 && item !== horizontaisGG[x] + 19 && item !== horizontaisGG[x] + 21 && item !== horizontaisGG[x] + 26 && item !== horizontaisGG[x] + 27)
        } 
    }
    if (formouQuadrado.length > 0) {return false}
    if (quantQuadrados != quadrados) {g.setValue('quadrados', quantQuadrados); return false}
    g.setValue('reiniciar', 0)
    g.setValue('conferir', 0)
    if (g.getValue('desafio') == 3) {g.setValue('desafio', 4); g.setValue('palitos', 0)}
}