const segmentHex = {
    " ": "00", // 01110111
    A: "77", // 01110111
    B: "1F", // 01111100
    C: "4E", // 00111001
    D: "3D", // 01011110
    E: "4F", // 01111001
    F: "47", // 01110001
    G: "7B", // 00111101
    H: "37", // 01110110
    I: "06", // 00000110
    J: "3C", // 00011110
    K: "75", // 01110101 (or similar configuration)
    L: "0E", // 00111000
    M: "79", // 00110111 (custom, typically not fully representable)
    N: "15", // 01010100 (or similar configuration)
    O: "7E", // 00111111
    P: "67", // 01110011
    Q: "73", // 01100111 (or similar configuration)
    R: "05", // 01010000 (or similar configuration)
    S: "5B", // 01101101
    T: "F0", // 01111000 (or similar configuration)
    U: "3E", // 00111110
    V: "1C", // 00011100 (or similar configuration)
    W: "2A", // 00101010 (custom, typically not fully representable)
    X: "76", // 01110110 (same as H)
    Y: "3B", // 01101110
    Z: "6D"  // 01011011 (or similar configuration)
};

var currentMemoryLocation = 0;
var numberOfLettersInLine = 0; // TODO CHANGE THIS, with the option of delete the last letter
var result = '';
var readableResult = '';

const handleHex = (hex) => {
    const stringResult = segmentHex[hex];

    if (!stringResult) return;

    numberOfLettersInLine++;
    if (numberOfLettersInLine == 1) {
        const location = generateLocationString(currentMemoryLocation);
        result = result + location + stringResult;
    }
    else if (numberOfLettersInLine == 32) {
        result = result + stringResult + '\n';
        numberOfLettersInLine = 0;
        currentMemoryLocation += 2;
    }
    else {
        result = result + stringResult;
    }
    printResult();
};

document.addEventListener('keydown', function (event) {
    const keyNumber = event.key;
    const capitalLetter = keyNumber.toUpperCase();
    if (!capitalLetter) return;
    handleHex(capitalLetter);

    readableResult = readableResult + capitalLetter;
    const divReadable = document.getElementById('readable');
    divReadable.innerText = readableResult;
});