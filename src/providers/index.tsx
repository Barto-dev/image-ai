'use client';

import { ReactNode } from 'react';
import { QueryProvider } from './query';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return <QueryProvider>{children}</QueryProvider>;
};
