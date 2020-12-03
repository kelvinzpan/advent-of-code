const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let input = [];
  
lineReader.on('line', function (line) {
});

lineReader.on('close', function () {
    print("Day 4-1");

    print("Day 4-2");
});
