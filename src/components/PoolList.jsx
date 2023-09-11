import propTypes from 'prop-types';
import House from '@/components/Icon/House';
import Star from '@/components/Icon/Star';

function PoolList({title='남구 다목적 체육관',address='광주광역시 남구 화산로 110',tel='062-673-1100',link,rating='0.0'}) {
  return (
    <li className="border p-3 rounded-xl shadow-md mx-2.5 list-none font-pretendard text-sm">
      <p className="text-base font-semibold text-primary ">{title}</p>
      {address && <p className="text-gray/700">{address}</p>}
      {tel && <p className="text-gray/700">{tel}</p>}
      <div className="flex items-center mt-2">
        {link && <House link={true}/> }
        <a href={link} className="text-primary flex-grow font-semibold ml-1">
          {link}
        </a>
        <Star className="mr-2" />
        <span>{rating}</span>
      </div>
    </li>
  );
}
PoolList.propTypes = {
  title: propTypes.string,
  address: propTypes.string,
  tel: propTypes.string,
  link: propTypes.string,
  rating: propTypes.string
};


export default PoolList