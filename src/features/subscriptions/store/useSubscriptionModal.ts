import { create, StateCreator } from 'zustand';
import { createSelectors } from '@/features/subscriptions/store/utils';
import { immer } from 'zustand/middleware/immer';

type SubscriptionModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const subscriptionModalSlice: StateCreator<SubscriptionModalState> = (set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
});

export const useSubscriptionModal = createSelectors(
  create(immer(subscriptionModalSlice)),
);
