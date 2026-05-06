import axiosInstance from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post(API_ENDPOINTS.LOGIN, data);
  return res.data;
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: 'teacher' | 'principal';
}) => {
  const res = await axiosInstance.post(API_ENDPOINTS.REGISTER, data);
  return res.data;
};

export const getMe = async () => {
  const res = await axiosInstance.get(API_ENDPOINTS.ME);
  return res.data;
};