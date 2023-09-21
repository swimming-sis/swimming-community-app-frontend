import propTypes from 'prop-types';
import { useEffect, useState, } from 'react';
import StarForRating from '../Icon/StarForRating';


function RatingStar({onClick, defaultValue}) {
  const [rating, setRating] = useState(defaultValue ||0);

  useEffect(()=>{
    setRating(defaultValue)
  },[defaultValue])

  const handleRatingChange = (value) => {
    setRating(value);
    if (onClick) {
      onClick(value);
    }
  };
  return (
    <div
    className='flex py-2 px-3 gap-0.5 border border-staryellow rounded-full w-36 h-12 mx-auto'>
      {[1, 2, 3, 4, 5].map((value) => (
        <StarForRating
          key={value}
          value={value}
          fill={value <= rating}
          onChange={() => handleRatingChange(value)}
          defaultValue={defaultValue}
        />
      ))}
    </div>
  );
}
RatingStar.propTypes = {
  onClick: propTypes.func,
  defaultValue: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
  ]),
};

export default RatingStar;
