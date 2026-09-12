import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const normalizeRole = (role) => {
  if (!role) return "Trainee";
  const r = role.toString().trim().toLowerCase();
  if (r === "government" || r === "admin") return "Admin";
  if (r === "training_provider" || r === "provider") return "Provider";
  if (r === "employer") return "Employer";
  if (r === "trainee") return "Trainee";
  return r.charAt(0).toUpperCase() + r.slice(1);
};

export default function ProtectedRoute({ allowedRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = normalizeRole(user.role);

  if (allowedRole && userRole !== allowedRole) {
    const defaultPaths = {
      Admin: "/Admin/dashboard",
      Trainee: "/trainee/dashboard",
      Provider: "/provider/dashboard",
      Employer: "/employer/dashboard",
    };

    return (
      <Navigate
        to={defaultPaths[userRole] || "/login"}
        replace
      />
    );
  }

  return <Outlet />;
}