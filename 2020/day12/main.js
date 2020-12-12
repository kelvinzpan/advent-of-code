const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let input = [];

lineReader.on('line', function (line) {
    let instr = line.match(/[a-zA-Z]+|[0-9]+/g);
    input.push({
        dir: instr[0],
        val: parseInt(instr[1])
    });
});

lineReader.on('close', function () {

    print("Day 12-1");
    let currDir = [1, 0]; // x, y: east
    let pos = [0, 0];

    input.forEach(instr => {
        if (instr.dir == "N") {
            pos[1] += instr.val;
        }
        else if (instr.dir == "S") {
            pos[1] -= instr.val;
        }
        else if (instr.dir == "E") {
            pos[0] += instr.val;
        }
        else if (instr.dir == "W") {
            pos[0] -= instr.val;
        }
        else if (instr.dir == "L") {
            if (instr.val == 90) {
                currDir = [-currDir[1], currDir[0]];
            }
            else if (instr.val == 180) {
                currDir = [-currDir[0], -currDir[1]];
            }
            else if (instr.val == 270) {
                currDir = [currDir[1], -currDir[0]];
            }
        }
        else if (instr.dir == "R") {
            if (instr.val == 90) {
                currDir = [currDir[1], -currDir[0]];
            }
            else if (instr.val == 180) {
                currDir = [-currDir[0], -currDir[1]];
            }
            else if (instr.val == 270) {
                currDir = [-currDir[1], currDir[0]];
            }
        }
        else if (instr.dir == "F") {
            if (currDir[0] == 0) { // Facing up/down
                pos[1] += instr.val * currDir[1];
            }
            else {
                pos[0] += instr.val * currDir[0];
            }
        }
    });

    print(Math.abs(pos[0]) + Math.abs(pos[1]));

    print("\nDay 12-2");
    currDir = [10, 1]; // x, y: east
    pos = [0, 0];

    input.forEach(instr => {
        if (instr.dir == "N") {
            currDir[1] += instr.val;
        }
        else if (instr.dir == "S") {
            currDir[1] -= instr.val;
        }
        else if (instr.dir == "E") {
            currDir[0] += instr.val;
        }
        else if (instr.dir == "W") {
            currDir[0] -= instr.val;
        }
        else if (instr.dir == "L") {
            if (instr.val == 90) {
                currDir = [-currDir[1], currDir[0]];
            }
            else if (instr.val == 180) {
                currDir = [-currDir[0], -currDir[1]];
            }
            else if (instr.val == 270) {
                currDir = [currDir[1], -currDir[0]];
            }
        }
        else if (instr.dir == "R") {
            if (instr.val == 90) {
                currDir = [currDir[1], -currDir[0]];
            }
            else if (instr.val == 180) {
                currDir = [-currDir[0], -currDir[1]];
            }
            else if (instr.val == 270) {
                currDir = [-currDir[1], currDir[0]];
            }
        }
        else if (instr.dir == "F") {
            pos[1] += instr.val * currDir[1];
            pos[0] += instr.val * currDir[0];
        }
    });
    
    print(Math.abs(pos[0]) + Math.abs(pos[1]));
});

function copy2DArray(array) {
    let newArray = [];

    for (var i = 0; i < array.length; i++)
        newArray[i] = array[i].slice();

    return newArray;
}
