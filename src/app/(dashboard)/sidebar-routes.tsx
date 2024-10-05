'use client';

import { Button } from '@/components/ui/button';
import { CreditCard, Crown, Home, MessageCircleQuestion } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SidebarItem } from './sidebar-item';
import { usePathname } from 'next/navigation';
import { usePaywall } from '@/features/subscriptions/hooks/usePaywall';
import { useCheckout } from '@/features/subscriptions/api/useCheckout';
import { useBilling } from '@/features/subscriptions/api/useBilling';

export const SidebarRoutes = () => {
  const { shouldBlock, isLoading, triggerPaywall } = usePaywall();
  const upgradeMutation = useCheckout();
  const billingMutation = useBilling();
  const pathName = usePathname();

  const onBillingClick = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }

    billingMutation.mutate();
  };

  return (
    <div className="flex flex-col gap-y-4">
      {shouldBlock && !isLoading && (
        <>
          <div className="px-3">
            <Button
              className="w-full border-none bg-white hover:bg-white hover:opacity-75 transition"
              variant="outline"
              size="lg"
              onClick={() => upgradeMutation.mutate()}
              disabled={upgradeMutation.isPending}
            >
              <Crown className="size-4 mr-2 fill-yellow-500 text-yellow-500" />
              Upgrade to Pro
            </Button>
          </div>
          <div className="px-3">
            <Separator />
          </div>
        </>
      )}
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
          onClick={onBillingClick}
          disabled={billingMutation.isPending}
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
