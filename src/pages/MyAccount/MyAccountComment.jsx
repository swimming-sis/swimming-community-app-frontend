import CommentList from '@/components/CommentList';
import ModalComplex from '@/components/ModalComplex';
import useFetchData from '@/hooks/useFetchData';
import useDeleteData from '@/hooks/useFetchDeleteData';
import useFetchPutData from '@/hooks/useFetchPutData';
import debounce from '@/utils/debounce';
import useModalStore from '@/zustand/useModalStore';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function MyAccountComment() {
  const navigate = useNavigate();
  const [commentData, setCommentData] = useState([]);
  const [communityId, setCommunityId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [comment, setComment] = useState('');
  const { openModal, closeModal, actionType, setContent, setActionType} = useModalStore();
  const { data: fetchCommentData, fetchData } = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/comments/my`
  );
  const { deleteData } = useDeleteData(
    `${
      import.meta.env.VITE_UPUHUPUH_DB_URL
    }/api/v1/posts/${communityId}/comments/${commentId}/delete`
  );
  const { putData } = useFetchPutData(
    `${
      import.meta.env.VITE_UPUHUPUH_DB_URL
    }/api/v1/posts/${communityId}/comments/${commentId}/modify`
  );
  useEffect(() => {
    if (fetchCommentData?.result?.content) {
      const orderDate = fetchCommentData.result.content.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setCommentData(orderDate);
    }
  }, [fetchCommentData]);

  const handleInput = debounce((e)=>{
    setComment(e.target.value)
  },200)

  const handleConfirm = async () => {
    try {
      if (actionType === 'comment') {
        await deleteData();
        fetchData();
        closeModal();
        navigate('/account/comment');
        setActionType('')
        toast.success('댓글이 삭제 되었어요.')
      } else if (actionType === 'edit') {
        await putData({ comment });
        fetchData();
        closeModal();
        navigate('/account/comment');
        setActionType('')
        toast.success('댓글이 수정 되었어요.')
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleComment = (e) => {
    setCommunityId(e.currentTarget.getAttribute('data-post-id'));
    setCommentId(e.currentTarget.getAttribute('data-comment-id'));
    setContent('댓글을 삭제 하시겠습니까?\n삭제된 댓글은 복구되지 않습니다.');
    openModal('comment');
  };

  const handleEdit = (e) => {
    setCommunityId(e.currentTarget.getAttribute('data-post-id'));
    setCommentId(e.currentTarget.getAttribute('data-comment-id'));
    setContent('댓글을 수정 하시겠습니까?\n수정 전 댓글은 복구되지 않습니다.');
    openModal('edit');
  };

  return (
    <>
      {commentData.map((comment) => {
        return (
          <CommentList
            postId={comment.postId}
            commentId={comment.commentId}
            key={comment.commentId}
            commentContent={comment.comment}
            chatCount={commentData.length}
            datetime={comment.createdAt}
            user={comment.nickName}
            userName={comment.userName}
            onClick={handleEdit}
            onChange={handleInput}
            onClickDelete={handleComment}
          />
        );
      })}
<ModalComplex onClick={handleConfirm}/>
    </>
  );
}

export default MyAccountComment;
