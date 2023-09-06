import propTypes from "prop-types";


function ButtonSubmit ({color, content}) {
return (
  <button type="button" className={`w-full py-4 rounded-xl text-base font-semibold text-white ${color}`} >
    {content}
  </button>
)
}
ButtonSubmit.propTypes={
  color: propTypes.string.isRequired,
  content: propTypes.string.isRequired,
}

export default ButtonSubmit