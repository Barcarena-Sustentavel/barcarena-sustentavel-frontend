import { useLocation, Navigate } from "react-router-dom";
import { fetchToken } from "./Token.ts";
const RequireToken: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const auth = fetchToken();
  const location = useLocation();
  if (!auth) {
    return <Navigate to="/admin/dimensao" state={{ from: location }} />;
  }

  return children;
};

export default RequireToken;
