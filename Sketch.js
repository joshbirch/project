let nn = new NeuralNetwork(2, 4, 1);


let inputs = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
]
let targets = [
    [0],
    [0],
    [0],
    [1]
]


for (let i = 1; i < 2; i++) {

    for (let j = 1; j < 2;j++){
        nn.train(inputs[j],targets[j])
    }

}

console.log('Training complete')


nn.feedForward([1,1]);
