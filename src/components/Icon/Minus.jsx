import propTypes from 'prop-types';

function Minus({className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="3"
      fill="none"
      viewBox="0 0 14 3"
      className={className}
    >
      <path
        stroke="#6B6B6B"
        d="M13 2.498H1a.5.5 0 010-1h12a.5.5 0 010 1z"
      ></path>
    </svg>
  );
}
Minus.propTypes = {
  className: propTypes.string
}


export default Minus;