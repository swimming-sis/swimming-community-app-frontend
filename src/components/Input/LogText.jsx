import propTypes from 'prop-types';

function LogText ({content='거리',placeholder='오늘의 수영한 거리를 입력해 주세요.'}) {
return (
  <div
  className='flex items-center m-2'>
  <label 
    htmlFor={`logText-${content}`}
    tabIndex={0}
    className='w-24 text-sm font-medium text-secondary'>
    {content}
  </label>
  <input
    type="text"
    id={`logText-${content}`}
    placeholder={placeholder}
    name='logtext'
    className='flex-grow h-8 px-1 border border-gray/300 rounded-lg text-sm'/>
  </div>
)
}
LogText.propTypes = {
  content: propTypes.string,
  placeholder: propTypes.string
}

export default LogText