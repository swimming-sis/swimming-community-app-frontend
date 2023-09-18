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
import useDeleteData from '../../hooks/useFetchDeleteData';



function CommunityDetail() {
  let { communityId } = useParams();
  const [postData, setPostData] = useState([]);
  const [ like , setLike] =useState(false)
  const [commentData, setCommentData] = useState([]);
  const [editState] = useState(false);
  const [formState, setFormState] = useState({
    comment: '',
    value: '',
  });
  const fetchListData = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${communityId}/detail`
  );
  const fetchCommentData = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${communityId}/comments`
  );
  const { fetchData } = useFetchPostData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${communityId}/comments/write`
  );


  const { deleteData } = useDeleteData(`${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${communityId}/comments/write`)



  const debouncedSetComment = useCallback(
    debounce((value) => setFormState((prev) => ({ ...prev, comment: value })), 200),
    []
  );

  const { nickName, title, body, category, likeCnt, commentCnt, createdAt } = postData;

  //postData수정
  useEffect(() => {
    if (fetchListData.data?.result) {
      setPostData(fetchListData.data.result);
    }
  }, [fetchListData.data]);

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

  //댓글 onSubmit
  const handleSendingComment = async (e) => {
    e.preventDefault();

    if (!formState.comment) {
      toast.error(`댓글을 입력해주세요. 😉`);
      return;
    } else {
      try {
        await fetchData({ comment: formState.comment });
        fetchCommentData.fetchData();
        toast.success('댓글을 작성했습니다');
        setFormState({ comment: '', value: '' });
      } catch (error) {
        toast.error('댓글 작성 실패 :', error);
      }
    }
  };

  const handleLike =() => {
    if (like) {

    }else{
      
    }
  }

  // useEffect(()=>{
  //   setLike(!like)
  // },[like])

  return (
    <div className="flex flex-col min-w-[320px] max-w-[699px] mx-auto px-2.5 font-pretendard h-screen overflow-y-scroll mb-20">
      <Helmet>
        <title>커뮤니티</title>
      </Helmet>
      <RootLayout noEdit={editState} />
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
            <button 
            type="button"
            onClick={handleLike}>
              <Heart className="w-4 h-auto" fill={like} />
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
        <ol className="border shadow-md rounded-lg text-sm">
          {commentData.map((comment) => {
            return (
              <CommentList
                key={comment.commentId}
                commentContent={comment.comment}
                chatCount={commentCnt}
                datetime={comment.createdAt}
                user={comment.nickName}
                commentId={comment.commentId}
              />
            );
          })}
        </ol>
        <SendingForm
          value={formState.value}
          onChange={handleInput}
          onSubmit={handleSendingComment}
        />
      </section>
    </div>
  );
}


export default CommunityDetail;
