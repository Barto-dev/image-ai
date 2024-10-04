import { Hono } from 'hono';
import { verifyAuth } from '@hono/auth-js';
import { zValidator } from '@hono/zod-validator';
import { projects, projectsInsertSchema } from '@/db/schema';
import { db } from '@/db/drizzle';
import { z } from 'zod';
import { and, asc, desc, eq, ne } from 'drizzle-orm';

const createProjectValidator = zValidator(
  'json',
  projectsInsertSchema.pick({
    name: true,
    json: true,
    height: true,
    width: true,
  }),
);

const getProjectValidator = zValidator('param', z.object({ id: z.string() }));

const updateProjectParamValidator = zValidator(
  'param',
  z.object({ id: z.string() }),
);

const updateProjectBodyValidator = zValidator(
  'json',
  projectsInsertSchema
    .omit({
      id: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    })
    .partial(),
);

const getAllProjectsValidator = zValidator(
  'query',
  z.object({
    page: z.coerce.number(),
    limit: z.coerce.number(),
  }),
);

const duplicateProjectValidator = zValidator(
  'param',
  z.object({ id: z.string() }),
);

const app = new Hono()
  .get('/templates', verifyAuth(), getAllProjectsValidator, async (c) => {
    const { page, limit } = c.req.valid('query');

    const data = await db
      .select()
      .from(projects)
      .where(eq(projects.isTemplate, true))
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(asc(projects.isPro), desc(projects.updatedAt));

    return c.json({ data });
  })
  .delete('/:id', verifyAuth(), getProjectValidator, async (c) => {
    const auth = c.get('authUser');
    const { id } = c.req.valid('param');

    if (!auth.token?.id) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const data = await db
      .delete(projects)
      .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)))
      .returning();

    if (!data[0]) {
      return c.json({ error: 'Project not found' }, 404);
    }

    return c.json({ data: data[0] });
  })
  .post(
    '/:id/duplicate',
    verifyAuth(),
    duplicateProjectValidator,
    async (c) => {
      const auth = c.get('authUser');
      const { id } = c.req.valid('param');

      if (!auth.token?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));

      if (!data[0]) {
        return c.json({ error: 'Project not found' }, 404);
      }

      const [project] = data;

      const duplicate = await db
        .insert(projects)
        .values({
          name: `${project.name} (Copy)`,
          json: project.json,
          height: project.height,
          width: project.width,
          userId: auth.token.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      if (!duplicate[0]) {
        return c.json({ error: 'Failed to duplicate project' }, 400);
      }

      return c.json({ data: duplicate[0] });
    },
  )
  .get('/', verifyAuth(), getAllProjectsValidator, async (c) => {
    const auth = c.get('authUser');
    const { page, limit } = c.req.valid('query');

    if (!auth.token?.id) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const data = await db
      .select()
      .from(projects)
      .where(
        and(eq(projects.userId, auth.token.id), ne(projects.isTemplate, true)),
      )
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(desc(projects.createdAt));

    return c.json({
      data,
      nextPage: data.length === limit ? page + 1 : null,
    });
  })
  .patch(
    '/:id',
    verifyAuth(),
    updateProjectParamValidator,
    updateProjectBodyValidator,
    async (c) => {
      const auth = c.get('authUser');
      const { id } = c.req.valid('param');

      if (!auth.token?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const values = c.req.valid('json');

      const data = await db
        .update(projects)
        .set({
          ...values,
          updatedAt: new Date(),
        })
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)))
        .returning();

      if (!data[0]) {
        return c.json({ error: 'Project not found' }, 404);
      }

      return c.json({ data: data[0] });
    },
  )
  .get('/:id', verifyAuth(), getProjectValidator, async (c) => {
    const auth = c.get('authUser');
    const { id } = c.req.valid('param');

    if (!auth.token?.id) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const data = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));

    if (!data[0]) {
      return c.json({ error: 'Project not found' }, 404);
    }

    return c.json({ data: data[0] });
  })
  .post('/', verifyAuth(), createProjectValidator, async (c) => {
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
  });

export default app;
