import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addOrEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  // Editting a cabin
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => addOrEditCabin(newCabinData, id),
    onSuccess: () => {
      alert("The cabin has been editted successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => alert(err.message),
  });

  return { isEditing, editCabin };
}
