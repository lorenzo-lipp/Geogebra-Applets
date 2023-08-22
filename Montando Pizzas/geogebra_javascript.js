let { setCoords, setValue, setTextValue, getXcoord, getYcoord, setVisible, getVisible, registerClientListener } = ggbApplet;

let game = {
    cheese: {
        points: ["E", "F"],
        coords: [[6.3, -0.75], [7.23, -0.75]],
        count: 7,
        get center() {
            let x = getXcoord("CheeseCenter");
            let y = getYcoord("CheeseCenter");
            return { x, y }
        }
    },
    pepper: {
        points: ["C", "D"],
        coords: [[6.29, -2.79], [7.19, -2.79]],
        count: 3,
        get center() {
            let x = getXcoord("PepperCenter");
            let y = getYcoord("PepperCenter");
            return { x, y }
        }
    },
    pepperoni: {
        points: ["G", "H"],
        coords: [[6.29, -4.61], [7.19, -4.61]],
        count: 5,
        get center() {
            let x = getXcoord("PepperoniCenter");
            let y = getYcoord("PepperoniCenter");
            return { x, y }
        }
    },
    pizzas: [
        { x: -2.95, y: -1.41 },
        { x: -0.99, y: -1.41 },
        { x: 0.98, y: -1.41 },
        { x: 2.97, y: -1.41 },
        { x: 4.95, y: -1.41 },
        { x: -2.95, y: -3.41 },
        { x: -0.99, y: -3.41 },
        { x: 0.98, y: -3.41 },
        { x: 2.97, y: -3.41 },
        { x: 4.95, y: -3.41 }
    ]
}

function ggbOnInit() {
    registerClientListener(onClick)
}

function onRelease(type) {
    let ingredient = game[type];
    let center = ingredient.center;

    for (let [pizzaId, pizza] of game.pizzas.entries()) {
        if (isInRegion(center, pizza)) {
            setVisible(getImageName(type, pizzaId), true);
            break;
        }
    }

    for (let i = 0; i < 2; i++) {
        setCoords(ingredient.points[i], ingredient.coords[i][0], ingredient.coords[i][1]);
    }

    setValue("ok", undefined);
}

function onClick(e) {
    if (e.type === "mouseDown") {
        for (let [pizzaId, pizza] of game.pizzas.entries()) {
            if (isInRegion(e, pizza)) {
                setVisible(getImageName("cheese", pizzaId), false);
                setVisible(getImageName("pepper", pizzaId), false);
                setVisible(getImageName("pepperoni", pizzaId), false);
                setValue("ok", undefined);
                break;
            }
        }
    }
}

function getImageName(type, pizzaId) {
    if (type === "cheese") return "Queijo" + (pizzaId + 1);
    if (type === "pepper") return "Pimentão" + (pizzaId + 1);
    if (type === "pepperoni") return "Calabresa" + (pizzaId + 1);
}

function isInRegion(center, point) {
    return Math.sqrt(Math.pow(center.x - point.x, 2) + Math.pow(center.y - point.y, 2)) <= 0.85;
}

function newGame() {
    let withPepper = Math.floor(Math.random() * 7) + 1;
    let withCheese = withPepper + Math.floor(Math.random() * (10 - withPepper));
    let withPepperoni = 10 - withCheese + Math.floor(Math.random() * (withCheese - withPepper));

    game.cheese.count = withCheese;
    game.pepper.count = withPepper;
    game.pepperoni.count = withPepperoni;
    
    restart();
}

function restart() {
    for (let pizzaId = 0; pizzaId < 10; pizzaId++) {
        setVisible(getImageName("cheese", pizzaId), false);
        setVisible(getImageName("pepper", pizzaId), false);
        setVisible(getImageName("pepperoni", pizzaId), false);
    }

    setTextValue("queijos", numberToText(game.cheese.count));
    setTextValue("pimentoes", numberToText(game.pepper.count));
    setTextValue("calabresas", numberToText(game.pepperoni.count));
    setValue("ok", undefined);
}

function numberToText(num) {
    switch(num) {
        case 0: return "nenhuma pizza";
        case 1: return "uma pizza";
        case 2: return "duas pizzas";
        case 3: return "três pizzas";
        case 4: return "quatro pizzas";
        case 5: return "cinco pizzas";
        case 6: return "seis pizzas";
        case 7: return "sete pizzas";
        case 8: return "oito pizzas";
        case 9: return "nove pizzas";
        case 10: return "dez pizzas";
    }
}

function check() {
    let withCheese = 0;
    let withPepper = 0;
    let withPepperoni = 0;

    for (let pizzaId = 0; pizzaId < 10; pizzaId++) {
        let hasCheese = getVisible(getImageName("cheese", pizzaId));
        let hasPepper = getVisible(getImageName("pepper", pizzaId));
        let hasPepperoni = getVisible(getImageName("pepperoni", pizzaId));

        if (!hasCheese && !hasPepper && !hasPepperoni) return setValue("ok", false);
        if (hasPepper && !hasCheese) return setValue("ok", false);
        if (hasCheese && hasPepper && hasPepperoni) return setValue("ok", false);

        if (hasPepper) withPepper++;
        if (hasCheese) withCheese++;
        if (hasPepperoni) withPepperoni++;
    }

    if (withCheese !== game.cheese.count || 
        withPepper !== game.pepper.count ||
        withPepperoni !== game.pepperoni.count) {
            return setValue("ok", false);
    }

    setValue("ok", true);
}