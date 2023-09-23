import {create} from 'zustand';
import moment from 'moment';

const useCalendarStore = create((set) => ({
  selectedDate: null,
  thisWeek: [],
  thisMonth: [],

  setSelectedDate: (date) => set({ selectedDate: date }),

  setThisWeek: () => {
    const startOfWeek = moment().startOf('week');

    const week = [...Array(7)].map((_, i) => {
      const day = moment(startOfWeek).add(i, 'days');
      return day.format('YYYY-MM-DD'); // YYYY-MM-DD 형식
    });

    set({ thisWeek: week });
  },

  setThisMonth: () => {
    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');

    let arr = [];

    for (let dt = moment(startOfMonth); dt <= endOfMonth; dt.add(1, 'days')) {
      arr.push(moment(dt));
    }

    let formattedDates = arr.map((date) => date.format('YYYY-MM-DD'));

    set({ thisMonth: formattedDates });
  },
}));

export default useCalendarStore;
