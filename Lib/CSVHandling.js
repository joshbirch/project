let config = {
    delimiter: ",", // auto-detect
    newline: "", // auto-detect
    quoteChar: '"',
    escapeChar: '"',
    header: false,
    trimHeaders: false,
    dynamicTyping: false,
    preview: 0,
    encoding: "",
    worker: false,
    comments: false,
    step: undefined,
    complete: function (result) {
        try {
            console.log(result)
        } catch (err) {
            console.error(err);
            console.error('Data variable must be defined unless alternate callback function is defined')
        }
    },
    error: function (err) {
        console.error(err)
    },
    download: true,
    skipEmptyLines: false,
    chunk: undefined,
    fastMode: undefined,
    beforeFirstChunk: undefined,
    withCredentials: undefined,
    transform: undefined,
}

function parseCSV(data, callback) {
    this.config = config
    if (callback) {
        this.config.complete = callback;
    }
    console.log(`Parsing ${data}`)
    Papa.parse(data, this.config)
}



function transpose(d) {
    let data = d.slice()
    let returned = Array(28).fill().map(() => Array(28).fill(0));
    for (let i = 0; i < 28; i++) {
        for (let j = 0; j < 28; j++) {
            returned[j][i] = data[(j * 28) + i]
        }
    }
    data = returned.slice()
    // console.log(data)
    for (let i = 0; i < 28; i++) {
        for (let j = 0; j < 28; j++) {
            returned[(j * 28) + i] = data[i][j]
        }
    }
    // console.log(returned)
    return returned;
}


function transposeDataset(input) {

    for (let index = 0; index < input.length; index++) {
        input[index] = transpose(input[index])
    }
    return input

}

Array.prototype.normalise = function () {
    for (let i = 0; i < this.length; i++) {
        this[i] = this[i].map((x) => (x / 255))
    }
}

