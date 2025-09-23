import { Outlet, useNavigate } from "react-router-dom";
import { getCookie } from "../lib/cookie-utils"


const ProtectedRoute = () => {
  const navigate = useNavigate()
  const accessToken = getCookie("access_token");

  if (!accessToken) {
    // return <Navigate to="/signin" />;
    navigate('/signin')
  }

  // Optionally, decode the token and check for "admin" role here

  return <Outlet />;
};

export default ProtectedRoute;
