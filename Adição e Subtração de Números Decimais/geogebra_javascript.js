let {
    setValue,
    setTextValue
} = ggbApplet;

let game = {
    numbers: [
        "44480",
        "22567",
        ""
    ],
    signal: 1,
    input: 0,
}

function ggbOnInit() {

}

function updateNumbers() {
    for (let i = 0; i < game.numbers.length; i++) {
        for (let j = 0; j < 5; j++) {
            let val = game.numbers[i][game.numbers[i].length - 1 - j];
            setTextValue(`l${i + 1}t${5 - j}`, val === undefined ? "" : val);
        }
    }

    setTextValue("l2t6", game.signal ? "+" : "-");
}

function clearInput() {
    updateInput(0);
    game.numbers[2] = "";
}

function updateInput(val) {
    game.input = val;
    setValue("input", game.input);
}

function newGame() {
    game.numbers[0] = String(getRandomNumber());
    game.numbers[1] = String(getRandomNumber());
    game.signal = Math.floor(Math.random() * 2);

    if (+game.numbers[0] < +game.numbers[1]) {
        [game.numbers[0], game.numbers[1]] = [game.numbers[1], game.numbers[0]];
    }

    restart();
}

function inputNumber(val) {
    if (game.numbers[2].length === 5) return;
    game.numbers[2] = String(val) + game.numbers[2];
    updateInput(game.input + 1);
    updateNumbers();
}

function getRandomNumber() { return Math.floor(Math.random()* 49799) + 100; }

function check() {
    let sum = (+game.numbers[0]) + (+game.numbers[1]);
    let diff = (+game.numbers[0]) - (+game.numbers[1]);

    if (game.signal === 1) setValue("ok", +(sum === +game.numbers[2]));
    else setValue("ok", +(diff === +game.numbers[2]));
}

function restart() {
    setValue("ok", undefined);
    clearInput();
    updateNumbers();
}

function erase() {
    if (game.input === 0) return;

    updateInput(game.input - 1);
    game.numbers[2] = game.numbers[2].slice(1);
    updateNumbers();
}