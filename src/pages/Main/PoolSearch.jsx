// import Map from "@/components/Map"
import PoolList from '@/components/PoolList';
import RootLayout from '@/layout/RootLayout';
import PoolMap from '../../components/PoolMap';

function PoolSearch() {
  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto px-[10px] font-pretendard h-screen overflow-y-scroll mb-20">
      <h1 className="sr-only">전국 수영장 검색하기</h1>
      <RootLayout type ="search" />
      <ul className="flex flex-col gap-y-4 text-sm mt-14">
        <PoolMap />
        <PoolList />
      </ul>
    </div>
  );
}
export default PoolSearch;
