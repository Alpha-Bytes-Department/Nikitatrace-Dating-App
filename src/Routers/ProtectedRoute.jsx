import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../lib/cookie-utils";

const ProtectedRoute = () => {
  const accessToken = getCookie("access_token");

  

  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;