import CategoryRadio from './CategoryRadio';
import CategoryRadioGroup from './CategoryRadioGroup';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/a11y';
// import 'swiper/css/free-mode';
import '@/styles/Swiper.css'

function CategoryRadioForm() {
  // const [swiper, setSwiper] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categoryArr = [
    { id: 'all', value: '전체' },
    { id: 'free', value: '자유' },
    { id: 'daily', value: '일상' },
    { id: 'think', value: '고민' },
    { id: 'cody', value: '코디' },
    { id: 'supply', value: '용품' },
    { id: 'info', value: '정보' },
  ];


  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    // if (swiper) {
    //   const index = categoryArr.findIndex(category => category.id === event.target.value);
    //   swiper.slideTo(index);
    // }
};

  return (
    <form className="my-3 w-full overflow-x-hidden">
      <CategoryRadioGroup>
        <Swiper 
        modules={[FreeMode]}
        freeMode={{
          enable: true,
          sticky: true
        }} 
        // slidesPerView= {'auto'}
        // spaceBetween= {30}
        // slidesOffsetBefore ={5}
        // slidesOffsetAfter = {20}
        autoHeight={true}
                breakpoints={{
          100: {
            slidesPerView: 4,
            slidesOffsetBefore : 0,
            slidesOffsetAfter : 20
          },
          200: {
            slidesPerView: 4,
            slidesOffsetBefore : 0,
            slidesOffsetAfter : 20
          },
          320: {
            slidesPerView: 4,
            slidesOffsetBefore : 0,
            slidesOffsetAfter : 20
          },
          330: {
            slidesPerView: 5,
            slidesOffsetBefore : 0,
            slidesOffsetAfter : 20
          },
          380: {
            slidesPerView: 6,
            slidesOffsetBefore : 5,
            slidesOffsetAfter : 20
          },
          470: {
            slidesPerView: 7,
            slidesOffsetBefore : 5,
            slidesOffsetAfter : 20
          },

        }}
        className='h-8'
        >
          {categoryArr.map((category) => (
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
    </form>
  );
}

export default CategoryRadioForm;
