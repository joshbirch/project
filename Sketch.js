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




<<<<<<< HEAD
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
        nn.train(training[4],targets[4]);
=======
for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 4; j++) {
        nn.train(training[j],targets[j]);
>>>>>>> parent of 15d0ed0... Undefined weights issue resolved: result of dot methods altering the instance of the matrix, using the copy static method resolved.
    }
}
console.log('Training complete')