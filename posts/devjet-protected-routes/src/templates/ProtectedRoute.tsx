import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/auth/login",
  children,
}: {
  isAllowed: boolean;
  redirectPath?: string;
  children?: any;
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  } else return children ? children : <Outlet />;
};

export default ProtectedRoute;
