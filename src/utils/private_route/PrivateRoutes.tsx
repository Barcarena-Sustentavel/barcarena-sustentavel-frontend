import { Outlet } from "react-router-dom";
import { AuthContext, AuthContextType } from "./Authcontext.ts";
import { useContext, useState } from "react";
import BouncingDotsLoader from "./animation/BouncingDotsLoader.tsx";
import api from "../../api.tsx";
import { LogIn } from "lucide-react";
import { Eye } from "lucide-react";
import logoNoLabel from "../../assets/images/icons/LogoNoLabel.png";
import { setToken } from "./Token.ts";
import "./css/auth.css";
const PrivateRoutes = () => {
  const { isAuthenticated } = useContext<AuthContextType>(AuthContext);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const handleLogin = async () => {
    const token = await api.post("/user/login", {
      username: userName,
      hashed_password: password,
    });
    if (token) {
      setLoading(false);
      setToken(token.data);
      return <Outlet />;
    }
  };
  if (!isAuthenticated) {
    return (
      <div className="loginContainer">
        <div className="logo">
          <img src={logoNoLabel} alt="Logo da ODSB" />
          <h1>Login</h1>
        </div>
        <label htmlFor="username">Usuário</label>
        <span className="inputIcon">
          <input
            id="username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <LogIn />
        </span>
        <label htmlFor="password">Senha</label>
        <span className="inputIcon">
          <input
            id="password"
            type={visible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Eye onClick={() => setVisible(!visible)} />
        </span>
        <button onClick={handleLogin}>Entrar</button>
      </div>
    );
  }
  if (loading && !isAuthenticated) {
    return (
      <div className="logo">
        <img src={logoNoLabel} alt="Logo da ODSB" />
        <BouncingDotsLoader />
      </div>
    );
  }
  return <Outlet />;
};
export default PrivateRoutes;
