import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  // ❌ If token missing, go to /admin/login
  if (!token) return <Navigate to="/admin/login" replace />;

  try {
    const decoded = jwtDecode(token);

    // ❌ If role is not admin
    if (!decoded.role || decoded.role !== "admin") {
      localStorage.removeItem("adminToken");
      return <Navigate to="/admin/login" replace />;
    }

    // ✔ Token valid → allow admin route
    return children;

  } catch (err) {
    console.error("Token decode failed:", err);

    // ❌ If token invalid, remove it and go to login
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin/login" replace />;
  }
}
