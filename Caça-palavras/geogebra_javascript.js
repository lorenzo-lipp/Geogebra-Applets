let { setValue, setTextValue, getValue } = ggbApplet;
let ggbLetterWidth = {
    "A": 0.58,
    "B": 0.58,
    "C": 0.58,
    "D": 0.58,
    "E": 0.54,
    "F": 0.52,
    "G": 0.62,
    "H": 0.58,
    "I": 0.3,
    "J": 0.48,
    "K": 0.58,
    "L": 0.52,
    "M": 0.66,
    "N": 0.58,
    "O": 0.62,
    "P": 0.54,
    "Q": 0.62,
    "R": 0.58,
    "S": 0.54,
    "T": 0.62,
    "U": 0.58,
    "V": 0.54,
    "W": 0.72,
    "X": 0.54,
    "Y": 0.54,
    "Z": 0.52
}
let game = {
    "letters": [
        ["I", "T", "A", "R", "M", "V"],
        ["O", "P", "U", "N", "O", "S"],
        ["G", "B", "T", "R", "A", "T"],
        ["A", "O", "A", "E", "L", "O"],
        ["C", "T", "E", "P", "A", "R"],
        ["A", "R", "O", "M", "E", "D"]
    ],
    "targetWord": "AMOR",
    "wordBank": [
        "AMOR",
        "FATO",
        "CAOS",
        "VIDA",
        "CASA",
        "MEDO",
        "SOMA",
        "TUDO",
        "MAIS",
        "DOCE",
        "ARTE",
        "ALMA",
        "NOVO",
        "FRIO",
        "HOJE",
        "NOME",
        "BOLA",
        "POVO",
        "BOLO",
        "DOIS",
        "GATO",
        "FLOR",
        "AULA",
        "TREM",
        "FOFO",
        "MESA",
        "SAPO",
        "JOGO",
        "ANJO"
    ]
}

function ggbOnInit() {

}

function getPadding(letter) {
    return (1 - ggbLetterWidth[letter]) / 2 + 0.31;
}

function updateLetters() {
    for (let [rowIndex, row] of game.letters.entries()) {
        for (let [letterIndex, letter] of row.entries()) {
            setTextValue(`letter${rowIndex * 6 + letterIndex + 1}`, letter);
        }
    }
}

function updatePaddings() {
    for (let [rowIndex, row] of game.letters.entries()) {
        for (let [letterIndex, letter] of row.entries()) {
            setValue(`space${rowIndex * 6 + letterIndex + 1}`, getPadding(letter));
        }
    }
}

function getPiercedLetters(hole) {
    return [
        game.letters[3 + Math.floor((hole - 1) / 3)][3 + (hole - 1) % 3],
        game.letters[3 + Math.floor((hole - 1) / 3)][2 - (hole - 1) % 3],
        game.letters[2 - Math.floor((hole - 1) / 3)][3 + (hole - 1) % 3],
        game.letters[2 - Math.floor((hole - 1) / 3)][2 - (hole - 1) % 3]
    ];
}

function check() {
    let hole = getValue("hole");
    let piercedLetters = getPiercedLetters(hole).sort();
    let targetWord = game.targetWord.split("").sort();

    for (let i = 0; i < piercedLetters.length; i++) {
        if (piercedLetters[i] !== targetWord[i]) return setValue("ok", 0);
    }

    return setValue("ok", 1);
}

function newGame() {
    let hole = 1 + Math.floor(Math.random() * 9);
    let newWord = game.wordBank[Math.floor(Math.random() * game.wordBank.length)];

    game.targetWord = newWord;
    setTextValue("palavra", newWord);

    newWord = newWord.split("")
                     .sort(() => Math.random() - 0.5);

    for (let row = 0; row < game.letters.length; row++) {
        for (let column = 0; column < game.letters[row].length; column++) {
            let randomChar = 65 + Math.floor(Math.random() * 22);

            if (!isVowel(randomChar)) randomChar = 65 + Math.floor(Math.random() * 22);

            let newChar = String.fromCharCode(randomChar);

            if (row >= 3 && column >= 3 && Math.random() > 0.8) newChar = newWord[Math.floor(Math.random() * 4)];

            game.letters[row][column] = newChar;
        }
    }

    game.letters[3 + Math.floor((hole - 1) / 3)][3 + (hole - 1) % 3] = newWord[0];
    game.letters[3 + Math.floor((hole - 1) / 3)][2 - (hole - 1) % 3] = newWord[1];
    game.letters[2 - Math.floor((hole - 1) / 3)][3 + (hole - 1) % 3] = newWord[2];
    game.letters[2 - Math.floor((hole - 1) / 3)][2 - (hole - 1) % 3] = newWord[3];

    restart();
}

function isVowel(code) {
    return [65, 69, 73, 79, 85].includes(code);
}

function setHole(val) { 
    if (getValue("hole") === val) {
        setValue("hole", 0);
    } else {
        setValue("hole", val); 
    }   
}

function restart() {
    updateLetters();
    updatePaddings();
    setValue("ok", undefined);
    setHole(0);
}

async function foldSheet() {
    for (let fold = 1; fold < 5; fold++) {
        setValue("fold", fold);
        await sleep(800);
    }
}

async function unfoldSheet() {
    let shouldCheck = getValue("hole") !== 0;

    if (!shouldCheck) setHole(0);

    for (let fold = 2; fold >= 0; fold -= 2) {
        setValue("fold", fold);
        await sleep(1000);
    }

    if (shouldCheck) check();
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}