let {
    setTextValue,
    setValue,
    getValue,
    setFixed
} = ggbApplet;

let game = {
    measureUnits: [
        {name: "milí", unit: "mm^3"},
        {name: "centí", unit: "cm^3"},
        {name: "decí", unit: "dm^3"},
        {name: "", unit: "m^3"},
        {name: "decâ", unit: "dam^3"},
        {name: "hectô", unit: "ham^3"},
        {name: "quilô", unit: "km^3"}
    ],
    variations: [
        {
            getStatement: (name, amount, unit) => `${name} tem um pote com volume igual a ${amount} ${unit}metros cúbicos.`,
            getQuestion: (name, unit) => `Qual é o volume do pote em ${unit}metros cúbicos?`,
            interval: [25000, 200000],
            minUnit: "mm^3",
            maxUnit: "cm^3"
        },
        {
            getStatement: (name, amount, unit) => `O lago que ${name} visitou tem ${amount} ${unit}metros cúbicos de água.`,
            getQuestion: (name, unit) => `Qual é o volume de água em ${unit}metros cúbicos?`,
            interval: [10000, 25000],
            minUnit: "m^3",
            maxUnit: "km^3"
        },
        {
            getStatement: (name, amount, unit) => `${name} encheu um recipiente com ${amount} ${unit}metros cúbicos de água.`,
            getQuestion: (name, unit) => `Qual é o volume de água em ${unit}metros cúbicos?`,
            interval: [1000, 10000],
            minUnit: "cm^3",
            maxUnit:  "dm^3"
        },
    ],
    names: ["Carla", "Augusto", "Júlia", "Leonardo"],
}

function ggbOnInit() {
    game.amount = 5;
    game.current = game.variations[2];
    game.questionUnit = game.measureUnits[1];
    game.statementUnit = game.measureUnits[2];
    game.statement = game.current.getStatement(game.names[3], game.amount, game.statementUnit.name);
    game.question = game.current.getQuestion(game.names[3], game.questionUnit.name);

    updateStatement()
    updateQuestion()
}

function check() {
    let answer = getValue("answer");
    let rightAnswer = game.amount * 10 ** (3 * (
        game.measureUnits.indexOf(game.statementUnit) -
        game.measureUnits.indexOf(game.questionUnit)
    ));

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

function compareFractions(a, b, precision = 10) {
    return Math.floor(a * 10 ** precision) / 10 ** precision ===
           Math.floor(b * 10 ** precision) / 10 ** precision;
}

function disableInputBox() { return setFixed("InputBox1", 1, 0); }

function enableInputBox() { return setFixed("InputBox1", 1, 1); }