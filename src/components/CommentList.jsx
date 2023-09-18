import propTypes from 'prop-types';

function CommentList({ commentContent = '', user, commentId, datetime }) {
  return (
    <li className={`relative pt-2 pb-4 mx-2 ${!(commentId === 1 || commentId === 0) || 'border-t'}`}>
      <p className="text-gray/500 font-semibold text-xs ml-1.5 mb-1">{user}</p>
      <p className="text-xs px-1 pt-1 pb-2">{commentContent}</p>
      <time
        dateTime="YYYY-MM-DDThh:mm:ss"
        className="absolute bottom-0 right-3 text-gray/500 font-light text-[0.625rem]">
        {datetime}
      </time>
    </li>
  );
}
CommentList.propTypes = {
  user: propTypes.string.isRequired,
  datetime: propTypes.string.isRequired,
  commentId: propTypes.number.isRequired,
  commentContent: propTypes.string.isRequired,
};

export default CommentList;
