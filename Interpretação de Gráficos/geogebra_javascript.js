var ggbGameInstance = null;

class Game {
    chartType = 1;
    data = [5, 7, 9, 5, 6];
    gameVariations = [
        {
            "title": "Frutas preferidas",
            "yLabel": "Quantidade de pessoas",
            "xLabels": [
                "Banana", 
                "Maçã", 
                "Morango", 
                "Abacate", 
                "Abacaxi", 
                "Uva", 
                "Caqui", 
                "Figo", 
                "Goiaba", 
                "Laranja"
            ],
            "minFactor": 1,
            "maxFactor": 9,
            "questions": [
                ["Qual é", "a fruta preferida pelo maior número de pessoas"], 
                ["Qual é", "a fruta preferida pelo menor número de pessoas"],
                ["Qual é", "a soma do número de pessoas que preferem", "e"],
                ["Qual é", "a diferença entre o número de pessoas que preferem", "e"]
            ],
            "chartTypes": [1, 2]
        },
        {
            "title": "Ganho mensal de um trabalhador",
            "yLabel": "Reais",
            "xLabels": [
                "Janeiro", 
                "Fevereiro", 
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro"
            ],
            "minFactor": 5,
            "maxFactor": 33,
            "questions": [
                ["Qual foi", "o mês de maior ganho"],
                ["Qual foi", "o mês de menor ganho"],
                ["Qual foi", "o ganho de", "a"],
                ["Qual foi", "o período de maior ganho"],
                ["Qual foi", "o período de menor ganho"]
            ],
            "chartTypes": [3]
        },
        {
            "title": "Venda de eletrônicos neste mês",
            "yLabel": "Aparelhos vendidos",
            "xLabels": [
                "Celular", 
                "Tablet", 
                "Computador", 
                "Televisor", 
                "Monitor", 
                "Microfone", 
                "Teclado", 
                "Videogame", 
                "Drone"
            ],
            "minFactor": 5,
            "maxFactor": 33,
            "questions": [
                ["Qual foi", "o eletrônico mais vendido"], 
                ["Qual foi", "o eletrônico menos vendido"],
                ["Qual é", "a soma das vendas do", "e do"],
                ["Qual foi", "a diferença de vendas entre o", "e o"],
            ],
            "chartTypes": [1, 2]
        },
        {
            "title": "Colheita mensal de cenoura",
            "yLabel": "Quantidade colhida",
            "xLabels": [
                "Janeiro", 
                "Fevereiro", 
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro"
            ],
            "minFactor": 1,
            "maxFactor": 30,
            "questions": [
                ["Qual foi", "o mês em que mais cenouras foram colhidas"],
                ["Qual foi", "o mês em que menos cenouras foram colhidas"],
                ["Quantas", "cenouras foram colhidas de", "a"],
                ["Qual foi", "o período em que mais cenouras foram colhidas"],
                ["Qual foi", "o período em que menos cenouras foram colhidas"]
            ],
            "chartTypes": [3]
        },
        {
            "title": "Alunos por turma",
            "yLabel": "Quantidade de alunos",
            "xLabels": [
                "Quarto ano",
                "Quinto ano",
                "Sexto ano",
                "Sétimo ano",
                "Oitavo ano", 
                "Nono ano", 
            ],
            "minFactor": 3,
            "maxFactor": 6,
            "questions": [
                ["Qual é", "a turma com mais alunos"], 
                ["Qual é", "a turma com menos alunos"],
                ["Qual é", "a soma do número de alunos do", "e do"],
                ["Qual é", "a diferença do número de alunos do", "e do"]
            ],
            "chartTypes": [1, 2]
        },
        {
            "title": "Interações em uma rede social",
            "yLabel": "Número de curtidas",
            "xLabels": [
                "Janeiro", 
                "Fevereiro", 
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro"
            ],
            "minFactor": 1,
            "maxFactor": 33,
            "questions": [
                ["Qual foi", "o mês em que o maior número de curtidas foi recebido"],
                ["Qual foi", "o mês em que o menor número de curtidas foi recebido"],
                ["Quantas", "curtidas foram recebidas de", "a"],
                ["Qual foi", "o período em que mais curtidas foram recebidas"],
                ["Qual foi", "o período em que menos curtidas foram recebidas"]
            ],
            "chartTypes": [3]
        },
    ];
    integerInput = null;
    intervalValues = [null, null];
    isIntervalQuestion = false;
    isNumericQuestion = false;
    optionsAmount = 3;
    question = ["Qual é", "a fruta preferida pelo maior número de pessoas"];
    questionIndex = 1;
    view = 1;
    views = {
        "GRAPH": 1,
        "WRONG_ANSWER": 2,
        "RIGHT_ANSWER": 3
    };
    xLabels = [null, null, null, null, null];

    /**
     * Checks if selected option or numeric input is correct.
     * @param {number} option 
     * @returns {boolean}
     */
    checkSelection(option = null) {
        if (this.questionIndex === 0) {
            // Asking for highest value
            let highest = (
                this.isBarChart() ?
                Math.max(...this.data.slice(0, 3)) :
                Math.max(...this.data)
            );

            return this.data[option] === highest;
        } else if (this.questionIndex === 1) {
            // Asking for lowest value
            let lowest = (
                this.isLineChart() ?
                Math.min(...this.data) :
                Math.min(...this.data.slice(0, this.optionsAmount))
            );

            return this.data[option] === lowest;
        } else if (this.questionIndex === 2) {
            if (this.isLineChart()) {
                // Asking for the interval sum
                let sum = this.data.slice(
                    this.xLabels.indexOf(this.intervalValues[0]), 
                    this.xLabels.indexOf(this.intervalValues[1]) + 1
                ).reduce((a, b) => a + b * this.factor, 0);

                return this.integerInput === sum;
            } else {
                // Asking for the sum of two values
                let firstValue = this.data[this.xLabels.indexOf(this.intervalValues[0])] * this.factor;
                let secondValue = this.data[this.xLabels.indexOf(this.intervalValues[1])] * this.factor;

                return this.integerInput === firstValue + secondValue;
            }
        } else if (this.questionIndex === 3) {
            if (this.isLineChart()) {
                // Asking for period with highest value
                let periodSums = [];

                for (let i = 0; i < this.data.length - 1; i++) {
                    periodSums.push(this.data[i] + this.data[i + 1]);
                }

                return periodSums[option] === Math.max(...periodSums);
            } else {
                // Asking for the difference of two values
                let firstValue = this.data[this.xLabels.indexOf(this.intervalValues[0])] * this.factor;
                let secondValue = this.data[this.xLabels.indexOf(this.intervalValues[1])] * this.factor;

                return this.integerInput === Math.abs(firstValue - secondValue);
            }
        } else {
            // Asking for period with lowest value
            let periodSums = [];

            for (let i = 0; i < this.data.length - 1; i++) {
                periodSums.push(this.data[i] + this.data[i + 1]);
            }

            return periodSums[option] === Math.min(...periodSums);
        }
    }

    confirm(option = null) {
        if (this.checkSelection(option)) {
            if (this.isNumericQuestion) {
                ggbApplet.setTextValue("rightText", `Isso, ${this.integerInput} é uma resposta correta.`);
            } else if (this.isIntervalQuestion) {
                ggbApplet.setTextValue("rightText", `Isso, o intervalo de ${this.xLabels[option].toLowerCase()} a ${this.xLabels[option + 1].toLowerCase()} está correto.`);
            } else {
                ggbApplet.setTextValue("rightText", `Isso, ${this.xLabels[option].toLowerCase()} é uma resposta correta.`);
            }
            this.setView("RIGHT_ANSWER");
        } else {
            if (this.isNumericQuestion) {
                if (this.integerInput == undefined) {
                    ggbApplet.setTextValue("wrongText", `Você não digitou uma resposta.`);
                } else {
                    ggbApplet.setTextValue("wrongText", `Não, ${this.integerInput} não é a resposta correta.`);
                }
            } else if (this.isIntervalQuestion) {
                ggbApplet.setTextValue("wrongText", `Não, o intervalo de ${this.xLabels[option].toLowerCase()} a ${this.xLabels[option + 1].toLowerCase()} não é a resposta correta.`);
            } else {
                ggbApplet.setTextValue("wrongText", `Não, ${this.xLabels[option].toLowerCase()} não é uma resposta correta.`);
            }
            this.setView("WRONG_ANSWER");
        }
    }

    /**
     * Returns a game variation for `chartType` (0 for a bar chart, 1 for a pie chart and 2 for a line chart). 
     * @param {number} chartType 
     * @returns 
     */
    getGameVariation(chartType) {
        let variations = this.gameVariations.filter(variation => variation.chartTypes.includes(chartType));

        return this.#pickRandomElements(variations, 1)[0];
    }

    /**
     * Adds a number to the current input.
     * @param {number} val 
     */
    inputVal(val) {
        if (this.integerInput >= 9999) this.setIntegerInput(val || null);
        else if (this.integerInput === null) this.setIntegerInput(val);
        else this.setIntegerInput(this.integerInput * 10 + val);
    }

    /**
     * Checks if current game is a bar chart.
     * @returns {boolean}
     */
    isBarChart() { 
        return this.chartType === 1;
    }

    /**
     * Checks if current game is a line chart.
     * @returns {boolean}
     */
    isLineChart() {
        return this.chartType === 3;
    }

    /**
     * Checks if current game is a pie chart.
     * @returns {boolean}
     */
    isPieChart() {
        return this.chartType === 2;
    }

    /**
     * Generates a new game.
     */
    newRandomGame() {
        let chartType = Math.floor(Math.random() * 3) + 1; 
        let gameVariation = this.getGameVariation(chartType);

        this.setChartType(chartType);
        this.setTitle(gameVariation.title);
        this.setYLabel(gameVariation.yLabel);
        this.setRandomFactor(gameVariation.minFactor, gameVariation.maxFactor);
        this.setRandomQuestion(gameVariation.questions);
        this.setOptions();
        this.setXLabels(gameVariation.xLabels);
        this.setRandomData();
        this.setIntervalValues();
        this.setQuestionText();
        this.restartGame();
    }

    restartGame() {
        this.setIntegerInput(null);
        this.setView("GRAPH");
    }

    /**
     * Changes chart type.
     * @param {number} type 
     */
    setChartType(type) {
        this.chartType = type;
        ggbApplet.setValue("chartType", type);
    }

    /**
     * Changes integer input value.
     * @param {number} val 
     * @returns 
     */
    setIntegerInput(val) {
        this.integerInput = val;
        ggbApplet.setValue("integerInput", val ?? undefined);
    }

    /**
     * Shows and hides numeric input buttons.
     * @param {boolean} bool 
     */
    setIntervalQuestion(bool) {
        this.isIntervalQuestion = bool;
        ggbApplet.setValue("isIntervalQuestion", bool);
    }

    /**
     * Selects interval values.
     */
    setIntervalValues() {
        let firstIndex = (
            this.isLineChart() ?
            Math.floor(Math.random() * 4) :
            Math.floor(Math.random() * (this.optionsAmount - 1))
        );
        let secondIndex = (
            this.isLineChart() ?
            firstIndex + 1 + Math.floor(Math.random() * (4 - firstIndex)) :
            firstIndex + 1 + Math.floor(Math.random() * ((this.optionsAmount - 1) - firstIndex))
        );

        this.intervalValues = [this.xLabels[firstIndex], this.xLabels[secondIndex]];
    }

    /**
     * Shows and hides numeric input buttons.
     * @param {boolean} bool 
     */
    setNumericQuestion(bool) {
        this.isNumericQuestion = bool;
        ggbApplet.setValue("isNumericQuestion", bool);
    }

    /**
     * Controls amount of buttons. 
     */
    setOptions() {
        if (this.isBarChart()) {
            this.optionsAmount = 3;
        } else if (this.isPieChart()) {
            this.optionsAmount = 3 + Math.floor(Math.random() * 3);
        } else { // isLineChart
            if (this.isIntervalQuestion) this.optionsAmount = 4;
            else this.optionsAmount = 5;
        }

        ggbApplet.setValue("options", this.optionsAmount);
    }

    /**
     * Updates question text.
     */
    setQuestionText() {
        if (this.isNumericQuestion) { 
            ggbApplet.setTextValue("question", `${this.question[0]} ${this.question[1]} ${this.intervalValues[0].toLowerCase()} ${this.question[2]} ${this.intervalValues[1].toLowerCase()}?`);
        } else { 
            ggbApplet.setTextValue("question", this.question[0] + " " + this.question[1] + "?");
        }
    }

    /**
     * Randomizes graph data.
     */
    setRandomData() {
        if (this.isLineChart() || this.isBarChart()) {
            if ((this.factor % 2 === 0 && this.factor < 11) || (this.factor % 10 === 0 && this.factor < 34)) {
                for (let i = 1; i < 6; i++) {
                    this.data[i - 1] = Math.floor(Math.random() * 21) / 2; // From 0 to 10, step = 0.5)
                    ggbApplet.setValue(`data${i}`, this.data[i - 1])
                }
            } else {
                for (let i = 1; i < 6; i++) {
                    this.data[i - 1] = Math.floor(Math.random() * 11); // From 0 to 10, step = 1
                    ggbApplet.setValue(`data${i}`, this.data[i - 1])
                }
            }
        } else { // isPieChart
            for (let i = 1; i < 6; i++) {
                this.data[i - 1] = (
                    this.optionsAmount >= i ?
                    1 + Math.floor(Math.random() * 10) : // From 1 to 10, step = 1
                    0
                ); 
                ggbApplet.setValue(`data${i}`, this.data[i - 1]);
            }
        }
    }

    /**
     * Changes factor to a random number between `minFactor` and `maxFactor`.
     * @param {number} minFactor 
     * @param {number} maxFactor 
     */
    setRandomFactor(minFactor, maxFactor) {
        this.factor = minFactor + Math.floor(Math.random() * (maxFactor - minFactor + 1));
        ggbApplet.setValue("factor", this.factor);
    }

    /**
     * Picks a random question for the chart type.
     * @param {Array} questions 
     */
    setRandomQuestion(questions) {
        this.questionIndex = Math.floor(Math.random() * (this.chartType == 2 ? 2 : questions.length));
        this.question = questions[this.questionIndex];

        this.setIntervalQuestion(this.isLineChart() && this.questionIndex >= 3);
        this.setNumericQuestion(
            (this.isLineChart() && this.questionIndex === 2) ||
            ((this.isBarChart() || this.isPieChart()) && this.questionIndex >= 2)
        );
    }

    /**
     * Changes chart title.
     * @param {string} newTitle 
     */
    setTitle(newTitle) { 
        ggbApplet.setTextValue("chartTitle", newTitle); 
    }

    /**
     * Changes game screen.
     * @param {string} type 
     */
    setView(type) { 
        ggbApplet.setValue("view", this.views[type]); 
    }

    /**
     * Changes y label legend.
     * @param {string} newLegend 
     */
    setYLabel(newLegend) { 
        ggbApplet.setTextValue("chartYLegend", newLegend); 
    }

    /**
     * Updates X labels.
     * @param {Array} xLabels 
     */
    setXLabels(xLabels) {
        this.xLabels = (
            this.isLineChart() ?
            this.#pickSequencialElements(xLabels, 5) :
            this.#pickRandomElements(xLabels, 5)
        );

        for (let i = 1; i <= 5; i++) {
            ggbApplet.setTextValue(`dataText${i}`, this.xLabels[i - 1]);
        }
    }

    /**
     * Returns a randomized `Array` with the desired amount of elements from input `Array`.
     * @param {Array} arr - The array to pick elements from
     * @param {number} elements - The amount of elements to pick
     * @returns {Array}
     */
    #pickRandomElements(arr, elements) {
        let arrCopy = [...arr];

        for (let i = 0; i < arrCopy.length; i++) {
            let randomIndex = Math.floor(Math.random() * arrCopy.length);
            [arrCopy[i], arrCopy[randomIndex]] = [arrCopy[randomIndex], arrCopy[i]];
        }

        return arrCopy.slice(0, elements);
    }

    /**
     * Returns a sequencial `Array` with the desired amount of elements from input `Array`.
     * @param {Array} arr - The array to pick elements from
     * @param {number} elements - The amount of elements to pick
     * @returns {Array}
     */
    #pickSequencialElements(arr, elements) {
        let start = Math.floor(Math.random() * (arr.length - elements + 1));

        return arr.slice(start, start + elements);
    }
}


/**
 * Called when Geogebra applet inits. 
 * 
 * Creates game instance and set it to the initial game.
 */
function ggbOnInit() {
    ggbGameInstance = new Game();
    ggbGameInstance.newRandomGame();
}