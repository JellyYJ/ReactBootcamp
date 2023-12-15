import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  // queryClient: save the newly logged in user data to the cache, ensuring smoother login
  // NOT compulsary, but nice to have
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  // there is some changes to the user and it is easier for handling success and error by use mutation
  const { mutate: login, isLoading: isLogging } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user?.user);
      // queryClient.setQueriesData(["user"], user); //WRONG;
      navigate("/dashboard");
    },

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("The password/email was incorrect");
    },
  });

  return { login, isLogging };
}
