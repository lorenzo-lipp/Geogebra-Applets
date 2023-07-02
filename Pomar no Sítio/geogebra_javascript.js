let g = ggbApplet;
let restrictions = {
    Aceroleira: [],
    Bananeira: ["Laranjeira", "Limoeiro"],
    Laranjeira: ["Bananeira", "Macieira"],
    Limoeiro: [],
    Macieira: ["Laranjeira", "Limoeiro"]
}


function ggbOnInit() {}

function check() {
    let trees = [];
    let isOk = true;

    for (let tree in restrictions) trees.push([tree, g.getValue(`x(${tree})`)]);
    trees.sort((a, b) => a[1] - b[1]);

    for (let i in trees) {
        let previousTree = trees[i - 1] && trees[i - 1][0];
        let tree = trees[i][0];
        let nextTree = trees[i + 1] && trees[i + 1][0];

        if (restrictions[tree].includes(previousTree) || restrictions[tree].includes(nextTree)) isOk = false;
    }

    g.setValue("ok", Number(isOk));
}