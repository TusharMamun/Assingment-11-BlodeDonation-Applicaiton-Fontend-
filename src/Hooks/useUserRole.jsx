import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role ="donor", isLoading: IsRoleLoadding } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/regesterDoner/${encodeURIComponent(user.email)}/role`
      );
      return res.data?.role // returns role
    },
  });

  return [role, IsRoleLoadding];
};

export default useUserRole;
