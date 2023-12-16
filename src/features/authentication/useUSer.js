import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export const useUSer = () => {
  const { data: user, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
};
