const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let input = [];

lineReader.on('line', function (line) {
    input = line.split(",").map(num => parseInt(num));
});

lineReader.on('close', function () {

    print("Day 15-1");
    print(getNumAtTurn(2020));

    ///////////////////////////////////////////////////////////////////////////

    print("\nDay 15-2");
    print(getNumAtTurn(30000000));
});

function getNumAtTurn(maxTurn) {
    let turn = 1;
    let turnSince = new Map();
    input.forEach(num => {
        turnSince[num] = [turn, turn];
        turn++;
    });

    let newNum = true;
    let lastNum = input[input.length - 1];
    while (turn <= maxTurn) {
        if (newNum) {
            lastNum = 0;
            newNum = false;
        }
        else {
            lastNum = turnSince[lastNum][0] - turnSince[lastNum][1];
        }

        if (lastNum in turnSince) {
            turnSince[lastNum][1] = turnSince[lastNum][0];
            turnSince[lastNum][0] = turn;
        }
        else {
            turnSince[lastNum] = [turn, turn];
            newNum = true;
        }

        turn++;
        if (turn % 1000000 == 0) print("Processing " + turn)
    }
    return lastNum;
}

///////////////////////////////////////////////////////////////////////////////

function copy2DArray(array) {
    let newArray = [];

    for (var i = 0; i < array.length; i++)
        newArray[i] = array[i].slice();

    return newArray;
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
