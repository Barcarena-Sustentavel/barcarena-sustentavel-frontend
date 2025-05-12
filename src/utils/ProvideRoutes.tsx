import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import DimensaoAdmin from "../pages/admin/dimensaoAdmin.tsx";
import { Spinner } from "react-bootstrap";
import { useNavigate, Outlet } from "react-router-dom";

const PrivateRoutes: React.FC = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  console.log("isAuthenticated:", isAuthenticated);
  console.log("isLoading:", isLoading);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }

  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading) {
    //return <div>Loading...</div>; // or a spinner
    return <Spinner animation="border" role="status"></Spinner>
  }

  if (!isAuthenticated) {
    //return <div>Redirecting to login...</div>; // Optional fallback while loginWithRedirect runs
    return <Spinner animation="border" role="status"></Spinner> 
  }
  return <Outlet/>
}
export default PrivateRoutes
