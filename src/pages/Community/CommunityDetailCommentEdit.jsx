import propTypes from 'prop-types';

function CommunityDetailCommentEdit({
  content
}) {
  return(
    <div 
    className='relative flex border rounded-2xl py-2.5 px-3 min-w-0 max-w-[699px] w-full mx-auto font-pretendard shadow-md mt-2'>
    

            <p className='text-sm mb-2 truncate flex-grow'>{content}</p>

      <button type="button"></button>
    </div>
  )
}
CommunityDetailCommentEdit.propTypes = {
  content: propTypes.string,
  value: propTypes.string,
  noEdit: propTypes.bool,
  onClick: propTypes.func,
  onSubmit: propTypes.func,
  onChange: propTypes.func,
  onNavigate: propTypes.bool,
  onClickEdit: propTypes.func,
  onClickBack: propTypes.func,
  deleteButton: propTypes.bool,
  onSubmitEdit: propTypes.func,
  onClickDelete: propTypes.func,
  onClickSearch: propTypes.func,
  onSubmitDelete: propTypes.func,
};



export default CommunityDetailCommentEdit