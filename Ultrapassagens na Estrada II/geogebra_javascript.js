let g = ggbApplet;
let initialOrder = ['Gray', 'Red', 'Pink', 'Green', 'Blue', 'Purple', 'Yellow'];
let instructionList = [
    [6, 3],
    [6, 4],
    [2, 0],
    [6, 3]
];
let instructionCount;
let order;
let orderBeforeMove;
let surpassingCar;
let lastTimeout;
const figures = ['fig1', 'fig3', 'fig4', 'fig5', 'fig6', 'fig7', 'fig8'];
const frameTime = 100;
const normalIterationMax = 16;
const framesToChangeLane = 2;
const initialPosition = -3.63;
const instructions = {
    surpassedCount: [
        '',
        'um veículo',
        'dois veículos',
        'três veículos',
        'quatro veículos',
        'cinco veículos',
        'seis veículos'
    ],
    byType: {
        truck: [
            'o primeiro caminhão',
            'o último caminhão'
        ],
        bus: [ 'o ônibus' ],
        redCar: [ 'o carro vermelho' ],
        yellowCar: [ 'o carro amarelo' ],
        motorcycle: [
            'a primeira moto',
            'a última moto'
        ]
    }
}
const vehiclesSize = {
    Red: 2,
    Blue: 1,
    Purple: 1.9,
    Green: 3.6,
    Pink: 1,
    Gray: 2.7,
    Yellow: 2
}

function ggbOnInit() {
    restart();
}

function restart() {
    clearTimeout(lastTimeout);
    instructionCount = 0;
    order = [...initialOrder];
    initialOrder.forEach(v => {
        g.setValue(v + "X", getPosition(v, order));
        g.setValue(v + "Y", -1.04);
    });
    g.setValue("ok", undefined);
    updateGeogebraInstructions();
    restartUserSolution();
}

function getPosition(car, order) {
    let accumulator = 0;
    order.slice(0, order.indexOf(car)).forEach(v => accumulator += vehiclesSize[v]);
    return initialPosition + accumulator * 1.25;
}

function surpass(car, position) {
    surpassingCar = car;
    orderBeforeMove = [...order];
    order = getOrderAfterSurpass(car, position, order);
    animationStart();
}

function getOrderAfterSurpass(surpassingCar, surpassingCarPosition, order) {
    let newOrder = [...order];
    newOrder.splice(order.indexOf(surpassingCar), 1);
    newOrder.splice(surpassingCarPosition, 0, surpassingCar);
    return newOrder;
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
    const iterationMax = normalIterationMax - 6 + Math.abs(getBeforeMove(surpassingCar) - getAfterMove(surpassingCar)) * 6;
    const laneStep = 0.45 / framesToChangeLane;
    const framesToReturn = iterationMax - framesToChangeLane;
    lastTimeout = setTimeout(() => {
        if (iteration > iterationMax) {
            orderBeforeMove = null;
            surpassingCar = null;
            followInstructions();
        } else {
            animate(iteration + 1);
            order.forEach(car => {
                let direction = car === surpassingCar && -1 || 1;
                if (iteration <= framesToChangeLane && direction === -1) {
                    g.setValue(car + "Y", -1.04 - laneStep * iteration);
                } else if (iteration > framesToReturn && direction === -1) {
                    g.setValue(car + "Y", -1.49 + laneStep * (iteration - framesToReturn));
                }

                g.setValue(car + "X", getPosition(car, orderBeforeMove) + direction * getCarStep(car) * iteration / iterationMax);
            });
        }
    }, frameTime);
}

function getBeforeMove(car) {
    return orderBeforeMove.indexOf(car);
}

function getAfterMove(car) {
    return order.indexOf(car);
}

function getCarStep(car) {
    return Math.abs(getPosition(car, order) - getPosition(car, orderBeforeMove));
}

function newGame() {
    const cars = ['Blue', 'Red', 'Pink', 'Yellow', 'Green', 'Gray', 'Purple'];
    initialOrder = [];
    for (let car = 0; car < 7; car++) {
        initialOrder.push(...cars.splice(Math.floor(Math.random() * cars.length), 1));
    }

    let carsToMove = Array(4).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
    instructionList = Array(4).fill(0).map((_, i) => [carsToMove[i], carsToMove[i] - Math.floor(Math.random() * carsToMove[i]) - 1]);

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
    }, 1500); 
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
    let n = 1;
    let newOrder = order;
    for (let instruction of instructionList) {
        let isFirstInstruction = n === 1;
        let carIndex = instruction[0];
        let car = newOrder[carIndex];
        let carType = getVehicleType(car);
        let carTypeIndex = getVehicleTypeIndex(car, carType, newOrder);
        let inFrontOf = newOrder[instruction[1]];
        let inFrontOfType = getVehicleType(inFrontOf);
        let inFrontOfTypeIndex = getVehicleTypeIndex(inFrontOf, inFrontOfType, newOrder);
        let carText = instructions.byType[carType][carTypeIndex];;
        let positionText;

        if (isFirstInstruction) positionText = instructions.surpassedCount[instruction[0] - instruction[1]];
        else positionText = instructions.byType[inFrontOfType][inFrontOfTypeIndex];

        g.setTextValue('Car' + n, carText);
        g.setTextValue('Position' + n, positionText);

        n++;
        newOrder = getOrderAfterSurpass(car, instruction[1], newOrder);
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
    let commandString = "";

    initialOrder.forEach((car, i) => {
        let position = getPosition(car, initialOrder);
        let nextPosition = initialOrder[i + 1] ? getPosition(initialOrder[i + 1], initialOrder) : 14.07;
        let size = vehiclesSize[car] > 2 ? vehiclesSize[car] + 0.4 : vehiclesSize[car];
        let spaceBetween = nextPosition - position - size;
        let points = [
            position + spaceBetween / 2,
            position + size + spaceBetween / 2
        ];
        commandString += `${car}Position = (${points[0]}, -4.1)\n`;
        commandString += `${car}Position2 = (${points[1]}, -4.1)\n`;
    });
    g.evalCommand(commandString);
}

function getVehicleType(car) {
    switch(car) {
        case 'Red': return 'redCar';
        case 'Yellow': return 'yellowCar'
        case 'Blue': case 'Pink': return 'motorcycle';
        case 'Purple': case 'Green': return 'truck';
        case 'Gray': return 'bus';
    }
}

function getVehicleTypeIndex(car, carType, order) {
    let index = 0;

    for (let vehicle of order) {
        if (vehicle === car) break;
        if (getVehicleType(vehicle) === carType) index++;
    }

    return index;
}
