var g = ggbApplet
let usou = 0

function ggbOnInit() {}

function useBalance() {
    let plate1 = []
    let plate2 = []
    for (let i = 1; i < 10; i++) {
        if (region(i, 1)) {
            plate1.push(i)
        }
        else if (region(i, 2)) {
            plate2.push(i)
        }
    }
    if (plate1.length > 0 && plate2.length > 0) {
        usou++
        if (usou == 2) {g.setValue("usou", 1)}
        animation(plate1, plate2)
    }
    else {
        g.setValue('nUsou', 1)
        setTimeout(() => {g.setValue('nUsou', 0)}, 3000)
    }
}

function region(apple, plate) {
    let x = g.getValue(`x(P1Maca${apple})`)
    let y = g.getValue(`y(P1Maca${apple})`)
    let xMin = 4.4
    let xMax = 7.2
    let yMin = 2.3
    let yMax = 4.9
    if (plate == 1) {
        xMin = 1.06
        xMax = 4.42
    }
    return x >= xMin && x <= xMax && y >= yMin && y <= yMax
}

function animation(plate1, plate2) {

    console.log(plate1, plate2)

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
            g.setValue("pesos", 1)
            setTimeout(() => {g.setValue("pesos", 0)}, 2000)
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
        g.setValue("Plate1", 2.73);
        g.setValue("Plate2", 2.73);
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
    for (let i = 1; i < 10; i++) {
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
    console.log(n)
    if (n == undefined) {return false}
    // Confere se a letra digitada é a mesma da maçã leve
    if (g.getValue("MacaLeve") == n) {
        // Se for, aparece a mensagem de parabéns
        g.setValue("ok", 1)
        g.setVisible("texto19", 0)
    }
    else {
        // Se não for, aparece a mensagem de erro
        g.setValue("ok", 0)
        g.setVisible("texto19", 0)
    }
    for (let i = 1; i < 10; i++) {
        g.setFixed(`P1Maca${i}`, 1, 0)
    }
}