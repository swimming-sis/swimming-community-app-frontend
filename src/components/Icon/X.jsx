import propTypes from 'prop-types';

function X({className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill="none"
      viewBox="0 0 12 12"
      className={className}
      aria-label='삭제'
    >
      <path
        fill="#001B33"
        d="M1.669.608a.75.75 0 00-1.06 1.06L4.938 6 .607 10.331a.75.75 0 101.06 1.06L6 7.062l4.331 4.33a.75.75 0 001.06-1.06L7.062 6l4.33-4.331a.75.75 0 00-1.06-1.06L6 4.938 1.669.61z"
      ></path>
    </svg>
  );
}
X.propTypes = {
  className: propTypes.string
}
export default X;
