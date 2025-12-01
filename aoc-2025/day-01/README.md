# Day 1 - Safe Combination

AI agent solution for Advent of Code 2025, Day 1.

## Problem

The Elves need to open a safe with a dial numbered 0-99. The password is the number of times the dial points at 0 after any rotation in the sequence.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up your OpenAI API key:
```bash
echo "OPENAI_API_KEY=your-key-here" > .env
```

3. Ensure Docker is running

## Usage

Solve part 1:
```bash
pnpm script 1
```

Solve part 2:
```bash
pnpm script 2
```

## Project Structure

```
day-01/
├── src/
│   ├── index.ts              # Main agent entry point
│   ├── challenges.ts          # Problem descriptions
│   └── tools/
│       ├── write-file-tool.ts # Tool to write solution files
│       └── run-docker-tool.ts # Tool to execute solutions in Docker
├── solutions/                 # Generated solution files
│   ├── part-1.ts             # Part 1 solution
│   └── part-2.ts             # Part 2 solution
├── inputs/                    # Input files (in parent directory)
└── package.json
```

## How It Works

1. The agent reads the problem description from `src/challenges.ts`
2. Reads the input file from `../inputs/day-01.txt`
3. Uses GPT-4 to generate a TypeScript solution
4. Saves the solution to `solutions/part-1.ts` or `solutions/part-2.ts`
5. Executes the solution in a Docker container
6. Returns the answer
