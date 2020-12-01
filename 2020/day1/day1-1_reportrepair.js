var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('day1-1_input.txt')
});

let list = [];
  
lineReader.on('line', function (line) {
    list.push(parseInt(line));
});

lineReader.on('close', function () {
loop:
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length; j++) {
            if (list[i] + list[j] == 2020) {
                console.log(list[i] * list[j]);
                break loop;
            }
        }
    }

anothaone:
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length; j++) {
            for (let k = 0; k < list.length; k++) {
                if (list[i] + list[j] + list[k] == 2020) {
                    console.log(list[i] * list[j] * list[k]);
                    break anothaone;
                }
            }
        }
    }
});
