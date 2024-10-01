'use client';

import { Button } from '@/components/ui/button';
import { CreditCard, Crown, Home, MessageCircleQuestion } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SidebarItem } from './sidebar-item';
import { usePathname } from 'next/navigation';

export const SidebarRoutes = () => {
  const pathName = usePathname();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="px-4">
        <Button
          className="w-full border-none bg-white hover:bg-white hover:opacity-75 transition"
          variant="outline"
          size="lg"
        >
          <Crown className="size-4 mr-2 fill-yellow-500 text-yellow-500" />
          Upgrade to Pro
        </Button>
      </div>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href="/"
          icon={Home}
          label="Home"
          isActive={pathName === '/'}
        />
      </ul>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          icon={CreditCard}
          label="Billing"
          onClick={() => {}}
        />
        <SidebarItem
          href="mailto:support-test@mail.com"
          icon={MessageCircleQuestion}
          label="Get Help"
        />
      </ul>
    </div>
  );
};
