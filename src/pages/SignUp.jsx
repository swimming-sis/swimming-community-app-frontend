import propTypes from 'prop-types';

import ButtonSubmit from '@/components/Button/ButtonSubmit';
import LogInText from '@/components/Input/LogInText';
import Logo from '@/components/Logo';
import Timer from '@/components/Timer';
import { Link } from 'react-router-dom';

function SignUp ({validationTel='send'}) {
  return (
    <form className="font-pretendard flex flex-col h-full">
      <h1 className="sr-only">어푸어푸 로그인</h1>
      <Logo width={200} height={100} className={'mt-10 mb-8'} />
      <LogInText
        id={'loginId'}
        content={'아이디'}
        type="text"
        validation={true}
        placeholder={''}
        errorMessage={'잘못된 아이디 입니다.'}
      />
      <LogInText
        id={'loginName'}
        content={'닉네임'}
        type="text"
        validation={true}
        placeholder={''}
        errorMessage={'이미 다른 사용자가 사용 중 입니다.'}
      />
      <LogInText
        id={'loginPw'}
        content={'비밀번호'}
        type="password"
        validation={true}
        placeholder={''}
        errorMessage={''}
      />
      <LogInText
        id={'loginPwCheck'}
        content={'비밀번호 확인'}
        type="password"
        validation={true}
        placeholder={''}
        errorMessage={'비밀번호가 일치하지 않습니다.'}
      />
      <div className="flex">
        <LogInText
          id={'loginTel'}
          content={'전화번호'}
          type="tel"
          className="mb-8 flex-grow"
          validation={true}
          placeholder={''}
          errorMessage={'잘못된 형식의 전화번호 입니다.'}
        />
        <button
          type="submit"
          className="bg-primary text-white font-pretendard text-sm font-semibold h-10 px-4 rounded-xl my-auto mr-2.5">
          인증하기
        </button>
      </div>
      {(validationTel==='send') &&  <div 
        className='relative flex '>
        <input
          type="number"
          name="loginTelCheck"
          id="loginTelCheck"
          className="flex-grow h-8 px-1 py-5 border border-gray/300 rounded-lg ml-2.5 mr-2
            "
        />
        <label htmlFor="loginTelCheck" className="전화번호 인증"></label>
        <Timer className='absolute right-28 top-2' />
        <button
          type="submit"
          className="bg-primary text-white font-pretendard text-sm font-semibold h-10 px-4 rounded-xl my-auto mr-2.5">
          인증완료
        </button>
      </div>}

      <Link to='/main'>
        <ButtonSubmit className="flex flex-col items-center my-8" content={'회원가입'} />
      </Link>
    </form>
  );
}

SignUp.propTypes = {
  validationTel: propTypes.string,
};
export default SignUp;
