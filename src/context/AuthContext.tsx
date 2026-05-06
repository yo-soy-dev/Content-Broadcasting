'use client';

import { createContext, useEffect, useState, useCallback } from 'react';
import { User, LoginPayload, RegisterPayload } from '@/types/user.types';
import { loginUser, registerUser, getMe } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginPayload) => Promise<User>;
  register: (data: RegisterPayload) => Promise<User>;
  logout: () => void;
}

// export const AuthContext = createContext<AuthContextType>({
//   user: null,
//   token: null,
//   isLoading: true,
//   isAuthenticated: false,
//   login: async () => {},
//   register: async () => {},
//   logout: () => {},
// });
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // App open hone pe localStorage se restore karo
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!storedToken) {
          setIsLoading(false);
          return;
        }

        // Token hai toh /me se fresh user data lo
        if (storedUser) setUser(JSON.parse(storedUser)); // instant set
        const res = await getMe();
        setUser(res.data);
        setToken(storedToken);
        localStorage.setItem('user', JSON.stringify(res.data));
      } catch {
        // Token expired ya invalid — clear karo
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (data: LoginPayload) => {
    const res = await loginUser(data);
    const { token: newToken, user: newUser } = res.data;

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
     return newUser;
  }, []);

  const register = useCallback(async (data: RegisterPayload) => {
    const res = await registerUser(data);
    const { token: newToken, user: newUser } = res.data;

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    toast.success(`Account created! Welcome, ${newUser.name}!`);
     return newUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    toast.success('Logged out successfully.');
    // router.replace('/auth/login');
    window.location.href = '/auth/login';
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};