import ButtonSubmit from '@/components/Button/ButtonSubmit';
import LogInText from '@/components/Input/LogInText';
import useFetchPostData from '@/hooks/useFetchPostData';
import LoginLayout from '@/layout/LoginLayout';
import debounce from '@/utils/debounce';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FindAccount() {
  const navigate = useNavigate();
  const [validationId, setValidationId] = useState(false);
  const [formIdState, setFormIdState] = useState('');
  const [formPwState, setFormPwState] = useState({
    userName: '',
    phoneNumber: '',
  });
  const { data: idData, fetchData: fetchIdData } = useFetchPostData(
    `${
      import.meta.env.VITE_UPUHUPUH_DB_URL
    }/api/v1/users/account/id/find?phoneNumber=${formIdState}`
  );
  const { fetchData: fetchPwData } = useFetchPostData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/users/account/password/find?phoneNumber=${
      formPwState.phoneNumber
    }&userName=${formPwState.userName}`
  );

  const handleFindId = (e) => {
    e.preventDefault();
    try {
      fetchIdData(formIdState);
      setValidationId(true);
      setTimeout(() => {
        navigate('/login');
      }, 10000);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleFindPw = async (e) => {
    e.preventDefault();

    try {
      await fetchPwData(formPwState);
      navigate('/login');
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleIdInput = debounce((e) => {
    setFormIdState(e.target.value);
  }, 200);

  const handlePwInput = debounce((e) => {
    const { name, value } = e.target;
    setFormPwState({
      ...formPwState,
      [name]: value,
    });
  }, 200);

  return (
    <div className="font-pretendard flex flex-col  min-w-[320px] max-w-[699px] mx-auto px-[10px] h-screen">
      <LoginLayout content={'아이디/패스워드 찾기'} />
      <form className="relative flex flex-col h-1/2" onSubmit={handleFindId}>
        <p className="ml-2 font-semibold ">아이디 찾기</p>
        <LogInText
          id={'findId'}
          content={'전화번호'}
          name="phoneNumber"
          validation={true}
          placeholder={"'-' 를 빼고 입력해주세요"}
          defaultValue={formIdState}
          onChange={handleIdInput}
          errorMessage={'전화번호를 확인해주세요.'}
        />
        {validationId && (
          <p className="border rounded-lg shadow-md mx-2 py-2 px-2 text-center text-sm">
            {idData?.result}
          </p>
        )}
        <ButtonSubmit className={'mt-2'} content={'아이디 찾기'} />
      </form>
      <form className="relative flex flex-col h-1/2" onSubmit={handleFindPw}>
        <p className="ml-2 font-semibold ">비밀번호 찾기</p>
        <LogInText
          id={'findPwId'}
          content={'아이디'}
          name="userName"
          validation={true}
          placeholder={'아이디를 입력해 주세요'}
          defaultValue={formPwState.userName}
          onChange={handlePwInput}
          errorMessage={'아이디를 확인해주세요.'}
        />
        <LogInText
          id={'findPwPhone'}
          content={'전화번호'}
          name="phoneNumber"
          validation={true}
          placeholder={"'-' 를 빼고 입력해주세요"}
          defaultValue={formPwState.phoneNumber}
          onChange={handlePwInput}
          errorMessage={'전화번호를 확인해주세요.'}
        />

        <ButtonSubmit className={'mt-2'} content={'비밀번호 찾기'} />
      </form>
    </div>
  );
}

export default FindAccount;
