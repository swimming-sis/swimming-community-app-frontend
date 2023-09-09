import RootLayout from "@/layout/RootLayout"

function PoolSearch() {
  return (
    <>
    <h1 className="sr-only">전국 수영장 검색하기</h1>
    <RootLayout condition="search" />
    <ul>
      <li>
        <p>남구 다목적 체육관</p>
        <p>광주광역시 남구 화산로 110</p>
      </li>
    </ul>
    </>

  )
}
export default PoolSearch