import ButtonConfirm from '@/components/Button/ButtonComfirm';
import ModalComponent from '@/components/ModalComponent';
import useFetchData from '@/hooks/useFetchData';
import useModalStore from '@/zustand/useModalStore';
import { Fragment, useEffect, useState } from 'react';
import CommunityList from '../../components/CommunityList';
import { useNavigate } from 'react-router-dom';
import useDeleteData from '@/hooks/useFetchDeleteData';

function MyAccountWrited() {
  const navigate = useNavigate();
  const [ communityId, setCommunityId ] =useState(null)
  const [postData, setPostData] = useState([]);
  const { openModal, closeModal, actionType, content, setContent } = useModalStore();
  const { data: fetchListData,fetchData } = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/my`
  );
  const { deleteData } = useDeleteData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${communityId}/delete`
  );


  
  useEffect(() => {
    if (fetchListData?.result?.content) {
      const orderDate = fetchListData.result.content.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPostData(orderDate);
    }
  }, [fetchListData]);

  const handleWrited = (e) => {
    setCommunityId(e.currentTarget.getAttribute('data-post-id'))
    setContent('게시글을 삭제 하시겠습니까?\n삭제된 게시글은 복구되지 않습니다.');

    openModal('writed');
  };

  const handleCancle = () => {
    closeModal();
  };
  const handleConfirm = async() => {
    try {
      if (actionType === 'writed') {
        await deleteData();
        fetchData()
        closeModal();
        navigate('/account/writed');
      }

    }catch(error){
      console.log(error);
    }
  };
  return (
    <>
      {postData.map((post) => (
        <CommunityList
          id={post.postId}
          key={post.postId}
          title={post.title}
          content={post.body}
          user={post.nickName}
          likeCount={post.likeCnt}
          categoryTag={post.category}
          chatCount={post.commentCnt}
          datetime={post.createdAt}
          onClick={handleWrited}
          userName={post.userName}
        />
      ))}
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
    </>
  );
}

export default MyAccountWrited;
