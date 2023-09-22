import MyCalendar from "@/components/MyCalendar"
import RootLayout from "@/layout/RootLayout"

function MyLog() {
  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto px-[10px] font-pretendard h-screen overflow-y-scroll mb-20">
      <RootLayout content="수영일지"  />
      <MyCalendar />
    </div>
  )
}
export default MyLog