const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let input = [];

// Set up input
lineReader.on('line', function (line) {
    input.push(line);
});

// Input read
lineReader.on('close', function () {

    print("Day 18-1");

    let count = 0;
    input.forEach(expr => {
        count += solveExpr(expr, false);
    });
    print(count);

    ///////////////////////////////////////////////////////////////////////////

    print("\nDay 18-2");

    count = 0;
    input.forEach(expr => {
        count += solveExpr(expr, true);
    });
    print(count);
});

function solveExpr(expr, useAdv) {
    let str = expr.slice();

    while (true) {
        let leftParenIndex, rightParenIndex;
        let parenFound = false;

        for (let i = 0; i < str.length; i++) {
            if (str[i] == "(") {
                leftParenIndex = i;
                parenFound = true;
            }
            else if (str[i] == ")") {
                rightParenIndex = i;
                parenFound = true;
                break;
            }
        }

        if (parenFound) {
            let subExpr = str.slice(leftParenIndex + 1, rightParenIndex);
            let leftExpr = str.slice(0, leftParenIndex);
            let rightExpr = str.slice(rightParenIndex + 1);

            if (useAdv) {
                str = leftExpr + solveAdvSubExpr(subExpr) + rightExpr;
            }
            else {
                str = leftExpr + solveSubExpr(subExpr) + rightExpr;
            }
        }
        else {
            if (useAdv) {
                return solveAdvSubExpr(str)
            }
            else {
                return solveSubExpr(str)
            };
        }
    }
}

function solveAdvSubExpr(expr) {
    let chars = expr.split(" ");

    while (chars.includes("+")) {
        for (let i = 0; i < chars.length; i++) {
            if (chars[i] == "+") {
                let num = parseInt(chars[i - 1]) + parseInt(chars[i + 1]);

                let newChars = [];
                newChars = newChars.concat(chars.slice(0, i - 1));
                newChars.push(num);
                newChars = newChars.concat(chars.slice(i + 2));

                chars = newChars;
            }
        }
    }

    return solveSubExpr(chars.join(" "));
}

function solveSubExpr(expr) {
    let chars = expr.split(" ");
    let count = parseInt(chars[0]);
    for (let i = 1; i < chars.length - 1; i += 2) {
        if (chars[i] == "+") {
            count += parseInt(chars[i + 1]);
        }
        else if (chars[i] == "*") {
            count *= parseInt(chars[i + 1]);
        }
    }
    return count;
}

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
