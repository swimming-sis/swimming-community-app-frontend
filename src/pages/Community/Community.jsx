import CategoryRadioForm from "@/components/Category/CategoryRadioForm"
// import CommunityList from "@/components/CommunityList"
import SearchInput from "@/components/Input/SearchInput"
import RootLayout from "@/layout/RootLayout"

function Community() {
  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto px-[10px] font-pretendard h-screen overflow-y-scroll mb-20">
      <RootLayout content="커뮤니티" />
      <SearchInput id='seachCommunity' hidden={true} placeholder="검색하고 싶은 내용을 입력해보세요."/>
      <CategoryRadioForm/>
      {/* <ul>
        <CommunityList
        title="자유형이 안돼요 !!!!자유형이 안돼요 !!!!자유형이 안돼요 !!!!자유형이 안돼요 !!!!자유형이 안돼요 !!!!자유형이 안돼요 !!!!"
        content="저 자유형이 잘 안되는데 왜그러는 걸까요? ㅠㅠ
        조금만 해도 숨이 너무 가빠요"
        user='한츄'
        datetime='2023.09.05'/>
      </ul> */}
    </div>
  )
}
export default Community