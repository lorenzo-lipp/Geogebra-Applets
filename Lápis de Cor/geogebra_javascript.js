// GLOBAL
function ggbOnInit() {
    
}

pontos = ['E', 'F', 'K', 'N', 'Q', 'T', 'X']
cores = [[255, 0, 0], [255, 204, 51], [0, 100, 0], [0, 0, 255], [0,0,0], [255, 102, 153], [255, 127, 0]]

// Confere se está no tabuleiro
function conferir() {
    colorir()
    if (!(0.7 <= ggbApplet.getXcoord('E') && ggbApplet.getXcoord('E') <= 1.4 && -5 <= ggbApplet.getYcoord('E') && ggbApplet.getYcoord('E') <= -1)) {return false}
    if (!(2.3 <= ggbApplet.getXcoord('F') && ggbApplet.getXcoord('F') <= 3 && -5 <= ggbApplet.getYcoord('F') && ggbApplet.getYcoord('F') <= -1)) {return false}
    if (!(3.9 <= ggbApplet.getXcoord('K') && ggbApplet.getXcoord('K') <= 4.6 && -5 <= ggbApplet.getYcoord('K') && ggbApplet.getYcoord('K') <= -1)) {return false}
    if (!(5.5 <= ggbApplet.getXcoord('N') && ggbApplet.getXcoord('N') <= 6.2 && -5 <= ggbApplet.getYcoord('N') && ggbApplet.getYcoord('N') <= -1)) {return false}
    if (!(7.1 <= ggbApplet.getXcoord('Q') && ggbApplet.getXcoord('Q') <= 7.8 && -5 <= ggbApplet.getYcoord('Q') && ggbApplet.getYcoord('Q') <= -1)) {return false}
    if (!(8.7 <= ggbApplet.getXcoord('T') && ggbApplet.getXcoord('T') <= 9.4 && -5 <= ggbApplet.getYcoord('T') && ggbApplet.getYcoord('T') <= -1)) {return false}
    if (!(10.3 <= ggbApplet.getXcoord('X') && ggbApplet.getXcoord('X') <= 11 && -5 <= ggbApplet.getYcoord('X') && ggbApplet.getYcoord('X') <= -1)) {return false}
}

function colorir() {
    a = 0; b = 0; c = 0; d = 0; e = 0; f = 0; g = 0;
    for (var ponto in pontos) {
        if (-5 <= ggbApplet.getYcoord(pontos[ponto]) && ggbApplet.getYcoord(pontos[ponto]) <= -1) {
            if (0.7 <= ggbApplet.getXcoord(pontos[ponto]) && ggbApplet.getXcoord(pontos[ponto]) <= 1.4) {
                ggbApplet.setColor('q1', cores[ponto][0], cores[ponto][1], cores[ponto][2])
            } else {a++}
            if (2.3 <= ggbApplet.getXcoord(pontos[ponto]) && ggbApplet.getXcoord(pontos[ponto]) <= 3) {
                ggbApplet.setColor('q2', cores[ponto][0], cores[ponto][1], cores[ponto][2])
            } else {b++}
            if (3.9 <= ggbApplet.getXcoord(pontos[ponto]) && ggbApplet.getXcoord(pontos[ponto]) <= 4.6) {
                ggbApplet.setColor('q3', cores[ponto][0], cores[ponto][1], cores[ponto][2])
            } else {c++}
            if (5.5 <= ggbApplet.getXcoord(pontos[ponto]) && ggbApplet.getXcoord(pontos[ponto]) <= 6.2) {
                ggbApplet.setColor('q4', cores[ponto][0], cores[ponto][1], cores[ponto][2])
            } else {d++}
            if (7.1 <= ggbApplet.getXcoord(pontos[ponto]) && ggbApplet.getXcoord(pontos[ponto]) <= 7.8) {
                ggbApplet.setColor('q5', cores[ponto][0], cores[ponto][1], cores[ponto][2])
            } else {e++}
            if (8.7 <= ggbApplet.getXcoord(pontos[ponto]) && ggbApplet.getXcoord(pontos[ponto]) <= 9.4) {
                ggbApplet.setColor('q6', cores[ponto][0], cores[ponto][1], cores[ponto][2])
            } else {f++}
            if (10.3 <= ggbApplet.getXcoord(pontos[ponto]) && ggbApplet.getXcoord(pontos[ponto]) <= 11) {
                ggbApplet.setColor('q7', cores[ponto][0], cores[ponto][1], cores[ponto][2])
            } else {g++}
        }
        else {
            if (0.7 <= ggbApplet.getXcoord(pontos[ponto]) && ggbApplet.getXcoord(pontos[ponto]) <= 1.4) {a++}
            if (2.3 <= ggbApplet.getXcoord(pontos[ponto]) && ggbApplet.getXcoord(pontos[ponto]) <= 3) {b++}
            if (3.9 <= ggbApplet.getXcoord(pontos[ponto]) && ggbApplet.getXcoord(pontos[ponto]) <= 4.6) {c++}
            if (5.5 <= ggbApplet.getXcoord(pontos[ponto]) && ggbApplet.getXcoord(pontos[ponto]) <= 6.2) {d++}
            if (7.1 <= ggbApplet.getXcoord(pontos[ponto]) && ggbApplet.getXcoord(pontos[ponto]) <= 7.8) {e++}
            if (8.7 <= ggbApplet.getXcoord(pontos[ponto]) && ggbApplet.getXcoord(pontos[ponto]) <= 9.4) {f++}
            if (10.3 <= ggbApplet.getXcoord(pontos[ponto]) && ggbApplet.getXcoord(pontos[ponto]) <= 11) {g++}
        }
        if (pontos[ponto] == pontos[pontos.length-1]) {
            if (a == 7) {ggbApplet.setColor('q1', 96, 96, 96)}
            if (b == 7) {ggbApplet.setColor('q2', 96, 96, 96)}
            if (c == 7) {ggbApplet.setColor('q3', 96, 96, 96)}
            if (d == 7) {ggbApplet.setColor('q4', 96, 96, 96)}
            if (e == 7) {ggbApplet.setColor('q5', 96, 96, 96)}
            if (f == 7) {ggbApplet.setColor('q6', 96, 96, 96)}
            if (g == 7) {ggbApplet.setColor('q7', 96, 96, 96)}
        }
    }
}

function lápis() {
    for (var key in pontos) {
        if (!(0.8 <= ggbApplet.getXcoord(pontos[key]) && ggbApplet.getXcoord(pontos[key]) <= 11 && -5 <= ggbApplet.getYcoord(pontos[key]) && ggbApplet.getYcoord(pontos[key]) <= -1)) {return false}
    }
}

function ganhou() {
    if (conferir() != false) {ggbApplet.setTextValue('ok', '   Parabéns!'); ggbApplet.setColor('ok', 0, 153, 0); ggbApplet.setVisible('ok', 1)}
    else {if (lápis() != false) {ggbApplet.setTextValue('ok', 'Há algo errado'); ggbApplet.setColor('ok', 255, 0, 0); ggbApplet.setVisible('ok', 1)} else {ggbApplet.setVisible('ok', 0)}}

}
