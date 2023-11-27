import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { addOrEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  // Creating a new cabin
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: addOrEditCabin,
    onSuccess: () => {
      toast.success("New cabin has been created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // After success, resetting the form
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCabin };
}
