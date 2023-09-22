import useFetchData from '@/hooks/useFetchData';
import useModalStore from '@/zustand/useModalStore';
import { useEffect, useState } from 'react';
import CommunityList from '../../components/CommunityList';
import { useNavigate } from 'react-router-dom';
import useDeleteData from '@/hooks/useFetchDeleteData';
import ModalComplex from '@/components/ModalComplex';
import toast from 'react-hot-toast';

function MyAccountWrited() {
  const navigate = useNavigate();
  const [ communityId, setCommunityId ] =useState(null)
  const [postData, setPostData] = useState([]);
  const { openModal, closeModal, actionType, setContent, setActionType } = useModalStore();
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


  const handleConfirmWrited = async() => {
    try {
      if (actionType === 'writed') {
        await deleteData();
        fetchData()
        closeModal();
        navigate('/account/writed');
        setActionType('')
        toast.success('게시글이 삭제되었어요.')
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
      <ModalComplex onClick={handleConfirmWrited}/>
    </>
  );
}

export default MyAccountWrited;
