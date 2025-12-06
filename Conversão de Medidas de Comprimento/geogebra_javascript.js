let {
    setTextValue,
    setValue,
    getValue,
    setFixed
} = ggbApplet;

let game = {
    measureUnits: [
        {name: "milí", unit: "mm"},
        {name: "centí", unit: "cm"},
        {name: "decí", unit: "dm"},
        {name: "", unit: "m"},
        {name: "decâ", unit: "dam"},
        {name: "hectô", unit: "ham"},
        {name: "quilô", unit: "km"}
    ],
    variations: [
        {
            getStatement: (name, amount, unit) => `${name} correu ${amount} ${unit}metros em uma maratona.`,
            getQuestion: (name, unit) => `Quantos ${unit}metros ${name} percorreu?`,
            interval: [500, 10000],
            minUnit: "m",
            maxUnit:  "km"
        },
        {
            getStatement: (name, amount, unit) => `A altura de ${name} é de ${amount} ${unit}metros!`,
            getQuestion: (name, unit) => `Qual é a altura de ${name} em ${unit}metros?`,
            interval: [1500, 2000],
            minUnit: "mm",
            maxUnit: "m"
        },
        {
            getStatement: (name, amount, unit) => `${name} tem um aquário de ${amount} ${unit}metros de comprimento.`,
            getQuestion: (name, unit) => `Qual é o comprimento do aquário em ${unit}metros?`,
            interval: [200, 800],
            minUnit: "mm",
            maxUnit:  "m"
        },
    ],
    names: ["Carla", "Augusto", "Júlia", "Leonardo"],
}

function ggbOnInit() {
    game.amount = 7;
    game.current = game.variations[0];
    game.questionUnit = game.measureUnits[3];
    game.statementUnit = game.measureUnits[6];
    game.statement = game.current.getStatement(game.names[3], game.amount, game.statementUnit.name);
    game.question = game.current.getQuestion(game.names[3], game.questionUnit.name);

    updateStatement()
    updateQuestion()
}

function check() {
    let answer = getValue("answer");
    let rightAnswer = game.amount * 10 ** (
        game.measureUnits.indexOf(game.statementUnit) -
        game.measureUnits.indexOf(game.questionUnit)
    );

    setValue("ok", +compareFractions(answer, rightAnswer));
    disableInputBox();
}

function clearInputs() {
    setValue("answer", undefined);
    setValue("ok", undefined);
    enableInputBox();
}

function newGame() {
    let name = getRandomItem(game.names);
    game.current = getRandomItem(game.variations);
    let units = game.measureUnits.slice(
        game.measureUnits.findIndex(v => v.unit === game.current.minUnit),
        game.measureUnits.findIndex(v => v.unit === game.current.maxUnit) + 1,
    );
    game.questionUnit = getRandomItem(units);
    game.statementUnit = getRandomItem(units.filter(v => v.name !== game.questionUnit.name));
    game.amount = Math.floor(getRandomFromInterval(...game.current.interval) / 10 ** (units.indexOf(game.statementUnit) - 1)) / 10;
    game.statement = game.current.getStatement(name, game.amount, game.statementUnit.name);
    game.question = game.current.getQuestion(name, game.questionUnit.name);

    updateStatement();
    updateQuestion();
    clearInputs();
}

function updateStatement() { setTextValue("statement", game.statement); }

function updateQuestion() { setTextValue("question", game.question); }

function getRandomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function getRandomFromInterval(min, max) { return Math.floor(Math.random() * (max - min)) + min; }

function compareFractions(a, b, precision = 5) {
    return Math.floor(a * 10 ** precision) / 10 ** precision ===
           Math.floor(b * 10 ** precision) / 10 ** precision;
}

function disableInputBox() { return setFixed("InputBox1", 1, 0); }

function enableInputBox() { return setFixed("InputBox1", 1, 1); }