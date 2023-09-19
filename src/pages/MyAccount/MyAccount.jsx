import ButtonMyCount from '@/components/Button/ButtonMyCount';
import Header from '@/layout/Header';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// import propTypes from 'prop-types';
import useFetchData from '../../hooks/useFetchData';
import { Link } from 'react-router-dom';
import ModalComponent from '@/components/ModalComponent';
import { Fragment } from 'react';
import ButtonConfirm from '@/components/Button/ButtonComfirm';
import useModalStore from '@/zustand/useModalStore';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import RootLayout from '@/layout/RootLayout';

function MyAccount() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const { closeModal, openModal, actionType } = useModalStore();
  const { data: fetchAccountData } = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/users/`
  );

  const handleCancle = () => {
    closeModal();
  };

  const handleConfirm = () => {
    if (actionType === 'writed') {
      closeModal();
      navigate('/account/writed');
    } else if (actionType === 'comment') {
      closeModal();
      navigate('/account/comment');
    } else if (actionType === 'review') {
      closeModal();
      navigate('/account/review');
    }else if (actionType === 'edit') {
      closeModal();
      navigate('/account/review');
    }
  };

  // const handleWrited = ()=>{
  //   setContent('게시글을 삭제 하시겠습니까?\n삭제된 게시글은 복구되지 않습니다.')
  //   openModal('writed')
  //   }
  // const handleComment = ()=>{
  //   setContent('댓글을 삭제 하시겠습니까?\n삭제된 댓글은 복구되지 않습니다.')
  //   openModal('comment')
  //   }
  // const handleReview = ()=>{
  //   setContent('리뷰를 삭제 하시겠습니까?\n삭제된 리뷰는 복구되지 않습니다.')
  //   openModal('review')
  //   }
  // const handleEdit = ()=>{
  //   setContent('수정하시겠습니까?')
  //   openModal('edit')
  //   }

  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto px-2.5 font-pretendard h-screen overflow-y-scroll">
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
        <li className="flex my-4">
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
        <li className="my-4">
          <strong className="w-20">나의 활동</strong>
        </li>
      </ul>
      <div className="flex gap-x-1">
        <Link className="block w-full flex-grow" to="/account/writed">
          <ButtonMyCount 
          content={`글 n개`} 
          shape={'left-round'} 
          />
        </Link>
        <Link className="block w-full flex-grow" to="/account/comment">
          <ButtonMyCount 
          content={`댓글 n개`} 
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
// MyAccount.propTypes = {
//   status: propTypes.string,
// };

export default MyAccount;
