import PoolList from "@/components/PoolList";
import useMapStore from "@/zustand/useMapStore";

const PoolSearchList = () => {
  const { items } = useMapStore();
  
  return (
    <>
      {items[0]?.map((item, index) => ( // 옵셔널 체이닝 연산자를 사용하여 items[0]이 존재하는지 확인합니다.
        <PoolList
          key={index}
          title={item.place_name}
          address={item.road_address_name}
          tel={item.phone}
          link={item.place_url}
          distance={item.distance <1000 ? item.distance+'m': +item.distance/1000+'km'}
        />
      ))}
    </>
  );
};

export default PoolSearchList;
