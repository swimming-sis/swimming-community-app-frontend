import {create} from 'zustand';

// 1주일의 밀리초
const ONE_DAY = 24 * 60 * 60 * 1000;
// const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

const useCalendarStore = create((set) => ({
  selectedDate: null,
  thisWeek: [],
  thisMonth: [],

  setSelectedDate: (date) => set({ selectedDate: date }),

  setThisWeek: () => {
    const now = new Date();
    const startOfWeek = now.getTime() - now.getDay() * ONE_DAY;

    const week = [...Array(7)].map((_, i) => {
      const day = new Date(startOfWeek + i * ONE_DAY);
      return day.toISOString().split('T')[0]; // YYYY-MM-DD 형식
    });

    set({ thisWeek: week });
  },

  setThisMonth: () => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    let arr = [];

    for (let dt = new Date(monthStart); dt <= monthEnd; dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }

    let formattedDates = arr.map((date) => date.toISOString().split('T')[0]);

    set({ thisMonth: formattedDates });
  },
}));

export default useCalendarStore;
