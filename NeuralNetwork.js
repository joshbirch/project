function sigmoid(x) {
  return (1 / (1 + Math.exp(-x)))
}


function dSigmoid(x) {
  return x * (1 - x);
}

class NeuralNetwork {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.input = new Matrix(inputNodes, 1);
    this.hidden = new Matrix(hiddenNodes, 1);
    this.output = new Matrix(outputNodes, 1);
    this.activation = sigmoid;
    this.derivative = dSigmoid;

    this.weights_ih = new Matrix(hiddenNodes, inputNodes);
    this.weights_ho = new Matrix(outputNodes, hiddenNodes);

    this.weights_ih.randomise();
    this.weights_ho.randomise();

    this.biases_h = new Matrix(hiddenNodes, 1);
    this.biases_o = new Matrix(outputNodes, 1);
    this.biases_h.randomise()
    this.biases_o.randomise()


  }


  feedForward(inputArray, matrixForm) {

    let input = Matrix.fromArray(inputArray);


    this.hidden = Matrix.dot(this.weights_ih, input);
    this.hidden.add(this.biases_h);
    this.hidden.map(this.activation);

    let output = Matrix.dot(this.weights_ho, this.hidden);
    output.add(this.biases_o)
    output.map(this.activation)
    // output.print();
    if (matrixForm) {
      return output;
    } else {
      return output.toArray()
    }
  }



  train(input_array, target_array) {
    let input = Matrix.fromArray(input_array);
    let target = Matrix.fromArray(target_array);

    let hiddenInput = Matrix.dot(this.weights_ih, input);
    hiddenInput.add(this.biases_h);
    this.hidden.map(this.activation);





    let outputError = Matrix.subtract(target, output)

    let t_weights_ho = Matrix.transpose(this.weights_ho)




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