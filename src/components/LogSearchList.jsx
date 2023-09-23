import propTypes from 'prop-types';

function LogSearchList({ distance = 0, calory = 0, time = 0 }) {
  return (
    <ul className="text-sm text-secondary relative border shadow-lg py-2.5 px-4 rounded-2xl my-2">
      <li className="flex my-1">
        <p className="w-24">평균 거리</p>
        <p>
          <span className="mr-2" aria-hidden>
            :
          </span>
          {distance}
          <span aria-label="미터">m</span>
        </p>
      </li>
      <li className="flex my-1">
        <p className="w-24">평균 칼로리</p>
        <p>
          <span className="mr-2" aria-hidden>
            :
          </span>
          {calory}
          <span aria-label="키로칼로리">kcal</span>
        </p>
      </li>
      <li className="flex my-1">
        <p className="w-24">평균 수영시간</p>
        <p>
          <span className="mr-2" aria-hidden>
            :
          </span>
          {time}분
        </p>
      </li>
    </ul>
  );
}

LogSearchList.propTypes = {
  time: propTypes.number,
  calory: propTypes.number,
  distance: propTypes.number,
};

export default LogSearchList;
