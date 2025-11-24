import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // NOT logged in
  if (!token) return <Navigate to="/auth?mode=login" />;

  // logged in
  return children;
}
