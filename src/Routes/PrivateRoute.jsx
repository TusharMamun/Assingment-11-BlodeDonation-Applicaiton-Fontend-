import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../Hooks/useAuth";
import Loading from "../components/Uicomponent/Loadding";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/loging" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;