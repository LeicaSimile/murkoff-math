import { settings } from "./conf.ts";


function randomInt(min: number, max: number) : number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


class MathPuzzle {
    private startNum: number;
    private targetNum: number;
    public solution: number[];

    public constructor() {
        this.startNum = this.genStartNum();
        this.targetNum = this.genTargetNum();
        this.solution = this.genSolution();
        console.log(`Start: ${this.startNum}`)
        console.log(`Target: ${this.targetNum}`)
    }

    private genStartNum() : number {
        return randomInt(settings.startMin, settings.startMax);
    }

    private genTargetNum() : number {
        const minDiff = settings.targetDiffMin;
        const maxDiff = settings.targetDiffMax;
        let minTarget = settings.targetMin;
        let maxTarget = settings.targetMax;
        const startNum = this.startNum;
        let targetNum = startNum;

        let lowDiff = startNum - minTarget;
        if (lowDiff > maxDiff) {
            lowDiff = maxDiff;
        }
        let highDiff = maxTarget - startNum;
        if (highDiff > maxDiff) {
            highDiff = maxDiff;
        }

        minTarget = startNum - lowDiff;
        maxTarget = startNum + highDiff;
        const lowMin = startNum - minDiff;
        const highMin = startNum + minDiff;
        while (lowMin < targetNum && targetNum < highMin) {
            targetNum = randomInt(minTarget, maxTarget);
        }
        return targetNum;
    }

    public allSolutions(startNum?: number, targetNum?: number) {
        /* Returns an array of two integers that result in the targetNum
        when added to startNum.

        These two integers must be unique from each other (e.g. can't be 2 and 2)
        and cannot be zero (0).
        */
        startNum = startNum || this.startNum;
        targetNum = targetNum || this.targetNum;
        const diff = targetNum - startNum;
        const minValve = settings.valveMin;
        const maxValve = settings.valveMax;

        let i: number;
        let j: number;
        let absI: number;
        let absJ: number;
        let solutions: Map<number,number> = new Map();
        // TODO: optimize
        for (i = -maxValve; i < maxValve; i++) {
            j = diff - i;
            if (solutions.has(j)) {
                break;
            }
            absI = Math.abs(i);
            absJ = Math.abs(j);
            if (
                minValve <= absJ && absJ <= maxValve
                && minValve <= absI
                && absI != absJ
            ) {
                solutions.set(i, j);
            }
        }

        return solutions;
    }

    private genSolution() : number[] {
        const solutions = this.allSolutions();
        const keys = solutions.keys().toArray();
        const k = keys[randomInt(0, keys.length)] || 0;
        const kk = solutions.get(k) || 0;
        const s = [k, kk];
        return s;
    }
}

let x = new MathPuzzle();
/*
start: 105
target: 119
diff: 14

start: 73
target: 68
diff: -5
*/