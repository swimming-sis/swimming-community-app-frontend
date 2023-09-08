import propTypes from 'prop-types';

function Pencil({size=20}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
      className='mr-4'
      aria-label='수정하기'
    >
      <path
        stroke="#001B33"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.563"
        d="M13.333 10l-6.666 6.667H3.333v-3.334L10 6.667l2.39-2.391.002-.001c.329-.33.494-.494.684-.556a.833.833 0 01.515 0c.19.062.354.227.683.555l1.45 1.45c.33.33.495.495.557.685a.834.834 0 010 .515c-.062.19-.227.355-.557.685l-2.39 2.392L10 6.668"
      ></path>
    </svg>
  );
}

Pencil.propTypes = {
  size: propTypes.number
}
export default Pencil;
