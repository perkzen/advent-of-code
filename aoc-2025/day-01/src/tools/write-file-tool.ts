import { tool } from 'ai';
import { z } from 'zod';
import fs from 'node:fs/promises';
import path from 'node:path';

export const writeFileTool = tool({
  description:
    'Write or overwrite a file in the project (used for solution files).',
  inputSchema: z.object({
    content: z.string(),
    part: z.number().int().min(1).max(2),
  }),
  execute: async ({ content, part }) => {
    const solutionsDir = path.join(process.cwd(), 'solutions');
    await fs.mkdir(solutionsDir, { recursive: true });
    const filePath = path.join(solutionsDir, `part-${part}.ts`);
    await fs.writeFile(filePath, content, 'utf8');

    return {
      path: filePath,
    };
  },
});
