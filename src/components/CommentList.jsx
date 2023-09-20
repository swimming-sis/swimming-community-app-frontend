import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { memo } from 'react';
import Pencil from './Icon/Pencil';
import { Link } from 'react-router-dom';
import X from './Icon/X';

const CommentList = memo(function CommentList({
  commentContent = '',
  postId,
  commentId,
  user,
  onClick,
  datetime,
  className,
  edit = false,
}) {
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
    <div className="relative mt-3">
      <ol className="border shadow-md rounded-lg text-sm">
        <li className={`relative pt-2 pb-4 mx-2 ${className}`}>
          <p className="text-gray/500 font-semibold text-xs ml-1.5 mb-1">{user}</p>
          <p className="text-xs px-1 pt-1 pb-2">{commentContent}</p>
          <time
            dateTime={currentDatetime}
            className="absolute bottom-0 right-3 text-gray/500 font-light text-[0.625rem]">
            {datetime}
          </time>
        </li>
      </ol>
      {edit && (
        <div className=" flex justify-end gap-x-1 absolute right-2.5 top-2">
          <button type="button">
            <Link to={`/community/${postId}`} id={postId}>
              <Pencil />
            </Link>
          </button>
          <button onClick={onClick} data-post-id={postId} data-comment-id={commentId} type="button">
            <X />
          </button>
        </div>
      )}
    </div>
  );
});
CommentList.propTypes = {
  edit: propTypes.bool,
  onClick: propTypes.func,
  postId: propTypes.number,
  commentId: propTypes.number,
  className: propTypes.string,
  user: propTypes.string.isRequired,
  datetime: propTypes.string.isRequired,
  commentContent: propTypes.string.isRequired,
};

export default CommentList;
