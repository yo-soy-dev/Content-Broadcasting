export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'teacher' | 'principal';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'teacher' | 'principal';
}