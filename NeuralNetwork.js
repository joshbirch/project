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
    
    this.weights_ih = new Matrix(hiddenNodes, inputNodes);
    this.weights_ho = new Matrix(outputNodes, hiddenNodes);
    
    this.weights_ih.randomise();
    this.weights_ho.randomise();

   


    
    
    this.biases_h = new Matrix(hiddenNodes, 1);
    this.biases_o = new Matrix(outputNodes, 1);
    this.biases_h.randomise()
    this.biases_o.randomise()
    
    this.lr = 0.1;
    this.activation = sigmoid;
    this.derivative = dSigmoid
    
    
  }
  
  train(inputs_array, targets_array) {
    
    // Turn input and target arrays into matrices
    var inputs = Matrix.fromArray(inputs_array);
    var targets = Matrix.fromArray(targets_array);
    this.weights_ho.print();
    console.log(this.weights_ho.data)
    // The input to the hidden layer is the weights (wih) multiplied by inputs
    var hidden_inputs = Matrix.dot(this.weights_ih, inputs);
    // The outputs of the hidden layer pass through sigmoid activation function
    var hidden_outputs = Matrix.map(hidden_inputs, this.activation);
    
    // The input to the output layer is the weights (who) multiplied by hidden layer
    var output_inputs = Matrix.dot(this.weights_ho, hidden_outputs);
    
    // The output of the network passes through sigmoid activation function
    var outputs = Matrix.map(output_inputs, this.activation);
    
    // Error is TARGET - OUTPUT
    var output_errors = Matrix.subtract(targets, outputs);
    
    // Now we are starting back propogation!
    
    // Transpose hidden <-> output weights
    // var whoT = this.weights_ho.transpose();
    var whoT = Matrix.transpose(this.weights_ho)
    // Hidden errors is output error multiplied by weights (who)
    var hidden_errors = Matrix.dot(whoT, output_errors)
    
    // Calculate the gradient, this is much nicer in python!
    var gradient_output = Matrix.map(outputs, this.derivative);
    // Weight by errors and learing rate
    gradient_output.multiply(output_errors);
    gradient_output.multiply(this.lr);
    
    // Gradients for next layer, more back propogation!
    var gradient_hidden = Matrix.map(hidden_outputs, this.derivative);
    // Weight by errors and learning rate
    gradient_hidden.multiply(hidden_errors);
    gradient_hidden.multiply(this.lr);
    
    // Change in weights from HIDDEN --> OUTPUT
    // var hidden_outputs_T = hidden_outputs.transpose();
    var hidden_outputs_T = Matrix.transpose(hidden_outputs);
    var deltaW_output = Matrix.dot(gradient_output, hidden_outputs_T);
    this.weights_ho.add(deltaW_output);
    
    // Change in weights from INPUT --> HIDDEN
    // var inputs_T = inputs.transpose();
    
    
    
    
    
    var inputs_T = Matrix.transpose(inputs);

    var deltaW_hidden = Matrix.dot(gradient_hidden, inputs_T);
    
    
    
    // currupt console.log(this.weights_ho)


    this.weights_ih.add(deltaW_hidden);
    
    /* Issue with the hidden_inputs matrix 
    Not problem with the add method*/
    
    
    // console.log('ih weights')
    // this.weights_ih.print();  //--------------------
  }
  



  feedForward(inputArray) {

    let input = Matrix.fromArray(inputArray);


    this.hidden = Matrix.dot(this.weights_ih, input);

    this.hidden.add(this.biases_h);
    this.hidden.map(this.activation);

    let output = Matrix.dot(this.weights_ho, this.hidden);
    output.add(this.biases_o);
    output.add(this.biases_o)
    output.map(this.activation)
    return output.toArray()
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