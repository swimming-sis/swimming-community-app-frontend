import ButtonSubmit from '@/components/Button/ButtonSubmit';
import LogInText from '@/components/Input/LogInText';
import { useNavigate } from 'react-router-dom';
import debounce from '@/utils/debounce';
import useAuthStore from '@/zustand/useAuthStore';
import { useEffect, useState } from 'react';
import Timer from '@/components/Timer';
import useFetchPostData from '@/hooks/useFetchPostData';
import toast from 'react-hot-toast';
import LoginLayout from '@/layout/LoginLayout';


const userNameRegex = /^[a-z][a-z0-9]{5,14}$/;
const nickNameRegex = /^(?=.*[a-zA-Z0-9가-힣!@#$%^&*])[a-zA-Z0-9가-힣!@#$%^&*]{2,8}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])|(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phoneNumberRegex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

function SignUp() {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    userName: '',
    nickName: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
  });
  const [isValidformState, setIsValidFormState] = useState({
    userName: false,
    nickName: false,
    password: false,
    passwordConfirm: false,
    phoneNumber: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    userName: '',
    nickName: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
  });
  const [phoneValidation, setPhoneValidation] = useState({
    sendState: false,
    validationState: false,
    sendNumber: null,
    validationNumber: null,
    validationData:false
  });
  const signUp = useAuthStore((state) => state.signUp);
  const { fetchData: postSendValidation } = useFetchPostData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/users/phoneNumber/send`
  );
  const { data: validationData, fetchData: postValidation } = useFetchPostData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/users/phoneNumber/check`
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await signUp(formState);
      console.log('Success: 회원가입 성공');
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
      case 'userName':
        if (!userNameRegex.test(value)) {
          setErrorMessages((prev) => ({
            ...prev,
            userName: '영문 소문자와 숫자 조합으로 6~15자리로 입력해주세요.',
          }));
          setIsValidFormState((prev) => ({
            ...prev,
            userName: false,
          }));
        } else {
          setErrorMessages((prev) => ({
            ...prev,
            userName: '',
          }));
          setIsValidFormState((prev) => ({
            ...prev,
            userName: true,
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
            nickName: '',
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
            passwordConfirm:
              prev.passwordConfirm === ''
                ? prev.passwordConfirm
                : value === formState.passwordConfirm,
          }));
        } else {
          setErrorMessages((prev) => ({
            ...prev,
            password: '', 
          }));
          setIsValidFormState((prev) => ({
            ...prev,
            password: true,
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
            phoneNumber: true,
          }));
        }
        break;
    }
  };

  const handleValidationNumber = debounce((e) => {
    setPhoneValidation((prev) => ({
      ...prev,
      validationNumber: e.target.value,
    }));
  }, 200);

  const handleDebounceInput = debounce(handleInput, 200);

  useEffect(() => {
    const checkDuplication = async () => {
      let value = formState.userName;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/users/userName?userName=${value}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!response.ok) throw new Error('Response is not OK');

        const data = await response.json();
        if (data.result) {
          setErrorMessages((prev) => ({
            ...prev,
            userName: `다른 사람이 이미 사용하고 있는 아이디입니다.`,
          }));
          setIsValidFormState((prev) => ({
            ...prev,
            userName: false,
          }));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    checkDuplication();
  }, [formState.userName]);

  useEffect(() => {
    const checkDuplication = async () => {
      let value = formState.nickName;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/users/nickName?nickName=${value}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) throw new Error('Response is not OK');
        const data = await response.json();

        if (data.result) {
          setErrorMessages((prev) => ({
            ...prev,
            nickName: `다른 사람이 이미 사용하고 있는 닉네임입니다.`,
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
        const response = await fetch(
          `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/users/phoneNumber?phoneNumber=${value}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) throw new Error('Response is not OK');
        const data = await response.json();

        if (data.result) {
          setErrorMessages((prev) => ({
            ...prev,
            phoneNumber: `다른 사람이 이미 사용하고 있는 번호입니다.`,
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

  const handleSendNumber = async() => {
    setPhoneValidation((prev) => ({
      ...prev,
      sendState: true,
      validationState: !phoneValidation.validationState,
    }));
    toast.success('인증번호가 전송되었어요 🤗')
    await postSendValidation({ to: formState.phoneNumber });
  };
  console.log(phoneValidation, formState.phoneNumber);


  const handleValidation = async() => {
    setPhoneValidation((prev) => ({
      ...prev,
      
    }));
    await postValidation({checkNumber:phoneValidation.validationNumber,
      phoneNumber:formState.phoneNumber})
      try{
        const result = validationData?.result
        console.log(result);
        if (result){
          toast.success('인증에 성공했어요. 회원가입 버튼을 눌러주세요!')
        }else(
          toast.error('인증번호가 틀렸어요. 다시 한번 확인해주세요!')
          )
        }catch(error){
          toast.error('인증번호가 틀렸어요. 다시 한번 확인해주세요!')
      }
  };

  useEffect(()=>{
    setTimeout(() => {
      setPhoneValidation((prev) => ({
        ...prev,
        sendState: false,
      }));
    }, 180000);

  },[phoneValidation.validationState])

  useEffect(()=>{
    if (validationData?.resultCode === 'SUCCESS') {
      setPhoneValidation((prev) => ({
        ...prev,
        validationData: validationData.result,
      }));
    }
  },[validationData])

  return (
    <div className='relative h-screen'>
      <LoginLayout content={'회원가입'} />
      <form
        className="font-pretendard flex flex-col min-w-[320px] max-w-[699px] mx-auto px-2.5"
        onSubmit={handleRegister}>
        <LogInText
          id={'loginId'}
          content={'아이디'}
          type="text"
          name="userName"
          validation={isValidformState.userName}
          onChange={handleDebounceInput}
          placeholder={'영문 소문자와 숫자를 포함한 6~15자리로 입력해 주세요.'}
          errorMessage={errorMessages.userName}
        />
        <LogInText
          id={'loginName'}
          content={'닉네임'}
          type="text"
          name="nickName"
          onChange={handleDebounceInput}
          validation={isValidformState.nickName}
          placeholder={'영문, 한글 또는 숫자로 2~8자리 입력해 주세요.'}
          errorMessage={errorMessages.nickName}
        />
        <LogInText
          id={'loginPw'}
          content={'비밀번호'}
          type="password"
          name="password"
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
          onChange={handleDebounceInput}
          validation={isValidformState.passwordConfirm}
          placeholder={''}
          errorMessage={errorMessages.passwordConfirm}
        />
        <div className="flex items-center">
          <LogInText
            id={'loginTel'}
            content={'휴대전화번호'}
            type="tel"
            name="phoneNumber"
            onChange={handleDebounceInput}
            validation={isValidformState.phoneNumber}
            className="mb-8 flex-grow"
            placeholder={"'-'없이 입력해 주세요."}
            errorMessage={errorMessages.phoneNumber}
          />
          <button
            type="button"
            onClick={handleSendNumber}
            disabled={!isValidformState.phoneNumber}
            className={`text-white font-pretendard text-sm font-semibold h-10 mt-1 px-4 rounded-xl mr-2.5 ${isValidformState.phoneNumber?'bg-primary': 'bg-gray-600'}`}>
            인증하기
          </button>
        </div>
        {phoneValidation.sendState && (
          <div className="relative flex">
            <input
              type="number"
              onChange={handleValidationNumber}
              name="loginTelCheck"
              id="loginTelCheck"
              className="flex-grow h-8 px-1 py-5 border border-gray/300 rounded-lg ml-2.5 mr-2"
            />
            <label htmlFor="loginTelCheck" className="전화번호 인증"></label>
            <Timer className="absolute right-28 top-2" />
            <button
            onClick={handleValidation}
              type="button"
              className="bg-primary text-white font-pretendard text-sm font-semibold h-10 px-4 rounded-xl my-auto mr-2.5">
              인증완료
            </button>
          </div>
        )}
        <ButtonSubmit
          className="flex flex-col items-center mt-10 "
          content={'회원가입'}
          disabled={
            !isValidformState.userName ||
            !isValidformState.nickName ||
            !isValidformState.password ||
            !isValidformState.passwordConfirm ||
            !isValidformState.phoneNumber ||
            !phoneValidation.validationData
          }
        />
      </form>
    </div>
  );
}


export default SignUp;
