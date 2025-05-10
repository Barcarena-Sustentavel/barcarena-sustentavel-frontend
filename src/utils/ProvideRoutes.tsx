import { FC, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
const PrivateRoutes: FC = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <Navigate to="/admin/dimensao/" /> : <Login />;
};

const Login: FC = () => {
  const { loginWithRedirect } = useAuth0();
  useEffect(() => {
    loginWithRedirect();
  });
  return <div>Carregando...</div>;
};

export default PrivateRoutes;
