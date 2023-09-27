import CategoryRadio from './CategoryRadio';
import CategoryRadioGroup from './CategoryRadioGroup';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/a11y';
import '@/styles/swiper.css';
import propTypes from 'prop-types';

function CategoryRadioForm({ onClick, write = false, selectedCategory, onCategoryChange }) {
  // const [selectedCategory, setSelectedCategory] = useState('all');

  const categoryArr = [
    { id: 'all', value: '전체' },
    { id: 'free', value: '자유' },
    { id: 'daily', value: '일상' },
    { id: 'think', value: '고민' },
    { id: 'cody', value: '코디' },
    { id: 'supply', value: '용품' },
    { id: 'info', value: '정보' },
  ];
  const categoryWriteArr = [
    { id: 'free', value: '자유' },
    { id: 'daily', value: '일상' },
    { id: 'think', value: '고민' },
    { id: 'cody', value: '코디' },
    { id: 'supply', value: '용품' },
    { id: 'info', value: '정보' },
  ];

  const handleChange = (e) => {
    // setSelectedCategory(e.target.value);
    if (onCategoryChange) {
      onCategoryChange(e.target.value);
    }
  };

  return (
    <div className="mt-4 mb-2 w-full overflow-x-hidden">
      <CategoryRadioGroup>
        <Swiper
          onClick={onClick}
          modules={[FreeMode]}
          freeMode={{
            enable: true,
            sticky: true,
          }}
          spaceBetween={-10}
          slidesOffsetBefore={30}
          slidesOffsetAfter={50}
          slidesPerView="auto"
          // autoHeight={true}
          className="min-h-24">
          {(write ? categoryWriteArr : categoryArr).map((category) => (
            <SwiperSlide key={category.id}>
              <CategoryRadio
                id={category.id}
                value={category.value}
                onChange={handleChange}
                isChecked={selectedCategory === category.value}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </CategoryRadioGroup>
    </div>
  );
}
CategoryRadioForm.propTypes = {
  write: propTypes.bool,
  onClick: propTypes.func,
  selectedCategory: propTypes.string,
  onCategoryChange: propTypes.func,
};

export default CategoryRadioForm;
