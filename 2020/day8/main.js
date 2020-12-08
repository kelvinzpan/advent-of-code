const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let input = [];

lineReader.on('line', function (line) {
    input.push(line);
});

lineReader.on('close', function () {

    print("Day 8-1");

    let lineNum = 0;
    let acc = 0;
    let visited = new Set();

    while(true) {
        if (visited.has(lineNum) || lineNum == input.length) {
            break;
        }

        visited.add(lineNum);
        let instr = input[lineNum].split(" ");
        let op = instr[0];
        let val = parseInt(instr[1]);
        
        if (op == "nop") {
            lineNum++;
        }
        else if (op == "acc") {
            acc += val;
            lineNum++;
        }
        else if (op == "jmp") {
            lineNum += val;
        }
    }

    print(acc);

    print("\nDay 8-2");
    
    let flipLine = 0;

firstwhile:
    while (true) {
        let instr = input[flipLine].split(" ");
        let op = instr[0];

        if (op == "acc") {
            flipLine++;
            continue;
        }

        let newOp = op == "jmp" ? "nop" : "jmp";
        let flipInput = [...input];
        flipInput[flipLine] = newOp + " " + instr[1];

        // Repeat the check
        lineNum = 0;
        acc = 0;
        visited = new Set();
    
        while(true) {
            if (visited.has(lineNum)) {
                break;
            }
            else if (lineNum == input.length) {
                break firstwhile;
            }
    
            visited.add(lineNum);
            let instr = flipInput[lineNum].split(" ");
            let op = instr[0];
            let val = parseInt(instr[1]);
            
            if (op == "nop") {
                lineNum++;
            }
            else if (op == "acc") {
                acc += val;
                lineNum++;
            }
            else if (op == "jmp") {
                lineNum += val;
            }
        }

        flipLine++;
    }
    
    print(acc);
});
