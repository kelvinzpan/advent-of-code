const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let input = [];

let isNew = false;
let currObj = {};
let count = 0; 

lineReader.on('line', function (line) {
    if (line == "") {
        isNew = true;
        return;
    }

    if (isNew) {
        isNew = false;
        input.push(currObj);
        currObj = {};
    }

    let pairs = line.split(" ");
    pairs.forEach(pair => {
        let vals = pair.split(":");
        currObj[vals[0]] = vals[1];
    });
});

lineReader.on('close', function () {
    input.push(currObj);
    print("Day 4-1");

    input.forEach(passport => {
        if (isValid(passport)) count++;
    })

    print(count);

    count = 0;
    print("\nDay 4-2");

    input.forEach(passport => {
        if (isRlyValid(passport)) count++;
    })
    
    print(count);
});

function isValid(passport) {
    return ("byr" in passport &&
        "iyr" in passport &&
        "eyr" in passport &&
        "hgt" in passport &&
        "hcl" in passport &&
        "ecl" in passport &&
        "pid" in passport);
}

function isRlyValid(passport) {
    let byr = parseInt(passport["byr"]) >= 1920 && parseInt(passport["byr"]) <= 2002;
    let iyr = parseInt(passport["iyr"]) >= 2010 && parseInt(passport["iyr"]) <= 2020;
    let eyr = parseInt(passport["eyr"]) >= 2020 && parseInt(passport["eyr"]) <= 2030;
    let hgt;
    if (!("hgt" in passport)) {
        return false;
    }
    else if (passport["hgt"].includes("cm")) {
        let num = passport["hgt"].split("cm")[0];
        hgt = num >= 150 && num <= 193;
    }
    else if (passport["hgt"].includes("in")) {
        let num = passport["hgt"].split("in")[0];
        hgt = num >= 59 && num <= 76;
    }
    let hcl = /^#[0-9A-F]{6}$/i.test(passport["hcl"]);
    let eclColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    let ecl = eclColors.indexOf(passport["ecl"]) > -1;
    let pid = /^[0-9]{9}$/i.test(passport["pid"]);

    return byr && iyr && eyr && hgt && hcl && ecl && pid;
}