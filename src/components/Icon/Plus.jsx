import propTypes from 'prop-types';

function Plus({className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
      className={className}
    >
      <path
        stroke="#6B6B6B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 13V7m0 0V1m0 6h6M7 7H1"
      ></path>
    </svg>
  );
}
Plus.propTypes = {
  className: propTypes.string
}


export default Plus;
