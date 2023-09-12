import propTypes from 'prop-types';

function CategoryTag ({value,className}) {
return (

  <span 
  className={`py-1 px-2 rounded-2xl text-xs border-2 border-primary text-primary mr-2 font-semibold
  ${className}`}
  tabIndex="0">
    {value}
  </span>

)

}
CategoryTag.propTypes = {
  value: propTypes.string.isRequired,
  className: propTypes.string
}

export default CategoryTag