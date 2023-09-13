import propTypes from 'prop-types';

function LogInText({
  id='tel', 
  name,
  content='전화번호', 
  type='text',
  className,
  validation=true,
  onChange,
  placeholder=`'-' 없이 입력해주세요`,
  errorMessage='올바른 형식의 전화번호가 아닙니다.',
}) {
return (
  <div
  className={`flex flex-col gap-y-2 justify-start items-center m-2 ${className}`}>
  <label 
    htmlFor={`logIn-${id}`}
    tabIndex={0}
    className='w-full text-sm font-medium text-secondary'>
    {content}
  </label>
  <input
    type={type}
    id={`logIn-${id}`}
    placeholder={placeholder}
    name={name}
    onChange={onChange}
    className='flex-grow w-full h-8 px-1 py-5 border border-gray/300 rounded-lg text-sm placeholder:text-xs'/>
  {validation ? null:<p
  className='w-full -mt-2 text-xs text-error ml-2'
  >
    {errorMessage}
  </p>}
  </div>
)
}
LogInText.propTypes = {
  id: propTypes.string,
  name: propTypes.string,
  type: propTypes.string,
  onChange: propTypes.func,
  content: propTypes.string,
  validation: propTypes.bool,
  className: propTypes.string,
  placeholder: propTypes.string,
  errorMessage: propTypes.string,
};

export default LogInText