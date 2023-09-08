import { useState } from 'react';
import StarForRating from '../Icon/StarForRating';
import { useEffect } from 'react';


function RatingStar() {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };
  useEffect(() => {
    console.log(rating);
  }, [rating]);

  return (
    <div
    className='flex py-2 px-3 gap-0.5 border-2 border-staryellow rounded-2xl w-28 mx-auto'>
      {[1, 2, 3, 4, 5].map((value) => (
        <StarForRating
          key={value}
          value={value}
          fill={value <= rating}
          onChange={() => handleRatingChange(value)}
        />
      ))}
    </div>
  );
}

export default RatingStar;
