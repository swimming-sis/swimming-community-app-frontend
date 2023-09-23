import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Star from './Icon/Star';


function ReviewList({
  userName = '',
  id,
  user ,
  detail ,
  link = true,
  content ,
  onClick,
  datetime,
  ratingStar = 0,
  reviewId,
  checkedItems,
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
    <div className='relative border rounded-2xl pt-2.5 pb-4 px-3 min-w-0 max-w-[699px] w-[calc(100%-20px)] mx-2.5 font-pretendard shadow-md mt-2'>
      <ol>
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
  
      {
  detail
    ? checkedItems.map((tag,index) => (
        <ul key={index} className='inline-flex flex-wrap mb-1 '>
          <li className={`inline py-1.5 px-2 rounded-lg bg-quaternary text-xs border-2 border-tertiary text-primary mr-2 font-semibold`} tabIndex="0">
            {tag}
          </li>
        </ul>
      ))
    : checkedItems && (
        checkedItems.length === 0
          ? null
          : checkedItems.length === 1
            ? <span className={`py-1.5 px-2 rounded-lg bg-quaternary text-xs border-2 border-tertiary text-primary mr-2 font-semibold`} tabIndex="0">
                {checkedItems[0]}
              </span>
            : <>
                <span className={`py-1.5 px-2 rounded-lg bg-quaternary text-xs border-2 border-tertiary text-primary mr-2 font-semibold`} tabIndex="0">
                  {checkedItems[0]}
                </span>
                <span className={`py-1.5 px-2 rounded-lg bg-quaternary text-xs border-2 border-tertiary text-primary mr-2 font-semibold`}>
                  +{checkedItems.length - 1}
                </span>
              </>
      )
}


       
      {userName === localUser && (
        <div className=" flex justify-end absolute right-4 top-2 text-xs text-gray-500 ">
          <button 
          type="button">
            <Link 
            className='p-1'
            to={`/search/list/${id}/reviewList/${reviewId}/edit`} 
            id={id} 
            key={reviewId}>
              수정
            </Link>
          </button>
          <button
          className='p-1'
            onClick={onClick}
            data-swimmingpool-id={id}
            data-review-id={reviewId}
            type="button">
            
              삭제
            
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
  detail: propTypes.bool,
  onClick: propTypes.func,
  content: propTypes.string,
  reviewId: propTypes.number,
  datetime: propTypes.string,
  userName: propTypes.string,
  tagCount: propTypes.number,
  ratingStar: propTypes.number,
  checkedItems: propTypes.array,
};
export default ReviewList;
