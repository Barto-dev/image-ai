import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

const usersValidator = zValidator(
  'json',
  z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(3),
  }),
);

const app = new Hono().post('/', usersValidator, async (c) => {
  const { name, email, password } = c.req.valid('json');

  const hashedPassword = await bcrypt.hash(password, 12);

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser.length > 0) {
    return c.json({ error: 'User already exists' }, 400);
  }

  await db.insert(users).values({
    email,
    name,
    password: hashedPassword,
  });

  return c.json(null, 200);
});

export default app;
