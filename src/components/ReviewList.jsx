import propTypes from 'prop-types';
import Heart from './Icon/Heart';
import Chat from './Icon/Chat';
import Pencil from './Icon/Pencil';
import X from './Icon/X';
import CategoryTag from './Category/CategoryTag';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CommunityList ({
  edit = false, 
  id, 
  user,
  title,
  content,
  onClick,
  datetime,
  categoryTag,
  likeCount=0,
  chatCount=0
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

  return(
    <div className='relative border rounded-2xl py-2.5 px-3 min-w-0 max-w-[699px] w-full mx-auto font-pretendard mt-2'>
      <ol>
        <li
        tabIndex={0}
        >
          <Link to={`/community/${id}`} id={id}>
            <div className=' flex items-center justify-start w-5/6 mb-1'>
              <CategoryTag content={categoryTag} className='flex-shrink-0' />
              <strong className='inline-block font-semibold text-sm truncate'>{title}</strong>
            </div>
            <p className='text-sm mb-2 truncate'>{content}</p>
            <div className='flex gap-x-1 items-center'>
              <p className='text-gray/500 font-semibold text-xs ml-1'>{user}</p>
              <time dateTime={currentDatetime} className='text-gray/500 font-light text-[0.625rem]'>{datetime}</time>
            </div>
            <div className='flex justify-end items-center text-sm h-6 absolute right-3 bottom-1.5'>
              <Heart className='w-4 h-auto'/>
              <span className='mr-2 ml-0.5'>{likeCount}</span>
              <Chat className='w-4 h-auto'/>
              <span className='ml-0.5'>{chatCount}</span>
            </div>
          </Link>
        </li>
      </ol>
      {edit &&
            <div className=' flex justify-end gap-x-1 absolute right-2.5 top-2'>
              <button type="button">
                <Link to={`/community/${id}`} id={id}>
                  <Pencil />
                </Link>
              </button>
              <button
              onClick={onClick}
              data-post-id={id}
              type="button">
                <X />
              </button>
            </div>}
    </div>
  )
}
CommunityList.propTypes = {
  id: propTypes.number,
  edit: propTypes.bool,
  onClick: propTypes.func,
  likeCount: propTypes.number,
  chatCount: propTypes.number,
  user: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  content: propTypes.string.isRequired,
  datetime: propTypes.string.isRequired,
  categoryTag: propTypes.string.isRequired,
}
export default CommunityList