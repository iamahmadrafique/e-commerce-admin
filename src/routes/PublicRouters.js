import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem('fpsbAdminToken');
  return (isAuthenticated === '' || !isAuthenticated) ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;