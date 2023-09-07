import { useState, useEffect } from 'react';
import moment from 'moment';
import Direction from './Icon/Direction';

function MyCalendar() {
  const [currentMonth, setCurrentMonth] = useState([]);
  const [monthOffset, setMonthOffset] = useState(0);
  const [holidays, setHolidays] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'TUR', 'FRI', 'SAT'];
  let today = moment().format('YYYY-MM-DD');

  useEffect(() => {
    let startOfMonth = moment().add(monthOffset, 'months').startOf('month');
    let endOfMonth = moment().add(monthOffset, 'months').endOf('month');
    let monthArr = [];

    for (let i = 0; i < startOfMonth.day(); i++) {
      monthArr.push({
        date: '',
        dateInfo: '',
        daysOfWeek: '',
        isToday: false,
        a11y: '',
      });
    }
    for (let date = startOfMonth; date.isBefore(endOfMonth); date.add(1, 'day')) {
      monthArr.push({
        date: date.format('D'),
        dateInfo: date.format('YYYY-MM-DD'),
        dayOfWeek: date.format('ddd').toLowerCase(),
        isToday: today === date.format('YYYY-MM-DD'),
        a11y: date.format('DD일 MM월 YYYY년'),
      });
    }

    setCurrentMonth(monthArr);

    // Google Calendar API
    const BASE_CALENDAR_URL = 'https://www.googleapis.com/calendar/v3/calendars';
    const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY = 'holiday@group.v.calendar.google.com';
    const API_KEY = import.meta.env.VITE_GOOGLECAL_API_KEY;
    const CALENDAR_REGION = 'ko.south_korea';
    const currentYear = new Date().getFullYear();
    const timeMin = new Date(`${currentYear}-01-01`).toISOString();
    const timeMax = new Date(`${currentYear}-12-31`).toISOString();
    fetch(
      `${BASE_CALENDAR_URL}/${CALENDAR_REGION}%23${BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}`
    )
      .then((response) => response.json())
      .then(
        (response) => {
          const formattedResponse = response.items
            .map(({ summary, start, end }) => ({ summary, start, end }))
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .reduce((map, holiday) => {
              map[holiday.start.date] = holiday.summary;
              return map;
            }, {});
          setHolidays(formattedResponse);
        },
        (err) => console.error(err)
      );
  }, [monthOffset, today]);

  return (
    <div className="w-full border shadow-lg p-2  rounded-2xl">
      <div className="flex justify-between items-center mb-6 mt-4">
        <h2 className="sr-only">캘린더</h2>
        <p
          tabIndex={0}
          className="text-base font-bold text-primary  order-2 self-center"
          aria-hidden="true"
          aria-label={moment().add(monthOffset, 'months').format('YYYY년 MM월')}>
          {moment().add(monthOffset, 'months').format('YYYY.MM.')}
        </p>
        <button
          onClick={() => setMonthOffset(monthOffset - 1)}
          className="mr-2 py-1 px-3 rounded order-1"
          aria-label="이전 달">
          <Direction />
        </button>
        <button
          onClick={() => setMonthOffset(monthOffset + 1)}
          className="py-1 px-3  rounded order-3"
          aria-label="다음 달">
          <Direction direction={false} />
        </button>
      </div>
      <div className={`grid grid-cols-7 gap-1 text-sm font-semibold`}>
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={`text-center h-12 ${day === 'SUN' ? 'text-error' : 'text-primary'}`}>
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 text-sm py-1">
        {currentMonth.map((day, index) => (
          <button
            type="button"
            key={index}
            onClick={() => {
              if (day.date !== '') {
                // Check if the button has a valid day value (not empty)
                setSelectedDate(day.dateInfo);
              }
            }}
            aria-label={day.a11y}
            className={`text-center h-12 items-start rounded-lg hover:bg-quaternary 
           ${day.isToday ? 'border-2 border-primary text-primary font-semibold' : ''}
           ${holidays[day.dateInfo] ? 'text-error' : ''}
           ${day.dayOfWeek === 'sun' ? 'text-error' : ''}
           ${selectedDate === day.dateInfo ? 'bg-primary text-white font-semibold' : ''}
           `}>
            {day.date}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MyCalendar;
