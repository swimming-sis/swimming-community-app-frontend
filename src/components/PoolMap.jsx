import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useState, useEffect, useRef } from 'react';
import Location from './Icon/Location';
import PoolMarker from './Icon/PoolMarker';
import Circle from './Icon/Circle';
import propTypes from 'prop-types';
import Plus from './Icon/Plus';
import Minus from './Icon/Minus';
import useMapStore from '@/zustand/useMapStore';


function PoolMap() {
  const keyword = useMapStore((state) => state.keyword);
  // const setKeyword = useMapStore((state) => state.setKeyword);
  const mapRef = useRef();
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
  });

  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(10);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState(() => ({
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState(
            () => (
              {
                errMsg: err.message,
                isLoading: false,
              },
              { enableHighAccuracy: true }
            )
          );
        }
      );
    } else {
      alert('현재 위치를 표시할 수 없어요');
    }
  }, []);



  useEffect(() => {
    if (!map) return;
    const ps = new window.kakao.maps.services.Places();
    const searchPool =(data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        let minLat = Infinity,
          maxLat = -Infinity;
        let minLng = Infinity,
          maxLng = -Infinity;

        let markers = data.map(
          (place) => {
            const lat = parseFloat(place.y);
            const lng = parseFloat(place.x);

            minLat = Math.min(minLat, lat);
            maxLat = Math.max(maxLat, lat);
            minLng = Math.min(minLng, lng);
            maxLng = Math.max(maxLng, lng);

            return {
              position: {
                lat: lat,
                lng: lng,
              },
              poolName: place.place_name,
              poolPhoneNumber: place.phone,
              poolAddress: place.road_address_name,
            };
          }
        );

        setMarkers(markers);
        console.log(markers);
        const avgLat = (minLat + maxLat) / 2;
        const avgLng = (minLng + maxLng) / 2;

        setState((prevState) => ({
          ...prevState,
          center: { lat: avgLat, lng: avgLng },
        }));
        console.log(state.center);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
      }
    }
    // const options = {
    //   location: state.center, // 중심 좌표
    //   radius: 10000, // 검색 반경 (미터 단위)
    //   sort: window.kakao.maps.services.SortBy.DISTANCE, // 결과 정렬 방식
    // };
    ps.keywordSearch(keyword, searchPool);
  }, [map]);

  return (
    <div className="relative">
      <Map
        ref={mapRef}
        center={state.center}
        level={zoomLevel}
        className="w-[calc(100%-20px)] h-[200px] mx-auto rounded-3xl">
        {!state.isLoading && (
          <CustomOverlayMap position={state.center} yAnchor={-0.5}>
            <Circle />
          </CustomOverlayMap>
        )}
        {markers.map((markers) => (
          <CustomOverlayMap
            key={`marker-${markers.content}-${markers.position.lat},${markers.position.lng}`}
            position={markers.position}
            clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            // onClick={() => setIsOpen(true)}
            xAnchor={0.3}
            yAnchor={0.91}>
            <PoolMarker />
          </CustomOverlayMap>
        ))}
      </Map>
      <div className="absolute z-10 right-6 top-2">
        <button
          type="button"
          className="relative border bg-white shadow-sm w-7 h-7 rounded-md"
          onClick={() => setMap(!map)}>
          <Location className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'} />
        </button>
      </div>
      <button
        type="submit"
        onClick={() => setMap(!map)}
        className=" absolute px-4 py-2  bg-primary text-white font-semibold font-prestige shadow-md rounded-full z-10 top-2 left-5">
        주변 수영장 검색하기
      </button>
      <div className="flex flex-col absolute bottom-4 right-6 z-10">
        <button
          className="w-7 h-7 px-0.5 text-gray/600 text-center border bg-white rounded-t-md shadow-sm font-semibold text-xl"
          onClick={() => setZoomLevel(zoomLevel + 1)}>
          <Minus className="mx-auto" />
        </button>
        <button
          className="w-7 h-7 px-0.5 text-gray/600 text-center border bg-white rounded-b-md shadow-sm font-semibold text-xl"
          onClick={() => setZoomLevel(zoomLevel - 1)}>
          <Plus className="mx-auto" />
        </button>
      </div>
    </div>
  );
}
PoolMap.propTypes = {
  value: propTypes.string,
};
export default PoolMap;
