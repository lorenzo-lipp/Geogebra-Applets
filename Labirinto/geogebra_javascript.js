let g = ggbApplet;
let board = [0, 0, 0,
			 0, 0, 0,
			 0, 0, 0]

g.setLineOpacity = (obj, opacity) => {
	let xml = g.getXML();
	let pos = xml.indexOf('label="' + obj + '"');
	let piece = xml.slice(pos);
	let objOpacity = piece.match(/opacity=\"\d*\"/, pos);
	let objEnd = piece.match(/<\/element>/, pos);

	if (opacity < 0 || opacity > 254 || isNaN(opacity)) return false;
	if (pos < 0 || !objOpacity || (objEnd && objEnd.index < objOpacity.index)) return false;

	let lastPiece = xml.slice(pos + objOpacity.index + objOpacity[0].length);

	g.setXML(xml.slice(0, pos + objOpacity.index) + `opacity="${254 - opacity}"` + lastPiece);
	return true;
}

const colors = {
	gray: [230, 230, 230],
	red: [245, 47, 48],
	green: [34, 144, 34],
	blue: [0, 204, 255],
	brown: [85, 34, 0],
	purple: [207, 85, 197],
	pink: [200, 55, 113],
	darkPurple: [113, 55, 200],
	darkGreen: [0, 128, 102],
	darkGray: [208, 208, 208],
	aquaGreen: [0, 212, 170]
}

const constructors = {
	triangle: [
		{
			value: 2, // OK
			points: {
				A: [0.1, 0.15],
				B: [0.9, 0.15],
				C: [0.5, 0.85],
				D: [0.5, 0.15]
			},
			polygon: [
				["A", "D", "C"],
				["B", "C", "D"]
			]
		},
		{
			value: 3,
			points: {
				A: [0.5, 0.38],
				B: [0.7, 0.5],
				C: [0.5, 0.85],
				D: [0.3, 0.5],
				E: [0.1, 0.15],
				F: [0.5, 0.15],
				G: [0.9, 0.15]
			},
			polygon: [
				["A", "D", "E", "F"],
				["A", "F", "G", "B"],
				["A", "B", "C", "D"]
			]
		},
		{
			value: 4,
			points: {
				A: [0.1, 0.15],
				B: [0.9, 0.15],
				C: [0.5, 0.85],
				D: [0.5, 0.15],
				E: [0.7, 0.5],
				F: [0.3, 0.5]
			},
			polygon: [
				["A", "D", "F"],
				["E", "D", "B"],
				["C", "F", "E"],
				["F", "E", "D"]
			]
		},
		{
			value: 9, // OK
			points: {
				A: [0.1, 0.15],
				B: [0.9, 0.15],
				C: [0.5, 0.85],
				D: [0.1 + 0.8 / 3, 0.15],
				E: [0.23, 0.15 + 0.7 / 3],
				F: [0.1 + 0.8 / 3, 0.15 + 1.4 / 3],
				G: [0.5, 0.15 + 0.7 / 3],
				H: [0.1 + 1.6 / 3, 0.15 + 1.4 / 3],
				I: [0.77, 0.15 + 0.7 / 3],
				J: [0.1 + 1.6 / 3, 0.15]
			},
			polygon: [
				["A", "D", "E"],
				["D", "G", "E"],
				["D", "G", "J"],
				["I", "G", "J"],
				["I", "B", "J"],
				["I", "H", "G"],
				["F", "H", "G"],
				["E", "F", "G"],
				["F", "C", "H"]
			]
		}
	],
	square: [
		{
			value: 2, // OK
			points: {
				A: [0.15, 0.15],
				B: [0.85, 0.15],
				C: [0.85, 0.85],
				D: [0.15, 0.85],
				E: [0.5, 0.15],
				F: [0.5, 0.85]
			},
			polygon: [
				["A", "E", "F", "D"],
				["E", "B", "C", "F"]
			]
		},
		{
			value: 4, // OK
			points: {
				A: [0.15, 0.15],
				B: [0.85, 0.15],
				C: [0.85, 0.85],
				D: [0.15, 0.85],
				E: [0.5, 0.15],
				F: [0.85, 0.5],
				G: [0.5, 0.85],
				H: [0.15, 0.5],
				I: [0.5, 0.5]

			},
			polygon: [
				["A", "E", "I", "H"],
				["E", "B", "F", "I"],
				["F", "C", "G", "I"],
				["G", "D", "H", "I"]
			]
		},
		{
			value: 16, // OK
			points: {
				A: [0.15, 0.15],
				B: [0.325, 0.15],
				C: [0.5, 0.15],
				D: [0.675, 0.15],
				E: [0.85, 0.15],
				F: [0.15, 0.325],
				G: [0.325, 0.325],
				H: [0.5, 0.325],
				I: [0.675, 0.325],
				J: [0.85, 0.325],
				K: [0.15, 0.5],
				L: [0.325, 0.5],
				M: [0.5, 0.5],
				N: [0.675, 0.5],
				O: [0.85, 0.5],
				P: [0.15, 0.675],
				Q: [0.325, 0.675],
				R: [0.5, 0.675],
				S: [0.675, 0.675],
				T: [0.85, 0.675],
				U: [0.15, 0.85],
				V: [0.325, 0.85],
				X: [0.5, 0.85],
				Y: [0.675, 0.85],
				Z: [0.85, 0.85],
			},
			polygon: [
				["A", "B", "G", "F"],				
				["C", "D", "I", "H"],
				["G", "H", "M", "L"],				
				["I", "J", "O", "N"],
				["K", "L", "Q", "P"],				
				["M", "N", "S", "R"],
				["Q", "R", "X", "V"],
				["S", "T", "Z", "Y"],
				["B", "C", "H", "G"],
				["D", "E", "J", "I"],
				["F", "G", "L", "K"],
				["H", "I", "N", "M"],
				["L", "M", "R", "Q"],
				["N", "O", "T", "S"],
				["P", "Q", "V", "U"],
				["R", "S", "Y", "X"],
			]
		}
	],
	pentagon: [
		{
			value: 5, // OK
			points: {
				A: [0.5, 0.47],
				B: [0.27, 0.15],
				C: [0.73, 0.15],
				D: [0.87, 0.59],
				E: [0.5, 0.86],
				F: [0.13, 0.59]
      	},
			polygon: [
				["A", "B", "C"],
				["A", "C", "D"],
				["A", "D", "E"],
				["A", "E", "F"],
				["A", "F", "B"]
			]
		},
		{
			value: 10, // OK
			points: {
				A: [0.5, 0.47],
				B: [0.27, 0.15],
				C: [0.5, 0.15],
				D: [0.73, 0.15],
				E: [0.8, 0.37],
				F: [0.87, 0.59],
				G: [0.685, 0.725],
				H: [0.5, 0.86],
				I: [0.315, 0.725],
				J: [0.13, 0.59],
				K: [0.2, 0.37]
			},
			polygon: [
				["A", "B", "C"],
				["A", "C", "D"],
				["A", "D", "E"],
				["A", "E", "F"],
				["A", "F", "G"],
				["A", "G", "H"],
				["A", "H", "I"],
				["A", "I", "J"],
				["A", "J", "K"],
				["A", "K", "B"]
			]
		}
	],
	hexagon: [
		{
			value: 3,
			points: {
				A: [0.5, 0.5],
				B: [0.8, 0.67],
				C: [0.7, 0.84],
				D: [0.3, 0.84],
				E: [0.2, 0.67],
				F: [0.1, 0.5],
				G: [0.3, 0.15],
				H: [0.5, 0.15],
				I: [0.7, 0.15],
				J: [0.9, 0.5]
			},
			polygon: [
				["A", "E", "F", "G", "H"],
				["A", "H", "I", "J", "B"],
				["A", "B", "C", "D", "E"]
			]
		},
		{
			value: 6, 
			points: {
				A: [0.5, 0.5],
				B: [0.9, 0.5],
				C: [0.7, 0.84],
				D: [0.3, 0.84],
				E: [0.1, 0.5],
				F: [0.3, 0.15],
				G: [0.7, 0.15]
			},
			polygon: [
				["A", "D", "E"], 
				["A", "E", "F"], 
				["A", "F", "G"], 
				["A", "G", "B"], 
				["A", "B", "C"], 
				["A", "C", "D"], 
			]
		},
		{
			value: 12,
			points: {
				A: [0.5, 0.5],
				B: [0.9, 0.5],
				C: [0.8, 0.67],
				D: [0.7, 0.84],
				E: [0.5, 0.84],
				F: [0.3, 0.84],
				G: [0.2, 0.67],
				H: [0.1, 0.5],
				I: [0.2, 0.32],
				J: [0.3, 0.15],
				K: [0.5, 0.15],
				L: [0.7, 0.15],
				M: [0.8, 0.32]
			},
			polygon: [
				["A", "B", "C"], 
				["A", "C", "D"], 
				["A", "D", "E"], 
				["A", "E", "F"], 
				["A", "F", "G"], 
				["A", "G", "H"], 
				["A", "H", "I"], 
				["A", "I", "J"], 
				["A", "J", "K"], 
				["A", "K", "L"], 
				["A", "L", "M"], 
				["A", "M", "B"],
			]
		}
	],
	rectangle: [
		{
			value: 2, // OK
			points: {
				A: [0.3, 0.1],
				B: [0.6, 0.4],
				C: [0.9, 0.7],
				D: [0.7, 0.9],
				E: [0.4, 0.6],
				F: [0.1, 0.3],
			},
			polygon: [
				["A", "B", "E", "F"],
				["B", "C", "D", "E"]
			]
		},
		{
			value: 4, // OK
			points: {
				A: [0.3, 0.1],
				B: [0.6, 0.4],
				C: [0.9, 0.7],
				D: [0.8, 0.8],
				E: [0.7, 0.9],
				F: [0.4, 0.6],
				G: [0.1, 0.3],
				H: [0.2, 0.2],
				I: [0.5, 0.5]
			},
			polygon: [
				["A", "B", "I", "H"],
				["B", "C", "D", "I"],
				["D", "E", "F", "I"],
				["F", "G", "H", "I"]
			]
		},
		{
			value: 8, // OK
			points: {
				A: [0.3, 0.1],
				B: [0.45, 0.25],
				C: [0.6, 0.4],
				D: [0.75, 0.55],
				E: [0.9, 0.7],
				F: [0.8, 0.8],
				G: [0.7, 0.9],
				H: [0.55, 0.75],
				I: [0.4, 0.6],
				J: [0.25, 0.45],
				K: [0.1, 0.3],
				L: [0.2, 0.2],
				M: [0.35, 0.35],
				N: [0.5, 0.5],
				O: [0.65, 0.65]
			},
			polygon: [
				["A", "B", "M", "L"],
				["B", "C", "N", "M"],
				["C", "D", "O", "N"],
				["D", "E", "F", "O"],
				["F", "G", "H", "O"],
				["H", "I", "N", "O"],
				["I", "J", "M", "N"],
				["J", "K", "L", "M"]
			]
		}
	],
	flippedRectangle: [
		{
			value: 1,
			points: {
				A: [0.7, 0.1],
				B: [0.1, 0.7],
				C: [0.3, 0.9],
				D: [0.9, 0.3]
			},
			polygon: [
				["A", "B", "C", "D"]
			]
		},
		{
			value: 2,
			points: {
				A: [0.7, 0.1],
				B: [0.4, 0.4],
				C: [0.1, 0.7],
				D: [0.3, 0.9],
				E: [0.6, 0.6],
				F: [0.9, 0.3],
			},
			polygon: [
				["A", "B", "E", "F"],
				["B", "C", "D", "E"]
			]
		},
		{
			value: 4,
			points: {
				A: [0.7, 0.1],
				B: [0.4, 0.4],
				C: [0.1, 0.7],
				D: [0.2, 0.8],
				E: [0.3, 0.9],
				F: [0.6, 0.6],
				G: [0.9, 0.3],
				H: [0.8, 0.2],
				I: [0.5, 0.5]
			},
			polygon: [
				["A", "B", "I", "H"],
				["B", "C", "D", "I"],
				["D", "E", "F", "I"],
				["F", "G", "H", "I"]
			]
		},
		{
			value: 8,
			points: {
				A: [0.7, 0.1],
				B: [0.55, 0.25],
				C: [0.4, 0.4],
				D: [0.25, 0.55],
				E: [0.1, 0.7],
				F: [0.2, 0.8],
				G: [0.3, 0.9],
				H: [0.45, 0.75],
				I: [0.6, 0.6],
				J: [0.75, 0.45],
				K: [0.9, 0.3],
				L: [0.8, 0.2],
				M: [0.65, 0.35],
				N: [0.5, 0.5],
				O: [0.35, 0.65]
			},
			polygon: [
				["A", "B", "M", "L"],
				["B", "C", "N", "M"],
				["C", "D", "O", "N"],
				["D", "E", "F", "O"],
				["F", "G", "H", "O"],
				["H", "I", "N", "O"],
				["I", "J", "M", "N"],
				["J", "K", "L", "M"]
			]
		}
	]
}

function ggbOnInit() {
	board = [0, 0, 1,
			 1, 1, 1,
			 1, 0, 0];
	firstGame();
}

function click(n) {
	g.setValue("ok", undefined);

	if (g.getColor(n) == "#FFFFFF") {
		g.setColor(n, 255, 255, 0);
	} else {
		g.setColor(n, 255, 255, 255);
	}
}

function restart() {
	g.setValue("ok", undefined);

	for (let i = 0; i < 9; i++) {
		g.setColor("Q" + i, 255, 255, 255);
	}
}

function check() {
	let wrong = false;

	for (let i in board) {
		if (!board[i] && g.getColor("Q" + i) != "#FFFFFF") {
			wrong = true;
		} else if (board[i] && g.getColor("Q" + i) != "#FFFF00") {
			wrong = true;
		}
	}

	return wrong ? g.setValue("ok", 0) : g.setValue("ok", 1);
}

function clear() {
	let deleteList = g.getAllObjectNames();

    for (i = 45; i < deleteList.length; i++) {
        g.deleteObject(deleteList[i]);
    }
}

function firstGame() {
	clear();
	polygon([0, 2], "triangle", 9, 6, "blue");
	circle([1, 2], 4, 3, "darkGreen");
	heart([2, 2], 1);
	polygon([0, 1], "rectangle", 8, 4, "brown");
	polygon([1, 1], "hexagon", 6, 3, "pink");
	polygon([2, 1], "square", 16, 8, "purple");
	circle([0, 0], 8, 4, "darkPurple");
	polygon([1, 0], "pentagon", 5, 2, "aquaGreen");
	polygon([2, 0], "flippedRectangle", 8, 5, "brown");
}

function newGame() {
	newBoard();
	restart();

	for (let i = 0; i < 9; i++) {
		let rand = Math.floor(Math.random() * 8);
		let offsetX = i % 3;
		let offsetY = 2 - Math.floor(i / 3);
		let colorOptions = ['red', 'green', 'blue', 'brown', 'purple', 'pink', 'darkPurple', 'darkGreen', 'aquaGreen'];
		let color = Math.floor(Math.random() * 9);
		let coloredDivisions;

		switch(rand) {
			case 0:
				let triangles = getShapes("triangle", board[i]);
				let randTriangles = Math.floor(Math.random() * triangles.length);
				coloredDivisions = getDivisions(triangles, randTriangles, board[i]);

				polygon([offsetX, offsetY], "triangle", triangles[randTriangles].value, coloredDivisions, colorOptions[color]);
				break;
			case 1: 
				let squares = getShapes("square", board[i]);
				let randSquares = Math.floor(Math.random() * squares.length);
				coloredDivisions = getDivisions(squares, randSquares, board[i]);

				polygon([offsetX, offsetY], "square", squares[randSquares].value, coloredDivisions, colorOptions[color]);
				break;
			case 2:
				let pentagons = getShapes("pentagon", board[i]);
				let randPentagons = Math.floor(Math.random() * pentagons.length);
				coloredDivisions = getDivisions(pentagons, randPentagons, board[i]);

				polygon([offsetX, offsetY], "pentagon", pentagons[randPentagons].value, coloredDivisions, colorOptions[color]);
				break;
			case 3:
				let hexagons = getShapes("hexagon", board[i]);
				let randHexagons = Math.floor(Math.random() * hexagons.length);
				coloredDivisions = getDivisions(hexagons, randHexagons, board[i]);

				polygon([offsetX, offsetY], "hexagon", hexagons[randHexagons].value, coloredDivisions, colorOptions[color]);
				break;
			case 4:
				let rectangles = getShapes("rectangle", board[i]);
				let randRectangles = Math.floor(Math.random() * rectangles.length);
				coloredDivisions = getDivisions(rectangles, randRectangles, board[i]);

				polygon([offsetX, offsetY], "rectangle", rectangles[randRectangles].value, coloredDivisions, colorOptions[color]);
				break;
			case 5:
				let flippeds = getShapes("flippedRectangle", board[i]);
				let randFlippeds = Math.floor(Math.random() * flippeds.length);
				coloredDivisions = getDivisions(flippeds, randFlippeds, board[i]);

				polygon([offsetX, offsetY], "flippedRectangle", flippeds[randFlippeds].value, coloredDivisions, colorOptions[color]);
				break;
			case 6:
				coloredDivisions = board[i] ? 1 : 2;

				heart([offsetX, offsetY], coloredDivisions);
				break;
			case 7:
				let divisions = board[i] ? Math.floor(Math.random() * 4 + 2) * 2 : Math.floor(Math.random() * 9 + 2);
				let range = getRange(divisions)
				let randCircle = range[Math.floor(Math.random() * range.length)]
				coloredDivisions = board[i] ? divisions / 2 : randCircle;
				//console.log("Circle: ", [offsetX, offsetY], divisions, coloredDivisions, colorOptions[color])
				circle([offsetX, offsetY], divisions, coloredDivisions, colorOptions[color]);
				break;
		}
	}
}

function newBoard() {
	board = [0, 0, 0,
			 0, 0, 0,
		     0, 0, 0];
	let position = Math.floor(Math.random() * 3) + 6;
	board[position] = 1;

	while (position > 2) {
		if (position >= 6) {
			position -= 3;
		} else {
			let rand;
			if (board[3] && !board[5]) {
				rand = Math.floor(Math.random() * 2);
			} else if (board[5] && !board[4]) {
				rand = Math.floor(Math.random() * 2) + 1;
			} else {
				rand = 1;
			}
			switch(rand) {
				case 0:
					position += 1;
					break;
				case 1:
					position -= 3;
					break;
				case 2:
					position -= 1;
					break;
			}
		}

		board[position] = 1;
	}
}

function getRange(n) {
	let arr = [];

	for (let i = n; i > 0; i--) {
		if (i != n / 2) arr.push(i);
	}

	return arr;
}

function getDivisions(arr, rand, isEven) {
	let coloredDivisions;

	if (isEven) {
		coloredDivisions = arr[rand].value / 2;
	} else {
		let possibilities = [];
		let value = arr[rand].value;

		while (value > 0) {
			if (value / arr[rand].value != 0.5) possibilities.push(value);
			value--;
		}

		coloredDivisions = possibilities[Math.floor(Math.random() * possibilities.length)];
	}

	return coloredDivisions
}

function getShapes(shape, isEven) {
	let arr;

	if (isEven) {
		arr = constructors[shape].filter(v => v.value % 2 == 0);
	} else {
		arr = constructors[shape];
	}

	return arr;
}

function polygon(offset, shape, divisions, coloredDivisions, color) {
	let figure = constructors[shape].find(v => v.value == divisions);
	//console.log(offset, divisions, coloredDivisions, color);

	for (let i in figure.polygon) {
		let polygon = [];

		for (let j in figure.polygon[i]) {
			let constructor = [];
			constructor[0] = figure.points[figure.polygon[i][j]][0] + offset[0];
			constructor[1] = figure.points[figure.polygon[i][j]][1] + offset[1];
			polygon.push(constructor.join(','));
		}

		polygon[0] = "(" + polygon[0];
		polygon[polygon.length - 1] += ")";

		let createPolygon = g.evalCommandGetLabels(`{Polygon(${polygon.join('),(')})}`);
		
		g.setFilling(createPolygon, 1);
		g.setLineThickness(createPolygon, 2);
		g.setFixed(createPolygon, 1, 0);

		if (coloredDivisions > 0) {
			g.setColor(createPolygon, ...colors[color]);
			coloredDivisions--;
			g.setLayer(createPolygon, 2);
		} else {
			g.setColor(createPolygon, ...colors.darkGray);
			g.setLayer(createPolygon, 1);
		}
	}
}

function heart(offset, coloredDivisions) {
	let parts = [];
	
	parts.push(g.evalCommandGetLabels(`{Circle((${0.65 + offset[0]}, ${0.6 + offset[1]}), (${0.8 + offset[0]}, ${0.45 + offset[1]}))}`));
	parts.push(g.evalCommandGetLabels(`{Circle((${0.35 + offset[0]}, ${0.6 + offset[1]}), (${0.2 + offset[0]}, ${0.45 + offset[1]}))}`));
	parts.push(g.evalCommandGetLabels(`{Polygon((${0.5 + offset[0]}, ${0.15 + offset[1]}), (${0.8 + offset[0]}, ${0.45 + offset[1]}), (${0.5 + offset[0]}, ${0.75 + offset[1]}))}`));
	parts.push(g.evalCommandGetLabels(`{Polygon((${0.5 + offset[0]}, ${0.15 + offset[1]}), (${0.2 + offset[0]}, ${0.45 + offset[1]}), (${0.5 + offset[0]}, ${0.75 + offset[1]}))}`));

	for (let i = 0; i < 4; i++) {
		i % 2 == 0 || coloredDivisions == 2 ? g.setColor(parts[i], ...colors.red) : g.setColor(parts[i], ...colors.gray);
		g.setFilling(parts[i], 1);
		g.setFixed(parts[i], 1, 0);
	}
}

function circle(offset, divisions, coloredDivisions, color) {
	let firstPoint = [0.8 + offset[0], 0.5 + offset[1]]
	let lastPoint = [...firstPoint];
	let coloredCopy = coloredDivisions;
	let end;

	for (let i = divisions; i > 0; i--) {
		let parts = [];
		let sectionColor;
		let x = g.getValue(`x(Rotate((${lastPoint[0]}, ${lastPoint[1]}), ${360 / divisions}º ,(${0.5 + offset[0]}, ${0.5 + offset[1]})))`);
		let y = g.getValue(`y(Rotate((${lastPoint[0]}, ${lastPoint[1]}), ${360 / divisions}º ,(${0.5 + offset[0]}, ${0.5 + offset[1]})))`);

		if (coloredDivisions > 0) {
			sectionColor = colors[color];
			parts.push(g.evalCommandGetLabels(`{CircularSector((${0.5 + offset[0]}, ${0.5 + offset[1]}), (${lastPoint[0]}, ${lastPoint[1]}), (${x}, ${y}))}`));
			parts.push(g.evalCommandGetLabels(`{CircularSector((${0.5 + offset[0]}, ${0.5 + offset[1]}), (${lastPoint[0]}, ${lastPoint[1]}), (${x}, ${y}))}`));
			coloredDivisions--;
		} else {
			if (end === undefined) {
				let lastX = g.getValue(`x(Rotate((${firstPoint[0] + 0.05}, ${firstPoint[1]}), ${(360 / divisions) * coloredCopy}º ,(${0.5 + offset[0]}, ${0.5 + offset[1]})))`);
				let lastY = g.getValue(`y(Rotate((${firstPoint[0] + 0.05}, ${firstPoint[1]}), ${(360 / divisions) * coloredCopy}º ,(${0.5 + offset[0]}, ${0.5 + offset[1]})))`);
				let grayCircle = g.evalCommandGetLabels(
					`{CircularSector((${0.5 + offset[0]}, ${0.5 + offset[1]}), (${lastX}, ${lastY}), (${firstPoint[0] + 0.05}, ${firstPoint[1]}))}`
				);

				end = 1;
				g.setColor(grayCircle, ...colors.gray);
				g.setFixed(grayCircle, 1, 0);
				g.setFilling(grayCircle, 1);
				g.setLayer(grayCircle, 5);
			}
		}

		for (let i = 0; i < parts.length; i++) {
			i == 0 ? g.setFilling(parts[i], 1) : g.setFilling(parts[i], 0);
			i == 0 ? g.setColor(parts[i], ...sectionColor) : g.setColor(parts[i], ...colors.gray);
			i == 0 ? g.setLayer(parts[i], 2) : g.setLayer(parts[i], 3)
			if (i != 0) g.setLineThickness(parts[i], 4);
			g.setFixed(parts[i], 1, 0);
		}

		lastPoint[0] = x;
		lastPoint[1] = y;
	}

	let circles = [];

	circles.push(g.evalCommandGetLabels(`Circle((${0.5 + offset[0]}, ${0.5 + offset[1]}), 0.31)`));
	circles.push(g.evalCommandGetLabels(`Circle((${0.5 + offset[0]}, ${0.5 + offset[1]}), 0.335)`));
	
	for (let i = 0; i < 2; i++) {
		g.setLineOpacity(circles[i], 0);
		i == 0 ? g.setColor(circles[i], 244, 233, 163) : g.setColor(circles[i], 34, 144, 34);
		i == 0 ? g.setLineThickness(circles[i], 13) : g.setLineThickness(circles[i], 8);
		g.setFixed(circles[i], 1, 0);
		g.setLayer(circles[i], 4);
	}
}

