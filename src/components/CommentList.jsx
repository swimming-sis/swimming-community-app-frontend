import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { memo } from 'react';

const CommentList= memo(function CommentList({ commentContent = '', user, datetime,className }) {
  const [currentDatetime, setCurrentDatetime] = useState('');

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
    <li className={`relative pt-2 pb-4 mx-2 ${className}`}>
      <p className="text-gray/500 font-semibold text-xs ml-1.5 mb-1">{user}</p>
      <p className="text-xs px-1 pt-1 pb-2">{commentContent}</p>
      <time
        dateTime={currentDatetime}
        className="absolute bottom-0 right-3 text-gray/500 font-light text-[0.625rem]">
        {datetime}
      </time>
    </li>
  );
})
CommentList.propTypes = {
  user: propTypes.string.isRequired,
  datetime: propTypes.string.isRequired,
  className: propTypes.string,
  commentContent: propTypes.string.isRequired,
};

export default CommentList;
