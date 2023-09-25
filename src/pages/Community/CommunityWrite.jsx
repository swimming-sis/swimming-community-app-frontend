import ButtonSubmit from '@/components/Button/ButtonSubmit';
import CategoryRadioForm from '@/components/Category/CategoryRadioForm';
import TextArea from '@/components/TextArea';
import Header from '@/layout/Header';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import debounce from '@/utils/debounce';
import toast from 'react-hot-toast';
import useFetchPostData from '@/hooks/useFetchPostData';
import { useNavigate } from 'react-router-dom';
import useModalStore from '@/zustand/useModalStore';
import ModalComplex from '@/components/ModalComplex';
// import AWSUPLoadFile from '@/components/AWSUpLoadFile';

function CommunityWrite() {
  const navigate = useNavigate();
  const { fetchData } = useFetchPostData(`${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts`);
  const [formState, setFormState] = useState({
    category: '',
    title: '',
    body: '',
  });
  const { closeModal, openModal, actionType, setContent } = useModalStore();
  const handleSubmit = (e) => {
    e.preventDefault();
  };


  const handleConfirm = async () => {
    try {
      if (actionType === 'back') {
        closeModal();
        navigate('/community');
      } else if (actionType === 'write') {
        for (let field in formState) {
          if (!formState[field]) {
            // 만약 어떤 필드가 비어있다면, 에러 메시지를 설정하고 함수를 종료합니다.
            const fieldNamesInKorean = {
              category: '카테고리',
              title: '제목',
              body: '본문',
            };
            toast.error(`${fieldNamesInKorean[field]}을 입력해주세요.`);
            return;
          }
        }
        fetchData(formState);
        closeModal();
        setTimeout(() => {
          navigate('/community');
        }, 500);
      }
    } catch {
      toast.error('서버와의 통신이 제대로 이루어지지 않았어요');
    }
  };
  const handleBack = () => {
    if (formState.category === '' && formState.title === '' && formState.body === '') {
      navigate('/community');
    } else {
      setContent('작성을 취소하시겠습니까?\n작성된 데이터는 복구되지 않습니다.');
      openModal('back');
    }
  };
  const handleCheckCategory = (e) => {
    setFormState({ ...formState, category: e.target.value });
  };
  const handleInput = debounce((e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }, 200);
  const handleDone = () => {
    setContent('게시글을 작성 하시겠습니까?');
    openModal('write');
  };

  return (
    <form
      className="flex flex-col min-w-[320px] max-w-[699px] mx-auto px-2.5 font-pretendard h-screen"
      onSubmit={handleSubmit}>
      <Helmet>
        <title>커뮤니티 글쓰기</title>
      </Helmet>
      <Header content="글쓰기" noEdit={false} onClickBack={handleBack} onNavigate={true} />
      <CategoryRadioForm
        write={true}
        onClick={handleCheckCategory}
        selectedCategory={formState.category}
        onCategroyChange={handleCheckCategory}
      />
      <div className="flex mb-4 items-center">
        <label htmlFor="categoryWrite" className="flex-shrink-0 mr-2 text-sm text-secondary">
          제목
        </label>
        <input
          type="text"
          name="title"
          id="categoryWrite"
          onChange={handleInput}
          className="border shadow-md w-full h-9 rounded-lg text-sm px-2"
        />
      </div>
      <TextArea
        placeholder="커뮤니티에 게시글을 작성해 보세요"
        onChange={handleInput}
        className="h-60 mb-auto flex-grow"
      />
      {/* <AWSUPLoadFile/> */}
      <ButtonSubmit onClick={handleDone} type="button" content="작성완료" className="mt-10 mb-10" />
    <ModalComplex onClick={handleConfirm}/>
    </form>
  );
}

export default CommunityWrite;
