import propTypes from 'prop-types';
import House from '@/components/Icon/House';
import Star from '@/components/Icon/Star';
import { Link } from 'react-router-dom';

function PoolList({id,title='',address='',tel='',link,rating='0.0', distance, onClick, review=false}) {
  return (
    <ol>
     {review ?
     <li
     className="relative border p-3 rounded-xl shadow-md mx-2.5 list-none font-pretendard text-sm my-5"
     onClick={onClick}>
       
         <p className="text-base font-semibold text-primary ">{title}</p>
         {address && <p className="text-gray/700">{address}</p>}
         {tel && <p className="text-gray/700">{tel}</p>}
         <div className="flex items-center mt-2">
           {link && <House link={true}/> }
           <a href={link} className="text-primary flex-grow font-semibold ml-1">
             {link}
           </a>
           <p className='absolute top-3 right-3 text-sm text-secondary'>{distance}</p>
           <div className='flex'>
             <Star className="mr-2" />
             <span>{rating}</span>
           </div>
         </div>
      
     </li>

     :<li
      className="relative border p-3 rounded-xl shadow-md mx-2.5 list-none font-pretendard text-sm my-5"
      onClick={onClick}>
        <Link to={id} key ={id}>
          <p className="text-base font-semibold text-primary ">{title}</p>
          {address && <p className="text-gray/700">{address}</p>}
          {tel && <p className="text-gray/700">{tel}</p>}
          <div className="flex items-center mt-2">
            {link && <House link={true}/> }
            <p className="text-primary flex-grow font-semibold ml-1">
              {link}
            </p>
            <p className='absolute top-3 right-3 text-sm text-secondary'>{distance}</p>
            <div className='flex'>
              <Star className="mr-2" />
              <span>{rating}</span>
            </div>
          </div>
        </Link>
      </li>}
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
  rating: propTypes.string,
  address: propTypes.string,
  distance: propTypes.string,
};


export default PoolList