import * as fs from 'node:fs';

function findBiggestCombination(numbers: number[], size: number): number {
  const chosen: number[] = [];
  const n = numbers.length;
  let start = 0;

  // We need to pick `size` digits
  for (let remaining = size; remaining > 0; remaining--) {
    // Last index we can start from so that there's enough digits left
    const end = n - remaining;

    let maxDigit = -Infinity;
    let maxIndex = start;

    // Find the biggest digit we can take in [start, end]
    for (let i = start; i <= end; i++) {
      if (numbers[i] > maxDigit) {
        maxDigit = numbers[i];
        maxIndex = i;
      }
    }

    chosen.push(maxDigit);
    start = maxIndex + 1; // must keep original order
  }

  // Turn chosen digits into a number
  return chosen.reduce((acc, d) => acc * 10 + d, 0);
}

export function partOne(input: string): number {
  const rows = parseInput(input);
  let sum = 0;

  for (const row of rows) {
    const res = findBiggestCombination(row, 2);
    sum += res;
  }

  return sum;
}

export function partTwo(input: string): number {
  const rows = parseInput(input);
  let sum = 0;

  for (const row of rows) {
    const res = findBiggestCombination(row, 12);
    sum += res;
  }

  return sum;
}

function parseInput(input: string): number[][] {
  return input
    .split('\n')
    .map((line) => line.trim())
    .map((line) => line.split('').map((char) => parseInt(char, 10)));
}

function solve() {
  const input = fs.readFileSync('../../inputs/day-03.txt', 'utf-8');

  console.log('Part 1:', partOne(input));
  console.log('Part 2:', partTwo(input));
}

solve();
