import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { replicate } from '@/lib/replicate';

const removeBgValidator = zValidator(
  'json',
  z.object({
    image: z.string(),
  }),
);

const generateValidator = zValidator(
  'json',
  z.object({
    prompt: z.string(),
  }),
);

const app = new Hono()
  .post('/remove-bg', removeBgValidator, async (c) => {
    const { image } = c.req.valid('json');

    const input = {
      image,
    };

    const output: unknown = await replicate.run(
      'lucataco/remove-bg:95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1',
      { input },
    );
    return c.json({ data: output as string });
  })
  .post('/generate', generateValidator, async (c) => {
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
