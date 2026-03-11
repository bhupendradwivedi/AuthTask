import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authServices";

export const useLogin = () => {

  return useMutation({

    mutationFn: loginUser,

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    }

  });

};