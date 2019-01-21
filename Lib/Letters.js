function indexToLetter(index) {
    index += 64;
    return String.fromCharCode(index)
}

function letterToIndex(letter) {
    let index = letter.charCodeAt(0);
    if (index >= 97) {
        index -= 32;
    }
    index -= 64;
    return index
}