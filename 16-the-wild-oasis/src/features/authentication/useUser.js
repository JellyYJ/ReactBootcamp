import { useQuery } from "@tanstack/react-query";
import { getCurUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurUser,
  });
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
