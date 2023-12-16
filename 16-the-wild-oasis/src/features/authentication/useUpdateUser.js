import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateCurUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurUser,
    onSuccess: ({ user }) => {
      toast.success("User data successfully edited");
      // queryClient.setQueryData("user", user.user); // caching

      queryClient.invalidateQueries({ queryKey: ["user"], user });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isUpdating };
}
