console.log("Day 3");
const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let map = [];
  
lineReader.on('line', function (line) {
    map.push(line.split(""));
});

lineReader.on('close', function () {
    print(numTrees(1, 3));

    //

    print(numTrees(1, 1) * numTrees(1, 3) * numTrees(1, 5) * numTrees(1, 7) * numTrees(2, 1));
});


function numTrees(downAmt, rightAmt) {
    let count = 0;
    let right = 0;

    for (let down = 0; down < map.length;) {
        for (i = 0; i < rightAmt; i++) {
            right = (right + 1) % (map[0].length);
        }

        down += downAmt;
        if (down < map.length) {
            if (map[down][right] == "#") {
                count++;
            }
        }
    }

    return count;
}