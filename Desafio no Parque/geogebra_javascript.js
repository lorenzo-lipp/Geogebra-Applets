let { setValue, getValue, setTextValue, registerClickListener } = ggbApplet;

let game = {
    order: ["R", "R", "B", "R", "B", "R", "B", "R", "B", "R", "B", "B"],
    visible: [1, 7]
}

function ggbOnInit() { registerClickListener(onClick); }

function onClick(obj) { 
    let num;
    let ok = getValue("ok");
    
    if (obj.substring(0, 14) === "CabineVermelha") num = +obj.substring(14);
    else if (obj.substring(0, 10) === "CabineAzul") num = +obj.substring(10);
    else if (obj.substring(0, 12) === "CabineBranca") num = +obj.substring(12);
    else return;

    if (game.visible.includes(num) || ok === 0 || ok === 1) return;
    
    setValue("cabine" + num, (getValue("cabine" + num) + 1) % 3);
}

function repaint() {
    for (let [index, color] of game.order.entries()) {
        let cabin = index + 1;
        let isVisible = game.visible.includes(cabin);

        if (isVisible) setValue("cabine" + cabin, color === "R" ? 1 : 2);
        else setValue("cabine" + cabin, 0);
    }
}

function updateText() {
    for (let i = 0; i < game.order.length; i++) {
        let value = game.order[i];
        let nextCabinWithSameValue;

        for (let j = (i + 1) % game.order.length; j !== i; j = (j + 1) % game.order.length) {
            if (value === game.order[j]) {
                nextCabinWithSameValue = j;
                break;
            }
        }

        if (nextCabinWithSameValue > i) setTextValue("num" + (i + 1), nextCabinWithSameValue - i);
        else setTextValue("num" + (i + 1), game.order.length - i + nextCabinWithSameValue);
    }
}

function restart() { 
    repaint(); 
    setValue("ok", undefined);
}

function check() {
    for (let [index, color] of game.order.entries()) {
        let cabin = index + 1;
        let num = getValue("cabine" + cabin);

        if (num === 1 && color === "R") continue;
        if (num === 2 && color === "B") continue;
        return setValue("ok", 0);
    }

    setValue("ok", 1);
}

function newGame() {
    for (let i = 0; i < game.order.length; i++) {
        let random = ~~(Math.random() * game.order.length);
        [game.order[i], game.order[random]] = [game.order[random], game.order[i]];
    } 

    game.visible = [];

    while(game.visible.length < 2) {
        let random = ~~(Math.random() * game.order.length);
        if (game.visible.every(v => game.order[v - 1] !== game.order[random])) game.visible.push(random + 1);
    }

    updateText()
    restart();
    console.log(game.order)
}