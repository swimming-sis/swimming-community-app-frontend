// import Map from "@/components/Map"
import PoolList from "@/components/PoolList"
import RootLayout from "@/layout/RootLayout"
import PoolMap from '../../components/PoolMap';


function PoolSearch() {
  return (
    <>
    <h1 className="sr-only">전국 수영장 검색하기</h1>
    <RootLayout condition="search" />
    <ul className="flex flex-col gap-y-4 font-pretendard text-sm mt-14">
    {/* <Map /> */}
    <PoolMap />
    <PoolList/>
    </ul>
    </>

  )
}
export default PoolSearch