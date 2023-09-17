import CommentList from '@/components/CommentList';
import Chat from '@/components/Icon/Chat';
import Heart from '@/components/Icon/Heart';
import SendingForm from '@/components/SendingForm';
import useFetchData from '@/hooks/useFetchData';
import RootLayout from '@/layout/RootLayout';
import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import CategoryTag from '../../components/Category/CategoryTag';

function CommunityDetail({
  fill = false,
  commentContent='내용'
}) {
  let { communityId } = useParams()
  const [postData, setPostData] = useState([]);
  const [editState, setEditState] = useState(false);
  const fetchListData = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/${communityId}/detail`
  );
  const {nickName,title,body,category,likeCnt,commentCnt,createdAt} =postData


  useEffect(() => {
    if (fetchListData.data?.result) {
      setPostData(fetchListData.data.result);
    }
    console.log(postData);
  }, [fetchListData.data?.result]);
  
  return (
    <div className="flex flex-col min-w-[320px] max-w-[699px] mx-auto px-2.5 font-pretendard h-screen overflow-y-scroll">
      <Helmet>
        <title>커뮤니티</title>
      </Helmet>
      <RootLayout noEdit={editState} />
      <section>
        <h1 className="sr-only">게시글 내용</h1>
        <div className="flex items-center">
          <CategoryTag content={category} />
          <p className="text-sm text-secondary font-semibold">{title}</p>
        </div>
        <div className="relative border shadow-md rounded-lg min-h-[200px] px-2.5 py-1.5 mt-3 mb-2">
          <div className="flex gap-x-1 items-center">
            <p className="text-gray/500 font-semibold text-xs ml-1">{postData.nickName}</p>
            <time dateTime='YYYY-MM-DDThh:mm:ss' className='text-gray/500 font-light text-[0.625rem]'>{createdAt}</time>
          </div>
          <p className="text-sm px-1">{body}</p>
          <div className="flex justify-end items-center text-sm h-6 absolute right-3 bottom-1.5">
            <button type="button">
              <Heart className="w-4 h-auto" fill={fill}  />
            </button>
            <span className="mr-2 ml-0.5">{likeCnt}</span>
              <Chat className="w-4 h-auto" />
            <span className="ml-0.5">{commentCnt}</span>
          </div>
        </div>
      </section>
      <section>
        <h2 className='text-xs font-semibold text-gray/500 ml-2 mt-3 mb-2'>댓글 {commentCnt} <span aria-hidden='true'>&gt;</span></h2>
        <ol className=" border shadow-md rounded-lg  text-sm">
        <CommentList commentContent={commentContent} chatCount={0} datetime={createdAt} user={nickName}/>
        </ol>
        <SendingForm />
      </section>
    </div>
  );
}

CommunityDetail.propTypes = {
  id: propTypes.number,
  edit: propTypes.bool,
  fill: propTypes.bool,
  title: propTypes.string,
  content: propTypes.string,
  likeCount: propTypes.number,
  chatCount: propTypes.number,
  user: propTypes.string,
  datetime: propTypes.string,
  categoryTag: propTypes.string,
  commentContent: propTypes.string,
};

export default CommunityDetail;
