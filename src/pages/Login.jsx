import ButtonSubmit from '@/components/Button/ButtonSubmit';
import Chat from '@/components/Icon/Chat';
import LogInText from '@/components/Input/LogInText';
import Logo from '@/components/Logo';
import useStorage from '@/hooks/useStorage';
import debounce from '@/utils/debounce';
import useAuthStore from '@/zustand/useAuthStore';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const signIn = useAuthStore((state) => state.signIn);
  const storage = useStorage('users', null);
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    userName: '',
    password: '',
  });

  const [autoLogin, setAutoLogin] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

      try {
        const userData = await signIn(formState);
        if (userData && userData.user) {
          console.log('로그인 성공');
          if (autoLogin) {
            storage.update(userData.user.userName);
          }
        } else {
          console.error('로그인 실패: 사용자 데이터가 유효하지 않음');
        }
      } catch (error) {
        console.error('로그인 실패:', error);
      }
    navigate('/main');
  };

  const handleInput = debounce((e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }, 400);

  return (
    <div className="font-pretendard flex flex-col  min-w-[320px] max-w-[699px] mx-auto px-[10px] h-screen overflow-y-scroll">
      <Helmet>
        <title className="sr-only">어푸어푸 로그인</title>
      </Helmet>
      <Link to="/">
        <Logo width={200} height={100} className={'mt-10 mb-8'} />
      </Link>
      <form 
      className="flex flex-col h-screen" 
      onSubmit={handleLogin}>
        <LogInText
          id={'loginId'}
          content={'아이디'}
          type="text"
          name="userName"
          validation={true}
          placeholder={''}
          defaultValue={formState.userName}
          onChange={handleInput}
          errorMessage={'잘못된 아이디 입니다.'}
        />
        <LogInText
          id={'loginPw'}
          content={'비밀번호'}
          type="password"
          name="password"
          validation={true}
          placeholder={''}
          defaultValue={formState.password}
          onChange={handleInput}
          errorMessage={'비밀번호를 확인해주세요.'}
        />
        <div className="flex gap-x-1 justify-end mr-2.5 items-start flex-grow mb-8">
          <input
            type="checkbox"
            name="autoLogIn"
            checked={autoLogin}
            className="mt-1"
            id="autoLogIn"
            onChange={(e) => setAutoLogin(e.target.checked)}
          />
          <label htmlFor="autoLogIn" className="font-pretendard font-medium text-secondary text-sm">
            자동 로그인
          </label>
        </div>
        <ButtonSubmit
          color="text-black"
          bgcolor="bg-kakaoyellow"
          content={
            <div className="flex items-center gap-x-2 justify-center">
              <Chat fill={true} />
              카카오로 로그인하기
            </div>
          }
        />
          <ButtonSubmit content={'로그인'} />
      </form>
      <div className="flex flex-col items-center mb-8">
        <Link to="/signup" className="text-sm font-semibold">
          회원가입
        </Link>
        <a href="/" className="text-sm text-primary">
          아이디/비밀번호 찾기
        </a>
      </div>
    </div>
  );
}

export default Login;
