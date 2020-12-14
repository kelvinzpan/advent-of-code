const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let currMask;
let mem = new Map();
let mem2 = new Map();

lineReader.on('line', function (line) {
    if (line.includes("mask")) {
        currMask = line.substr(7);
    }
    else {
        let index = parseInt(line.substr(4, line.indexOf("]") - 4));
        let value = parseInt(line.substr(line.indexOf(" = ") + 3));
        mem[index] = getMaskedValue(value, currMask);

        writeValuesAtMaskedIndex(index, value, currMask);
    }
});

lineReader.on('close', function () {

    print("Day 14-1");
    let count = 0;
    for (let key in mem) {
        count += mem[key];
    }
    print(count);

    ///////////////////////////////////////////////////////////////////////////

    print("\nDay 14-2");
    count = 0;
    for (let key in mem2) {
        count += mem2[key];
    }
    print(count);
});

function writeValuesAtMaskedIndex(index, value, mask) {
    let binIndex = index.toString(2);
    while(binIndex.length < 36) {
        binIndex = "0" + binIndex;
    }
    
    for (let i = 0; i < mask.length; i++) {
        if (mask.charAt(i) == "0") {
            continue;
        }

        binIndex = binIndex.replaceAt(i, mask.charAt(i));
    }

    recursiveSet(binIndex, 0, value);
}

function recursiveSet(binaryStr, index, value) {
    if (index == binaryStr.length) {
        let address = parseInt(binaryStr, 2);
        mem2[address] = value;

        return;
    }
    else if (binaryStr.charAt(index) == "X") {
        let strZero = binaryStr.replaceAt(index, "0");
        let strOne = binaryStr.replaceAt(index, "1");
        recursiveSet(strZero, index + 1, value);
        recursiveSet(strOne, index + 1, value);
    }
    else {
        recursiveSet(binaryStr, index + 1, value);
    }
}

function getMaskedValue(value, mask) {
    let binVal = value.toString(2);
    
    while(binVal.length < 36) {
        binVal = "0" + binVal;
    }

    for (let i = 0; i < mask.length; i++) {
        if (mask.charAt(i) == "X") {
            continue;
        }

        binVal = binVal.replaceAt(i, mask.charAt(i));
    }

    return parseInt(binVal, 2);
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
