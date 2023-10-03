let { 
    getXcoord, 
    getYcoord, 
    setCoords, 
    setValue 
} = ggbApplet;

let game = {
    initialPositions: {
        "Palito1": {
            "x": 2.826,
            "y": 1.377,
            "paddingX": 0.42,
            "paddingY": 0
        }, 
        "Palito1'": { 
            "x": 2.826, 
            "y": -1.603, 
            "paddingX": 0.42, 
            "paddingY": 0 
        }, 
        "Palito2": { 
            "x": 0.784, 
            "y": -0.374, 
            "paddingX": -0.15, 
            "paddingY": 0.42 
        }, 
        "Palito2'": { 
            "x": 3.365, 
            "y": 1.115, 
            "paddingX": -0.3, 
            "paddingY": 0.3 
        }, 
        "Palito3": { 
            "x": 0.362, 
            "y": -0.490, 
            "paddingX": 0.3, 
            "paddingY": 0.3 
        }, 
        "Palito3'": { 
            "x": 2.943, 
            "y": -1.980, 
            "paddingX": 0.15, 
            "paddingY": 0.4 
        }, 
        "Palito4": { 
            "x": 0.907, 
            "y": -3.113, 
            "paddingX": -0.42, 
            "paddingY": 0 
        }, 
        "Palito4'": { 
            "x": 0.907, 
            "y": -0.133, 
            "paddingX": -0.42, 
            "paddingY": -0.1 
        }, 
        "Palito5": { 
            "x": 0.768, 
            "y": -3.577, 
            "paddingX": -0.1, 
            "paddingY": 0.42 
        }, 
        "Palito5'": { 
            "x": 3.349, 
            "y": -2.087, 
            "paddingX": -0.3, 
            "paddingY": 0.3 
        }, 
        "Palito6": { 
            "x": 0.398, 
            "y": -3.673, 
            "paddingX": 0.3, 
            "paddingY": 0.3 
        }, 
        "Palito6'": { 
            "x": 2.979, 
            "y": -5.163, 
            "paddingX": 0.1, 
            "paddingY": 0.42 
        }, 
        "Palito7": { 
            "x": 3.690, 
            "y": -4.709, 
            "paddingX": -0.42, 
            "paddingY": 0.1 
        }, 
        "Palito7'": { 
            "x": 3.690, 
            "y": -1.729, 
            "paddingX": -0.42, 
            "paddingY": -0.1 
        }, 
        "Palito8": { 
            "x": 5.731, 
            "y": -2.932, 
            "paddingX": 0.1, 
            "paddingY": -0.42 
        }, 
        "Palito8'": { 
            "x": 3.151, 
            "y": -4.422, 
            "paddingX": 0.3, 
            "paddingY": -0.3 
        }, 
        "Palito9": { 
            "x": 6.099, 
            "y": -2.799, 
            "paddingX": -0.3, 
            "paddingY": -0.3 
        }, 
        "Palito9'": { 
            "x": 3.518, 
            "y": -1.309, 
            "paddingX": -0.1, 
            "paddingY": -0.42 
        }, 
        "Palito10": { 
            "x": 6.443, 
            "y": -3.113, 
            "paddingX": -0.42, 
            "paddingY": 0.1 
        }, 
        "Palito10'": { 
            "x": 6.443, 
            "y": -0.133, 
            "paddingX": -0.42, 
            "paddingY": -0.1 
        }, 
        "Palito11": { 
            "x": 5.665, 
            "y": 0.229, 
            "paddingX": 0.1, 
            "paddingY": -0.42 
        }, 
        "Palito11'": { 
            "x": 3.084, 
            "y": -1.260, 
            "paddingX": 0.3, 
            "paddingY": -0.3 
        }, 
        "Palito12": { 
            "x": 6.127, 
            "y": 0.369, 
            "paddingX": -0.3, 
            "paddingY": -0.3 
        }, 
        "Palito12'": { 
            "x": 3.546, 
            "y": 1.859, 
            "paddingX": -0.1, 
            "paddingY": -0.42 
        }
    },
    phase: 0,
    targetValue: [3, 5]
}

function ggbOnInit() {}

function restart() {
    for (let stick in game.initialPositions) {
        setCoords(stick, game.initialPositions[stick].x, game.initialPositions[stick].y);
    }

    setValue("ok", undefined);
}

function check() {
    let clusters = getClusters();
    let sticksUsed = new Set();
    let sticksMoved = 0;

    for (let cluster of clusters) {
        cluster.forEach(v => sticksUsed.add(v.stick));
    }

    for (let stick of sticksUsed) {
        let coords = { x: getXcoord(`Palito${stick}`), y: getYcoord(`Palito${stick}`) };
        if (getDistance(coords, game.initialPositions[`Palito${stick}`]) > 0.3) {
            sticksMoved++;
        }
    }

    if (isValidSolution(clusters) && getTriangles(clusters) === game.targetValue[game.phase]) {
        if (game.phase === 0 && sticksUsed.size === 9 && sticksMoved === 0) {
            game.phase++;
            return setValue("ok", 1);
        }
        if (game.phase === 1 && sticksUsed.size === 12 && sticksMoved === 2) return setValue("ok", 2);
    }

    return setValue("ok", 0);
}

function getClusters() {
    let sticks = Array(12);

    for (let i = 1; i < 13; i++) {
        sticks[i - 1] = [
            { 
                x: getXcoord(`Palito${i}`) + game.initialPositions[`Palito${i}`].paddingX, 
                y: getYcoord(`Palito${i}`) + game.initialPositions[`Palito${i}`].paddingY,
                stick: i,
                cluster: null
            },
            {
                x: getXcoord(`Palito${i}'`) + + game.initialPositions[`Palito${i}'`].paddingX, 
                y: getYcoord(`Palito${i}'`) + + game.initialPositions[`Palito${i}'`].paddingY,
                stick: i,
                cluster: null
            }
        ];
    }

    let clusters = [];

    for (let i = 0; i < 12; i++) {
        for (let j = i + 1; j < 12; j++) {
            checkAndAddToCluster(clusters, sticks, i, j);
        }
    }
    
    return clusters;
}

function checkAndAddToCluster(clusters, sticks, i, j) {
    for (let n = 0; n < 2; n++) {
        for (let k = 0; k < 2; k++) {
            if (sticks[j][k].cluster !== null) continue;

            if (getDistance(sticks[i][n], sticks[j][k]) < 0.55) {
                if (sticks[i][n].cluster === null) {
                    sticks[i][n].cluster = clusters.length;
                    clusters.push([sticks[i][n]]);
                }

                sticks[j][k].cluster = sticks[i][n].cluster;

                clusters[sticks[j][k].cluster].push(sticks[j][k]);
            }
        }
    }
}

function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function getTriangles(clusters) {   
    let links = getClusterLinks(clusters);
    let triangles = 0;

    for (let i = 0; i < links.length; i++) {
        for (let j = 0; j < links.length; j++) {
            for (let k = 0; k < links.length; k++) {
                if (k === j || k === i || j === i) continue;

                if (
                    links[j][0] === links[i][0] 
                    && links[k][0] === links[i][1] 
                    && links[k][1] === links[j][1]
                ) {
                    triangles++;
                }
            }
        }
    }

    return triangles;
}

function getClusterSticks(clusters) {
    let clusterSticks = [];

    for (let i = 0; i < clusters.length; i++) {
        let sticks = {};

        clusters[i].forEach(cluster => sticks[cluster.stick] = true);

        clusterSticks.push(sticks);
    }

    return clusterSticks;
}

function getClusterLinks(clusters) {
    let clusterSticks = getClusterSticks(clusters);
    let links = [];

    for (let c1 = 0; c1 < clusterSticks.length; c1++) {
        for (let s1 in clusterSticks[c1]) {
            for (let c2 = c1 + 1; c2 < clusterSticks.length; c2++) {              
                if (s1 in clusterSticks[c2]) {
                    links.push([c1, c2, s1]);
                }
            }
        }
    }

    return links;
}

function isValidSolution(clusters) {
    let clusterSticks = getClusterSticks(clusters);

    if (sticksOverlap(clusters)) return false;

    for (let stick = 1; stick < 13; stick++) {
        let numClusters = 0;

        for (let stickCluster of clusterSticks) {
            if (stick in stickCluster) {
                numClusters++;
            }
        }

        if (numClusters === 1 || (numClusters === 2 && !isPartOfATriangle(clusters, stick))) return false;
    }

    return true;
}

function sticksOverlap(clusters) {
    let links = getClusterLinks(clusters);

    for (let i = 0; i < links.length; i++) {
        for (let j = 0; j < links.length; j++) {
            if (j === i) continue;

            if (links[i][0] === links[j][0] && links[i][1] === links[j][1]) {
                return true;
            }
        }
    }

    return false;
}

function isPartOfATriangle(clusters, stick) {
    let links = getClusterLinks(clusters);

    for (let cluster = 0; cluster < clusters.length; cluster++) {
        if (clusters[cluster].find(v => v.stick === stick)) {
            for (let i = 0; i < links.length; i++) {
                if (links[i][0] !== cluster && links[i][1] !== cluster) continue;

                for (let j = 0; j < links.length; j++) {
                    for (let k = 0; k < links.length; k++) {
                        if (k === j || k === i || j === i) continue;
        
                        if (
                            links[j][0] === links[i][0] 
                            && links[k][0] === links[i][1] 
                            && links[k][1] === links[j][1]
                        ) {
                            return true;
                        }
                    }
                }
            }
        }
    }

    return false;
}