import NextAuth from 'next-auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { z } from 'zod';
import config from './auth.config';

declare module 'next-auth/jwt' {
  interface JWT {
    id: string | undefined;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(config);
