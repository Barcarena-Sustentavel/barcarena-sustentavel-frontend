import { Outlet } from "react-router-dom";
import { AuthContext, AuthContextType } from "./Authcontext.ts";
import { useContext, useState } from "react";
import BouncingDotsLoader from "./animation/BouncingDotsLoader.tsx";
import api from "../../api.tsx";
const PrivateRoutes = () => {
  const { isAuthenticated, login } = useContext<AuthContextType>(AuthContext);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const handleLogin = async () => {
    const token = await api.post("/user/login", {
      username: userName,
      hashed_password: password,
    });
    if (token) {
      setLoading(false);
      login(token.data);
      return <Outlet />;
    }
  };
  if (!isAuthenticated) {
    return (
      <div>
        <h1>Login</h1>
        <label htmlFor="username">Usuário</label>
        <input
          id="username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Entrar</button>
      </div>
    );
  }
  if (loading) {
    return <BouncingDotsLoader />;
  }
  return <Outlet />;
};
export default PrivateRoutes;
