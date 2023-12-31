import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function LogList({id,onClick,distance=0, calory=0, time=0,contents='',logId}) {
  return (
    <div className="relative border shadow-lg py-2.5 px-4 rounded-2xl mx-auto my-2"
    tabIndex={0}>
      <ul 
      
      className='text-sm text-secondary'>
        <li 
        
        className='flex my-1 '>
          <p className='w-20'> 거리</p>
          <p>
            <span className='mr-2' aria-hidden>:</span>
            {distance}
            <span aria-label='미터'>m</span>
            </p>
        </li>
        <li className='flex my-1'>
          <p className='w-20'>칼로리</p>
          <p>
            <span className='mr-2' aria-hidden>:</span>
            {calory}
            <span aria-label='키로칼로리'>kcal</span>
            </p>
        </li>
        <li className='flex my-1'>
          <p className='w-20'>수영시간</p>
          <p><span className='mr-2' aria-hidden>:</span>{time}분</p>
        </li>
      </ul>
      <p className='mt-6 mb-2 text-sm'>{contents}</p>
      <div className=" flex justify-end absolute right-2 top-2 text-xs text-gray-500 ">
        <Link className="p-1" to={`/mylog/${id}/${logId}/edit`} id={id}>
          수정
        </Link>
        <button className="p-1 " onClick={onClick} data-date={id} data-log-id={logId} type="button">
          삭제
        </button>
      </div>
    </div>
  );
}


LogList.propTypes = {
  id: propTypes.string,
  logId: propTypes.number,
  time: propTypes.number,
  onClick: propTypes.func,
  calory: propTypes.number,
  contents: propTypes.string,
  distance: propTypes.number,
  className:propTypes.string,
}

export default LogList;
