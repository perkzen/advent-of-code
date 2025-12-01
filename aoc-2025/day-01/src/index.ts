import 'dotenv/config';
import { openai } from '@ai-sdk/openai';
import { generateText, stepCountIs } from 'ai';
import { z } from 'zod';
import { writeFileTool } from './tools/write-file-tool';
import { runDockerTool } from './tools/run-docker-tool';
import { generateSystemPrompt } from './system-prompt';

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

  const systemPrompt = await generateSystemPrompt(part);

  console.log(`Solving Advent of Code Day 1, Part ${part}...`);

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
