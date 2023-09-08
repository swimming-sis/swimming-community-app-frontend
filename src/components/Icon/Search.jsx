import propTypes from 'prop-types';

function Search({size = 24, className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 19 19"
      className={className}
      aria-label='검색하기'
    >
      <path
        fill="#001B33"
        d="M13.5 12h-.79l-.28-.27a6.5 6.5 0 001.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 00-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 005.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L13.5 12zm-6 0C5.01 12 3 9.99 3 7.5S5.01 3 7.5 3 12 5.01 12 7.5 9.99 12 7.5 12z"
      ></path>
    </svg>
  );
}
Search.propTypes = {
  size: propTypes.number,
  className: propTypes.string
}


export default Search;