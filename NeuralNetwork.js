function sigmoid(x) {
  return (1 / (1 + Math.exp(-x)))
}


function dSigmoid(x) {
  return (x * (1 - x));
}

class NeuralNetwork {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.input = new Matrix(inputNodes, 1);
    this.hidden = new Matrix(hiddenNodes, 1);
    this.output = new Matrix(outputNodes, 1);
    this.activation = sigmoid;
    this.derivative = dSigmoid;
    this.lr = 0.1;

    this.weights_ih = new Matrix(hiddenNodes, inputNodes);
    this.weights_ho = new Matrix(outputNodes, hiddenNodes);

    this.weights_ih.randomise();
    this.weights_ho.randomise();

    this.bias_h = new Matrix(hiddenNodes, 1);
    this.bias_o = new Matrix(outputNodes, 1);
    this.bias_h.randomise();
    this.bias_o.randomise();

  }


  predict(input_array) {

    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    hidden.map(sigmoid);

    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);
    return output.toArray();
  }



  train(input_array, target_array) {

    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);

    hidden.add(this.bias_h);
    // activation function!
    hidden.map(this.activation);

    // Generating the output's output!
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(this.activation);

    // Convert array to matrix object
    let targets = Matrix.fromArray(target_array);

    // Calculate the error
    // ERROR = TARGETS - OUTPUTS
    let output_errors = Matrix.subtract(targets, outputs);

    // let gradient = outputs * (1 - outputs);
    // Calculate gradient
    // let gradients = Matrix.map(outputs, this.derivative);

    let gradients = Matrix.copy(outputs)
    gradients.map(dSigmoid)

    gradients.multiply(output_errors);
    gradients.multiply(this.lr);


    // Calculate deltas
    let hidden_T = Matrix.transpose(hidden);
    let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);




    // Adjust the weights by deltas
    this.weights_ho.add(weight_ho_deltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.bias_o.add(gradients);

    // Calculate the hidden layer errors
    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);

    // Calculate hidden gradient
    // let hidden_gradient = Matrix.map(hidde237n, dSigmoid);
    let hidden_gradient = Matrix.copy(hidden)
    hidden_gradient.map(dSigmoid)
    // console.log(this.derivative)
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.lr);
    // Calcuate input->hidden deltas
    let inputs_T = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);
    this.weights_ih.add(weight_ih_deltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.bias_h.add(hidden_gradient);



  }




  getHighest(arr) {
    let highest = {
      value: -1,
      index: -1
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > highest.value) {
        highest.value = arr[i];
        highest.index = i;
      }

    }
    return highest;
  }


}
  


