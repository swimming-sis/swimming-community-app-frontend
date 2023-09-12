import propTypes from 'prop-types';

function CategoryRadio({ value, id, isChecked, onChange }) {
  const handleClick = (e) => {
    e.preventDefault();
    onChange({
      target: {
        value: id,
      },
    });
  };

  return (
    <>
      <label
        htmlFor={`categoryRadio-${id}`}
        className={`py-1 px-4 rounded-2xl text-xs border-2 border-primary flex-shrink-0 font-semibold mr-2
  ${isChecked ? 'bg-primary text-white' : 'text-primary'}`}

        onClick={handleClick}
      >
          {value}
      </label>
          <input 
            type="radio" 
            id={`categoryRadio-${id}`} 
            name="category"
            value={value}
            checked={isChecked}
            onChange={onChange}
            className='sr-only' />
    </>
  );
}

CategoryRadio.propTypes = {
  value: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  isChecked: propTypes.bool,
  onChange: propTypes.func,
};

export default CategoryRadio;
