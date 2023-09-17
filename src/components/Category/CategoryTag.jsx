import propTypes from 'prop-types';

function CategoryTag ({content,className}) {
return (

  <span 
  className={`py-1 px-2 rounded-2xl text-xs border-2 border-primary text-primary mr-2 font-semibold
  ${className}`}
  tabIndex="0">
    {content}
  </span>

)

}
CategoryTag.propTypes = {
  content: propTypes.string,
  className: propTypes.string
}

export default CategoryTag