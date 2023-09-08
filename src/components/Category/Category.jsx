import propTypes from 'prop-types';

function Category ({value,index,check=false}) {
return (
  <>
  <input
  type="radio" 
  id={`categoryRadio-${index}`} 
  name="category"
  hidden/>
  <label 
  htmlFor={`categoryRadio-${index}`}
  className={`py-1 px-2 rounded-2xl text-xs border-2 border-secondary
  ${check? 'bg-secondary text-white':' text-secondary'}`}
  tabIndex="0">
    {value}
  </label>
</>
)

}
Category.propTypes = {
  value: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
  check: propTypes.bool
}

export default Category