import ButtonLog from "@/components/Button/ButtonLog"
import MyCalendar from "@/components/MyCalendar"
import RootLayout from "@/layout/RootLayout"

import { Outlet, useNavigate } from "react-router-dom"


function MyLog() {
  const navigate = useNavigate()


  const handleEdit = () => {
    navigate('/mylog/write')
  }

  const handleCheckDate = (e) =>{
    const selectedDate = e.currentTarget.getAttribute('data-log-id');
    navigate(`/mylog/${selectedDate}`);
  }


  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto px-[10px] font-pretendard h-screen">
      <RootLayout content="수영일지" onClickEdit ={handleEdit} />
      <MyCalendar onClick={handleCheckDate} />
      <div className="flex mt-6 items-center justify-between mr-6">
        <h1 className='ml-4 font-semibold'>운동기록</h1>
        <div className="flex gap-x-1">
          <ButtonLog content="월간" onClick={()=>navigate('/mylog/logs/month')}/>
          <ButtonLog content='연간'onClick={()=>navigate('/mylog/logs/year')}/>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
export default MyLog