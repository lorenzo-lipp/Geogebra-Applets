let colors = {
    ORANGE: [255, 127, 0],
    GRAY: [96, 96, 96],
    BLACK: [0, 0, 0],
    RED: [255, 0, 51],
    GREEN: [0, 204, 0]
}

var ggbGameInstance = null;

class Game {
    values = ["", ""];
    valuesTexts = ["text3", "text2"];
    selected = -1;
    gameType = 1;
    initValues = [null, null, null, null];
    gameNum = 2;
    get result() { 
        if (this.gameType === 1) {
            return this.initValues[0] / this.initValues[1] + this.initValues[2] / this.initValues[3]; 
        } else {
            return this.initValues[0] / this.initValues[1] - this.initValues[2] / this.initValues[3]; 
        }
    }

    /**
     * Checks if game has been solved and updates the view to show the user the appropriate messages.
     */
    check() {
        if (this.values[0] === "" || this.values[1] === "") return ggbApplet.setValue("isCorrect", 0);
        let inputResult = +this.values[0] / +this.values[1];
        let isCorrect = this.#compareFractions(this.result, inputResult);

        if (isCorrect) {
            ggbApplet.setValue("isCorrect", 1);
        } else {
            ggbApplet.setValue("solutionStep", 0);
            ggbApplet.setValue("isCorrect", 2);
        }
    }


    /**
     * Clean input value from the selected box and updates view.
     */
    cleanSelectedValue() {
        if (this.selected !== -1) {
            this.values[this.selected] = "";
            this.updateValues();
        }
    }

    /**
     * Clean all input values and updates view.
     */
    cleanValues() {
        this.values = ["", ""];
        this.updateValues();
    }

    /**
     * Deselect and exits edit mode.
     */
    confirmValues() {
        ggbApplet.setColor(this.valuesTexts[0], ...colors.GRAY);
        ggbApplet.setColor(this.valuesTexts[1], ...colors.GRAY);
        this.setTyping(0);
        this.selected = -1;
        this.check();
    }

    /**
     * Gets the Least Common Multiple of two numbers
     * @param {number} den1 
     * @param {number} den2 
     */
    getMMC(den1, den2) {
        let mmc = 1;

        for (let i = 2; den1 >= i && den2 >= i; i++) {
            if (den1 % i === 0 && den2 % i === 0) {
                den1 /= i;
                den2 /= i;
                mmc *= i;
                i--;
            }
        }

        return mmc * den1 * den2;
    }

    /**
     * Inputs a number to the selected box.
     * @param {number} value 
     */
    inputValue(value) {
        if (this.selected !== -1 && !(value === 0 && this.values[this.selected] === "")) {
            this.values[this.selected] += value;
            
            if (this.values[this.selected].length > 3) this.cleanSelectedValue();
            else this.updateValues();
        }
    }

    /**
     * Generates a new game and updates game fractions values.
     */
    newRandomGame() {
        let num1 = Math.floor(Math.random() * 9) + 1;
        let den1 = Math.floor(Math.random() * 8) + 2;
        let num2 = Math.floor(Math.random() * 9) + 1;
        let den2 = this.gameNum < 5 ? den1 : Math.floor(Math.random() * 8) + 2;

        if (this.#compareFractions(num1 / den1, num2 / den2)) {
            this.setGameType(1);
        } else if (this.gameNum < 5) {
            this.setGameType(Math.floor(this.gameNum / 3) + 1);
        } else {
            this.setGameType(Math.floor(Math.random() * 2 + 1));
        }

        if (this.gameType === 2 && num1 / den1 < num2 / den2) {
            [num1, den1, num2, den2] = [num2, den2, num1, den1];
        }

        this.setGameValues(num1, den1, num2, den2);
        this.gameNum++;
    }

    /**
     * Changes ingame guided solution.
     */
    nextStep() {
        let solutionStep = ggbApplet.getValue("solutionStep");
        let [num1, den1, num2, den2] = this.initValues;
        let mmc = this.getMMC(den1, den2);
        let newNum1 = num1 * (mmc / den1);
        let newNum2 = num2 * (mmc / den2);

        if (solutionStep === 0) {
            ggbApplet.setTextValue("text14", `O menor múltiplo comum entre os denominadores ${den1} e ${den2} é igual a ${mmc}`);
        } else if (solutionStep === 1) {
            ggbApplet.setTextValue("text17", `\\frac{${num1}}{${den1}} = \\frac{?}{${mmc}}                  \\frac{${num2}}{${den2}} = \\frac{?}{${mmc}}`);
        } else if (solutionStep === 2) {
            ggbApplet.setTextValue("text17", `\\frac{${num1}}{${den1}} = \\frac{${newNum1}}{${mmc}}                  \\frac{${num2}}{${den2}} = \\frac{${newNum2}}{${mmc}}`);
        } else {
            ggbApplet.setTextValue("text20", `\\frac{${newNum1}}{${mmc}} ${this.gameType === 1 ? "+" : "-"} \\frac{${newNum2}}{${mmc}} = \\frac{?}{${mmc}}`);
        }

        ggbApplet.setValue("solutionStep", solutionStep + 1);
    }

    /**
     * Selects an edit box from numerator or denominator to input values.
     * @param {number} num 
     */
    select(num) {
        if (this.selected === num) return this.confirmValues();
        if (this.selected !== -1) this.confirmValues();
        
        this.selected = num;
        this.cleanSelectedValue();
        this.setTyping(num + 1);
        ggbApplet.setColor(this.valuesTexts[num], ...colors.ORANGE);
    }

    /**
     * Selects denominator edit box.
     */
    selectDenominator() { this.select(1); }

    /**
     * Selects numerator edit box.
     */
    selectNumerator() { this.select(0); }

    /**
     * Changes game type (1 for add, 2 for subtract)
     */
    setGameType(gameType) { 
        this.gameType = gameType;
        ggbApplet.setValue("gameType", this.gameType);
    }

    /**
     * Changes game fractions values.
     * @param {number} num1 - First numerator
     * @param {number} den1 - First denominator
     * @param {number} num2 - Second numerator
     * @param {number} den2 - Second denominator
     */
    setGameValues(num1, den1, num2, den2) {
        ggbApplet.setTextValue("denominator1", den1);
        ggbApplet.setTextValue("denominator2", den2);
        ggbApplet.setTextValue("numerator1", num1);
        ggbApplet.setTextValue("numerator2", num2);
        this.cleanValues();
        this.confirmValues();
        this.initValues = [num1, den1, num2, den2];
    }

    /**
     * Changes typing mode. 
     * 
     * 0 -> Not typing. 
     * 
     * 1 -> Typing to the numerator edit box.
     * 
     * 2 -> Typing to the denominator edit box.
     * @param {number} val 
     */
    setTyping(val) { ggbApplet.setValue("typing", val); }

    /**
     * Updates user input view on Geogebra.
     */
    updateValues() {
        ggbApplet.setValue("value1", this.values[0] === "" ? undefined : +this.values[0]);
        ggbApplet.setValue("value2", this.values[1] === "" ? undefined : +this.values[1]);
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
}


/**
 * Called when Geogebra applet inits. 
 * 
 * Creates game instance and set it to the initial game.
 */
function ggbOnInit() {
    ggbGameInstance = new Game();
    ggbGameInstance.setGameValues(1, 2, 6, 2);
}