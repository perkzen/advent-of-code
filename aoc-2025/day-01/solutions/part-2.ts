import fs from 'node:fs/promises';

async function solve() {
    const input = await fs.readFile('/app/input.txt', 'utf-8');
    const directions = input.trim().split('\n');
    let position = 50;
    let zeroCount = 0;

    for (const direction of directions) {
        const turnDirection = direction[0];
        const magnitude = parseInt(direction.slice(1), 10);
        let steps = magnitude;

        // Simulate rotation and count zeros
        while (steps > 0) {
            if (turnDirection === 'L') {
                position -= 1;
                if (position < 0) {
                    position += 100;
                }
            } else {
                position += 1;
                if (position >= 100) {
                    position -= 100;
                }
            }

            // Count zero when passing through it
            if (position === 0) {
                zeroCount += 1;
            }

            steps -= 1;
        }
    }

    console.log(zeroCount);
}

solve().catch(err => console.error(err));
