import { describe, it } from 'node:test';
import assert from 'node:assert';
import { partOne, partTwo } from './solve';

describe('Day 3', () => {
  const input = `987654321111111
811111111111119
234234234234278
818181911112111`;

  it('it should solve part 1', () => {
    const result = partOne(input);
    assert.strictEqual(result, 357);
  });

  it('it should solve part 2', () => {
    const result = partTwo(input);
    assert.strictEqual(result, 3121910778619);
  });
});
