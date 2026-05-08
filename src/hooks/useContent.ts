import {
  getMyContent,
  getTeacherStats,
  uploadContent,
  deleteContent,
  getLiveContent
} from '@/services/content.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from "react-hot-toast";


export const useMyContent = (params?: {
  status?: string;
  search?: string;
  page?: number;
}) => {
  return useQuery({
    queryKey: ['myContent', params],
    queryFn: () => getMyContent(params),
    select: (res) => res.data,
  });
};

export const useTeacherStats = () => {
  return useQuery({
    queryKey: ['teacherStats'],
    queryFn: getTeacherStats,
    select: (res) => res.data,
  });
};

export const useUploadContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => uploadContent(formData),
    onSuccess: () => {
      toast.success("Content uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ['myContent'] });
      queryClient.invalidateQueries({ queryKey: ['teacherStats'] });
    },
    onError: () => {
      toast.error("Upload failed. Please try again.");
    },
  });
};

export const useDeleteContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteContent(id),
    onSuccess: () => {
      toast.success("Content deleted!");
      queryClient.invalidateQueries({ queryKey: ['myContent'] });
      queryClient.invalidateQueries({ queryKey: ['teacherStats'] });
    },
    onError: () => {
      toast.error("Delete failed. Please try again.");  
    },
  });
};

export const useLiveContent = (screenName: string) => {
  return useQuery({
    queryKey: ['liveContent', screenName],
    queryFn: () => getLiveContent(screenName),
    enabled: !!screenName,
    refetchInterval: 30000,
    select: (res) => res.data,
  });
};
