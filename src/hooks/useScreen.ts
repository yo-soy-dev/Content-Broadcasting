import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export const useMyScreens = () => {
  return useQuery({
    queryKey: ["myScreens"],
    queryFn: async () => {
      const res = await axiosInstance.get("/screen/my");
      return res.data.data;
    },
  });
};