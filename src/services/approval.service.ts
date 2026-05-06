import axiosInstance from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export const getAllContent = async (params?: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const res = await axiosInstance.get(API_ENDPOINTS.APPROVAL.ALL, { params });
  return res.data;
};

export const getPendingContent = async () => {
  const res = await axiosInstance.get(API_ENDPOINTS.APPROVAL.PENDING);
  return res.data;
};

export const getPrincipalStats = async () => {
  const res = await axiosInstance.get(API_ENDPOINTS.APPROVAL.STATS);
  return res.data;
};

export const approveContent = async (id: string) => {
  const res = await axiosInstance.patch(API_ENDPOINTS.APPROVAL.APPROVE(id));
  return res.data;
};

export const rejectContent = async (id: string, reason: string) => {
  const res = await axiosInstance.patch(API_ENDPOINTS.APPROVAL.REJECT(id), { reason });
  return res.data;
};