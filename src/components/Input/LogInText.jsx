import propTypes from 'prop-types';

function LogInText({
  id='tel', 
  content='전화번호', 
  type='text',
  validation=true,
  placeholder=`'-' 없이 입력해주세요`,
  errorMessage='올바른 형식의 전화번호가 아닙니다.',
}) {
return (
  <div
  className='flex flex-col gap-y-2 justify-start items-center m-2'>
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
    name={`logIn-${id}`}
    className='flex-grow w-full h-8 px-1 border border-gray/300 rounded-lg text-sm'/>
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
  type: propTypes.string,
  content: propTypes.string,
  validation: propTypes.bool,
  placeholder: propTypes.string,
  errorMessage: propTypes.string,
};

export default LogInText