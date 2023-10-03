import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('fpsbAdminToken');
  return (isAuthenticated && isAuthenticated !== '') ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateRoute;