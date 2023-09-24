import { useState, useEffect } from 'react';
import moment from 'moment';
import Direction from './Icon/Direction';
import SwimmingKickBoard from './Icon/SwimmingKickBoard';
import propTypes from 'prop-types';
import { useCallback } from 'react';
import useFetchData from '@/hooks/useFetchData';

function MyCalendar({ onClick,disabled=false }) {
  const [currentMonth, setCurrentMonth] = useState([]);
  const [monthOffset, setMonthOffset] = useState(0);
  const [holidays, setHolidays] = useState({});
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [logData, setLogdata] = useState([]);
  const { data: fetchLogData } = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/logs`
  );
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'TUR', 'FRI', 'SAT'];

  // 일지에서 날짜데이터를 추출하기위한 배열받아오기
  useEffect(() => {
    if (fetchLogData?.resultCode === 'SUCCESS') {
      const initLogData = fetchLogData.result.content;
      const formattedDate = initLogData.map(log => {
        return moment(log.date).format('YYYY-MM-DD');
        // console.log(formattedDate);
      });
      setLogdata(formattedDate)
    }
  }, [fetchLogData?.result]);


  // moment.js로 날짜정보 받아와서 배열에 담기
  useEffect(() => {
    let today = () => moment().format('YYYY-MM-DD');
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
        //isMatch:logData.map((value) => value === date.dateInfo)
      });
    }

    setCurrentMonth(monthArr);

    // Google Calendar API(휴일정보를 가져오기위한 구글캘린더 API)
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
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('API 요청 실패');
        }
      })
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
  }, [monthOffset]);

  //원래는 하단에 map함수내부에 위치했었는데 상위컴포넌트에서 클릭시 날짜정보를 받아오기위한 핸들러입니다
  const handleClickDateButton = useCallback(
    (e) => {
      const dateInfo = e.currentTarget.getAttribute('data-log-id');

      if (dateInfo !== '') {
        setSelectedDate(dateInfo);
        onClick(e);
      }
    },
    [selectedDate]
  );

  return (
    <div className="border shadow-md rounded-2xl mx-2.5 pb-3">
      <div className="flex justify-between items-center  p-2 border-b">
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
          disabled={disabled}
          aria-label="이전 달">
          <Direction />
        </button>
        <button
         disabled={disabled}
          onClick={() => setMonthOffset(monthOffset + 1)}
          className="py-1 px-3 rounded order-3"
          aria-label="다음 달">
          <Direction direction={false} />
        </button>
      </div>
      <div className={`grid grid-cols-7 gap-0.5 text-xs font-semibold pt-2 px-4`}>
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={`text-center h-6 ${day === 'SUN' ? 'text-error' : 'text-primary'}`}>
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-xs py-0 px-4 text-secondary">
  {currentMonth.map((day, index) => (
    day.date === ''
      ? <div key={index} />
      : <button
          disabled={disabled}
          key={index}
          data-log-id={day.dateInfo}
          type="button"
          onClick={handleClickDateButton}
          aria-label={logData.some((log) => log === day.dateInfo)
            ? `${day.a11y} 작성된 일지가 있습니다`
            : `${day.a11y}`
          }
          className={`text-center w-full h-12 items-start rounded-lg hover:bg-quaternary
            ${day.isToday ? 'border-2 border-primary text-primary font-semibold' : ''}
            ${
              selectedDate === day.dateInfo
              ? 'border-2 border-primary text-primary bg-quaternary font-semibold'
              : ''
            }
            ${holidays[day.dateInfo] ? 'text-error' : ''}
            ${day.dayOfWeek === 'sun' ? 'text-error' : ''}`}
        >
        {day.date}

        {logData.some((log) => log === day.dateInfo)
          ? <SwimmingKickBoard color="#0086FF" />
          : <SwimmingKickBoard color="none" />
        }
      </button>
  ))}
</div>
</div>

  );
}
MyCalendar.propTypes = {
  onClick: propTypes.func,
  disabled: propTypes.bool,
};
export default MyCalendar;
