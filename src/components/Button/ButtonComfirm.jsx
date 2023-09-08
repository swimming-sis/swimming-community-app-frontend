import propTypes from 'prop-types';


function ButtonConfirm ({ content='확인',confirm=true }) {
return (
  <button
  type="submit"
  className={`w-[120px] p-2 rounded-lg font-normal
  ${confirm ? 'bg-primary text-white' : 'bg-quaternary text-secondary border-2 border-tertiary'}`}>
    {content}
  </button>
)
}
ButtonConfirm.propTypes = {
  content: propTypes.string,
  confirm: propTypes.bool,
}
export default ButtonConfirm