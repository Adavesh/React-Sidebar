import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

const auth0_domain = "https://sanas-dev.us.auth0.com";
const auth0_clientId = "sh2VJuYUDk3cNWgNnhJ2QGcZB7alfWPX";
const auth0_audience = "https://logical-API";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      cacheLocation="localstorage"
      domain={auth0_domain}
      clientId={auth0_clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: auth0_audience,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
