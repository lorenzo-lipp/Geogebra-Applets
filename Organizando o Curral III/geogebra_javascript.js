var g = ggbApplet
var horizontal = [7.45, 8.2, 8.9, 9.6, 10.35, 11.05]
var vertical = [0.4, 1.1, 1.8, 2.4, 3.1, 3.8]

function check() {
    let list = ["Cavalo", "Vaca", "Porco", "Pato", "Galo"]

    let answer = {
        x: [[], [], [], [], []],
        y: [[], [], [], [], []]
    }

    for (let number = 1; number < 6; number++) {
        for (let animal = 0; animal < 5; animal++) {
            let posx = g.getValue(`x(${list[animal]}${number}A)`)
            let posy = g.getValue(`y(${list[animal]}${number}A)`)

            for (let row = 0; row < 5; row++) {
                if (posx >= horizontal[row] && posx < horizontal[row + 1]) {
                    answer.x[row].push(list[animal])
                }
                if (posy >= vertical[row] && posy < vertical[row + 1]) {
                    answer.y[row].push(list[animal])
                }
            }
        }
    }
    
    for (let index = 0; index < 5; index++) {
        if (answer.x[index].length != 5 || answer.y[index].length != 5) {
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