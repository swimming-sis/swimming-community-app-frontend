import Account from "@/components/Icon/Account"
import Logo from "@/components/Logo"
import MyCalendar from "@/components/MyCalendar"
import Nav from "@/layout/Nav"


function Main() {
  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto px-[10px] font-pretendard h-screen overflow-y-scroll mb-20">
      <h1 className="sr-only">메인 페이지</h1>
      <header
      className="relative">
        <Logo width={100} height={50} className={'my-2.5'} />
        <Account className="absolute top-3 right-6"/>
      </header>
      <MyCalendar />
      <h2 className="text-secondary font-semibold mt-6 ml-4 font-pretendard">우리들의 수영 이야기</h2>
      <ol className="font-pretendard text-secondary text-xs border py-4 px-2 m-2.5 rounded-2xl shadow-md">
        <li className="list-disc ml-4">
          <a href="" className="flex justify-between py-0.5">
            <p>최근 게시글</p>
            <time dateTime="2023-09-05">2023.09.05.</time>
          </a>
        </li>
        <li className="list-disc ml-4">
          <a href="" className="flex justify-between py-0.5">
            <p>최근 게시글</p>
            <time dateTime="2023-09-05">2023.09.05.</time>
          </a>
        </li>
        <li className="list-disc ml-4">
          <a href="" className="flex justify-between py-0.5">
            <p>최근 게시글</p>
            <time dateTime="2023-09-05">2023.09.05.</time>
          </a>
        </li>
        <li className="list-disc ml-4">
          <a href="" className="flex justify-between py-0.5">
            <p>최근 게시글</p>
            <time dateTime="2023-09-05">2023.09.05.</time>
          </a>
        </li>
        <li className="list-disc ml-4">
          <a href="" className="flex justify-between py-0.5">
            <p>최근 게시글</p>
            <time dateTime="2023-09-05">2023.09.05.</time>
          </a>
        </li>
      </ol>
      <Nav />
    </div>
  )
}

export default Main