const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let input = [];

lineReader.on('line', function (line) {
    input.push(parseInt(line))
});

lineReader.on('close', function () {

    print("Day 9-1");
    let preambleLen = 25;
    for (let i = preambleLen; i < input.length; i++) {
        if (!isValid(i, preambleLen)) {
            print(input[i]);
            break;
        }
    }

    print("\nDay 9-2");
    findContiguous();
});

function isValid(index, preambleLen) {
    for (let i = index - preambleLen; i < input.length - 1; i++) {
        for (let j = i + 1; j < input.length; j++) {
            if (input[index] == input[i] + input[j]) {
                return true;
            }
        }
    }
    return false;
}

function findContiguous() {
    for (let i = 0; i < input.length - 1; i++) {
        for (let j = i + 1; j < input.length; j++) {
            let slice = input.slice(i, j + 1);
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            //if (slice.reduce(reducer) == 127)  {
            if (slice.reduce(reducer) == 1038347917)  {
                print(Math.min(...slice) + Math.max(...slice));
                return;
            }
        }
    }
}