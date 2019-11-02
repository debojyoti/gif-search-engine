import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isUserAuthenticated } from "../guards/auth-guard";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isUserAuthenticated() === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{pathname: rest.redirectRoute, extras: {...rest.location}}} />
        )
      }
    />
  );
};

export default ProtectedRoute;
