let colors = [[255, 204, 51], [0, 153, 255], [204, 102, 0], [0, 204, 0], [204, 102, 255]];
const colorsHex = {"#FFCC33": [255, 204, 51], "#0099FF": [0, 153, 255], "#CC6600": [204, 102, 0], "#00CC00": [0, 204, 0], "#CC66FF": [204, 102, 255]};
let g = ggbApplet;
const finalAnswer = ["q1", "q4", "q5", "q7", "q11", "q14"];

function click(word) {
    let number = checkAll();
    
    if (number === 6) {
        return false;
    }

    highlight(word);
}

function highlight(word) {
    let index = 0;

    if (isHighlighted(word)) {
        colors[colors.length] = colorsHex[g.getColor(word)];
        g.setColor(word, 255, 255, 255);
        g.setFilling(word, 0.01);
    }
    else {
        if (checkAll() < 6) {
            g.setColor(word, ...colors[index]);
            colors = [...colors.slice(1)];
            g.setFilling(word, 0.25);
        }
    }

    checkAll();
}

function isHighlighted(word) {
    return g.getColor(word) !== "#FFFFFF";
}

function checkAll() {
    let number = 1;
    let list = ["q1"];
    
    for (let i = 2; i < 15; i++) {
        if(isHighlighted("q" + i)) {
            number++;
            list.push("q" + i);
        }
    }

    if (number === 6) {
        g.setValue("ok", 1);
        for (var x in list) {
            if (!finalAnswer.includes(list[x])) {
                g.setValue("ok", 0);
            }
        }
    }
    else {
        g.setValue("ok", undefined);
    }

    return number;
}