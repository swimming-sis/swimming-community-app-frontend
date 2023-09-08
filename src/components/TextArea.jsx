import propTypes from 'prop-types';


function TextArea ({placeholder="오늘의 수영일지를 기록해보세요", id='logTextArea', height='h-[280px]'}) {
return (
  <textarea 
  name={`logTextArea`} 
  id={id} 
  cols="40" 
  rows="10"
  placeholder={placeholder}
  className={`w-full border resize-none rounded-3xl p-2 placeholder:text-sm text-sm ${height}`}>
  </textarea>
)
}

TextArea.propTypes = {
  placeholder: propTypes.string,
  id: propTypes.string,
  height: propTypes.string,
}

export default TextArea