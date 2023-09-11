import { useState } from "react";
import Back from '@/components/Icon/Back';
import Pencil from '@/components/Icon/Pencil';
import Search from '@/components/Icon/Search';
import X from '@/components/Icon/X';
import propTypes from 'prop-types';

function Header({ condition = 'default', content = '', noEdit=true}) {
  const [value, setValue] = useState("");


  const handleChange = (e) => {
    setValue(e.target.value);
  }
  const handleTextClear = () => {
    setValue("");
  };

  const handleSearch = () => {
    console.log(value);
  };

  return (
    <>
      {condition==='default' &&
      <header className={`flex ${noEdit&&'justify-between'} items-center h-10 font-semibold mt-3 font-pretendard z-50`}>
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
      {condition==='search' &&
      <header className="z-50">
        <form className='flex flex-col h-10 font-semibold mt-3 relative'>
          <label
          htmlFor="searchSwimmingPool"
          className=' text-secondary mb-2 ml-4'
          tabIndex={0}>전국 수영장 검색하기</label>
          <input
          type="search"
          name="searchSwimmingPool"
          value={value}
          id="searchSwimmingPool"
          onChange={handleChange}
          placeholder="원하는 지역을 검색해 보세요"
          className='w-[calc(100%-20px)] py-2 px-4 rounded-lg mx-auto border border-secondary placeholder:font-normal placeholder:text-sm'
          />
          {value && <button
          type="button"
          className='absolute right-16 top-[48px] btn-clear'
          onClick={handleTextClear}
          >
            <X/>
          </button>}
          <button
          type="submit"
          onClick={handleSearch}
          className='absolute
          right-7 top-[39px]'>
          <Search/>
          </button>
        </form>
      </header> }
    </>
  );
}
Header.propTypes = {
  condition: propTypes.string,
  content: propTypes.string,
  noEdit: propTypes.bool
};

export default Header;
