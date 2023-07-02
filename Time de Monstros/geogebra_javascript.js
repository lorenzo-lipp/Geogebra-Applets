let { registerClickListener, setTextValue, setVisible, setColor, setValue } = ggbApplet;

let game = {
    frames: 5,
    frameTime: 80,
    isFirstGame: true,
    isAnimating: false,
    monsters: {
        "Sid": 1, "Zak": 1, "Zob": 1,
        "Toy": 2, "Beg": 2, "Rom": 2,
        "Zig": 3, "Les": 3, "Lig": 3,
        "Max": 4, "Abu": 4, "Fik": 4,
        "Boo": 5, "Pet": 5, "Zuu": 5,
        "Ted": 6, "Ani": 6, "Igo": 6
    },
    monstersConfig: [
        { name:"Sid", initialColor: "V", colorChanges: 0, picked: false }, 
        { name: "Toy", initialColor: "R", colorChanges: 0, picked: false }, 
        { name: "Zig", initialColor: "R", colorChanges: 0, picked: false }, 
        { name: "Max", initialColor: "V", colorChanges: 0, picked: false }, 
        { name: "Boo", initialColor: "V", colorChanges: 0, picked: false }, 
        { name: "Ted", initialColor: "R", colorChanges: 0, picked: false }
    ]
}

function ggbOnInit() {
    registerClickListener(handleClick);
    restart();
}

function handleClick(obj) { 
    let monster = obj.substr(0, 3);
    let monsterPosition = game.monsters[monster] - 1;
    let prevMonster = game.monstersConfig[monsterPosition - 1];
    let thisMonster = game.monstersConfig[monsterPosition];
    let nextMonster = game.monstersConfig[monsterPosition + 1];

    if (!thisMonster) return;
    if (thisMonster.picked) return showErrorMessage(2);
    if (getMonsterColor(thisMonster) === "R") return showErrorMessage(1);
    pick(monsterPosition);
    fade(prevMonster, nextMonster);
}

function updateOpacity(monstersToUpdate) {
    let activeMonsters = {};
    for (let monster of game.monstersConfig) activeMonsters[monster.name] = true; 
    for (let monsterName of monstersToUpdate) {
        if (activeMonsters[monsterName]) {
            let monster = game.monstersConfig.find(m => m.name === monsterName);
            let monsterColor = getMonsterColor(monster);
            setVisible(`${monsterName}Verde`, 1);
            setVisible(`${monsterName}Rosa`, Number(monsterColor === "R"));
            setVisible(`${monsterName}Selecionado`, 0);
        } else {
            setVisible(`${monsterName}Verde`, 0);
            setVisible(`${monsterName}Rosa`, 0);
            setVisible(`${monsterName}Selecionado`, 0);
        }
    }
}

function getMonsterColor({ initialColor, colorChanges }) {
    let inverseColor = { V: "R", R: "V" };
    return colorChanges % 2 ? inverseColor[initialColor] : initialColor;
}

function pick(monsterPosition) {
    let monster = game.monstersConfig[monsterPosition];
    monster.picked = true;
    setVisible(`${monster.name}Selecionado`, 1);
    setColor(`monstro${monsterPosition + 1}`, 85, 221, 85);
    check();
}

function fade(...monsters) {
    for (let monster of monsters) {
        if (monster && !monster.picked) {
            monster.colorChanges++;
            let monsterColor = getMonsterColor(monster);
            setVisible(`${monster.name}Rosa`, Number(monsterColor === "R"));
        }
    }
}

function check() {
    for (let monster of game.monstersConfig) if (!monster.picked) return;
    setValue("ok", 1);
}

function newGame() {
    let newMonsters = getNewMonsters();
    let changeTimes = [];
    let indexes = [0, 1, 2, 3, 4, 5];

    for (let monster of newMonsters) changeTimes.push({ name: monster, colorChanges: 0, picked: false });
    
    for (let i = 0; i < 6; i++) {
        let nextValue = ~~(Math.random() * (6 - i)) + i;
        [indexes[i], indexes[nextValue]] = [indexes[nextValue], indexes[i]];

        let prevMonster = changeTimes[indexes[i] - 1];
        let pickedMonster = changeTimes[indexes[i]];
        let nextMonster = changeTimes[indexes[i] + 1];

        pickedMonster.picked = true;
        if (prevMonster && !prevMonster.picked) prevMonster.colorChanges++;
        if (nextMonster && !nextMonster.picked) nextMonster.colorChanges++;
    }

    game.monstersConfig = [{}, {}, {}, {}, {}, {}].map((monster, index) => {
        monster.name = changeTimes[index].name;
        monster.initialColor = changeTimes[index].colorChanges % 2 ? "R" : "V";
        return monster;
    });
    game.isFirstGame = false;

    restart();
}

function getNewMonsters() {
    let newMonsters = [];
    let allMonsters = Object.keys(game.monsters);
    let monstersList = [ [], [], [], [], [], [] ];

    for (let monster of allMonsters) monstersList[game.monsters[monster] - 1].push(monster);
    for (let i = 0; i < 6; i++) newMonsters[i] = monstersList[i][~~(Math.random() * 3)];

    return newMonsters;
}

function updateMonsterNames() {
    for (let [index, monster] of game.monstersConfig.entries()) {
        setTextValue(`monstro${index + 1}`, monster.name);
        setColor(`monstro${index + 1}`, 0, 0, 0);
    }
}

function restart() {
    for (let monster of game.monstersConfig) {
        monster.colorChanges = 0;
        monster.picked = false;
    }
    updateMonsterNames();
    updateOpacity(Object.keys(game.monsters));
    setValue("ok", 0);
}

function showErrorMessage(errorCode) {
    setValue("error", errorCode);
    setTimeout(() => setValue("error", 0), 1500);
}