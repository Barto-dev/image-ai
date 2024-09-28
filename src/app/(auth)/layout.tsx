import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="bg-[url(/bg.jpg)] bg-no-repeat bg-center bg-cover h-full w-full center">
      <div className="max-w-96 z-10">{children}</div>
      <div className="fixed inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.6),rgba(0,0,0,0.1),rgba(0,0,0,0.6))]" />
    </div>
  );
};

export default AuthLayout;
