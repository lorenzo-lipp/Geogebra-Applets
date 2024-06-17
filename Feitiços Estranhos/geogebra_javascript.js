let {
    setVisible,
    setValue,
    setCoords,
    getValue
} = ggbApplet;
let game = {
    sleepTime: 33
};
let pathLeft = [
    [-5.8,-3.2], 
    [-5.7,-3.1], 
    [-5.5,-3], 
    [-5.3,-2.8], 
    [-5.1,-2.6], 
    [-4.9, -2.4], 
    [-4.8,-2.4], 
    [-4.6,-2.4], 
    [-4.4,-2.6], 
    [-4.2,-2.8], 
    [-4,-3], 
    [-3.9,-3.2], 
    [-3.9,-3.4], 
    [-3.9,-3.6], 
    [-3.9,-3.8], 
    [-3.9,-4], 
    [-3.9,-4.2], 
    [-3.9,-4.4], 
    [-3.9,-4.6], 
    [-3.9,-4.8], 
    [-3.9,-5]
];
let pathRight = [
    [2.2, -3.2], 
    [2.1,-3.1], 
    [1.9,-3], 
    [1.7,-2.8], 
    [1.5,-2.6], 
    [1.3, -2.4], 
    [1.2,-2.4], 
    [1,-2.4], 
    [0.8,-2.6], 
    [0.6,-2.8], 
    [0.4,-3], 
    [0.3,-3.2], 
    [0.3,-3.4], 
    [0.3,-3.6], 
    [0.3,-3.8], 
    [0.3,-4], 
    [0.3,-4.2], 
    [0.3,-4.4], 
    [0.3,-4.6], 
    [0.3,-4.8], 
    [0.3,-5]
];

function ggbOnInit() {}

function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

async function runAnimations() {
    while (getValue('dia') <= getValue('resposta')) {
        let fruitLeft = getRandomFruit();
        let fruitRight = getRandomFruit();

        for (let time = 0; time < 56; time++) {
            if (time === 0) {
                setVisible('Mago11', 1);
                setVisible('Mago21', 1);
            } else if (time === 1) {
                setVisible('Mago11', 1);
            } else if (time === 2) {
                setVisible('Mago11', 0); 
                setVisible('Mago12', 1);
                setVisible('Mago21', 0); 
                setVisible('Mago22', 1);
            } else if (time === 4) {
                setVisible('Mago12', 0);
                setVisible('Mago13', 1);
                setVisible('Mago22', 0); 
                setVisible('Mago23', 1);
            } else if (time > 5 && time < 27) {
                setVisible('Ingrediente1' + fruitLeft, 1);
                setVisible('Mago13', 0)
                setVisible('Mago11', 1)
                setCoords('Ingrediente1', pathLeft[time-6][0], pathLeft[time-6][1]);
                setVisible('Ingrediente2' + fruitRight, 1);
                setVisible('Mago23', 0);
                setVisible('Mago21', 1);
                setCoords('Ingrediente2', pathRight[time-6][0], pathRight[time-6][1]);
            } else if (time === 27) {
                setVisible('Ingrediente1' + fruitLeft, 0); 
                setValue('ingredientes1', getValue('ingredientes1') + 1);
                setVisible('Ingrediente2' + fruitRight, 0); 
                setValue('ingredientes2', getValue('ingredientes2') + 1);
            } else if (time === 28) {
                fruitRight = getRandomFruit(); 
                setVisible('Mago21', 1);
            } else if (time === 30) {
                setVisible('Mago21', 0); 
                setVisible('Mago22', 1);
            } else if (time === 32) {
                setVisible('Mago22', 0); 
                setVisible('Mago23', 1);
            } else if (time > 33 && time < 55) {
                setVisible('Ingrediente2' + fruitRight, 1);
                setVisible('Mago23', 0);
                setVisible('Mago21', 1);
                setCoords('Ingrediente2', pathRight[time-34][0], pathRight[time-34][1]);
            } else if (time === 55) {
                setVisible('Ingrediente2' + fruitRight, 0); 
                setValue('ingredientes2', getValue('ingredientes2') + 1);
            }

            await sleep(game.sleepTime);
        }
        setValue('dia', getValue('dia') + 1);
    }

    setValue('executando', false); 
    setValue('errou', !getValue('certo'));
}

function getRandomFruit() { return Math.floor(Math.random() * 5) + 1; }

function restart() {
    setValue('executando', false);
    setValue('errou', false);
    setValue('resposta', undefined);
    setValue('dia', 1);
    setValue('ingredientes1', getValue('ingredientesIniciais'));
    setValue('ingredientes2', getValue('ingredientesIniciais2'));
}

function newGame() {
    let leftIngredients = getValue('ingredientesIniciais');
    let newLeftIngredients = Math.floor(Math.random() * 8 + 2);

    if (newLeftIngredients >= leftIngredients) newLeftIngredients++;
    setValue('ingredientesIniciais', newLeftIngredients);

    let newRightIngredients = Math.floor(Math.random() * Math.min(newLeftIngredients, 6));
    setValue('ingredientesIniciais2', newRightIngredients);

    restart();
}

function check() {
    setValue("executando", true);
    runAnimations();
}