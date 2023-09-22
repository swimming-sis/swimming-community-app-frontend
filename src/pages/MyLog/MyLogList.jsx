import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

function MyLogList() {
  let {date} =useParams()
  console.log(date);
  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto px-[10px] font-pretendard overflow-y-scroll mb-20 mt-6">
      <Helmet>
        <title>수영일지</title>
      </Helmet>
      <h2 className='ml-4 font-semibold'>운동기록</h2>
      <MyLogList/>
    </div>
  )
}
export default MyLogList