
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuthStore from '@/zustand/useAuthStore';
import toast from 'react-hot-toast';
import Header from '@/layout/Header';
import ButtonSubmit from '@/components/Button/ButtonSubmit';



function MyAccountDelete() {
  const navigate = useNavigate();
  const [checkState, setCheckState] =useState(false)
  const deleteAccount = useAuthStore(state => state.deleteAccount);
  
  
  const handleDeleteAccount = ()=>{
    deleteAccount()
    toast.success('회원탈퇴 되었습니다.');
    setTimeout(()=>{
      navigate('/'); 
    },300)
    }

    const handleCheck = ()=>{
      setCheckState(!checkState)
    }

  return (
    <form 
    onSubmit={handleDeleteAccount}
    className="flex flex-col relative min-w-[320px] max-w-[699px] mx-auto px-2.5 font-pretendard h-screen overflow-y-scroll mb-20">
      <Helmet>
        <title>회원 탈퇴</title>
      </Helmet>
      <Header noEdit={false} content={'회원 탈퇴'} />
      <div className='px-6 pr-4 flex-grow'>
        <strong className='block font-medium mt-10'>회원 탈퇴 동의서</strong>
        <ul className='list-disc my-5 px-2'>
          <li className='my-10 text-sm'>
        회원 탈퇴 시, 정보 통신망 이용촉진 및 정보보호 등에 관한 법률에 의거하여 수집된 개인정보를 즉시 삭제되며 복구는 불가합니다.

          </li>
        
          <li className='my-10 text-sm'>
        회원 탈퇴 시 삭제되는 항목에는 게시물 글, 댓글, 리뷰, 일지 등의 회원의 개인 정보가 삭제됩니다. 

          </li>
          </ul>
      </div>
      <div className='flex items-start'>
        <input
        type="checkbox"
        name="deleteAccount"
        id="deleteAccount"
        onClick={handleCheck}
        className='ml-4 mr-3 mt-1'/>
        <label
        className='text-sm'
        htmlFor="deleteAccount">
          위 사항을 모두 이해하였으며, 회원탈퇴를 진행하고자 하는 경우 아래 버튼을 클릭해주세요.
        </label>
      </div>

    <ButtonSubmit 
    content='탈퇴하기'
    className='mb-14 mt-6'
    disabled={!checkState}/>
    </form>
  );
}


export default MyAccountDelete;
