import MyCalendar from "@/components/MyCalendar"
import RootLayout from "@/layout/RootLayout"
import { useNavigate } from "react-router-dom"

function MyLog() {
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate('/mylog/write')
  }
  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto px-[10px] font-pretendard h-screen overflow-y-scroll mb-20">
      <RootLayout content="수영일지" onClickEdit ={handleEdit} />
      <MyCalendar />
    </div>
  )
}
export default MyLog