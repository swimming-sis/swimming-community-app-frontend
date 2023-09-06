import propTypes from "prop-types";
import style from '@/styles/reviewTagCheckbox.module.css'

const reviewTag = ['🚌 편리한 대중교통', '🏊 개인용품 사용 가능', '💧 깨끗한 물', '🐤 오리발 사용 가능', '🧼 청결한 샤워실', '😄 충분한 레인', '💰 합리적인 가격', '🌡️ 적당한 물온도', '🤿 다이빙 풀 있음'] 


function ReviewTagCheckbox({isActive, num}) {
  console.log(isActive)
  return (
    <>
      <input type="checkbox" name="reviewTag" id="reviewTag" hidden/>
      <label 
      htmlFor="reviewTag" 
      tabIndex={0}
      className={`${style.reviewTagLabelInactive} ${!isActive && style.reviewTagLabelActive}`}>{reviewTag[num]}
      </label>
    </>
  );
}

ReviewTagCheckbox.propTypes={
  isActive: propTypes.bool.isRequired,
  num: propTypes.number.isRequired,
}

export default ReviewTagCheckbox;
