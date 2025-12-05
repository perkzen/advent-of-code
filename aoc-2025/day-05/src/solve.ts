import * as fs from 'node:fs';

type Range = [number, number];

function partOne(ranges: Range[], items: number[]) {
  let freshItemCount = 0;

  for (const item of items) {
    for (const [min, max] of ranges) {
      if (item >= min && item <= max) {
        freshItemCount++;
        break;
      }
    }
  }

  console.log(freshItemCount);
}

function partTwo(ranges: [number, number][]) {
  const sortedRanges = ranges.sort((a, b) => a[0] - b[0]);

  while (true) {
    let merged = false;
    for (let i = 0; i < sortedRanges.length - 1; i++) {
      const currRange = sortedRanges[i];
      const nextRange = sortedRanges[i + 1];

      if (currRange[1] >= nextRange[0]) {
        sortedRanges[i] = [currRange[0], Math.max(currRange[1], nextRange[1])];
        sortedRanges.splice(i + 1, 1);
        merged = true;
        break;
      }
    }
    if (!merged) break;
  }

  let total = 0;

  for (const [min, max] of sortedRanges) {
    total += max - min + 1;
  }

  console.log(total);
}

function solve() {
  const [rangesRaw, itemsRaw] = fs
    .readFileSync('../inputs/day-05.txt', 'utf8')
    .split('\n\n');

  const ranges = rangesRaw
    .split('\n')
    .map((line) => line.split('-').map(Number) as Range);
  const items = itemsRaw.split('\n').map(Number);

  partOne(ranges, items);
  partTwo(ranges);
}

solve();
