import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

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
  
    if (!response.ok) {
      throw new Error('로그인 요청 실패');
    }
  
    const { resultCode, result } = await response.json();
  
    if (resultCode !== "SUCCESS") {
      throw new Error('로그인 실패');
    }
  
    set({
      isAuth: resultCode === "SUCCESS",
      user: result,
      token: result.jwt,
    });
    
    return { user: result ,token:result.jwt}; 
  },
  
  
  

  /* 로그아웃 */
  signOut: async () => {
    const response = await fetch(`${import.meta.env.VITE_UPUHUPUH_DB_URL}/api/v1/users/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${get().token}`, // 현재 토큰
      },
    });

    if (!response.ok) {
      throw new Error('로그아웃 실패!');
    }

    set({
      ...initalAuthState,
    });
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
      throw new Error('계정 탈퇴 실패!');
    }

    set({
      ...initalAuthState,
    });
  },
}));

const useAuthStore = devtools(authStore);

export default useAuthStore;
