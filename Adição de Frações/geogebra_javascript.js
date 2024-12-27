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
    initValues = [null, null, null, null];
    get result() { return this.initValues[0] / this.initValues[1] + this.initValues[2] / this.initValues[3]; }

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
     * Selects numerator edit box.
     */
    selectNumerator() { this.select(0); }

    /**
     * Selects denominator edit box.
     */
    selectDenominator() { this.select(1); }

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
     * Clean all input values and updates view.
     */
    cleanValues() {
        this.values = ["", ""];
        this.updateValues();
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
     * Updates user input view on Geogebra.
     */
    updateValues() {
        ggbApplet.setValue("value1", this.values[0] === "" ? undefined : +this.values[0]);
        ggbApplet.setValue("value2", this.values[1] === "" ? undefined : +this.values[1]);
    }

    /**
     * Generates a new random game and updates game fractions values.
     */
    newRandomGame() {
        let num1 = Math.floor(Math.random() * 9) + 1;
        let den1 = Math.floor(Math.random() * 9) + 1;
        let num2 = Math.floor(Math.random() * 9) + 1;
        let den2 = Math.floor(Math.random() * 9) + 1;

        this.setGameValues(num1, den1, num2, den2);
    }

    /**
     * Changes game fractions values.
     * @param {number} num1 - First numerator
     * @param {number} den1 - First denominator
     * @param {number} num2 - Second numerator
     * @param {number} den2 - Second denominator
     */
    setGameValues(num1, den1, num2, den2) {
        ggbApplet.setTextValue("text1", `\\frac{${num1}}{${den1}} + \\frac{${num2}}{${den2}} = \\frac{?}{?}`);
        this.cleanValues();
        this.confirmValues();
        this.initValues = [num1, den1, num2, den2];
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
            ggbApplet.setTextValue("text9", this.#fractionToText(...this.initValues));
            ggbApplet.setTextValue("text10", this.#fractionToText(+this.values[0], +this.values[1]));
            ggbApplet.setValue("isCorrect", 2);
        }
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
     * Transforms a fraction into LaTEX text.
     * @param {number} num1 - First numerator
     * @param {number} den1 - First denominator
     * @param {number} num2 - Optional second numerator
     * @param {number} den2 - Optional second denominator
     * @returns {string}
     */
    #fractionToText(num1, den1, num2 = null, den2 = null) {
        if (num2 !== null && den2 !== null) {
            let result = "" + (num1 / den1 + num2 / den2);
            let clippedResult = result.length > 5 ? result.slice(0, 5) + "..." : result;

            return `\\frac{${num1}}{${den1}} + \\frac{${num2}}{${den2}} = ${clippedResult}`;
        } else {
            let result = "" + (num1 / den1);
            let clippedResult = result.length > 5 ? result.slice(0, 5) + "..." : result;

            return `\\frac{${num1}}{${den1}} = ${clippedResult}`;
        }
    }
}


/**
 * Called when Geogebra applet inits. 
 * 
 * Creates game instance and set it to the initial game.
 */
function ggbOnInit() {
    ggbGameInstance = new Game();
    ggbGameInstance.setGameValues(1, 2, 3, 4);
}