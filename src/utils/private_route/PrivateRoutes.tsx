import { useLocation, Navigate } from "react-router-dom";
import { fetchToken } from "./Token.ts";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
// const RequireToken: React.FC<{
//   children: React.ReactElement;
// }> = ({ children }) => {
//   const auth = fetchToken();
//   const location = useLocation();
//   console.log(auth);
//   if (!auth) {
//     return <Navigate to="/admin/dimensao" state={{ from: location }} />;
//   }

//   return children;
// };

// export default RequireToken;
const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/dimensao" />;
};
export default PrivateRoutes;
