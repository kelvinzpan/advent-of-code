const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let leaveTime = -1;
let input = [];

lineReader.on('line', function (line) {
    if (leaveTime == -1) {
        leaveTime = parseInt(line);
    }
    else {
        input = line.split(",");
    }
});

lineReader.on('close', function () {

    print("Day 13-1");
    let waitTime = -1;
    let resId = -1;
    input.forEach(i => {
        let id = parseInt(i);

        if (!isNaN(id)) {
            let currWaitTime = id - (leaveTime % id);
            if (waitTime == -1) {
                waitTime = currWaitTime;
                resId = id;
            }
            else {
                if (currWaitTime < waitTime) {
                    waitTime = currWaitTime;
                    resId = id;
                }
            }
        }
    });

    print(waitTime * resId);

    ///////////////////////////////////////////////////////////////////////////

    print("\nDay 13-2");

    for (let i = 0; i < input.length; i++) {
        if (input[i] == "x")continue;
        print(input[i] + " + " + i)
    }

    // Apparently I needed to know the Chinese Remainder Theorem
    waitTime = 100000000000000;
    let time = 1068781;
    while (true) {
        let found = true;

        for (let i = 0; i < input.length; i++) {
            if (input[i] == "x") {
                continue;
            }
            else {
                let id = parseInt(input[i]);
                waitTime = (id - (time % id)) % id;

                if (waitTime != i) {
                    found = false;
                    break;
                }
            }
        }

        if (found) {
            print(time);
            break;
        }
        
        time += parseInt(input[0]);
    }
});

///////////////////////////////////////////////////////////////////////////////

function copy2DArray(array) {
    let newArray = [];

    for (var i = 0; i < array.length; i++)
        newArray[i] = array[i].slice();

    return newArray;
}
