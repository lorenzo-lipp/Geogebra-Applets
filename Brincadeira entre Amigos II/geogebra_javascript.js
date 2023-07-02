var g = ggbApplet;
let lastFriendSelected;
const ORANGE = [255, 127, 0];
const BLACK = [0, 0, 0];

function selectFriend(friend) {
    g.evalCommand("SelectObjects()");
    if (lastFriendSelected == undefined) {
        lastFriendSelected = friend;
        g.setColor("Nome" + lastChar(friend), ...ORANGE);
    } else if (lastFriendSelected == friend) {
        lastFriendSelected = undefined;
        g.setColor("Nome" + lastChar(friend), ...BLACK);
    } else {
        let difference = lastChar(lastFriendSelected) - lastChar(friend);

        for (let i = 1; i < 9; i++) {
            g.setColor("Nome" + i, ...BLACK);
        }
        g.setColor("Nome" + lastChar(friend), ...ORANGE);

        if (Math.abs(difference) <= 1) {
            change(friend, lastFriendSelected);
            g.setColor("Nome" + lastChar(friend), ...BLACK);
            g.setColor("Nome" + lastChar(lastFriendSelected), ...BLACK);
            lastFriendSelected = undefined;
        } else {
            lastFriendSelected = friend;
        }
    }
}

function lastChar(str) {
  return str[str.length - 1];
}

function change(a, b) {
    getAndSet(a);
    getAndSet(b);
    incrementPlayMoves();
}

function getAndSet(a) {
    g.setValue(a, !g.getValue(a));
}

function incrementPlayMoves() {
    let moves = g.getValue("moves");

    if (moves == 3) {
        for (let i = 1; i < 9; i++) {
            g.setFixed("l" + i, 0, 0)
        }
    }
    g.setValue("moves", moves + 1);
}
