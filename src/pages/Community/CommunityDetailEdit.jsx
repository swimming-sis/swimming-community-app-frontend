import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import CategoryRadioForm from '@/components/Category/CategoryRadioForm';
import TextArea from '@/components/TextArea';
import useFetchData from '@/hooks/useFetchData';
// import useGetData from '@/hooks/tanstackQuery/useGetData';
import Header from '@/layout/Header';
import debounce from '@/utils/debounce';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useFetchPutData from '@/hooks/useFetchPutData';
import ModalComponent from '@/components/ModalComponent';
import ButtonConfirm from '@/components/Button/ButtonComfirm';
import useModalStore from '@/zustand/useModalStore';
import useDeleteData from '../../hooks/useFetchDeleteData';
import { Fragment } from 'react';
import { useRef } from 'react';

function CommunityDetailEdit() {
  const  formRef  = useRef(null);
  const navigate = useNavigate();
  let { communityId } = useParams();
  const [postData, setPostData] = useState([]);
  const [formState, setFormState] = useState({
    category: '',
    title: '',
    body: '',
  });
  const { closeModal, openModal, actionType, content, setContent } = useModalStore();
  const fetchListData = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${communityId}/detail`
  );
  const { putData } = useFetchPutData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${communityId}/modify`
  );
  const { deleteData } = useDeleteData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${communityId}/delete`
  );
  
  const { title, body} = postData;

  // postData수정
  useEffect(() => {
    if (fetchListData.data?.result) {
      const updatedPostData = fetchListData.data.result;
      setPostData(updatedPostData);
      setFormState({
        category: updatedPostData.category,
        title: updatedPostData.title,
        body: updatedPostData.body,
      });
    }
  }, [fetchListData?.data]);

  const handleCheckCategory = (e) => {
    setFormState((prev) => ({
      ...prev, 
      category: e.target.value 
    }));
  };
  const handleInput = debounce((e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }, 400);

  const handleCancle = () => {
    closeModal();
  };

  const handleConfirm = async () => {
    try{

      if (actionType === 'edit') {
        await putData(formState);
        closeModal();
        navigate('/community');
      } else if (actionType === 'delete') {
        await deleteData();
        closeModal();
        navigate('/community');
      } else if (actionType === 'back') {
        closeModal();
        navigate('/community');
        // () => navigate(-2);
        
      }
    }
    catch{
      toast.error('서버와의 통신이 제대로 이루어지지 않았어요')
    }
  };
  const handleEdit = () => {
    setContent('수정 하시겠습니까?');
    for (let field in formState) {
      if (!formState[field]) {
        const fieldNamesInKorean = {
          category: '카테고리',
          title: '제목',
          body: '본문',
        };
        toast.error(`${fieldNamesInKorean[field]}을 입력해주세요.`);
        return;
      }
    }
    openModal('edit');
  };
  const handleDelete = () => {
    setContent('삭제 하시겠습니까?\n삭제된 데이터는 복구되지 않습니다.');
    openModal('delete');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleBack = () => {
    setContent('수정을 취소하시겠습니까?\n수정된 데이터는 복구되지 않습니다.');
    openModal('back');
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col min-w-[320px] max-w-[699px] mx-auto px-2.5 font-pretendard h-screen overflow-y-scroll mb-20">
      <Helmet>
        <title>게시글 수정하기</title>
      </Helmet>
      <Header
        noEdit={false}
        deleteButton={true}
        onNavigate={true}
        onClickEdit={handleEdit}
        onClickDelete={handleDelete}
        onClickBack={handleBack}
      />
      <section>
        <h1 className="sr-only">게시글 내용</h1>

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
            defaultValue={title}
            className="border shadow-md w-full h-9 rounded-lg text-sm px-2"
          />
        </div>
        <TextArea
          placeholder="게시글을 수정 또는 삭제할 수 있습니다."
          onChange={handleInput}
          defaultValue={body}
          className="h-60 mb-auto flex-grow"
        />
      </section>
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

export default CommunityDetailEdit;
