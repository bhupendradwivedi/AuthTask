import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/authServices";

export const useRegister = () => {

  return useMutation({
    mutationFn: registerUser
  });

};