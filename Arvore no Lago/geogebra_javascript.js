var g = ggbApplet;
const OBJ = {
    branches: g.getValue("ramos"),
    effects: {
        0: "Tronco",
        1: "Direita1",
        2: "Esquerda1",
        3: "Direita2",
        4: "Esquerda2",
        5: "Direita3",
        6: "Esquerda3",
        7: "Direita4",
        8: "Direita5",
        9: "Direita6",
        10: "Esquerda4",
        11: "Esquerda5",
        12: "Esquerda6"
    },
    visible: [],
    setVisible(callback) {
        g.setValue("executando", 1);
        g.setValue("ramos", OBJ.branches)
        this.visible.forEach((value) => {
            g.setVisible(value, 1);
        })
        setTimeout(() => {
            this.visible.forEach((value) => {
                g.setVisible(value, 0);
            })
            this.visible = [];
            callback();
            g.setValue("mensagem", 0);
        }, 1300)
    }
};

function cut(n) {
    if (g.getValue("executando")) {
        return false
    } else if (OBJ.branches < n) {
        g.setValue("executando", 1);
        g.setValue("mensagem", 1);
        setTimeout(() => {
            g.setValue("executando", 0);
            g.setValue("mensagem", 0);  
        }, 1300)
    } else if (n == 3) {
        oldBranchesNumber = OBJ.branches;
        OBJ.branches -= 3;
        for (let key in OBJ.effects) {
            if (key > OBJ.branches && key <= oldBranchesNumber) {
                OBJ.visible.push("Efeito" + OBJ.effects[key]);
            } 
        }
        g.setValue("mensagem", 2);
        OBJ.branches > 0 ? OBJ.setVisible(growOneBranch) : OBJ.setVisible(endGame);
    } else { // n == 6
        oldBranchesNumber = OBJ.branches;
        OBJ.branches -= 6;
        for (let key in OBJ.effects) {
            if (key > OBJ.branches && key <= oldBranchesNumber) {
                OBJ.visible.push("Efeito" + OBJ.effects[key]);
            }
        }
        g.setValue("mensagem", 4);
        OBJ.branches > 0 ? OBJ.setVisible(breakOneBranch) : OBJ.setVisible(endGame);
    }
}

function growOneBranch() {
    OBJ.branches += 1;
    OBJ.visible.push("Efeito" + OBJ.effects[OBJ.branches]);
    setTimeout(() => {
        OBJ.setVisible(() => { })
        g.setValue("mensagem", 3);
        setTimeout(() => {g.setValue("executando", 0)}, 1500);
    }, 1300)
}

function breakOneBranch() {
    OBJ.branches -= 1;
    OBJ.visible.push("Efeito" + OBJ.effects[OBJ.branches + 1]);
    setTimeout(() => {
        OBJ.setVisible(() => { });
        g.setValue("mensagem", 5);
        setTimeout(() => {g.setValue("executando", 0)}, 1500);
    }, 1300)
}

function endGame() {
    OBJ.visible.push("Efeito" + OBJ.effects[0]);
    setTimeout(() => {
        OBJ.setVisible(() => {
            g.setValue("Fim", 1);
            setTimeout(() => {g.setValue("executando", 0)}, 1500);
        })
        g.setValue("mensagem", 6);
    }, 1300)
}