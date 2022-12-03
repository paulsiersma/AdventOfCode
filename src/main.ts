import * as path from 'path';
import { expect } from 'earljs'

import { solve1_1, solve1_2 } from "./day1";
testAndSolve("Day 1", solve1_1, solve1_2, "day1_test1", "day1_1", 24000, 45000)

import { solve2_1, solve2_2 } from "./day2";
testAndSolve("Day 2", solve2_1, solve2_2, "day2_test1", "day2_1", 15, 12)

import { solve3_1, solve3_2 } from "./day3";
testAndSolve("Day 3", solve3_1, solve3_2, "day3_test1", "day3_1", 157, 70)





function testAndSolve(id: string, solve1: (string) => number, solve2: (string) => number, testInput1Id: string, input1Id: string, solve1TestInputAnswer: number, solve2TestInputAnswer: number) {
    expect(solve1(getInputPath(testInput1Id))).toEqual(solve1TestInputAnswer);
    console.log(`${id} Part 1`, solve1(getInputPath(input1Id)));
    expect(solve2(getInputPath(testInput1Id))).toEqual(solve2TestInputAnswer);
    console.log(`${id} Part 2`, solve2(getInputPath(input1Id)));
}

function getInputPath(id: string) {
    return path.join(path.resolve(), `inputs\\${id}.txt`);
}