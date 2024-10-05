'use client';

import { SubscriptionModal } from '@/features/subscriptions/components/subscription-modal';
import { useIsBrowser } from '@/hooks/useIsBrowser';
import { FailModal } from '@/features/subscriptions/components/fail-modal';
import { SuccessModal } from '@/features/subscriptions/components/success-modal';

export const Modals = () => {
  const isBrowser = useIsBrowser();

  if (!isBrowser) {
    return null;
  }

  return (
    <>
      <SuccessModal />
      <FailModal />
      <SubscriptionModal />
    </>
  );
};
