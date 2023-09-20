import { create } from 'zustand';

const useMapStore = create((set) => ({
  // 맵 컨테이너 관리
  mapContainer: null,
  setMapContainer: (container) => set(() => ({ mapContainer: container })),

  // 맵 검색 오버레이 관리
  searchCustomOverlay: null,
  setSearchCustomOverlay: (searchCustomOverlay) => set(() => ({  searchCustomOverlay })),

  //맵 렌더링 옵션 관리
  options: {},
  setOptions: (opts) => set((state) => ({ options: { ...state.options, ...opts } })),

  //맵 내부 키워드 관리
  keyword: '수영장',
  value: '',
  setValue: (value) => set(() => ({ value })),
  mixed: '',
  mixKeyword: (keyword, value) =>
    set((state) => {
      let mixed = value.includes(keyword) ? value : `${value} ${keyword}`;
      return { ...state, mixed };
    }),

  //키워드로 받은 리스트관리
  items: [],
  addItem: (item) => {
    set((state) => {
      const updatedItems = [...state.items]; // 기존 배열 복사
      const index = updatedItems.findIndex((existingItem) => existingItem.id === item.id); // 중복 아이템 확인

      if (index === -1) {
        updatedItems.push(item); // 새로운 아이템 추가
      } else {
        updatedItems[index] = item; // 이미 있는 아이템 업데이트
      }

      return { items: updatedItems }; // 상태 업데이트 후 반환
    });
  },

  removeItem: (index) => set((state) => ({ items: state.items.filter((_, i) => i !== index) })),
}));

export default useMapStore;
