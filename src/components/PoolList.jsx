import propTypes from 'prop-types';
import House from '@/components/Icon/House';
import Star from '@/components/Icon/Star';


function PoolList({
  id,
  title = '',
  address = '',
  tel = '',
  link,
  rating = 0.0,
  distance,
  onKeyDown,
  onClick,
  review = false,
}) {
  return (
    <ol>
      {review ? (
        <li
          className="relative border p-3 rounded-xl shadow-md mx-2.5 list-none font-pretendard text-sm my-6"
          tabIndex={0}
          onClick={onClick}
          onKeyDown={onKeyDown}>
          <p className="text-base font-semibold text-primary ">{title}</p>
          {address && <p className="text-gray/700">{address}</p>}
          {tel && <p className="text-gray/700">{tel}</p>}
          <div className="flex items-center mt-2 flex-nowrap max-w-full">
            {link && <House link={true} className={'min-w-0 flex-shrink-0'} />}
            <a href={link} className="text-primary font-semibold ml-1 truncate min-w-0 flex-grow">
              {link}
            </a>
            <div className="flex min-w-0">
              <Star className="mr-2" />
              <span>{rating}</span>
            </div>
          </div>
        </li>
      ) : (
        <li
          className="relative border p-3 rounded-xl shadow-md mx-2.5 list-none font-pretendard text-sm my-3"
          tabIndex={0}
          onClick={onClick}
          onKeyDown={onKeyDown}>
          <div key={id}>
            <p className="text-base font-semibold text-primary ">{title}</p>
            {address && <p className="text-gray/700">{address}</p>}
            {tel && <p className="text-gray/700">{tel}</p>}
            <div className="flex items-center mt-2">
              {link && <House link={true} className={'min-w-0 flex-shrink-0'} />}
              <p className="text-primary flex-grow font-semibold ml-1  truncate min-w-0">{link}</p>
              <p className="absolute top-3 right-3 text-sm text-secondary">{distance}</p>
            </div>
          </div>
        </li>
      )}
    </ol>
  );
}
PoolList.propTypes = {
  id: propTypes.string,
  tel: propTypes.string,
  link: propTypes.string,
  review: propTypes.bool,
  title: propTypes.string,
  onClick: propTypes.func,
  onKeyDown: propTypes.func,
  rating: propTypes.number,
  address: propTypes.string,
  distance: propTypes.oneOfType([propTypes.number, propTypes.string]),
};

export default PoolList;
