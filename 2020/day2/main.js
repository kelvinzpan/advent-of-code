console.log("Day 2");

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let list = [];
  
lineReader.on('line', function (line) {
    let arr = line.split(" ");
    let rule = arr[0].split("-");

    list.push({
        min: rule[0],
        max: rule[1],
        letter: arr[1].substr(0, 1),
        password: arr[2]
    });
});

lineReader.on('close', function () {
    let validCount = 0;
    for (let i = 0; i < list.length; i++) {
        let count = 0;
        for (let pos = 0; pos < list[i].password.length; pos++) {
            if (list[i].password.charAt(pos) == list[i].letter) {
                count++;
            }
        }

        if (count >= list[i].min && count <= list[i].max) {
            validCount++;
        }
    }

    console.log(validCount);

    //

    validCount = 0;
    for (let i = 0; i < list.length; i++) {
        let x = list[i].password.charAt(list[i].min - 1) == list[i].letter;
        let y = list[i].password.charAt(list[i].max - 1) == list[i].letter;

        if (x !== y) validCount++;
    }

    console.log(validCount);
});
