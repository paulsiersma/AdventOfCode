import * as path from 'path';
import { expect } from 'earljs'

import {solve1_1, solve1_2} from "./day1";
expect(solve1_1(getInputPath("day1_test1"))).toEqual(24000);
console.log("Day1 Part1: ", solve1_1(getInputPath("day1_1")));
expect(solve1_2(getInputPath("day1_test1"))).toEqual(45000);
console.log("Day1 Part 2: ", solve1_2(getInputPath("day1_1")));















function getInputPath(id: string) {
    return path.join(path.resolve(), `inputs\\${id}.txt`);
}