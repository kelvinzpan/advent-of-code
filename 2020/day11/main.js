const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let input = [];

lineReader.on('line', function (line) {
    input.push(line.split(""));
});

lineReader.on('close', function () {

    print("Day 11-1");
    let seats = copyNestedArray(input);
    let unchanged = false;
    while (!unchanged) {
        unchanged = true;
        let newSeats = copyNestedArray(seats);
        for (let i = 0; i < seats.length; i++) {
            for (let j = 0; j < seats[0].length; j++) {
                if (seats[i][j] == "L") {
                    if (numOccupied(i, j, seats) == 0) {
                        newSeats[i][j] = "#";
                        unchanged = false;
                    }
                }
                else if (seats[i][j] == "#") {
                    if (numOccupied(i, j, seats) >= 4) {
                        newSeats[i][j] = "L";
                        unchanged = false;
                    }
                }
            }
        }
        seats = copyNestedArray(newSeats);
    }
    let occupiedSeats = 0;
    for (let i = 0; i < seats.length; i++) {
        for (let j = 0; j < seats[0].length; j++) {
            if (seats[i][j] == "#") occupiedSeats++;
        }
    }
    print(occupiedSeats);

    print("\nDay 11-2");
    seats = copyNestedArray(input);
    unchanged = false;
    while (!unchanged) {
        unchanged = true;
        let newSeats = copyNestedArray(seats);
        for (let i = 0; i < seats.length; i++) {
            for (let j = 0; j < seats[0].length; j++) {
                if (seats[i][j] == "L") {
                    if (numOccupiedDirectional(i, j, seats) == 0) {
                        newSeats[i][j] = "#";
                        unchanged = false;
                    }
                }
                else if (seats[i][j] == "#") {
                    if (numOccupiedDirectional(i, j, seats) >= 5) {
                        newSeats[i][j] = "L";
                        unchanged = false;
                    }
                }
            }
        }
        seats = copyNestedArray(newSeats);
    }
    occupiedSeats = 0;
    for (let i = 0; i < seats.length; i++) {
        for (let j = 0; j < seats[0].length; j++) {
            if (seats[i][j] == "#") occupiedSeats++;
        }
    }
    print(occupiedSeats);
});

function copyNestedArray(array) {
    let newArray = [];

    for (var i = 0; i < array.length; i++)
        newArray[i] = array[i].slice();

    return newArray;
}

function numOccupiedDirectional(i, j, seats) {
    let num = 0;
    let height = seats.length;
    let width = seats[0].length;

    let origI = i;
    let origJ = j;

    // North
    while (i > 0) {
        if (seats[i - 1][j] == "#") {
            num++;
            break;
        }
        if (seats[i - 1][j] == "L") {
            break;
        }
        i--;
    }
    i = origI;
    j = origJ;

    // South
    while (i < height - 1) {
        if (seats[i + 1][j] == "#") {
            num++;
            break;
        }
        if (seats[i + 1][j] == "L") {
            break;
        }
        i++;
    }
    i = origI;
    j = origJ;

    // West
    while (j > 0) {
        if (seats[i][j - 1] == "#") {
            num++;
            break;
        }
        if (seats[i][j - 1] == "L") {
            break;
        }
        j--;
    }
    i = origI;
    j = origJ;

    // East
    while (j < width - 1) {
        if (seats[i][j + 1] == "#") {
            num++;
            break;
        }
        if (seats[i][j + 1] == "L") {
            break;
        }
        j++;
    }
    i = origI;
    j = origJ;

    // NE
    while (i > 0 && j < width - 1) {
        if (seats[i - 1][j + 1] == "#") {
            num++;
            break;
        }
        if (seats[i - 1][j + 1] == "L") {
            break;
        }
        i--;
        j++;
    }
    i = origI;
    j = origJ;

    // SE
    while (i < height - 1 && j < width - 1) {
        if (seats[i + 1][j + 1] == "#") {
            num++;
            break;
        }
        if (seats[i + 1][j + 1] == "L") {
            break;
        }
        i++;
        j++;
    }
    i = origI;
    j = origJ;

    // NW
    while (i > 0 && j > 0) {
        if (seats[i - 1][j - 1] == "#") {
            num++;
            break;
        }
        if (seats[i - 1][j - 1] == "L") {
            break;
        }
        i--;
        j--;
    }
    i = origI;
    j = origJ;

    // SW
    while (i < height - 1 && j > 0) {
        if (seats[i + 1][j - 1] == "#") {
            num++;
            break;
        }
        if (seats[i + 1][j - 1] == "L") {
            break;
        }
        i++;
        j--;
    }

    return num;
}

function numOccupied(i, j, seats) {
    let num = 0;
    let height = seats.length;
    let width = seats[0].length;

    // North
    if (i > 0 && seats[i - 1][j] == "#") num++;

    // South
    if (i < height - 1 && seats[i + 1][j] == "#") num++;

    // West
    if (j > 0 && seats[i][j - 1] == "#") num++;

    // East
    if (j < width - 1 && seats[i][j + 1] == "#") num++;

    // NE
    if (i > 0 && j < width - 1 && seats[i - 1][j + 1] == "#") num++;

    // SE
    if (i < height - 1 && j < width - 1 && seats[i + 1][j + 1] == "#") num++;

    // NW
    if (i > 0 && j > 0 && seats[i - 1][j - 1] == "#") num++;

    // SW
    if (i < height - 1 && j > 0 && seats[i + 1][j - 1] == "#") num++;

    return num;
}

function printSeats(seats) {
    seats.forEach(row => print(row.join("")));
    print("\n")
}
