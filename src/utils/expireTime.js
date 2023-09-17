export function setItemWithExpireTime(keyName, keyValue, tts) {
  // localStorage에 저장할 객체
  const obj = {
    value : keyValue,
    expire : Date.now() + tts
  }
 
  // 객체를 JSON 문자열로 변환
  const objString = JSON.stringify(obj);
 
  // setItem
  window.localStorage.setItem(keyName, objString);
}
 
// 만료 시간을 체크하며 데이터 읽기
export function getItemWithExpireTime(keyName) {
  
  // localStorage 값 읽기 (문자열)
  const objString = window.localStorage.getItem(keyName);
  
  // null 체크
  if(!objString) {
    return null;
  }
  
  // 문자열을 객체로 변환
  const obj = JSON.parse(objString);
  
  // 현재 시간과 localStorage의 expire 시간 비교
  if(Date.now() > obj.expire) {
    // 만료시간이 지난 item 삭제
    window.localStorage.removeItem(keyName);
    
    // null 리턴
    return null;
  }
  
  // 만료기간이 남아있는 경우, value 값 리턴
  return obj.value;
}