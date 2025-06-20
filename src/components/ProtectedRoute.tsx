import React from "react"; // ✅ ADD THIS
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode; // ✅ use React.ReactNode instead of JSX.Element
  requiredRole?: string;
};

function ProtectedRoute({ children, requiredRole }: Props) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;
  if (requiredRole && role !== requiredRole)
    return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
}

export default ProtectedRoute;
