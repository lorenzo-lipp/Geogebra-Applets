let g = ggbApplet;
let colors = {
    "Verde": 3, 
    "Laranja": 4, 
    "Azul": 2, 
    "Roxo": 1, 
    "Marrom": 6, 
    "Rosa": 5
};

function ggbOnInit() {}

function toggleVisibility(str) {
    g.setVisible(str, !g.getVisible(str));
    g.evalCommand("SelectObjects()");
    g.setValue("ok", undefined);
}

function check() {
    let positions = [];
    let visibleColors = [];

    for (let color of Object.keys(colors)) {
        positions[g.getValue(color) - 1] = color;
    }

    positions.forEach((v, i) => {
        let isVisible = true;

        for (let j = i + 1; j < positions.length; j++) {
            if (colors[v] < colors[positions[j]]) isVisible = false;
        }

        if (isVisible) {
            visibleColors.push(v);
        }
    });

    let userSelectedColors = getUserSelectedColors();

    if (userSelectedColors.length === 0 || userSelectedColors.length !== visibleColors.length) return g.setValue("ok", 0);
    for (let selectedColor of userSelectedColors) {
        if (!(visibleColors.includes(selectedColor))) return g.setValue("ok", 0);
    }

    g.setValue("ok", 1);
}

function getUserSelectedColors() {
    let userSelectedColors = [];

    for (let color of Object.keys(colors)) {
        if (g.getVisible("P" + color)) userSelectedColors.push(color);
    }

    return userSelectedColors;
}

function newGame() {
    let colorNames = Object.keys(colors);
    for (let i = 0; i < 3; i++) {colorNames.sort(() => Math.floor(Math.random() * 3) - 1);}

    colorNames.forEach((v, i) => {
        g.setValue(v, (+i) + 1);
    });

    reset();
}

function reset() {
    let colorNames = Object.keys(colors); 
    
    colorNames.forEach((v, i) => {
        g.setVisible("P" + v, 0);
    });

    g.setValue("ok", undefined);
}