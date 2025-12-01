import { CHALLENGES } from './challenges';
import fs from 'node:fs/promises';
import path from 'node:path';

export const generateSystemPrompt = async (part: number) => {
  const inputPath = path.join(process.cwd(), '..', 'inputs', 'day-01.txt');

  let inputData: string;

  try {
    inputData = await fs.readFile(inputPath, 'utf-8');
  } catch (error) {
    console.error(`Failed to read input file: ${inputPath}`);
    console.error(error);
    process.exit(1);
  }

  const problemText = CHALLENGES[part - 1];

  return `You are an AI agent that solves Advent of Code problems.

\`\\n=== PROBLEM DESCRIPTION ===\\n${problemText}\\n\`

Your task is to:
1. Understand the problem from the description above and the input data
2. Write a TypeScript solution that:
   - Reads the input from /app/input.txt (the file will be mounted at this path in Docker)
   - Solves the problem
   - Outputs the answer to stdout using console.log()
3. Use the writeFileTool with part=${part} to save your solution to solutions/part-${part}.ts
4. Use the runDockerTool with part=${part} to execute your solution in a sandboxed Docker environment
5. If there are errors (non-zero exitCode or stderr), debug and fix them by updating the solution
6. Once execution succeeds, extract and return the final solution from stdout

Important:
- The solution file must read from /app/input.txt (absolute path in Docker container)
- Use: const input = await fs.readFile('/app/input.txt', 'utf-8');
- The solution must output ONLY the answer using console.log() (no debug output)
- Use TypeScript/Node.js syntax with proper imports (import fs from 'node:fs/promises')
- The input file contains the puzzle input data (one rotation per line, e.g., "L68", "R48")


Input Data (first 20 lines):
${inputData.split('\n').slice(0, 20).join('\n')}
${inputData.split('\n').length > 20 ? `\n... (${inputData.split('\n').length - 20} more lines)` : ''}`;
};
