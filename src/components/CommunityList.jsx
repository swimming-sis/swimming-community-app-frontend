import propTypes from 'prop-types';
import Heart from './Icon/Heart';
import Chat from './Icon/Chat';
import Pencil from './Icon/Pencil';
import X from './Icon/X';
import CategoryTag from './Category/CategoryTag';
function CommunityList ({
  edit = false, 
  title,
  content,
  user,
  datetime,
  likeCount=0,
  chatCount=0
}) {
  return(
    <li 
    tabIndex={0}
    className='relative border rounded-2xl py-2.5 px-3 min-w-0 max-w-[699px] w-full mx-auto font-pretendard shadow-md mt-2'>
      <div className=' flex items-center justify-start w-5/6 mb-1'>
        <CategoryTag value='고민' className='flex-shrink-0' />
        <strong className='inline-block font-semibold text-sm truncate'>{title}</strong>
      </div>
      <p className='text-sm mb-2 truncate'>{content}</p>
      <div className='flex gap-x-1 items-center'>
        <p className='text-gray/500 font-semibold text-xs ml-1'>{user}</p>
        <p className='text-gray/500 font-light text-[0.625rem]'>{datetime}</p>
      </div>
      {edit && 
      <div className=' flex justify-end gap-x-1 absolute right-2.5 top-2'>
        <button type="submit">
          <Pencil />
        </button>
        <button 
        type="submit">
          <X />
        </button>
      </div>}
      <div className='flex justify-end items-center text-sm h-6 absolute right-3 bottom-1.5'>
        <Heart className='w-4 h-auto'/>
        <span className='mr-2 ml-0.5'>{likeCount}</span>
        <Chat className='w-4 h-auto'/>
        <span className='ml-0.5'>{chatCount}</span>
      </div>

    </li>
  )
}
CommunityList.propTypes = {
  title: propTypes.string.isRequired,
  content: propTypes.string.isRequired,
  user: propTypes.string.isRequired,
  datetime: propTypes.string.isRequired,
  edit: propTypes.bool,
  likeCount: propTypes.number,
  chatCount: propTypes.number
}
export default CommunityList