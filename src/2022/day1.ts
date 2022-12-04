import { readFileSync } from 'fs';
import _ from 'lodash';

export function solve1_1(inputPath: string): number{
    var parsedInput = parseInput(inputPath);

    var sums = parsedInput.map(group => group.reduce((acc, current) => acc + current))

    return Math.max(...sums);
}

export function solve1_2(inputPath: string): number{
    var parsedInput = parseInput(inputPath);

    var sums = parsedInput.map(group => group.reduce((acc, current) => acc + current))

    var sumOfTopThreeSums = sums.sort((a, b) => b-a).slice(0,3).reduce((acc, current) => acc + current)

    return sumOfTopThreeSums;
}


var parseInput = (inputPath: string): number[][] => {

    const file = readFileSync(inputPath, 'utf-8');

    const values = file.split('\r\n\r\n').map(s => s.split('\r\n').map(s => +s));

    return values;
}