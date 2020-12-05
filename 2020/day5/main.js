const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let input = [];
  
lineReader.on('line', function (line) {
    input.push(line);
});

lineReader.on('close', function () {
    print("Day 5-1");

    let max = 0;
    input.forEach(code => {
        let id = getId(code);
        if (id > max) {
            max = id;
        }
    })
    print(max);

    print("\nDay 5-2");
    let seats = [];
    for (let i = 0; i < 128; i++) {
        seats.push([]);
        for (let j = 0; j < 8; j++) {
            seats[i].push("x");
        }
    }

    input.forEach(code => {
        let row = getRow(code);
        let col = getCol(code);
        seats[row][col] = "";
    })
    
loop:
    for (let i = 15; i < 127; i++) { // This is the end of the empty front seats
        for (let j = 0; j < 8; j++) {
            if (seats[i][j] == "x") {
                print(seats);
                print((i * 8 + j));
                break loop;
            }
        }
    }
});

function getId(code) {
    let rowCode = code.substr(0, 7);
    let colCode = code.substr(7, 10);
    
    let rowLow = 0;
    let rowHigh = 127;
    for (let i = 0; i < 7; i++) {
        let char = rowCode.charAt(i);
        if (char == 'B') {
            rowLow = rowLow + Math.ceil((rowHigh - rowLow) / 2);
        }
        else if (char == 'F') {
            rowHigh = rowHigh - Math.ceil((rowHigh - rowLow)  / 2);
        }
        //print (rowLow, rowHigh)
    }
    let row = Math.min(rowLow, rowHigh);
    //print(row);
    
    let colLow = 0;
    let colHigh = 7;
    for (let i = 0; i < 3; i++) {
        let char = colCode.charAt(i);
        if (char == 'R') {
            colLow = colLow + Math.ceil((colHigh - colLow) / 2);
        }
        else if (char == 'L') {
            colHigh = colHigh - Math.ceil((colHigh - colLow) / 2);
        }
        //print (colLow, colHigh)
    }
    let col = Math.max(colLow, colHigh);

    return row * 8 + col;
}

function getCol(code) {
    let rowCode = code.substr(0, 7);
    let colCode = code.substr(7, 10);

    let colLow = 0;
    let colHigh = 7;
    for (let i = 0; i < 3; i++) {
        let char = colCode.charAt(i);
        if (char == 'R') {
            colLow = colLow + Math.ceil((colHigh - colLow) / 2);
        }
        else if (char == 'L') {
            colHigh = colHigh - Math.ceil((colHigh - colLow) / 2);
        }
        //print (colLow, colHigh)
    }
    return Math.max(colLow, colHigh);
}

function getRow(code) {
    let rowCode = code.substr(0, 7);
    let colCode = code.substr(7, 10);
    
    let rowLow = 0;
    let rowHigh = 127;
    for (let i = 0; i < 7; i++) {
        let char = rowCode.charAt(i);
        if (char == 'B') {
            rowLow = rowLow + Math.ceil((rowHigh - rowLow) / 2);
        }
        else if (char == 'F') {
            rowHigh = rowHigh - Math.ceil((rowHigh - rowLow)  / 2);
        }
        //print (rowLow, rowHigh)
    }
    return Math.min(rowLow, rowHigh);
}