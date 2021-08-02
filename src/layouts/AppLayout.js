import "./AppLayout.scss";
import { capitalize } from "lodash";
import React, { useEffect } from "react";
import { Route, Redirect, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../features/notifications/Notification";
import Brand from "./Brand";
import { isAuthenticated } from "../utils/session";
import {
  wipeSession,
  fetchMe,
  accountSelector,
} from "../features/account/accountSlice";

const TopBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const account = useSelector(accountSelector) || {};

  return (
    <div className="top-bar-container">
      <section className="top-bar">
        <Brand showTagline={false} />
        <div className="account">
          <span className="user">
            {capitalize(account.username)} (
            <Link
              to="#"
              onClick={() => {
                dispatch(wipeSession());
                history.push("/login");
              }}
            >
              logout
            </Link>
            )
          </span>
        </div>
      </section>
    </div>
  );
};

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(fetchMe());
    }
  });

  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="app-layout">
      <Notification />
      <TopBar />

      <main className="page">{children}</main>
    </div>
  );
};

const LoginLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <AppLayout>
          <Component {...props} />
        </AppLayout>
      )}
    />
  );
};

export default LoginLayoutRoute;
