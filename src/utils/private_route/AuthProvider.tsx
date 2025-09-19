import { Outlet } from "react-router-dom";
import logoNoLabel from "@assets/images/icons/LogoNoLabel.png";
import BouncingDotsLoader from "./animation/BouncingDotsLoader.tsx";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchToken } from "./Token.ts";
import "./css/private_route.css";

const AuthContext = createContext();

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState(null);
  const login = (userToken) => {
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
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
  /*
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Replace with your actual authentication logic
      const token = await fetchToken();
      if (token) {
        setIsAuthenticated(true);
        // Optional: Redirect to intended page or dashboard
        const from = "/admin/dimensao";
        navigate(from, { replace: true });
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // If authenticated, render the protected routes
  if (isAuthenticated) {
    return <Outlet />;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="loadingDiv">
        <div>
          <img src={logoNoLabel} alt="Loading..." />
        </div>
        <div>
          <BouncingDotsLoader />
        </div>
      </div>
    );
  }

  // Show login form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
          <img src={logoNoLabel} alt="Company Logo" className="h-20 w-auto" />
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Email
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando...." : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
    ); */
};

export default AuthProvider;
