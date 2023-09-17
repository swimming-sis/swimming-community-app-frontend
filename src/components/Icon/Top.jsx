import propTypes from 'prop-types';


function Top({className, onClick}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none
      "
      className={className}
      onClick={onClick}
      viewBox="0 0 40 40"
    >
  <path
        fill="#0086FF"
        d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20z"
      ></path>
      <path
        fill="#fff"
        d="M20 14.973a1.2 1.2 0 01.817.321l5.366 5.367c.214.214.321.486.321.817 0 .33-.107.602-.32.816-.215.214-.487.321-.817.321-.33 0-.603-.107-.817-.32L20 17.744l-4.55 4.55c-.214.213-.486.32-.817.32-.33 0-.602-.107-.816-.32a1.106 1.106 0 01-.321-.817c0-.33.107-.603.32-.817l5.367-5.367c.117-.116.243-.199.38-.247.136-.049.282-.074.437-.074z"
      ></path>
    </svg>
  );
}
Top.propTypes = {
  onClick: propTypes.func,
  className: propTypes.string
}

export default Top;