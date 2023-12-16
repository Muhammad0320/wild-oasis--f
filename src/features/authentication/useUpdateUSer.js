import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  
  const { mutate: updateUSer, isLoading: isUpdating } = useMutation({


    mutationFn: updateUser,



    onSuccess: ({ user }) => {
      toast.success("Account successfully updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.setQueryData(["user"], user);
    },

    onError: () => toast.error("Account could not be updated"),
  });

  return { updateUSer, isUpdating };
};
