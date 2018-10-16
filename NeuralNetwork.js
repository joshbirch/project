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

    this.biases_h = new Matrix(hiddenNodes,1);
    this.biases_o = new Matrix(outputNodes,1);
    this.biases_h.randomise()
    this.biases_o.randomise()

  }


  feedForward(inputArray) {

    let input =  Matrix.fromArray(inputArray);


    this.hidden = Matrix.multiply(this.weights_ih, input);
    this.hidden.add(this.biases_h);
    this.hidden.map(this.activation);

    let output = Matrix.multiply(this.weights_ho, this.hidden);
    output.add(this.biases_o);
    output.map(this.activation)

    output.print()
    return output.toArray()
  }


}