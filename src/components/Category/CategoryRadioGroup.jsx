import propTypes from 'prop-types';

function CategoryRadioGroup({children}) {

  return (

      <fieldset>
        <legend 
        className="sr-only">카테고리</legend>
        {children}
      </fieldset>

  );
}
CategoryRadioGroup.propTypes = {
  children: propTypes.node,
};

export default CategoryRadioGroup;
