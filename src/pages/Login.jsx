import ButtonSubmit from '@/components/Button/ButtonSubmit';
// import Chat from '@/components/Icon/Chat';
import Hide from '@/components/Icon/Hide';
import Show from '@/components/Icon/Show';
import LogInText from '@/components/Input/LogInText';
import LoginLayout from '@/layout/LoginLayout';
import debounce from '@/utils/debounce';
import { setItemWithExpireTime } from '@/utils/expireTime';
import useAuthStore from '@/zustand/useAuthStore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    userName: '',
    password: '',
  });

  // const [autoLogin, setAutoLogin] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userData = await signIn(formState);
      if (userData.token && userData.user) {
        // window.localStorage.setItem('token',userData.token);
        setItemWithExpireTime('token', userData.token, 1.8e7);
        setItemWithExpireTime('user', userData.user.userName, 1.8e7);

        toast.success('로그인 되었습니다. 🥰');
      } else {
        return;
      }
    } catch (error) {
      return;
    }
    navigate('/main');
  };

  const handleInput = debounce((e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }, 200);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
      <div className="font-pretendard flex flex-col  min-w-[320px] max-w-[699px] mx-auto px-[10px] h-screen">
        <LoginLayout content={'어푸어푸 로그인'}/>
        <form className="relative flex flex-col flex-grow" onSubmit={handleLogin}>
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
            type={showPassword ? 'text' : 'password'}
            name="password"
            validation={true}
            placeholder={''}
            className={'flex-grow'}
            defaultValue={formState.password}
            onChange={handleInput}
            errorMessage={'비밀번호를 확인해주세요.'}
          />
          <button
          type='button'
          className='absolute right-8 top-[133px]'
          onClick={toggleShowPassword}>
            {showPassword ? <Show /> :  <Hide />}
          </button>
          {/* <div className="flex gap-x-1 justify-end mr-2.5 items-start flex-grow mb-8">
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
          </div> */}
          {/* <ButtonSubmit
            color="text-black"
            bgcolor="bg-kakaoyellow"
            content={
              <div className="flex items-center gap-x-2 justify-center">
                <Chat fill={true} />
                카카오로 로그인하기
              </div>
            }
          /> */}
          <ButtonSubmit content={'로그인'} />
        </form>
        <div className="flex flex-col justify-end items-center mb-8">
          <Link to="/signup" className="text-sm font-semibold">
            회원가입
          </Link>
          <div>
            <Link to="/findAccount" className="text-sm text-primary">
              아이디
            <span aria-hidden='true' className='text-sm text-primary'>/</span>
              비밀번호 찾기
            </Link>

          </div>
        </div>
      </div>

  );
}

export default Login;
