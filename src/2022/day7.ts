import { readFileSync } from 'fs';
import _ from 'lodash';

class Directory {
    constructor(public parent: Directory, public name: string, public size: number = 0){ }
    children: Directory[] = [];
}

export function solve7_1(inputPath: string): number {

    const parsedInput = parseInput(inputPath);

    const dirStructure = new Map<string, Directory>();

    let currentDirName: string = '';
    for (const line of parsedInput) {
        if(isCdCommand(line)){
            currentDirName = getUpdatedCurrentDir(currentDirName, line, dirStructure);
            continue;
        }
        if(isLsCommand(line)){
            continue;
        }
        if(isDir(line)){
            continue;
        }
        incrementSize(currentDirName, line, dirStructure);
    }

    let result = 0;

    for (const directory of dirStructure.values()) {
        const size = getSizeOfDirAndChillun(directory);
        if(size <= 100000){
            result += size;
        }
    }

    return result;
}

export function solve7_2(inputPath: string): number {
    const parsedInput = parseInput(inputPath);

    const dirStructure = new Map<string, Directory>();

    let currentDirName: string = '';
    for (const line of parsedInput) {
        if(isCdCommand(line)){
            currentDirName = getUpdatedCurrentDir(currentDirName, line, dirStructure);
            continue;
        }
        if(isLsCommand(line)){
            continue;
        }
        if(isDir(line)){
            continue;
        }
        incrementSize(currentDirName, line, dirStructure);
    }

    const topLevelDirectory = dirStructure.get('/');
    const totalSize = getSizeOfDirAndChillun(topLevelDirectory);
    const freeSpace = 70000000 - totalSize;
    const neededFreeSpace = 30000000
    const remainingNeededFreeSpace = neededFreeSpace - freeSpace;

    
    let bestCandidateSize = totalSize;
    for (const directory of dirStructure.values()) {
        const size = getSizeOfDirAndChillun(directory);
        if(size > remainingNeededFreeSpace && size < bestCandidateSize){
            bestCandidateSize = size;
        }
    }

    return bestCandidateSize;
}


const getSizeOfDirAndChillun = (directory: Directory): number => {
    let totalSize = directory.size;

    directory.children.forEach(child => {
        const childSize = getSizeOfDirAndChillun(child);
        totalSize += childSize
    })

    return totalSize;
}

const incrementSize = (currentDirName: string, fileLine: string, folderStructure: Map<string, Directory>) => {
    const directory = folderStructure.get(currentDirName)
    directory.size += +fileLine.split(' ')[0];
}

const isDir = (line: string): boolean => {
    return _.startsWith(line, 'dir');
}

const isCdCommand = (line: string): boolean => {
    return _.startsWith(line, '$ cd');
}

const isLsCommand = (line: string): boolean => {
    return _.startsWith(line, '$ ls');
}

const getUpdatedCurrentDir = (currentDirName: string, cdCommand: string, folderStructure: Map<string, Directory>): string => {
    let updatedCurrentDirName = 'INVALID DIR'
    const currentDirectory = folderStructure.get(currentDirName)

    const dirArgument = cdCommand.split(' ')[2];
    switch (dirArgument) {
        case '/':
            updatedCurrentDirName = dirArgument
            folderStructure.set(updatedCurrentDirName, new Directory(currentDirectory, updatedCurrentDirName))
            break;
        case '..':
            updatedCurrentDirName = currentDirectory.parent.name;
            break;
        default:
            let childPath = ''
            if(currentDirName == '/'){
                childPath = currentDirName + dirArgument;
            }
            else {
                childPath = currentDirName + '/' + dirArgument
            }
            const childDirectory = new Directory(currentDirectory, childPath)
            folderStructure.set(childPath, childDirectory)
            currentDirectory.children.push(childDirectory)
            updatedCurrentDirName = childPath;
            break;
    }
    return updatedCurrentDirName;
}

const parseInput = (inputPath: string): string[] => {
    const file = readFileSync(inputPath, 'utf-8');

    const values = file.split('\r\n');

    return values;
}