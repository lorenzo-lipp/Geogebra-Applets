let g = ggbApplet;

class Circle {
    constructor(cx, cy) {
        this.r = 0.7;
        this.cx = cx;
        this.cy = cy;
    }

    getPoint(angle) {
        return [this.cx + Math.cos(Math.PI / (180 / angle)) * this.r, this.cy + Math.sin(Math.PI / (180 / angle)) * this.r];
    }

    getInterval(start, end) {
        let interval = [];
        while (start < end) {
            interval.push(this.getPoint(start));
            start += 10;
        }
        return interval;
    }
}

const CircleA = new Circle(-1.7, 1.51);
const CircleB = new Circle(1.52, 1.51);
const CircleC = new Circle(4.75, 1.51);
const CircleE = new Circle(1.52, -1.73);
const CircleF = new Circle(4.75, -1.73);
const CircleG = new Circle(-1.7, -4.96);
const CircleH = new Circle(1.52, -4.96);
const CircleI = new Circle(4.75, -4.96);

let possiblePaths = {
    ABtoBE: {
        points: [[0.59, 1.51], ...CircleB.getInterval(180, 270), [1.52, 0.57], [1.52, -0.75]],
        rotation: [0, -30, -40, -45, -45, -40, -30, -20, -10, -90, -90],
        steps: [8, 6, ...Array(7).fill(3), 12, 25]
    },
    ABtoCF: {
        points: [[0.59, 1.51], ...CircleB.getInterval(180, 360), [2.28, 1.51], [2.48, 1.51], [3.65, 1.51], ...CircleC.getInterval(180, 270), [4.75, 0.57], [4.75, -0.75]],
        rotation: [0, -30, -40, -45, -45, -40, -30, -20, -10, 0, 15, 30, 40, 50, 60, 70, 70, 60, 40, 0, 0, -30, -40, -45, -45, -40, -30, -20, -20, -10, -90, -90],
        steps: [8, 6, ...Array(17).fill(3), 12, 13, 9, ...Array(8).fill(3), 12, 25]
    },
    ADtoAB: {
        points: [[-2.88, -1.75], [-2.36, -1.75], [-1.69, -1.75], [-1.69, 0.54], ...CircleA.getInterval(270, 360), [-0.75, 1.51], [0.59, 1.51]],
        rotation: [0, 90, 90, 30, 40, 45, 50, 60, 70, 70, 80, 70, 0, 0],
        steps: [10, 16, 30, 12, ...Array(8).fill(4), 12, 16]
    },
    BCtoBE: {
        points: [[2.48, 1.51], ...CircleB.getInterval(0, 270), [1.52, 0.57], [1.52, -0.75]],
        rotation: [180, 150, 140, 130, 135, 140, 150, 160, 165, 170, 190, 210, 220, 225, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 270, 270],
        steps: [1, 6, ...Array(25).fill(3), 12, 16]
    },
    BCtoGH: {
        points: [[2.48, 1.51], ...CircleB.getInterval(0, 180), [0.59, 1.51], [-0.75, 1.51], ...CircleA.getInterval(0, 270), [-1.69, 0.54], [-1.69, -4], ...CircleG.getInterval(90, 360), [-0.75, -4.95], [0.59, -4.95]],
        rotation: [180, 150, 140, 135, 140, 150, 160, 165, 170, 190, 210, 220, 225, 230, 240, 240, 230, 210, 180, 180, 150, 140, 130, 135, 140, 150, 160, 165, 170, 190, 210, 220, 225, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 355, 270, 270, 190, 210, 220, 225, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 355, 360, 370, 380, 390, 400, 395, 390, 380, 370, 360, 360, 360],
        steps: [8, 6, ...Array(16).fill(3), 8, 16, 8, ...Array(26).fill(3), 12, 42, 12, ...Array(26).fill(3), 8, 16]
    },
    BEtoCF: {
        points: [[1.52, 0.67], ...CircleB.getInterval(270, 360), [2.48, 1.51], [3.85, 1.51], ...CircleC.getInterval(180, 270), [4.75, 0.57], [4.75, -0.75]],
        rotation: [90, 30, 40, 40, 50, 60, 70, 80, 75, 0, 0, -30, -40, -45, -45, -40, -30, -20, -20, -40, -90, -90],
        steps: [3, 12, ...Array(7).fill(3), 12, 20, 8, ...Array(8).fill(3), 12, 25]
    },
    BEtoEH: {
        points: [[1.52, -0.75], ...CircleE.getInterval(90, 270), [1.52, -2.8], [1.52, -4.05]],
        rotation: [-90, -150, -150, -140, -135, -130, -120, -110, -100, -90, -80, -70, -60, -50, -40, -30, -30, -40, -90, -90],
        steps: [5, 12, ...Array(16).fill(3), 8, 16]
    },
    BEtoEF: {
        points: [[1.52, -0.75], ...CircleE.getInterval(90, 360), [2.48, -1.75], [3.75, -1.75]],
        rotation: [270, 230, 220, 225, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 355, 360, 370, 380, 390, 400, 395, 390, 380, 370, 360, 360],
        steps: [5, 8, ...Array(25).fill(3), 8, 16]
    },
    BEtoGH: {
        points: [[1.52, 0.57], ...CircleB.getInterval(270, 360), ...CircleB.getInterval(10, 180), [0.59, 1.51], [-0.75, 1.51], ...CircleA.getInterval(0, 270), [-1.69, 0.74], [-1.69, -4], ...CircleG.getInterval(90, 360), [-0.75, -4.95], [0.59, -4.95]],
        rotation: [90, 40, 45, 50, 60, 65, 70, 80, 90, 100, 110, 120, 130, 135, 140, 150, 160, 170, 180, 190, 200, 210, 220, 220, 210, 200, 180, 180, 150, 140, 130, 135, 140, 150, 160, 165, 170, 190, 210, 220, 225, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 330, 320, 300, 270, 270, 210, 220, 230, 235, 240, 245, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 355, 360, 370, 380, 390, 400, 395, 390, 380, 370, 360, 360],
        steps: [8, 12, ...Array(24).fill(3), 8, 16, 8, ...Array(27).fill(3), 42, 12, ...Array(26).fill(3), 8, 16]
    },
    CFtoHI: {
        points: [[4.75, -0.75], ...CircleF.getInterval(90, 270), [4.75, -2.5],  [4.75, -2.7], [4.75, -4.05], ...CircleI.getInterval(90, 180), [3.75, -4.95], [2.48, -4.95]],
        rotation: [270, 230, 235, 240, 245, 250, 250, 255, 260, 270, 280, 290, 300, 310, 320, 330, 330, 320, 300, 270, 270, 230, 240, 240, 235, 230, 225, 220, 210, 200, 180, 180],
        steps: [5, 8, ...Array(17).fill(3), 8, 16, 8, ...Array(8).fill(3), 8, 16]
    }, 
    CFtoEnd: {
        points: [[4.75, -0.75], ...CircleF.getInterval(90, 360), [5.7, -1.75], [7.93, -1.75], [7.93, -1.35], [7.93, 0.46]],
        rotation: [270, 230, 240, 250, 255, 260, 265, 270, 275, 280, 285, 290, 300, 310, 320, 330, 340, 350, 355, 360, 370, 380, 390, 400, 395, 390, 380, 360, 360, 450, 450],
        steps: [5, 8, ...Array(25).fill(3), 8, 20, 12, 20]
    },
    DGtoGH: {
        points: [[-2.88, -1.75], [-2.36, -1.75], [-1.69, -1.75], [-1.69, -4], ...CircleG.getInterval(90, 360), [-0.75, -4.95], [0.59, -4.95]],
        rotation: [360, 270, 270, 230, 240, 250, 255, 260, 265, 270, 275, 280, 285, 290, 300, 310, 320, 330, 340, 350, 355, 360, 370, 380, 390, 400, 395, 390, 380, 370, 360, 360],
        steps: [12, 12, 30, 12, ...Array(26).fill(3), 8, 16]
    },
    EFtoBE: {
        points: [[2.48, -1.75], ...CircleE.getInterval(0, 90), [1.52, -0.75], [1.52, 0.57]],
        rotation: [180, 140, 130, 135, 140, 150, 160, 160, 140, 90, 90],
        steps: [5, ...Array(8).fill(3), 12, 16]
    },
    EHtoAB: {
        points: [[1.52, -4.05], ...CircleH.getInterval(90, 180), [0.59, -4.95], [-0.75, -4.95], ...CircleG.getInterval(0, 90), [-1.69, -4], [-1.69, 0.54], ...CircleA.getInterval(270, 360), [-0.75, 1.51], [0.59, 1.51]],
        rotation: [270, 230, 240, 245, 250, 255, 260, 260, 240, 180, 180, 150, 140, 130, 135, 140, 150, 160, 165, 170, 90, 90, 30, 40, 50, 55, 50, 40, 30, 20, 10, 0, 0],
        steps: [3, 8, ...Array(7).fill(3), 12, 16, 8, ...Array(8).fill(3), 12, 42, 8, ...Array(8).fill(3), 8, 16]
    },
    EHtoBE: {
        points: [[1.52, -2.7], ...CircleE.getInterval(270, 360), ...CircleE.getInterval(0, 90), [1.52, -0.75], [1.52, 0.57]],
        rotation: [90, 30, 40, 50, 60, 55, 50, 50, 60, 70, 80, 90, 100, 105, 110, 120, 130, 135, 90, 90],
        steps: [5, 8, ...Array(16).fill(3), 8, 16]
    },
    EHtoEF: {
        points: [[1.52, -2.7], ...CircleE.getInterval(270, 360), [2.48, -1.75], [3.75, -1.75]],
        rotation: [90, 30, 40, 50, 60, 55, 50, 40, 30, 0, 0],
        steps: [3, 8, ...Array(7).fill(3), 8, 16]
    },
    EHtoFI: {
        points: [[1.52, -4.05], ...CircleH.getInterval(90, 360), [2.48, -4.95], [3.75, -4.95], ...CircleI.getInterval(180, 360), ...CircleI.getInterval(0, 90), [4.75, -4.05], [4.75, -2.7]],
        rotation: [270, 230, 240, 250, 255, 260, 265, 270, 275, 280, 285, 290, 300, 310, 320, 330, 340, 350, 355, 360, 370, 380, 390, 400, 395, 390, 380, 360, 360, 330, 320, 310, 315, 320, 330, 340, 345, 350, 370, 390, 400, 405, 410, 420, 430, 440, 450, 460, 470, 480, 490, 500, 510, 520, 530, 535, 450, 450],
        steps: [5, 8, ...Array(26).fill(3), 16, 8, ...Array(26).fill(3), 12, 16]
    },
    GHtoEH: {
        points: [[0.59, -4.95], ...CircleH.getInterval(180, 360), ...CircleH.getInterval(0, 90), [1.52, -4.05], [1.52, -2.7]],
        rotation: [360, 330, 320, 310, 315, 320, 330, 340, 345, 350, 370, 390, 400, 405, 410, 420, 430, 440, 450, 460, 470, 480, 490, 500, 510, 520, 530, 450, 450],
        steps: [5, 8, ...Array(25).fill(3), 12, 16]
    },
    GHtoFI: {
        points: [[0.59, -4.95], ...CircleH.getInterval(180, 360), [2.48, -4.95], [3.75, -4.95], ...CircleI.getInterval(180, 360), ...CircleI.getInterval(0, 90), [4.75, -4.05], [4.75, -2.7]],
        rotation: [360, 330, 320, 310, 315, 320, 330, 340, 345, 350, 370, 390, 400, 405, 410, 410, 400, 380, 360, 360, 360, 330, 320, 310, 315, 320, 330, 340, 345, 350, 370, 390, 400, 405, 410, 420, 430, 440, 450, 460, 470, 480, 490, 500, 510, 520, 530, 450, 450],
        steps: [5, 8, ...Array(16).fill(3), 8, 16, 5, ...Array(26).fill(3), 8, 16]
    },
    EFtoEnd: {
        points: [[3.75, -1.75], ...CircleF.getInterval(180, 360), [5.7, -1.75], [7.93, -1.75], [7.93, -1.35], [7.93, 0.46]],
        rotation: [360, 330, 320, 310, 315, 320, 330, 340, 345, 350, 370, 390, 400, 405, 410, 410, 400, 380, 360, 360, 450, 450],
        steps: [5, 8, ...Array(16).fill(3), 8, 20, 12, 20]
    },
    FItoBC: {
        points: [[4.75, -2.7], ...CircleF.getInterval(270, 360), ...CircleF.getInterval(0, 90), [4.75, -0.75], [4.75, 0.57], ...CircleC.getInterval(270, 360), ...CircleC.getInterval(0, 180), [3.75, 1.51], [2.48, 1.51]],
        rotation: [90, 30, 40, 50, 60, 55, 50, 50, 60, 70, 80, 90, 100, 105, 110, 120, 130, 135, 90, 90, 30, 40, 50, 60, 55, 50, 50, 60, 70, 80, 90, 100, 105, 110, 120, 130, 135, 150, 170, 185, 200, 215, 230, 240, 240, 230, 220, 180, 180],
        steps: [5, 8, ...Array(16).fill(3), 8, 16, 8, ...Array(26).fill(3), 8, 16]
    },
    FItoEF: {
        points: [[4.75, -2.7], ...CircleF.getInterval(270, 360), ...CircleF.getInterval(0, 180), [3.75, -1.75], [2.48, -1.75]],
        rotation: [90, 30, 40, 50, 60, 55, 50, 50, 60, 70, 80, 90, 100, 105, 110, 120, 130, 135, 150, 170, 185, 200, 215, 230, 240, 240, 230, 180, 180],
        steps: [5, 8, ...Array(25).fill(3), 8, 16]
    },
    FItoEnd: {
        points: [[4.75, -2.7], ...CircleF.getInterval(270, 360), [5.7, -1.75], [7.93, -1.75], [7.93, -1.35],[7.93, 0.46]],
        rotation: [90, 30, 40, 50, 60, 55, 50, 50, 60, 0, 0, 90, 90],
        steps: [5, 8, ...Array(7).fill(3), 8, 20, 12, 20]
    },
    EFtoEH: {
        points: [[2.48, -1.75], ...CircleE.getInterval(0, 270), [1.52, -2.7], [1.52, -4.05]],
        rotation: [180, 150, 140, 130, 135, 140, 150, 160, 165, 170, 190, 210, 220, 225, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 270, 270],
        steps: [5, 8, ...Array(25).fill(3), 8, 16]
    },
    EFtoBC: {
        points: [[3.75, -1.75], ...CircleF.getInterval(180, 360), ...CircleF.getInterval(0, 90), [4.75, -0.75], [4.75, 0.57], ...CircleC.getInterval(270, 360), ...CircleC.getInterval(0, 180), [3.75, 1.51], [2.48, 1.51]],
        rotation: [360, 330, 320, 310, 315, 320, 330, 340, 345, 350, 370, 390, 400, 405, 410, 420, 430, 440, 450, 460, 470, 480, 490, 500, 510, 520, 530, 450, 450, 400, 390, 400, 410, 420, 415, 410, 410, 420, 430, 440, 450, 460, 465, 470, 480, 490, 495, 510, 530, 545, 560, 575, 590, 600, 600, 590, 540, 540],
        steps: [5, 8, ...Array(25).fill(3), 8, 16, 8, ...Array(26).fill(3), 8, 16]
    },
    EFtoHI: {
        points: [[3.75, -1.75], ...CircleF.getInterval(180, 270), [4.75, -2.7], [4.75, -4.05], ...CircleI.getInterval(90, 180), [3.75, -4.95], [2.48, -4.95]],
        rotation: [360, 330, 320, 315, 315, 320, 330, 340, 340, 270, 270, 230, 240, 245, 250, 255, 260, 260, 240, 220, 180, 180],
        steps: [5, 8, ...Array(7).fill(3), 8, 16, 8, ...Array(8).fill(3), 8, 16]
    },
    CFtoEF: {
        points: [[4.75, -0.75], ...CircleF.getInterval(90, 180), [3.75, -1.75], [2.48, -1.75]],
        rotation: [270, 230, 240, 245, 250, 255, 260, 260, 240, 180, 180],
        steps: [5, 8, ...Array(7).fill(3), 8, 16]
    },
    HItoEH: {
        points: [[2.48, -4.95], ...CircleH.getInterval(0, 90), [1.52, -4.05], [1.52, -2.7]],
        rotation: [180, 140, 130, 135, 140, 150, 160, 160, 140, 90, 90],
        steps: [5, 8, ...Array(7).fill(3), 8, 16]
    },
    HItoAB: {
        points: [[2.48, -4.95], ...CircleH.getInterval(0, 180), [0.59, -4.95], [-0.75, -4.95], ...CircleG.getInterval(0, 90), [-1.69, -4], [-1.69, 0.54], ...CircleA.getInterval(270, 360), [-0.75, 1.51], [0.59, 1.51]],
        rotation: [180, 150, 140, 135, 140, 150, 160, 165, 170, 190, 210, 220, 225, 230, 240, 240, 230, 210, 180, 180, 140, 130, 135, 140, 150, 160, 160, 140, 120, 90, 90, 30, 40, 50, 60, 55, 50, 50, 40, 30, 0, 0,],
        steps: [5, 8, ...Array(16).fill(3), 8, 16, 8, ...Array(8).fill(3), 8, 42, 8, ...Array(8).fill(3), 8, 16]
    }
}
let answers = [
    "ADtoABABtoBEBEtoEFEFtoEnd", 
    "ADtoABABtoCFCFtoEnd", 
    "DGtoGHGHtoEHEHtoEFEFtoEnd",
    "DGtoGHGHtoFIFItoEnd"
];
let images = {
    "ADtoABABtoBEBEtoEFEFtoEnd": "fig4", 
    "ADtoABABtoCFCFtoEnd": "fig3", 
    "DGtoGHGHtoEHEHtoEFEFtoEnd": "fig5",
    "DGtoGHGHtoFIFItoEnd": "fig6" 
}
let userRoutes = [];

function ggbOnInit() {
    reset();
}

function animate(str, i) {
    let path = possiblePaths[str];
    let directionStart = path.rotation[i];
    let directionEnd = directionStart;
    if (i + 1 >= path.points.length) {
        check();
        return g.setValue("executing", false);
    }
    if (i == 0) {
        g.setValue("executing", true);
        if (str === "ADtoAB" || str === "DGtoGH") {
            userRoutes[userRoutes.length] = [str];
        } else {
            userRoutes[userRoutes.length - 1].push(str);
        }
    }
    if (i > 0) directionStart = path.rotation[i - 1];
    move(path.points[i], path.points[i + 1], path.steps[i], directionStart, directionEnd, 0, () => {
        animate(str, i + 1);
    });
}

function move(pos, to, steps, directionStart, directionEnd, iteration, callback) {
    if (iteration === steps) return (() => {
        g.setValue("CarX", to[0]);
        g.setValue("CarY", to[1]);
        g.setValue("Rotation", directionEnd);
        callback();
    })();
    let stepX = (to[0] - pos[0]) / steps;
    let stepY = (to[1] - pos[1]) / steps;
    let rotation = (directionEnd - directionStart) / steps;
    setTimeout(() => {
        g.setValue("CarX", pos[0] + (iteration + 1) * stepX);
        g.setValue("CarY", pos[1] + (iteration + 1) * stepY);
        g.setValue("Rotation", directionStart + rotation * (iteration + 1));
        move(pos, to, steps, directionStart, directionEnd, iteration + 1, callback);
    }, 50);
}

function reset() {
    g.setValue("CarX", -2.88);
    g.setValue("CarY", -1.75);
    g.setValue("Rotation", 0);
    g.setValue("ok", undefined);
    if (g.getValue("terminou")) {
        for (let key of Object.keys(images)) {
            g.setVisible(images[key], 0);
        }
        userRoutes = [];
        g.setValue("terminou", 0);
    }
}

function check() {
    let carX = g.getValue("CarX");
    let carY = g.getValue("CarY");
    if (carX === 7.93 && carY === 0.46) {
        let passedByRoutes = {};
        let lastRoute = userRoutes[userRoutes.length - 1].join('');
        for (let route of userRoutes) {
            let fullRoute = route.join('');
            for (let answer of answers) {
                if (fullRoute === answer) passedByRoutes[answer] = passedByRoutes[answer] ? 2 : 1;
            }
        }
        if (Object.keys(passedByRoutes).length === 4) {
            g.setVisible(images[lastRoute], 1);
            return g.setValue("terminou", 1);
        }
        if (lastRoute in passedByRoutes) {
            if (passedByRoutes[lastRoute] > 1) {
                userRoutes.splice(-1, 1);
                return g.setValue("ok", 2);
            } else {
                g.setVisible(images[lastRoute], 1);
                return g.setValue("ok", 1);
            }
        } else {
            userRoutes.splice(-1, 1);
            return g.setValue("ok", 0);
        }
    }
}