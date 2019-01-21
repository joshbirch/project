function getPixelData(graphic, normalised) {
	const normalScale = 12
	let arr = []

	graphic.loadPixels();

	for (let i = 0; i < graphic.pixels.length; i += 1) {
		arr.push(graphic.pixels[i])
	}
	if (normalised) {
		arr = arr.map((x) => (x / 255));
	}

	graphic.updatePixels();
	return arr;
}


function clearInput(graphic) {
	graphic.background(0)
}
