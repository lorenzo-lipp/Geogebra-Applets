function ggbOnInit() {}
time = 0
time2 = 0
move = [[-5.8,-3.2], [-5.7,-3.1], [-5.5,-3], [-5.3,-2.8], [-5.1,-2.6], [-4.9, -2.4], [-4.8,-2.4], [-4.6,-2.4], [-4.4,-2.6], [-4.2,-2.8], [-4,-3], [-3.9,-3.2], [-3.9,-3.4], [-3.9,-3.6], [-3.9,-3.8], [-3.9,-4], [-3.9,-4.2], [-3.9,-4.4], [-3.9,-4.6], [-3.9,-4.8], [-3.9,-5]]
move2 = [[2.2, -3.2], [2.1,-3.1], [1.9,-3], [1.7,-2.8], [1.5,-2.6], [1.3, -2.4], [1.2,-2.4], [1,-2.4], [0.8,-2.6], [0.6,-2.8], [0.4,-3], [0.3,-3.2], [0.3,-3.4], [0.3,-3.6], [0.3,-3.8], [0.3,-4], [0.3,-4.2], [0.3,-4.4], [0.3,-4.6], [0.3,-4.8], [0.3,-5]]

function timeOut1(vari = move) {setTimeout(function() {
    if (time == 0) {random1 = Math.floor(Math.random() * 5) + 1; ggbApplet.setVisible('Mago11', 1); time++; timeOut1()} 
    else if (time == 1) {ggbApplet.setVisible('Mago11', 1); time++; timeOut1()} 
    else if (time == 2 || time == 3) {ggbApplet.setVisible('Mago11', 0); ggbApplet.setVisible('Mago12', 1); time++; timeOut1()}
    else if (time == 4 || time == 5) {ggbApplet.setVisible('Mago12', 0); ggbApplet.setVisible('Mago13', 1); time++; timeOut1()}
    else if (time < 27) {
        ggbApplet.setVisible('Ingrediente1' + random1, 1);
        ggbApplet.setVisible('Mago13', 0)
        ggbApplet.setVisible('Mago11', 1)
        ggbApplet.setCoords('Ingrediente1', vari[time-6][0], vari[time-6][1])
        time++
        timeOut1()}
    else {ggbApplet.setVisible('Ingrediente1' + random1, 0); time = 0; ggbApplet.setValue('ingredientes1', ggbApplet.getValue('ingredientes1') + 1)}
}, 33)}

function timeOut2(vari = move2) {setTimeout(function() {
    if (time2 == 0) {random2 = Math.floor(Math.random() * 5) + 1; ggbApplet.setVisible('Mago21', 1); time2++; timeOut2()} 
    else if (time2 == 1) {time2++; timeOut2()} 
    else if (time2 == 2 || time2 == 3) {ggbApplet.setVisible('Mago21', 0); ggbApplet.setVisible('Mago22', 1); time2++; timeOut2()}
    else if (time2 == 4 || time2 == 5) {ggbApplet.setVisible('Mago22', 0); ggbApplet.setVisible('Mago23', 1); time2++; timeOut2()}
    else if (time2 < 27) {
        ggbApplet.setVisible('Ingrediente2' + random2, 1);
        ggbApplet.setVisible('Mago23', 0)
        ggbApplet.setVisible('Mago21', 1)
        ggbApplet.setCoords('Ingrediente2', vari[time2-6][0], vari[time2-6][1])
        time2++
        timeOut2()}
    else if (time2 == 27) {ggbApplet.setVisible('Ingrediente2' + random2, 0); time2++; ggbApplet.setValue('ingredientes2', ggbApplet.getValue('ingredientes2') + 1);timeOut2()}
    else if (time2 == 28) {random2 = Math.floor(Math.random() * 5) + 1; ggbApplet.setVisible('Mago21', 1); time2++; timeOut2()} 
    else if (time2 == 29) {time2++; timeOut2()} 
    else if (time2 == 30 || time2 == 31) {ggbApplet.setVisible('Mago21', 0); ggbApplet.setVisible('Mago22', 1); time2++; timeOut2()}
    else if (time2 == 32 || time2 == 33) {ggbApplet.setVisible('Mago22', 0); ggbApplet.setVisible('Mago23', 1); time2++; timeOut2()}
    else if (time2 < 55) {
        ggbApplet.setVisible('Ingrediente2' + random2, 1);
        ggbApplet.setVisible('Mago23', 0)
        ggbApplet.setVisible('Mago21', 1)
        ggbApplet.setCoords('Ingrediente2', vari[time2-6-28][0], vari[time2-6-28][1])
        time2++
        timeOut2()}
    else {ggbApplet.setVisible('Ingrediente2' + random2, 0); time2 = 0; ggbApplet.setValue('ingredientes2', ggbApplet.getValue('ingredientes2') + 1);
if (ggbApplet.getValue('dia') < ggbApplet.getValue('resposta')) {ggbApplet.setValue('dia', ggbApplet.getValue('dia') + 1);}
else {ggbApplet.setValue('executando', false); if (!ggbApplet.getValue('certo')) {ggbApplet.setValue('errou', true)}}
}
    }, 33)}