import propTypes from 'prop-types';


function TextArea ({
  placeholder="오늘의 수영일지를 기록해보세요", 
  id='logTextArea', defaultValue,
  name='body',
  className, 
  onChange}) {
return (
  <textarea 
  name={name} 
  id={id} 
  cols="40" 
  rows="10"
  defaultValue={defaultValue}
  placeholder={placeholder}
  onChange={onChange}
  className={`w-full border shadow-lg resize-none rounded-2xl p-2 placeholder:text-sm text-sm min-h-[280px] ${className}`}>
  </textarea>
)
}

TextArea.propTypes = {
  id: propTypes.string,
  name: propTypes.string,
  onChange: propTypes.func,
  className: propTypes.string,
  placeholder: propTypes.string,
  defaultValue: propTypes.string,
}

export default TextArea