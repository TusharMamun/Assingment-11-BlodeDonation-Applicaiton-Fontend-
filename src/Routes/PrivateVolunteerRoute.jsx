import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


import useUserRole from "../Hooks/useUserRole";
import Forbidden from "../components/Uicomponent/ForbiddenPage";
import Loading from "../components/Uicomponent/Loadding";

export default function PrivateVolunteerRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // your hook returns array like: [role, roleLoading]
  const [role, IsRoleLoadding] = useUserRole()

  if (loading || IsRoleLoadding) return <Loading></Loading>;

  // not logged in
  if (!user) return <Navigate to="/loging" state={{ from: location }} replace />;

  // logged in but not allowed
  const allowed = role === "admin" || role === "volunteer";
  if (!allowed) return <Forbidden></Forbidden>

  return children;
}