import { create } from 'zustand';



const useModalStore = create(set => ({
  isOpen: false,
  actionType: null,
  content:'',
  openModal: (actionType) => set({ isOpen: true , actionType }),
  closeModal: () => set({ isOpen: false, actionType:null }),
  setContent: (content) => set(() => ({ content })),



  //모달 관련 상태 변수 관리
  isEditing: false,
  startEditing: () => set({ isEditing: true }),
  stopEditing: () => set({ isEditing: false }),
}));

export default useModalStore;