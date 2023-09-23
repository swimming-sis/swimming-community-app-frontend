import LogList from "@/components/LogList"
import useFetchData from "@/hooks/useFetchData";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async"


function MyLogSearch() {
  const [logData, setLogdata] = useState(null);
  const {data:fetchLogData} = useFetchData(`${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/logs`)

  useEffect(()=>{
    if (fetchLogData?.resultCode==="SUCCESS"){
      setLogdata(fetchLogData.result.content)
    }
    console.log(logData);
  },[fetchLogData?.result])


  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto px-[10px] font-pretendard h-screen mb-20">
      <Helmet>
        <title>수영일지</title>
      </Helmet>
      <h2 className='ml-4 font-semibold my-4'>운동기록</h2>
      <LogList
        id={1}
        onClick={() => {}}
        distance={400}
        calory={499}
        time={65}
        contents="자유형 잘하는 방법이 뭘까..나는 왜 안되지..?"
      />
    </div>
  )
}
export default MyLogSearch
