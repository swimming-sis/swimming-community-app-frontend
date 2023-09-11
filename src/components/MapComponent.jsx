const {kakao} = window;
import { useEffect,useRef } from "react";
import PoolMarker from './Icon/PoolMarker';


function MapComponent() {
    const mapRef = useRef(null);
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
  
          const mapContainer = mapRef.current;
          const options = {
            center: new window.kakao.maps.LatLng(lat, lon),
            level: 3,
          };
  
          // Create a map instance
          const map = new window.kakao.maps.Map(mapContainer, options);
  
          // Create a Places instance
          const ps = new window.kakao.maps.services.Places();
  
          ps.keywordSearch(
            '수영장',
            (data, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
  
                for (let i=0; i<data.length; i++) {
  
                  const coords = new window.kakao.maps.LatLng(data[i].y, data[i].x);
                  const overlayContent = <PoolMarker/>
                  
                  const overlayOptions =({
                    content: overlayContent,
                    position: coords,
                    yAnchor: 1
                  });
                  var customOverlay = new window.kakao.maps.CustomOverlay(overlayOptions);
                
                customOverlay.setMap(map);
                }
              }
            },
            { location : new kakao.maps.LatLng(lat, lon)}
            );
            
        });
      } else {
        alert('Geolocation이 지원되지 않는 브라우저입니다');
      }
    }, []);
  
return (
  <div
  id="map"
  ref={mapRef}
  className='w-[calc(100%-20px)] h-[200px] mx-auto rounded-xl relative'>
  </div>
)
}
export default MapComponent;
