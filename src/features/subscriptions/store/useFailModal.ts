import { create, StateCreator } from 'zustand';
import { createSelectors } from '@/features/subscriptions/store/utils';
import { immer } from 'zustand/middleware/immer';

type FailModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const failModalSlice: StateCreator<FailModalState> = (set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
});

export const useFailModal = createSelectors(create(immer(failModalSlice)));
