import { readFileSync } from 'fs';
import _ from 'lodash';

export function solve8_1(inputPath: string): number {
    const grid = parseGrid(inputPath);

    const result = grid.filter(cell => cell.isVisible()).length;

    return result;
}

export function solve8_2(inputPath: string): number {
    const grid = parseGrid(inputPath);

    const result = _.maxBy(grid, cell => cell.getScenicScore()).getScenicScore();

    return result;
}

const parseGrid = (inputPath: string): GridCell[] => {
    const file = readFileSync(inputPath, 'utf-8');
    const values = file.split('\r\n').reverse();

    const grid: GridCell[] = [];

    for (let yIndex = 0; yIndex < values.length; yIndex++) {
        const rowString = values[yIndex];

        for (let xIndex = 0; xIndex < [...rowString].length; xIndex++) {
            const height = +[...rowString][xIndex];
            grid.push(new GridCell(xIndex, yIndex, height, grid));
        }
    }

    return grid;
}

class GridCell {
    constructor(public xPos: number, public yPos: number, public height: number, private grid: GridCell[]) { }

    public getScenicScore(): number {
        return this.getViewingDistanceUp()
            * this.getViewingDistanceDown()
            * this.getViewingDistanceLeft()
            * this.getViewingDistanceRight()
    }

    public getViewingDistanceUp(): number {
        const gridCellsAbove = this.grid.filter(cell => {
            if (cell.xPos !== this.xPos) return false; // should not be in another column
            if (cell.yPos <= this.yPos) return false; // should not be lower in column
            return true;
        })

        if (!gridCellsAbove.length) return 0;

        // Order cells by yPos ascending
        const orderedGridCellsAbove = gridCellsAbove.sort((cellA, cellB) => cellA.yPos - cellB.yPos);

        return this.getViewDistance(orderedGridCellsAbove)
    }

    public getViewingDistanceDown(): number {
        const gridCellsBelow = this.grid.filter(cell => {
            if (cell.xPos !== this.xPos) return false; // should not be in another column
            if (cell.yPos >= this.yPos) return false; // should not be higher in column
            return true;
        })

        if (!gridCellsBelow.length) return 0;

        // Order cells by yPos descending
        const orderedGridCellsBelow = gridCellsBelow.sort((cellA, cellB) => cellB.yPos - cellA.yPos);

        return this.getViewDistance(orderedGridCellsBelow)
    }

    public getViewingDistanceLeft(): number {
        const gridCellsLeft = this.grid.filter(cell => {
            if (cell.yPos !== this.yPos) return false; // should not be in another row
            if (cell.xPos >= this.xPos) return false; // should not be to the right of cell
            return true;
        })

        if (!gridCellsLeft.length) return 0;

        // Order cells by xPos descending
        const orderedGridCellsLeft = gridCellsLeft.sort((cellA, cellB) => cellB.xPos - cellA.xPos);

        return this.getViewDistance(orderedGridCellsLeft)
    }

    public getViewingDistanceRight(): number {
        const gridCellsRight = this.grid.filter(cell => {
            if (cell.yPos !== this.yPos) return false; // should not be in another row
            if (cell.xPos <= this.xPos) return false; // should not be to the left of cell
            return true;
        })

        if (!gridCellsRight.length) return 0;

        // Order cells by xPos ascending
        const orderedGridCellsRight = gridCellsRight.sort((cellA, cellB) => cellA.xPos - cellB.xPos);

        return this.getViewDistance(orderedGridCellsRight)
    }

    private getViewDistance(orderedCells: GridCell[]): number {
        // Keep counting while trees are lower the current tree
        const lowerTrees = _.takeWhile(orderedCells, cell => cell.height < this.height)

        const isEventuallyBlocked = lowerTrees.length !== orderedCells.length;

        return isEventuallyBlocked ? lowerTrees.length + 1 : lowerTrees.length
    }

    public isVisible(): boolean {
        return this.isVisibleFromTop()
            || this.isVisibleFromBottom()
            || this.isVisibleFromLeft()
            || this.isVisibleFromRight();
    }

    private isVisibleFromTop(): boolean {
        const gridCellsAbove = this.grid.filter(cell => {
            if (cell.xPos !== this.xPos) return false; // should not be in another column
            if (cell.yPos <= this.yPos) return false; // should not be lower in column
            return true;
        })
        if (Math.max(...gridCellsAbove.map(cell => cell.height)) >= this.height) return false;
        return true;
    }

    private isVisibleFromBottom(): boolean {
        const gridCellsBelow = this.grid.filter(cell => {
            if (cell.xPos !== this.xPos) return false; // should not be in another column
            if (cell.yPos >= this.yPos) return false; // should not be higher in column
            return true;
        })
        if (Math.max(...gridCellsBelow.map(cell => cell.height)) >= this.height) return false;
        return true;
    }

    private isVisibleFromLeft(): boolean {
        const gridCellsLeft = this.grid.filter(cell => {
            if (cell.yPos !== this.yPos) return false; // should not be in another row
            if (cell.xPos >= this.xPos) return false; // should not be to the right of cell
            return true;
        })
        if (Math.max(...gridCellsLeft.map(cell => cell.height)) >= this.height) return false;
        return true;
    }

    private isVisibleFromRight(): boolean {
        const gridCellsRight = this.grid.filter(cell => {
            if (cell.yPos !== this.yPos) return false; // should not be in another row
            if (cell.xPos <= this.xPos) return false; // should not be to the left of cell
            return true;
        })
        if (Math.max(...gridCellsRight.map(cell => cell.height)) >= this.height) return false;
        return true;
    }
}
