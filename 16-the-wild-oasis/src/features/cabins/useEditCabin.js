import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { addOrEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  // Editting a cabin
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => addOrEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("The cabin has been editted successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // After success, resetting the form
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
