class FileManager {


    constructor(path, data) {
        this.path = path;
        if (data) {
            this.data = data;
            this.readOnly = false;
        } else {
            this.readOnly = true;
        }
    }
    networkFormat() {
        console.log('network mode')
    }

    formatOutput() {
        if (this.readOnly) {
            console.error('No data to write to file')
        }
        switch (this.type) {
            case "NeuralNetwork":
                writeToFile(this.networkFormat());
            case "String":
                writeToFile(this.input);
            case "Number":
                writeToFile(this.input);

        }
    }


}