
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../services/authServices";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"], 
    queryFn: fetchProfile, 
    // Only run if token exists to avoid "Invalid Token" errors on load
    enabled: !!localStorage.getItem("token"), 
   
    retry: false, 
   
    onError: (err) => {
      console.error("Profile access denied:", err.response?.data?.message);
    }
  });
};