let {
    setValue,
    setTextValue
} = ggbApplet;

let game = {
    numbers: [
        "5",
        "y",
        "3",
        "3",
        "7"
    ],
    amount: 3,
    input: "",
    gameType: 2,
    mean: 4
}

function ggbOnInit() { }

function updateNumbers() {
    for (let i = 0; i < 5; i++) {
        setTextValue(`n${i + 1}`, game.numbers[i]);
    }
}

function clearInput() {
    updateInput("");
}

function updateInput(val) {
    game.input = val;
    setTextValue("inputVal", game.input);
    setValue("input", game.input.length);
}

function newGame() {
    setGameType(2);

    let numbers = [];

    if (game.gameType === 1) setGameAmount(Math.floor(Math.random() * 3) + 3);
    else setGameAmount(3);
    
    for (let i = 0; i < game.amount; i++) { 
        numbers.push(Math.floor(Math.random() * 25) + 1); 
    }

    let mean = numbers.reduce((a, b) => a + b, 0) / game.amount;

    while (mean !== Math.floor(mean)) {
        numbers[Math.floor(Math.random() * game.amount)]++;
        mean = numbers.reduce((a, b) => a + b, 0) / game.amount;
    } 

    for (let i = 0; i < numbers.length; i++) { 
        game.numbers[i] = String(numbers[i]);
    }
    
    if (game.gameType === 2) {
        game.numbers[Math.floor(Math.random() * game.amount)] = "y";
    }

    setGameMean(mean);
    restart();
}

function inputNumber(val) {
    if (game.input.length === 2) return;
    updateInput(game.input + String(val));
    updateNumbers();
}

function check() {
    if (game.gameType === 1) {
        let sum = game.numbers.slice(0, game.amount).reduce((a, b) => a + (+b), 0);
        let mean = sum / game.amount;
        setValue("ok", (+game.input) === mean)
    } else {
        let numbers = [...game.numbers];
        numbers[numbers.findIndex(v => v === "y")] = game.input;
        let sum = numbers.slice(0, game.amount).reduce((a, b) => a + (+b), 0);
        let mean = sum / game.amount;
        setValue("ok", game.mean === mean);
    }
}

function restart() {
    setValue("ok", undefined);
    clearInput();
    updateNumbers();
}

function erase() {
    if (game.input.length === 0) return;

    updateInput(game.input.slice(0, -1));
    updateNumbers();
}

function setGameAmount(val) {
    game.amount = val;
    setValue("numbers", game.amount);
}

function setGameMean(val) {
    game.mean = val;
    setTextValue("mean", game.mean);
}

function setGameType(val) {
    game.gameType = val;
    setValue("gameType", game.gameType);
}