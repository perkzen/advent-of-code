import fs from 'node:fs';

function solve() {
  const input = fs.readFileSync('../inputs/day-04.txt', 'utf-8');

  const lines = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const rows = lines.length;
  const cols = lines[0].length;

  // Convert each line into an array of chars
  const grid = lines.map((line) => line.split(''));

  const directions = [-1, 0, 1]
    .flatMap((dr) => [-1, 0, 1].map((dc) => [dr, dc] as [number, number]))
    .filter(([dr, dc]) => !(dr === 0 && dc === 0));

  let sum = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== '@') continue;

      let neighborCount = 0;

      for (const [dr, dc] of directions) {
        const nr = r + dr; // neighbor row
        const nc = c + dc; // neighbor column

        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

        if (grid[nr][nc] === '@') {
          neighborCount++;
        }
      }

      if (neighborCount < 4) {
        sum++;
      }
    }
  }
  console.log(sum);
}

solve();

function solve2() {
  const input = fs.readFileSync('../inputs/day-04.txt', 'utf-8');

  // Don't trim each line (that can mess up the grid shape)
  const lines = input.split('\n').filter((line) => line.length > 0); // just drop completely empty lines

  const rows = lines.length;
  const cols = lines[0].length;

  const grid = lines.map((line) => line.split(''));

  // Generate the 8 neighbor directions
  const directions: [number, number][] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      directions.push([dr, dc]);
    }
  }

  let totalRemoved = 0;

  while (true) {
    const rollsToRemove: [number, number][] = [];

    // 1. Find all rolls that are currently accessible
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] !== '@') continue;

        let neighborCount = 0;

        for (const [dr, dc] of directions) {
          const nr = r + dr;
          const nc = c + dc;

          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
          if (grid[nr][nc] === '@') {
            neighborCount++;
          }
        }

        // This roll itself is removable if it has fewer than 4 neighbors
        if (neighborCount < 4) {
          rollsToRemove.push([r, c]);
        }
      }
    }

    // 2. If none can be removed, we’re done
    if (rollsToRemove.length === 0) break;

    // 3. Remove all rolls found in this round (simultaneously)
    for (const [r, c] of rollsToRemove) {
      grid[r][c] = '.';
    }

    // 4. Increase total removed count
    totalRemoved += rollsToRemove.length;
  }

  console.log(totalRemoved);
  return totalRemoved;
}

solve2();
