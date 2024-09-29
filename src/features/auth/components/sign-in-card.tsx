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
import { FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useSearchParams } from 'next/navigation';
import { TriangleAlert } from 'lucide-react';

export const SignInCard = () => {
  const params = useSearchParams();
  const error = params.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onCredentialsSignIn = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });
  };

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
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>Invalid email or password</p>
        </div>
      )}
      <CardContent className="grid gap-4 px-0 pb-0">
        <form
          onSubmit={onCredentialsSignIn}
          className="grid gap-y-2"
        >
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            required
          />
          <Input
            autoComplete="current-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            minLength={3}
            required
          />
          <Button
            type="submit"
            size="lg"
          >
            Continue
          </Button>
        </form>
        <Separator className="my-2" />
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
