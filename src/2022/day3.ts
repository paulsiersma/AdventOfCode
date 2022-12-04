import { readFileSync } from 'fs';
import _ from 'lodash';

export function solve3_1(inputPath: string): number {
    var parsedInput = parseInput(inputPath);

    var totalPrio = 0;
    parsedInput.forEach(compartments => {
        var commonItem = getCommonItem(compartments[0], compartments[1]);
        var prio = getPrio(commonItem);
        totalPrio+=prio;
    });

    return totalPrio;
}

var getCommonItem = (compartment1: string, compartment2: string): string => {
    for (const itemIndex in [...compartment1]) {
        const item = compartment1[itemIndex];
        if([...compartment2].includes(item)){
            return item;
        }
    }
    throw new Error("No matching item found!")
}

var getCommonItem = (compartment1: string, compartment2: string): string => {
    for (const itemIndex in [...compartment1]) {
        const item = compartment1[itemIndex];
        if([...compartment2].includes(item)){
            return item;
        }
    }
    throw new Error("No matching item found!")
}

var getPrio = (item: string): number => {
    var charCode = item.charCodeAt(0);
    if(charCode > 90){
        return charCode - 96;
    } else{
        return charCode - 38;
    }
}

export function solve3_2(inputPath: string): number {
    var parsedInput = parseInput2(inputPath);

    var totalPrio = 0;

    while (parsedInput.length) {
        var set = parsedInput.splice(0,3);
        var badge = getBadge(set);
        var prio = getPrio(badge);
        totalPrio+=prio;
    }

    return totalPrio;
}

var getBadge = (set: string[]): string => {
    const bag1 = set[0];
    const bag2 = set[1];
    const bag3 = set[2];
    for (const itemIndex in [...bag1]) {
        const item = bag1[itemIndex];
        if([...bag2].includes(item) && [...bag3].includes(item)){
            return item;
        }
    }
    throw new Error("No matching item found!")
}

var parseInput2 = (inputPath: string): string[] => {

    const file = readFileSync(inputPath, 'utf-8');

    const values = file.split('\r\n')

    return values;
}

var parseInput = (inputPath: string): string[][] => {

    const file = readFileSync(inputPath, 'utf-8');

    const values = file.split('\r\n').map(s => {
        const length = s.length;
        var startIndexSecondHalf = length/2;
        var firstHalf = s.slice(0, startIndexSecondHalf);
        var secondHalf = s.slice(startIndexSecondHalf);
        return [firstHalf, secondHalf];
    });

    return values;
}