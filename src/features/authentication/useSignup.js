import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export const useSignup = () => {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signUpApi,

    onSuccess: () => {
      toast.success(
        "Account successfully created! Please confirm this account in the user's email address"
      );
    },

    onError: () => {
      toast.error("Account could not be created");
    },
  });

  return { signup, isLoading };
};
