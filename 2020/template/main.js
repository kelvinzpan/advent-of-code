const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let input = [];

// Set up input
lineReader.on('line', function (line) {

});

// Input read
lineReader.on('close', function () {

    print("Day -1");

    ///////////////////////////////////////////////////////////////////////////

    print("\nDay -2");
});

///////////////////////////////////////////////////////////////////////////////

// Convenience functions 

function copy2DArray(array) {
    let newArray = [];

    for (var i = 0; i < array.length; i++)
        newArray[i] = array[i].slice();

    return newArray;
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
