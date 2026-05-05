import React, { useState } from "react";
import { AuthContext } from "../scritpt/Authcontext.ts";
import { fetchToken } from "../scritpt/Token.ts";

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
