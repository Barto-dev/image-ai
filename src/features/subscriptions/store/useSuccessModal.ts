import { create, StateCreator } from 'zustand';
import { createSelectors } from '@/features/subscriptions/store/utils';
import { immer } from 'zustand/middleware/immer';

type SuccessModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const successModalSlice: StateCreator<SuccessModalState> = (set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
});

export const useSuccessModal = createSelectors(
  create(immer(successModalSlice)),
);
