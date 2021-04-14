'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'dynamicArray' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY queries
 */

function dynamicArray(n, queries) {
    // Write your code here
    var seqList = []
    /* for. n = 2 , 
         seqList is seq[0] and
                    seq[1], which will contain two types only
    */
    var lastAnswer = 0

    //initialize seqList with empty array(Lists)
    for (var i = 0; i < n; i++) {
        seqList.push([])
    }

    //each query is an array containing the values of type , x , and y(value to be    appended or printed)
    var res = []
    var idx = 0
    for (var j in queries) {
        idx = ((queries[j][1] ^ lastAnswer) % n)
        if (queries[j][0] === 1) {
            seqList[idx].push(queries[j][2])
        }
        else if (queries[j][0] === 2) {

            lastAnswer = seqList[idx][queries[j][2] % seqList[idx].length]
            res.push(lastAnswer)
        }

    }
    return res

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const q = parseInt(firstMultipleInput[1], 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const result = dynamicArray(n, queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
