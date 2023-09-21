import propTypes from 'prop-types';


function ReviewTag ({content='태그내용',className}) {

  <span 
  className={`py-1 px-2 rounded-2xl text-xs border-2 border-tertiary text-primary mr-2 font-semibold
  ${className}`}
  tabIndex="0">
    {content}
  </span>


}
ReviewTag.propTypes = {
  content: propTypes.string,
  className: propTypes.string
}

export default ReviewTag