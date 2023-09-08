import propTypes from "prop-types";


function ButtonSubmit ({
  color="text-white", 
  bgcolor="bg-primary", 
  content="시작하기",
  className}) {

return (
  <div className={`${className}`}>
    <button type="button" className={`w-[calc(100%-20px)] py-2 rounded-xl text-base font-semibold ml-2.5 my-2 ${color} ${bgcolor}` } >
      {content}
    </button>
  </div>
)
}
ButtonSubmit.propTypes={
  color: propTypes.string,
  bgcolor: propTypes.string,
  className: propTypes.string,
  content: propTypes.oneOfType([
    propTypes.string,
    propTypes.object,
  ]),
}

export default ButtonSubmit 