let { setValue, getValue } = ggbApplet;

let game = {
    password: "5318",
    times: 4,
    direction: "decrease",
    hint: 1
}

function ggbOnInit() {}

function decrease(n) {
    let oldValue = getValue("num" + n);
    let newValue = oldValue === 0 ? 9 : getValue("num" + n) - 1;
    setNum(n, newValue);
}

function increase(n) {
    let oldValue = getValue("num" + n);
    let newValue = oldValue === 9 ? 0 : getValue("num" + n) + 1;
    setNum(n, newValue);
}

function setNum(n, newValue) {
    setValue("num" + n, newValue);
    setValue("locked", true);
    setValue("ok", undefined);
}

function check() {
    let finalPassword = getFinalPassword();

    for (let n = 1; n < 5; n++) {
        if (finalPassword[n - 1] !== String(getValue("num" + n))) return wrong();
    }

    return correct();
}

function wrong() {
    setValue("ok", 0);
    setValue("locked", true);
}

function correct() {
    setValue("ok", 1);
    setValue("locked", false);
}

function getFinalPassword() {
    let finalPassword = [];

    for (let char of game.password) {
        let num = Number(char);
        let sum = num + game.times;
        let diff = num - game.times;

        if (game.direction === "decrease") {
            if (diff < 0) finalPassword.push(String(10 + diff));
            else finalPassword.push(String(diff));
        } else {
            if (sum > 9) finalPassword.push(String(sum - 10));
            else finalPassword.push(String(sum));
        }
    }

    return finalPassword;
}

function newGame() {
    let newPassword = [];

    for (let i = 0; i < 4; i++) newPassword.push(String(Math.floor(Math.random() * 10)));

    game.password = newPassword.join("");
    game.times = Math.floor(Math.random() * 5) + 1;
    game.direction = Math.random() > 0.5 ? "increase" : "decrease";
    game.hint = Math.floor(Math.random() * 4) + 1;
    reset()
}

function reset() {
    for (let n = 0; n < 5; n++) setValue("num" + (n + 1), Number(game.password[n]));
    setValue("hint", game.hint);
    setValue("hintNumber", getFinalPassword()[game.hint - 1]);
    setValue("locked", true);
    setValue("ok", undefined);
}