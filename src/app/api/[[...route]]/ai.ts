import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { replicate } from '@/lib/replicate';

const validator = zValidator(
  'json',
  z.object({
    prompt: z.string(),
  }),
);

const app = new Hono().post('/generate', validator, async (c) => {
  const { prompt } = c.req.valid('json');
  const input = {
    prompt,
    go_fast: true,
    num_outputs: 1,
    aspect_ratio: '1:1',
    output_format: 'jpg',
    output_quality: 80,
  };

  const output = await replicate.run('black-forest-labs/flux-schnell', {
    input,
  });

  const res = output as Array<string>;

  return c.json({ data: res[0] });
});

export default app;
