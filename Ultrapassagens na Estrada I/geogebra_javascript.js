let g = ggbApplet;
let initialOrder = ['Red', 'Blue', 'Green', 'Pink', 'Yellow'];
let instructionList = [
    ['Yellow', 1],
    [3, 1],
    [2, 1]
];
let instructionCount;
let order;
let orderBeforeMove;
let surpassingCar;
let lastTimeout;
const figures = ['fig1', 'fig3', 'fig4', 'fig5', 'fig6'];
const FRAME_TIME = 100;
const NORMAL_ITERATION_MAX = 16;
const FRAMES_TO_CHANGE_LANE = 2;
const POSITION = {
    1: { x: -3.73, y: -1.04 },
    2: { x: -0.13, y: -1.04 },
    3: { x: 3.47, y: -1.04 },
    4: { x: 7.07, y: -1.04 },
    5: { x: 10.67, y: -1.04 }
}
const INSTRUCTION_POS = {
    0: 'primeiro carro',
    1: 'segundo carro',
    2: 'carro do meio',
    3: 'penúltimo carro',
    4: 'último carro'
}
const INSTRUCTION_CARS = {
    1: 'um carro',
    2: 'dois carros',
    3: 'três carros',
    4: 'quatro carros'
}

function ggbOnInit() {
    restart();
}

function restart() {
    clearTimeout(lastTimeout);
    initialOrder.forEach((v, i) => {
        g.setValue(v + "X", POSITION[i + 1].x);
        g.setValue(v + "Y", POSITION[i + 1].y);
    });
    instructionCount = 0;
    order = [...initialOrder];
    g.setValue("ok", undefined);
    updateGeogebraInstructions();
    restartUserSolution();
}

function surpass(car, position) {
    surpassingCar = car;
    orderBeforeMove = [...order];
    order.splice(order.indexOf(car), 1);
    order.splice(position, 0, car);
    animationStart();
}

function animationStart() {
    g.setAnimating('roadPosition', true);
    g.startAnimation();
    for (let figure of figures) g.setFixed(figure, 0, 0);
    animate(1);
}

function animationEnd() {
    g.setValue('canPlay', true);
    g.stopAnimation();
    for (let figure of figures) g.setFixed(figure, 0, 1);
}

function animate(iteration) {
    const ITERATION_MAX = NORMAL_ITERATION_MAX - 6 + Math.abs(getBeforeMove(surpassingCar) - getAfterMove(surpassingCar)) * 6;
    const LANE_STEP = 0.45 / FRAMES_TO_CHANGE_LANE;
    const FRAMES_TO_RETURN_TO_LANE = ITERATION_MAX - FRAMES_TO_CHANGE_LANE;
    lastTimeout = setTimeout(() => {
        if (iteration > ITERATION_MAX) {
            orderBeforeMove = null;
            surpassingCar = null;
            followInstructions();
        } else {
            animate(iteration + 1);
            order.forEach((car, index) => {
                let direction = car === surpassingCar && -1 || 1;
                if (iteration <= FRAMES_TO_CHANGE_LANE && direction === -1) {
                    g.setValue(car + "Y", -1.04 - LANE_STEP * iteration);
                } else if (iteration > FRAMES_TO_RETURN_TO_LANE && direction === -1) {
                    g.setValue(car + "Y", -1.49 + LANE_STEP * (iteration - FRAMES_TO_RETURN_TO_LANE));
                }

                let indexBeforeMove = getBeforeMove(car);
                g.setValue(car + "X", POSITION[indexBeforeMove + 1].x + direction * getCarStep(index, indexBeforeMove) * iteration / ITERATION_MAX);
            });
        }
    }, FRAME_TIME);
}

function getBeforeMove(car) {
    return orderBeforeMove.indexOf(car);
}

function getAfterMove(car) {
    return order.indexOf(car);
}

function getCarStep(index, indexBeforeMove) {
    return Math.abs(POSITION[index + 1].x - POSITION[indexBeforeMove + 1].x);
}

function newGame() {
    const cars = ['Blue', 'Red', 'Pink', 'Yellow', 'Green'];
    initialOrder = [];
    for (let car = 0; car < 5; car++) {
        initialOrder.push(...cars.splice(Math.floor(Math.random() * cars.length), 1));
    }

    let carsToMove = [
        Math.floor(Math.random() * 4) + 1,
        Math.floor(Math.random() * 4) + 1,
        Math.floor(Math.random() * 4) + 1
    ];
    instructionList = [
        [carsToMove[0], carsToMove[0] - Math.floor(Math.random() * carsToMove[0]) - 1],
        [carsToMove[1], carsToMove[1] - Math.floor(Math.random() * carsToMove[1]) - 1],
        [carsToMove[2], carsToMove[2] - Math.floor(Math.random() * carsToMove[2]) - 1]
    ];

    restart();
}

function followInstructions() {
    g.setValue('canPlay', false);
    lastTimeout = setTimeout(() => {
        let instruction = instructionList[instructionCount];
        if (instruction) {
            if (Number.isNaN(+instruction[0])) surpass(...instruction);
            else surpass(order[instruction[0]], instruction[1]);
            updateCarFigures();

            instructionCount++;
        } else check();
    }, 1000); 
}

function check() {
    let userSolution = getUserSolution();
    let isOk = true;

    animationEnd();
    userSolution.forEach((car, i) => {
        if (car !== order[i]) isOk = false;
    });

    g.setValue("ok", Number(isOk));
}

function updateGeogebraInstructions() {
    let n = 0;
    for (let instruction of instructionList) {
        n++;
        g.setTextValue('Car' + n, instruction[0] === 'Yellow' ? 'carro amarelo' : INSTRUCTION_POS[instruction[0]]);
        g.setTextValue('Position' + n, instruction[0] === 'Yellow' ? INSTRUCTION_CARS[3] : INSTRUCTION_CARS[instruction[0] - instruction[1]]);
    }
}

function updateCarFigures() {
    initialOrder.forEach(car => g.setLayer("fig" + car, car !== surpassingCar && 3 || 4));
}

function getUserSolution() {
    let carsPosition = {};
    let userSolution = [];
    initialOrder.forEach(car => carsPosition[car] = g.getValue(`x(${car}Position)`));
    let valuesOrder = Object.values(carsPosition).sort((a, b) => a - b);
    Object.keys(carsPosition).forEach(car => userSolution[valuesOrder.indexOf(carsPosition[car])] = car);
    return userSolution;
}

function restartUserSolution() {
    const initialPositions = [-2.711, 0.8132, 4.2198, 7.6808, 11.0346];
    let commandString = "";

    initialOrder.forEach((car, i) => {
        commandString += `${car}Position = (${initialPositions[i]}, -4.1)\n`;
        commandString += `${car}Position2 = (${initialPositions[i] + 2.56}, -4.1)\n`;
    });
    g.evalCommand(commandString);
}
