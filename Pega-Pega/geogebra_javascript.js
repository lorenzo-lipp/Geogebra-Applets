let g = ggbApplet;
let timeouts = [];
let circles = {
    yellow: {
        pos: { 
            x: 5.66, 
            y: -2.21 
        },
        neighbors: ["purple", "blue"]
    },
    purple: {
        pos: { 
            x: 2.66, 
            y: 0 
        },
        neighbors: ["pink", "green", "yellow"]
    },
    pink: {
        pos: {
            x: 2.66, 
            y: -3.2
        },
        neighbors: ["purple", "orange", "blue"]
    },
    blue: {
        pos: {
            x: 4.36, 
            y: -6
        },
        neighbors: ["yellow", "pink", "orange"]
    },
    orange: {
        pos: {
            x: 0.96, 
            y: -6
        },
        neighbors: ["green", "pink", "blue"]
    },
    green: {
        pos: {
            x: -0.34,
            y: -2.2
        },
        neighbors: ["purple", "orange"]
    }
};
let Samuel;
var Talita;
let turn;

function ggbOnInit() {
    Samuel = { 
        name: "Samuel",
        pos: { 
            x: 5.66, 
            y: -2.21 
        }, 
        circle: "yellow",
        play() {
            let badMoves = circles[this.circle].neighbors.filter(v => v != Talita.circle);
            let goodMoves = badMoves.filter(v => !circles[Talita.circle].neighbors.includes(v));
    
            if (goodMoves.length > 0) {
                move(this.name, this.pos, circles[goodMoves[Math.floor(Math.random() * goodMoves.length)]], 1);
            } else {
                move(this.name, this.pos, circles[badMoves[Math.floor(Math.random() * badMoves.length)]], 1);
            }
        } 
    };
    Talita = { 
        name: "Talita",
        pos: { 
            x: 2.66, 
            y: -3.2 
        }, 
        circle: "pink",
        moves: 0,
        play(moveTo) {
            if (turn !== "Talita") return false;
            if (moveTo === this.circle) return false;
            if (!circles[this.circle].neighbors.includes(moveTo)) return false;
    
            turn = "Samuel";
    
            move(this.name, this.pos, circles[moveTo], 1);
        }
    };
    turn = "Talita";
    g.setValue("SamuelX", circles.yellow.pos.x);
    g.setValue("SamuelY", circles.yellow.pos.y);
    g.setValue("TalitaX", circles.pink.pos.x);
    g.setValue("TalitaY", circles.pink.pos.y);
    g.setValue("ok", undefined);
}

function move(name, from, to, n) {
    let step = { 
        x: difference(from.x, to.pos.x) / 10, 
        y: difference(from.y, to.pos.y) / 10 
    };

    if (n <= 10) {
        g.setValue(`${name}X`, from.x - step.x * n);
        g.setValue(`${name}Y`, from.y - step.y * n);
        n++;
        timeouts.push(setTimeout(() => {move(name, from, to, n)}, 100));
    }
    else {
        if (name === "Samuel") {
            Samuel.pos.x = to.pos.x;
            Samuel.pos.y = to.pos.y;
            Samuel.circle = Object.keys(circles).find(v => circles[v].pos.x === Samuel.pos.x && circles[v].pos.y === Samuel.pos.y);
            if (Talita.moves >= 4) return end(0);
            turn = "Talita";
        } else {
            Talita.pos.x = to.pos.x;
            Talita.pos.y = to.pos.y;
            Talita.circle = Object.keys(circles).find(v => circles[v].pos.x === Talita.pos.x && circles[v].pos.y === Talita.pos.y);
            Talita.moves++;

            if (Talita.circle === Samuel.circle) return end(1);

            timeouts.push(setTimeout(() => {
                Samuel.play();
            }, 1500));
        }
    }
}

function difference(a, b) {
    return ((a * 100 - b * 100) / 100);
}

function reset() {
    for (let i of timeouts) {
        clearTimeout(i);
    }
    ggbOnInit();
}

function end(ok) {
    g.setTextValue("texto4", "");
    g.setTextValue("texto5", "");
    talk(ok, 0);
    g.setValue("ok", ok);
}

function talk(ok, i) {
    let text;
    let textName;

    if (ok) {
        textName = "texto5";
        text = "Parabéns, Talita\n pegou Samuel!";
    } else {
        textName = "texto4";
        text = "Ninguém foi pego\n  em 4 rodadas!";
    }

    const max = text.length;

    if (i <= max) {
        if (text[i] == " " || text[i] == "\n") {
            talk(ok, i + 1);
        }
        else {
            timeouts.push(setTimeout(() => {
                g.setTextValue(textName, text.slice(0, i));
                talk(ok, i + 1);
            }, 100));
        }
    }
}