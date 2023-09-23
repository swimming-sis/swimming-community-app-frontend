import DatePickerMonth from '@/components/DatePickerMonth';
import LogSearchList from '@/components/LogSearchList';
import useFetchData from '@/hooks/useFetchData';
import 'moment/locale/ko'
import moment from 'moment';
import { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

function MyLogSearchYear() {
  const [currentYear, setCurrentYear] = useState(moment());
  const [formState, setFormState] = useState({
    calorie:0,
    distance:0,
    time:0,
  })
  const { data: fetchLogData } = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/logs`
  );

  const handleChangeMonth = (e) =>{
    setCurrentYear(e)
  }
  useEffect(() => {
    if (fetchLogData?.resultCode === 'SUCCESS') {
      const initLogData = fetchLogData.result.content;
      const formattedDate = initLogData.map((log) => {
        return { ...log, date: moment(log.date).format('YYYY') };
      });
      const filteredArr = formattedDate.filter(item => item.date.startsWith(currentYear.format('YYYY')));
      const sum = filteredArr.reduce((acc, cur) => {
        return {
            distanceSum : acc.distanceSum + cur.distance,
            calorieSum : acc.calorieSum + cur.calorie,
            timeSum : acc.timeSum + cur.time
        };
    }, {distanceSum :0 ,calorieSum :0 ,timeSum :0 });
    const avg = {
      distanceAvg: filteredArr.length > 0 ? Math.round((sum.distanceSum / filteredArr.length) * 100) / 100 : null,
      calorieAvg: filteredArr.length > 0 ? Math.round((sum.calorieSum / filteredArr.length) * 100) / 100 : null,
      timeAvg: filteredArr.length > 0 ? Math.round((sum.timeSum / filteredArr.length) * 100) / 100 : null
    };
    
  setFormState({
    ...formState,
    distance:avg.distanceAvg,
    calorie:avg.calorieAvg,
    time:avg.timeAvg,
  }) 
    }

  }, [fetchLogData?.result, currentYear]);


  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto px-[10px] font-pretendard pb-20">
      <Helmet>
        <title>수영일지</title>
      </Helmet>
      <div className='mt-6 mb-4'>
        <DatePickerMonth 
        defaultValue={currentYear}
        onChange={handleChangeMonth}/>
      </div>
      {fetchLogData?.resultCode==='SUCCESS' && <LogSearchList distance={formState.distance} calory={formState.calorie} time={formState.time} />}
    </div>
  );
}
export default MyLogSearchYear;
