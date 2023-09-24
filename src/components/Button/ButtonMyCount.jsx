import propTypes from 'prop-types';


function ButtonMyCount ({ content='글 개', shape='left-round' , onClick }) {
return (
  <button
  type="button"
  onClick={onClick}
  className={`w-full px-2 py-[18px]  font-normal active:bg-primary active:text-white focus:bg-primary focus:text-white
  hover:bg-primary hover:text-white bg-quaternary text-secondary border-2 border-tertiary shadow-md}
  ${shape==='square' && ''}
  ${shape==='left-round' && 'rounded-tl-lg rounded-bl-lg'}
  ${shape==='right-round' && 'rounded-tr-lg rounded-br-lg'}
  `}>
    {content}
  </button>
)
}
ButtonMyCount.propTypes = {
  shape: propTypes.string,
  onClick: propTypes.func,
  content: propTypes.string,
}
export default ButtonMyCount