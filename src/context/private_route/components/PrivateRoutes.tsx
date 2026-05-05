import { Outlet } from "react-router-dom";
import { AuthContext, AuthContextType } from "../scritpt/Authcontext.ts";
import { useContext, useState, useEffect } from "react";
import BouncingDotsLoader from "../animation/BouncingDotsLoader.tsx";
import api from "../../../adapters/api.tsx";
import { LogIn } from "lucide-react";
import { Eye } from "lucide-react";
import logoNoLabel from "../../../assets/images/icons/LogoNoLabel.png";
import { setToken } from "../scritpt/Token.ts";
import "../css/auth.css";
const PrivateRoutes = () => {
  const { isAuthenticated, setIsAuthenticated } =
    useContext<AuthContextType>(AuthContext);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorLogin, setErrorLogin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const handleLogin = async () => {
    try {
      const token = await api.post("/user/login", {
      username: userName,
      hashed_password: password,
    });
      setToken(token.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error)
      console.log("Erro ao fazer login")
      setErrorLogin("Usuário ou senha incorretos");
    }
  };
  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(true);
    }
  }, [isAuthenticated]);
  if (!isAuthenticated) {
    return (
      <div className="loginScreen">
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
        {errorLogin && <p className="erroLogin">{errorLogin}</p>}
        <button type='submit' onClick={handleLogin}>Entrar</button>
      </div>
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
