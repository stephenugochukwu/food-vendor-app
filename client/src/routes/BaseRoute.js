import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { HomePage } from "../pages/HomePage";
import { ErrorPage } from "../pages/ErrorPage";
import { RegisterPage } from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AdminLogin from "../pages/AdminLogin";
import AdminRegister from "../pages/AdminRegister";
import VendorRegister from "../pages/VendorRegister";
import VendorLogin from "../pages/VendorLogin";
import { AdminDashboard } from "../pages/AdminDashboard";
import ProductDetailPage from "../pages/ProductDetailPage";
import VendorDashboardPage from "../pages/VendorDashboardPage";
import EditMealPage from "../pages/EditMealPage";
import { ProtectedVendorRoute } from "./VendorRoute";
import { ProtectedAdminRoute } from "./AdminRoute";

export const BaseRoute = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/admin/login" element={<AdminLogin />}></Route>
      <Route path="/admin/register" element={<AdminRegister />}></Route>
      <Route path="/vendor/register" element={<VendorRegister />}></Route>
      <Route path="/vendor/login" element={<VendorLogin />}></Route>
      <Route path="product/:id" element={<ProductDetailPage />}></Route>

      {/* Protected User Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* Protected Vendor Route */}
      <Route element={<ProtectedVendorRoute />}>
        <Route path="vendor/dashboard" element={<VendorDashboardPage />} />
        <Route path="editFood/:id" element={<EditMealPage />} />
      </Route>
      {/* Protected Admin Route */}
      <Route element={<ProtectedAdminRoute />}>
        <Route path="admin/dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Error Route */}
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
};
