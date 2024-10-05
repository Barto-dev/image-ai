import { useSubscriptionModal } from '@/features/subscriptions/store/useSubscriptionModal';
import { useGetSubscription } from '@/features/subscriptions/api/useGetSubscription';

export const usePaywall = () => {
  const { data: subscription, isLoading } = useGetSubscription();
  const openSubscribeModal = useSubscriptionModal.use.onOpen();
  const shouldBlock = !subscription?.data?.active;

  return {
    isLoading,
    shouldBlock,
    triggerPaywall: openSubscribeModal,
  };
};
