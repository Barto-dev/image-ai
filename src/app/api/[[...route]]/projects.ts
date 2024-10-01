import { Hono } from 'hono';
import { verifyAuth } from '@hono/auth-js';
import { zValidator } from '@hono/zod-validator';
import { projects, projectsInsertSchema } from '@/db/schema';
import { db } from '@/db/drizzle';

const createProjectValidator = zValidator(
  'json',
  projectsInsertSchema.pick({
    name: true,
    json: true,
    height: true,
    width: true,
  }),
);

const app = new Hono().post(
  '/',
  verifyAuth(),
  createProjectValidator,
  async (c) => {
    const auth = c.get('authUser');
    const { name, json, height, width } = c.req.valid('json');

    if (!auth.token?.id) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const data = await db
      .insert(projects)
      .values({
        name,
        json,
        height,
        width,
        userId: auth.token.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    if (!data[0]) {
      return c.json({ error: 'Failed to create project' }, 400);
    }

    return c.json({ data: data[0] });
  },
);

export default app;
