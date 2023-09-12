import propTypes from 'prop-types';

function Heart({fill=false, className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill={fill ? "#FF3743" : "none"}
      viewBox="0 0 12 12"
      className={className}
    >
      <path
        stroke="#FF3743"
        d="M5.467 9.848h-.001C3.91 8.438 2.66 7.3 1.793 6.24.931 5.186.5 4.267.5 3.3.5 1.723 1.728.5 3.3.5c.893 0 1.758.418 2.32 1.074l.38.442.38-.442A3.108 3.108 0 018.7.5c1.573 0 2.8 1.223 2.8 2.8 0 .967-.431 1.886-1.293 2.94-.868 1.061-2.118 2.198-3.673 3.608h0L6 10.334l-.533-.486z"
      ></path>
    </svg>
  );
}
Heart.propTypes = {
  fill: propTypes.bool,
  className: propTypes.string
}

export default Heart;
