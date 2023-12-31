import toast from 'react-hot-toast';
import { create } from 'zustand';


const initalAuthState = {
  isAuth: false,
  user: null,
  token: '',
};

const authStore = create((set, get) => ({
  ...initalAuthState,

  /* 회원가입 */
  signUp: async (registerUser) => {
    const response = await fetch(`${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/users/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerUser),
    });
  
    if (!response.ok) {
      throw new Error('회원가입 실패');
    }
  
    const { resultCode, result } = await response.json();
  
    if (resultCode !== "SUCCESS") {
      throw new Error('회원가입 실패');
    }
  
    set({
      isAuth: resultCode === "SUCCESS",
      user: result,
      token: result.jwt,
    });
  },

  /* 로그인 */
  signIn: async (loginUser) => {
    const response = await fetch(`${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( loginUser ),
    });
  
    const { resultCode, result } = await response.json();

    if (!response.ok || resultCode !== "SUCCESS") {
      if (result?.errorCode === "INVALID_PASSWORD") {
        toast.error('비밀번호가 다릅니다. 🥹');
        
      } else {
        toast.error('사용자 정보가 올바르지 않습니다. 🥹');
      }
  
      return null; 
    }
  
  
    set({
      isAuth: resultCode === "SUCCESS",
      user: result,
      token: result.jwt,
    });
    
    return { user: result ,token:result.jwt}; 
  },
  
  
  /* 로그아웃 */
  logOut: async () => {
    set({
      ...initalAuthState,
    });

    localStorage.removeItem('token');
    localStorage.removeItem('user');

  },

  /* 회원탈퇴 */
  deleteAccount: async () => {
    const response = await fetch(`${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/users/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${get().token}`, // 현재 토큰
      },
    });

    if (!response.ok) {
      toast.error('계정 탈퇴에 실패했습니다.');
    }

    set({
      ...initalAuthState,
    });

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
}));

const useAuthStore = authStore;

export default useAuthStore;
