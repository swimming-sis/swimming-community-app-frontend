import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MyLogList({id,onClick,distance=400, calory=499, time=65,contents='자유형 잘하는 방법이 뭘까..나는 왜 안되지..?'}) {
  return (
    <div className="relative">
      <ul>
        <li>
          <p>거리</p>
          <p>
            <span aria-hidden>:</span>
            {distance}
            <span aria-label='미터'>m</span>
            </p>
        </li>
        <li>
          <p>칼로리</p>
          <p>
            <span aria-hidden>:</span>
            {calory}
            <span aria-label='키로칼로리'>kcal</span>
            </p>
        </li>
        <li>
          <p>수영시간</p>
          <p><span aria-hidden>:</span>{time}분</p>
        </li>
      </ul>
      <p>{contents}</p>
      <div className=" flex justify-end absolute right-2 top-2 text-xs text-gray-500 ">
        <Link className="p-1" to={`/mylog/${id}/edit`} id={id}>
          수정
        </Link>
        <button className="p-1 " onClick={onClick} data-post-id={id} type="button">
          삭제
        </button>
      </div>
    </div>
  );
}

MyLogList.propTypes = {
  id: propTypes.number,
  time: propTypes.number,
  onClick: propTypes.func,
  calory: propTypes.number,
  contents: propTypes.string,
  distance: propTypes.number,
  className:propTypes.string,
}

export default MyLogList;
