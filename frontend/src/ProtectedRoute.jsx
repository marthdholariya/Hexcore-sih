import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ allowedRole }) {
  const { user, loading } = useAuth();

  // Wait until initial local storage check completes
  if (loading) {
    return null;
  }

  // Redirect to login if unauthenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to user's assigned workspace if attempting to access unauthorized role routes
  if (allowedRole && user.role !== allowedRole) {
    const defaultPaths = {
      Admin: "/Admin/dashboard",
      Trainee: "/trainee/dashboard",
      Provider: "/provider/dashboard",
      Employer: "/employer/dashboard",
    };
    return <Navigate to={defaultPaths[user.role] || "/login"} replace />;
  }

  return <Outlet />;
}