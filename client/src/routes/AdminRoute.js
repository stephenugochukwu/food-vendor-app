import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export const ProtectedAdminRoute = () => {
  const location = useLocation();

  const role = JSON.parse(localStorage.getItem("role"));

  return role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
};
