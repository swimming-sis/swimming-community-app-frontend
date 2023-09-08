import House from '@/components/Icon/House';
import Paper from '@/components/Icon/Paper';
import People from '@/components/Icon/People';
import Search from '@/components/Icon/Search';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="fixed w-full bottom-0 text-secondary font-pretendard text-xs font-semibold">
      <ul className="flex justify-evenly items-center h-14 bg-white shadow-[0px_-4px_4px_0px_rgba(0,0,0,0.25)]">
        <li>
          <Link to="/main"
          className='flex flex-col items-center'>
            <House />홈
          </Link>
        </li>
        <li>
          <Link to="/search"
          className='flex flex-col items-center'>
            <Search size={17} />
            검색
          </Link>
        </li>
        <li>
          <Link to="/community"
          className='flex flex-col items-center'>
            <People />
            커뮤니티
          </Link>
        </li>
        <li>
          <Link to="/mylog"
          className='flex flex-col items-center'>
            <Paper />
            일지
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;
