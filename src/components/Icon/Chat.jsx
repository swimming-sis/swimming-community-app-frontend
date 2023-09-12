import propTypes from 'prop-types';

function Chat({fill=false, className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill={fill ? "#001B33" : "none"}
      viewBox="0 0 14 14"
      className={className}
    >
      <path
        stroke="#001B33"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.095 11.299c3.366 0 6.096-2.502 6.096-5.347C13.19 3.108 10.46 1 7.095 1S1 3.306 1 6.15c0 1.11.416 2.138 1.124 2.979l-.743 3.49 2.984-1.864a6.996 6.996 0 002.73.544z"
      ></path>
    </svg>
  );
}
Chat.propTypes = {
  fill: propTypes.bool,
  className: propTypes.string
}
export default Chat;