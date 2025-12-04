import * as fs from 'node:fs';
import * as path from 'node:path';
import * as process from 'node:process';

type Digits = {
  value: number;
  originalIndex: number;
};

function findBiggestCombination(numbers: number[], size: number): number {
  const digits: Digits[] = numbers
    .map((num, index) => ({
      value: num,
      originalIndex: index,
    }))
    .sort((a, b) => {
      return b.value - a.value;
    });

  const res = new Set<Digits>();
  let lastAdded = { value: -1, originalIndex: -1 };
  let sum = 0;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < digits.length; j++) {
      if (digits[j].originalIndex === digits.length - 1 && res.size === 0)
        continue;
      if (lastAdded.originalIndex > digits[j].originalIndex) continue;
      if (res.has(digits[j])) continue;
      res.add(digits[j]);
      lastAdded = digits[j];
      sum += digits[j].value * 10 ** (size - 1 - i);
      break;
    }
  }
  console.log(sum);

  return sum;
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
  // const inputPath = path.join(process.cwd(), '..', 'inputs', 'day-03.txt');
  // const input = fs.readFileSync(inputPath, 'utf-8');
  const input = `987654321111111
811111111111119
234234234234278
818181911112111`;

  console.log('Part 1:', partOne(input));
  console.log('Part 2:', partTwo(input));
}

solve();
