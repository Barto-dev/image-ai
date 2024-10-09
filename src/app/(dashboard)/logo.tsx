import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const font = Space_Grotesk({
  weight: ['700'],
  subsets: ['latin'],
});

export const Logo = () => {
  return (
    <Link href="/">
      <span className="flex items-center gap-x-2 hover:opacity-75 transition h-editor-navbar px-4">
        <span className="size-8 relative">
          <Image
            src="/logo.svg"
            alt="Image Alt"
            layout="fill"
          />
        </span>
        <h1 className={cn(font.className, 'text-2xl font-bold')}>
          Lorem Ipsum
        </h1>
      </span>
    </Link>
  );
};
