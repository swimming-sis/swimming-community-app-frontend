// import ButtonSubmit from '@/components/Button/ButtonSubmit';
// import Chat from '@/components/Icon/Chat';
// import LogInText from '@/components/Input/LogInText';
// import Logo from '@/components/Logo';
// import { Link } from 'react-router-dom';
// import debounce from '@/utils/debounce';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/Auth';
// import { useState, useCallback } from 'react';
// import { useStore } from 'zustand';
// import useStorage from '@/hooks/useStorage';

// const Login = () => {
//   const { users, login } = useStore();
//   const storage = useStorage('users', null);
//   const { state } = useLocation(); // location { pathname, search, hash, state = {  } }
//   const navigate = useNavigate();
//   const auth = useAuth();


//   const [formState, setFormState] = useState({
//     username: '',
//     password: '',
//   });

//   const handleSignIn = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch(`${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/userss/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formState),
//       });

//       if (!response.ok) throw new Error('Login failed');

//       const data = await response.json();

//       login(data.users); // Update Zustand store
//       storage.update(data.users); // Update local storage

//       if (!state) {
//         navigate('/');
//       } else {
//         navigate(state.wishLocationPath === '/signin' ? '/' : state.wishLocationPath);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleInput = debounce((e) => {
//     setFormState((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   }, 400);

//   return (
//     <div className="font-pretendard flex flex-col  min-w-[320px] max-w-[699px] mx-auto px-[10px] h-screen overflow-y-scroll">
//       <h1 className="sr-only">어푸어푸 로그인</h1>
//       <Logo width={200} height={100} className={'mt-10 mb-8'} />
//       <form onSubmit={handleSignIn}>
//         <LogInText
//           id={'loginId'}
//           content={'아이디'}
//           type="text"
//           validation={true}
//           placeholder={''}
//           defaultValue={formState.}
//           onChange={handleInput}
//           errorMessage={'잘못된 아이디 입니다.'}
//         />
//         <LogInText
//           id={'loginPw'}
//           content={'비밀번호'}
//           type="password"
//           validation={true}
//           placeholder={''}
//           defaultValue={formState.password}
//           onChange={handleInput}
//           errorMessage={'비밀번호를 확인해주세요.'}
//         />
//         <div className="mb-auto flex gap-x-1 justify-end mr-2.5 items-center">
//           <input type="checkbox" name="autoLogIn" id="autoLogIn" />
//           <label htmlFor="autoLogIn" className="font-pretendard font-medium text-secondary text-sm">
//             자동 로그인
//           </label>
//         </div>
//         <ButtonSubmit
//           color="text-black"
//           bgcolor="bg-kakaoyellow"
//           content={
//             <div className="flex items-center gap-x-2 justify-center">
//               <Chat fill={true} />
//               카카오로 로그인하기
//             </div>
//           }
//         />
//         <Link to="/main">
//           <ButtonSubmit content={'로그인'} />
//         </Link>
//       </form>
//       <div className="flex flex-col items-center mb-8">
//         <Link to="/signup" className="text-sm font-semibold">
//           회원가입
//         </Link>
//         <a href="/" className="text-sm text-primary">
//           아이디/비밀번호 찾기
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Login;
