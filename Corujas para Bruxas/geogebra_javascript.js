var g = ggbApplet

var main = {
    1: {
        selected: false,
        animal: "Coruja",
        onChange: "Sapo"
    },
    2: {
        selected: false,
        animal: "Coruja",
        onChange: "Sapo"
    },
    3: {
        selected: false,
        animal: "Coruja",
        onChange: "Sapo"
    },
    4: {
        selected: false,
        animal: "Sapo",
        onChange: "Coruja"
    },
    5: {
        selected: false,
        animal: "Sapo",
        onChange: "Coruja"
    },
    6: {
        selected: false,
        animal: "Sapo",
        onChange: "Coruja"
    },
    7: {
        selected: false,
        animal: "Sapo",
        onChange: "Coruja"
    }
}

function select(n = 0) {
    let list = []

    if (n > 0) {main[n].selected = !main[n].selected}

    for (i = 1; i < 8; i++) {
        if (main[i].selected) {
            g.setVisible(`S${main[i].animal}${i}`, 1)
            list.push(i)
        }
        else {g.setVisible(`S${main[i].animal}${i}`, 0)}
    }

    if(list.length > 1 && n != 0) {change(list)}
}

function unselect() {
    for (i = 1; i < 8; i++) {
        main[i].selected = false
    }
    select()
}

function change(l) {
    unselect()

    l.forEach((x) => {
        g.setValue(`Fumaca${x}`, 1)
        g.setAnimating(`Fumaca${x}`, 1)
        let animal = main[x].animal
        let onChange = main[x].onChange
        main[x].animal = onChange
        main[x].onChange = animal
        g.setListValue("l1", x, Number(onChange[0] == "S"))
    })

    g.startAnimation()
}

function smokeAll() {
    for (i = 1; i < 7; i++) {
        g.setValue(`Fumaca${i}`, 1)
        g.setAnimating(`Fumaca${i}`, 1)
    }
    if (g.getListValue("l1", 7) < 2) {
        g.setValue(`Fumaca${7}`, 1)
        g.setAnimating(`Fumaca${7}`, 1)
    }
    g.startAnimation()
}

function next(i) {
    const text = "Brunilda, sua ideia só funcionará se você \n    pegar quatro sapos e não apenas três."
    const max = text.length

    if (i <= max) {
        if (text[i] == " " || text[i] == "\n") {
            next(i + 1)
        }
        else {
            setTimeout(function () {
                g.setTextValue("texto3", text.slice(0, i))
                next(i + 1)
            }, 100)
        }
    }
    else {
        g.setValue("write", 1)
    }
}