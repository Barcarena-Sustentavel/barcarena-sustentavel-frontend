import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import logoNoLabel from "@assets/images/icons/LogoNoLabel.png";
import BouncingDotsLoader from "./animation/BouncingDotsLoader.tsx";
import './css/private_route.css'
const PrivateRoutes: React.FC = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  console.log("isAuthenticated:", isAuthenticated);
  console.log("isLoading:", isLoading);
    //let trueImage = true;
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
      //trueImage = true;
    }

  }, [isAuthenticated, isLoading, loginWithRedirect]);
  //if (trueImage) {
  if (isLoading || !isAuthenticated) {
    return (
    <div className="loadingDiv">
      <div>
        <img src={logoNoLabel} alt="" />
      </div>
      <div>
        <BouncingDotsLoader/>
      </div>
    </div>  
)
  }
  return <Outlet/>
}
export default PrivateRoutes
