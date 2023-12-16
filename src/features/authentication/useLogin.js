import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getLogin } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => getLogin({ email, password }),
    
    

    onError: () => {
      toast.error(" Invalid login credential ");
    },

    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user?.user);
      navigate("/dashboard", { replace: true });
      toast.success("User successfully logged in");
    },
  });



  return { login, isLoggingIn };
};
