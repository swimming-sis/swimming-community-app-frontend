import { createContext, useContext } from 'react';
import {create} from 'zustand';

// Create a Zustand store
const useStore = create(set => ({
  user: null,
  error: null,
  login: async (username, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      
      set({ user: data.user });
    } catch (error) {
      set({ error: error.message });
    }
  },
  logout: () => set({ user: null }),
}));

// Create a context for the auth state and functions
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useStore();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
