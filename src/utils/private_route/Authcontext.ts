import { createContext } from "react";
export type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  login: (user: string) => void;
  logout: () => void;
};
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {},
  login: (token: string) => {},
  logout: () => {},
});
