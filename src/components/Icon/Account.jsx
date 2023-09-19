import propTypes from 'prop-types';

function Account({className}) {
  return (
    <figure
    className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 18 18"
      
      >
        <path
          stroke="#001B33"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12.913 14.499A5.235 5.235 0 009 12.75a5.236 5.236 0 00-3.913 1.749M9 15.75a6.75 6.75 0 110-13.5 6.75 6.75 0 010 13.5zm0-5.25A2.25 2.25 0 119 6a2.25 2.25 0 010 4.5z"
        ></path>
      </svg>
      <figcaption className='sr-only'>내 계정 정보 확인하기</figcaption>
    </figure>
  );
}
Account.propTypes = {
  className: propTypes.string,
};

export default Account;