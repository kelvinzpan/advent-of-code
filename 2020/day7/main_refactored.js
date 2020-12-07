const print = console.log;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let map = {};
let map2 = {};

lineReader.on('line', function (line) {
    let a = line.indexOf(" bags contain ");
    let parent = line.substr(0, a);
    //
    map2[parent] = [];
    
    let children = line.slice(a + 14, -1).split(", ");
    children.forEach(child => {
        let b = child.indexOf(" ");
        let num = parseInt(child.slice(0, b));
        
        if (!isNaN(num)) {
            let c = child.indexOf(" bag");
            let childName = child.slice(b + 1, c);
            
            if (!map[childName]) {
                map[childName] = [];
            }
            
            map[childName].push(parent);
            //
            map2[parent].push({
                "name": childName,
                "num": num
            });
        }
    });
});

lineReader.on('close', function () {
    print("Day 7-1");
    let res = new Set();
    let list = map["shiny gold"];
    while (true) {
        if (list.length == 0) {
            break;
        }

        let newList = [];
        list.forEach(parentBag => {
            res.add(parentBag);

            if (parentBag in map) {
                map[parentBag].forEach(nextBag => {
                    if (!res.has(nextBag)) {
                        newList.push(nextBag);
                    }
                })
            }
        });

        list = newList;
    }
    print(res.size);

    print("\nDay 7-2");
    print(recursiveCount("shiny gold"))
});

function recursiveCount(bagName) {
    if (!(bagName in map2)) {
        return 0;
    }

    let count = 0;
    map2[bagName].forEach(childBag => {
        count = count + childBag.num + childBag.num*recursiveCount(childBag.name);
    })
    return count;
}
