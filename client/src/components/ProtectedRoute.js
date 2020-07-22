import React from "react";
import { Route, Redirect } from "react-router-dom";

const token = localStorage.getItem("token");

const ProtectedRoute = ({ component: Component, ...rest }) => {
  if (!token) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;
