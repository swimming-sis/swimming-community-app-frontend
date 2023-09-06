// import style from '@/styles/reviewTagCheckbox.module.css'
import ReviewTagCheckbox from "@/components/ReviewTagCheckbox"


function Home () {
  return(
    <div className="min-w-[320px] max-w-[699px] mx-auto px-[10px] font-pretendard">
      <ReviewTagCheckbox isActive={false} num={1}/>
    </div>
  )
}

export default Home