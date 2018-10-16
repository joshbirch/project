let nn = new NeuralNetwork(2, 5, 20);


inputs = [
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1]
]

labels = [0, 1, 1, 0];

nn.input.randomise();

nn.guess()