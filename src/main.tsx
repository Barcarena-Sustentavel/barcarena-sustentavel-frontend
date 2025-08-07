import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
//import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/*
    <Auth0Provider
      domain="dev-f1qyob65m0k20xwn.us.auth0.com"
      clientId="S3jhCiFPBWxdOjh5chUd7bWDggNk53e6"
      authorizationParams={{
        redirect_uri: "http://localhost:3000/admin/dimensao/",
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      > */}
    <App />
    {/*</Auth0Provider>*/}
  </StrictMode>,
);
