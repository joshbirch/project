class NeuralNetwork {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.input = array(764).fill(0);
    this.hidden = new Matrix(hiddenNodes, 1);
    this.output = new Matrix(outputNodes, 1);

    this.weights_ih = new Matrix(hiddenNodes, inputNodes);
    this.weights_ih.randomise();
    this.weights_ho = new Matrix(outputNodes, hiddenNodes);
    this.weights_ho.randomise();

  }


}