import { Hono } from 'hono';
import { unsplash } from '@/lib/unsplash';
import { verifyAuth } from '@hono/auth-js';

const DEFAULT_COUNT = 26;
const DEFAULT_COLLECTION_IDS = ['317099'];

const app = new Hono().get('/', verifyAuth(), async (c) => {
  const images = await unsplash.photos.getRandom({
    count: DEFAULT_COUNT,
    collectionIds: DEFAULT_COLLECTION_IDS,
  });

  if (images.errors) {
    return c.json({ errors: images.errors }, 400);
  }

  const response = Array.isArray(images.response)
    ? images.response
    : [images.response];

  return c.json({ data: { images: response } });
});

export default app;
