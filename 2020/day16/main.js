const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let input = [];
let stage = 0; 

let rules = [];
let ticket;
let nearbyTickets = [];

let validTickets = [];

lineReader.on('line', function (line) {
    if (line == "") {
        stage++;
        return;
    }

    if (stage == 0) {
        let r = line.split(": ");
        let rule = r[1].split(" or ")
        let rule1 = rule[0].split("-");
        let rule2 = rule[1].split("-");
        let ruleName = r[0];
        let res = [rule1[0], rule1[1], rule2[0], rule2[1]].map(num => parseInt(num));
        res.push(ruleName);
        rules.push(res);
    }
    else if (stage == 1) {
        if (line.includes(",")) {
            ticket = line.split(",").map(num => parseInt(num));
        }
    }
    else {
        if (line.includes(",")) {
            nearbyTickets.push(line.split(",").map(num => parseInt(num)));
        }
    }
});

lineReader.on('close', function () {

    print("Day 16-1");

    let count = 0;
    nearbyTickets.forEach(ticket => {
        let isTicketValid = true;
        ticket.forEach(num => {
            let isValid = false;
            rules.forEach(rule => {
                if ((num >= rule[0] && num <= rule[1]) ||
                    (num >= rule[2] && num <= rule[3])) {
                        isValid = true;
                    }
            })
            if (!isValid) {
                count += num;
                isTicketValid = false;
            }
        })

        if (isTicketValid) {
            validTickets.push(ticket);
        }
    })
    print(count)

    ///////////////////////////////////////////////////////////////////////////

    print("\nDay 16-2");

    let columnsChecked = new Set();
    let rulesChecked = new Set();
    let departureValues = [];

    while (departureValues.length < 6) {

        colloop:
        for (let j = 0; j < validTickets[0].length; j++) { // column: each field in a ticket
            if (columnsChecked.has(j)) continue;

            let fitFirstRule = false;
            let matchingRuleNum;

            for (let x = 0; x < rules.length; x++) {
                if (rulesChecked.has(x)) continue;
                let rule = rules[x];
                let fitsRule = true;

                rowloop:
                for (let i = 0; i < validTickets.length; i++) { // row
                    let field = validTickets[i][j];
                    
                    if (field < rule[0] ||
                        (field > rule[1] && field < rule[2]) ||
                        field > rule[3]) {
                            fitsRule = false;
                            break rowloop;
                        }
                }
                
                if (fitsRule) {
                    matchingRuleNum = x;
                    if (!fitFirstRule) {
                        fitFirstRule = true;
                    }
                    else {
                        continue colloop;
                    }
                }
            }

            if (fitFirstRule) {
                columnsChecked.add(j);
                rulesChecked.add(matchingRuleNum);
                if (rules[matchingRuleNum][4].includes("departure")) {
                    departureValues.push(ticket[j]);
                }
            }
        }
    }

    print(departureValues.reduce((a, b) => a * b ));
});

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
