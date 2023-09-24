import ButtonConfirm from '@/components/Button/ButtonComfirm';
import ButtonSubmit from '@/components/Button/ButtonSubmit';
import LogInText from '@/components/Input/LogInText';
import ModalComponent from '@/components/ModalComponent';
import Timer from '@/components/Timer';
import useFetchData from '@/hooks/useFetchData';
import useFetchPostData from '@/hooks/useFetchPostData';
import useFetchPutData from '@/hooks/useFetchPutData';
import Header from '@/layout/Header';
import debounce from '@/utils/debounce';
import useModalStore from '@/zustand/useModalStore';
import { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const nickNameRegex = /^(?=.*[a-zA-Z0-9가-힣!@#$%^&*])[a-zA-Z0-9가-힣!@#$%^&*]{2,8}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])|(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phoneNumberRegex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

let mountedAndFetched = false;

function MyAccountEdit() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const { closeModal, openModal, actionType } = useModalStore();
  const [formState, setFormState] = useState({
    nickName: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
  });

  const [isValidformState, setIsValidFormState] = useState({
    nickName: false,
    password: false,
    passwordConfirm: false,
    phoneNumber: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    nickName: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
  });

  const { data: fetchAccountData } = useFetchData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/users/`
  );
  const { putData: putAccountData } = useFetchPutData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/users/modify`
  );
  const [phoneValidation, setPhoneValidation] = useState({
    sendState: false,
    validationState: false,
    sendNumber: null,
    validationNumber: null,
    validationData: false,
  });
  const { fetchData: postSendValidation } = useFetchPostData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/users/phoneNumber/send`
  );
  const { data: validationData, fetchData: postValidation } = useFetchPostData(
    `${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/users/phoneNumber/check`
  );

  const handleValidationNumber = debounce((e) => {
    setPhoneValidation((prev) => ({
      ...prev,
      validationNumber: e.target.value,
    }));
  }, 200);

  const handleEdit = () => {
    setContent('수정하시겠습니까?');
    openModal('edit');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInput = async (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    switch (name) {
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
            phoneNumber: true,
          }));
        }
        break;
    }
  };

  const handleDebounceInput = debounce(handleInput, 200);

  const handleCancle = () => {
    closeModal();
  };

  const handleConfirm = async () => {
    if (actionType === 'edit') {
      const dataToSend = {};

      // 닉네임이 실제로 변경되었다면 그 값을 사용
      if (formState.nickName !== fetchAccountData?.result.nickname) {
        dataToSend.nickname = formState.nickname;
      }

      // 전화번호가 실제로 변경되었다면 그 값을 사용
      if (formState.phoneNumber !== fetchAccountData?.result.phoneNumber) {
        dataToSend.phoneNumber = formState.phoneNumber;
      }

      setFormState((prevState) => ({
        ...prevState,
        formState,
      }));
      try {
        await putAccountData(formState);
        toast.success('회원 정보가 수정되었어요. 😊');
      } catch (error) {
        toast.error('회원 정보를 수정하지 못했어요. 😵');
      }

      closeModal();
      navigate('/');
    }
  };

  useEffect(() => {
    const checkDuplication = async () => {
      let value = formState.nickName;

      if (value === fetchAccountData?.result.nickName) {
        setIsValidFormState((prev) => ({
          ...prev,
          nickName: true,
        }));
        return;
      }

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
  }, [formState.nickName, fetchAccountData?.result.nickName]);

  useEffect(() => {
    const checkDuplication = async () => {
      let value = formState.phoneNumber;

      if (value === fetchAccountData?.result.phoneNumber) {
        setIsValidFormState((prev) => ({
          ...prev,
          phoneNumber: true,
        }));
        return;
      }

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
  }, [formState.phoneNumber, fetchAccountData?.result.phoneNumber]);

  useEffect(() => {
    if (!mountedAndFetched && fetchAccountData?.resultCode === 'SUCCESS') {
      const { nickName, phoneNumber, userName } = fetchAccountData.result;

      setFormState((formState) => ({
        ...formState,
        userName,
        nickName,
        phoneNumber,
      }));

      mountedAndFetched = true;
    }
  }, [fetchAccountData]);

  const handleSendNumber = async () => {
    setPhoneValidation((prev) => ({
      ...prev,
      sendState: true,
      validationState: !phoneValidation.validationState,
    }));
    toast.success('인증번호가 전송되었어요 🤗');
    await postSendValidation({ to: formState.phoneNumber });
  };

  const handleValidation = async () => {
    setPhoneValidation((prev) => ({
      ...prev,
    }));
    await postValidation({
      checkNumber: phoneValidation.validationNumber,
      phoneNumber: formState.phoneNumber,
    });
    try {
      const result = validationData?.result;
      console.log(result);
      if (result) {
        toast.success('인증에 성공했어요. 수정완료 버튼을 눌러주세요!');
      } else toast.error('인증번호가 틀렸어요. 다시 한번 확인해주세요!');
    } catch (error) {
      toast.error('인증번호가 틀렸어요. 다시 한번 확인해주세요!');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setPhoneValidation((prev) => ({
        ...prev,
        sendState: false,
      }));
    }, 180000);
  }, [phoneValidation.validationState]);

  useEffect(() => {
    if (validationData?.resultCode === 'SUCCESS') {
      setPhoneValidation((prev) => ({
        ...prev,
        validationData: validationData.result,
      }));
    }
  }, [validationData]);

  return (
    <>
      <Helmet>
        <title>내계정 수정하기</title>
      </Helmet>
      <Header content={'내 정보 변경'} noEdit={false} />
      <form
        onSubmit={handleSubmit}
        className="font-pretendard flex flex-col h-screen min-w-[320px] max-w-[699px] mx-auto px-2.5">
        <LogInText
          id={'myAccountEditName'}
          content={'닉네임'}
          type="text"
          name="nickName"
          onChange={handleDebounceInput}
          key={formState.nickName}
          defaultValue={fetchAccountData?.result.nickName}
          validation={isValidformState.nickName}
          placeholder={'영문, 한글 또는 숫자로 2~8자리 입력해 주세요.'}
          errorMessage={errorMessages.nickName}
        />
        <LogInText
          id={'myAccountEditPw'}
          content={'비밀번호'}
          type="password"
          name="password"
          onChange={handleDebounceInput}
          validation={isValidformState.password}
          placeholder={'숫자,영문,특수문자 중 3개 이상을 포함하여 8글자 이상 입력해주세요.'}
          errorMessage={errorMessages.password}
        />
        <LogInText
          id={'myAccountEditPwCheck'}
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
            id={'myAccountEditTel'}
            content={'휴대전화번호'}
            type="tel"
            name="phoneNumber"
            className={'mb-8 flex-grow'}
            defaultValue={fetchAccountData?.result.phoneNumber}
            onChange={handleDebounceInput}
            validation={isValidformState.phoneNumber}
            placeholder={"'-'없이 입력해 주세요."}
            errorMessage={errorMessages.phoneNumber}
          />
          <button
            type="button"
            onClick={handleSendNumber}
            disabled={!isValidformState.phoneNumber}
            className={`text-white font-pretendard text-sm font-semibold h-10 mt-1 px-4 rounded-xl mr-2.5 ${
              isValidformState.phoneNumber ? 'bg-primary' : 'bg-gray-600'
            } ${errorMessages.phoneNumber && 'mb-4'}`}>
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
          type="button"
          onClick={handleEdit}
          className="fixed w-[calc(100%-20px)]  min-w-[320px] max-w-[699px] px-2.5 mx-auto left-0 right-0 bottom-12 flex flex-col items-center"
          content={'수정하기'}
          disabled={
            !isValidformState.nickName ||
            !isValidformState.password ||
            !isValidformState.passwordConfirm ||
            !isValidformState.phoneNumber ||
            phoneValidation.validationData
          }
        />
        <ModalComponent>
          <p className="my-4">{content}</p>
          <ButtonConfirm onClick={handleCancle} content="취소" confirm={false} />
          <ButtonConfirm onClick={handleConfirm} />
        </ModalComponent>
      </form>
    </>
  );
}

export default MyAccountEdit;
