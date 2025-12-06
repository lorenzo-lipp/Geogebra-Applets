let {
    setTextValue,
    setValue,
    getValue,
    setFixed
} = ggbApplet;

let game = {
    measureUnits: [
        {name: "milí", unit: "mm^2"},
        {name: "centí", unit: "cm^2"},
        {name: "decí", unit: "dm^2"},
        {name: "", unit: "m^2"},
        {name: "decâ", unit: "dam^2"},
        {name: "hectô", unit: "ham^2"},
        {name: "quilô", unit: "km^2"}
    ],
    variations: [
        {
            getStatement: (name, amount, unit) => `O sítio em que ${name} mora tem área igual a ${amount} ${unit}metros quadrados.`,
            getQuestion: (name, unit) => `Qual é a área do sítio em ${unit}metros quadrados?`,
            interval: [5000, 40000],
            minUnit: "m^2",
            maxUnit: "km^2"
        },
        {
            getStatement: (name, amount, unit) => `A sala da casa de ${name} tem área igual a ${amount} ${unit}metros quadrados.`,
            getQuestion: (name, unit) => `Qual é a área da sala em ${unit}metros quadrados?`,
            interval: [12000, 25000],
            minUnit: "cm^2",
            maxUnit: "m^2"
        },
        {
            getStatement: (name, amount, unit) => `${name} fez um desenho em uma folha com área igual a ${amount} ${unit}metros quadrados.`,
            getQuestion: (name, unit) => `Qual é a área da folha em ${unit}metros quadrados?`,
            interval: [1400, 6800],
            minUnit: "mm^2",
            maxUnit:  "cm^2"
        },
    ],
    names: ["Carla", "Augusto", "Júlia", "Leonardo"],
}

function ggbOnInit() {
    game.amount = 0.3;
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
    let rightAnswer = game.amount * 10 ** (2 * (
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

function compareFractions(a, b, precision = 5) {
    return Math.floor(a * 10 ** precision) / 10 ** precision ===
           Math.floor(b * 10 ** precision) / 10 ** precision;
}

function disableInputBox() { return setFixed("InputBox1", 1, 0); }

function enableInputBox() { return setFixed("InputBox1", 1, 1); }