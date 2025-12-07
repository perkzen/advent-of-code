import * as fs from 'node:fs';

function partOne() {
  const input = fs
    .readFileSync('../inputs/day-07.txt', 'utf8')
    .trim()
    .split('\n')
    .map((line) => line.split(''));

  const start = input[0].indexOf('S');
  let splits = 0;

  // Use a Set to track unique beam positions at each row
  let beams = new Set<number>([start]);

  // Process each row from top to bottom
  for (let i = 1; i < input.length; i++) {
    const nextBeams = new Set<number>();

    // Process each active beam
    for (const beam of beams) {
      // Check if this beam position is valid (within bounds)
      if (beam < 0 || beam >= input[i].length) {
        continue; // Beam goes out of bounds
      }

      if (input[i][beam] === '^') {
        // Beam hits a splitter - split into left and right
        splits++;
        // Add beam to the left (beam - 1)
        if (beam - 1 >= 0) {
          nextBeams.add(beam - 1);
        }
        // Add beam to the right (beam + 1)
        if (beam + 1 < input[i].length) {
          nextBeams.add(beam + 1);
        }
        // Original beam stops (don't add it to nextBeams)
      } else {
        // Beam continues straight down
        nextBeams.add(beam);
      }
    }

    beams = nextBeams;
  }

  console.log('Splits:', splits);
}

function partTwo() {}

function solve() {
  partOne();
}

solve();
