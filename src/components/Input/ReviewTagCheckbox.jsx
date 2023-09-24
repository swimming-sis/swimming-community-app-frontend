import propTypes from 'prop-types';
import style from '@/styles/reviewTagCheckbox.module.css';


function ReviewTagCheckbox({ isActive=false, onClick, content }) {
  return (
    <>
      <input
        type="checkbox"
        name="tag"
        id={`reviewTag-${content}`}
        value={content}
        onChange={onClick}
        hidden />
      <label
        htmlFor={`reviewTag-${content}`}
        tabIndex={0}
        className={`${style.reviewTagLabelInactive} ${!isActive || style.reviewTagLabelActive} flex-shrink-0 text-xs`}>
        {content}
      </label>
    </>
  );
}

ReviewTagCheckbox.propTypes = {

  onClick: propTypes.func,
  content: propTypes.string,
  isActive: propTypes.bool,
};

export default ReviewTagCheckbox;
