import ReviewTagCheckbox from './ReviewTagCheckbox';
import propTypes from 'prop-types';

const reviewTag = [
  { value: '🚌 편리한 대중교통' },
  { value: '🏊 개인용품 사용 가능' },
  { value: '💧 깨끗한 물' },
  { value: '🐤 오리발 사용 가능' },
  { value: '🧼 청결한 샤워실' },
  { value: '😄 충분한 레인' },
  { value: '💰 합리적인 가격' },
  { value: '🌡️ 적당한 물온도' },
  { value: '🤿 다이빙 풀 있음' },
];

function ReviewTagCheckboxGroup({ checkedItems, onItemCheck }) {
  return (
    <>
      {reviewTag.map((review) => (
        <ReviewTagCheckbox
          key={review.value}
          isActive={checkedItems.includes(review.value)}
          onClick={(e) => onItemCheck(review.value,e.target.checked)}
          content={review.value}
        />
      ))}
    </>
  );
}
ReviewTagCheckboxGroup.propTypes = {
  onItemCheck: propTypes.func,
  checkedItems: propTypes.array,
};
export default ReviewTagCheckboxGroup;
