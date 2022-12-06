import { readFileSync } from 'fs';
import _ from 'lodash';

export function solve6_1(inputPath: string): number {
    var parsedInput = parseInput(inputPath);

    let count = 0;
    let uniqueSequence = [];

    for (const character of parsedInput) {
        count++
        if(!uniqueSequence.includes(character)){
            uniqueSequence.push(character)
            if(uniqueSequence.length === 4){
                return count;
            }
        } else {
            const indexOfDuplicate = uniqueSequence.indexOf(character);
            uniqueSequence = uniqueSequence.slice(indexOfDuplicate + 1);
            uniqueSequence.push(character)
        }
    }

    throw new Error("No marker found!");
}

export function solve6_2(inputPath: string): number {
    var parsedInput = parseInput(inputPath);
    let count = 0;
    let uniqueSequence = [];

    for (const character of parsedInput) {
        count++
        if(!uniqueSequence.includes(character)){
            uniqueSequence.push(character)
            if(uniqueSequence.length === 14){
                return count;
            }
        } else {
            const indexOfDuplicate = uniqueSequence.indexOf(character);
            uniqueSequence = uniqueSequence.slice(indexOfDuplicate + 1);
            uniqueSequence.push(character)
        }
    }

    throw new Error("No marker found!");
}

var parseInput = (inputPath: string): string[] => {
    const file = readFileSync(inputPath, 'utf-8');

    return [...file];
}