var g = ggbApplet
var horizontal = [7.4, 8.3, 9.2, 10.1]
var vertical = [0.45, 1.35, 2.15, 2.85]

function check() {
    let list = ["Cavalo", "Vaca", "Porco", "Pato"]

    let answer = {
        x: [[], [], [], []],
        y: [[], [], [], []]
    }

    for (let number = 1; number < 5; number++) {
        for (let animal = 0; animal < 4; animal++) {
            let posx = g.getValue(`x(${list[animal]}${number}A)`)
            let posy = g.getValue(`y(${list[animal]}${number}A)`)

            for (let row = 0; row < 3; row++) {
                if (posx >= horizontal[row] && posx < horizontal[row + 1]) {
                    answer.x[row].push(list[animal])
                }
                if (posy >= vertical[row] && posy < vertical[row + 1]) {
                    answer.y[row].push(list[animal])
                }
            }

            if (posx >= horizontal[3] && posx < 10.9) {
                answer.x[3].push(list[animal])
            }
            if (posy >= vertical[3] && posy < 3.7) {
                answer.y[3].push(list[animal])
            }
        }
    }
    
    for (let index = 0; index < 4; index++) {
        if (answer.x[index].length != 4 || answer.y[index].length != 4) {
            return false
        }
        for (animal in list) {
            if (!answer.x[index].includes(list[animal]) || !answer.y[index].includes(list[animal])) {
                return false
            }
        }
    }

    return true
}