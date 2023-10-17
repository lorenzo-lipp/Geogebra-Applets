let { 
    getXcoord, 
    getYcoord, 
    setCoords, 
    setValue 
} = ggbApplet;

let game = {
    initialPositions: {
        "Palito1": {
            "x": 3.826,
            "y": 1.377,
            "paddingX": 0.42,
            "paddingY": 0
        }, 
        "Palito1'": { 
            "x": 3.826, 
            "y": -1.603, 
            "paddingX": 0.42, 
            "paddingY": 0 
        }, 
        "Palito2": { 
            "x": 1.784, 
            "y": -0.374, 
            "paddingX": -0.15, 
            "paddingY": 0.42 
        }, 
        "Palito2'": { 
            "x": 4.365, 
            "y": 1.115, 
            "paddingX": -0.3, 
            "paddingY": 0.3 
        }, 
        "Palito3": { 
            "x": 1.362, 
            "y": -0.490, 
            "paddingX": 0.3, 
            "paddingY": 0.3 
        }, 
        "Palito3'": { 
            "x": 3.943, 
            "y": -1.980, 
            "paddingX": 0.15, 
            "paddingY": 0.4 
        }, 
        "Palito4": { 
            "x": 1.907, 
            "y": -3.113, 
            "paddingX": -0.42, 
            "paddingY": 0 
        }, 
        "Palito4'": { 
            "x": 1.907, 
            "y": -0.133, 
            "paddingX": -0.42, 
            "paddingY": -0.1 
        }, 
        "Palito5": { 
            "x": 1.768, 
            "y": -3.577, 
            "paddingX": -0.1, 
            "paddingY": 0.42 
        }, 
        "Palito5'": { 
            "x": 4.349, 
            "y": -2.087, 
            "paddingX": -0.3, 
            "paddingY": 0.3 
        }, 
        "Palito6": { 
            "x": 1.398, 
            "y": -3.673, 
            "paddingX": 0.3, 
            "paddingY": 0.3 
        }, 
        "Palito6'": { 
            "x": 3.979, 
            "y": -5.163, 
            "paddingX": 0.1, 
            "paddingY": 0.42 
        }, 
        "Palito7": { 
            "x": 4.690, 
            "y": -4.709, 
            "paddingX": -0.42, 
            "paddingY": 0.1 
        }, 
        "Palito7'": { 
            "x": 4.690, 
            "y": -1.729, 
            "paddingX": -0.42, 
            "paddingY": -0.1 
        }, 
        "Palito8": { 
            "x": 6.731, 
            "y": -2.932, 
            "paddingX": 0.1, 
            "paddingY": -0.42 
        }, 
        "Palito8'": { 
            "x": 4.151, 
            "y": -4.422, 
            "paddingX": 0.3, 
            "paddingY": -0.3 
        }, 
        "Palito9": { 
            "x": 7.099, 
            "y": -2.799, 
            "paddingX": -0.3, 
            "paddingY": -0.3 
        }, 
        "Palito9'": { 
            "x": 4.518, 
            "y": -1.309, 
            "paddingX": -0.1, 
            "paddingY": -0.42 
        }, 
        "Palito10": { 
            "x": 7.443, 
            "y": -3.113, 
            "paddingX": -0.42, 
            "paddingY": 0.1 
        }, 
        "Palito10'": { 
            "x": 7.443, 
            "y": -0.133, 
            "paddingX": -0.42, 
            "paddingY": -0.1 
        }, 
        "Palito11": { 
            "x": 6.665, 
            "y": 0.229, 
            "paddingX": 0.1, 
            "paddingY": -0.42 
        }, 
        "Palito11'": { 
            "x": 4.084, 
            "y": -1.260, 
            "paddingX": 0.3, 
            "paddingY": -0.3 
        }, 
        "Palito12": { 
            "x": 7.127, 
            "y": 0.369, 
            "paddingX": -0.3, 
            "paddingY": -0.3 
        }, 
        "Palito12'": { 
            "x": 4.546, 
            "y": 1.859, 
            "paddingX": -0.1, 
            "paddingY": -0.42 
        },
        "Palito13": { 
            "x": 7.351, 
            "y": -3.622, 
            "paddingX": -0.1, 
            "paddingY": 0.42 
        }, 
        "Palito13'": { 
            "x": 9.931, 
            "y": -2.132, 
            "paddingX": -0.3, 
            "paddingY": 0.3 
        },
        "Palito14": { 
            "x": 9.907, 
            "y": -1.281, 
            "paddingX": -0.3, 
            "paddingY": -0.3 
        }, 
        "Palito14'": { 
            "x": 7.326, 
            "y": 0.209, 
            "paddingX": -0.1, 
            "paddingY": -0.42 
        },
        "Palito15": { 
            "x": -0.962, 
            "y": -2.007, 
            "paddingX": -0.1, 
            "paddingY": 0.42 
        }, 
        "Palito15'": { 
            "x": 1.619, 
            "y": -0.517, 
            "paddingX": -0.3, 
            "paddingY": 0.3 
        }, 
        "Palito16": { 
            "x": -1.342, 
            "y": -2.113, 
            "paddingX": 0.3, 
            "paddingY": 0.3 
        }, 
        "Palito16'": { 
            "x": 1.239, 
            "y": -3.603, 
            "paddingX": 0.1, 
            "paddingY": 0.42 
        }
    },
    targetValue: 4
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
    let sticksMoved = 0;

    for (let stick = 1; stick < 17; stick++) {
        let [x, y] = [getXcoord("Palito" + stick), getYcoord("Palito" + stick)];

        if (getDistance({x, y}, game.initialPositions[`Palito${stick}`]) > 0.8) sticksMoved++;
    }

    if (isValidSolution(clusters) && getTriangles(clusters) === game.targetValue && sticksMoved === 4) {
        return setValue("ok", 1);
    }

    return setValue("ok", 0);
}

function getClusters() {
    let sticks = Array(16);

    for (let i = 1; i < 17; i++) {
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

    for (let i = 0; i < 16; i++) {
        for (let j = i + 1; j < 16; j++) {
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

    for (let stick = 1; stick < 17; stick++) {
        let numClusters = 0;

        for (let stickCluster of clusterSticks) {
            if (stick in stickCluster) {
                numClusters++;
            }
        }

        let [x, y] = [getXcoord("Palito" + stick), getYcoord("Palito" + stick)];

        if (getDistance({x, y}, game.initialPositions[`Palito${stick}`]) > 1) continue;

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