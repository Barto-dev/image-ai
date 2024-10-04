'use client';

import { SubscriptionModal } from '@/features/subscriptions/components/subscription-modal';
import { useIsBrowser } from '@/hooks/useIsBrowser';

export const Modals = () => {
  const isBrowser = useIsBrowser();

  if (!isBrowser) {
    return null;
  }

  return (
    <>
      <SubscriptionModal />
    </>
  );
};
