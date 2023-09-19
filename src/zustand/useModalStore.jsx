import { create } from 'zustand';

const useModalStore = create(set => ({
  isOpen: false,
  actionType: null,
  openModal: (actionType) => set({ isOpen: true , actionType }),
  closeModal: () => set({ isOpen: false, actionType:null }),
}));

export default useModalStore;