import propTypes from 'prop-types';

function LogInText({
  id, 
  name,
  content, 
  type,
  className,
  validation,
  onChange,
  placeholder,
  errorMessage,
  defaultValue,
  ...restProp
}) {
return (
  <div
  className={`flex flex-col gap-y-2 justify-start items-center m-2 ${className}`}>
  <label 
    htmlFor={id}
    className='w-full text-sm font-medium text-secondary'>
    {content}
  </label>
  <input
    type={type}
    id={id}
    placeholder={placeholder}
    name={name}
    onChange={onChange}
    defaultValue={defaultValue}
    {...restProp}
    className={`w-full h-8 px-1 py-5 border border-gray/300 rounded-lg text-sm placeholder:text-xs flex-grow-0`}/>
  {validation ? null:<p
  className='w-full -mt-2 text-xs text-error ml-2'
  tabIndex={0}
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
  disabled: propTypes.bool,
  onChange: propTypes.func,
  content: propTypes.string,
  validation: propTypes.bool,
  className: propTypes.string,
  placeholder: propTypes.string,
  defaultValue: propTypes.string,
  errorMessage: propTypes.string,
};

export default LogInText