var g = ggbApplet
var bool = ["a", "b", "c", "d", "e", "f"]
g.setValue("MacaLeve", Math.floor(Math.random() * 3) + 1)

function useBalance() {
    let plate1 = []
    let plate2 = []
    for (var i = 1; i < 4; i++) {
        if (region(i, 1)) {
            plate1.push(i)
        }
        else if (region(i, 2)) {
            plate2.push(i)
        }
    }
    if (plate1.length > 0 && plate2.length > 0) {
        g.setValue("usou", 1)
        animation(plate1, plate2)
    }
    else {
        g.setValue('nUsou', 1)
        setTimeout(() => {g.setValue('nUsou', 0)}, 700)
    }
}

function region(apple, plate) {
    return g.getValue(bool[apple + 3 * (plate - 1) - 1])
}

function animation(plate1, plate2) {

    // Se tem o mesmo número de maçãs no prato 1 e no prato 2:
    if (plate1.length == plate2.length) {
        // Descobre qual é a maçã mais leve (sorteada no geogebra)
        let lightApple = g.getValue("MacaLeve")
        // Se a maçã mais leve está no prato 1:
        if (plate1.includes(lightApple)) {
            // Então move o prato 1 para cima e o prato 2 para baixo
            move(plate1, plate2, "Plate1", "Plate2")
        }
        // Se a maçã mais leve não está no prato 1 e está no prato 2:
        else if (plate2.includes(lightApple)) {
            // Então move o prato 2 para cima e o prato 1 para baixo
            move(plate2, plate1, "Plate2", "Plate1")
        }
        // Se a maçã mais leve não está em nenhum dos pratos, nenhum deles se move
        else {
            move(plate1, plate2, "", "", 9)
        }
    }
    // Se tem mais maçãs em um prato do que no outro:
    else {
        // Se tem mais maçãs no prato 1:
        if (plate1.length > plate2.length) {
            // Move o prato 2 para cima e o prato 1 para baixo
            move(plate2, plate1, "Plate2", "Plate1")
        }
        // Se tem mais maçãs no prato 2:
        else {
            // Move o prato 1 para cima e o prato 2 para baixo
            move(plate1, plate2, "Plate1", "Plate2")
        }
    }
}

function move(up, down, plateUp, plateDown, n = 0) {
    // Move todas as maçãs para a altura da cesta
    if (n == 9) {
        for (let x in up) {
            g.evalCommand(`P1Maca${up[x]} = (${g.getValue(`x(P1Maca${up[x]})`)}, 3.16)`)
            g.evalCommand(`P2Maca${up[x]} = (${g.getValue(`x(P2Maca${up[x]})`)}, 3.16)`)
        }
        for (let x in down) {
            g.evalCommand(`P1Maca${down[x]} = (${g.getValue(`x(P1Maca${down[x]})`)}, 3.16)`)
            g.evalCommand(`P2Maca${down[x]} = (${g.getValue(`x(P2Maca${down[x]})`)}, 3.16)`)
        } 
    }
    // Começa com um valor n = 0, e enquanto n for menor que 5:
    if (n < 5) {
        // Move a maçã mais leve para cima
        for (let x in up) {
            g.evalCommand(`P1Maca${up[x]} = (${g.getValue(`x(P1Maca${up[x]})`)}, ${3.16 + n * 0.05})`)
            g.evalCommand(`P2Maca${up[x]} = (${g.getValue(`x(P2Maca${up[x]})`)}, ${3.16 + n * 0.05})`)
            g.setValue(plateUp, 2.73 + n * 0.05)
        }
        // Move a maçã mais pesada para baixo
        for (let x in down) {
            g.evalCommand(`P1Maca${down[x]} = (${g.getValue(`x(P1Maca${down[x]})`)}, ${3.16 - n * 0.05})`)
            g.evalCommand(`P2Maca${down[x]} = (${g.getValue(`x(P2Maca${down[x]})`)}, ${3.16 - n * 0.05})`)
            g.setValue(plateDown, 2.73 - n * 0.05)
        }
        // Conta 100 milissegundos e executa a função novamente, agora com o n = n + 1
        setTimeout(function () {
            move(up, down, plateUp, plateDown, n + 1)
        }, 100)
    }
    else {
        g.evalCommand("SelectObjects()")
    }
}

function getResult() {
    let n
    g.setVisible("texto13", 1)
    for (let i = 1; i < 4; i++) {
        let isInRegion = g.getValue(`IsInRegion(P1Maca${i}, l1(1))`)
        if (isInRegion) {
            if (n == undefined) {
                n = i
            }
            else {
                return false
            }
        }
    }

    if (n == undefined) {return false}
    // Confere se a letra digitada é a mesma da maçã leve
    if (g.getValue("MacaLeve") == n) {
        // Se for, aparece a mensagem de parabéns
        g.setValue("ok", 1)
        g.setVisible("texto13", 0)
    }
    else {
        // Se não for, aparece a mensagem de erro
        g.setValue("ok", 0)
        g.setVisible("texto13", 0)
    }
    for (let i = 1; i < 4; i++) {
        g.setFixed(`P1Maca${i}`, 1, 0)
    }
}