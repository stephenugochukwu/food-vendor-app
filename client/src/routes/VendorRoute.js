import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export const ProtectedVendorRoute = () => {
  const location = useLocation();

  const role = JSON.parse(localStorage.getItem("role"));

  return role === "vendor" ? (
    <Outlet />
  ) : (
    <Navigate to="/vendor/login" state={{ from: location }} replace />
  );
};
