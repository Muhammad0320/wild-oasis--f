import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isLoading } = useMutation({
    mutationFn: deleteCabinApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      toast.success("Cabin successfully deleted");
    },

    onError: () => {
      toast.error("Cabin could not be deleted");
    },
  });

  return { deleteCabin, isLoading };
};
