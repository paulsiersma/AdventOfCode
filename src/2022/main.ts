import * as path from 'path';
import { expect } from 'earljs'

// import { solve1_1, solve1_2 } from "./day1";
// testAndSolve("Day 1 Part 1", solve1_1, "day1_test1", "day1_1", 24000)
// testAndSolve("Day 1 Part 2", solve1_2, "day1_test1", "day1_1", 45000)

// import { solve2_1, solve2_2 } from "./day2";
// testAndSolve("Day 2 Part 1", solve2_1, "day2_test1", "day2_1", 15)
// testAndSolve("Day 2 Part 2", solve2_2, "day2_test1", "day2_1", 12)

// import { solve3_1, solve3_2 } from "./day3";
// testAndSolve("Day 3 Part 1", solve3_1, "day3_test1", "day3_1", 157)
// testAndSolve("Day 3 Part 2", solve3_2, "day3_test1", "day3_1", 70)

// import { solve4_1, solve4_2 } from "./day4";
// testAndSolve("Day 4 Part 1", solve4_1, "day4_test1", "day4_1", 2)
// testAndSolve("Day 4 Part 2", solve4_2, "day4_test1", "day4_1", 4)

// import { solve5_1, solve5_2 } from "./day5";
// testAndSolve("Day 5 Part 1", solve5_1, "day5_test1", "day5_1", "CMZ")
// testAndSolve("Day 5 Part 2", solve5_2, "day5_test1", "day5_1", "MCD")

//import { solve6_1, solve6_2 } from "./day6";
//testAndSolve("Day 6 Part 1", solve6_1, [["day6_test1", 7],["day6_test2", 5],["day6_test3", 6]], "day6_1")
//testAndSolve("Day 6 Part 2", solve6_2, [["day6_test1", 19],["day6_test2", 23],["day6_test3", 23]], "day6_1")

// import { solve7_1, solve7_2 } from "./day7";
// testAndSolve("Day 7 Part 1", solve7_1, [["day7_test1", 95437]], "day7_1")
// testAndSolve("Day 7 Part 2", solve7_2, [["day7_test1", 24933642]], "day7_1")

import { solve8_1, solve8_2 } from "./day8";
testAndSolve("Day 8 Part 1", solve8_1, [["day8_test1", 21]], "day8_1")
testAndSolve("Day 8 Part 2", solve8_2, [["day8_test1", 8]], "day8_1")

function testAndSolve(id: string, solve: (inputPath: string) => any, testCases: any[][], inputId: string) {
    testCases.forEach(testCase => {
        const testInputId = testCase[0];
        const solveTestInputAnswer = testCase[1];
        expect(solve(getInputPath(testInputId))).toEqual(solveTestInputAnswer);
    })
    console.log(`${id}:`, solve(getInputPath(inputId)));
}

function getInputPath(id: string) {
    return path.join(path.resolve(), `src\\2022\\inputs\\${id}.txt`);
}