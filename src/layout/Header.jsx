import { useState } from "react";
import Back from '@/components/Icon/Back';
import Pencil from '@/components/Icon/Pencil';
import Search from '@/components/Icon/Search';
import X from '@/components/Icon/X';
import propTypes from 'prop-types';

function Header({ condition = 'default', content = '', noEdit=false}) {
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
      <div className={`flex ${noEdit&&'justify-between'} items-center h-10 font-semibold mt-3 font-pretendard`}>
        <Back />
        <p className={`text-secondary ${noEdit || 'flex-grow text-center mr-9'}`}>{content}</p>
        {noEdit&&<Pencil />}
      </div> }
      {condition==='search' &&
      <form className='flex flex-col h-10 font-semibold mt-3 relative'>
        <label 
        htmlFor="flex-grow searchSwimmingPool" 
        className=' text-secondary mb-2 ml-4'
        tabIndex={0}>전국 수영장 검색하기</label>
        <input 
        type="search" 
        name="searchSwimmingPool" 
        value={value} 
        id="searchSwimmingPool" 
        onChange={handleChange}
        className='w-[calc(100%-20px)] p-2 rounded-lg mx-auto border border-secondary'/>
        <button 
        type="submit" 
        onClick={handleSearch}
        className='absolute 
        right-7 top-[39px]'>
        <Search/>
        </button>
        {value && <button 
        type="button" 
        className='absolute right-16 top-[48px] btn-clear'
        onClick={handleTextClear}
        >
          <X/>
        </button>}
      </form> }
    </>
  );
}
Header.propTypes = {
  condition: propTypes.string,
  content: propTypes.string,
  noEdit: propTypes.bool
};

export default Header;
