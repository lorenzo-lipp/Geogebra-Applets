let g = ggbApplet;
let canvas = document.querySelector('[aria-label="Graphics View 1"]');
let selected = null;
let startPoint = null;
let initialOrder = ["Marrom", "Rosa", "Laranja", "Verde", "Azul", "Roxo"];
let canvasOrder = [...initialOrder];
let order = ["Rosa", "Azul", "Marrom", "Laranja", "Verde", "Roxo"];
let figures = {
    fig3: "Marrom",
    fig4: "Rosa",
    fig5: "Roxo",
    fig6: "Azul",
    fig8: "Laranja",
    fig9: "Verde"
}
let size = {
    "Azul": 2, 
    "Rosa": 5, 
    "Marrom": 6, 
    "Laranja": 4, 
    "Verde": 3, 
    "Roxo": 1
}
let codes = {
    WRONG_ORDER: 0,
    OK: 1,
    WRONG_FIFTH_DISC: 2,
    WRONG_AFTER_BEFORE: 3
}
const moveTrigger = 20;
let lastDisc = 1;

function ggbOnInit() {
    g.registerClientListener((e) => {
        if (e.type === "select") selected = e.target;
        else if (e.type === "deselect") selected = null;
    });
    canvas.addEventListener("mousedown", (e) => {
        startPoint = e.y;
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", () => {
            canvas.removeEventListener("mousemove", handleMouseMove);
        });
    });
    canvas.addEventListener("touchstart", (e) => {
        startPoint = e.changedTouches[0].screenY;
        canvas.addEventListener("touchmove", handleTouchMove);
        canvas.addEventListener("touchend", () => {
            canvas.removeEventListener("touchmove", handleTouchMove);
        });
    });
    reset(true);
}

function handleMouseMove(e) {
    let difference = startPoint - e.y;
    if (selected) {
        let index = canvasOrder.indexOf(figures[selected]);
        if (difference < -moveTrigger && index > 0) {
            g.setValue(canvasOrder[index], index);
            g.setValue(canvasOrder[index - 1], index + 1);
            g.setValue("ok", undefined);
            [canvasOrder[index], canvasOrder[index - 1]] = [canvasOrder[index - 1], canvasOrder[index]];
        } else if (difference > moveTrigger && index + 1 < canvasOrder.length && index !== -1) {
            g.setValue(canvasOrder[index], index + 2);
            g.setValue(canvasOrder[index + 1], index + 1);
            g.setValue("ok", undefined);
            [canvasOrder[index], canvasOrder[index + 1]] = [canvasOrder[index + 1], canvasOrder[index]];
        } else return;
        startPoint = e.y;  
    }
}

function handleTouchMove(e) {
    handleMouseMove({y: e.changedTouches[0].screenY})
}

function newGame() {
    for (let i = 0; i < 3; i++) {order.sort(() => Math.random() - 0.5);}
    reset();
    console.log(order);
}

function getVisibleDiscs(list) {
    let visible = [];
    let bigger = 0;
    [...list].reverse().forEach((v) => {
        if (size[v] > bigger) {
            visible.push(v);
            bigger = size[v];
        }
    })
    return visible;
}

function check() {
    let visibleCanvas = getVisibleDiscs(canvasOrder);
    let visibleOrder = getVisibleDiscs(order);
    if (visibleCanvas.length !== visibleOrder.length) return g.setValue("ok", codes.WRONG_ORDER);
    visibleCanvas.forEach(v => {
        if (!visibleOrder.includes(v)) {return g.setValue("ok", codes.WRONG_ORDER);}
    });
    
    if (canvasOrder[4] !== order[4]) return g.setValue("ok", codes.WRONG_FIFTH_DISC);
    
    let indexBefore;
    let indexAfter;
    let valueBefore = g.getValueString("discoAntes");
    let valueAfter = g.getValueString("discoDepois");
    canvasOrder.forEach((v, i) => {
        if (v.toLowerCase() === valueBefore) indexBefore = i;
        else if (v.toLowerCase() === valueAfter) indexAfter = i;
    });
    if (indexBefore !== indexAfter + 1) return g.setValue("ok", codes.WRONG_AFTER_BEFORE);
    return g.setValue("ok", codes.OK);
}

function reset(onInit = false) {
    g.setValue("ok", undefined);

    order.forEach((v, i) => {
        g.setLayer("C" + v, i + 1);
    });
    initialOrder.forEach((v, i) => g.setValue(v, i + 1));
    canvasOrder = [...initialOrder];

    let discBefore = onInit ? lastDisc : Math.floor(Math.random() * 3 + 1);
    lastDisc = discBefore;
    g.setTextValue("quintoDisco", order[4].toLowerCase());
    g.setTextValue("discoAntes", order[discBefore].toLowerCase());
    g.setTextValue("discoDepois", order[discBefore - 1].toLowerCase());
}