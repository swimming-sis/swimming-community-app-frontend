import ButtonSubmit from '@/components/Button/ButtonSubmit';
import TextArea from '@/components/TextArea';
import Header from '@/layout/Header';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import debounce from '@/utils/debounce';
import toast from 'react-hot-toast';
import useFetchPostData from '@/hooks/useFetchPostData';
import { useNavigate } from 'react-router-dom';
import ButtonConfirm from '@/components/Button/ButtonComfirm';
import ModalComponent from '@/components/ModalComponent';
import { Fragment } from 'react';
import useModalStore from '@/zustand/useModalStore';
import RatingStar from '@/components/Input/RatingStar';
import { useParams } from 'react-router-dom';

function ReviewWrite() {
  const navigate = useNavigate();
  const {swimmingPoolId} = useParams()
  const [content, setContent] = useState('');
  const { fetchData: postReviewData } = useFetchPostData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/swimmingPools/${swimmingPoolId}/reviews/write`
  );
  const [formState, setFormState] = useState({
    contents: '',
    ratingStar: '',
  });
  const { closeModal, openModal, actionType } = useModalStore();
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
        navigate(`/search/list/${swimmingPoolId}`);
      } else if (actionType === 'write') {
        for (let field in formState) {
          if (!formState[field]) {
            const fieldNamesInKorean = {
              contents: '본문',
              ratingStar: '별점',
            };
            toast.error(`${fieldNamesInKorean[field]}을 입력해주세요.`);
            return;
          }
        }
        postReviewData(formState);
        closeModal();
        
        toast.success('리뷰가 작성 되었어요!')
        navigate(`/search/list/${swimmingPoolId}`);
      }
    } catch {
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
    setContent('리뷰를 작성 하시겠습니까?');
    openModal('write');
  };

  const handleStarClick = (value) => {
    setFormState({
      ...formState,
      ratingStar: value,
    });
  }

  return (
    <form
      className="relative flex flex-col min-w-[320px] max-w-[699px] mx-auto px-2.5 font-pretendard h-screen"
      onSubmit={handleSubmit}>
      <Helmet>
        <title>리뷰 작성 하기</title>
      </Helmet>
      <Header content="리뷰 작성 하기" noEdit={false} onClickBack={handleBack} onNavigate={true} />

      <p className="ml-2.5 text-sm my-2 text-secondary font-medium">리뷰를 남겨주세요.</p>
      <TextArea
        placeholder="다녀온 수영장의 리뷰를 남겨 주세요."
        onChange={handleInput}
        className="flex-grow"
      />
      <p className="ml-2.5 text-sm mt-6 mb-2 text-secondary font-medium">별점을 매겨주세요.</p>
      <RatingStar onClick={handleStarClick} />
      <ButtonSubmit
        onClick={handleDone}
        type="button" 
        className="my-10"
        content="작성완료" />
      <ModalComponent>
        <p className="my-4">
          {content.split('\n').map((line, index) => (
            <Fragment key={index}>
              {line}
              <br />
            </Fragment>
          ))}
        </p>
        <ButtonConfirm onClick={handleCancle} content="취소" confirm={false} />
        <ButtonConfirm onClick={handleConfirm} />
      </ModalComponent>
    </form>
  );
}

export default ReviewWrite;
