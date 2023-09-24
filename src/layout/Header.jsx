
import Back from '@/components/Icon/Back';
import Pencil from '@/components/Icon/Pencil';
import SearchInput from '@/components/Input/SearchInput';
import propTypes from 'prop-types';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = memo(function Header({ 
  type = 'default', 
  content = '', 
  label, 
  noEdit=true, 
  deleteButton=false, 
  onNavigate=false,
  onSubmit,
  value, 
  onClickEdit, 
  onChange, 
  onClick,
  onClickBack,
  onClickDelete,
  onClickSearch}) {
  let navigate = useNavigate();


  return (
    <>
      {type==='default' &&
      <header className={`flex ${noEdit&&'justify-between'} h-12 items-center  font-semibold mt-3 mx-4 font-pretendard z-50`}>
        {!onNavigate  ?
          <button 
          type="button"
          onClick={() => navigate(-1)}>
          <Back />
        </button>
        :
        <button 
        type="button"
        onClick={onClickBack}>
          <Back />
        </button>
      }
        <p 
        tabIndex={0}
        className={`text-secondary ${noEdit || 'flex-grow text-center mr-9'}`}>
          {content}
          </p>
        {noEdit&&
        <button type="button"
        onClick={onClickEdit}>
          <Pencil label={label}/>
        </button>
        }
        {(deleteButton) &&
        <div className='flex items-center gap-x-2 text-sm'>
          <button 
          type="button"
          className='px-2.5 py-1.5 border-2 rounded-lg shadow-md hover:bg-primary focus:bg-primary hover:text-white focus:text-white border-primary text-primary '
          onClick={onClickEdit}>
            수정
          </button>
          <button 
          type="button"
          className='px-2.5 py-1.5 border-2 rounded-lg shadow-md hover:bg-primary focus:bg-primary hover:text-white focus:text-white border-primary text-primary '
          onClick={onClickDelete}>
            삭제
          </button>
        </div>
        }
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
})
Header.propTypes = {
  type: propTypes.string,
  label: propTypes.string,
  value: propTypes.string,
  content: propTypes.string,
  noEdit: propTypes.bool,
  onClick: propTypes.func,
  onSubmit: propTypes.func,
  onChange: propTypes.func,
  onNavigate: propTypes.bool,
  onClickEdit: propTypes.func,
  onClickBack: propTypes.func,
  deleteButton: propTypes.bool,
  onSubmitEdit: propTypes.func,
  onClickDelete: propTypes.func,
  onClickSearch: propTypes.func,
  onSubmitDelete: propTypes.func,
};

export default Header;
