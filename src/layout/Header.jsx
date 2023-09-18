
import Back from '@/components/Icon/Back';
import Pencil from '@/components/Icon/Pencil';
import SearchInput from '@/components/Input/SearchInput';

import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Header({ type = 'default', content = '', noEdit=true, onSubmit,value, onClickEdit, onChange, onClick,onClickSearch}) {
  let navigate = useNavigate();


  return (
    <>
      {type==='default' &&
      <header className={`flex ${noEdit&&'justify-between'} h-12 items-center  font-semibold mt-3 mx-4 font-pretendard z-50`}>
        <button 
        type="button"
        onClick={() => navigate(-1)}>
          <Back />
        </button>
        <p 
        tabIndex={0}
        className={`text-secondary ${noEdit || 'flex-grow text-center mr-9'}`}>
          {content}
          </p>
        {noEdit&&<button type="button"
        onClick={onClickEdit}>
          <Pencil />
        </button>}
      </header> }
      {type==='search' &&
      <header className="z-50">
        <SearchInput 
        onChange={onChange} 
        onClick={onClick} 
        value={value}
        onSubmit={onSubmit} 
        onClickSearch={onClickSearch}
        />
      </header> }
    </>
  );
}
Header.propTypes = {
  type: propTypes.string,
  value: propTypes.string,
  content: propTypes.string,
  noEdit: propTypes.bool,
  onClick: propTypes.func,
  onSubmit: propTypes.func,
  onChange: propTypes.func,
  onClickEdit: propTypes.func,
  onClickSearch: propTypes.func,
};

export default Header;
