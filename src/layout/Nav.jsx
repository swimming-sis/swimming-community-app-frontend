import House from '@/components/Icon/House';
import Paper from '@/components/Icon/Paper';
import People from '@/components/Icon/People';
import Search from '@/components/Icon/Search';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = memo(function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full mx-auto  text-secondary font-pretendard text-xs font-semibold bg-white z-50">
      <ul className="flex justify-evenly items-center h-14  max-w-[699px] mx-auto shadow-[0px_-4px_4px_0px_rgba(0,0,0,0.25)]">
        <li>
          <NavLink to="/main"
          className={({isActive})=>isActive?'flex flex-col items-center border-b-primary border-b-2 ':'flex flex-col items-center'}>
            <House />홈
          </NavLink>
        </li>
      <li>
          <NavLink to="/search/list"
          className={({isActive})=>isActive?'flex flex-col items-center border-b-primary border-b-2 ':'flex flex-col items-center'}>
            <Search size={17} />
            검색
          </NavLink>
        </li>
      <li>
          <NavLink to="/community"
          className={({isActive})=>isActive?'flex flex-col items-center border-b-primary border-b-2 ':'flex flex-col items-center'}>
            <People />
            커뮤니티
          </NavLink>
        </li>
      <li>
          <NavLink to="/mylog"
          className={({isActive})=>isActive?'flex flex-col items-center border-b-primary border-b-2 ':'flex flex-col items-center'}>
            <Paper />
            일지
          </NavLink>
        </li>
    </ul>
    </nav>
  );
})
export default Nav;
