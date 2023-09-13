// import propTypes from 'prop-types';

import ButtonSubmit from '@/components/Button/ButtonSubmit';
import LogInText from '@/components/Input/LogInText';
import Logo from '@/components/Logo';
// import Timer from '@/components/Timer';
import { useNavigate, Link } from 'react-router-dom';
// import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import debounce from '@/utils/debounce';
import { useEffect } from 'react';


const usernameRegex = /^[a-z0-9]{4,12}$/;
const nickNameRegex = /^(?=.*[a-zA-Z0-9가-힣!@#$%^&*])[a-zA-Z0-9가-힣!@#$%^&*]{2,8}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])|(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phoneNumberRegex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
// {validationTel='send'}
function SignUp() {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    username: '',
    nickName: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
  });
  const [isValidformState, setIsValidFormState] = useState({
    username: false,
    nickName: false,
    password: false,
    passwordConfirm: false,
    phoneNumber: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    username: '',
    nickName: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
  });


  const handleRegister = async (e) => {
    e.preventDefault()

    const url = 'http://127.0.0.1:8090/api/collections/dummyUser/records';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      
      console.log(response.body);
      console.log(response.status);
      if (!response.ok) throw new Error('Response is not OK');

      // throw new Error('Response is not OK');

      const data = await response.json();

      console.log('Success:', data);

    } catch (error) {
      console.error('Error:', error);

    }
    navigate('/');
  };

  const handleInput = async (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    
    switch (name) {
      case 'username':
        if (!usernameRegex.test(value)) {
          setErrorMessages((prev) => ({
            ...prev,
            username: '영문 소문자와 숫자 조합으로 4~12자리로 입력해주세요.',
          }));
          setIsValidFormState((prev) => ({
            ...prev,
            username: false,
          }));
        } else {
          setErrorMessages((prev) => ({
            ...prev,
            username: '', // Clear the error message when the input is valid
          }));
          setIsValidFormState((prev) => ({
            ...prev,
            username: true,
          }));
        }
        break;

      case 'nickName':
        if (!nickNameRegex.test(value)) {
          setErrorMessages((prev) => ({
            ...prev,
            nickName: '영문, 한글 또는 숫자로 2~8자리로 입력해 주세요.',
          }));
          setIsValidFormState((prev) => ({
            ...prev,
            nickName: false,
          }));
        } else {
          setErrorMessages((prev) => ({
            ...prev,
            nickName: '', // Clear the error message when the input is valid
          }));
          setIsValidFormState((prev) => ({
            ...prev,
            nickName: true,
          }));
        }
        break;

      case 'password':
        if (!passwordRegex.test(value)) {
          setErrorMessages((prev) => ({
            ...prev,
            password:
              '숫자, 영문대소문자, 특수문자 중 3개 이상을 포함하여 8자리 이상으로 입력해주세요.',
          }));
          setIsValidFormState((prev) => ({
            ...prev,
            password: false,
            // Check if the confirmed password matches the new one
            passwordConfirm:
              prev.passwordConfirm === ''
                ? prev.passwordConfirm
                : value === formState.passwordConfirm,
          }));
        } else {
          setErrorMessages((prev) => ({
            ...prev,
            password: '', // Clear the error message when the input is valid
          }));
          setIsValidFormState((prev) => ({
            ...prev,
            password: true,
            // Check if the confirmed password matches the new one
            passwordConfirm: value === formState.passwordConfirm,
          }));
        }
        break;

      case 'passwordConfirm':
        if (value !== formState.password) {
          setErrorMessages((prev) => ({
            ...prev,
            passwordConfirm: '비밀번호가 일치하지 않아요.',
          }));
          setIsValidFormState((prev) => ({
            ...prev,
            passwordConfirm: false,
          }));
        } else {
          setErrorMessages((prev) => ({
            ...prev,
            passwordConfirm: '',
          }));
          setIsValidFormState((prev) => ({
            ...prev,
            passwordConfirm: true,
          }));
        }
        break;

      case 'phoneNumber':
        if (!phoneNumberRegex.test(value)) {
          setErrorMessages((prev) => ({
            ...prev,
            phoneNumber: "'-'없이 입력해 주세요.",
          }));
          setIsValidFormState((prev) => ({
            ...prev,
            phoneNumber: false,
          }));
        } else {
          setErrorMessages((prev) => ({
            ...prev,
            phoneNumber: '',
          }));
          setIsValidFormState((prev) => ({
            ...prev,
            phoneNumber: true, // 수정된 부분
          }));
        }
        break;
    }

  };

  const handleDebounceInput = debounce(handleInput, 500);

useEffect(() => {
  const checkDuplication = async () => {
    let value = formState.username;

    try {
      const response = await fetch(
        `http://127.0.0.1:8090/api/collections/dummyUser/records/?filter=(username='${value}')`
      );
      
      if (!response.ok) throw new Error('Response is not OK');
      const data = await response.json();
      
      if (data.items.length > 0 && formState.username === value) { 
        setErrorMessages((prev) => ({
          ...prev,
          username: `다른 사람이 이미 사용하고 있는 아이디에요.`,
        }));
        setIsValidFormState((prev) => ({
          ...prev,
          username: false,
        }));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

    checkDuplication();
}, [formState.username]);
useEffect(() => {
  const checkDuplication = async () => {
    let value = formState.nickName;

    try {
      // 중복 확인 요청을 보냅니다.
      const response = await fetch(
        `http://127.0.0.1:8090/api/collections/dummyUser/records/?filter=(nickName='${value}')`
      );
    
      if (!response.ok) throw new Error('Response is not OK');
      const data = await response.json();

    
      // 만약 해당 값이 이미 존재한다면 에러 메시지를 설정하고 유효성 검사 상태를 업데이트합니다.
      if (data.items.length > 0 && formState.nickName === value) { 
        setErrorMessages((prev) => ({
          ...prev,
          nickName: `다른 사람이 이미 사용하고 있는 닉네임이에요.`,
        }));
        setIsValidFormState((prev) => ({
          ...prev,
          nickName: false,
        }));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
    checkDuplication();
  
}, [formState.nickName]);
useEffect(() => {
  const checkDuplication = async () => {
    let value = formState.phoneNumber;

    try {
      // 중복 확인 요청을 보냅니다.
      const response = await fetch(
        `http://127.0.0.1:8090/api/collections/dummyUser/records/?filter=(phoneNumber='${value}')`
      );
      
      if (!response.ok) throw new Error('Response is not OK');
      const data = await response.json();
      
      // 만약 해당 값이 이미 존재한다면 에러 메시지를 설정하고 유효성 검사 상태를 업데이트합니다.
      if (data.items.length > 0 && formState.phoneNumber === value) { 
        setErrorMessages((prev) => ({
          ...prev,
          phoneNumber: `다른 사람이 이미 사용하고 있는 번호에요.`,
        }));
        setIsValidFormState((prev) => ({
          ...prev,
          phoneNumber: false,
        }));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

    checkDuplication();
  
}, [formState.phoneNumber]);
useEffect(()=>{
  if (!isValidformState.username ||
    !isValidformState.nickName ||
    !isValidformState.password ||
    !isValidformState.passwordConfirm ||
    !isValidformState.phoneNumber) 
    setFormState(formState)
},[formState,isValidformState])

  return (
    <>
      <Helmet>
        <title className="sr-only">어푸어푸 로그인</title>
      </Helmet>
      <Logo width={200} height={100} className={'mt-10 mb-8'} />
      <form
        className="font-pretendard flex flex-col h-full min-w-[320px] max-w-[699px] mx-auto px-[10px]"
        onSubmit={handleRegister}>
        <LogInText
          id={'loginId'}
          content={'아이디'}
          type="text"
          name="username"
          value={formState.username}
          validation={isValidformState.username}
          onChange={handleDebounceInput}
          placeholder={'영문 소문자와 숫자를 포함한 4~12자리로 입력해 주세요.'}
          errorMessage={errorMessages.username}
        />
        <LogInText
          id={'loginName'}
          content={'닉네임'}
          type="text"
          name="nickName"
          onChange={handleDebounceInput}
          value={formState.nickName}
          validation={isValidformState.nickName}
          placeholder={'영문, 한글 또는 숫자로 2~8자리 입력해 주세요.'}
          errorMessage={errorMessages.nickName}
        />
        <LogInText
          id={'loginPw'}
          content={'비밀번호'}
          type="password"
          name="password"
          value={formState.password}
          onChange={handleDebounceInput}
          validation={isValidformState.password}
          placeholder={'숫자,영문,특수문자 중 3개 이상을 포함하여 8글자 이상 입력해주세요.'}
          errorMessage={errorMessages.password}
        />
        <LogInText
          id={'loginPwCheck'}
          content={'비밀번호 확인'}
          type="password"
          name="passwordConfirm"
          value={formState.passwordConfirm}
          onChange={handleDebounceInput}
          validation={isValidformState.passwordConfirm}
          placeholder={''}
          errorMessage={errorMessages.passwordConfirm}
        />
        {/* <div className="flex"> */}
        <LogInText
          id={'loginTel'}
          content={'휴대전화번호'}
          type="tel"
          name="phoneNumber"
          value={formState.phoneNumber}
          onChange={handleDebounceInput}
          validation={isValidformState.phoneNumber}
          className="mb-8 flex-grow"
          placeholder={"'-'없이 입력해 주세요."}
          errorMessage={errorMessages.phoneNumber}
        />
        {/* <button
              type="submit"
              className="bg-primary text-white font-pretendard text-sm font-semibold h-10 px-4 rounded-xl my-auto mr-2.5">
              인증하기
            </button>
          </div>
          {validationTel === 'send' && (
            <div className="relative flex ">
              <input
                type="number"
                name="loginTelCheck"
                id="loginTelCheck"
                className="flex-grow h-8 px-1 py-5 border border-gray/300 rounded-lg ml-2.5 mr-2
        "
              />
              <label htmlFor="loginTelCheck" className="전화번호 인증"></label>
              <Timer className="absolute right-28 top-2" />
              <button
                type="submit"
                className="bg-primary text-white font-pretendard text-sm font-semibold h-10 px-4 rounded-xl my-auto mr-2.5">
                인증완료
              </button>
            </div>
          )} */}
        <ButtonSubmit 
        className="flex flex-col items-center mt-4" 
        content={'회원가입'}
        disabled={!isValidformState.username ||!isValidformState.nickName ||
          !isValidformState.password ||
          !isValidformState.passwordConfirm ||
          !isValidformState.phoneNumber}/>
      </form>
      <Link to='/'>
        <button
        type="button"
        className='block mx-auto text-xs text-secondary font-pretendard mb-10
        '>
          홈으로 돌아가기
        </button>
      </Link>
    </>
  );
}

// SignUp.propTypes = {
//   validationTel: propTypes.string,
// };
export default SignUp;
