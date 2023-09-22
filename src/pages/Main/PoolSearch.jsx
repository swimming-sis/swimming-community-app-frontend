// import Map from "@/components/Map"
import MapComponent from '@/components/MapComponent';
import RootLayout from '@/layout/RootLayout';
// import debounce from '@/utils/debounce';
import useMapStore from '@/zustand/useMapStore';


import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

function PoolSearch() {

  const {  keyword, value, setValue, mixKeyword,  } = useMapStore();

  const handleSearch = (e) => {
    e.preventDefault()

    mixKeyword(keyword,value)
  
  };
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleTextClear = () => {
    setValue('');
  };


  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto font-pretendard h-screen overflow-y-scroll mb-20">
      <Helmet>
        <title className="sr-only">전국 수영장 검색하기</title>
      </Helmet>
      <RootLayout type="search" onSubmit={handleSearch} onClick={handleTextClear} onChange={handleChange} value={value}/>
      <div className="flex flex-col gap-y-4 text-sm mt-14">
        <MapComponent />
        <>
          <Outlet/>
        </>
      </div>
    </div>
  );
}
export default PoolSearch;
