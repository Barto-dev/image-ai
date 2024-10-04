import { useSubscriptionModal } from '@/features/subscriptions/store/useSubscriptionModal';

export const usePaywall = () => {
  const openSubscribeModal = useSubscriptionModal.use.onOpen();
  const shouldBlock = true; // Fetch from API

  return {
    isLoading: false, // Fetch from API
    shouldBlock,
    triggerPaywall: openSubscribeModal,
  };
};
