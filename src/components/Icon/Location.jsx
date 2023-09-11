import propTypes from 'prop-types';

function Location({className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        stroke="#6B6B6B"
        d="M9.222 3.047l.445-.05V1.333h.666V2.997l.445.05a6.995 6.995 0 016.175 6.175l.05.444H18.667v.667H17.003l-.05.445a6.995 6.995 0 01-6.175 6.175l-.445.05v1.663h-.666v-1.663l-.445-.05a6.995 6.995 0 01-6.175-6.175l-.05-.445H1.333v-.667H2.997l.05-.444a6.995 6.995 0 016.175-6.175zM10 12.833a2.832 2.832 0 110-5.667 2.832 2.832 0 110 5.667zm0 3.5A6.33 6.33 0 0016.333 10 6.33 6.33 0 0010 3.667 6.33 6.33 0 003.667 10 6.33 6.33 0 0010 16.333z"
      ></path>
    </svg>
  );
}
Location.propTypes = {
  className: propTypes.string
}

export default Location;