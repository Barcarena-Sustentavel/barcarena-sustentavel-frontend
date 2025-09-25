import React, { useState } from "react";
import { AuthContext } from "./Authcontext.ts";
import "./css/private_route.css";
import { fetchToken } from "./Token.ts";
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    fetchToken() ? fetchToken() : null,
  );
  const login = (userToken: string) => {
    setToken(userToken);
  };
  const logout = () => {
    setToken(null);
  };
  const isAuthenticated = !!token;
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
