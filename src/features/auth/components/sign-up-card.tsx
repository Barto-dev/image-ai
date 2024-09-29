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
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { FormEvent, useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { toast } from 'sonner';
import { TriangleAlert } from 'lucide-react';

export const SignUpCard = () => {
  const mutation = useSignup();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onCredentialsSignUp = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      await mutation.mutateAsync({ name, email, password });
      toast.success('Account created successfully');
      await signIn('credentials', {
        email,
        password,
        redirectTo: '/',
      });
    } catch (error) {}
  };

  const onProviderSignUp = async (provider: 'github' | 'google') => {
    await signIn(provider, { redirectTo: '/' });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-center">Create an account</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!mutation.error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{mutation.error.message}</p>
        </div>
      )}
      <CardContent className="grid gap-4 px-0 pb-0">
        <form
          onSubmit={onCredentialsSignUp}
          className="grid gap-y-2"
        >
          <Input
            disabled={mutation.isPending}
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
            required
          />
          <Input
            disabled={mutation.isPending}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            required
          />
          <Input
            disabled={mutation.isPending}
            autoComplete="new-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            minLength={3}
            required
          />
          <Button
            disabled={mutation.isPending}
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
            onClick={() => onProviderSignUp('github')}
          >
            <FaGithub className="mr-2 size-5" />
            Continue with GitHub
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => onProviderSignUp('google')}
          >
            <FcGoogle className="mr-2 size-5" />
            Continue with Google
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Already have an account?{' '}
          <Link href="/sign-in">
            <span className="text-sky-600 hover:underline">Sign in</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
