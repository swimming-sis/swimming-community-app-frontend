import propTypes from 'prop-types';

function ButtonMyCount ({ content='글 개',status=true , shape='left-round' }) {
return (
  <button
  type="button"
  className={`w-[84px] px-2 py-[18px]  font-normal
  ${status ? 'bg-primary text-white' : 'bg-quaternary text-secondary border-2 border-tertiary'}
  ${shape==='square' && ''}
  ${shape==='left-round' && 'rounded-tl-lg rounded-bl-lg'}
  ${shape==='right-round' && 'rounded-tr-lg rounded-br-lg'}
  `}>
    {content}
  </button>
)
}
ButtonMyCount.propTypes = {
  content: propTypes.string,
  status: propTypes.bool,
  shape: propTypes.string,
}
export default ButtonMyCount