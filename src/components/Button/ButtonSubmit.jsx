import propTypes from "prop-types";


function ButtonSubmit ({
  color="text-white", 
  bgcolor="bg-primary", 
  content="시작하기",
  onClick,
  onSubmit,
  type='submit',
  disabled = false,
  className}) {

return (
  <div className={className}>
    <button 
    type={type} 
    disabled={disabled}
    onClick={onClick}
    onSubmit={onSubmit}
    className={`w-[calc(100%-20px)] py-2 rounded-xl shadow-md text-base font-semibold ml-2.5 my-2 ${color} ${disabled?'bg-gray-600':bgcolor}` } >
      {content}
    </button>
  </div>
)
}
ButtonSubmit.propTypes={
  type: propTypes.string,
  color: propTypes.string,
  bgcolor: propTypes.string,
  className: propTypes.string,
  content: propTypes.oneOfType([
    propTypes.string,
    propTypes.object,
  ]),
  onClick: propTypes.func,
  onSubmit: propTypes.func,
  disabled: propTypes.bool,
}

export default ButtonSubmit 