import { create } from 'zustand';



const useModalStore = create(set => ({
  isOpen: false,
  actionType: null,
  content:'',
  
  openModal: (actionType) => set({ isOpen: true , actionType }),
  closeModal: () => set({ isOpen: false, actionType:null }),
  setContent: (content) => set(() => ({ content })),
  setActionType: (actionType) => set({ actionType }),
}));

export default useModalStore;