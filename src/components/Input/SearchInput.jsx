// import { useState } from 'react';
import Search from '@/components/Icon/Search';
import X from '@/components/Icon/X';

import propTypes from 'prop-types';


function SearchInput({
  content = '전국 수영장 검색하기',
  id = 'searchSwimmingPool',
  name= 'keyword',
  hidden = false,
  onSubmit ,
  placeholder = "원하는 지역을 검색해 보세요",
  onChange,
  onClick,
  value,
}) {


  return (
    <form 
    onSubmit={onSubmit}
    className="flex flex-col h-10 font-semibold my-1 relative px-2.5">
      <label 
      htmlFor={id} 
      hidden={hidden}
      className=" text-secondary mt-3 mb-2 ml-4" 
      tabIndex={0}>
        {content}
      </label>
      <input
        type="search"
        name={name}
        value={value}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full py-2 px-4 rounded-lg mx-auto border border-secondary placeholder:font-normal placeholder:text-sm"
      />
      {value && (
        <button
          type="button"
          className={hidden ? 'absolute right-14 top-4 btn-clear':'absolute right-14 top-[3.75rem] btn-clear'}
          aria-label='입력내용 삭제'
          onClick={onClick}>
          <X />
        </button>
      )}
      <button
        type="submit"     
        className={hidden ? 'absolute right-6 top-2 btn-clear':'absolute right-6 top-[3.25rem]'}
        aria-label='검색하기'
        >
        <Search />
      </button>
    </form>
  );
}
SearchInput.propTypes = {
  id: propTypes.string,
  name: propTypes.string,
  value: propTypes.string,
  hidden: propTypes.bool,
  onClick: propTypes.func,
  onSubmit: propTypes.func,
  onChange: propTypes.func,
  content: propTypes.string,
  placeholder: propTypes.string,
};
export default SearchInput;
