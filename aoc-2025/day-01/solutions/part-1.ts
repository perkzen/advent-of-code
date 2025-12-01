import fs from 'node:fs/promises';

interface Rotation {
    direction: string;
    distance: number;
}

const MODULO = 100;

async function main() {
    const input = await fs.readFile('/app/input.txt', 'utf-8');
    const rotations: Rotation[] = input.trim().split('\n').map(line => ({
        direction: line[0],
        distance: parseInt(line.slice(1), 10)
    }));

    let currentPosition = 50;
    let zeroCount = 0;

    for (const rotation of rotations) {
        if (rotation.direction === 'L') {
            currentPosition = (currentPosition - rotation.distance + MODULO) % MODULO;
        } else if (rotation.direction === 'R') {
            currentPosition = (currentPosition + rotation.distance) % MODULO;
        }
        if (currentPosition === 0) {
            zeroCount++;
        }
    }

    console.log(zeroCount);
}

main().catch(err => console.error(err));
