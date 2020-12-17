const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let space = new Map(); // z, y, x
space[0] = new Map();
let initY = 0;
let initX = 0;
let zLimits, yLimits, xLimits;

let spaceW = new Map(); // w, z, y, x
spaceW[0] = new Map();
spaceW[0][0] = new Map();

lineReader.on('line', function (line) {
    space[0][initY] = new Map();
    spaceW[0][0][initY] = new Map();
    let cubes = line.split("");
    initX = line.length;

    for (let x = 0; x < cubes.length; x++) {
        space[0][initY][x] = cubes[x];

        spaceW[0][0][initY][x] = cubes[x];
    }

    initY++;
});

lineReader.on('close', function () {

    print("Day 17-1");

    // Get limits
    zLimits = [0, 0];
    yLimits = [0, initY - 1];
    xLimits = [0, initX - 1];

    addPadding();
    
    // Perform cycles
    for (let i = 0; i < 6; i++) {
        cycleOnce();
        addPadding();
    }

    print(countActive());

    ///////////////////////////////////////////////////////////////////////////

    print("\nDay 17-2");

    // Get limits
    wLimits = [0, 0];
    zLimits = [0, 0];
    yLimits = [0, initY - 1];
    xLimits = [0, initX - 1];

    addPaddingW();
    
    // Perform cycles
    for (let i = 0; i < 6; i++) {
        cycleOnceW();
        addPaddingW();
    }

    print(countActiveW());
});

// Part 2

function addPaddingW() {
    wLimits[0]--;
    wLimits[1]++;
    zLimits[0]--;
    zLimits[1]++;
    yLimits[0]--;
    yLimits[1]++;
    xLimits[0]--;
    xLimits[1]++;

    for (let w = wLimits[0]; w <= wLimits[1]; w++) {
        if (!(w in spaceW)) {
            spaceW[w] = new Map();
        }
        for (let z = zLimits[0]; z <= zLimits[1]; z++) {
            if (!(z in spaceW[w])) {
                spaceW[w][z] = new Map();
            }
            for (let y = yLimits[0]; y <= yLimits[1]; y++) {
                if (!(y in spaceW[w][z])) {
                    spaceW[w][z][y] = new Map();
                }
                for (let x = xLimits[0]; x <= xLimits[1]; x++) {
                    if (!(x in spaceW[w][z][y])) {
                        spaceW[w][z][y][x] = ".";
                    }
                }
            }
        }
    }
}

function cycleOnceW() {
    let toFlip = [];
    for (let w = wLimits[0]; w <= wLimits[1]; w++) {
        for (let z = zLimits[0]; z <= zLimits[1]; z++) {
            for (let y = yLimits[0]; y <= yLimits[1]; y++) {
                for (let x = xLimits[0]; x <= xLimits[1]; x++) {
                    let count = numActiveNeighborsW(x, y, z, w);
                    let isActive = spaceW[w][z][y][x] == "#";

                    if (isActive) {
                        if (count !== 2 && count !== 3) {
                            toFlip.push([w, x, y, z]);
                        }
                    }
                    else if (!isActive && count === 3) {
                        toFlip.push([w, x, y, z]);
                    }
                }
            }
        }
    }

    toFlip.forEach(coord => {
        let w = coord[0]
        let x = coord[1];
        let y = coord[2];
        let z = coord[3];

        spaceW[w][z][y][x] = spaceW[w][z][y][x] == "#" ? "." : "#";
    })
}

function numActiveNeighborsW(xPos, yPos, zPos, wPos) {
    let count = 0;
    let xRange = [xPos - 1, xPos, xPos + 1];
    let yRange = [yPos - 1, yPos, yPos + 1];
    let zRange = [zPos - 1, zPos, zPos + 1];
    let wRange = [wPos - 1, wPos, wPos + 1];

    wRange.forEach(w => {
        if (w in spaceW) {
            zRange.forEach(z => {
                if (z in spaceW[w]) {
                    yRange.forEach(y => {
                        if (y in spaceW[w][z]) {
                            xRange.forEach(x => {
                                if (x == xPos && y == yPos && z == zPos && w == wPos) return;
                                if (x in spaceW[w][z][y] && spaceW[w][z][y][x] == "#") {
                                    count++;
                                }
                            });
                        }
                    });
                }
            });
        }
    });

    return count;
}

function countActiveW() {
    let count = 0;
    for (let w = wLimits[0]; w <= wLimits[1]; w++) {
        for (let z = zLimits[0]; z <= zLimits[1]; z++) {
            for (let y = yLimits[0]; y <= yLimits[1]; y++) {
                for (let x = xLimits[0]; x <= xLimits[1]; x++) {
                    if (spaceW[w][z][y][x] === "#") {
                        count++;
                    }
                }
            }
        }
    }
    return count;
}

// Part 1

function addPadding() {
    zLimits[0]--;
    zLimits[1]++;
    yLimits[0]--;
    yLimits[1]++;
    xLimits[0]--;
    xLimits[1]++;

    for (let z = zLimits[0]; z <= zLimits[1]; z++) {
        if (!(z in space)) {
            space[z] = new Map();
        }
        for (let y = yLimits[0]; y <= yLimits[1]; y++) {
            if (!(y in space[z])) {
                space[z][y] = new Map();
            }
            for (let x = xLimits[0]; x <= xLimits[1]; x++) {
                if (!(x in space[z][y])) {
                    space[z][y][x] = ".";
                }
            }
        }
    }
}

function cycleOnce() {
    let toFlip = [];
    for (let z = zLimits[0]; z <= zLimits[1]; z++) {
        //print("\nz=" + z);
        for (let y = yLimits[0]; y <= yLimits[1]; y++) {
            //let str = "";
            for (let x = xLimits[0]; x <= xLimits[1]; x++) {
                let count = numActiveNeighbors(x, y, z);
                //str = str + count;
                let isActive = space[z][y][x] == "#";

                if (isActive) {
                    if (count !== 2 && count !== 3) {
                        toFlip.push([x, y, z]);
                    }
                }
                else if (!isActive && count === 3) {
                    toFlip.push([x, y, z]);
                }
            }
            //print(str);
        }
    }

    toFlip.forEach(coord => {
        let x = coord[0];
        let y = coord[1];
        let z = coord[2];

        space[z][y][x] = space[z][y][x] == "#" ? "." : "#";
    })
}

function numActiveNeighbors(xPos, yPos, zPos) {
    let count = 0;
    let xRange = [xPos - 1, xPos, xPos + 1];
    let yRange = [yPos - 1, yPos, yPos + 1];
    let zRange = [zPos - 1, zPos, zPos + 1];

    zRange.forEach(z => {
        if (z in space) {
            yRange.forEach(y => {
                if (y in space[z]) {
                    xRange.forEach(x => {
                        if (x == xPos && y == yPos && z == zPos) return;
                        if (x in space[z][y] && space[z][y][x] == "#") {
                            count++;
                        }
                    });
                }
            });
        }
    });

    return count;
}

function countActive() {
    let count = 0;
    for (let z = zLimits[0]; z <= zLimits[1]; z++) {
        for (let y = yLimits[0]; y <= yLimits[1]; y++) {
            for (let x = xLimits[0]; x <= xLimits[1]; x++) {
                if (space[z][y][x] === "#") {
                    count++;
                }
            }
        }
    }
    return count;
}

function printSpace() {
    for (let z = zLimits[0]; z <= zLimits[1]; z++) {
        print("\nz=" + z);
        for (let y = yLimits[0]; y <= yLimits[1]; y++) {
            let str = "";
            for (let x = xLimits[0]; x <= xLimits[1]; x++) {
                str = str + space[z][y][x];
            }
            print(str);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////

// Convenience functions 

function copy3DArray(array) {
    let newArray = [];

    for (var i = 0; i < array.length; i++)
        newArray[i] = copy2DArray(array[i]);

    return newArray;
}

function copy2DArray(array) {
    let newArray = [];

    for (var i = 0; i < array.length; i++)
        newArray[i] = array[i].slice();

    return newArray;
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
