import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { memo } from 'react';
// import useModalStore from '@/zustand/useModalStore';

const CommentList = memo(function CommentList({
  commentContent = '',
  postId,
  commentId,
  user,
  userName,
  onClick,
  onChange,
  datetime,
  className,
  onClickDelete,

}) {
  const [currentDatetime, setCurrentDatetime] = useState('');
const [isEditState,setIsEditState] = useState(false)
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

  const handleEdit = (e) => {
    if (isEditState) {
      onClick(e);
      setIsEditState(false)
    } else {
      setIsEditState(true);
    }
  };
  return (
    <div className="relative mt-3">
      <ol className="border shadow-md rounded-lg text-sm">
        <li className={`relative pt-2 pb-4 mx-2 ${className}`}>
          {isEditState ? (
            <textarea
              defaultValue={commentContent}
              onChange={onChange}
              className="w-[90%] h-full resize-none"></textarea>
          ) : (
            <>
              <p className="text-gray/500 font-semibold text-xs ml-1.5 mb-1">{user}</p>
              <p className="text-xs px-1 pt-1 pb-2">{commentContent}</p>
              <time
                dateTime={currentDatetime}
                className="absolute bottom-0 right-3 text-gray/500 font-light text-[0.625rem]">
                {datetime}
              </time>
            </>
          )}
        </li>
      </ol>
      {userName===localUser && (
        <div className="flex justify-end absolute right-2 top-2 text-xs text-gray-500 ">
          <button
            type="button"
            className='p-1'
            onClick={handleEdit}
            data-post-id={postId}
            data-comment-id={commentId}>
            수정
          </button>
          <button 
          className='p-1'
          onClick={onClickDelete} 
          data-post-id={postId} 
          data-comment-id={commentId} 
          type="button">
            삭제
          </button>
        </div>
      )}
    </div>
  );
});
CommentList.propTypes = {
  link: propTypes.string,
  isEdit: propTypes.bool,
  onClick: propTypes.func,
  onChange: propTypes.func,
  postId: propTypes.number,
  userName: propTypes.string,
  commentId: propTypes.number,
  className: propTypes.string,
  onClickDelete: propTypes.func,
  user: propTypes.string.isRequired,
  datetime: propTypes.string.isRequired,
  commentContent: propTypes.string,
};

export default CommentList;
