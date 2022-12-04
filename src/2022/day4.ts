import { readFileSync } from 'fs';
import _ from 'lodash';

export function solve4_1(inputPath: string): number {

    const pairsOfSections = parseInput(inputPath);

    let count = 0;
    pairsOfSections.forEach(pair => {
        if(oneFullyContainsTheOther(pair[0], pair[1])){
            count++;
        }
    });

    return count;
}

var oneFullyContainsTheOther = (sections1: number[], sections2: number[]): boolean => {
    var container = sections1.length >= sections2.length ? sections1 : sections2;
    var contained = sections1.length >= sections2.length ? sections2 : sections1;

    let includes = true;

    for (const section of contained) {
        if(!container.includes(section)){
            includes = false;
            break;
        }
    }

    return includes;
}

export function solve4_2(inputPath: string): number {
    const pairsOfSections = parseInput(inputPath);

    let count = 0;
    pairsOfSections.forEach(pair => {
        if(anyOverlapBetween(pair[0], pair[1])){
            count++;
        }
    });

    return count;
}

var anyOverlapBetween = (sections1: number[], sections2: number[]): boolean => {
    var container = sections1.length >= sections2.length ? sections1 : sections2;
    var contained = sections1.length >= sections2.length ? sections2 : sections1;

    let overlap = false;

    for (const section of contained) {
        if(container.includes(section)){
            overlap = true;
            break;
        }
    }

    return overlap;
}

var parseInput = (inputPath: string): number[][][] => {
    const file = readFileSync(inputPath, 'utf-8');

    const lines = file.split('\r\n')
    const sections = lines.map(s => s.split(',').map(transformToSections))

    return sections;
}

var transformToSections = (value: string, index: number, s: string[]): number[] => {
    var firstAndLastSections = value.split('-').map(s => +s);
    var first = firstAndLastSections[0];
    var last = firstAndLastSections[1];
    var sections = [];
    for (let section = first; section <= last; section++) {
        sections.push(section);
    }

    return sections;
}