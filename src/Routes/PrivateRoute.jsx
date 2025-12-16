import { Navigate, useLocation } from "react-router-dom";

import Loading from "../components/Uicomponent/Loadding";
import useAuth from "../Hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/loging" state={{ from: location }} replace />;

  return children;
}