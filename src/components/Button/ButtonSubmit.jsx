import propTypes from "prop-types";


function ButtonSubmit ({color="bg-primary", content="시작하기",className}) {

return (
  <div className={className}>
    <button type="button" className={`w-full py-2 rounded-xl text-base font-semibold text-white ${color}` } >
      {content}
    </button>
  </div>
)
}
ButtonSubmit.propTypes={
  color: propTypes.string,
  content: propTypes.string,
  className: propTypes.string,
}

export default ButtonSubmit 