import propTypes from 'prop-types';

function House({link = false, className}) {
  return (
    <figure
    className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
      >
        <path
          fill={link ? "#0074E6" : "#001B33"}
          stroke={link ? "none" : "#001B33"}
          strokeWidth="0.3"
          d="M7.151 1.149h0L1.318 5.896s0 0 0 0c-.296.24-.468.595-.468.97v7.015c0 .339.14.662.388.9l.103-.108-.103.107c.247.238.581.37.929.37h4.472a.746.746 0 00.516-.206.698.698 0 00.217-.504V9.928h1.256v4.512c0 .19.079.372.217.504a.746.746 0 00.516.206h4.472c.348 0 .682-.132.93-.37.247-.237.387-.56.387-.9V6.867v0c0-.185-.042-.368-.123-.536a1.276 1.276 0 00-.345-.434L8.85 1.149h0A1.348 1.348 0 008 .85c-.31 0-.61.105-.849.299zM2.317 13.73V6.937L8 2.312l5.683 4.625v6.794h-3.589V9.218a.698.698 0 00-.217-.504.746.746 0 00-.516-.205H6.64a.746.746 0 00-.516.205.698.698 0 00-.217.504v4.513h-3.59z"
        ></path>
      </svg>
      <figcaption className='sr-only'>카카오맵 링크</figcaption>
    </figure>
  );
}
House.propTypes = {
  link: propTypes.bool,
  className: propTypes.string
}

export default House;