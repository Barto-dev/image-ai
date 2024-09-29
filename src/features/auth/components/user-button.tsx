'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut, useSession } from 'next-auth/react';
import { CreditCard, Loader, LogOut } from 'lucide-react';

export const UserButton = () => {
  const session = useSession();

  if (session.status === 'loading') {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (session.status === 'unauthenticated' || !session.data) {
    return null;
  }

  const name = session.data.user?.name;
  const avatar = session.data.user?.image;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        {/*TODO: Add icon if user has subscription*/}
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage
            alt={name || 'User'}
            src={avatar || ''}
          />
          <AvatarFallback className="bg-sky-500 font-medium text-white">
            {name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-60"
      >
        <DropdownMenuItem
          disabled={false} // TODO
          onClick={() => {}}
          className="h-10"
        >
          <CreditCard className="size-4 mr-2" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="h-10"
          onClick={() => signOut()}
        >
          <LogOut className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
