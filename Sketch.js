let nn = new NeuralNetwork(2, 4, 1);


let training = [
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




for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
        nn.train(training[4],targets[4]);
    }
}
console.log('Training complete')

console.log(nn.feedForward([1,1]))
