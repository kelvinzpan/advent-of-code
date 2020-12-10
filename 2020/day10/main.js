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
    let map = {};
    let revMap = {};
    input.forEach(num => revMap[num.toString()] = []);
    for (let i = 0; i < input.length; i++) {
        let num = input[i];
        map[num.toString()] = [];

        for (let j = i + 1; j < input.length && j < i + 4; j++) {
            if (input[j] - input[i] <= 3) {
                map[num.toString()].push(input[j].toString());
                revMap[input[j].toString()].push(num.toString());
            }
        }
    }
    
    // let count = [];
    // count.push(0);
    // recursiveCount(input[0], map, count);
    // print(count[0]);

    let dp = {};
    input.forEach(num => dp[num.toString()] = 0);
    dp[input[input.length - 1].toString()] = 1;
    for (let i = input.length - 1; i > 0; i--) {
        let lowerNum = input[i];

        revMap[lowerNum.toString()].forEach(upperNum => {
            dp[upperNum.toString()] += dp[lowerNum.toString()];
        })
    }
    print(dp[input[0].toString()]);
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
