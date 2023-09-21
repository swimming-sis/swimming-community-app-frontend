import propTypes from 'prop-types';
import { useState, useEffect } from 'react';

function Timer({className}) {
  const [seconds, setSeconds] = useState(180);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(count => count - 1);
    }, 1000);
    if(seconds === 0){
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

    return (
      <div className={`flex items-center gap-x-1 text-error text-xs ${className} ${seconds === 0 ? 'hidden' : ''}`}>
        <span className='text-lg'>⏲</span>
        <span>{formatTime(seconds)}</span>
      </div>
    );
}
Timer.propTypes = {
  className: propTypes.string,
};
export default Timer;
