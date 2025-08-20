import { useLocation, Navigate } from "react-router-dom";
import { fetchToken } from "./Token.ts";
import { Outlet } from "react-bootstrap-icons";
const RequireToken: React.FC = () => {
  const auth = fetchToken();
  const location = useLocation();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/" state={{ from: location }} />
  );
};

export default RequireToken;
