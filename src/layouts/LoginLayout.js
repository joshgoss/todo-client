import "./LoginLayout.scss";
import React from "react";
import { Route } from "react-router-dom";
import Brand from "./Brand";

import Notification from "../features/notifications/Notification";

const LoginLayout = ({ children }) => (
  <div className="login-layout">
    <Notification />
    <main className="page">
      <Brand />
      {children}
    </main>
  </div>
);

const LoginLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <LoginLayout>
          <Component {...props} />
        </LoginLayout>
      )}
    />
  );
};

export default LoginLayoutRoute;
