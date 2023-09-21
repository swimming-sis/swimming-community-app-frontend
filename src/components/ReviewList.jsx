import propTypes from 'prop-types';
import Pencil from './Icon/Pencil';
import X from './Icon/X';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Star from './Icon/Star';

function ReviewList({
  userName = '',
  id,
  user ,
  link = true,
  content ,
  onClick,
  datetime,
  ratingStar = 0,
  reviewId,
}) {
  const [currentDatetime, setCurrentDatetime] = useState('');
  const localUser = JSON.parse(window.localStorage.getItem('user')).value;

  useEffect(() => {
    const updateCurrentDatetime = () => {
      const now = new Date();
      const formattedDatetime = now.toISOString();
      setCurrentDatetime(formattedDatetime);
    };

    updateCurrentDatetime();
    const intervalId = setInterval(updateCurrentDatetime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='relative'>
      <ol className="relative border rounded-2xl py-2.5 px-3 min-w-0 max-w-[699px] w-[calc(100%-20px)] mx-2.5 font-pretendard shadow-md mt-2">
        {!link ? (
          <li tabIndex={0}>
            <div className="flex gap-x-1 items-center">
              <p className="text-gray/500 font-semibold text-xs ml-1 py-2">{user}</p>
              <time dateTime={currentDatetime} className="text-gray/500 font-light text-[0.625rem]">
                {datetime}
              </time>
            </div>
            <p className="text-sm mb-2 truncate py-2">{content}</p>
            <div className="flex justify-end items-center text-sm h-6 absolute right-3 bottom-1.5">
              <Star />
              <span className="ml-2">{ratingStar}</span>
            </div>
          </li>
        ) : (
          <li tabIndex={0}>
            <Link to={`/search/list/${id}/reviewList`} id={id}>
              <div className="flex gap-x-1 items-center">
                <p className="text-gray/500 font-semibold text-xs ml-1 py-2">{user}</p>
                <time
                  dateTime={currentDatetime}
                  className="text-gray/500 font-light text-[0.625rem]">
                  {datetime}
                </time>
              </div>
              <p className="text-sm mb-2 truncate py-2">{content}</p>
              <div className="flex justify-end items-center text-sm h-6 absolute right-3 bottom-1.5">
                <Star />
                <span className="ml-2">{ratingStar}</span>
              </div>
            </Link>
          </li>
        )}
      </ol>
      {userName === localUser && (
        <div className=" flex justify-end gap-x-1 absolute right-6 top-2">
          <button type="button">
            <Link to={`/search/list/${id}/reviewList/${reviewId}/edit`} id={id} key={reviewId}>
              <Pencil />
            </Link>
          </button>
          <button
            onClick={onClick}
            data-swimmingpool-id={id}
            data-review-id={reviewId}
            type="button">
            <X />
          </button>
        </div>
      )}
    </div>
  );
}
ReviewList.propTypes = {
  id: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
  ]),
  edit: propTypes.bool,
  link: propTypes.bool,
  user: propTypes.string,
  onClick: propTypes.func,
  content: propTypes.string,
  reviewId: propTypes.number,
  datetime: propTypes.string,
  userName: propTypes.string,
  tagCount: propTypes.number,
  ratingStar: propTypes.number,
};
export default ReviewList;
