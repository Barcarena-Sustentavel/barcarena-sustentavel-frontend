import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
//import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
