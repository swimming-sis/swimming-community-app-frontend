import propTypes from 'prop-types';

function ButtonLog ({content='주간',status=false}) {
  return (
    <button
    type="submit"
    className={`relative w-12 rounded-2xl font-semibold text-xs py-1 px-2.5
    ${status ? 'bg-primary text-white ' : ' text-primary border-2 border-primary  '}`}>
      {content}
      {status ? <span className='absolute border-2 w-11 h-5 top-0.5 left-0.5 border-white rounded-2xl'/>:''}
      
    </button>
  )

}
ButtonLog.propTypes = {
  content: propTypes.string,
  status: propTypes.bool,
}
export default ButtonLog