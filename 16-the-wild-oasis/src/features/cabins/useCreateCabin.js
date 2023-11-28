import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addOrEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  // Creating a new cabin
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: addOrEditCabin,
    onSuccess: () => {
      alert("New cabin has been created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // After success, resetting the form
    },
    onError: (err) => alert(err.message),
  });
  return { isCreating, createCabin };
}
