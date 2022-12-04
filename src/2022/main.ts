import * as path from 'path';
import { expect } from 'earljs'

import { solve1_1, solve1_2 } from "./day1";
testAndSolve("Day 1 Part 1", solve1_1, "day1_test1", "day1_1", 24000)
testAndSolve("Day 1 Part 2", solve1_2, "day1_test1", "day1_1", 45000)

import { solve2_1, solve2_2 } from "./day2";
testAndSolve("Day 2 Part 1", solve2_1, "day2_test1", "day2_1", 15)
testAndSolve("Day 2 Part 2", solve2_2, "day2_test1", "day2_1", 12)

import { solve3_1, solve3_2 } from "./day3";
testAndSolve("Day 3 Part 1", solve3_1, "day3_test1", "day3_1", 157)
testAndSolve("Day 3 Part 2", solve3_2, "day3_test1", "day3_1", 70)

import { solve4_1, solve4_2 } from "./day4";
testAndSolve("Day 4 Part 1", solve4_1, "day4_test1", "day4_1", 2)
testAndSolve("Day 4 Part 2", solve4_2, "day4_test1", "day4_1", 4)




function testAndSolve(id: string, solve: (string) => number, testInputId: string, inputId: string, solveTestInputAnswer: number) {
    expect(solve(getInputPath(testInputId))).toEqual(solveTestInputAnswer);
    console.log(`${id}`, solve(getInputPath(inputId)));
}

function getInputPath(id: string) {
    return path.join(path.resolve(), `src\\2022\\inputs\\${id}.txt`);
}