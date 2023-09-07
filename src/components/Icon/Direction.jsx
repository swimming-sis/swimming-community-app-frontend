import propTypes from 'prop-types';

function Direction({direction=true}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      className={direction ? "rotate-0" : "rotate-180"}
    >
      <path
        fill="#0086FF"
        d="M12.942 15.808a.624.624 0 11-.884.884l-6.25-6.25a.626.626 0 010-.884l6.25-6.25a.626.626 0 01.884.884L7.134 10l5.808 5.808z"
      ></path>
    </svg>
  );
}
Direction.propTypes = {
  direction: propTypes.bool
}

export default Direction;