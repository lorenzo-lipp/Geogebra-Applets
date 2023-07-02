function ggbOnInit() {}
time = 0
move1 = [[-4.44, -2.64], [-4.35, -2.6],[-4.25, -2.54],[-4.26, -2.43],[-4.26, -2.33],[-4.25, -2.26],[-4.21, -2.1],[-4.13, -1.94],[-4.04, -1.81],[-3.95, -1.72],[-3.86, -1.65],[-3.77, -1.6],[-3.7, -1.57],[-3.62, -1.54],[-3.37, -1.51],[-3.17, -1.53],[-3, -1.59],[-2.85, -1.67],[-2.74, -1.77],[-2.66, -1.86],[-2.6, -1.95],[-2.55, -2.05],[-2.49, -2.26]]
move2 = [[-2.49, -2.26], [-2.49, -2.06],[-2.49, -1.86],[-2.49, -1.76],[-2.23, -1.56],[-2.04, -1.47],[-1.93, -1.43],[-1.73, -1.4],[-1.6, -1.4],[-1.45, -1.41],[-1.27, -1.46],[-1.13, -1.52],[-0.98, -1.61],[-0.84, -1.72],[-0.8, -1.88],[-0.8, -2.04],[-0.8, -2.26],[-0.8, -2.42],[-0.8, -2.74],[-0.8, -2.97],[-0.8, -3.18],[-0.8, -3.38],[-0.84, -3.87]]
move3 = [[-0.84, -3.87], [-0.84, -3.67],[-0.84, -3.39],[-0.84, -3.17],[-0.84, -2.97],[-0.84, -2.77],[-0.84, -2.6],[-0.84, -2.4],[-0.84, -2.16],[-0.84, -2],[-0.84, -1.87],[-0.76, -1.72],[-0.62, -1.63],[-0.47, -1.55],[-0.31, -1.5],[-0.15, -1.48],[-0.03, -1.48],[0.12, -1.49],[0.24, -1.52],[0.42, -1.58],[0.61, -1.7],[0.68, -2],[0.68, -2.31]]
move4 = [[0.68, -2.31], [0.68, -1.99],[0.68, -1.71],[0.68, -1.5],[0.68, -1.29],[0.7, -1.08],[0.79, -0.92],[0.91, -0.77],[1.04, -0.64],[1.22, -0.51],[1.38, -0.42],[1.55, -0.35],[1.72, -0.31],[1.9, -0.29],[2.13, -0.3],[2.4, -0.36],[2.4, -0.5],[2.45, -0.6],[2.5, -0.7],[2.6, -0.8],[2.6, -1],[2.6, -1.2],[2.6, -1.4]]
move = move1

function timeOut(vari = move) {setTimeout(function() {if (!(time > 22)) {
    if (time % 4 == 0) {ggbApplet.setVisible('fig6', 1); ggbApplet.setVisible('fig8', 0); ggbApplet.setVisible('fig9', 0)}
    else if (time % 4 == 1 || time % 4 == 3) {ggbApplet.setVisible('fig8', 1); ggbApplet.setVisible('fig6', 0); ggbApplet.setVisible('fig9', 0)}
    else {ggbApplet.setVisible('fig9', 1); ggbApplet.setVisible('fig6', 0); ggbApplet.setVisible('fig8', 0)}
    ggbApplet.setCoords('F', vari[time][0], vari[time][1]); time++; timeOut()
} else {ggbApplet.setValue('movendo', 0)}}, 75)}

function timeOutvolta(vari = move) {setTimeout(function() {if (!(time > 22)) {
    if (time % 4 == 0) {ggbApplet.setVisible('fig6', 1); ggbApplet.setVisible('fig8', 0); ggbApplet.setVisible('fig9', 0)}
    else if (time % 4 == 1 || time % 4 == 3) {ggbApplet.setVisible('fig8', 1); ggbApplet.setVisible('fig6', 0); ggbApplet.setVisible('fig9', 0)}
    else {ggbApplet.setVisible('fig9', 1); ggbApplet.setVisible('fig6', 0); ggbApplet.setVisible('fig8', 0)}
    ggbApplet.setCoords('F', vari[vari.length-(1+time)][0], vari[vari.length-(1+time)][1]); time++; timeOutvolta()
} else {ggbApplet.setValue('movendo', 0)}}, 75)}

function usarEnergia(string) {
    energia = ggbApplet.getValue('energia')
    ggbApplet.setVisible('texto12', 1)
    ggbApplet.setVisible('texto18', 1)
    if(ggbApplet.getValue('Semenergia')) {ggbApplet.setVisible('texto12', 0); ggbApplet.setVisible('texto18', 0)}
    if(energia > 0) {
        ggbApplet.setVisible('texto12', 0)
        ggbApplet.setVisible('texto18', 0)
        ggbApplet.setValue('movendo', 1)
        if (string == 'mais') {
            if(!ggbApplet.getValue('d')) {energia--; ggbApplet.setValue('energia', energia); move = move1; time = 0; timeOut()}
            else if(!ggbApplet.getValue('a')) {energia--; ggbApplet.setValue('energia', energia); move = move2; time = 0; timeOut()}
            else if(!ggbApplet.getValue('b')) {energia--; ggbApplet.setValue('energia', energia); move = move3; time = 0; timeOut()}
            else if(!ggbApplet.getValue('c')) {energia--; ggbApplet.setValue('energia', energia); move = move4; time = 0; timeOut()}
        }
        if (string == 'menos') {
            ggbApplet.setValue('movendo', 1)
            if(!ggbApplet.getValue('a')) {energia--; ggbApplet.setValue('energia', energia); move = move1; time = 0; timeOutvolta()}
            else if(!ggbApplet.getValue('b')) {energia--; ggbApplet.setValue('energia', energia); move = move2; time = 0; timeOutvolta()}
            else if(!ggbApplet.getValue('c')) {energia--; ggbApplet.setValue('energia', energia); move = move3; time = 0; timeOutvolta()}
        }
    }
}