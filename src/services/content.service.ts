import axiosInstance from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export const uploadContent = async (formData: FormData) => {
  const res = await axiosInstance.post(API_ENDPOINTS.CONTENT.UPLOAD, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const getMyContent = async (params?: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const res = await axiosInstance.get(API_ENDPOINTS.CONTENT.MY_CONTENT, { params });
  return res.data;
};

export const getTeacherStats = async () => {
  const res = await axiosInstance.get(API_ENDPOINTS.CONTENT.MY_STATS);
  return res.data;
};

export const deleteContent = async (id: string) => {
  const res = await axiosInstance.delete(API_ENDPOINTS.CONTENT.DELETE(id));
  return res.data;
};

export const getLiveContent = async (screenName: string) => {
  const res = await axiosInstance.get(
    API_ENDPOINTS.LIVE(screenName)
  );
  return res.data;
};