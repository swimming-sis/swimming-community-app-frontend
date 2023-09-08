import propTypes from 'prop-types';

function Category ({value,index}) {
return (

  <span 
  id={`categorytag-${index}`}
  className={`py-1 px-2 rounded-2xl text-xs border-2 border-secondary text-secondary`}
  tabIndex="0">
    {value}
  </span>

)

}
Category.propTypes = {
  value: propTypes.string.isRequired,
  index: propTypes.number.isRequired
}

export default Category