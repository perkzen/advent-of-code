import { tool } from 'ai';
import { z } from 'zod';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import fs from 'node:fs/promises';

const execAsync = promisify(exec);

export const runDockerTool = tool({
  description:
    'Run the Advent of Code Node.js solution in Docker and return stdout, stderr, and exitCode.',
  inputSchema: z.object({
    part: z.number().int().min(1).max(2),
  }),
  execute: async ({ part }) => {
    const solutionPath = path.join(
      process.cwd(),
      'solutions',
      `part-${part}.ts`
    );
    const inputPath = path.join(process.cwd(), '..', 'inputs', 'day-01.txt');

    try {
      await fs.access(solutionPath);
      await fs.access(inputPath);
    } catch (error) {
      return {
        stdout: '',
        stderr: `File not found: ${error instanceof Error ? error.message : 'Unknown error'}`,
        exitCode: 1,
      };
    }

    // Get absolute paths for Docker mounts
    const absSolutionPath = path.resolve(solutionPath);
    const absInputPath = path.resolve(inputPath);

    // Docker command to run the solution
    // Mount the solution file and input file at fixed locations
    // Install tsx and run the solution
    // Input file is mounted at /app/input.txt so solution can read it
    const dockerCommand = `docker run --rm -v "${absSolutionPath}:/app/solution.ts" -v "${absInputPath}:/app/input.txt" -w /app node:latest sh -c "npm install -g tsx && tsx solution.ts"`;

    try {
      const { stdout, stderr } = await execAsync(dockerCommand, {
        maxBuffer: 10 * 1024 * 1024, // 10MB buffer
      });

      return {
        stdout,
        stderr,
        exitCode: 0,
      };
    } catch (error: any) {
      return {
        stdout: error.stdout,
        stderr: error.stderr || error.message,
        exitCode: error.code || 1,
      };
    }
  },
});
