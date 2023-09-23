import ButtonSubmit from '@/components/Button/ButtonSubmit';
import TextArea from '@/components/TextArea';
import Header from '@/layout/Header';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import debounce from '@/utils/debounce';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ButtonConfirm from '@/components/Button/ButtonComfirm';
import ModalComponent from '@/components/ModalComponent';
import { Fragment } from 'react';
import useModalStore from '@/zustand/useModalStore';
import RatingStar from '@/components/Input/RatingStar';
import { useParams } from 'react-router-dom';
import useFetchPutData from '@/hooks/useFetchPutData';
import useFetchData from '@/hooks/useFetchData';
import { useEffect } from 'react';
import ReviewTagCheckboxGroup from '@/components/Input/ReviewTagCheckboxGroup';

function ReviewEdit() {
  const navigate = useNavigate();
  const {swimmingPoolId, reviewId} = useParams()
  const [checkedItems, setCheckedItems] = useState([]); 
  const [formState, setFormState] = useState({
    contents: '',
    ratingStar: '',
    tag: '',
  });
  const [reviewState, setReviewState] = useState({
    contents: '',
    ratingStar: '',
    tag: '',
  });
  const { closeModal, openModal, actionType, content, setContent } = useModalStore();
  const { putData:putReviewData } = useFetchPutData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/swimmingPools/${swimmingPoolId}/reviews/${reviewId}/modify`
  );
  const { data:fetchReviewData } = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/swimmingPools/${swimmingPoolId}/reviews/${reviewId}`
  );
const {contents,ratingStar} =reviewState

  useEffect(() => {
    if (fetchReviewData?.resultCode==='SUCCESS') {
      const updatedPostData = fetchReviewData.result;
      setReviewState(updatedPostData);
      const tags = updatedPostData.tag.split('/')
      setFormState({
        contents: updatedPostData.contents,
        ratingStar: updatedPostData.ratingStar,
        tag: tags,
      });
      setCheckedItems(tags)
    }
  }, [fetchReviewData]);
  console.log(formState);


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCancle = () => {
    closeModal();
  };

  const handleConfirm = async () => {
    try {
      if (actionType === 'back') {
        closeModal();
        navigate(`/search/list/${swimmingPoolId}/reviewList`);
      } else if (actionType === 'edit') {
        for (let field in formState) {
          if (!formState[field]) {
            const fieldNamesInKorean = {
              contents: '리뷰를',
              ratingStar: '별점을',
              tag: '태그를',
            };
            toast.error(`${fieldNamesInKorean[field]} 입력해주세요.`);
            return;
          }
        }
        await putReviewData(formState);
        closeModal();
        
        toast.success('리뷰가 수정 되었어요!')
        navigate(`/search/list/${swimmingPoolId}`);
      }
    } catch(error) {
      toast.error('서버와의 통신이 제대로 이루어지지 않았어요');

    }
  };
  const handleBack = () => {
    if (formState.contents === '' && formState.ratingStar === '') {
      navigate(`/search/list/${swimmingPoolId}`);
    } else {
      setContent('작성을 취소하시겠습니까?\n작성된 데이터는 복구되지 않습니다.');
      openModal('back');
    }
  };

  const handleInput = debounce((e) => {
   
    setFormState({
      ...formState,
      contents: e.target.value,
    });
  }, 400);

  const handleDone = () => {
    setContent('리뷰를 수정 하시겠습니까?');
    openModal('edit');
  };

  const handleStarClick = (value) => {
    setFormState({
      ...formState,
      ratingStar: value,
    });
  }

  const handleCheckboxClick = (item, isChecked) => {
    let newCheckedItems;
    
    if (isChecked) {
      newCheckedItems = [...checkedItems, item];
    } else {
      newCheckedItems = checkedItems.filter(i => i !== item);
    }
    
    setCheckedItems(newCheckedItems);
    
    // 결과 태그 문자열 계산
    const tagsString = newCheckedItems.join('/');
    
    setFormState({
      ...formState,
      tag: tagsString,
    });
  };



  return (
    <form
      className="relative flex flex-col min-w-[320px] max-w-[699px] mx-auto px-2.5 font-pretendard h-screen"
      onSubmit={handleSubmit}>
      <Helmet>
        <title>리뷰 작성 하기</title>
      </Helmet>
      <Header content="리뷰 작성 하기" noEdit={false} onClickBack={handleBack} onNavigate={true} />
      <p className="ml-2.5 text-sm my-2 text-secondary font-medium">적절한 항목을 선택해 주세요.</p>
      <div className='flex gap-x-2 gap-y-2 flex-wrap py-4 px-2'>
        <ReviewTagCheckboxGroup
        checkedItems={checkedItems}
        onItemCheck={handleCheckboxClick}/>
      </div>
      <p className="ml-2.5 text-sm my-2 text-secondary font-medium">리뷰를 남겨주세요.</p>
      <TextArea
        placeholder="다녀온 수영장의 리뷰를 남겨 주세요."
        onChange={handleInput}
        defaultValue={contents}
        className="flex-grow"
      />
      <p className="ml-2.5 text-sm mt-6 mb-2 text-secondary font-medium">별점을 매겨주세요.</p>
      <RatingStar 
      defaultValue={ratingStar}
      value={ratingStar}
      onClick={handleStarClick} />
      <ButtonSubmit
        onClick={handleDone}
        type="button" 
        className="my-10"
        content="작성완료" />
<ModalComponent>
  <p className="my-4">
    {String(content).split("\n").map((line, index) => (
      <Fragment key={index}>
        {line}
        <br />
      </Fragment>
    ))}
  </p>
  <ButtonConfirm onClick={handleCancle} content="취소" confirm={false} />
  <ButtonConfirm onClick={handleConfirm} content="확인" confirm={true} />
</ModalComponent>
    </form>
  );
}

export default ReviewEdit;
