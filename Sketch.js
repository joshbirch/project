let inputGraphic, nn, input28x28, userPixels, labels, arr, csvData;

const fileName = 'emnist/emnist-letters-train.csv';

const show28x28Image = false;

let doTraining = false;

let csvLoaded;
let inputPixels = [];



//Constants related to the canvases
const canvasBackgroundBrightness = 221;
const canvasBrushSize = 10;





function setup() {

	if (doTraining) {
		csvLoaded = false;
	} else {
		csvLoaded = true;
	}


	nn = new NeuralNetwork(784, 60, 27)

	//Setup the main canvas 
	createCanvas(500, 412);

	background(canvasBackgroundBrightness);
	noStroke();

	//Setup the canvas the user draws on
	inputGraphic = createGraphics(28 * 4, 28 * 4);
	inputGraphic.background(0);
	inputGraphic.fill(255);
	inputGraphic.noStroke();
	textSize(16);

	input28x28 = createImage(28, 28) //, RGB);
	parseCSV(fileName, loaded)
}

//Callback for loading csv file
function loaded(data) {
	csvData = data
	csvLoaded = true
	console.log(csvData)
	csvData.labels = Array(csvData.data.length)
	for (let i = 0; i < csvData.data.length; i++) {
		csvData.labels[i] = csvData.data[i].shift();
	}



	// Sets pixels between 0 and 1 
	csvData.data.normalise()
	// Sets correct orientation of datasets pixels 
	csvData.data = transposeDataset(csvData.data)
	if (doTraining) {
		trainDataSet()
	}

}




function trainOne(i) {
	let label = Array(27).fill(0)
	let index = csvData.labels[i]
	label[index] = 1;
	console.log(label)
	getPic(i)

	nn.train(csvData.data[i], label);

}

function trainDataSet() {
	console.log('Training started')
	for (let i = 0; i < csvData.data.length - 1;i++){
		let label = Array(27).fill(0)
		let index = csvData.labels[i]
		label[index] = 1;
		nn.train(csvData.data[i], label);
	

		let percentComplete = (i / (csvData.data.length - 1) * 100)
		console.log(`${Math.round(percentComplete)}%`)
	}
	console.log(`Trained set of ${csvData.data.length-1}`);
}

function imgTo784(img) {
	let imgPixelData = getPixelData(img);
	let newArray = []
	for (let i = 0; i < imgPixelData.length; i += 4) {
		newArray.push(imgPixelData[i])
	}
	return newArray;
}

function guess() {
	return nn.getHighest(nn.predict(imgTo784(input28x28)))
}

function drawPic(pixels, xOff = 300, yOff = 0, w = 1) {
	var dimension = 28;
	for (let i = 0; i < pixels.length; i++) {
		//Stored image pixel data is normalised but the max brightness is 255, "* 255" will map correctly
		let brightness = pixels[i] * 255;
		fill(brightness)

		let x = i % dimension;
		let y = Math.floor(i / dimension);
		rect(300 + x, 50 + y, 1, 1)
	}
}


function getPic(index) {
	drawPic(csvData.data[index]);
	let label = csvData.labels[index]
	label = label * 1
	console.log(`Label: ${label}`)
	console.log(`Translation: ${indexToLetter(label)}`)
}

function keyPressed() {

	if (keyCode === LEFT_ARROW) {
		clearInput(inputGraphic)
	}
}



function draw() {
	background(canvasBackgroundBrightness)
	for (let i = 0; i < 1000; i++) {
		if (mouseIsPressed) {
			inputGraphic.ellipse(mouseX, mouseY, canvasBrushSize)
		}
	}

	image(inputGraphic, 0, 0)
	var img = inputGraphic.get();
	input28x28.copy(img, 0, 0, inputGraphic.width, inputGraphic.height, 0, 0, input28x28.width, input28x28.height);

	if (show28x28Image) {
		image(input28x28, 112, 0);
	}

	if (csvLoaded) {
		let prediction = guess();
		text(`Prediction:${indexToLetter(prediction.index)}`, 120, 50)
		text(`Certainty:${Math.round(prediction.value * 100)}`, 120, 70)
	}
}