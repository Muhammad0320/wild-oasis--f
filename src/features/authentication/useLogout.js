import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export const useLogout = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  
  

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      toast.success("Logout successful");
      queryClient.removeQueries();
      navigate("/login");
    },

    onError: () => {
      toast.success("Logout failed");
    },
  });

  return { logout, isLoading };
};
