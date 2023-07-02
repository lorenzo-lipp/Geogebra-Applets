var g = ggbApplet
var secretNumber

// Função para dar um palpite
function guess(guessNumber) {
    secretNumber = g.getValue("NumeroSecreto")
    // Transforma os números em texto, para poder contar e comparar os dígitos
    let stringGuess = guessNumber.toString()
    let stringSecret = secretNumber.toString()

    // Confere se o número tem 3 dígitos e é um número
    if (stringGuess.length == 3 && stringGuess != "NaN") {
        // Se o número do palpite for igual ao número secreto
        if (guessNumber == secretNumber) {
            // Colore todos os círculos de verde com preenchimento
            colorLine(3)
        }
        else {
            let fullCircles = 0
            let circles = 0
    
            for (let i = 0; i < 3; i++) {
                // Se os números da mesma posição são iguais, adiciona um círculo cheio
                if (stringGuess[i] == stringSecret[i]) {
                    fullCircles++
                }
                // Se o número secreto contém o número do palpite, adiciona um círculo sem preenchimento
                if (stringSecret.includes(stringGuess[i])) {
                    circles++
                }
            }
            // Colore os círculos cheios e os círculos sem preenchimento
            colorLine(fullCircles, circles)
        }
    }
    else {
        return false
    }
}

// Função que colore os círculos de dica
function colorLine(fullFill, halfFill = 0) {
    let actualGuess = g.getValue("Atual")

    let i = 1
    // Colore todos os círculos cheios
    while (i <= fullFill) {
        g.setColor(`c${actualGuess}${i}`, 0, 204, 0)
        g.setFilling(`c${actualGuess}${i}`, 1)
        g.setVisible(`c${actualGuess}${i}`, 1)
        i++
    }
    // Colore todos os círculos sem preenchimento
    while (i <= halfFill) {
        g.setColor(`c${actualGuess}${i}`, 0, 204, 0)
        g.setFilling(`c${actualGuess}${i}`, 0)
        g.setVisible(`c${actualGuess}${i}`, 1)
        i++
    }
    // Colore os círculos que sobraram de cinza claro
    while (i <= 3) {
        g.setColor(`c${actualGuess}${i}`, 230, 230, 230)
        g.setFilling(`c${actualGuess}${i}`, 1)
        g.setVisible(`c${actualGuess}${i}`, 1)
        i++
    }

    // Muda para o próximo palpite
    g.setValue("Atual", actualGuess + 1)

    // Se acertou o palpite, exibe parabéns
    if (fullFill == 3) {
        g.setValue("ok", 1)
        g.setValue("Atual", 6)
    }
    // Se errou e este era o último palpite, exibe mensagem de erro
    else if (actualGuess == 5) {
        g.setValue("ok", 0)
    }
}

// Gera um novo número secreto
function newGame() {
    let algarisms = ["1", "2", "3", "4", "5", "7", "8", "9", "0"]
    // Pega um número aleatório de 0 a 7
    let random = Math.floor(Math.random() * 8)
    // Usa esse número para pegar um algarismo da lista
    let stringSecret = algarisms[random]
    
    for (let i = 0; i < 2; i++) {
        // Remove da lista o número pego anteriormente 
        algarisms.splice(random, 1)
        // Pega um número aleatório de 0 a 7 e depois de 0 a 6
        random = Math.floor(Math.random() * (8 - i)) 
        // Usa esse número para pegar um algarismo da lista
        stringSecret += algarisms[random]
    }

    // Transforma o string em um número e define como valor do NumeroSecreto
    secretNumber = parseInt(stringSecret)
    g.setValue("NumeroSecreto", secretNumber)
    // Recomeça os palpites
    g.setValue("Atual", 1)
    for (let i = 1; i < 6; i++) {
        for (let j = 1; j < 4; j++) {
            g.setVisible(`c${i}${j}`, 0)
        }
        g.setValue(`palpite${i}`, undefined)
    }
    g.setValue("ok", undefined)
}