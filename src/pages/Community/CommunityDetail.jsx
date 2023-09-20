import CommentList from '@/components/CommentList';
import Chat from '@/components/Icon/Chat';
import Heart from '@/components/Icon/Heart';
import SendingForm from '@/components/SendingForm';
import useFetchData from '@/hooks/useFetchData';
import useFetchPostData from '@/hooks/useFetchPostData';
import RootLayout from '@/layout/RootLayout';
import debounce from '@/utils/debounce';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import CategoryTag from '../../components/Category/CategoryTag';
import { useNavigate } from 'react-router-dom';
import useDeleteData from '../../hooks/useFetchDeleteData';
import useFetchPutData from '@/hooks/useFetchPutData';
import ModalComponent from '@/components/ModalComponent';
import { Fragment } from 'react';
import ButtonConfirm from '@/components/Button/ButtonComfirm';
import useModalStore from '@/zustand/useModalStore';

function CommunityDetail() {
  const navigate = useNavigate();
  let { communityId } = useParams();
  const [postId, setPostId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [postData, setPostData] = useState([]);
  const [like, setLike] = useState({
    result: false,
    resultCode: '',
    likeState: false,
  });
  
  const [editState, setEditState] = useState(false);
  const [editCommentData, setEditCommentData] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [formState, setFormState] = useState({
    comment: '',
    value: '',
    editComment:''
  });
  const { openModal, closeModal, actionType, content, setContent, } = useModalStore();
  const fetchListData = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${communityId}/detail`
  );
  const fetchCommentData = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${communityId}/comments`
  );
  const { fetchData: fetchPostData } = useFetchPostData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${communityId}/comments/write`
  );
  const { putData: putCommentData } = useFetchPutData(
    `${
      import.meta.env.VITE_UPUHUPUH_DB_URL
    }/api/v1/posts/${postId}/comments/${commentId}/modify`
  );
  const fetchLikeData = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${communityId}/likes`
  );
  const { data: deleteLikeStatus, deleteData: deleteLikeData } = useDeleteData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${communityId}/likes`
  );
  const { data: postLikeStatus, fetchData: postLikeData } = useFetchPostData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${communityId}/likes`
  );
  const { deleteData:deleteCommentData } = useDeleteData(
    `${
      import.meta.env.VITE_UPUHUPUH_DB_URL
    }/api/v1/posts/${communityId}/comments/${commentId}/delete`
  );

  const debouncedSetComment = useCallback(
    debounce((value) => setFormState((prev) => ({ ...prev, comment: value })), 500),
    []
  );

  const { userName, nickName, title, body, category, likeCnt, commentCnt, createdAt } = postData;

  //작성자인지 확인
  useEffect(() => {
    const localUser = window.localStorage.getItem('user');
    if (userName === JSON.parse(localUser).value) {
      setEditState(true);
    }

  }, [postData, commentData]);


  //모달 취소 핸들러
  const handleCancle = () => {
    closeModal();
  };

//모달 확인 핸들러
  const handleConfirm = async () => {
    try {
      if (actionType === 'comment') {
        await deleteCommentData();
        fetchCommentData.fetchData();
        closeModal();
      } else if (actionType === 'edit') {
        await putCommentData({ comment:editCommentData });
        fetchCommentData.fetchData();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (e) => {
    setPostId(e.currentTarget.getAttribute('data-post-id'));
    setCommentId(e.currentTarget.getAttribute('data-comment-id'));
    setContent('댓글을 수정 하시겠습니까?\n수정 전 댓글은 복구되지 않습니다.');
    openModal('edit');
  };
  const handleComment = (e) => {
    setPostId(e.currentTarget.getAttribute('data-post-id'));
    setCommentId(e.currentTarget.getAttribute('data-comment-id'));
    setContent('댓글을 삭제 하시겠습니까?\n삭제된 댓글은 복구되지 않습니다.');
    openModal('comment');
  };

  // 페이지 로드 시 서버에서 현재 사용자의 좋아요 상태 확인
  useEffect(() => {
    const fetchDataCheck = async () => {
      try {
        const tokenItem = localStorage.getItem('token');
        let authHeader = '';
        if (tokenItem) {
          // eslint-disable-next-line no-useless-escape
          const tokenValue = JSON.parse(tokenItem).value.replace(/\'/g, '');
          authHeader = `Bearer ${tokenValue}`;
        }

        const defaultOptions = {
          method: 'GET',
          headers: {
            Authorization: authHeader,
          },
        };

        const response = await fetch(
          `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${communityId}/likes`,
          defaultOptions
        );

        const data = await response.json();

        setLike((prevState) => ({
          ...prevState,
          result: data.result,
          resultCode: data.resultCode,
          likeState: data.result,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataCheck();
  }, [postData]);

  //postData수정
  useEffect(() => {
    if (fetchListData.data?.result) {
      const updatedPostData = fetchListData.data.result;
      setPostData(updatedPostData);
    }
  }, [fetchListData.data, fetchLikeData]);

  // commentData 수정
  useEffect(() => {
    if (fetchCommentData.data?.result?.content) {
      const orderDate = fetchCommentData.data.result.content.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setCommentData(orderDate);
    }
  }, [fetchCommentData.data]);


  //댓글 입력제어
  const handleInput = (e) => {
    setFormState({
      ...formState,
      value: e.target.value,
    });
    debouncedSetComment(e.target.value);
  };
  //댓글 수정창
  const handleEditInput = (e) => {
    setEditCommentData(e.target.value);
    debouncedSetComment(e.target.value);
  };
  //댓글 onSubmit
  const handleSendingComment = async (e) => {
    e.preventDefault();

    if (!formState.comment) {
      toast.error(`댓글을 입력해주세요. 😉`);
      return;
    } else {
      try {
        await fetchPostData({ comment: formState.comment });
        fetchCommentData.fetchData();
        toast.success('댓글을 작성했습니다');
        setFormState({ comment: '', value: '' });
      } catch (error) {
        toast.error('댓글 작성 실패 :', error);
      }
    }
  };

  // // 좋아요 버튼 핸들러
  const handleLike = async () => {
    if (like.likeState) {
      await deleteLikeData();
      setLike((prevState) => ({
        ...prevState,
        result: deleteLikeStatus?.result,
        resultCode: deleteLikeStatus?.resultCode,
        likeState: false,
      }));
    } else {
      await postLikeData({ postId: communityId });
      setLike((prevState) => ({
        ...prevState,
        result: postLikeStatus?.result,
        resultCode: postLikeStatus?.resultCode,
        likeState: true,
      }));
    }
    await fetchListData.fetchData();
  };


  return (
    <div className="flex flex-col min-w-[320px] max-w-[699px] mx-auto px-2.5 font-pretendard h-screen overflow-y-scroll mb-20">
      <Helmet>
        <title>커뮤니티</title>
      </Helmet>
      <RootLayout
        noEdit={editState}
        onClickEdit={() => navigate(`/community/${communityId}/edit`)}
      />
      <section>
        <h1 className="sr-only">게시글 내용</h1>
        <div className="flex items-center mt-4">
          <CategoryTag content={category} />
          <p className="text-sm text-secondary font-semibold">{title}</p>
        </div>
        <div className="relative border shadow-md rounded-lg min-h-[200px] px-2.5 py-1.5 mt-3 mb-2">
          <div className="flex gap-x-1 items-center">
            <p className="text-gray/500 font-semibold text-xs ml-1">{nickName}</p>
            <time
              dateTime="YYYY-MM-DDThh:mm:ss"
              className="text-gray/500 font-light text-[0.625rem]">
              {createdAt}
            </time>
          </div>
          <p className="text-sm px-1">{body}</p>
          <div className="flex justify-end items-center text-sm h-6 absolute right-3 bottom-1.5">
            <button type="button" onClick={handleLike}>
              <Heart className="w-4 h-auto" fill={like.likeState} />
            </button>
            <span className="mr-2 ml-0.5">{likeCnt}</span>
            <Chat className="w-4 h-auto" />
            <span className="ml-0.5">{commentCnt}</span>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-xs font-semibold text-gray/500 ml-2 mt-3 mb-2">
          댓글 {commentCnt} <span aria-hidden="true">&gt;</span>
        </h2>
        <>
          {commentData.map((comment) => {
            return (
              <CommentList
                commentId = {comment.commentId}
                postId = {comment.postId}
                key={comment.commentId}
                commentContent={comment.comment}
                chatCount={commentCnt}
                datetime={comment.createdAt}
                user={comment.nickName}
                userName={comment.userName}
                onChange={handleEditInput}
                onClick={handleEdit}
                onClickDelete={handleComment}
              />
            );
          })}
        </>
        <SendingForm
          value={formState.value}
          onChange={handleInput}
          onSubmit={handleSendingComment}
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
    </div>
  );
}

export default CommunityDetail;
