import ButtonMyCount from '@/components/Button/ButtonMyCount';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// import propTypes from 'prop-types';
import useFetchData from '../../hooks/useFetchData';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import RootLayout from '@/layout/RootLayout';
import { useEffect } from 'react';
import Crown from '@/components/Icon/Crown';

function MyAccount() {
  const navigate = useNavigate();

  const [postData, setPostData] = useState([]);
  const [commentData, setCommentData] = useState([]);

  const { data: fetchAccountData } = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/users/`
  );
  const {data: fetchListData} = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/my`
  );
  const fetchCommentData = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/posts/comments/my`
  );
  // postData의 갯수 가져오기
  useEffect(() => {
    if (fetchListData?.result?.content) {
      const orderDate = fetchListData.result.content.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));
      setPostData(orderDate)
    }
  }, [fetchListData]);

  
  useEffect(() => {
    if (fetchCommentData.data?.result?.content) {
      const orderDate = fetchCommentData.data.result.content.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setCommentData(orderDate);
    }
  }, [fetchCommentData.data]);

  // const handleConfirm = () => {
  //   
  //  
  //   } else if (actionType === 'review') {
  //     closeModal();
  //     navigate('/account/review');
  //   }else if (actionType === 'edit') {
  //     closeModal();
  //     navigate('/account/review');
  //   }
  // };


  // const handleReview = ()=>{
  //   setContent('리뷰를 삭제 하시겠습니까?\n삭제된 리뷰는 복구되지 않습니다.')
  //   openModal('review')
  //   }


  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto px-2.5 font-pretendard h-screen overflow-y-scroll mb-20">
      <Helmet>
        <title>내 계정</title>
      </Helmet>
      <RootLayout
        content={'내 계정'}
        onClickEdit={() => {
          navigate('/accountEdit');
        }}
      />
      <ul className="text-sm py-4 px-2.5">
        <li className="flex my-4 ">
          <strong className="w-20">아이디</strong>
          <p>{fetchAccountData?.result.userName}</p>
        </li>
        <li className="flex my-4">
          <strong className="w-20">닉네임</strong>
          <p>{fetchAccountData?.result.nickName}</p>
        </li>
        <li className="flex my-4">
          <strong className="w-20">전화번호</strong>
          <p>{fetchAccountData?.result.phoneNumber}</p>
        </li>
        <li className="flex mt-8 items-end">
          <span className='text-[26px] mr-2'><Crown/></span> <strong className="w-20">
          나의 활동</strong>
        </li>
      </ul>
      <div className="flex gap-x-1">
        <Link className="block w-full flex-grow" to="/account/writed">
          <ButtonMyCount 
          content={`글 ${postData.length}개`} 
          shape={'left-round'} 
          />
        </Link>
        <Link className="block w-full flex-grow" to="/account/comment">
          <ButtonMyCount 
          content={`댓글 ${commentData.length}개`} 
          shape={'square'} 
          />
        </Link>
        <Link className="block w-full flex-grow" to="/account/review">
          <ButtonMyCount 
          content={`리뷰 n개`} 
          shape={'right-round'} 
          />
        </Link>
      </div>
      <Outlet />

    </div>
  );
}
// MyAccount.propTypes = {
//   status: propTypes.string,
// };

export default MyAccount;
