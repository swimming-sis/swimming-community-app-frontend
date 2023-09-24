import { useEffect, useRef, useState } from 'react';
import Minus from './Icon/Minus';
import Plus from './Icon/Plus';
import useMapStore from '@/zustand/useMapStore';
import Location from './Icon/Location';
import '@/styles/map.css';
import { useNavigate } from 'react-router-dom';

const { kakao } = window;

function MapComponent() {
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [customOverlay, setCustomOverlay] = useState(null);
  const [,] = useState(null);
  const mapRef = useRef(null);
  const {
    options,
    setMapContainer,
    setOptions,
    mixed,
    mixKeyword,
    addItem,
    setSearchCustomOverlay,
  } = useMapStore();

  // 초기 지도 렌더링
  useEffect(() => {
    const container = mapRef.current;
    setMapContainer(container);

    const options = {
      center: new kakao.maps.LatLng(37.566535, 126.9779692),
      level: 5,
    };

    setOptions(options);
    const mapInstance = new kakao.maps.Map(container, options);
    setMap(mapInstance);
  }, []);

  // useEffect(() => {
  // if (!mixed ) {
  //     mixKeyword('', '수영장');
  // }
  //   const searchMypage = async () => {
  //     try {

  //       const ps = new kakao.maps.services.Places();
  //       const poolSearch = (data, status) => {
  //         if (status === kakao.maps.services.Status.OK) {
  //           for (let i = 0; i < data.length; i++) {
  //             const coords = new kakao.maps.LatLng(data[i].y, data[i].x);
  //             const overlayContent = /* html */ `
  //                     <figure
  //                     class='mapFigure'>
  //                     <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     width="32" height="32"
  //                     viewBox="0 0 76 76"
  //                     class='mapSvg'
  //                     fill="none">
  //                     <path d="M38.0161 71L27.6237 59H48.4084L38.0161 71Z" fill="#FEB700"/>
  //                     <circle cx="38.0161" cy="31.0001" r="30" fill="#FEB700"/>
  //                     <path d="M22.0161 22.5001L28.0161 18.5001L31.5161 17.5001L33.5161 18.5001L45.0161 34.5001L45.5161 37.0001L39.0161 34.5001H35.0161L30.5161 37.5001H26.0161L22.5161 35.5001L23.0161 34.5001L32.0161 27.0001L33.0161 25.5001L31.0161 23.5001L29.5161 23.0001L23.5161 26.5001H21.0161L20.0161 25.5001L22.0161 22.5001Z" fill="white"/>
  //                     <path d="M23.5161 50.0001L17.5161 43.0001L17.0161 41.5001L21.0161 42.0001L25.0161 44.5001L28.5161 45.5001L37.5161 41.5001L42.5161 43.0001L47.5161 45.5001L51.0161 45.0001L55.0161 42.5001L59.0161 42.0001L58.5161 43.5001L55.0161 48.0001L49.0161 52.0001L39.5161 54.5001L30.5161 53.5001L23.5161 50.0001Z" fill="#0086FF"/>
  //                     <path d="M17.0161 41.5001L15.0161 35.0001H18.5161L22.5161 35.5001L26.5161 38.0001L30.5161 37.5001L35.0161 34.5001H39.0161L43.5161 36.5001L48.0161 37.5001L52.0161 36.5001L56.5161 34.5001L61.5161 35.0001L59.0161 42.0001L55.0161 42.5001L51.0161 45.0001L47.5161 45.5001L42.5161 43.0001L37.5161 41.5001L32.5161 43.5001L28.5161 45.5001L25.0161 44.5001L21.0161 42.0001L17.0161 41.5001Z" fill="#5FB2FD"/>
  //                     <path d="M50.0161 36.5001L48.5161 37.0001L47.0161 36.5001L33.5161 18.0001L30.0161 17.5001L20.0161 23.5001L19.5161 26.0001L21.0161 27.5001L23.0161 27.0001L30.5161 23.0001L32.5161 26.0001L32.0161 26.5001L28.0161 30.0001L22.0161 34.5001L20.0161 35.0001L15.0161 34.5001L14.0161 31.5001L16.5161 20.5001L21.5161 13.5001L30.0161 8.50006L36.5161 7.00006L49.0161 9.50006L56.5161 16.5001L61.5161 24.5001L62.0161 34.0001H59.0161L54.0161 35.0001L50.0161 36.5001Z" fill="#D2EAFF"/>
  //                     <circle cx="49.5161" cy="26.5001" r="4.5" fill="white"/>
  //                     <path d="M47.0161 38.0001C47.0161 38.0001 35.3554 19.6912 33.4398 18.7248C31.5243 17.7584 29.6087 17.7585 28.172 18.7248C26.7353 19.6911 21.5883 23.1567 20.9885 23.5564C20.3886 23.9562 19.9269 24.6518 20.0307 25.4891C20.1143 26.1642 20.403 26.6011 20.9885 26.9386C21.638 27.3131 22.204 27.2884 22.9041 26.9386C23.6041 26.5888 29.4604 23.2053 29.6087 23.0733C29.7569 22.9412 30.2137 22.9477 30.5665 23.0733C31.2023 23.2997 32.9916 25.3984 32.9424 26.0769C32.9119 26.4977 32.482 26.9386 32.482 26.9386L21.9463 35.1523" stroke="black" stroke-width="2.5"/>
  //                     <mask id="path-9-inside-1_175_1092" fill="white">
  //                       <path fill-rule="evenodd" clip-rule="evenodd" d="M34.3742 5.85741C23.9205 7.39918 15.6512 15.3191 13.4357 25.911C13.1013 27.5026 13.0597 27.9814 13.0614 30.7136C13.0496 34.1076 13.2182 35.4031 14.0446 38.1206C16.5518 46.4984 23.209 52.9582 31.6106 55.2061C36.2377 56.4284 41.4091 56.2701 45.9087 54.7603C47.3899 54.2665 49.9888 53.0255 51.2881 52.2079C57.5752 48.2042 61.8478 41.498 62.8075 34.1038C64.4486 21.4139 56.3902 9.49078 44.0606 6.3441C41.2508 5.64175 37.2392 5.43308 34.3742 5.85741ZM20.4167 36.0463C20.8501 36.215 21.675 36.6933 22.2344 37.1014C24.248 38.5788 25.8977 39.1833 27.9383 39.1961C30.0768 39.1947 31.8655 38.6021 33.6257 37.2771C35.3301 35.9945 36.6995 35.5429 38.4187 35.6686C39.8445 35.7803 40.6274 36.0756 42.1375 37.1167C44.4727 38.7207 45.703 39.1565 47.8554 39.1692C50.1197 39.1677 51.559 38.6739 53.7104 37.1093C55.3031 35.9535 56.0577 35.6995 57.9166 35.6983C58.881 35.6836 59.5659 35.7536 59.7477 35.852L60.0553 36.0349L59.7345 37.1195C59.5672 37.7252 59.2323 38.6971 59.0091 39.2747L58.5905 40.3312L57.5422 40.4164C55.362 40.6008 54.0764 41.0805 52.2742 42.4054C50.3463 43.8291 48.6135 44.2808 46.7263 43.8877C45.594 43.649 44.5594 43.1286 43.0073 42.0312C39.861 39.8081 35.5982 39.9516 32.413 42.39C29.591 44.5606 26.572 44.5767 23.7473 42.4519C23.174 42.0157 22.3211 41.4811 21.8597 41.2561C20.881 40.8061 19.1756 40.4269 18.1692 40.4276C17.4844 40.428 17.4564 40.4139 17.2324 39.893C16.7565 38.823 15.9441 36.1337 16.0559 36.0068C16.4889 35.5559 19.1864 35.5823 20.4167 36.0463ZM40.2826 43.2722C40.7859 43.455 41.6248 43.9333 42.1561 44.3132C44.1978 45.8469 45.7775 46.3951 48.0697 46.3796C50.3899 46.3499 51.5496 45.8844 54.4136 43.8265C54.9584 43.4318 56.4956 42.9097 56.887 42.9658C57.1665 43.0079 57.1107 43.1206 56.3147 44.2055C52.8375 48.9396 47.9196 52.0974 42.1759 53.2559C39.9259 53.708 36.1102 53.7104 33.8736 53.2612C30.1832 52.5172 26.9815 51.0546 24.1008 48.8031C22.6605 47.6774 20.5345 45.4255 19.5832 44.046C18.8558 42.9902 18.8418 42.9621 19.1912 42.9618C19.7642 42.9615 21.0225 43.4958 21.9454 44.129C24.5463 45.944 25.6926 46.3658 27.9429 46.3925C30.2072 46.4051 31.8282 45.8408 33.8119 44.3608C34.3288 43.9661 34.9995 43.5573 35.2929 43.4162C36.8439 42.7393 38.6888 42.6958 40.2826 43.2722ZM42.105 8.23248C52.4492 10.1552 60.1702 19.1071 60.5963 29.6972C60.6389 30.7534 60.6397 32.035 60.5702 32.5702L60.5691 32.5812C60.473 33.5139 60.4715 33.5276 60.1095 33.4436C59.8998 33.4015 59.131 33.3175 58.3902 33.2757C56.1678 33.1222 54.0158 33.7996 52.2835 35.1808C51.4174 35.8715 50.4953 36.365 49.6009 36.605C48.6366 36.8591 46.8616 36.818 45.9668 36.5228L45.1979 36.2557L42.7509 34.6096L41.884 34.1313C40.6397 33.4561 39.2558 33.1753 37.5926 33.2609C35.6498 33.3607 34.476 33.7699 32.6878 34.9963C31.8775 35.546 29.9581 36.8007 28.3281 36.8017C28.0207 36.9146 26.3293 36.6481 25.6024 36.3669C25.2109 36.2122 24.358 35.7058 23.7147 35.2414C21.5893 33.6796 19.9257 33.1596 17.5916 33.3019C16.8648 33.3446 16.0962 33.4296 15.8865 33.472C15.5248 33.5564 15.5232 33.5428 15.4122 32.6117L15.4108 32.5992C15.2701 31.191 15.4497 27.8954 15.7561 26.3179C17.6369 16.8248 25.096 9.62354 34.6273 8.11054C36.3463 7.82777 40.3297 7.89563 42.105 8.23248Z"/>
  //                       <path fill-rule="evenodd" clip-rule="evenodd" d="M7.0401 30.129C7.63091 14.2571 19.6708 1.51828 35.4918 0.0575684C36.7636 -0.0559126 41.3342 0.110148 42.6202 0.320568C49.3019 1.40067 54.8944 4.1996 59.5936 8.81581C61.9992 11.1943 63.6638 13.362 65.1471 16.0791C71.766 28.1862 69.8048 43.0169 60.2649 52.9657C57.8066 55.5304 55.1523 57.4896 51.9247 59.1253L50.0663 60.0701L45.105 65.7947C39.7448 71.9772 39.7207 72.005 38.0538 72.0061C37.7158 72.0063 37.4465 72.0071 37.187 71.9565C36.159 71.7561 35.2855 70.7504 30.9076 65.7156L26.0121 60.0855L24.1665 59.1431C20.8389 57.4553 18.2519 55.5417 15.6785 52.8535C9.86015 46.7733 6.73802 38.5509 7.0401 30.129ZM64.6189 20.586C60.867 11.0683 52.3227 4.25758 42.2304 2.71493C40.8885 2.50455 36.9189 2.3381 36.1223 2.45128C35.8987 2.47959 35.1021 2.57868 34.3753 2.66365C33.6486 2.74861 32.293 2.98889 31.3706 3.21481C21.0433 5.68597 12.858 13.8312 10.2929 24.198C6.97498 37.5508 13.3153 51.1509 25.6608 57.2128L27.4923 58.1129L32.4299 63.8134C35.6749 67.5715 37.4792 69.5419 37.7029 69.5981C37.8986 69.6543 38.2061 69.6541 38.3877 69.5977C38.6253 69.5412 40.441 67.5402 43.6673 63.8062L48.5975 58.0994L50.1345 57.3661C58.0011 53.6009 63.6713 46.6684 65.7764 38.2313C67.2402 32.4281 66.8309 26.1755 64.6189 20.586Z"/>
  //                       <path d="M55.3446 26.6971C55.3466 29.8001 52.8517 32.3172 49.772 32.3192C46.6923 32.3212 44.1941 29.8073 44.1921 26.7042C44.1901 23.6012 46.6851 21.084 49.7648 21.0821C52.8444 21.0801 55.3426 23.594 55.3446 26.6971Z"/>
  //                     </mask>
  //                     <path fill-rule="evenodd" clip-rule="evenodd" d="M34.3742 5.85741C23.9205 7.39918 15.6512 15.3191 13.4357 25.911C13.1013 27.5026 13.0597 27.9814 13.0614 30.7136C13.0496 34.1076 13.2182 35.4031 14.0446 38.1206C16.5518 46.4984 23.209 52.9582 31.6106 55.2061C36.2377 56.4284 41.4091 56.2701 45.9087 54.7603C47.3899 54.2665 49.9888 53.0255 51.2881 52.2079C57.5752 48.2042 61.8478 41.498 62.8075 34.1038C64.4486 21.4139 56.3902 9.49078 44.0606 6.3441C41.2508 5.64175 37.2392 5.43308 34.3742 5.85741ZM20.4167 36.0463C20.8501 36.215 21.675 36.6933 22.2344 37.1014C24.248 38.5788 25.8977 39.1833 27.9383 39.1961C30.0768 39.1947 31.8655 38.6021 33.6257 37.2771C35.3301 35.9945 36.6995 35.5429 38.4187 35.6686C39.8445 35.7803 40.6274 36.0756 42.1375 37.1167C44.4727 38.7207 45.703 39.1565 47.8554 39.1692C50.1197 39.1677 51.559 38.6739 53.7104 37.1093C55.3031 35.9535 56.0577 35.6995 57.9166 35.6983C58.881 35.6836 59.5659 35.7536 59.7477 35.852L60.0553 36.0349L59.7345 37.1195C59.5672 37.7252 59.2323 38.6971 59.0091 39.2747L58.5905 40.3312L57.5422 40.4164C55.362 40.6008 54.0764 41.0805 52.2742 42.4054C50.3463 43.8291 48.6135 44.2808 46.7263 43.8877C45.594 43.649 44.5594 43.1286 43.0073 42.0312C39.861 39.8081 35.5982 39.9516 32.413 42.39C29.591 44.5606 26.572 44.5767 23.7473 42.4519C23.174 42.0157 22.3211 41.4811 21.8597 41.2561C20.881 40.8061 19.1756 40.4269 18.1692 40.4276C17.4844 40.428 17.4564 40.4139 17.2324 39.893C16.7565 38.823 15.9441 36.1337 16.0559 36.0068C16.4889 35.5559 19.1864 35.5823 20.4167 36.0463ZM40.2826 43.2722C40.7859 43.455 41.6248 43.9333 42.1561 44.3132C44.1978 45.8469 45.7775 46.3951 48.0697 46.3796C50.3899 46.3499 51.5496 45.8844 54.4136 43.8265C54.9584 43.4318 56.4956 42.9097 56.887 42.9658C57.1665 43.0079 57.1107 43.1206 56.3147 44.2055C52.8375 48.9396 47.9196 52.0974 42.1759 53.2559C39.9259 53.708 36.1102 53.7104 33.8736 53.2612C30.1832 52.5172 26.9815 51.0546 24.1008 48.8031C22.6605 47.6774 20.5345 45.4255 19.5832 44.046C18.8558 42.9902 18.8418 42.9621 19.1912 42.9618C19.7642 42.9615 21.0225 43.4958 21.9454 44.129C24.5463 45.944 25.6926 46.3658 27.9429 46.3925C30.2072 46.4051 31.8282 45.8408 33.8119 44.3608C34.3288 43.9661 34.9995 43.5573 35.2929 43.4162C36.8439 42.7393 38.6888 42.6958 40.2826 43.2722ZM42.105 8.23248C52.4492 10.1552 60.1702 19.1071 60.5963 29.6972C60.6389 30.7534 60.6397 32.035 60.5702 32.5702L60.5691 32.5812C60.473 33.5139 60.4715 33.5276 60.1095 33.4436C59.8998 33.4015 59.131 33.3175 58.3902 33.2757C56.1678 33.1222 54.0158 33.7996 52.2835 35.1808C51.4174 35.8715 50.4953 36.365 49.6009 36.605C48.6366 36.8591 46.8616 36.818 45.9668 36.5228L45.1979 36.2557L42.7509 34.6096L41.884 34.1313C40.6397 33.4561 39.2558 33.1753 37.5926 33.2609C35.6498 33.3607 34.476 33.7699 32.6878 34.9963C31.8775 35.546 29.9581 36.8007 28.3281 36.8017C28.0207 36.9146 26.3293 36.6481 25.6024 36.3669C25.2109 36.2122 24.358 35.7058 23.7147 35.2414C21.5893 33.6796 19.9257 33.1596 17.5916 33.3019C16.8648 33.3446 16.0962 33.4296 15.8865 33.472C15.5248 33.5564 15.5232 33.5428 15.4122 32.6117L15.4108 32.5992C15.2701 31.191 15.4497 27.8954 15.7561 26.3179C17.6369 16.8248 25.096 9.62354 34.6273 8.11054C36.3463 7.82777 40.3297 7.89563 42.105 8.23248Z" stroke="black" stroke-width="5" mask="url(#path-9-inside-1_175_1092)"/>
  //                     <path fill-rule="evenodd" clip-rule="evenodd" d="M7.0401 30.129C7.63091 14.2571 19.6708 1.51828 35.4918 0.0575684C36.7636 -0.0559126 41.3342 0.110148 42.6202 0.320568C49.3019 1.40067 54.8944 4.1996 59.5936 8.81581C61.9992 11.1943 63.6638 13.362 65.1471 16.0791C71.766 28.1862 69.8048 43.0169 60.2649 52.9657C57.8066 55.5304 55.1523 57.4896 51.9247 59.1253L50.0663 60.0701L45.105 65.7947C39.7448 71.9772 39.7207 72.005 38.0538 72.0061C37.7158 72.0063 37.4465 72.0071 37.187 71.9565C36.159 71.7561 35.2855 70.7504 30.9076 65.7156L26.0121 60.0855L24.1665 59.1431C20.8389 57.4553 18.2519 55.5417 15.6785 52.8535C9.86015 46.7733 6.73802 38.5509 7.0401 30.129ZM64.6189 20.586C60.867 11.0683 52.3227 4.25758 42.2304 2.71493C40.8885 2.50455 36.9189 2.3381 36.1223 2.45128C35.8987 2.47959 35.1021 2.57868 34.3753 2.66365C33.6486 2.74861 32.293 2.98889 31.3706 3.21481C21.0433 5.68597 12.858 13.8312 10.2929 24.198C6.97498 37.5508 13.3153 51.1509 25.6608 57.2128L27.4923 58.1129L32.4299 63.8134C35.6749 67.5715 37.4792 69.5419 37.7029 69.5981C37.8986 69.6543 38.2061 69.6541 38.3877 69.5977C38.6253 69.5412 40.441 67.5402 43.6673 63.8062L48.5975 58.0994L50.1345 57.3661C58.0011 53.6009 63.6713 46.6684 65.7764 38.2313C67.2402 32.4281 66.8309 26.1755 64.6189 20.586Z" stroke="black" stroke-width="5" mask="url(#path-9-inside-1_175_1092)"/>
  //                     <path d="M55.3446 26.6971C55.3466 29.8001 52.8517 32.3172 49.772 32.3192C46.6923 32.3212 44.1941 29.8073 44.1921 26.7042C44.1901 23.6012 46.6851 21.084 49.7648 21.0821C52.8444 21.0801 55.3426 23.594 55.3446 26.6971Z" stroke="black" stroke-width="5" mask="url(#path-9-inside-1_175_1092)"/>
  //                   </svg>
  //                   <figcaption
  //                   class='mapFigcaption'
  //                   >
  //                   ${data[i].place_name}
  //                   </figcaption>
  //                   </figure>
  //                   `;

  //             const overlayOptions = {
  //               content: overlayContent,
  //               position: coords,
  //               yAnchor: -1,
  //               clickable: true,
  //               zIndex: 1,
  //             };

  //             const overlay2 = new kakao.maps.CustomOverlay(overlayOptions);

  //             setSearchCustomOverlay(overlay2);

  //             overlay2.setMap(map);
  //           }

  //           addItem(data);
  //         }
  //       };
  //       const searchOptions = {
  //         location: options.center,
  //         useMapCenter: true,
  //         size: 10,
  //         sort: kakao.maps.services.SortBy.DISTANCE,
  //       };
  //       await ps.keywordSearch(mixed, poolSearch, searchOptions);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   searchMypage();

  // }, []);

  // 내 위치 조회 함수
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // 새로운 중심 좌표 생성
        const moveLatLon = new kakao.maps.LatLng(lat, lon);
        setOptions({ center: moveLatLon });

        // 지도 중심을 이동시킴
        map?.panTo(options.center);
        navigate('/search/list');
      });
    } else {
      alert('Geolocation이 지원되지 않는 브라우저입니다');
    }
  };

  const handleZoomIn = () => {
    setOptions({ level: options.level - 1 });
  };

  const handleZoomOut = () => {
    setOptions({ level: options.level + 1 });
  };

  const handleSearch = (e) => {
    e.preventDefalut;
    if (!map) {
      return;
    } else if (!mixed) {
      mixKeyword('', '수영장');
    }
    const { kakao } = window;
    kakao.maps.event.addListener(map, 'center_changed', () => {
      const level = map.getLevel();
      const latlng = map.getCenter();
      setOptions({ level: level, center: latlng });
    });

    const ps = new kakao.maps.services.Places();

    const poolSearch = (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        data.forEach((item) => {
          const coords = new kakao.maps.LatLng(item.y, item.x);

          const overlayContent = document.createElement('div');
          overlayContent.classList.add('mapOverlay', 'close');
          overlayContent.textContent = item.place_name;
          overlayContent.addEventListener('click', closeOverlay);

          const imageSrc =
            'https://github.com/swimming-sis/swimming-community-app-frontend/assets/116139215/81be3666-8077-4ccc-a870-6b6d9e29639e'; // 마커 이미지의 주소입니다
          const imageSize = new kakao.maps.Size(33, 40);
          const imageOption = { offset: new kakao.maps.Point(27, 69) };

          const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

          const marker = new kakao.maps.Marker({
            position: coords,
            image: markerImage,
            clickable: true,
          });

          function closeOverlay() {
            overlay2.setMap(null);
          }

          const overlayOptions = {
            content: overlayContent,
            position: marker.getPosition(),
            yAnchor: 1,
            xAnchor: 0.5,
            clickable: true,
            zIndex: 1,
          };

          const overlay2 = new kakao.maps.CustomOverlay(overlayOptions);

          kakao.maps.event.addListener(marker, 'click', function () {
            overlay2.setMap(map);
          });

          setSearchCustomOverlay(marker);

          marker.setMap(map);
        });

        addItem(data);
      }
    };
    const searchOptions = {
      location: options.center,
      useMapCenter: true,
      size: 10,
      sort: kakao.maps.services.SortBy.DISTANCE,
    };

    ps.keywordSearch(mixed, poolSearch, searchOptions);
    navigate('/search/list');
  };
  //zoomIn zoomOut

  useEffect(() => {
    if (map && options.level !== undefined) {
      map.setLevel(options.level);
    }
  }, [map, options.level]);

  // 내현재위치 검색
  useEffect(() => {
    if (map) {
      // 기존의 CustomOverlay가 있다면 제거한다.
      if (customOverlay) customOverlay.setMap(null);
      map.setCenter(options.center);

      const content = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <g filter="url(#filter0_d_167_987)">
                  <circle cx="9" cy="5" r="5" fill="#0086FF"/>
                  <circle cx="9" cy="5" r="4.5" stroke="#001B33"/>
                </g>
                <defs>
                  <filter id="filter0_d_167_987" x="0" y="0" width="18" height="18" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_167_987"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_167_987" result="shape"/>
                  </filter>
                </defs>
              </svg>`;

      const overlayPosition = options.center;

      const overlayOptions = {
        content: content,
        position: overlayPosition,
      };

      const overlay = new kakao.maps.CustomOverlay(overlayOptions);

      


      overlay.setMap(map);
      setCustomOverlay(overlay);
      return () => {
        overlay.setMap(null);
      };
    }
  }, [map, options.center]);

  //키워드가 변경되면 검색
  
    useEffect(() => {
      const { kakao } = window;
      if (!mixed) {
        mixKeyword('', '수영장');
      } else if (kakao && mixed) {
        const ps = new kakao.maps.services.Places();
    
        const poolSearch = (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const bounds = new kakao.maps.LatLngBounds();
            data.forEach((item) => {
              const coords = new kakao.maps.LatLng(item.y, item.x);
              bounds.extend(new kakao.maps.LatLng(item.y, item.x));
    
              const overlayContent = document.createElement('div');
              overlayContent.classList.add('mapOverlay', 'close');
              overlayContent.textContent = item.place_name;
              overlayContent.addEventListener('click', closeOverlay);
    
              const imageSrc =
                'https://github.com/swimming-sis/swimming-community-app-frontend/assets/116139215/81be3666-8077-4ccc-a870-6b6d9e29639e'; 
              const imageSize = new kakao.maps.Size(33, 40);
              const imageOption = { offset: new kakao.maps.Point(27, 69) };
    
              const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    
              const marker = new kakao.maps.Marker({
                position: coords,
                image: markerImage,
                clickable: true,
              });
    
              function closeOverlay() {
                overlay2.setMap(null);
              }
  
            const overlayOptions = {
              content: overlayContent,
              position: marker.getPosition(),
              yAnchor: 1,
              xAnchor: 0.5,
              clickable: true,
              zIndex: 1,
            };
  
            const overlay2 = new kakao.maps.CustomOverlay(overlayOptions);
  
            kakao.maps.event.addListener(marker, 'click', function () {
              overlay2.setMap(map);
            });
            map.setBounds(bounds)
            setSearchCustomOverlay(marker);
  
            marker.setMap(map);
          });
        }
      };
  
      const searchOptions = {
        location: options.center,
        useMapCenter: true,
        size: 10,
        sort: kakao.maps.services.SortBy.DISTANCE,
      };
  
      ps.keywordSearch(mixed, poolSearch, searchOptions);
    }
  }, [mixed]);

  return (
    <div className="relative">
      <div
        id="map"
        ref={mapRef}
        className="w-[calc(100%-20px)] h-[200px] mx-auto rounded-xl relative">
        <button
          type="submit"
          onClick={handleSearch}
          className=" absolute px-4 py-2  bg-primary text-white font-semibold font-prestige shadow-md rounded-full z-10 top-2 left-5">
          주변 수영장 검색하기
        </button>
        <div className="absolute z-10 right-6 top-2">
          <button
            aria-label="현재 내위치 탐색하기"
            type="button"
            className="relative border bg-white shadow-sm w-7 h-7 rounded-md"
            onClick={handleLocateMe}>
            <Location className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'} />
          </button>
        </div>
        <div className="flex flex-col absolute bottom-4 right-6 z-10">
          <button
            aria-label="지도 축소하기"
            type="button"
            className="w-7 h-7 px-0.5 text-gray/600 text-center border bg-white rounded-t-md shadow-sm font-semibold text-xl"
            onClick={handleZoomIn}>
            <Plus className="mx-auto" />
          </button>
          <button
            aria-label="지도 확대하기"
            type="button"
            className="w-7 h-7 px-0.5 text-gray/600 text-center border bg-white rounded-b-md shadow-sm font-semibold text-xl"
            onClick={handleZoomOut}>
            
            <Minus className="mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default MapComponent;
