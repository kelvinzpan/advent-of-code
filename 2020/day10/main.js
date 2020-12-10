const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let input = [];

lineReader.on('line', function (line) {
    input.push(parseInt(line));
});

lineReader.on('close', function () {

    print("Day 10-1");
    input.sort(function(a, b) {
        return a - b;
    });
    let joltage = 0;
    let numOne = 0;
    let numThree = 0;
    for (let i = 0; i < input.length; i++) {
        let newJolt = input[i];
        if (newJolt - joltage == 1) numOne++;
        if (newJolt - joltage == 3) numThree++;
        joltage = newJolt;
    }
    numThree++;
    print(numOne * numThree)

    print("\nDay 10-2");
    input = [0, ...input, input[input.length-1] + 3];
    let reverseGraph = {};
    input.forEach(num => reverseGraph[num.toString()] = []);
    for (let i = 0; i < input.length; i++) {
        let num = input[i];

        for (let j = i + 1; j < input.length && j < i + 4; j++) {
            if (input[j] - input[i] <= 3) {
                reverseGraph[input[j].toString()].push(num.toString());
            }
        }
    }

    let numPaths = {};
    input.forEach(num => numPaths[num.toString()] = 0);
    numPaths[input[input.length - 1].toString()] = 1;
    for (let i = input.length - 1; i > 0; i--) {
        // Since our graph edges are reversed, higherNum --> lowerNum
        let higherNum = input[i];

        reverseGraph[higherNum.toString()].forEach(lowerNum => {
            numPaths[lowerNum.toString()] += numPaths[higherNum.toString()];
        })
    }
    print(numPaths[input[0].toString()]);

    // let count = [];
    // count.push(0);
    // recursiveCount(input[0], map, count);
    // print(count[0]);
});

// function recursiveCount(num, map, count) {
//     if (num == input[input.length - 1]) {
//         count[0]++;
//         return;
//     }

//     map[num].forEach(nextNum => {
//         recursiveCount(nextNum, map, count);
//     })
//     return;
// }
