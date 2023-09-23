import LogList from '@/components/LogList';
import useFetchData from '@/hooks/useFetchData';
import { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

function MyLogList() {
  let { date } = useParams();
  const [logData, setLogdata] = useState(null);
  const { data: fetchLogData } = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/logs/${date}`
  );

  useEffect(() => {
    if (fetchLogData?.resultCode === 'SUCCESS') {
      setLogdata(fetchLogData.result.content);
    }
  }, [fetchLogData?.result]);

  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto px-[10px] font-pretendard mb-20 mt-6">
      <Helmet>
        <title>수영일지</title>
      </Helmet>
      <h2 className="ml-4 font-semibold">운동기록</h2>
      {logData && logData.map((log) => (
        <LogList
          key={log.logId}
          id={log.date}
          onClick={() => {}}
          distance={log.distance}
          calory={log.calorie}
          time={log.time}
          contents={log.contents}
        />
      ))}
    </div>
  );
}
export default MyLogList;
