'use client';

import { useSearchParams } from 'next/navigation';
import { useFailModal } from '@/features/subscriptions/store/useFailModal';
import { useEffect } from 'react';
import { useSuccessModal } from '@/features/subscriptions/store/useSuccessModal';

export const SubscriptionAlert = () => {
  const params = useSearchParams();
  const canceled = params.get('canceled');
  const success = params.get('success');

  const onOpenFail = useFailModal.use.onOpen();
  const onOpenSuccess = useSuccessModal.use.onOpen();

  useEffect(() => {
    if (canceled) {
      onOpenFail();
    }

    if (success) {
      onOpenSuccess();
    }
  }, [canceled, onOpenFail, onOpenSuccess, success]);

  return null;
};
