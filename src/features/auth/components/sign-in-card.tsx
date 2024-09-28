'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export const SignInCard = () => {
  const onProviderSignIn = async (provider: 'github' | 'google') => {
    await signIn(provider, { redirectTo: '/' });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-center">Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 px-0 pb-0">
        <div className="grid gap-2.5">
          <Button
            variant="outline"
            size="lg"
            onClick={() => onProviderSignIn('github')}
          >
            <FaGithub className="mr-2 size-5" />
            Continue with GitHub
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => onProviderSignIn('google')}
          >
            <FcGoogle className="mr-2 size-5" />
            Continue with Google
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up">
            <span className="text-sky-600 hover:underline">Sign up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
