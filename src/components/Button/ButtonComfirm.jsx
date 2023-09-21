import propTypes from 'prop-types';


function ButtonConfirm ({ content='확인',confirm=true,onClick }) {
return (
  <button
  // type={confirm ? "submit" : "button"}
  type='button'
  onClick={onClick}
  className={`w-[120px] p-2 rounded-lg font-normal mx-1
  ${confirm ? 'bg-primary text-white' : 'bg-quaternary text-secondary border-2 border-tertiary'}`}>
    {content}
  </button>
)
}
ButtonConfirm.propTypes = {
  content: propTypes.string,
  confirm: propTypes.bool,
  onClick: propTypes.func,
}
export default ButtonConfirm