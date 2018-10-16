function sigmoid(x) {
  return (1 / (1 + Math.exp(-x)))
}


class NeuralNetwork {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.input = new Matrix(inputNodes, 1);
    this.hidden = new Matrix(hiddenNodes, 1);
    this.output = new Matrix(outputNodes, 1);
    this.activation = sigmoid;

    this.weights_ih = new Matrix(hiddenNodes, inputNodes);
    this.weights_ih.randomise();
    this.weights_ho = new Matrix(outputNodes, hiddenNodes);
    this.weights_ho.randomise();

  }

  setInput(x) {
    for (let i = 0; i < x.length; i++) {
      this.input.data[i][1] = x[i]
    }
  }


  train(data, labels) {





  }

  guess() {
    this.hidden = Matrix.multiply(this.weights_ih, this.input);
    this.hidden.map(this.activation);

    this.output = Matrix.multiply(this.weights_ho, this.hidden);
    this.output.map(this.activation)

    console.log(this.output)
  }


}