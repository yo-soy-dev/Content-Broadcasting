import {
  getPendingContent,
  getAllContent,
  getPrincipalStats,
  approveContent,
  rejectContent,
} from '@/services/approval.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from "react-hot-toast"; // ✅ ADD

export const usePendingContent = () => {
  return useQuery({
    queryKey: ['pendingContent'],
    queryFn: getPendingContent,
    select: (res) => res.data,
  });
};

export const useAllContent = (params?: {
  status?: string;
  search?: string;
  page?: number;
}) => {
  return useQuery({
    queryKey: ['allContent', params],
    queryFn: () => getAllContent(params),
    select: (res) => res.data,
  });
};

export const usePrincipalStats = () => {
  return useQuery({
    queryKey: ['principalStats'],
    queryFn: getPrincipalStats,
    select: (res) => res.data,
  });
};

export const useApproveContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => approveContent(id),
    onSuccess: () => {
      toast.success("Content approved!"); // ✅ ADD
      queryClient.invalidateQueries({ queryKey: ['pendingContent'] });
      queryClient.invalidateQueries({ queryKey: ['allContent'] });
      queryClient.invalidateQueries({ queryKey: ['principalStats'] });
    },
    onError: () => {
      toast.error("Approval failed."); // ✅ ADD
    },
  });
};

export const useRejectContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      rejectContent(id, reason),
    onSuccess: () => {
      toast.success("Content rejected."); 
      queryClient.invalidateQueries({ queryKey: ['pendingContent'] });
      queryClient.invalidateQueries({ queryKey: ['allContent'] });
      queryClient.invalidateQueries({ queryKey: ['principalStats'] });
    },
    onError: () => {
      toast.error("Rejection failed."); 
    },
  });
};