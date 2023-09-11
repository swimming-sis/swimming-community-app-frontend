import propTypes from 'prop-types';

function Circle({size=25}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 18 18"
    >
      <g filter="url(#filter0_d_167_987)">
        <circle cx="9" cy="5" r="5" fill="#0086FF"></circle>
        <circle cx="9" cy="5" r="4.5" stroke="#001B33"></circle>
      </g>
      <defs>
        <filter
          id="filter0_d_167_987"
          width="18"
          height="18"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_167_987"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_167_987"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}
Circle.propTypes = {
  size: propTypes.number
}

export default Circle;