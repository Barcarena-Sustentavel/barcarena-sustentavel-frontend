import { createContext } from "react";
export type AuthContextType = {
  isAuthenticated: boolean;
  login: (user: string) => void;
  logout: () => void;
};
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: (token: string) => {},
  logout: () => {},
});
