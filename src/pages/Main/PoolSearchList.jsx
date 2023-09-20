import PoolList from "@/components/PoolList";
import useFetchPostData from "@/hooks/useFetchPostData";
import useMapStore from "@/zustand/useMapStore";
import { useState } from "react";


const PoolSearchList = () => {
  const [ mapState, setMapState ] = useState({
    phone:'',
    placeName:'',
    placeUrl:'',
    uniqueNumber: null,
    roadAddressName: '',
  }) 
  const { items,  } = useMapStore();
  const { fetchData:fetchMapData} = useFetchPostData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/swimmingPools`
  );
// useState(()=>{
// },[handleClick])

const handleClick = async(item)=>{
  const updatedMapState = {
    ...mapState,
    phone:item.phone,
    placeName:item.place_name,
    placeUrl:item.place_url,
    uniqueNumber: item.id,
    roadAddressName: item.road_address_name,
  };

  setMapState(updatedMapState);

  console.log(updatedMapState);
  
  await fetchMapData(updatedMapState);
}
  return (
         <>
        {items[0]?.map((item, index) => (
          <PoolList
            key={index}
            title={item.place_name}
            address={item.road_address_name}
            tel={item.phone}
            link={item.place_url}
            distance={item.distance <1000 ? item.distance+'m': +item.distance/1000+'km'}
            onClick={() => handleClick(item)}
          />
        ))}
      </>

  );
};

export default PoolSearchList;
