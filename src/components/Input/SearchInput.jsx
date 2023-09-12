import { useState } from 'react';
import Search from '@/components/Icon/Search';
import X from '@/components/Icon/X';
import propTypes from 'prop-types';

function SearchInput({
  content = '전국 수영장 검색하기',
  id = 'searchSwimmingPool',
  hidden = false,
  placeholder = "원하는 지역을 검색해 보세요",
}) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleTextClear = () => {
    setValue('');
  };

  const handleSearch = () => {
    console.log(value);
  };

  return (
    <form className="flex flex-col h-10 font-semibold my-1 relative">
      <label 
      htmlFor={id} 
      hidden={hidden}
      className=" text-secondary mt-3 mb-2 ml-4" 
      tabIndex={0}>
        {content}
      </label>
      <input
        type="search"
        name={id}
        value={value}
        id={id}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full py-2 px-4 rounded-lg mx-auto border border-secondary placeholder:font-normal placeholder:text-sm"
      />
      {value && (
        <button
          type="button"
          className={hidden ? 'absolute right-12 top-4 btn-clear':'absolute right-12 top-[3.75rem] btn-clear'}
          aria-label='입력내용 삭제'
          onClick={handleTextClear}>
          <X />
        </button>
      )}
      <button
        type="submit"
        onClick={handleSearch}
        className={hidden ? 'absolute right-4 top-2 btn-clear':'absolute right-4 top-[3.25rem]'}
        aria-label='검색하기'
        >
        <Search />
      </button>
    </form>
  );
}
SearchInput.propTypes = {
  id: propTypes.string,
  content: propTypes.string,
  hidden: propTypes.bool,
  placeholder: propTypes.string,
};
export default SearchInput;
