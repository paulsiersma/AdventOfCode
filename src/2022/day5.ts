import { readFileSync } from 'fs';
import _, { countBy } from 'lodash';

export function solve5_1(inputPath: string): string {
    var situation = parseStartingSituation(inputPath);

    var operations = parseOperations(inputPath);

    operations.forEach(operation => {
        applyOperationToSituation(operation, situation);
    })

    let result: string = '';
    situation.forEach(column => {
        result += column.pop();
    })

    return result;
}

export function solve5_2(inputPath: string): string {
    var situation = parseStartingSituation(inputPath);

    var operations = parseOperations(inputPath);

    operations.forEach(operation => {
        applyOperationToSituation2(operation, situation);
    })

    let result: string = '';
    situation.forEach(column => {
        result += column.pop();
    })

    return result;
}


var applyOperationToSituation = (operation: number[], situation: string[][]) => {
    for (let actionIndex = 0; actionIndex < operation[0]; actionIndex++) {
        var takeColumnIndex = operation[1];
        var depositColumnIndex = operation[2];
        var takeColumnItem = situation[takeColumnIndex].pop();
        situation[depositColumnIndex].push(takeColumnItem);
    }
}

var applyOperationToSituation2 = (operation: number[], columns: string[][]) => {
    var numberOfCrates = operation[0];
    var takeColumnIndex = operation[1];
    var depositColumnIndex = operation[2];

    var cratesToMove = _.takeRight(columns[takeColumnIndex], numberOfCrates);
    columns[takeColumnIndex].splice(-1* numberOfCrates, numberOfCrates);
    columns[depositColumnIndex].push(...cratesToMove)
}

var parseStartingSituation = (inputPath: string): string[][] => {
    const file = readFileSync(inputPath, 'utf-8');

    var situation = file.split('\r\n\r\n')[0];

    var rowsRaw = situation.split('\r\n');

    var columns: string[][] = [];

    rowsRaw.reverse().forEach(rowRaw => {

        const rowRawArr = [...rowRaw];

        for (let index = 1; index < rowRawArr.length; index += 4) {
            const element = rowRawArr[index];

            if (element !== ' ' && !isNaN(+element)) {
                columns.push([]);
                continue;
            }

            var columnIndex = (index - 1) / 4

            if (element !== ' ') {
                columns[columnIndex].push(element);
            }
        }
    })

    return columns;
}

var parseOperations = (inputPath: string): number[][] => {
    const file = readFileSync(inputPath, 'utf-8');

    var operationsSection = file.split('\r\n\r\n')[1];

    var operationsRaw = operationsSection.split('\r\n');

    var operations: number[][] = [];

    operationsRaw.forEach(operationRaw => {
        var operationRawSplit = operationRaw.split(' ');
        operations.push([+operationRawSplit[1], +operationRawSplit[3] -1, +operationRawSplit[5] -1])
    });

    return operations;
}