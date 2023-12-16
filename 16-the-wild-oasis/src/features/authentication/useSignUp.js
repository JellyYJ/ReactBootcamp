import { useMutation } from "@tanstack/react-query";
import { signUp as signUpAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { isLoading, mutate: signUp } = useMutation({
    mutationFn: signUpAPI,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created, please verify the email address"
      );
    },
  });
  return { isLoading, signUp };
}
