// import Map from "@/components/Map"
import MapComponent from '@/components/MapComponent';
import RootLayout from '@/layout/RootLayout';
import useMapStore from '@/zustand/useMapStore';
import { useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

function PoolSearch() {

  const {  keyword, setKeyword } = useMapStore();
  const handleSearch = (e) => {
    e.preventDefault();
    const value = document.querySelector('input[name="search"]').value;
    setKeyword(value);
    console.log(keyword);
  };
  useEffect(()=>{
    setKeyword();
    console.log();
    
  },[keyword])

  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto font-pretendard h-screen overflow-y-scroll mb-20">
      <Helmet>
        <title className="sr-only">전국 수영장 검색하기</title>
      </Helmet>
      <RootLayout type="search" onSubmit={handleSearch} />
      <div className="flex flex-col gap-y-4 text-sm mt-14">
        <MapComponent />
        <ul>
          <Outlet/>
        </ul>
      </div>
    </div>
  );
}
export default PoolSearch;
