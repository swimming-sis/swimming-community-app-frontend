import propTypes from "prop-types";


function ButtonSubmit ({color="bg-primary", content="시작하기"}) {

return (
  <button type="button" className={`w-full py-4 rounded-xl text-base font-semibold text-white ${color}`} >
    {content}
  </button>
)
}
ButtonSubmit.propTypes={
  color: propTypes.string,
  content: propTypes.string,
}

export default ButtonSubmit 