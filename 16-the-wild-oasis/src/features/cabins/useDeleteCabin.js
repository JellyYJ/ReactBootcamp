import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deteleCabin as deleteCabinAPI } from "../../services/apiCabins";

export function useDeleteCabin() {
  // Get QueryClient from the context (App.jsx)
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinAPI,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      // QueryClient has an invalidateQueries method that lets you intelligently mark queries as stale and potentially refetch them too!
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
