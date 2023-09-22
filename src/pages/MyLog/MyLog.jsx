import MyCalendar from "@/components/MyCalendar"
import RootLayout from "@/layout/RootLayout"
import { useEffect } from "react"
import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"


function MyLog() {
  const navigate = useNavigate()

  const [ date, setDate ] = useState('');
  const handleEdit = () => {
    navigate('/mylog/write')
  }

  const handleCheckDate = (e) =>{
    const selectedDate = e.currentTarget.getAttribute('data-log-id');
    setDate(selectedDate);
    // navigate(`/mylog/${selectedDate}`);
    // console.log(e.currentTarget.getAttribute('data-log-id'));
  }
  useEffect(() => {
    if (date !== '') {
      navigate(`/mylog/${date}`);
    }
  }, []);

  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto px-[10px] font-pretendard h-screen overflow-y-scroll mb-20">
      <RootLayout content="수영일지" onClickEdit ={handleEdit} />
      <MyCalendar onClick={handleCheckDate} />
      <Outlet />
    </div>
  )
}
export default MyLog