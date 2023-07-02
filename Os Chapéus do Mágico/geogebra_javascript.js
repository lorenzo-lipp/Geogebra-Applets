let g = ggbApplet;
const gameObject = {
    Tania: {
        x: 11.6,
        y: -0.6,
        hats: []
    }, 
    Carol: {
        x: 13.4,
        y: -5.1,
        hats: []
    }, 
    Pedro: {
        x: 9.6,
        y: -4.7,
        hats: []
    },
    Chest: {
        x: -2.4,
        y: -3.9,
        hats: []
    }
};

function ggbOnInit() {}

function getHatsPosition() {
    for (let location of Object.keys(gameObject)) gameObject[location].hats = [];

    for (let i = 1; i < 6; i++) {
        let hat = "Chapeu" + i;
        let x = g.getValue(`x(${hat})`);
        let y = g.getValue(`y(${hat})`);
        let closestLocation = null;
        let closestLocationDistance = 3.3;

        for (let location of Object.keys(gameObject)) {
            let distance = getDistance({x, y}, gameObject[location]);

            if (distance < 3.3 && distance < closestLocationDistance) {
                closestLocation = location;
                closestLocationDistance = distance;
            }
        }

        if (closestLocation) gameObject[closestLocation].hats.push(hat);
    }
}

function getDistance(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

function getHatColor(hat) {
    if (hat === "Chapeu4" || hat === "Chapeu5") return "blue";
    return "red";
}

function check() {
    getHatsPosition();

    let Tania = gameObject.Tania.hats;
    let Pedro = gameObject.Pedro.hats;
    let Carol = gameObject.Carol.hats;
    let Chest = gameObject.Chest.hats;

    if (Chest.length !== 2) return g.setValue("ok", 2);

    g.setValue("ok", Number(Tania.length === 1 && getHatColor(Tania[0]) === "red"
        && Pedro.length === 1 && getHatColor(Pedro[0]) === "blue"
        && Carol.length === 1 && getHatColor(Carol[0]) === "blue"
    ));
}