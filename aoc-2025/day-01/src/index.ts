import 'dotenv/config';
import { openai } from '@ai-sdk/openai';
import { generateText, stepCountIs } from 'ai';
import fs from 'node:fs/promises';
import path from 'node:path';
import { z } from 'zod';
import { writeFileTool } from './tools/write-file-tool';
import { runDockerTool } from './tools/run-docker-tool';
import { CHALLENGES } from './challenges';

const ScriptArgsSchema = z.object({
  part: z
    .string()
    .refine((val) => val === '1' || val === '2', {
      message: 'Part must be 1 or 2',
    })
    .transform((val) => parseInt(val, 10)),
});

async function main() {
  const partArg = process.argv[2];

  let part: number;
  try {
    const result = ScriptArgsSchema.parse({ part: partArg });
    part = result.part;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

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

  const systemPrompt = `You are an AI agent that solves Advent of Code problems.

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

  console.log(`Solving Advent of Code Day 1, Part ${part}...`);
  console.log('Generating solution...\n');

  try {
    const { text } = await generateText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      tools: {
        writeFile: writeFileTool,
        runDocker: runDockerTool,
      },
      stopWhen: stepCountIs(10),
      prompt: `Solve the Advent of Code problem for day 1, part ${part}. Write the solution code, execute it in Docker, and return the final answer.`,
    });

    console.log('\n=== Final Result ===');
    console.log(text);
  } catch (error) {
    console.error('Error running agent:');
    console.error(error);
    process.exit(1);
  }
}

main().catch(console.error);
