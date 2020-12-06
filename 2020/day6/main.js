const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let set = new Set();
let count = 0;

let count2 = 0;
let group = 0;
let map = {};

lineReader.on('line', function (line) {
    if (line == "") {
        count = count + set.size;
        //
        for (let key in map) {
            if (map[key] == group) {
                count2++;
            }
        }

        set = new Set();
        //
        group = 0;
        map = {};

        return;
    }

    let l = line.split("");
    l.forEach(letter => {
        set.add(letter);

        //

        if (letter in map) {
            map[letter]++;
        }
        else {
            map[letter] = 1;
        }
    })

    group++;
});

lineReader.on('close', function () {
    count = count + set.size;
    //
    for (let key in map) {
        if (map[key] == group) {
            count2++;
        }
    }

    print("Day 6-1");
    print(count);

    print("\nDay 6-2");
    print(count2);
});
