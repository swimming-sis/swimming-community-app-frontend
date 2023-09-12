
import Back from '@/components/Icon/Back';
import Pencil from '@/components/Icon/Pencil';
import SearchInput from '@/components/Input/SearchInput';

import propTypes from 'prop-types';

function Header({ type = 'default', content = '', noEdit=true}) {

  return (
    <>
      {type==='default' &&
      <header className={`flex ${noEdit&&'justify-between'} items-center h-10 font-semibold mt-3 mx-4 font-pretendard z-50`}>
        <button type="button">
          <Back />
        </button>
        <p 
        tabIndex={0}
        className={`text-secondary ${noEdit || 'flex-grow text-center mr-9'}`}>
          {content}
          </p>
        {noEdit&&<button type="button">
          <Pencil />
        </button>}
      </header> }
      {type==='search' &&
      <header className="z-50">
        <SearchInput />
      </header> }
    </>
  );
}
Header.propTypes = {
  type: propTypes.string,
  content: propTypes.string,
  noEdit: propTypes.bool
};

export default Header;
