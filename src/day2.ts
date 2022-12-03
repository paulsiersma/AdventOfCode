import { readFileSync } from 'fs';
import _ from 'lodash';

export function solve2_1(inputPath: string): number {
    var parsedInput = parseInput(inputPath);

    var score = 0;

    parsedInput.forEach(round => {
        score += calculateScore(round[0], round[1]);
    });
    
    return score;
}

var calculateScore = (opponent: string, you: string): number => {
    var score = getSelectionScore(you);

    var roundResult = getRoundResult(opponent, you);

    switch (roundResult) {
        case 'win':
            score += 6;
            break;
        case 'draw':
            score += 3;
        default:
            break;
    }

    return score;
}

var getSelectionScore = (yourChoice: string): number => {
    switch (yourChoice) {
        case 'X':
            return 1;
        case 'Y':
            return 2;
        case 'Z':
            return 3;
        default:
            break;
    }
}

var getRoundResult = (opponent: string, you: string): string => {

    if (opponent === 'A') {
        switch (you) {
            case 'X':
                return 'draw';
            case 'Y':
                return 'win';
            case 'Z':
                return 'loss';
            default:
                break;
        }
    } else if (opponent === 'B') {
        switch (you) {
            case 'X':
                return 'loss';
            case 'Y':
                return 'draw';
            case 'Z':
                return 'win';
            default:
                break;
        }
    } else {
        switch (you) {
            case 'X':
                return 'win';
            case 'Y':
                return 'loss';
            case 'Z':
                return 'draw';
            default:
                break;
        }
    }
}

export function solve2_2(inputPath: string): number {
    var parsedInput = parseInput(inputPath);

    var score = 0;

    parsedInput.forEach(round => {

        var desiredChoice = getDesiredChoice(round[0], round[1]);

        score += calculateScore(round[0], desiredChoice);
    });
    
    return score;
}

var getDesiredChoice = (opponent: string, outcome: string): string => {

    if (opponent === 'A') {
        switch (outcome) {
            case 'X':
                return 'Z';
            case 'Y':
                return 'X';
            case 'Z':
                return 'Y';
            default:
                break;
        }
    } else if (opponent === 'B') {
        switch (outcome) {
            case 'X':
                return 'X';
            case 'Y':
                return 'Y';
            case 'Z':
                return 'Z';
            default:
                break;
        }
    } else {
        switch (outcome) {
            case 'X':
                return 'Y';
            case 'Y':
                return 'Z';
            case 'Z':
                return 'X';
            default:
                break;
        }
    }
}

var parseInput = (inputPath: string): string[][] => {

    const file = readFileSync(inputPath, 'utf-8');

    const values = file.split('\r\n').map(s => s.split(' '));

    return values;
}