import { useAuth0 } from "@auth0/auth0-react";
// React, { FC } from "react";
//import { Container } from "react-bootstrap";
import Redirect
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return loginWithRedirect();
};
/*
const LoginButton:FC = () => {
    const { isAuthenticated, logout } = useAuth0();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  const { loginWithRedirect } = useAuth0();

  //return <button onClick={() => loginWithRedirect()}>Log In</button>;
  return (<Container maxWidth="xl">
    <div>
        <input type="text" name="user" id="user" />
        <input type="text" name="password" id="password" />
    </div>
  </Container>)
};
*/
export default LoginButton;
