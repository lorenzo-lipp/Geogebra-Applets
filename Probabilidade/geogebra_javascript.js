var ggbGameInstance = null;

class Game {
    gameType = 1;
    data = [null, null, null, null];
    gameVariations = [
        {
            "title": "Girando a roleta",
            "options": [
                "Chocolates",
                "Verduras",
                "Ingressos",
                "Passagens",
            ],
            "questions": [
                ["Qual é", "o prêmio com maior probabilidade de ser sorteado"], 
                ["Qual é", "o prêmio com menor probabilidade de ser sorteado"],
                ["Qual é", "a probabilidade de ganhar", "ao girar a roleta"],
                ["Qual é", "a probabilidade de não ganhar", "ao girar a roleta"]
            ],
        },
        {
            "title": "Girando o dado",
            "options": [
                ["Menor que 1", 0],
                ["Maior que 1", 5/6],
                ["Menor que 2", 1/6],
                ["Maior que 2", 4/6],
                ["Menor que 3", 2/6],
                ["Maior que 3", 3/6],
                ["Menor que 4", 3/6],
                ["Maior que 4", 2/6],
                ["Menor que 5", 4/6],
                ["Maior que 5", 1/6],
                ["Menor que 6", 5/6],
                ["Maior que 6", 0],
                ["Par", 3/6],
                ["Ímpar", 3/6],
                ["Múltiplo de 2", 3/6],
                ["Múltiplo de 3", 2/6],
                ["Divisível por 2", 3/6],
                ["Divisível por 3", 2/6],
            ],
            "questions": [
                ["Ao girar o dado, o que é", "mais provável que o número obtido seja"], 
                ["Ao girar o dado, o que é", "menos provável que o número obtido seja"],
                ["Ao girar o dado, qual é", "a probabilidade de o número obtido ser"],
                ["Ao girar o dado, qual é", "a probabilidade de o número obtido não ser"]
            ],
        },
        {
            "title": "Sorteio de prêmios",
            "options": [
                "João",
                "Maria",
                "José",
                "Ricardo",
                "Júlia",
                "Bruna"
            ],
            "questions": [
                ["Qual é", "a probabilidade de", "ganhar o sorteio"], 
                ["Qual é", "a probabilidade de", "não ganhar o sorteio"]
            ],
        },
    ];
    inputType = 0;
    numeratorInput = null;
    denominatorInput = null;
    isNumericQuestion = false;
    optionsAmount = 3;
    optionIndex = 0;
    question = ["Qual é", "o prêmio com maior probabilidade de ser sorteado?"];
    questionIndex = 0;
    view = 1;
    views = {
        "GAME_VIEW": 1,
        "WRONG_ANSWER": 2,
        "RIGHT_ANSWER": 3
    };
    labels = [null, null, null, null];

    check(option = null) {
        if (this.isRoulette()) {
            if (this.questionIndex === 0) {
                return Math.max(...this.data.slice(0, this.optionsAmount)) === this.data[option];
            } else if (this.questionIndex === 1) {
                return Math.min(...this.data.slice(0, this.optionsAmount)) === this.data[option];
            } else if (this.questionIndex === 2) {
                return this.#compareFractions(
                    this.data[this.optionIndex] / 8, 
                    this.numeratorInput / this.denominatorInput
                );
            } else {
                return this.#compareFractions(
                    1 - this.data[this.optionIndex] / 8, 
                    this.numeratorInput / this.denominatorInput
                );
            }
        } else if (this.isDiceDraw()) {
            if (this.questionIndex === 0) {
                return Math.max(this.labels[0][1], this.labels[1][1]) === this.labels[option][1];
            } else if (this.questionIndex === 1) {
                return Math.min(this.labels[0][1], this.labels[1][1]) === this.labels[option][1];
            } else if (this.questionIndex === 2) {
                return this.#compareFractions(
                    this.labels[0][1], 
                    this.numeratorInput / this.denominatorInput
                );
            } else {
                return this.#compareFractions(
                    1 - this.labels[0][1], 
                    this.numeratorInput / this.denominatorInput
                ); 
            }
        } else if (this.isRuffleBox()) {
            if (this.questionIndex === 0) {
                return this.#compareFractions(
                    this.data[0] / this.data[1], 
                    this.numeratorInput / this.denominatorInput
                );
            } else {
                return this.#compareFractions(
                    (this.data[1] - this.data[0]) / this.data[1], 
                    this.numeratorInput / this.denominatorInput
                );
            }
        }
    }

    clearCurrentInput() {
        if (this.inputType === 1) {
            this.setNumeratorInput(null); 
        } else if (this.inputType === 2) {
            this.setDenominatorInput(null);
        }
    }

    clearInputs() {
        this.setInputType(1);
        this.setNumeratorInput(null);
        this.setDenominatorInput(null);
    }

    confirm(option = null) {
        if (this.isNumericQuestion && this.inputType === 1) {
            this.setInputType(2);
        } else {
           if (this.check(option)) {
                this.setView("RIGHT_ANSWER");
           } else {
                this.setView("WRONG_ANSWER");
           }

           this.setInputType(0);
        }
    }

    /**
     * Adds a number to the current input.
     * @param {number} val 
     */
    inputVal(val) {
        if (this.inputType === 1) {
            if (this.numeratorInput >= 9999) this.setNumeratorInput(val || null);
            else if (this.numeratorInput === null) this.setNumeratorInput(val);
            else this.setNumeratorInput(this.numeratorInput * 10 + val);
        } else {
            if (this.denominatorInput >= 9999) this.setDenominatorInput(val || null);
            else if (this.denominatorInput === null) this.setDenominatorInput(val);
            else this.setDenominatorInput(this.denominatorInput * 10 + val);
        }
    }

    /**
     * Checks if current game is a dice draw.
     * @returns {boolean}
     */
    isDiceDraw() {
        return this.gameType === 2;
    }

    /**
     * Checks if current game is a roulette spin.
     * @returns {boolean}
     */
    isRoulette() { 
        return this.gameType === 1;
    }

    /**
     * Checks if current game is a ruffle box.
     * @returns {boolean}
     */
    isRuffleBox() {
        return this.gameType === 3;
    }

    /**
     * Generates a new game.
     */
    newRandomGame() {
        let gameType = Math.floor(Math.random() * 3) + 1; 
        let gameVariation = this.gameVariations[gameType - 1];

        this.setGameType(gameType);
        this.setTitle(gameVariation.title);
        this.setRandomQuestion(gameVariation.questions);
        this.setOptions();
        this.setLabels(gameVariation.options);
        this.setRandomData();
        this.setQuestionText();
        this.restartGame();
    }

    /**
     * Restarts the game.
     */
    restartGame() {
        this.clearInputs();
        this.setView("GAME_VIEW");
    }

    /**
     * Changes denominator input value.
     * @param {number} val 
     * @returns 
     */
    setDenominatorInput(val) {
        this.denominatorInput = val;
        ggbApplet.setValue("denominatorInput", val ?? undefined);
    }

    /**
     * Changes chart type.
     * @param {number} type 
     */
    setGameType(type) {
        this.gameType = type;
        ggbApplet.setValue("gameType", type);
    }

    /**
     * Changes input type.
     * @param {number} type 
     */
    setInputType(type) {
        this.inputType = type;
        ggbApplet.setValue("inputType", type);
    }

    /**
     * Changes numerator input value.
     * @param {number} val 
     * @returns 
     */
    setNumeratorInput(val) {
        this.numeratorInput = val;
        ggbApplet.setValue("numeratorInput", val ?? undefined);
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
     * Updates labels.
     * @param {Array} labels 
     */
    setLabels(labels) {
        if (this.isDiceDraw()) {
            let firstLabel = this.#pickRandomElements(labels, 1)[0];
            let nextLabels = this.#pickRandomElements(labels.filter(v => v[1] !== firstLabel[1]), 3);
            this.labels = [firstLabel, ...nextLabels];
            
            for (let i = 1; i <= 4; i++) {
                ggbApplet.setTextValue(`dataText${i}`, this.labels[i - 1][0]);
            }
        } else {
            this.labels = this.#pickRandomElements(labels, 4);

            for (let i = 1; i <= 4; i++) {
                ggbApplet.setTextValue(`dataText${i}`, this.labels[i - 1]);
            }
        }
    }

    /**
     * Controls amount of buttons. 
     */
    setOptions() {
        if (this.isRoulette()) {
            this.optionsAmount = 3 + Math.floor(Math.random() * 2);
        } else if (this.isDiceDraw()) {
            this.optionsAmount = 2;
        }

        ggbApplet.setValue("options", this.optionsAmount);
    }

    /**
     * Updates question text.
     */
    setQuestionText() {
        if (this.isRoulette()) {
            if (this.questionIndex >= 2) {
                ggbApplet.setTextValue("questionText", `${this.question[0]} ${this.question[1]} ${this.labels[this.optionIndex].toLowerCase()} ${this.question[2]}?`);
            } else {
                ggbApplet.setTextValue("questionText", `${this.question[0]} ${this.question[1]}?`);
            }
        } else if (this.isDiceDraw()) {
            if (this.questionIndex >= 2) {
                ggbApplet.setTextValue("questionText", `${this.question[0]} ${this.question[1]} ${this.labels[0][0].toLowerCase()}?`);
            } else {
                ggbApplet.setTextValue("questionText", `${this.question[0]} ${this.question[1]}?`);
            }
        } else if (this.isRuffleBox()) {
            ggbApplet.setTextValue("questionText", `${this.question[0]} ${this.question[1]} ${this.labels[0]} ${this.question[2]}?`);
        }
    }

    /**
     * Randomizes game data.
     */
    setRandomData() {
        if (this.isRuffleBox()) {
            let maxVal = Math.floor(Math.random() * 25 + 1) * 10
            let val = Math.floor(Math.random() * maxVal);

            this.data = [val, maxVal];
            ggbApplet.setValue("dataVal1", this.data[0]);
            ggbApplet.setValue("dataVal2", this.data[1]);
        } else if (this.isRoulette()) {
            this.data = Array(this.optionsAmount).fill(1);

            for (let i = 8 - this.optionsAmount; i > 0; i--) {
                this.data[Math.floor(Math.random() * this.optionsAmount)]++;
            }

            this.setRouletteColors();
            this.optionIndex = Math.floor(Math.random() * this.optionsAmount);
        }
    }

    /**
     * Picks a random question for the chart type.
     * @param {Array} questions 
     */
    setRandomQuestion(questions) {
        this.questionIndex = Math.floor(Math.random() * (this.gameType == 3 ? 2 : questions.length));
        this.question = questions[this.questionIndex];

        this.setNumericQuestion(this.isRuffleBox() || this.questionIndex >= 2);
    }

    setRouletteColors() {
        let arr = Array(8).fill(0).map((_, i) => i + 1);

        arr = this.#pickRandomElements(arr, 8);

        let colors = [
            [255, 109, 95],
            [55, 141, 251],
            [168, 88, 241],
            [87, 186, 77]
        ];
        let index = 0;
        let acc = this.data[0];

        for (let i = 0; i < 8; i++) {
            if (i >= acc) {
                index++;
                acc += this.data[index];
            }

            ggbApplet.setColor("section" + arr[i], ...colors[index]);
        }
    }

    /**
     * Changes chart title.
     * @param {string} newTitle 
     */
    setTitle(newTitle) { 
        ggbApplet.setTextValue("title", newTitle); 
    }

    /**
     * Changes game screen.
     * @param {string} type 
     */
    setView(type) { 
        ggbApplet.setValue("view", this.views[type]); 
    }

    /**
     * Checks if two values are equal up to `precision` decimal places.
     * @param {number} val1 - First value
     * @param {number} val2 - Second value
     * @param {number} precision - Amount of decimal places
     * @returns {boolean}
     */
    #compareFractions(val1, val2, precision = 6) { 
        return Math.round(val1 * 10 ** precision) === Math.round(val2 * 10 ** precision); 
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